PORTAL CIUDAD SANGRIENTA — JUEGO INTEGRADO

¿Qué se modificó?
- El videojuego Runner Urbano se incrusta en el portal mediante un iframe HTML.
- COMENZAR A JUGAR (inicio) y JUGAR AHORA (menú) te llevan a #jugar y cargan el juego en la misma página.
- En la sección de juego puedes iniciar, recargar, cerrar y activar pantalla completa.
- Se añadió un marco temático con brillo rojo y manchas de sangre alrededor del visor.
- Se conserva toda la web: Historia, Personaje, Mecánicas, Datos y el protagonista de la imagen original.

CÓMO PROBAR EN VS CODE
1. Extrae el ZIP y abre la carpeta Portal_Ciudad_Sangrienta con VS Code.
2. Abre index.html con Live Server (recomendado).
3. Haz clic en COMENZAR A JUGAR o JUGAR AHORA.
4. El juego se verá en el visor, debajo de la sección de Datos.
5. Haz clic dentro de la escena del juego para usar las flechas del teclado: arriba (salto) y abajo (agacharse).
6. Si lo deseas usa PANTALLA COMPLETA; usa REINICIAR CARGA para volver a cargar la compilación de Netlify.

ARCHIVOS
- index.html: secciones y visor iframe Unity integrado.
- styles.css: diseño sangriento y ciudad desolada, estilos del visor y responsive.
- script.js: carga del iframe y botones de control del visor.
- assets/: protagonista.png y ciudad-desolada.svg.

IMPORTANTE
- Es necesario Internet para cargar https://aquamarine-pothos-2552f7.netlify.app/ .
- El ZIP contiene el portal, NO el proyecto de Unity ni sus assets WebGL.
- El diseño sangriento del marco no cambia texturas, enemigos o escenario interno de Unity. Para esos cambios se necesita el proyecto original de Unity y volver a publicarlo.
- Un servidor externo puede impedir incrustar su contenido por políticas de seguridad (X-Frame-Options o CSP). Si ocurre, existe un enlace de respaldo al juego original bajo el visor. Para garantizar un juego totalmente autónomo en la misma web se necesitan los archivos exportados de Unity WebGL.
- Para publicar, sube index.html, styles.css, script.js y assets/ al mismo nivel en GitHub Pages, Netlify o Vercel.
