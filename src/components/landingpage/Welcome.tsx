'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WelcomeDesktop from './WelcomeDekstop';
import WelcomeMobile from './WelcomeMobile';

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states untuk containers
      gsap.set([mobileRef.current, desktopRef.current], {
        opacity: 0,
        transformOrigin: "center center",
      });

      // Timeline untuk mobile
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        }
      });

      // Timeline untuk desktop
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        }
      });

      // Animate mobile container first
      mobileTl.to(mobileRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate desktop container first
      desktopTl.to(desktopRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate individual assets in mobile
      const animateMobileAssets = () => {
        const mobileAssets = [
          { selector: 'h2', name: 'title' },
          { selector: '.relative.w-full.aspect-square', name: 'mori-container' },
          { selector: '[alt="chat"]', name: 'bubble-chat' },
          { selector: '[alt="arrow"]', name: 'arrow-button' },
          { selector: '[alt="Mori"]', name: 'mori-character' },
          { selector: '[alt="calendar"]', name: 'calendar' },
          { selector: '[alt="logo"]', name: 'logo' },
          { selector: '[alt="Decor"]', name: 'decorations' },
          { selector: '.bg-\\[\\#FF4900\\]', name: 'expression-header' },
        ];

        mobileAssets.forEach((asset, index) => {
          const elements = mobileRef.current?.querySelectorAll(asset.selector);
          if (elements) {
            elements.forEach((element, elementIndex) => {
              // Set initial smooth state
              gsap.set(element, {
                opacity: 0,
                y: 60 + (index * 10),
                x: index % 2 === 0 ? -30 : 30,
                scale: 0.7,
                rotationX: 15,
                rotationY: index % 2 === 0 ? -10 : 10,
                transformPerspective: 800,
                filter: `blur(${8 + index * 2}px) brightness(0.6)`,
                transformOrigin: "center center",
              });

              // Animate with smooth entrance
              gsap.to(element, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                filter: "blur(0px) brightness(1)",
                duration: 0.8 + (index * 0.05),
                ease: "power2.out",
                delay: 0.2 + (index * 0.1) + (elementIndex * 0.05),
                scrollTrigger: {
                  trigger: mobileRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                }
              });

              // Add smooth hover effects for interactive elements
              if (asset.name === 'arrow-button' || asset.name === 'mori-character') {
                element.addEventListener('mouseenter', () => {
                  gsap.to(element, {
                    scale: 1.08,
                    rotationY: 5,
                    z: 30,
                    filter: "brightness(1.1) saturate(1.15)",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                });

                element.addEventListener('mouseleave', () => {
                  gsap.to(element, {
                    scale: 1,
                    rotationY: 0,
                    z: 0,
                    filter: "brightness(1) saturate(1)",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                });
              }
            });
          }
        });
      };

      // Animate individual assets in desktop
      const animateDesktopAssets = () => {
        const desktopAssets = [
          { selector: 'h2', name: 'title' },
          { selector: '[alt="Mori"]', name: 'mori-character' },
          { selector: '[alt="Halo Bubble"]', name: 'bubble-chat' },
          { selector: '[alt="arrow"]', name: 'arrow-button' },
          { selector: '[alt="calendar"]', name: 'calendar' },
          { selector: '[alt="Logo"]', name: 'logo' },
          { selector: '[alt="Eclipse dekor"]', name: 'eclipse' },
          { selector: '[alt="Line dekor"]', name: 'line' },
          { selector: '[alt="Decor"]', name: 'decorations' },
          { selector: '.bg-\\[\\#FF4900\\]', name: 'expression-header' },
          { selector: '.inverted-radius-descmori', name: 'description-box' },
        ];

        desktopAssets.forEach((asset, index) => {
          const elements = desktopRef.current?.querySelectorAll(asset.selector);
          if (elements) {
            elements.forEach((element, elementIndex) => {
              // Set initial smooth state
              gsap.set(element, {
                opacity: 0,
                y: 80 + (index * 12),
                x: index % 3 === 0 ? -40 : index % 3 === 1 ? 40 : 0,
                scale: 0.6,
                rotationX: 20,
                rotationY: index % 2 === 0 ? -12 : 12,
                transformPerspective: 1000,
                filter: `blur(${10 + index * 2}px) brightness(0.5)`,
                transformOrigin: "center center",
              });

              // Animate with smooth entrance
              gsap.to(element, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                filter: "blur(0px) brightness(1)",
                duration: 1 + (index * 0.05),
                ease: "power2.out",
                delay: 0.1 + (index * 0.08) + (elementIndex * 0.05),
                scrollTrigger: {
                  trigger: desktopRef.current,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                }
              });

              // Add smooth hover effects
              if (asset.name === 'arrow-button' || asset.name === 'mori-character' ) {
                element.addEventListener('mouseenter', () => {
                  gsap.to(element, {
                    scale: 1.08,
                    rotationY: 4,
                    rotationX: 2,
                    z: 50,
                    filter: "brightness(1.15) saturate(1.2) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.15))",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                });

                element.addEventListener('mouseleave', () => {
                  gsap.to(element, {
                    scale: 1,
                    rotationY: 0,
                    rotationX: 0,
                    z: 0,
                    filter: "brightness(1) saturate(1) drop-shadow(0 0 0px rgba(0, 0, 0, 0))",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                });
              }
            });
          }
        });
      };

      // Execute asset animations
      setTimeout(animateMobileAssets, 300);
      setTimeout(animateDesktopAssets, 300);

      // Add smooth parallax effect on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Smooth parallax for title elements
          const titleElements = containerRef.current?.querySelectorAll('h2');
          if (titleElements) {
            titleElements.forEach(element => {
              gsap.to(element, {
                y: progress * -20,
                duration: 0.3,
                ease: "none",
              });
            });
          }
          
          // Smooth parallax for calendar and logo elements
          const staticElements = containerRef.current?.querySelectorAll('[alt="calendar"], [alt="Logo"], [alt="logo"]');
          if (staticElements) {
            staticElements.forEach(element => {
              gsap.to(element, {
                y: progress * -35,
                duration: 0.3,
                ease: "none",
              });
            });
          }
          
          // Smooth parallax for decorative elements
          const decorElements = containerRef.current?.querySelectorAll('[alt="Eclipse dekor"], [alt="Decor"]');
          if (decorElements) {
            decorElements.forEach(element => {
              gsap.to(element, {
                y: progress * -60,
                duration: 0.3,
                ease: "none",
              });
            });
          }
          
          // Smooth parallax for Mori and bubble elements
          const characterElements = containerRef.current?.querySelectorAll('[alt="Mori"], [alt="chat"], [alt="Halo Bubble"]');
          if (characterElements) {
            characterElements.forEach(element => {
              gsap.to(element, {
                y: progress * -25,
                duration: 0.3,
                ease: "none",
              });
            });
          }
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div ref={mobileRef} className="block md:hidden overflow-hidden">
        <WelcomeMobile />
      </div>
      <div ref={desktopRef} className="hidden md:block">
        <WelcomeDesktop />
      </div>
    </div>
  );
};

export default Welcome;
