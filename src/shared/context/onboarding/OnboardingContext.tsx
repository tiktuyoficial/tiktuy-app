import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useAuth } from '@/auth/context/useAuth';
import { getStepsForRole } from '@/shared/constants/onboardingSteps';

const TOUR_KEY_PREFIX = 'tiktuy_tour_seen_';

interface OnboardingContextType {
    showTour: boolean;
    completeTour: () => void;
    skipTour: () => void;
    /** Abre el tour manualmente (botón "Ver guía"). Solo funciona si hay steps configurados. */
    restartTour: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [showTour, setShowTour] = useState(false);

    const roleName = user?.rol?.nombre;
    const hasSteps = getStepsForRole(roleName).length > 0;

    // Mostrar tour automáticamente solo si: es nuevo usuario Y hay steps configurados
    useEffect(() => {
        if (!user?.uuid || !hasSteps) return;
        const key = `${TOUR_KEY_PREFIX}${user.uuid}`;
        if (!localStorage.getItem(key)) {
            const timer = setTimeout(() => setShowTour(true), 600);
            return () => clearTimeout(timer);
        }
    }, [user?.uuid, hasSteps]);

    const markAsSeen = useCallback(() => {
        if (!user?.uuid) return;
        localStorage.setItem(`${TOUR_KEY_PREFIX}${user.uuid}`, 'true');
    }, [user?.uuid]);

    const completeTour = useCallback(() => {
        markAsSeen();
        setShowTour(false);
    }, [markAsSeen]);

    const skipTour = useCallback(() => {
        markAsSeen();
        setShowTour(false);
    }, [markAsSeen]);

    const restartTour = useCallback(() => {
        // Si no hay steps aún para este rol, no hace nada
        setShowTour(true);
    }, [hasSteps]);

    return (
        <OnboardingContext.Provider value={{ showTour, completeTour, skipTour, restartTour }}>
            {children}
        </OnboardingContext.Provider>
    );
}

const fallbackContext: OnboardingContextType = {
    showTour: false,
    completeTour: () => { },
    skipTour: () => { },
    restartTour: () => { },
};

export function useOnboardingContext(): OnboardingContextType {
    // Devuelve fallback seguro si se usa fuera del provider (ej: Navbar mobile)
    return useContext(OnboardingContext) ?? fallbackContext;
}
