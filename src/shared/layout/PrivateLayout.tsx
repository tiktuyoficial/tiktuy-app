import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import OnboardingTour from '@/shared/components/ui/OnboardingTour';
import { OnboardingProvider, useOnboardingContext } from '@/shared/context/onboarding/OnboardingContext';
import { getStepsForRole } from '@/shared/constants/onboardingSteps';
import { useAuth } from '@/auth/context/useAuth';

function PrivateLayoutInner() {
  const [isOpen, setIsOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useAuth();
  const { showTour, completeTour, skipTour } = useOnboardingContext();
  const tourSteps = getStepsForRole(user?.rol?.nombre);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-open');
    if (stored !== null) {
      setIsOpen(JSON.parse(stored));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebar-open', JSON.stringify(newState));
  };

  return (
    <>
      {/* Navbar móvil (reemplaza Header + Sidebar en pantallas pequeñas) */}
      <Navbar isOpen={isOpen} open={navOpen} setOpen={setNavOpen} />
      <div className="flex w-full min-w-0">
        {/* Sidebar: oculto en móvil, visible en desktop */}
        <div className="hidden lg:block shrink-0">
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
        </div>

        {/* Contenido: sin margen en móvil; con margen en desktop según sidebar */}
        <div
          className={`flex-1 min-w-0 w-full transition-all duration-300 ml-0 ${
            isOpen ? 'lg:ml-64' : 'lg:ml-20'
          }`}
        >
          {/* Header: oculto en móvil, visible en desktop */}
          <div className="hidden lg:block">
            <Header />
          </div>

          <main className="lg:pt-16 pt-2 bg-gray-50 min-h-screen min-w-0 w-full px-3 sm:px-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Tour de bienvenida */}
      {showTour && tourSteps.length > 0 && (
        <OnboardingTour
          steps={tourSteps}
          onComplete={completeTour}
          onSkip={skipTour}
        />
      )}
    </>
  );
}

export default function PrivateLayout() {
  return (
    <OnboardingProvider>
      <PrivateLayoutInner />
    </OnboardingProvider>
  );
}
