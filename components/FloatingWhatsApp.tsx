
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Yeoboland%2C%20saya%20tertarik%20konsultasi%20properti.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm px-0 group-hover:px-2">
        Hubungi Admin
      </span>
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.52.909 3.013 1.389 4.625 1.39 5.405.001 9.803-4.397 9.805-9.804.001-2.621-1.02-5.086-2.875-6.941s-4.318-2.877-6.94-2.878c-5.404 0-9.803 4.398-9.805 9.803-.001 1.768.472 3.498 1.367 5.011l-1.029 3.756 3.852-1.009zm11.246-6.777c-.301-.15-.1.785-.4.15-.3-.635-.601-.755-1.103-.755s-.853.301-1.053.501-.401.451-.602.601-.451.15-.752 0c-.301-.15-1.274-.469-2.425-1.496-.895-.798-1.498-1.783-1.674-2.084-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.526.15-.176.201-.301.301-.501.1-.201.05-.376-.025-.526s-.601-1.451-.826-2.002c-.214-.526-.441-.451-.601-.451s-.326-.01-.501-.01c-.176 0-.451.066-.688.326s-.903.882-.903 2.152.928 2.482 1.053 2.657c.125.175 1.826 2.788 4.426 3.911.618.267 1.096.425 1.474.545.623.197 1.189.169 1.637.1.5-.077 1.528-.626 1.739-1.229.214-.602.214-1.129.151-1.229s-.226-.151-.526-.301z"/>
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
