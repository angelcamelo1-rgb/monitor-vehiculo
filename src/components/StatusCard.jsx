import React from 'react';
import { Gauge, Clock, Wifi, ShieldAlert } from 'lucide-react';

export default function StatusCard({ vehicle, position }) {
  // Si no hay un vehículo seleccionado, mostramos un estado vacío elegante
  if (!vehicle) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <p className="text-slate-500 dark:text-slate-400 text-center text-sm">
          Selecciona un vehículo de la lista para ver su información en tiempo real.
        </p>
      </div>
    );
  }

  // Conversión de nudos a km/h (1 nudo ≈ 1.852 km/h)[cite: 2, 3]
  const speedInKnots = position?.speed || 0;
  const speedInKmH = (speedInKnots * 1.852).toFixed(1);

  // Verificamos estado online/offline basado en la conexión o fecha de posición
  const isOnline = vehicle.status === "online";

  // Formatear la última actualización de forma humana
  const lastUpdate = position?.fixTime 
    ? new Date(position.fixTime).toLocaleTimeString() 
    : "Sin registro reciente";

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl transition-all duration-300">
      
      {/* Cabecera de la tarjeta con nombre y estado de pulso */}
      <header className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
            Unidad Activa
          </span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {vehicle.name}
          </h2>
        </div>

        {/* Indicador de pulso dinámico (Verde Online / Gris Offline)[cite: 3] */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <span className="relative flex h-3 w-3">
            {isOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          </span>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </header>

      {/* Cuerpo principal usando HTML Semántico estricto (<dl>, <dt>, <dd>)[cite: 3] */}
      <dl className="grid grid-cols-1 gap-4">
        
        {/* Velocidad */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg">
              <Gauge className="w-5 h-5" />
            </div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Velocidad Actual</dt>
          </div>
          <dd className="text-lg font-bold text-slate-900 dark:text-white">
            {speedInKmH} <span className="text-xs font-normal text-slate-500">km/h</span>
          </dd>
        </div>

        {/* Última actualización */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Última Actualización</dt>
          </div>
          <dd className="text-sm font-semibold text-slate-900 dark:text-white">
            {lastUpdate}
          </dd>
        </div>

        {/* Identificador / IMEI */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-lg">
              <Wifi className="w-5 h-5" />
            </div>
            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Identificador (IMEI)</dt>
          </div>
          <dd className="text-sm font-mono text-slate-900 dark:text-white">
            {vehicle.uniqueId || 'N/A'}
          </dd>
        </div>

      </dl>

    </article>
  );
}