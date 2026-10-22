# ANGPS - Control Room | GPS Tracking Solutions | Ingeniero UX Angel Camelo
<p align="center">
  <b>Sistema de Monitoreo de Flota Vehicular en Tiempo Real</b>
</p>

Aplicación web de una sola página (SPA) desarrollada como prueba técnica, diseñada con altos estándares de UI/UX, arquitectura limpia, accesibilidad web y resiliencia ante fallos de red. Especializada en el seguimiento satelital de flotas en la región de Bogotá y La Calera.

---

## Características Principales

* **Mapa Interactivo en Tiempo Real:** Integración con **Leaflet** y OpenStreetMap, mostrando marcadores vectoriales personalizados que rotan dinámicamente según el rumbo (*course*) del vehículo.
* **Tarjeta de Estado Semántica:** Cumplimiento estricto con accesibilidad web (WCAG 2.1 AA) utilizando etiquetas semánticas (`<dl>`, `<dt>`, `<dd>`).
* **Telemetría Avanzada:** Conversión automática de nudos a kilómetros por hora ($km/h$) y visualización de indicador de estado con pulso activo (*Online/Offline*).
* **Identidad de Marca (ANGPS):** Dirección de arte personalizada con la paleta de colores corporativa, textura técnica de grilla de puntos y logotipo incrustado.
* **Modo Oscuro Integrado:** Interruptor manual para alternar entre el tema claro y un modo oscuro profundo tipo "Control Room" (`#070b14`).
* **Resiliencia y Manejo de Errores (Graceful Degradation):** Si el servidor de Traccar no está disponible o es bloqueado por políticas CORS, la aplicación activa un sistema autónomo de respaldo con **15 vehículos simulados** distribuidos en Bogotá y La Calera, evitando pantallas en blanco o bloqueos totales.
* **Optimización de Experiencia (UX):** Uso de *Skeletons* animados para prevenir saltos visuales en el diseño (*Cumulative Layout Shift*).

---

## Tecnologías y Stack Utilizado

* **React (Vite):** Librería principal para el desarrollo de componentes rápidos y eficientes.
* **Tailwind CSS:** Framework de estilos para un diseño moderno, responsivo y basado en tokens de marca.
* **Leaflet & React-Leaflet:** Librería de mapas interactivos de código abierto.
* **Lucide React:** Iconografía moderna y minimalista.
* **Traccar REST API:** Integración con servicios de geolocalización (con proxy configurado en Vite para evitar conflictos de CORS).

---

## Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

1. **Para que puedan Clonar el repositorio:**
git clone https://github.com/angelcamelo1-rgb/monitor-vehiculo.git
cd monitor-vehiculo
   cd monitor-vehiculo
