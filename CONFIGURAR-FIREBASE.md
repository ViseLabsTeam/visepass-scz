# Configurar Firebase para VisePass (una sola vez, ~10 minutos)

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
Sube a tu repositorio **todos** los archivos del ZIP (`index.html`, `manifest.json` y los tres iconos). El archivo `firestore.rules` no hace falta subirlo; ya lo pegaste en Firebase.

## 6. Primer uso
1. Abre la app → pestaña **Admin**.
2. Escribe **tu correo**, tu contraseña de administración (mínimo 6) y una **contraseña distinta para Portería**.
3. Toca **Crear condominio y entrar**.
4. Registra las casas. Cada casa recibe su PIN inicial (por defecto `0000`); el vecino lo cambia desde la app.
5. Si quieres probar con datos de ejemplo: botón **Datos Demo** (crea 6 casas con PIN `0000`).

## Cómo funciona ahora
- **Administración** entra con su correo y contraseña (y puede recuperarla por correo).
- **Cada casa** tiene su propia cuenta; el PIN es su contraseña. Restablecer el PIN desde Administración desconecta los teléfonos de esa casa.
- **Portería** usa su propia contraseña; si Administración la cambia, la garita pide la nueva.
- Las contraseñas y PIN **ya no se guardan en la app ni viajan públicos**: los guarda Firebase.
- La portería verifica cada pase en la base de datos: **un pase inventado no entra**.
- Si se corta internet en la garita, sigue validando con lo último recibido y sincroniza al volver.

## Costo
El **plan gratuito (Spark)** alcanza de sobra para un condominio (50.000 lecturas y 20.000 escrituras diarias gratis). No hace falta tarjeta.
