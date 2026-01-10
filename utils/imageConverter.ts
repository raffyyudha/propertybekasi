
export const convertImageToWebP = async (file: File, watermarkUrl: string = '/logo.png'): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const watermark = new Image();

        // Helper to handle loading both images
        let imagesLoaded = 0;
        const checkLoaded = () => {
            imagesLoaded++;
            if (imagesLoaded === 2) {
                processCanvas();
            }
        };

        img.onload = checkLoaded;
        watermark.onload = checkLoaded;

        img.onerror = (e) => reject(new Error('Failed to load main image'));
        // If watermark fails, we still process, just without watermark? Or fail? 
        // Let's warn and proceed without watermark to be safe, or just fail. 
        // User wants watermark, so let's try to enforce it, but if it's missing, maybe just skip it to avoid breaking uploads.
        watermark.onerror = () => {
            console.warn('Watermark image failed to load');
            imagesLoaded++; // Treat as loaded to continue
            // We'll handle null watermark in processCanvas
        };

        img.src = URL.createObjectURL(file);
        watermark.src = watermarkUrl; // Load from public folder

        const processCanvas = () => {
            // First, draw image to a temp canvas to inspect pixels
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) {
                reject(new Error('Canvas context not available'));
                return;
            }
            tempCtx.drawImage(img, 0, 0);

            // AUTO CROP LOGIC
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const { data, width, height } = imageData;
            let minX = width, minY = height, maxX = 0, maxY = 0;

            // Scan for non-white/non-transparent pixels
            // Assuming "white" is > 250 on RGB and "transparent" is alpha 0
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = (y * width + x) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];
                    const a = data[idx + 3];

                    // Heuristic: Keep pixel if NOT (Transparent OR Almost White)
                    // You can adjust the threshold 245 to be more or less sensitive
                    const isWhite = r > 245 && g > 245 && b > 245;
                    const isTransparent = a < 10;

                    if (!isWhite && !isTransparent) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            // If image is blank (all white/transparent), fallback to full size
            if (maxX < minX || maxY < minY) {
                minX = 0; minY = 0; maxX = width; maxY = height;
            }

            // Add a tiny padding if possible? No, user wants crop "biar pure fotonya".
            const cropWidth = maxX - minX + 1;
            const cropHeight = maxY - minY + 1;

            // Now create the final canvas with cropped dimensions
            const canvas = document.createElement('canvas');
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }

            // Draw cropped portion
            ctx.drawImage(img, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            // Draw Watermark on Clean Cropped Image
            if (watermark.naturalWidth > 0) {
                // 1. Prepare Watermark Dimensions
                const padding = cropWidth * 0.03; // 3% padding
                const targetWidth = cropWidth * 0.25; // 25% of cropped width
                const scale = targetWidth / watermark.width;
                const targetHeight = watermark.height * scale;

                // 2. Position: Top Left (Pojok Kiri Atas)
                const x = padding;
                const y = padding;

                // 3. Draw Watermark directly without tinting
                ctx.save();
                ctx.globalAlpha = 0.6; // Keep transparency
                ctx.drawImage(watermark, x, y, targetWidth, targetHeight);
                ctx.restore();
            }

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Conversion failed'));
                    return;
                }
                const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                    type: "image/webp",
                    lastModified: Date.now(),
                });
                resolve(newFile);
            }, 'image/webp', 0.8); // 0.8 quality
        };
    });
};
