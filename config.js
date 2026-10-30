// VisePass — configuración del servicio.
// Una sola app para todos los condominios. Este archivo dice:
//  1) "central": el proyecto Firebase central (lista de condominios y Panel maestro).
//     Proyecto: visepass-central (ver CREAR-CONDOMINIO.md, parte A).
//  2) "defaultCondo": el condominio que abre un teléfono que todavía no eligió ninguno
//     (así los teléfonos y links de La Hacienda siguen funcionando como siempre).
//  3) "condos": condominios fijos. Los nuevos se agregan desde el Panel maestro, no aquí.
// Estos datos son públicos por diseño: la seguridad la dan las reglas de Firestore.
window.VISEPASS_CONFIG = {
    central: {
        apiKey: 'AIzaSyB0JdqDqhmtFUsqZtrXC7cxuJuv6hnHKuw',
        authDomain: 'visepass-central.firebaseapp.com',
        projectId: 'visepass-central',
        storageBucket: 'visepass-central.firebasestorage.app',
        messagingSenderId: '46012914945',
        appId: '1:46012914945:web:02984c88b41c77dfebcf00'
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
