import type { TourStep } from '@/shared/components/ui/OnboardingTour';

// ──────────────────────────────────────────────────────────────────
// SELECTORES — se usan clases únicas de los contenedores padre
// para no depender de IDs (sin tocar el código existente).
//
// Movimientos: el header tiene "flex justify-between items-center mb-6"
//              => selector: .mb-6 > .flex.gap-2.items-center
//
// Pedidos:     el header tiene "flex justify-between items-end"
// y el section: "mt-8 flex flex-col gap-[1.25rem]"
//              => selector: section.mt-8.flex .flex.justify-between.items-end .flex.gap-2.items-center
// ──────────────────────────────────────────────────────────────────

const ecommerceTourSteps: TourStep[] = [

    // ── PASO 1: Bienvenida ──────────────────────────────────────────
    {
        target: '#tour-main-content',
        title: '¡Bienvenido a Tiktuy!',
        content: 'Este es tu Panel de Control. Aquí ves los couriers disponibles en tu ciudad.',
        placement: 'top',
        icon: 'lucide:layout-panel-top',
        navigateTo: '/ecommerce',
    },

    // ── PASO 2: Asociarse con un courier ───────────────────────────
    {
        target: 'table tbody tr:first-child td:last-child',
        title: 'Asóciate con un courier',
        content:
            'En la columna "Acciones" puedes solicitar asociarte con un courier (botón verde ✔). Si ya tienes uno activo, ¡puedes continuar al siguiente paso!',
        placement: 'left',
        icon: 'mdi:handshake-outline',
    },

    // ── PASO 3: Ir a Stock (sidebar) ───────────────────────────────
    {
        target: 'a[href="/ecommerce/stock"]',
        title: 'Stock de Productos',
        content: 'Aquí registrarás tus productos y los asignarás a tu almacén (sede). Es el siguiente paso antes de hacer movimientos.',
        placement: 'right',
        icon: 'vaadin:stock',
        navigateTo: '/ecommerce/stock',
    },

    // ── PASO 4: Botones Excel + Nuevo Producto ─────────────────────
    {
        // Contenedor único: flex gap-2 items-end (solo en Stock)
        target: '.flex.gap-2.items-end',
        title: 'Crea o importa productos',
        content:
            'Usa "Nuevo Producto" para añadir productos uno a uno, o el botón de Excel para importar varios de una sola vez.',
        placement: 'left',
        icon: 'tabler:cube-plus',
    },

    // ── PASO 5: Ir a Movimientos (sidebar) ─────────────────────────
    {
        target: 'a[href="/ecommerce/movimientos"]',
        title: 'Movimientos de stock',
        content:
            'Aquí gestionas el envío de productos hacia el courier. También puedes validar movimientos que el courier te solicite.',
        placement: 'right',
        icon: 'icon-park-outline:cycle-movement',
        navigateTo: '/ecommerce/movimientos',
    },

    // ── PASO 6: Botones Nuevo Movimiento + Ver/Validar ─────────────
    {
        // El header de Movimientos tiene class "mb-6" única → su hijo directo con gap-2
        target: '.mb-6 > .flex.gap-2.items-center',
        title: 'Crear y validar movimientos',
        content:
            '"Nuevo Movimiento" para enviar tu stock al courier. "Ver Movimientos / Validar" para revisar y aprobar los movimientos que el courier te solicite.',
        placement: 'left',
        icon: 'hugeicons:validation',
    },

    // ── PASO 7: Ir a Pedidos (sidebar) ─────────────────────────────
    {
        target: 'a[href="/ecommerce/pedidos"]',
        title: 'Gestión de Pedidos',
        content:
            'Con tu stock validado, puedes generar pedidos. El courier los asignará a un repartidor para la entrega.',
        placement: 'right',
        icon: 'lsicon:shopping-cart-filled',
        navigateTo: '/ecommerce/pedidos',
    },

    // ── PASO 8: Botones Nuevo Pedido + Excel ───────────────────────
    {
        // Contenedor "flex gap-2 items-center" dentro del header que está después de las tabs
        target: 'section.mt-8.flex > div.flex.justify-between.items-end:nth-of-type(2) .flex.gap-2.items-center',
        title: 'Crea tu primer pedido',
        content:
            'Usa "Nuevo Pedido" para generarlo manualmente, o importa varios desde Excel.',
        placement: 'left',
        icon: 'mdi:rocket-launch-outline',
    },

    // ── PASO 9: Pestaña Asignado ───────────────────────────────────
    {
        // Las tabs están en el primer div.flex.justify-between.items-end
        // El botón asignado es el 3er hijo de su contenedor (botón, span, botón)
        target: 'section.mt-8.flex > div.flex.justify-between.items-end:nth-of-type(1) .flex.gap-3.items-center button:nth-of-type(2)',
        title: 'Pedidos en camino',
        content:
            'Una vez que el courier asigna un repartidor (motorizado) a tu pedido, pasará a esta pestaña. Aquí puedes ver quién lo lleva.',
        placement: 'left',
        icon: 'solar:bill-list-broken',
    },

    // ── PASO 10: Pestaña Completado ────────────────────────────────
    {
        // El botón completado es el 5to hijo (botón, span, botón, span, botón),
        // pero como nth-of-type cuenta solo su tipo, es el 3er botón
        target: 'section.mt-8.flex > div.flex.justify-between.items-end:nth-of-type(1) .flex.gap-3.items-center button:nth-of-type(3)',
        title: 'Entrega finalizada',
        content:
            'Cuando el repartidor finaliza su recorrido y entrega el paquete, el pedido aparecerá aquí como Completado.',
        placement: 'left',
        icon: 'carbon:task-complete',
    },

    // ── PASO 11: Cuadre de Saldos ───────────────────────────────────
    {
        target: 'a[href="/ecommerce/saldos"]',
        title: 'Cuadre de Saldos',
        content:
            'Aquí validas y haces seguimiento de los pagos con tu courier. Puedes ver los abonos, saldos pendientes y confirmar los montos acordados por cada entrega.',
        placement: 'right',
        icon: 'prime:wallet',
        navigateTo: '/ecommerce/saldos',
    },

    // ── PASO 10: Reportes ──────────────────────────────────────────
    {
        target: 'a[href="/ecommerce/reportes"]',
        title: 'Reportes',
        content:
            'Visualiza el resumen de tu negocio: ingresos generados, entregas completadas, pedidos por estado y más.',
        placement: 'right',
        icon: 'carbon:report-data',
        navigateTo: '/ecommerce/reportes',
    },
];


// ── Pasos vacíos para otros roles (pendientes) ───────────────────
export const defaultTourSteps: TourStep[] = [];

// ──────────────────────────────────────────────────────────────────
// PASOS PARA EL ROL COURIER
// ──────────────────────────────────────────────────────────────────
const courierTourSteps: TourStep[] = [
    // ── PASO 1: Panel (Ecommerce) ──────────────────────────────────
    {
        // En Panel de Control, los tabs están en un div de "flex gap-3", siendo "Ecommerce" el primer botón
        target: '.flex.justify-between.items-center.pb-5.border-b.border-gray30 > .flex.gap-3 > button:nth-of-type(1)',
        title: 'Gestión de Ecommerce',
        content: 'Aquí administras los negocios Ecommerce asociados a tu courier. Puedes invitar a nuevos o registrar uno manualmente.',
        placement: 'left',
        icon: 'carbon:task-complete',
        navigateTo: '/courier',
    },
    // ── PASO 2: Panel (Motorizados) ────────────────────────────────
    {
        // Y "Motorizado" es el segundo botón
        target: '.flex.justify-between.items-center.pb-5.border-b.border-gray30 > .flex.gap-3 > button:nth-of-type(2)',
        title: 'Gestión de Motorizados',
        content: 'Cambia a esta pestaña para administrar tus repartidores. Desde aquí les envías invitaciones o los registras.',
        placement: 'left',
        icon: 'solar:bill-list-broken',
    },
    // ── PASO 3: Formas de Registro ─────────────────────────────────
    {
        // Contenedor de los botones "Invitar" y "Registrar..." en la vista Courier
        target: 'div.mt-8.flex.flex-col > div:nth-of-type(2) > div.flex.gap-3',
        title: 'Invitar y Registrar',
        content: 'Usa "Invitar" para generar un link de asociación rápido, o el botón oscuro para registrarlos de forma manual directamente aquí.',
        placement: 'left',
        icon: 'mdi:share-variant-outline',
    },
    // ── PASO 4: Movimientos ────────────────────────────────────────
    {
        target: 'a[href="/courier/movimientos"]',
        title: 'Validación de Movimientos',
        content: 'Cuando un Ecommerce te envía productos a tu almacén, llegarán aquí. Usa esta vista para revisar las cantidades y validarlas.',
        placement: 'right',
        icon: 'icon-park-outline:cycle-movement',
        navigateTo: '/courier/movimientos',
    },
    // ── PASO 5: Stock (Recibido) ───────────────────────────────────
    {
        target: 'a[href="/courier/stock"]',
        title: 'Stock Recibido',
        content: 'Una vez validados los movimientos, los productos aparecerán aquí. Solo observarás los productos que los Ecommerce te han enviado y has recibido en tu almacén.',
        placement: 'right',
        icon: 'vaadin:stock',
        navigateTo: '/courier/stock',
    },
    // ── PASO 6: Pedidos (Asignados) ────────────────────────────────
    {
        target: 'a[href="/courier/pedidos"]',
        title: 'Asignar Pedidos',
        content: 'Los pedidos creados por los Ecommerce aparecerán aquí en la pestaña "Asignados". El siguiente paso es despacharlos a tus motorizados.',
        placement: 'right',
        icon: 'lsicon:shopping-cart-filled',
        navigateTo: '/courier/pedidos',
    },
    // ── PASO 7: Checkbox y Asignar Repartidor ──────────────────────
    {
        // El checkbox general y el botón de asignar están en la tabla de Pedidos
        target: '.my-2',
        title: 'Selecciona y Asigna',
        content: 'Selecciona uno o varios pedidos usando las casillas de verificación, y haz clic en "Asignar Repartidor" (también puedes reprogramarlos).',
        placement: 'top',
        icon: 'hugeicons:motorcycle',
    },
    // ── PASO 8: Zonas Tarifarias ───────────────────────────────────
    {
        target: 'a[href="/courier/zonas"]',
        title: 'Configurar Zonas Tarifarias',
        content: 'Define tus zonas de atención (distritos) y asígnales los costos de envío que cobrarás. Esto es clave para los cobros.',
        placement: 'right',
        icon: 'mdi:map-marker-path',
        navigateTo: '/courier/zonas',
    },
    // ── PASO 9: Cuadre (Motorizado) ────────────────────────────────
    {
        target: '.flex.items-end.justify-between.pb-5.border-b.border-gray30 > .flex.items-end.gap-3 > button:nth-of-type(2)',
        title: 'Cuadre con Motorizados',
        content: 'Cambia a la pestaña Repartidor para revisar cuánto dinero han recaudado tus motorizados y registrar sus pagos.',
        placement: 'left',
        icon: 'hugeicons:motorbike-02',
        navigateTo: '/courier/cuadresaldo',
    },
    // ── PASO 10: Cuadre (Ecommerce / Repartidor) ───────────────────
    {
        // Botón abonar (en la vista por defecto de Ecommerce es "Abonar Ecommerce")
        target: '.pt-8 > div:nth-of-type(2) > .flex.items-center.justify-between > button',
        title: 'Abonar Saldos',
        content: 'Usa el botón de Abonar para registrar el abono o liquidación tras seleccionar las fechas correspondientes. Aplica para ambas pestañas.',
        placement: 'left',
        icon: 'mynaui:store',
    },
    // ── PASO 11: Reportes ──────────────────────────────────────────
    {
        target: 'a[href="/courier/reportes"]',
        title: 'Reportes y Métricas',
        content: 'Visualiza tus ingresos totales, entregas de motorizados y estados generales de tus envíos.',
        placement: 'right',
        icon: 'carbon:report-data',
        navigateTo: '/courier/reportes',
    },
];

// ──────────────────────────────────────────────────────────────────
// PASOS PARA EL ROL MOTORIZADO
// ──────────────────────────────────────────────────────────────────
const motorizadoTourSteps: TourStep[] = [
    // ── PASO 1: Estado / Actividad ──────────────────────────────────
    {
        target: 'header.bg-transparent .flex.justify-end .flex.items-center.gap-3',
        title: 'Disponibilidad de Trabajo',
        content: 'Por defecto apareces como Inactivo. No olvides cambiar tu estado a "Activo" para empezar a recibir pedidos, y volver a desactivarlo al terminar tu turno.',
        placement: 'left',
        icon: 'mdi:account-switch-outline',
        navigateTo: '/motorizado',
    },
    // ── PASO 2: Gestión de Pedidos ─────────────────────────────────
    {
        target: 'header nav > div.flex.flex-wrap',
        title: 'Gestión de Pedidos',
        content: 'Aquí verás los pedidos "Asignados". Una vez que interactúas con ellos se pondrán en "Pendientes", y cuando finalices la entrega pasarán a "Terminados".',
        placement: 'left',
        icon: 'lsicon:shopping-cart-filled',
        navigateTo: '/motorizado/pedidos',
    },
    // ── PASO 3: Cuadre de Saldos ───────────────────────────────
    {
        target: 'section.mt-4 > div.w-full.min-w-0.mb-5',
        title: 'Cuadre de Saldos',
        content: 'Aquí estarán los pedidos abonados por tu courier. Revisa tus liquidaciones y valida los pagos.',
        placement: 'bottom',
        icon: 'prime:wallet',
        navigateTo: '/motorizado/cuadreSaldo',
    },
    // ── PASO 4: Reportes y Ganancias ───────────────────────────────
    {
        target: '.bg-white.rounded.shadow-default.border-b-4.border-gray90.overflow-hidden.flex.flex-col',
        title: 'Historial de Entregas',
        content: 'En esta sección se listará el historial general de los pedidos que realizaste. Aquí podrás revisar tus ganancias totales.',
        placement: 'top',
        icon: 'carbon:report-data',
        navigateTo: '/motorizado/reportes',
    },
];

export const roleSteps: Record<string, TourStep[]> = {
    ecommerce: ecommerceTourSteps,
    representante_ecommerce: ecommerceTourSteps,
    courier: courierTourSteps,
    motorizado: motorizadoTourSteps,
    // admin:      [],
};

export function getStepsForRole(roleName?: string): TourStep[] {
    if (!roleName) return defaultTourSteps;
    const key = roleName.toLowerCase();
    return roleSteps[key] ?? defaultTourSteps;
}
