import { useState, useEffect } from 'react';
import { useAuth } from '@/auth/context/AuthContext';

const TOUR_KEY_PREFIX = 'tiktuy_tour_seen_';

/**
 * Hook que determina si el usuario actual ya vio el tour.
 * Usa localStorage con la clave: tiktuy_tour_seen_<uuid>
 * Esto asegura que el tour se muestre solo una vez POR usuario
 * y que usuarios distintos en el mismo dispositivo no se "contaminen".
 */
export function useOnboarding() {
  const { user } = useAuth();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (!user?.uuid) return;

    const key = `${TOUR_KEY_PREFIX}${user.uuid}`;
    const alreadySeen = localStorage.getItem(key);

    if (!alreadySeen) {
      // Pequeño delay para que el layout cargue antes de mostrar el tour
      const timer = setTimeout(() => setShowTour(true), 600);
      return () => clearTimeout(timer);
    }
  }, [user?.uuid]);

  const completeTour = () => {
    if (!user?.uuid) return;
    const key = `${TOUR_KEY_PREFIX}${user.uuid}`;
    localStorage.setItem(key, 'true');
    setShowTour(false);
  };

  const skipTour = () => {
    completeTour();
  };

  // Para testing: permite re-abrir el tour manualmente (ej: desde un botón "Ver guía")
  const restartTour = () => {
    if (!user?.uuid) return;
    const key = `${TOUR_KEY_PREFIX}${user.uuid}`;
    localStorage.removeItem(key);
    setShowTour(true);
  };

  return { showTour, completeTour, skipTour, restartTour };
}
