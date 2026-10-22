// Usamos "/api" para que el proxy de Vite redirija la petición y evite el error CORS
const BASE_URL = "/api";

// 15 Vehículos simulados con alta fidelidad distribuidos entre Bogotá y La Calera
const MOCK_DEVICES = [
  { id: 1, name: "Camión Logística Norte", status: "online", uniqueId: "359874061234501" },
  { id: 2, name: "Ambulancia Urgencias 02", status: "online", uniqueId: "359874061234502" },
  { id: 3, name: "Van Ejecutiva La Calera", status: "online", uniqueId: "359874061234503" },
  { id: 4, name: "Patrulla Vial 04", status: "offline", uniqueId: "359874061234504" },
  { id: 5, name: "Reparto Express Centro", status: "online", uniqueId: "359874061234505" },
  { id: 6, name: "Vehículo Operativo Soporte", status: "online", uniqueId: "359874061234506" },
  { id: 7, name: "Camión Cisterna 07", status: "offline", uniqueId: "359874061234507" },
  { id: 8, name: "Miniván Rutera Patios", status: "online", uniqueId: "359874061234508" },
  { id: 9, name: "Supervisor de Zona 09", status: "online", uniqueId: "359874061234509" },
  { id: 10, name: "Transporte Personal Sur", status: "offline", uniqueId: "359874061234510" },
  { id: 11, name: "Moto Enlace Rápido 11", status: "online", uniqueId: "359874061234511" },
  { id: 12, name: "Monitoreo Ambiental Calera", status: "online", uniqueId: "359874061234512" },
  { id: 13, name: "Camión Carga Pesada 13", status: "offline", uniqueId: "359874061234513" },
  { id: 14, name: "Unidad Móvil Satelital", status: "online", uniqueId: "359874061234514" },
  { id: 15, name: "Camioneta Resguardo 15", status: "online", uniqueId: "359874061234515" },
];

// Posiciones correspondientes a cada vehículo (Variando coordenadas en Bogotá y La Calera, velocidades y rumbos)
const MOCK_POSITIONS = [
  { deviceId: 1, latitude: 4.6538, longitude: -74.0636, speed: 25.5, course: 90, fixTime: new Date().toISOString() },
  { deviceId: 2, latitude: 4.6097, longitude: -74.0817, speed: 45.0, course: 180, fixTime: new Date().toISOString() },
  { deviceId: 3, latitude: 4.7175, longitude: -73.9722, speed: 38.2, course: 45, fixTime: new Date().toISOString() }, // En La Calera
  { deviceId: 4, latitude: 4.6850, longitude: -74.0430, speed: 0.0, course: 0, fixTime: new Date(Date.now() - 3600000).toISOString() },
  { deviceId: 5, latitude: 4.6200, longitude: -74.0720, speed: 32.4, course: 270, fixTime: new Date().toISOString() },
  { deviceId: 6, latitude: 4.6600, longitude: -74.0500, speed: 12.1, course: 135, fixTime: new Date().toISOString() },
  { deviceId: 7, latitude: 4.5980, longitude: -74.0900, speed: 0.0, course: 90, fixTime: new Date(Date.now() - 7200000).toISOString() },
  { deviceId: 8, latitude: 4.7000, longitude: -74.0300, speed: 55.8, course: 210, fixTime: new Date().toISOString() },
  { deviceId: 9, latitude: 4.6350, longitude: -74.0600, speed: 22.0, course: 300, fixTime: new Date().toISOString() },
  { deviceId: 10, latitude: 4.5800, longitude: -74.1100, speed: 0.0, course: 0, fixTime: new Date(Date.now() - 10800000).toISOString() },
  { deviceId: 11, latitude: 4.6400, longitude: -74.0700, speed: 60.2, course: 150, fixTime: new Date().toISOString() },
  { deviceId: 12, latitude: 4.7200, longitude: -73.9600, speed: 15.0, course: 60, fixTime: new Date().toISOString() }, // En La Calera
  { deviceId: 13, latitude: 4.6100, longitude: -74.1200, speed: 0.0, course: 0, fixTime: new Date(Date.now() - 14400000).toISOString() },
  { deviceId: 14, latitude: 4.6700, longitude: -74.0550, speed: 38.5, course: 330, fixTime: new Date().toISOString() },
  { deviceId: 15, latitude: 4.7100, longitude: -73.9800, speed: 28.0, course: 120, fixTime: new Date().toISOString() }, // Subiendo a La Calera
];

/**
 * 1. Autenticación contra la API de Traccar
 */
export async function loginUser(email, password) {
  try {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`${BASE_URL}/session`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error("Servidor de Traccar no disponible. Usando modo simulado robusto.");
    }

    return await response.json();
  } catch (error) {
    console.warn("Aviso: Conectando con los 15 vehículos simulados para la prueba.");
    return { status: "fallback" };
  }
}

/**
 * 2. Obtener la lista de dispositivos activos
 */
export async function fetchDevices() {
  try {
    const response = await fetch(`${BASE_URL}/devices`);

    if (!response.ok) {
      throw new Error("Error al obtener dispositivos");
    }

    const data = await response.json();
    return data.length > 0 ? data : MOCK_DEVICES;
  } catch (error) {
    return MOCK_DEVICES;
  }
}

/**
 * 3. Consultar las posiciones actuales de los vehículos
 */
export async function fetchPositions() {
  try {
    const response = await fetch(`${BASE_URL}/positions`);

    if (!response.ok) {
      throw new Error("Error al obtener posiciones");
    }

    const data = await response.json();
    return data.length > 0 ? data : MOCK_POSITIONS;
  } catch (error) {
    return MOCK_POSITIONS;
  }
}