# VisePass para varios condominios: paso a paso

**Una sola app y una sola dirección** (`visepass-scz.vercel.app`) para todos los condominios.

- Cada condominio tiene **su propio proyecto Firebase**: sus datos quedan separados y cada uno usa el plan gratuito.
- Tú controlas todo desde el **Panel maestro**: agregar condominios, registrar pagos y suspender al que no paga.
- Cuando actualizas la app, se actualizan **todos los condominios a la vez**.

```
                 visepass-scz.vercel.app  (una sola app)
                              │
          ┌───────────────────┼────────────────────┐
   Proyecto CENTRAL     Proyecto La Hacienda   Proyecto Las Brisas …
   (tu Panel maestro:   (casas, pases,         (casas, pases,
    lista y estado)      bitácora)              bitácora)
```

---

## PARTE A · Una sola vez: el proyecto central y tu Panel maestro (~20 min)

### A1. Crear el proyecto central
1. Entra a https://console.firebase.google.com con **tu** cuenta de Google.
2. **Crear un proyecto** → nombre: `visepass-central`. Desactiva Google Analytics → **Crear proyecto**.

### A2. Base de datos y reglas
1. **Compilación → Firestore Database → Crear base de datos** → ubicación **southamerica-east1 (São Paulo)** → **Modo de producción** → **Crear**.
2. Pestaña **Reglas**: borra todo y pega el archivo **`firebase/firestore.central.rules`** del ZIP → **Publicar**.
   > ⚠️ Es `firestore.central.rules`, **no** `firestore.rules`.

### A3. Inicio de sesión
1. **Compilación → Authentication → Comenzar**.
2. **Método de acceso → Correo electrónico/contraseña** → habilitar → Guardar.
   (En el proyecto central **no** actives "Anónimo".)
3. **Configuración → Dominios autorizados → Agregar dominio** → `visepass-scz.vercel.app`.

### A4. Copiar los datos del proyecto central a `config.js`
1. Engranaje ⚙️ → **Configuración del proyecto** → **Tus apps** → ícono **`</>`** → apodo `VisePass` → **Registrar app**.
2. Abre **`config.js`** con el Bloc de notas. En la parte **`central`**, reemplaza cada `PEGAR_AQUI` por los valores que muestra Firebase (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
3. **No toques** la parte `lahacienda`: es tu condominio actual.

### A5. Publicar
1. Firestore de **La Hacienda** (proyecto `visepass-edb93`) → **Reglas** → pega `firebase/firestore.rules` → **Publicar**. (Son las mismas de antes; confirma que estén.)
2. Sube a Vercel **`index.html`, `config.js` y `sw.js` juntos**.

### A6. Crear tu cuenta del Panel maestro (hazlo apenas publiques)
1. Abre **https://visepass-scz.vercel.app/?maestro**
2. Escribe tu correo y una contraseña segura (mínimo 8) → **Crear Panel maestro con estos datos**.
3. Listo: **La Hacienda aparece sola en el panel.**

> Solo puede existir **una** cuenta dueña. Después de crearla, nadie más puede hacerlo. Por eso conviene crearla en cuanto publiques.
> Para volver al panel otro día: `visepass-scz.vercel.app/?maestro`, o en la pantalla de ingreso, el enlace pequeño **"Panel maestro"**.

---

## PARTE B · Cada condominio nuevo (~15 min)

### B1. Crear su proyecto Firebase
1. Con **tu** cuenta de Google (así mantienes el control): **Crear un proyecto** → nombre `visepass-` + nombre corto (por ejemplo `visepass-lasbrisas`). Sin Analytics.

### B2. Base de datos y reglas
1. **Firestore Database → Crear base de datos** → **São Paulo** → **Modo de producción**.
2. **Reglas** → pega **`firebase/firestore.rules`** (el de condominio) → **Publicar**.

### B3. Inicio de sesión
1. **Authentication → Comenzar → Método de acceso**:
   - **Correo electrónico/contraseña** → habilitar.
   - **Anónimo** → habilitar (lo usan los invitados del link de evento).
2. **Configuración → Dominios autorizados → Agregar dominio** → `visepass-scz.vercel.app`.

### B4. Copiar su configuración
1. ⚙️ **Configuración del proyecto → Tus apps → `</>`** → apodo `VisePass` → **Registrar app**.
2. **Copia todo el bloque** `const firebaseConfig = { … };` que aparece.

### B5. Agregarlo en tu Panel maestro (sin volver a publicar nada)
1. Abre el **Panel maestro** → **Agregar condominio**.
2. **Nombre:** `Las Brisas`. El **identificador** se arma solo (`las-brisas`) y será su link.
3. **Configuración de Firebase:** pega el bloque copiado. Debe aparecer `✓ Proyecto: visepass-lasbrisas`.
4. **Pagado hasta**, **días de gracia**, **Bloquear solo si no paga** (opcional), **contacto** y **notas** → **Guardar**.

### B6. Entregarlo al condominio
1. En su tarjeta toca **Copiar link** → `visepass-scz.vercel.app/?condo=las-brisas`.
2. Envíaselo al **administrador del condominio**. Él:
   1. Abre el link → pestaña **Admin** → escribe el nombre del condominio, su correo, su contraseña y la contraseña de portería → **Entrar como administración**.
   2. **Casas → Plantilla** → completa el padrón → **Subir Excel** → **Imprimir hojas de PIN**.
   3. Entrega los PIN a cada casa con el **mismo link**.
3. **Portería** abre el mismo link en su teléfono y entra con su contraseña.

> Cada teléfono **recuerda** su condominio: después basta con abrir la app instalada.

---

## PARTE C · Cobrar y bloquear

| Situación | Qué haces en el Panel maestro | Qué pasa en el condominio |
|---|---|---|
| Te pagaron | **Pagó 1 mes** | Suma un mes a "Pagado hasta". Si estaba bloqueado por pago, se desbloquea solo. |
| No pagó y quieres cortar ya | **Suspender** | En segundos, vecinos, portería y administración ven **"Servicio suspendido"**. No se borra ningún dato. |
| Pagó después de suspendido | **Reactivar** | Vuelve a funcionar al instante en todos los teléfonos. |
| Quieres que se corte solo | **Editar** → "Pagado hasta" + **Bloquear solo si no paga** + días de gracia | Si pasa la fecha más los días de gracia sin registrar el pago, se bloquea solo. |

**Arriba del panel** ves cuántos condominios están **activos**, **suspendidos** y con **pago vencido**; los atrasados aparecen primero.

> **Sobre el bloqueo:** la suspensión la aplica la app (es lo que ven y usan todos). Si un cliente deja el servicio para siempre, además puedes cortar el acceso de fondo: en el proyecto Firebase de ese condominio → **Firestore → Reglas** → reemplaza todo por:
> ```
> rules_version = '2';
> service cloud.firestore { match /databases/{db}/documents { match /{doc=**} { allow read, write: if false; } } }
> ```
> → **Publicar**. Para volver atrás, pega de nuevo `firestore.rules`.

---

## PARTE D · Actualizar la app (todos los condominios a la vez)

1. Sube **`index.html` y `sw.js`** a Vercel **una vez**. Todos los condominios usan la versión nueva.
2. **Si la versión trae reglas nuevas de condominio** (`firestore.rules`): pégalas en **cada** proyecto de condominio. Pasa pocas veces y te lo voy a avisar.
3. **`config.js` casi nunca cambia**: los condominios nuevos se agregan en el Panel maestro, no en este archivo.

---

## Costos

- **Firebase:** plan gratuito (Spark) para cada condominio y para el proyecto central.
- **Vercel:** el plan gratuito (Hobby) **no permite uso comercial**. Cuando cobres, pasa a **Vercel Pro** (US$ 20 al mes; una sola dirección sirve a todos los condominios).

## Lista rápida

**Una vez:**
- [ ] Proyecto `visepass-central` con Firestore (São Paulo) y reglas **central**
- [ ] Correo/contraseña habilitado y `visepass-scz.vercel.app` autorizado
- [ ] Datos del central pegados en `config.js`
- [ ] `index.html`, `config.js` y `sw.js` subidos juntos
- [ ] Cuenta del Panel maestro creada en `/?maestro`

**Por condominio:**
- [ ] Proyecto Firebase con Firestore (São Paulo) y reglas de **condominio**
- [ ] Correo/contraseña **y** Anónimo habilitados; dominio autorizado
- [ ] Agregado en el Panel maestro (bloque pegado y `✓ Proyecto` visible)
- [ ] Link enviado al administrador; condominio creado y casas cargadas

## Si algo falla

| Lo que ves | Causa | Solución |
|---|---|---|
| "Falta configurar el proyecto central en config.js" | `central` todavía dice `PEGAR_AQUI` | A4 |
| En el panel: "El proyecto central aún no tiene sus reglas" | Faltan las reglas **central** | A2 |
| "El Panel maestro ya tiene dueño" | La cuenta dueña ya se creó | Entra con esa cuenta |
| "Esta cuenta no tiene acceso al Panel maestro" | Esa cuenta no es la dueña | Usa tu cuenta del panel |
| "No encontramos ese condominio" | El link tiene un identificador mal escrito | Copia el link desde el panel |
| En un condominio nuevo: "La base de datos aún no tiene las reglas de VisePass" | Faltan las reglas de condominio | B2 |
| El link de evento no genera el pase | Anónimo desactivado en ese condominio | B3 |
| "Servicio suspendido" | Está suspendido o bloqueado por pago | Panel maestro → Reactivar o Pagó 1 mes |
