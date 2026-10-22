import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default function MapView({ position }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const lat = position?.latitude || 4.6097;
  const lng = position?.longitude || -74.0817;
  const course = position?.course || 0;

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      // Desplazamiento orgánico y suave del mapa hacia la nueva posición
      mapInstanceRef.current.panTo([lat, lng], {
        animate: true,
        duration: 1.0, // Suaviza la transición de la cámara del mapa
      });

      // Marcador SVG personalizado con interpolación y transición suave de rotación y posición
      const customIcon = L.divIcon({
        className: 'custom-vehicle-marker',
        html: `
          <div style="transform: rotate(${course}deg); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 4px 8px rgba(14, 165, 233, 0.4));">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
        markerRef.current.setIcon(customIcon);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);
      }
    }
  }, [lat, lng, course]);

  return (
    <div className="w-full h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative z-0">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}