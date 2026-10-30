// VisePass — configuración del servicio.
// Una sola app para todos los condominios. Este archivo dice:
//  1) "central": el proyecto Firebase central (lista de condominios y Panel maestro).
//     Pegar sus datos aquí (ver CREAR-CONDOMINIO.md, parte A). Mientras diga PEGAR_AQUI,
//     la app funciona igual con los condominios de la lista "condos" y sin Panel maestro.
//  2) "defaultCondo": el condominio que abre un teléfono que todavía no eligió ninguno
//     (así los teléfonos y links de La Hacienda siguen funcionando como siempre).
//  3) "condos": condominios fijos. Los nuevos se agregan desde el Panel maestro, no aquí.
// Estos datos son públicos por diseño: la seguridad la dan las reglas de Firestore.
window.VISEPASS_CONFIG = {
    central: {
        apiKey: 'PEGAR_AQUI',
        authDomain: 'PEGAR_AQUI.firebaseapp.com',
        projectId: 'PEGAR_AQUI',
        storageBucket: 'PEGAR_AQUI.firebasestorage.app',
        messagingSenderId: 'PEGAR_AQUI',
        appId: 'PEGAR_AQUI'
    },
    defaultCondo: 'lahacienda',
    condos: {
        lahacienda: {
            name: 'La Hacienda - Rincón',
            firebase: {
                apiKey: 'AIzaSyBkgyoPnSzOGLNptJrjWrqbYMLAqXGxYdY',
                authDomain: 'visepass-edb93.firebaseapp.com',
                projectId: 'visepass-edb93',
                storageBucket: 'visepass-edb93.firebasestorage.app',
                messagingSenderId: '617499757663',
                appId: '1:617499757663:web:e18bb0e252cba98be61fea'
            }
        }
    }
};
