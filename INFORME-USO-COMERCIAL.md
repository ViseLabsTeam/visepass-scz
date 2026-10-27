# VisePass — Estado para uso comercial (27/10/2026)

## Respuesta corta

| Para… | Antes | Ahora | Qué falta |
|---|---|---|---|
| **Usarla en La Hacienda (piloto)** | 85 % | **93 %** | 1 semana de prueba en la garita con teléfonos reales y un texto de privacidad |
| **Venderla a otros condominios** | 60 % | **80 %** | Lo anterior + avisos con la app cerrada, contrato y soporte |

Pruebas automáticas, todas correctas:
- 75 reglas de seguridad
- 88 pruebas de punta a punta con varios teléfonos a la vez
- 16 de lógica (incluye un vecino con el teléfono en hora de España)
- 10 de garita sin internet
- Todos los botones de cada panel, sin errores

---

## Qué se hizo

### Seguridad
- **Se acabó el PIN 0000.**
  - Cada casa recibe un PIN al azar de 6 números que administración ve una sola vez.
  - Al entrar por primera vez, la familia crea su PIN personal. No se aceptan PIN fáciles como 000000 o 123456.
  - Las casas que ya existían también deben crear el suyo en su próximo ingreso.
- **QR nuevo:** solo lleva el número del pase, la casa y una clave al azar.
  - Ya no lleva nombre ni C.I.
  - Portería verifica la clave en la base de datos: un QR copiado o alterado no entra.
  - Los pases que ya se habían compartido siguen funcionando.
- **El C.I. se ve parcial** (•••123 SC) en la tarjeta y la imagen del pase, porque se reenvían por WhatsApp.
- **Reglas de Firebase más estrictas:**
  - Un vecino o invitado no puede marcar "carnet ya verificado" ni inventar quién autorizó.
  - Un vecino no puede escribir entradas falsas en la bitácora.
  - Nadie puede borrar la bitácora.
  - Una cuenta vieja de la casa (después de un PIN nuevo) ya no lee nada.
- **"Autorizado por"** se calcula a partir de quién creó el pase, no del texto que manda el teléfono.

### Link de churrasco
- Se elige el **día del evento** y la hora en que termina.
- El pase del invitado vale **solo ese día**: antes del evento portería lo rechaza ("todavía no es el día") y el link vence solo.
- Un vecino de otra casa con sesión abierta también puede usar el link en su teléfono.
- Se quitó "Ver como invitado", que creaba un pase de verdad.

### Portería
- Una visita aprobada por citófono **sin internet** ya no desaparece de "Están adentro" al volver la conexión. El guardia anota nombre y C.I. del carnet.
- Buscar a alguien por nombre ya no cambia la cámara a modo "salida".
- Una verificación lenta ya no pisa el resultado del siguiente escaneo.
- Quien está en la lista negra **puede salir**; solo se le bloquea la entrada.
- El QR que queda frente a la cámara muestra "entrada ya registrada" en vez de una falsa alarma de reingreso.
- Botón nuevo **"No coincide"** cuando el carnet no es el del pase.
- **"Anotar sin QR":**
  - la casa se elige de una lista con la familia;
  - se respetan los horarios del personal del hogar y de los proveedores.
- La alerta de horario lleva a "Están adentro" en vez de marcar la salida de alguien sin confirmar.
- La cámara se apaga bien al cerrar sesión.
- Con días encendido, el teléfono del guardia ya no se pone lento.

### Vecino
- Sin señal, el pase muestra **"⏳ Enviando…"** y no deja compartirlo hasta que llegue a portería.
- Una carga lenta ya no cierra la sesión.
- Si administración le da un PIN nuevo a la casa, los teléfonos viejos salen solos con aviso.

### Hora de Bolivia
- Pases, horarios y bitácora se calculan en hora boliviana aunque el teléfono esté en otro país.

### Administración
- **Pestañas:** Casas · Seguridad · Lista negra · Bitácora. Antes era una sola pantalla de 4 metros.
- La bitácora se ve como **tarjetas en el celular** y se puede consultar **cualquier día**, no solo los últimos 2000 registros.
- **Nombre del condominio configurable.** Ya no está fijo "La Hacienda"; se puede vender a otro condominio.
- **Traspaso de la administración** a otra persona.
- **Respaldo completo** descargado del servidor. **Restaurar no borra nada** y se puede repetir.
- Contraseñas nuevas de administración y portería: mínimo 8 caracteres.

### Costo y velocidad
- La pantalla de ingreso lee **un solo documento** en vez de una lectura por casa.
- Cada perfil descarga solo lo reciente:
  - vecino: el último mes;
  - portería: los vigentes y los que están adentro;
  - administración: 60 días.
- Los avisos de taxi vencidos ya no quedan "pendientes" para siempre.
- El service worker actualiza la app en segundo plano aunque el internet de la garita sea lento.

### Retirado
- "Datos Demo", "Limpiar Todo" y "Reiniciar Bitácora".
- Textos falsos o viejos: "Google Wallet", "listo para tu demostración", "se guarda en este navegador", "PIN por defecto 0000", "Invitación a Casa 30 (Casa 30)".
- Los datos de ejemplo que aparecían un instante.
- El inspector técnico del QR.
- Código que ya no se usaba.

---

## Lo que falta (fuera de la app)

1. **Piloto de 1 semana en la garita:** cámara de iPhone y Android, de noche y con el internet real.
2. **Probar en un iPhone real** que "Agregar a Apple Wallet" funciona como dice la app.
3. **Texto de privacidad y condiciones:** quién guarda los datos de las visitas, para qué y por cuánto tiempo.
4. **Respaldo semanal:** botón Seguridad → Descargar respaldo.
5. **Avisos con la app cerrada** (que suene con el teléfono bloqueado): requiere Firebase Cloud Messaging y el plan Blaze.
6. **Para cada condominio nuevo:** su propio proyecto Firebase (unos 15 minutos de instalación), además de contrato, precio y soporte.

### Detalles menores que quedan
- Al dar un PIN nuevo, la cuenta anterior de la casa queda en Firebase → Authentication. No es un riesgo, porque no puede hacer nada, pero ensucia la lista.
- Si dos teléfonos de la misma casa editan sus "frecuentes" al mismo tiempo, gana el último.
- Firebase App Check (opcional) frenaría a quien intente usar la base de datos desde otra app.
