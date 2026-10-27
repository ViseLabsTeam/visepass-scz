# VisePass SCZ — ¿Está lista para uso comercial? (27/10/2026)

## Respuesta corta

| Para… | Lista al | Qué falta |
|---|---|---|
| **Usarla de verdad en La Hacienda - Rincón (piloto)** | **85 %** | Probarla 1 semana en la garita con teléfonos reales, respaldos y un texto de privacidad |
| **Venderla a otros condominios** | **60 %** | Lo anterior + nombre del condominio configurable, avisos con la app cerrada, contrato y soporte |

Pruebas automáticas, todas correctas:
- 49 reglas de seguridad
- 60 pruebas de punta a punta con varios teléfonos a la vez (vecino, portería, administración e invitado)
- 11 de lógica de pases
- 10 de garita sin internet
- Todos los botones de cada panel pulsados, sin errores

---

## Lo nuevo en portería: a qué casa va y quién lo autorizó

En todas estas pantallas el guardia ve **Casa · Familia · Autorizado por**:

| Dónde | Ejemplo |
|---|---|
| Pase escaneado (entra) | **Va a** Casa 30 · Familia Peredo · Autorizado por: Familia Peredo |
| Pase rechazado | **Iba a** Casa 30 · Familia Peredo · Autorizado por: … |
| Salida | **Salió de** Casa 30 · Familia Peredo |
| Moto o taxi anunciado | Va a Casa 30 · Familia Peredo · Autorizado por: Familia Peredo |
| Link de churrasco | Autorizado por: Familia Peredo (Link Evento) |
| Anunciado por citófono | Autorizado por: Portería (anuncio por citófono · Familia Peredo) |

También aparece en la lista "Están adentro" y en las entradas manuales.

**Aviso de motos y taxis:** cuando un vecino anuncia un delivery, en la garita suena un pitido y aparece "🛵 PedidosYa va a Casa 30 · Familia Peredo · Autorizado por Familia Peredo". En el teléfono del guardia hay que tocar una vez **"Activar avisos"** (Portería → Taxis / Delivery).

Capturas: `porteria-tarjeta.png` y `porteria-destino.png`.

---

## Errores encontrados y corregidos en esta revisión

1. **Portería mostraba "⛔ Ese cambio no está permitido"** al dejar entrar a alguien.
   - La app intentaba guardar al visitante en los frecuentes de la casa, algo que solo puede hacer el vecino.
   - Corregido. Ahora ningún teléfono tiene cambios rechazados en las pruebas.
2. **Datos privados a la vista.** Sin iniciar sesión se podía leer el nombre de cada familia, quién está en mora y el correo del administrador.
   - Ahora solo los ven administración, portería y la propia casa.
   - La pantalla de ingreso muestra solo "🏠 Casa 30".
   - Los datos que ya tenías se protegen solos la primera vez que entras como Administración.
3. **La app no abría sin internet.** Si la garita perdía el wifi y el guardia cerraba la app, no volvía a abrir.
   - Ahora queda guardada en el teléfono (archivo nuevo `sw.js`).
   - Probado: sin internet abre, el guardia sigue con su sesión, escanea y deja pasar. Al volver internet, administración ve la entrada.
4. **Diseño cargado desde un servidor externo "solo para pruebas".** Tailwind CDN muestra un aviso de no usar en producción, hace más lenta la primera carga y fallaba sin internet.
   - Ahora el diseño va dentro de la app (36 KB) y se ve igual.
5. **Casa recién creada guardada en tres partes por separado.** Si el vecino entraba enseguida, podía fallar su primer pase.
   - Ahora se guarda todo junto o nada.
6. **"Autorizado por: Casa 30" en vez de la familia** si el vecino generaba el pase en el primer segundo después de entrar. Corregido.

---

## Lo que falta para uso comercial (por prioridad)

### Imprescindible antes de cobrar
1. **Piloto de 1 semana en la garita real.**
   - Probar la cámara con iPhone y Android, de noche y con el internet del guardia.
   - Las pruebas automáticas no reemplazan esto.
2. **Texto de privacidad y condiciones de uso.**
   - La app guarda nombre y C.I. de visitantes. Hace falta un aviso simple: quién guarda los datos, para qué y por cuánto tiempo.
   - Hoy el QR lleva el C.I. visible dentro del código.
3. **Respaldos.**
   - Por ahora usa el botón **Respaldo** de Administración una vez por semana.
   - Los respaldos automáticos de Firebase requieren el plan Blaze (pago por uso; para un condominio es prácticamente $0).
4. **Ocultar "Datos Demo" y "Limpiar" en la versión del cliente.**
   - Ya piden escribir BORRAR, pero un cliente no debería verlos.

### Para venderla a otros condominios
5. **Nombre del condominio configurable.** "La Hacienda - Rincón" está escrito en 19 lugares de la app; debería salir de la configuración.
6. **Un proyecto Firebase por condominio.** Es el modelo más simple para empezar: cada cliente con su base de datos separada, unos 15 minutos de instalación.
   - Un sistema único para muchos condominios es un proyecto más grande.
7. **Avisos con la app cerrada.** Hoy el pitido y la notificación funcionan con la app abierta o en segundo plano.
   - Para que suene con el teléfono bloqueado y la app cerrada hace falta Firebase Cloud Messaging (plan Blaze y una pequeña función en el servidor).
8. **Contrato, precio y soporte:** quién atiende si el guardia no puede entrar un domingo a la noche.

### Detalles menores
- Al cambiar el PIN de una casa, la cuenta anterior queda en Firebase → Authentication. No es un riesgo, porque las reglas la bloquean, pero ensucia la lista.
- Opcional: Firebase App Check, para impedir que alguien use tu base de datos desde otra app.

---

## Para actualizar tu versión publicada (en este orden)
1. Firebase → Firestore Database → **Reglas**: pega el `firestore.rules` nuevo → **Publicar**.
2. Sube a GitHub `index.html` y el archivo nuevo **`sw.js`**.
3. Entra una vez como **Administración**.

Detalle en `CONFIGURAR-FIREBASE.md`.
