# VisePass SCZ — Plataforma de Acceso Inteligente en Wallet

Sistema integral de control de acceso para condominios (**La Hacienda - Rincón, Santa Cruz**) con pases firmados criptográficamente (Ed25519) compatibles con Apple Wallet / Google Wallet.

## 🔐 Perfiles de Acceso

Al iniciar la aplicación puedes ingresar en cualquiera de los 3 modos operativos:

1. **🏠 Vecino / Residente (PIN por defecto: `0000`)**
   - Emisión de pases QR con firma digital para visitas sociales, residentes VIP, personal del hogar y proveedores/obra.
   - Anuncio rápido de Taxis y Deliveries (vigencia 30 min).
   - Link grupal de autoregistro para churrascos/eventos.
   - Visualización de la **Tarjeta Wallet** lista para compartir por WhatsApp.

2. **🛡️ Portería / Guardia**
   - Terminal de alto contraste para tranca principal.
   - Escáner QR con cámara en vivo o pistola lectora USB + pausa anti-doble lectura de 5 segundos.
   - Candado **Anti-Passback** (bloquea reingresos duplicados con captura de pantalla).
   - Control de Taxis/Deliveries pre-autorizados y alerta de horario límite (18:00 hrs) para proveedores/obreros.

3. **🏢 Administración y Directorio (Credencial: `admin`)**
   - Acceso completo a todos los paneles del sistema.
   - Padrón de domicilios, alta/baja de casas y reseteo de PIN a `0000`.
   - Bloqueo automático de emisión y lectura de pases QR para domicilios en mora de expensas.
   - Bitácora oficial auditable por fecha con exportación directa a **Excel / CSV**.

## 🚀 Despliegue Rápido en GitHub Pages

1. Sube el archivo `index.html` a tu repositorio de GitHub.
2. Ve a **Settings → Pages** en tu repositorio.
3. En **Branch**, selecciona `main` (o `master`) y guarda. ¡Tendrás un link público listo para abrir desde cualquier celular o computadora!
