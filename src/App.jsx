import React, { useState, useEffect } from 'react';
import { loginUser, fetchDevices, fetchPositions } from './services/traccar';
import StatusCard from './components/StatusCard';
import MapView from './components/MapView';
import { Shield, Radio, RefreshCw, AlertCircle } from 'lucide-react';
import Skeleton from './components/Skeleton';

export default function App() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [positions, setPositions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Alternar Modo Oscuro / Claro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Función principal para conectar y cargar datos de Traccar
  const loadTraccarData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Autenticación con credenciales estándar de prueba de Traccar
      await loginUser("admin", "admin");

      // 2. Obtener dispositivos
      const deviceList = await fetchDevices();
      setDevices(deviceList);

      if (deviceList.length > 0) {
        setSelectedDevice(deviceList[0]); // Seleccionar el primero por defecto
      }

      // 3. Obtener posiciones iniciales
      const posList = await fetchPositions();
      const posMap = {};
      posList.forEach(p => {
        posMap[p.deviceId] = p;
      });
      setPositions(posMap);

    } catch (err) {
      console.error("Error al conectar con Traccar:", err);
      setError("No se pudo conectar con el servidor de demostración de Traccar (posible bloqueo por CORS o caída del servidor).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTraccarData();

    // Configurar Polling cada 5 segundos para actualización en tiempo real
    const interval = setInterval(async () => {
      try {
        const posList = await fetchPositions();
        const posMap = {};
        posList.forEach(p => {
          posMap[p.deviceId] = p;
        });
        setPositions(posMap);
      } catch (e) {
        console.error("Error en el polling de posiciones:", e);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Posición actual del vehículo seleccionado
  const currentPosition = selectedDevice ? positions[selectedDevice.id] : null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* Barra Superior / Header con Identidad ANGPS */}
      <header 
        className="bg-blue-700 dark:bg-[#070b14] text-white border-b border-blue-800 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between shadow-xl sticky top-0 z-50 relative overflow-hidden transition-colors duration-300"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1.6px, transparent 1.6px)',
          backgroundSize: '22px 22px'
        }}
      >
        <div className="flex items-center gap-4 relative z-10">
          {/* Contenedor del Logo en fondo gris claro fijo */}
          <div className="p-2 bg-slate-200 rounded-2xl shadow-md border border-slate-300 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="ANGPS Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
            />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-white flex items-center gap-2">
              ANGPS <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm">Control Room</span>
            </h1>
            <p className="text-xs font-medium text-blue-100 dark:text-sky-400 tracking-wide">GPS TRACKING SOLUTIONS</p>
          </div>
        </div>

        {/* Controles de la Derecha (Selector Desktop + Modo Oscuro) */}
        <div className="flex items-center gap-4 relative z-10">
          {/* Selector de Escritorio */}
          <div className="hidden md:flex items-center gap-2 bg-blue-800/40 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-blue-500/30 dark:border-slate-700">
            <span className="text-xs font-bold text-sky-200 dark:text-sky-400 uppercase tracking-wider">Unidad:</span>
            <select 
              className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
              value={selectedDevice?.id || ''}
              onChange={(e) => {
                const dev = devices.find(d => d.id === Number(e.target.value));
                setSelectedDevice(dev);
              }}
            >
              {devices.map(d => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  {d.name} ({d.status || 'Online'})
                </option>
              ))}
            </select>
          </div>

          {/* Botón de Modo Oscuro */}
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-blue-800/60 dark:bg-slate-800 hover:bg-blue-800 dark:hover:bg-slate-700 border border-blue-500/30 dark:border-slate-700 transition shadow-sm hover:shadow-brand-glow text-white backdrop-blur-md"
            aria-label="Cambiar modo oscuro"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Selector Exclusivo para Celulares (Visible solo en pantallas pequeñas) */}
      <div className="w-full md:hidden px-6 py-3 bg-slate-900 border-b border-slate-800 shadow-md">
        <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
          Seleccionar Unidad (Flota):
        </label>
        <select
          value={selectedDevice?.id || ''}
          onChange={(e) => {
            const dev = devices.find(d => d.id === Number(e.target.value));
            setSelectedDevice(dev);
          }}
          className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {devices.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.status || 'Online'})
            </option>
          ))}
        </select>
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Estado de Carga con Skeletons (Previene Cumulative Layout Shift) */}
        {loading && !devices.length && (
          <>
            <div className="lg:col-span-1">
              <Skeleton />
            </div>
            <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-900 rounded-2xl animate-pulse h-[400px] flex items-center justify-center text-slate-400">
              Cargando telemetría del mapa...
            </div>
          </>
        )}

        {/* Estado de Error Empático */}
        {error && (
          <div className="col-span-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <div>
              <h2 className="text-lg font-bold text-red-800 dark:text-red-300">Error de Conexión con el Servidor</h2>
              <p className="text-sm text-red-600 dark:text-red-400 max-w-md mt-1">{error}</p>
            </div>
            <button 
              onClick={loadTraccarData}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium shadow-md transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reintentar Conexión
            </button>
          </div>
        )}

        {/* Panel Izquierdo y Derecho: Tarjeta de Estado y Mapa Interactivo */}
        {!loading && !error && (
          <>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <StatusCard vehicle={selectedDevice} position={currentPosition} />
            </div>
            <div className="lg:col-span-2">
              <MapView position={currentPosition} />
            </div>
          </>
        )}

      </main>
    </div>
  );
}