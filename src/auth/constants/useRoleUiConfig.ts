import { useMemo, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { getVisualRole } from './roles';
import { roleUiConfigs } from './roleUiConfig';
import type { RoleUiConfig } from './roleUiConfig';

export function useRoleUiConfig(): RoleUiConfig {
  const { user } = useAuth();
  const role = user?.rol?.nombre || '';

  const visualRole = useMemo(() => getVisualRole(role, {
    rubro: (user as any)?.rubro ?? null,
    nombre_comercial: user?.courier_nombre ?? user?.ecommerce_nombre ?? null,
  }), [role, user]);

  // Si no hay configuración específica para el rol, usamos ecommerce por defecto para evitar crashes
  const config = roleUiConfigs[visualRole] ?? roleUiConfigs['ecommerce'];

  useEffect(() => {
    if (config?.theme?.cssVariables) {
      document.documentElement.style.setProperty('--color-primary', config.theme.cssVariables.primary);
      document.documentElement.style.setProperty('--color-primaryLight', config.theme.cssVariables.primaryLight);
      document.documentElement.style.setProperty('--color-primaryDark', config.theme.cssVariables.primaryDark);
      
      // Inyectamos también gray90 para sobreescribir las líneas de tablas
      document.documentElement.style.setProperty('--color-gray90', config.theme.cssVariables.primaryDark);
    }
  }, [config]);

  if (!config) {
    throw new Error('Configuración visual por defecto no encontrada.');
  }

  return config;
}
