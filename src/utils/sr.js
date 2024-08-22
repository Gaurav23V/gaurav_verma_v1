"use client"

const initScrollReveal = async () => {
    if (typeof window !== 'undefined') {
      const ScrollReveal = (await import('scrollreveal')).default;
      return ScrollReveal();
    }
    return null;
  };
  
  export default initScrollReveal;