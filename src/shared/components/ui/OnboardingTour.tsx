import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// ────────────────────────────────────────────────────────────
// Tipos
// ────────────────────────────────────────────────────────────
export type TourStep = {
    /** Selector CSS del elemento a resaltar (ej: '#my-id', '.my-class') */
    target: string;
    title: string;
    content: string;
    /** Posición del tooltip relativo al target */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    icon?: string;
    /** Ruta a la que navegar antes de mostrar este paso (ej: '/ecommerce/stock') */
    navigateTo?: string;
};

type Rect = { top: number; left: number; width: number; height: number };

interface OnboardingTourProps {
    steps: TourStep[];
    onComplete: () => void;
    onSkip: () => void;
}

const PADDING = 8; // espacio alrededor del spotlight

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────
function getRect(selector: string): Rect | null {
    const el = document.querySelector(selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function scrollIntoCenter(selector: string) {
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
}

// ────────────────────────────────────────────────────────────
// Componente
// ────────────────────────────────────────────────────────────
export default function OnboardingTour({
    steps,
    onComplete,
    onSkip,
}: OnboardingTourProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rect, setRect] = useState<Rect | null>(null);
    const [visible, setVisible] = useState(false);
    const rafRef = useRef<number>(0);
    const navigate = useNavigate();

    const step = steps[currentIndex];
    const isLast = currentIndex === steps.length - 1;

    // Actualiza la posición del rect continuamente (por si el layout cambia)
    const updateRect = useCallback(() => {
        if (!step) return;
        const r = getRect(step.target);
        setRect(r);
    }, [step]);

    useEffect(() => {
        setVisible(false);
        if (!step) return;

        // Navegar a la página del paso si está definido
        if (step.navigateTo) {
            navigate(step.navigateTo);
        }

        scrollIntoCenter(step.target);

        // Esperar un poco más si hubo navegación para que el DOM cargue
        const delay = step.navigateTo ? 600 : 300;
        const t = setTimeout(() => {
            updateRect();
            setVisible(true);
        }, delay);

        // RAF para mantener el highlight sincronizado
        function loop() {
            updateRect();
            rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            clearTimeout(t);
            cancelAnimationFrame(rafRef.current);
        };
    }, [currentIndex, step, updateRect, navigate]);

    // ── Navegación ──
    const next = () => {
        if (isLast) {
            onComplete();
        } else {
            setCurrentIndex((i) => i + 1);
        }
    };
    const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));

    // ── Tooltip position ──
    function getTooltipStyle(): React.CSSProperties {
        if (!rect) return { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' };

        const gap = 16;
        const vw = window.innerWidth;
        const isMobile = vw < 640;
        
        // En móviles, ignoramos placement y forzamos posición bottom o top 
        // para que ocupe todo el ancho sin recortarse.
        if (isMobile) {
            const goesOffBottom = (rect.top + rect.height + 250) > window.innerHeight;
            return {
                left: '16px',
                right: '16px',
                maxWidth: 'calc(100vw - 32px)',
                ...(goesOffBottom
                    ? { bottom: `calc(100vh - ${rect.top - gap}px)` }
                    : { top: rect.top + rect.height + gap }
                )
            };
        }

        const placement = step?.placement ?? 'bottom';
        switch (placement) {
            case 'top':
                return {
                    bottom: `calc(100vh - ${rect.top - gap}px)`,
                    left: rect.left + rect.width / 2,
                    transform: 'translateX(-50%)',
                };
            case 'left':
                return {
                    top: rect.top + rect.height / 2,
                    right: `calc(100vw - ${rect.left - gap}px)`,
                    transform: 'translateY(-50%)',
                };
            case 'right':
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.left + rect.width + gap,
                    transform: 'translateY(-50%)',
                };
            case 'bottom':
            default:
                return {
                    top: rect.top + rect.height + gap,
                    left: rect.left + rect.width / 2,
                    transform: 'translateX(-50%)',
                };
        }
    }

    // ── SVG Spotlight clip-path overlay ──
    function renderOverlay() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (!rect) {
            // Sin elemento: overlay completo
            return (
                <div
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        zIndex: 2147483646,
                    }}
                    onClick={onSkip}
                />
            );
        }

        const x = rect.left - PADDING;
        const y = rect.top - PADDING;
        const w = rect.width + PADDING * 2;
        const h = rect.height + PADDING * 2;
        const r = 10; // border-radius del spotlight

        // SVG con "agujero" recortado (clip-path con evenodd)
        const d = `
      M 0 0 H ${vw} V ${vh} H 0 Z
      M ${x + r} ${y}
      H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r}
      V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h}
      H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r}
      V ${y + r} Q ${x} ${y} ${x + r} ${y}
      Z
    `;

        return (
            <svg
                style={{
                    position: 'fixed', inset: 0, zIndex: 2147483646,
                    width: vw, height: vh, pointerEvents: 'none',
                }}
            >
                <path
                    d={d}
                    fill="rgba(0,0,0,0.65)"
                    fillRule="evenodd"
                    style={{ pointerEvents: 'all', cursor: 'default' }}
                    onClick={onSkip}
                />
                {/* Borde animado del spotlight */}
                <rect
                    x={x} y={y} width={w} height={h} rx={r}
                    fill="none"
                    stroke="rgba(59,130,246,0.7)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    style={{
                        animation: 'tour-dash 1.5s linear infinite',
                    }}
                />
            </svg>
        );
    }

    if (!visible || !step) return null;

    return createPortal(
        <>
            {/* Overlay con spotlight */}
            {renderOverlay()}

            {/* Tooltip */}
            <div
                style={{
                    position: 'fixed',
                    zIndex: 2147483647,
                    maxWidth: 420,
                    ...getTooltipStyle(),
                }}
                className="tour-tooltip"
            >
                {/* Header */}
                <div className="tour-tooltip__header">
                    {step.icon && (
                        <span className="tour-tooltip__icon">
                            <Icon icon={step.icon} width={20} height={20} />
                        </span>
                    )}
                    <h3 className="tour-tooltip__title">{step.title}</h3>
                    <button
                        className="tour-tooltip__close"
                        onClick={onSkip}
                        title="Cerrar guía"
                    >
                        <Icon icon="mdi:close" width={16} />
                    </button>
                </div>

                {/* Body */}
                <p className="tour-tooltip__content">{step.content}</p>

                {/* Footer */}
                <div className="tour-tooltip__footer">
                    {/* Dots */}
                    <div className="tour-tooltip__dots">
                        {steps.map((_, i) => (
                            <span
                                key={i}
                                className={`tour-tooltip__dot ${i === currentIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>

                    {/* Botones */}
                    <div className="tour-tooltip__actions">
                        {currentIndex > 0 && (
                            <button className="tour-btn tour-btn--ghost" onClick={prev}>
                                Anterior
                            </button>
                        )}
                        {!isLast && (
                            <button className="tour-btn tour-btn--skip" onClick={onSkip}>
                                Omitir
                            </button>
                        )}
                        <button className="tour-btn tour-btn--primary" onClick={next}>
                            {isLast ? (
                                <>
                                    <Icon icon="mdi:check" width={14} />
                                    Finalizar
                                </>
                            ) : (
                                <>
                                    Siguiente
                                    <Icon icon="mdi:arrow-right" width={14} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Estilos inline (evita afectar el CSS global) */}
            <style>{`
        @keyframes tour-dash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes tour-fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(4px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        .tour-tooltip {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06);
          padding: 22px;
          animation: tour-fadeIn 0.25s ease forwards;
          font-family: inherit;
          min-width: 340px;
        }

        .tour-tooltip__header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .tour-tooltip__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          background: #EFF6FF;
          border-radius: 8px;
          color: #1E3A8A;
          flex-shrink: 0;
        }

        .tour-tooltip__title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          flex: 1;
          line-height: 1.3;
        }

        .tour-tooltip__close {
          background: none;
          border: none;
          cursor: pointer;
          color: #9CA3AF;
          padding: 2px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .tour-tooltip__close:hover { color: #374151; }

        .tour-tooltip__content {
          font-size: 14px;
          color: #6B7280;
          margin: 0 0 18px;
          line-height: 1.6;
        }

        .tour-tooltip__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .tour-tooltip__dots {
          display: flex;
          gap: 5px;
        }

        .tour-tooltip__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #D1D5DB;
          transition: background 0.2s, transform 0.2s;
        }
        .tour-tooltip__dot.active {
          background: #1E3A8A;
          transform: scale(1.35);
        }

        .tour-tooltip__actions {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .tour-btn {
          border: none;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          padding: 7px 12px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: background 0.15s, color 0.15s, opacity 0.15s;
          font-family: inherit;
        }

        .tour-btn--primary {
          background: #1E3A8A;
          color: #fff;
        }
        .tour-btn--primary:hover { background: #1e40af; }

        .tour-btn--ghost {
          background: #F3F4F6;
          color: #374151;
        }
        .tour-btn--ghost:hover { background: #E5E7EB; }

        .tour-btn--skip {
          background: transparent;
          color: #9CA3AF;
          padding: 7px 6px;
        }
        .tour-btn--skip:hover { color: #374151; }
      `}</style>
        </>,
        document.body
    );
}
