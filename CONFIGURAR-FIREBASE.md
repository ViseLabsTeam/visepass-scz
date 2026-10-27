# Configurar Firebase para VisePass (una sola vez, ~10 minutos)

> **¿Ya tenías VisePass funcionando con Firebase?** Salta a **"Actualizar desde la versión anterior"** al final.

Tu proyecto: **visepass-edb93**. Entra a https://console.firebase.google.com y ábrelo.

## 1. Crear la base de datos (Firestore)
1. Menú izquierdo: **Compilación → Firestore Database → Crear base de datos**.
2. Ubicación: **southamerica-east1 (São Paulo)**.
3. Elige **Modo de producción** → **Crear**.

## 2. Pegar las reglas de seguridad
1. En Firestore Database, abre la pestaña **Reglas**.
2. Borra todo lo que hay y pega el contenido completo del archivo **`firestore.rules`** (viene en el ZIP).
3. Toca **Publicar**.

> Sin este paso la app muestra: "La base de datos aún no tiene las reglas de VisePass".

## 3. Activar el inicio de sesión
1. Menú izquierdo: **Compilación → Authentication → Comenzar**.
2. Pestaña **Método de acceso**:
   - Habilita **Correo electrónico/contraseña** (solo el primer interruptor).
   - Habilita **Anónimo** (lo usan los invitados del link de churrasco).

## 4. Autorizar tu dominio de GitHub Pages
1. En **Authentication → Configuración → Dominios autorizados**.
2. Toca **Agregar dominio** y escribe tu dominio, por ejemplo `tuusuario.github.io`.

## 5. Publicar la app
Sube a tu repositorio **todos** los archivos del ZIP (`index.html`, `sw.js`, `manifest.json` y los tres iconos). El archivo `sw.js` es el que permite que la app abra sin internet: tiene que estar en la misma carpeta que `index.html`. El archivo `firestore.rules` no hace falta subirlo; ya lo pegaste en Firebase.

## 6. Primer uso
1. Abre la app → pestaña **Admin**.
2. Escribe **tu correo**, tu contraseña de administración (mínimo 8) y una **contraseña distinta para Portería** (mínimo 8).
3. Escribe el **nombre del condominio** y toca **Crear condominio y entrar**.
4. Registra las casas. Cada casa recibe un **PIN al azar** que se muestra una vez: entrégaselo a la familia. Al entrar por primera vez, la app le pide crear su PIN personal.

## Cómo funciona ahora
- **Administración** entra con su correo y contraseña (y puede recuperarla por correo).
- **Cada casa** tiene su propia cuenta; el PIN es su contraseña. Restablecer el PIN desde Administración desconecta los teléfonos de esa casa.
- **Portería** usa su propia contraseña; si Administración la cambia, la garita pide la nueva.
- Las contraseñas y PIN **ya no se guardan en la app ni viajan públicos**: los guarda Firebase.
- La portería verifica cada pase en la base de datos: **un pase inventado no entra**.
- Si se corta internet en la garita, la app **abre igual** (queda guardada en el teléfono), sigue validando con lo último recibido y sincroniza al volver.
- Las familias, el estado de mora y el correo del administrador son **privados**: solo los ven administración, portería y la propia casa.
- En **Portería → Taxis / Delivery**, toca **"Activar avisos"** una vez por teléfono para que suene un aviso cuando un vecino anuncie una moto o un taxi.

## Costo
El **plan gratuito (Spark)** alcanza de sobra para un condominio (50.000 lecturas y 20.000 escrituras diarias gratis). No hace falta tarjeta.

## Actualizar desde la versión anterior (hazlo todo junto, ~3 minutos)
El orden importa:
1. **Primero las reglas:** Firestore Database → **Reglas** → borra todo, pega el `firestore.rules` nuevo → **Publicar**.
2. **Después la app:** sube `index.html` y `sw.js` (en Vercel o GitHub, donde la tengas publicada).
3. **Entra una vez como Administración.** La app sola:
   - crea la lista de casas de la pantalla de ingreso,
   - pasa familias y mora a la parte privada,
   - marca todas las casas para que creen su **PIN personal de 6 números** la próxima vez que entren.

Entre el paso 1 y el 3 los vecinos no pueden ingresar; por eso conviene hacerlo seguido.

**Qué cambia para los vecinos**
- Al entrar, la app les pide crear un PIN personal de 6 números (una sola vez).
- Los pases que ya compartieron **siguen funcionando**.
- Los links de churrasco anteriores dejan de funcionar: el vecino crea uno nuevo eligiendo el **día del evento**.

**Qué cambia para administración**
- Las casas nuevas reciben un **PIN al azar** que se muestra una sola vez para entregarlo a la familia.
- Administración está separada en pestañas: Casas · Seguridad · Lista negra · Bitácora.
- En Seguridad: nombre del condominio, respaldo completo y traspaso de la administración.
- Ya no existen "Datos Demo", "Limpiar Todo" ni "Reiniciar Bitácora". La bitácora no se puede borrar.

**Opcional (ahorra lecturas):** si en la consola del navegador del vecino aparece un aviso de Firebase con un link para "crear índice", ábrelo y toca **Crear**. La app funciona igual sin él.
