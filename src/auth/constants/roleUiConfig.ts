// src/auth/constants/roleUiConfig.ts
import type { VisualRole } from './roles';

export type RoleTheme = {
  primaryColor: string;       // Background color for primary elements (buttons, headers)
  primaryColorHover: string;  // Hover background color
  primaryColorRing: string;   // Ring color for focus states
  primaryText: string;        // Text color for headers or emphasis
  badgeBg: string;            // Background for subtle badges
  badgeText: string;          // Text color for subtle badges
  sidebarActiveBg: string;    // Fondo para ítem activo en sidebar
  sidebarActiveBar: string;   // Color de la barra indicadora
  sidebarIconActiveBg: string;// Fondo del ícono activo
  sidebarIconHoverBg: string; // Fondo del ícono en hover
  cssVariables: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
  };
};

export type RoleLabels = {
  // Sidebar
  sidebarStock: string;
  sidebarPedidos: string;

  // Generales
  entityName: string;
  
  // Dashboard
  dashboardTitle: string;
  dashboardSubtitle: string;
  
  // Asociaciones / Convenios
  registerButton: string;
  associateTitle: string;
  desassociateTitle: string;
  
  // Tabla general
  tableEntityColumn: string;  // Nombre de columna (Ej. "Ecommerce", "Restaurante", "Motorizado")
  tableEntityPlaceholder: string; // "Seleccionar Ecommerce", etc.
  
  // Pedidos
  pedidosTitle: string;
  pedidosSubtitle: string;
  pedidosCreateButton: string;
  
  // Stock / Almacén
  stockTitle: string;
  stockSubtitle: string;
  stockCreateButton: string;
  labelAlmacen: string;
  labelProducto: string;
  labelProductos: string;
  pedidosCrearDesc: string;
  pedidosAgregarProd: string;
  searchProductoPlaceholder: string;
  
  // Movimientos
  movimientosTitle: string;
  movimientosSubtitle: string;
  movimientosCreateButton: string;
  
  // Cuadre de Saldo
  cuadreTitle: string;
  cuadreSubtitle: string;
  
  // Perfiles
  perfilesTitle: string;
  perfilesSubtitle: string;
  perfilesCreateButton: string;
  
  // Reportes
  reportesTitle: string;
  reportesSubtitle: string;

  // Modales de Producto / Plato
  modalNuevoProducto: string;
  modalNuevoProductoDesc: string;
  modalEditarProducto: string;
  modalEditarProductoDesc: string;
  modalVerProducto: string;
  modalVerProductoDesc: string;
  labelNombreProducto: string;
  placeholderNombreProducto: string;
  placeholderDescProducto: string;
};

export type RoleUiConfig = {
  theme: RoleTheme;
  labels: RoleLabels;
};

// --- ECOMMERCE ---
const ecommerceConfig: RoleUiConfig = {
  theme: {
    primaryColor: 'bg-[#0F172A]',
    primaryColorHover: 'hover:bg-black',
    primaryColorRing: 'focus-visible:ring-slate-500',
    primaryText: 'text-[#6B21A8]',
    badgeBg: 'bg-[#F3E8FF]',
    badgeText: 'text-[#6B21A8]',
    sidebarActiveBg: 'bg-[#EEF4FF]',
    sidebarActiveBar: 'bg-[#1E3A8A]',
    sidebarIconActiveBg: 'bg-[#1E3A8A]/10',
    sidebarIconHoverBg: 'group-hover:bg-[#1E3A8A]/8',
    cssVariables: {
      primary: '#1E3A8A',
      primaryLight: '#0044FF',
      primaryDark: '#111827',
    },
  },
  labels: {
    sidebarStock: 'Stock de Productos',
    sidebarPedidos: 'Gestión de Pedidos',
    entityName: 'Ecommerce',
    dashboardTitle: 'Panel de Control',
    dashboardSubtitle: 'Monitoreo de asociación por SEDES',
    registerButton: 'Registrar Ecommerce',
    associateTitle: 'Asociar Courier',
    desassociateTitle: 'Desasociar Courier',
    tableEntityColumn: 'Courier',
    tableEntityPlaceholder: 'Seleccionar Courier',
    pedidosTitle: 'Gestión de Pedidos',
    pedidosSubtitle: 'Administración de los pedidos generados y asignados',
    pedidosCreateButton: 'Crear Pedido',
    stockTitle: 'Mi Almacén',
    stockSubtitle: 'Administración y registro de inventario',
    stockCreateButton: 'Registrar Producto',
    labelAlmacen: 'Almacén',
    labelProducto: 'Producto',
    labelProductos: 'Productos',
    pedidosCrearDesc: 'Un pedido puede tener varios productos y una sola fecha de entrega.',
    pedidosAgregarProd: 'Agregar producto',
    searchProductoPlaceholder: 'Buscar productos por nombre, código o descripción',
    movimientosTitle: 'Movimiento de Almacén',
    movimientosSubtitle: 'Registro de traslados a Courier',
    movimientosCreateButton: 'Registrar Movimiento',
    cuadreTitle: 'Cuadre de Saldos',
    cuadreSubtitle: 'Pagos realizados por couriers',
    perfilesTitle: 'Perfiles Trabajadores',
    perfilesSubtitle: 'Gestionar accesos y módulos',
    perfilesCreateButton: 'Crear Perfil',
    reportesTitle: 'Reportes de Ecommerce',
    reportesSubtitle: 'Resumen de ingresos y entregas',
    modalNuevoProducto: 'REGISTRAR NUEVO PRODUCTO',
    modalNuevoProductoDesc: 'Registra un nuevo producto en tu inventario especificando su información básica, ubicación en almacén y condiciones de stock.',
    modalEditarProducto: 'EDITAR PRODUCTO',
    modalEditarProductoDesc: 'Modifica la información del producto existente.',
    modalVerProducto: 'DETALLE DEL PRODUCTO',
    modalVerProductoDesc: 'Consulta todos los datos registrados de este producto.',
    labelNombreProducto: 'Nombre del Producto',
    placeholderNombreProducto: 'Ejem. Zapatos de Cuero',
    placeholderDescProducto: 'Describe el producto…',
  },
};

// --- RESTAURANTE ---
const restauranteConfig: RoleUiConfig = {
  theme: {
    primaryColor: 'bg-rose-600',
    primaryColorHover: 'hover:bg-rose-700',
    primaryColorRing: 'focus-visible:ring-rose-500',
    primaryText: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    sidebarActiveBg: 'bg-[#EEF4FF]',
    sidebarActiveBar: 'bg-[#1E3A8A]',
    sidebarIconActiveBg: 'bg-[#1E3A8A]/10',
    sidebarIconHoverBg: 'group-hover:bg-[#1E3A8A]/8',
    cssVariables: {
      primary: '#9A3412',      // Naranja quemado oscuro (para títulos)
      primaryLight: '#EA580C', // Naranja intermedio
      primaryDark: '#9A3412',  // Naranja quemado oscuro (para líneas gruesas y estructura)
    },
  },
  labels: {
    sidebarStock: 'Nuestra Carta',
    sidebarPedidos: 'Gestión de Pedidos',
    entityName: 'Restaurante',
    dashboardTitle: 'Panel de Control',
    dashboardSubtitle: 'Monitoreo de asociación de Sucursales',
    registerButton: 'Registrar Restaurante',
    associateTitle: 'Asociar Delivery',
    desassociateTitle: 'Desasociar Delivery',
    tableEntityColumn: 'Delivery',
    tableEntityPlaceholder: 'Seleccionar Delivery',
    pedidosTitle: 'Gestión de Pedidos',
    pedidosSubtitle: 'Administración de las órdenes generadas y en preparación',
    pedidosCreateButton: 'Nueva Orden',
    stockTitle: 'Gestión de Carta',
    stockSubtitle: 'Administra tu menú, actualiza precios y disponibilidad de tus platos',
    stockCreateButton: 'Añadir Plato',
    labelAlmacen: 'Delivery',
    labelProducto: 'Plato',
    labelProductos: 'Platos',
    pedidosCrearDesc: 'Una orden puede tener varios platos y una sola fecha de entrega.',
    pedidosAgregarProd: 'Agregar plato',
    searchProductoPlaceholder: 'Buscar platos por nombre, código o descripción',
    movimientosTitle: 'Entregado a Delivery',
    movimientosSubtitle: 'Registro de platos entregados a la agencia de Delivery',
    movimientosCreateButton: 'Registrar Entrega',
    cuadreTitle: 'Cuadre de Saldos',
    cuadreSubtitle: 'Pagos realizados por deliveries',
    perfilesTitle: 'Perfiles Trabajadores',
    perfilesSubtitle: 'Gestionar accesos y módulos',
    perfilesCreateButton: 'Crear Perfil',
    reportesTitle: 'Reportes de Restaurante',
    reportesSubtitle: 'Resumen de ingresos y entregas',
    modalNuevoProducto: 'REGISTRAR NUEVO PLATO',
    modalNuevoProductoDesc: 'Registra un nuevo plato en tu carta especificando su información básica y detalles.',
    modalEditarProducto: 'EDITAR PLATO',
    modalEditarProductoDesc: 'Modifica la información del plato existente.',
    modalVerProducto: 'DETALLE DEL PLATO',
    modalVerProductoDesc: 'Consulta todos los datos registrados de este plato.',
    labelNombreProducto: 'Nombre del Plato',
    placeholderNombreProducto: 'Ejem. Lomo Saltado',
    placeholderDescProducto: 'Describe el plato (ingredientes, porción)...',
  },
};

// --- COURIER ---
const courierConfig: RoleUiConfig = {
  theme: {
    primaryColor: 'bg-[#0057A3]',
    primaryColorHover: 'hover:bg-blue-800',
    primaryColorRing: 'focus-visible:ring-blue-500',
    primaryText: 'text-[#0057A3]',
    badgeBg: 'bg-[#E6EEF6]',
    badgeText: 'text-[#0057A3]',
    sidebarActiveBg: 'bg-[#E6EEF6]',
    sidebarActiveBar: 'bg-[#0057A3]',
    sidebarIconActiveBg: 'bg-[#0057A3]/10',
    sidebarIconHoverBg: 'group-hover:bg-[#0057A3]/10',
    cssVariables: {
      primary: '#0057A3',
      primaryLight: '#0073E6',
      primaryDark: '#003366',
    },
  },
  labels: {
    sidebarStock: 'Stock de Productos',
    sidebarPedidos: 'Gestión de Pedidos',
    entityName: 'Courier',
    dashboardTitle: 'Panel de Control',
    dashboardSubtitle: 'Monitoreo de convenios y repartidores',
    registerButton: 'Registrar Repartidor',
    associateTitle: 'Asociar Ecommerce',
    desassociateTitle: 'Desasociar Ecommerce',
    tableEntityColumn: 'Ecommerce',
    tableEntityPlaceholder: 'Seleccionar Ecommerce',
    pedidosTitle: 'Gestión de Pedidos',
    pedidosSubtitle: 'Administración y asignación de pedidos a motorizados',
    pedidosCreateButton: 'Asignar Pedido',
    stockTitle: 'Almacén Courier',
    stockSubtitle: 'Recepción y almacenamiento de productos',
    stockCreateButton: 'Recibir Productos',
    labelAlmacen: 'Almacén',
    labelProducto: 'Producto',
    labelProductos: 'Productos',
    pedidosCrearDesc: 'Un pedido puede tener varios productos y una sola fecha de entrega.',
    pedidosAgregarProd: 'Agregar producto',
    searchProductoPlaceholder: 'Buscar productos por nombre, código o descripción',
    movimientosTitle: 'Movimiento de Almacén',
    movimientosSubtitle: 'Validación de traslados',
    movimientosCreateButton: 'Validar Movimiento',
    cuadreTitle: 'Cuadre de Saldos',
    cuadreSubtitle: 'Registro de liquidaciones con Ecommerces',
    perfilesTitle: 'Perfiles Trabajadores',
    perfilesSubtitle: 'Gestionar accesos y módulos',
    perfilesCreateButton: 'Crear Perfil',
    reportesTitle: 'Reportes de Courier',
    reportesSubtitle: 'Resumen de ingresos y entregas',
    modalNuevoProducto: 'REGISTRAR NUEVO PRODUCTO',
    modalNuevoProductoDesc: 'Registra un nuevo producto en tu inventario especificando su información básica, ubicación en almacén y condiciones de stock.',
    modalEditarProducto: 'EDITAR PRODUCTO',
    modalEditarProductoDesc: 'Modifica la información del producto existente.',
    modalVerProducto: 'DETALLE DEL PRODUCTO',
    modalVerProductoDesc: 'Consulta todos los datos registrados de este producto.',
    labelNombreProducto: 'Nombre del Producto',
    placeholderNombreProducto: 'Ejem. Zapatos de Cuero',
    placeholderDescProducto: 'Describe el producto…',
  },
};

// --- DELIVERY ---
const deliveryConfig: RoleUiConfig = {
  theme: {
    primaryColor: 'bg-emerald-600',
    primaryColorHover: 'hover:bg-emerald-700',
    primaryColorRing: 'focus-visible:ring-emerald-500',
    primaryText: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    sidebarActiveBg: 'bg-emerald-50',
    sidebarActiveBar: 'bg-emerald-600',
    sidebarIconActiveBg: 'bg-emerald-600/10',
    sidebarIconHoverBg: 'group-hover:bg-emerald-600/10',
    cssVariables: {
      primary: '#059669',
      primaryLight: '#10b981',
      primaryDark: '#064e3b',
    },
  },
  labels: {
    sidebarStock: 'Almacén Delivery',
    sidebarPedidos: 'Gestión de Pedidos',
    entityName: 'Delivery',
    dashboardTitle: 'Panel de Control',
    dashboardSubtitle: 'Monitoreo de convenios y repartidores',
    registerButton: 'Registrar Repartidor',
    associateTitle: 'Asociar Restaurante',
    desassociateTitle: 'Desasociar Restaurante',
    tableEntityColumn: 'Restaurante',
    tableEntityPlaceholder: 'Seleccionar Restaurante',
    pedidosTitle: 'Gestión de Pedidos',
    pedidosSubtitle: 'Administración y asignación de pedidos a motorizados',
    pedidosCreateButton: 'Asignar Pedido',
    stockTitle: 'Almacén Delivery',
    stockSubtitle: 'Recepción y almacenamiento',
    stockCreateButton: 'Recibir Platos',
    labelAlmacen: 'Almacén',
    labelProducto: 'Plato',
    labelProductos: 'Platos',
    pedidosCrearDesc: 'Una orden puede tener varios platos y una sola fecha de entrega.',
    pedidosAgregarProd: 'Agregar plato',
    searchProductoPlaceholder: 'Buscar platos por nombre, código o descripción',
    movimientosTitle: 'Movimientos',
    movimientosSubtitle: 'Validación de traslados',
    movimientosCreateButton: 'Validar Movimiento',
    cuadreTitle: 'Cuadre de Saldos',
    cuadreSubtitle: 'Registro de liquidaciones con Restaurantes',
    perfilesTitle: 'Perfiles Trabajadores',
    perfilesSubtitle: 'Gestionar accesos y módulos',
    perfilesCreateButton: 'Crear Perfil',
    reportesTitle: 'Reportes de Delivery',
    reportesSubtitle: 'Resumen de ingresos y entregas',
    modalNuevoProducto: 'REGISTRAR NUEVO PLATO',
    modalNuevoProductoDesc: 'Registra un nuevo plato en tu bandeja especificando su información básica y estado.',
    modalEditarProducto: 'EDITAR PLATO',
    modalEditarProductoDesc: 'Modifica la información del plato existente.',
    modalVerProducto: 'DETALLE DEL PLATO',
    modalVerProductoDesc: 'Consulta todos los datos registrados de este plato.',
    labelNombreProducto: 'Nombre del Plato',
    placeholderNombreProducto: 'Ejem. Lomo Saltado',
    placeholderDescProducto: 'Describe el plato (ingredientes, porción)…',
  },
};

// Exportamos un objeto centralizado que mapee cada VisualRole a su UI Config
export const roleUiConfigs: Partial<Record<VisualRole, RoleUiConfig>> = {
  ecommerce: ecommerceConfig,
  restaurante: restauranteConfig,
  courier: courierConfig,
  delivery: deliveryConfig,
  // Para los roles que no tienen config específica, caerán en defaults dentro del hook
};
