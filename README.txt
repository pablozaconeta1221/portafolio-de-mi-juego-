CIUDAD SANGRIENTA — PORTAL COMPLETO DE 2 VIDEOJUEGOS
========================================================

PROYECTO
Portal web promocional de Unity WebGL, preparado para Visual Studio Code.
Incluye 2 experiencias en una misma página:
  1) Carrera Infinita 3D / Runner Urbano (Unidad 2)
  2) Ciudad Sangrienta — Laberinto 3D (Unidad 3)

CÓMO ABRIRLO EN VS CODE
1. Descomprime este archivo ZIP.
2. Abre la carpeta Portal_Ciudad_Sangrienta en Visual Studio Code.
3. Haz clic derecho sobre index.html y selecciona Open with Live Server.
   (Instala la extensión "Live Server" si no la tienes).
4. Usa el menú superior. El primer juego está en "Jugar Runner".
5. Haz clic en "Laberinto 3D" para ver la presentación, la ficha
   del personaje, la historia, mecánicas, datos y el segundo juego.
6. Haz clic en "JUGAR LABERINTO AQUÍ" o "INICIAR LABERINTO".
   Unity se abre dentro del mismo portal.

CONTROLES
RUNNER: Flecha arriba = saltar | Flecha abajo = agacharse.
LABERINTO: Flechas arriba/abajo/izquierda/derecha = movimiento | R = reiniciar.
Haz clic dentro del visor para que el juego reciba el teclado.

REQUERIMIENTOS SEGÚN EVALUACIÓN 3
- Juego inspirado en Pac-Man, en un laberinto 3D de 11 × 9 celdas.
- Personaje principal heredado de la Unidad 2, estética urbana distópica.
- 36 puntos que otorgan 10 puntos cada uno.
- Dos enemigos con patrulla y persecución (pathfinding y raycasting).
- Visión de 8 unidades, bloqueada por paredes.
- Victoria: recoger los 36 puntos y alcanzar la salida de F1.
- Derrota inmediata si uno de los dos enemigos toca al jugador.
- El plano táctico del portal reproduce el diseño de referencia del documento.

ENLACES CONFIGURADOS
Runner: https://aquamarine-pothos-2552f7.netlify.app/
Laberinto: https://illustrious-blancmange-930e81.netlify.app/

ARCHIVOS
index.html                 Contenido de todas las secciones, anclas y 2 visores.
styles.css                 Diseño visual y adaptación a PC y móvil.
script.js                  Menú, animaciones suaves y control de ambos juegos.
assets/protagonista.png    Imagen del protagonista proporcionada.
assets/ciudad-desolada.svg Fondo original del portal.
assets/plano-laberinto.svg Infografía del laberinto (36 puntos y rutas).

LIMITACIONES IMPORTANTES
El portal carga los 2 juegos desde sus sitios originales mediante iframe.
No se incluyen las builds Unity WebGL locales. Se requiere Internet.
Puede que el proveedor del juego impida la visualización en iframes
por políticas X-Frame-Options o CSP. Se incluye un enlace de respaldo
para cada juego, que se abre en otra pestaña solo si el iframe falla.
Los efectos de terror y sangre se aplican a la WEB y alrededor del visor,
NO cambian las texturas ni la programación del juego ya publicado.
Para modificar las escenas internas necesitas los archivos Unity originales.
Para evitar sobrecargar WebGL, abrir un juego cierra el otro.

PUBLICACIÓN
Publica TODO el contenido de esta carpeta (index.html, styles.css,
script.js y assets/) en la raíz del repositorio de GitHub Pages o Netlify.
Comprueba que las rutas y ambos iframes siguen funcionando públicamente.

FUENTES DEL CONTENIDO
- GED - 24 - Portal del juego.docx (estructura de portal, secciones y CTA)
- GED - Unidad 2 - Evaluación.docx (runner y ambiente)
- GED - Unidad 3 - Evaluación(1).docx (laberinto y especificaciones)
