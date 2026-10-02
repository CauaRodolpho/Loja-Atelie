import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero1Mobile from '../assets/hero1-mobile.webp';
import hero2Mobile from '../assets/hero2-mobile.webp';
import hero3Mobile from '../assets/hero3-mobile.webp';

const slides = [
  { badge: 'Feito à mão com amor ♡', title: 'Bem-vinda à AnaCraft, onde a arte encontra a criatividade!', description: 'Produtos feitos com carinho, criatividade e personalidade. Cada peça é única, assim como você.', image: hero1, mobile: hero1Mobile, position: 'right', button: 'Ver produtos' },
  { badge: 'Do seu jeitinho ♡', title: 'Transforme suas ideias em algo único!', description: 'Canecas, chaveiros e presentes personalizados para deixar cada momento ainda mais especial.', image: hero2, mobile: hero2Mobile, position: 'left', button: 'Personalizar meu presente' },
  { badge: 'Da AnaCraft até você ♡', title: 'Seu pedido preparado com todo carinho!', description: 'Cada detalhe é feito, embalado e preparado com cuidado, da criação até a chegada à sua casa.', image: hero3, mobile: hero3Mobile, position: 'right', button: 'Escolher meu mimo' },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);
  const requestedSlide = useRef(0);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  const goTo = useCallback((index: number) => {
    const next = (index + slides.length) % slides.length;
    requestedSlide.current = next;
    const id = ++requestId.current;
    const image = imageRefs.current[next];
    const ready = () => {
      if (id === requestId.current) setCurrent(next);
    };
    if (image?.complete && image.naturalWidth) ready();
    else image?.decode().then(ready, () => { requestedSlide.current = current; });
  }, [current]);
  useEffect(() => () => { requestId.current++; }, []);
  useEffect(() => {
    if (hovered || focused || touching || reducedMotion) return;
    const timer = window.setInterval(() => goTo(current + 1), 7000);
    return () => window.clearInterval(timer);
  }, [hovered, focused, touching, reducedMotion, current, goTo]);
  useLayoutEffect(() => {
    const copy = copyRef.current;
    const pictures = imageRefs.current.map(image => image?.parentElement).filter((element): element is HTMLElement => !!element);
    const picture = pictures[current];
    if (!copy || !picture) return;
    const others = pictures.filter(element => element !== picture);
    gsap.set(others, { zIndex: 0 });
    gsap.set(picture, { zIndex: 1 });
    if (reducedMotion) {
      gsap.set(picture, { opacity: 1 });
      gsap.set(others, { opacity: 0 });
      return;
    }
    const timeline = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.55 } });
    timeline.to(picture, { opacity: 1, onComplete: () => { gsap.set(others, { opacity: 0 }); } }, 0);
    const context = gsap.context(() => {
      timeline.fromTo(copy, { opacity: 0.65, y: 8 }, { opacity: 1, y: 0, clearProps: 'transform,opacity' }, 0)
        .from('.hero-badge, .hero-word', { opacity: 0, y: 8, duration: 0.4, stagger: 0.018, clearProps: 'transform,opacity' }, 0.04)
        .from('.hero-description, .hero-actions', { opacity: 0, y: 8, stagger: 0.06, clearProps: 'transform,opacity' }, 0.12);
    }, copy);
    return () => { timeline.kill(); context.revert(); };
  }, [current, reducedMotion]);
  const slide = slides[current];
  const move = (direction: number) => goTo(requestedSlide.current + direction);
  const cancelSwipe = () => {
    touchStart.current = null;
    setTouching(false);
  };
  const startSwipe = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1 || (event.target as Element).closest('a, button, input, select, textarea')) {
      cancelSwipe();
      return;
    }
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setTouching(true);
  };
  const finishSwipe = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    cancelSwipe();
    if (!start || event.touches.length || !event.changedTouches.length) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
  };
  return (
    <section ref={heroRef} aria-label="Destaques do ateliê" aria-roledescription="carrossel" className="hero relative overflow-hidden bg-[#FFF5F6]" onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={event => { if (event.pointerType === 'mouse') setHovered(false); }} onTouchStart={startSwipe} onTouchMove={event => { if (event.touches.length !== 1) cancelSwipe(); }} onTouchEnd={finishSwipe} onTouchCancel={cancelSwipe} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="hero-content page-container relative z-10 py-8 sm:py-12 lg:py-20">
        <div ref={copyRef} key={current} className={`hero-copy ${slide.position === 'left' ? 'hero-copy-right' : ''}`}>
          <p className="hero-badge mb-3 font-handwritten text-2xl font-semibold text-[#b93857] sm:text-3xl">{slide.badge}</p>
          <h1 aria-label={slide.title} className="text-[clamp(1.875rem,3vw,2.875rem)] font-extrabold leading-[1.12] text-brand-dark"><span aria-hidden="true">{slide.title.split(' ').map((word, index) => <span key={index}><span className="hero-word inline-block">{word}</span>{' '}</span>)}</span></h1>
          <p className="hero-description mt-4 max-w-lg text-base leading-relaxed text-gray-700 sm:text-lg">{slide.description}</p>
          <div className="hero-actions mt-6 flex flex-wrap gap-3">
            <Link to="/catalogo" className="hero-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#b93857] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#982d47]">{slide.button}</Link>
            <Link to="/sobre" className="hero-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b93857] bg-[#ffe1e9] px-6 py-3 text-sm font-bold text-[#b93857]">Conheça o ateliê <Heart className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
      <div className="hero-media">
        {slides.map((item, index) => <picture key={item.image} className="hero-picture absolute inset-0 block h-full w-full" style={{ opacity: index === 0 ? 1 : 0 }} aria-hidden={index !== current}>
          <source media="(max-width: 1023px)" srcSet={item.mobile} />
          <img ref={element => { imageRefs.current[index] = element; }} src={item.image} alt="Personagem AnaCraft com presentes e produtos artesanais" width="1672" height="941" fetchPriority={index === 0 ? 'high' : 'auto'} className={`h-full w-full ${item.position === 'left' ? 'object-left' : 'object-right'}`} />
        </picture>)}
      </div>
      <div className="hero-controls relative z-20 flex items-center justify-center gap-0 pb-5 lg:absolute lg:bottom-5 lg:left-1/2 lg:-translate-x-1/2 lg:pb-0 lg:rounded-full lg:bg-[#fff0f3]/90 lg:px-2">
        <button type="button" onClick={() => move(-1)} aria-label="Slide anterior" className="hero-control"><ChevronLeft className="h-5 w-5" /></button>
        {slides.map((_, index) => <button type="button" key={index} onClick={() => goTo(index)} aria-label={`Mostrar slide ${index + 1}`} aria-current={current === index ? 'true' : undefined} className="flex h-11 w-11 items-center justify-center rounded-full"><span className={`h-1 rounded-full transition-all ${current === index ? 'w-2 bg-[#b93857]' : 'w-1 bg-pink-300'}`} /></button>)}
        <button type="button" onClick={() => move(1)} aria-label="Próximo slide" className="hero-control"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>
  );
}
