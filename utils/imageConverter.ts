
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
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }

            // Draw main image
            ctx.drawImage(img, 0, 0);

            // Draw Watermark
            if (watermark.naturalWidth > 0) {
                // 1. Prepare Watermark Dimensions
                const padding = img.width * 0.03; // 3% padding
                const targetWidth = img.width * 0.25; // 25% of image width (smaller/corner)
                const scale = targetWidth / watermark.width;
                const targetHeight = watermark.height * scale;

                // 2. Position: Top Left (Pojok Kiri Atas)
                const x = padding;
                const y = padding;

                // 3. Create a temporary canvas to tint the logo BLACK
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = targetWidth;
                tempCanvas.height = targetHeight;
                const tempCtx = tempCanvas.getContext('2d');

                if (tempCtx) {
                    // Draw original logo
                    tempCtx.drawImage(watermark, 0, 0, targetWidth, targetHeight);

                    // Tint it Black
                    tempCtx.globalCompositeOperation = 'source-in';
                    tempCtx.fillStyle = '#000000'; // Pure Black
                    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    // 4. Draw Tinted Watermark onto Main Canvas
                    ctx.save();
                    ctx.globalAlpha = 0.6; // Higher opacity (0.6) for better visibility
                    ctx.drawImage(tempCanvas, x, y);
                    ctx.restore();
                }
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
