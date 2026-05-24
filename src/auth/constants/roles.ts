// src/auth/constants/roles.ts

// Roles funcionales del sistema
export const validRoles = [
  'admin',
  'ecommerce',
  'representante_ecommerce',
  'representante_courier',
  'courier',
  'motorizado',
  'trabajador',
] as const;

export type Role = (typeof validRoles)[number];

// Rutas por defecto por rol
export const roleDefaultPaths: Record<Role, string> = {
  admin: '/admin',
  ecommerce: '/ecommerce',
  representante_ecommerce: '/ecommerce',
  representante_courier: '/courier',
  courier: '/courier',
  motorizado: '/motorizado',
  trabajador: '/trabajador',
};

// Nombres legibles para UI
export const roleLabels: Record<Role, string> = {
  admin: 'Administrador',
  ecommerce: 'Comercio',
  representante_ecommerce: 'Representante Ecommerce',
  representante_courier: 'Representante Courier',
  courier: 'Courier',
  motorizado: 'Motorizado',
  trabajador: 'Trabajador',
};

// Nombres legibles para UI (incluyendo simulación visual de Restaurante y Delivery)
// Estos roles son simulaciones visuales en el frontend y no alteran los roles originales.
export const visualRoleLabels = {
  admin: 'Administrador',
  ecommerce: 'Ecommerce',
  restaurante: 'Restaurante',
  courier: 'Courier',
  delivery: 'Delivery',
  motorizado: 'Motorizado',
  trabajador: 'Trabajador',
  representante_ecommerce: 'Representante Ecommerce',
  representante_restaurante: 'Representante Restaurante',
  representante_courier: 'Representante Courier',
  representante_delivery: 'Representante Delivery',
} as const;

export type VisualRole = keyof typeof visualRoleLabels;

/**
 * Obtiene el rol visual a partir del rol de negocio y los datos asociados (como rubro o nombre comercial).
 * Simulación visual del frontend.
 */
export function getVisualRole(
  roleName?: string | null,
  adicional?: { rubro?: string | null; nombre_comercial?: string | null }
): VisualRole {
  const normRole = String(roleName || '').toLowerCase();
  
  if (normRole === 'ecommerce') {
    if (adicional?.rubro?.toLowerCase() === 'restaurante' || adicional?.nombre_comercial?.endsWith(' [Restaurante]')) {
      return 'restaurante';
    }
    return 'ecommerce';
  }
  
  if (normRole === 'representante_ecommerce') {
    if (adicional?.rubro?.toLowerCase() === 'restaurante' || adicional?.nombre_comercial?.endsWith(' [Restaurante]')) {
      return 'representante_restaurante';
    }
    return 'representante_ecommerce';
  }

  if (normRole === 'courier') {
    if (adicional?.nombre_comercial?.endsWith(' [Delivery]')) {
      return 'delivery';
    }
    return 'courier';
  }

  if (normRole === 'representante_courier') {
    if (adicional?.nombre_comercial?.endsWith(' [Delivery]')) {
      return 'representante_delivery';
    }
    return 'representante_courier';
  }

  return normRole as VisualRole;
}

/**
 * Remueve el tag [Delivery] del nombre comercial si está presente para no mostrarlo en pantalla.
 */
export function cleanBusinessName(name?: string | null): string {
  if (!name) return '';
  return name.replace(/\s*\[Delivery\]$/, '').replace(/\s*\[Restaurante\]$/, '');
}

// Módulos posibles que puede tener un trabajador (tipo de acceso por perfil)
export const moduloAsignadoValues = ['stock', 'producto', 'movimiento', 'pedidos'] as const;
export type ModuloAsignado = (typeof moduloAsignadoValues)[number];

// Etiquetas legibles para mostrar en UI
export const moduloLabels: Record<ModuloAsignado, string> = {
  stock: 'Stock',
  producto: 'Producto',
  movimiento: 'Movimiento',
  pedidos: 'Gestión de Pedidos',
};
