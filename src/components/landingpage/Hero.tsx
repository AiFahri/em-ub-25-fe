'use client';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bghero from '@/assets/landingpage/background/bg-hero.svg';
import bgheromobile from '@/assets/landingpage/background/bg-hero-mobile.svg';
import play from '@/assets/landingpage/icons/play.svg';
import mori from '@/assets/landingpage/icons/morihero.svg';
import decor1 from '@/assets/landingpage/icons/hero-decor-1.svg';
import decor2 from '@/assets/landingpage/icons/hero-decor-2.svg';
import decor3 from '@/assets/landingpage/icons/hero-decor-3.svg';
import decor4 from '@/assets/landingpage/icons/hero-decor-4.svg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Refs for GSAP animations
  const containerRef = useRef<HTMLElement>(null);
  const bgDesktopRef = useRef<HTMLImageElement>(null);
  const bgMobileRef = useRef<HTMLImageElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null);
  const decor2Ref = useRef<HTMLDivElement>(null);
  const decor3Ref = useRef<HTMLDivElement>(null);
  const decor4Ref = useRef<HTMLDivElement>(null);
  const kabinetTextRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const moriRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ENHANCED INITIAL STATES - More dramatic starting positions
      gsap.set([bgDesktopRef.current, bgMobileRef.current], { 
        scale: 1.3, 
        opacity: 0,
        rotationZ: 3,
        transformOrigin: "center center",
        filter: "blur(20px)"
      });

      gsap.set([decor1Ref.current, decor2Ref.current, decor3Ref.current, decor4Ref.current], {
        scale: 0,
        rotation: 360,
        opacity: 0,
        transformOrigin: "center center",
        y: -100,
        x: () => Math.random() * 200 - 100
      });

      gsap.set([kabinetTextRef.current, subtitleRef.current], {
        x: -120,
        opacity: 0,
        rotationY: 90,
        transformOrigin: "left center"
      });

      // Don't set initial state for title here, we'll handle it after character splitting

      gsap.set([buttonRef.current, playButtonRef.current], {
        y: 80,
        opacity: 0,
        scale: 0.5,
        rotationX: 90
      });

      gsap.set(moriRef.current, {
        y: 200,
        x: 100,
        opacity: 0,
        rotation: 45,
        scale: 0.3,
        rotationY: 180
      });

      // ENHANCED MAIN TIMELINE - More sophisticated sequencing
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. DRAMATIC BACKGROUND ENTRANCE - Cinematic reveal
      mainTimeline.to([bgDesktopRef.current, bgMobileRef.current], {
        scale: 1,
        opacity: 1,
        rotationZ: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out"
      });

      // 2. DECORATIVE ELEMENTS - Orbital entrance with physics
      const decorElements = [decor1Ref.current, decor2Ref.current, decor3Ref.current, decor4Ref.current];
      decorElements.forEach((decor, index) => {
        if (decor) {
          mainTimeline.to(decor, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.0,
            ease: "elastic.out(1, 0.4)",
            onComplete: () => {
              // Add subtle continuous motion
              gsap.to(decor, {
                rotation: index % 2 === 0 ? 360 : -360,
                duration: 20 + index * 5,
                ease: "none",
                repeat: -1
              });
            }
          }, `-=${0.7 - index * 0.12}`);
        }
      });

      // 3. TEXT ELEMENTS - Typewriter + 3D reveal
      if (kabinetTextRef.current) {
        mainTimeline.to(kabinetTextRef.current, {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.0,
          ease: "power3.out"
        }, "-=0.3");
      }

      // Title with character-by-character reveal
      if (titleRef.current) {
        // Get the lines from the h1 (should be ['Simpul', 'Memori'])
        const lines = ['Simpul', 'Memori'];
        // Set the whole title to be visible but positioned
        gsap.set(titleRef.current, {
          x: -120,
          opacity: 1,
          rotationY: 90,
          transformOrigin: "left center"
        });
        // Create two lines, each with character spans
        titleRef.current.innerHTML = lines.map(line =>
          `<span class='title-line' style='display:inline-block;vertical-align:middle;'><span>${line.split('').map((char) =>
            `<span class=\"char-reveal\" style=\"display: inline-block;\">${char === ' ' ? '&nbsp;' : char}</span>`
          ).join('')}</span></span>`
        ).join('<br style="line-height:0;margin:0;padding:0;" />');
        // Get all character elements
        const titleChars = titleRef.current.querySelectorAll('.char-reveal');
        gsap.set(titleChars, { opacity: 0, y: 50, rotationX: 90 });
        // Animate the title container
        mainTimeline.to(titleRef.current, {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.0,
          ease: "power3.out"
        }, "-=0.4");
        // Animate the characters line by line
        const linesEls = titleRef.current.querySelectorAll('.title-line');
        linesEls.forEach((lineEl, i) => {
          const chars = lineEl.querySelectorAll('.char-reveal');
          mainTimeline.to(chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.07,
            stagger: 0.025,
            ease: "power2.out"
          }, `-=${0.3 - i * 0.08}`);
        });
      }

      if (subtitleRef.current) {
        mainTimeline.to(subtitleRef.current, {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.9,
          ease: "power3.out"
        }, "-=0.5");
      }

      // 4. BUTTONS - Enhanced bounce with glow effect
      mainTimeline.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.0,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          // Add subtle pulsing glow
          gsap.to(buttonRef.current, {
            boxShadow: "0 0 30px rgba(255, 73, 0, 0.6)",
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      }, "-=0.3");

      mainTimeline.to(playButtonRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.0,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          // Continuous subtle rotation
          gsap.to(playButtonRef.current, {
            rotation: 360,
            duration: 10,
            ease: "none",
            repeat: -1
          });
        }
      }, "-=0.5");

      // 5. MORI - Spectacular 3D entrance
      mainTimeline.to(moriRef.current, {
        y: 0,
        x: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.3,
        ease: "power3.out",
        onComplete: () => {
          // Enhanced floating with 3D rotation
          gsap.to(moriRef.current, {
            y: -30,
            rotationY: 10,
            duration: 3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
          });
          
          // Subtle breathing effect
          gsap.to(moriRef.current, {
            scale: 1.05,
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      }, "-=0.6");

      // Decorative elements subtle rotation
      gsap.to(decor1Ref.current, {
        rotation: 360,
        duration: 25,
        ease: "none",
        repeat: -1,
        delay: 2
      });

      gsap.to(decor2Ref.current, {
        rotation: -360,
        duration: 30,
        ease: "none",
        repeat: -1,
        delay: 2.5
      });

      gsap.to(decor3Ref.current, {
        rotation: 360,
        duration: 35,
        ease: "none",
        repeat: -1,
        delay: 3
      });

      gsap.to(decor4Ref.current, {
        rotation: -360,
        duration: 20,
        ease: "none",
        repeat: -1,
        delay: 2.2
      });

      // PARTICLE SYSTEM SIMULATION - Add magical sparkles
      const createSparkleEffect = () => {
        const sparkles = [];
        for (let i = 0; i < 20; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle-particle';
          sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #FFD700, #FFA500);
            border-radius: 50%;
            opacity: 0;
            pointer-events: none;
            z-index: 15;
          `;
          containerRef.current?.appendChild(sparkle);
          sparkles.push(sparkle);
        }

        sparkles.forEach((sparkle, index) => {
          const delay = index * 0.1;
          const tl = gsap.timeline({ repeat: -1, delay });
          
          tl.set(sparkle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0
          })
          .to(sparkle, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          })
          .to(sparkle, {
            y: "-=50",
            x: `+=${Math.random() * 100 - 50}`,
            opacity: 0,
            scale: 0,
            duration: 2,
            ease: "power2.in"
          });
        });
      };

      // Activate sparkles after main animation
      mainTimeline.call(createSparkleEffect, [], "-=0.5");

      // Exit animations when section is out of view
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom 80%",
        end: "bottom top",
        onEnter: () => {
          // Section is leaving view - animate out
          const exitTimeline = gsap.timeline();
          
          // Mori exits first with dramatic effect
          exitTimeline.to(moriRef.current, {
            y: -150,
            x: 100,
            opacity: 0,
            rotation: -30,
            scale: 0.5,
            duration: 1,
            ease: "power2.in"
          });

          // Decorative elements fade out with stagger
          exitTimeline.to([decor1Ref.current, decor2Ref.current, decor3Ref.current, decor4Ref.current], {
            scale: 0,
            rotation: 360,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
            stagger: 0.1
          }, "-=0.7");

          // Text elements slide out
          exitTimeline.to([kabinetTextRef.current, titleRef.current, subtitleRef.current], {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            stagger: 0.1
          }, "-=0.5");

          // Buttons fade out
          exitTimeline.to([buttonRef.current, playButtonRef.current], {
            y: 50,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.in",
            stagger: 0.1
          }, "-=0.6");

          // Background scales out last
          exitTimeline.to([bgDesktopRef.current, bgMobileRef.current], {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
          }, "-=0.4");
        },
        onLeaveBack: () => {
          // Section is coming back into view - animate in
          const enterTimeline = gsap.timeline();
          
          // Background enters first
          enterTimeline.to([bgDesktopRef.current, bgMobileRef.current], {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });

          // Decorative elements pop in
          enterTimeline.to([decor1Ref.current, decor2Ref.current, decor3Ref.current, decor4Ref.current], {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.1
          }, "-=0.4");

          // Text elements slide in
          enterTimeline.to([kabinetTextRef.current, titleRef.current, subtitleRef.current], {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1
          }, "-=0.3");

          // Buttons bounce in
          enterTimeline.to([buttonRef.current, playButtonRef.current], {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1
          }, "-=0.5");

          // Mori enters last with dramatic effect
          enterTimeline.to(moriRef.current, {
            y: 0,
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
          }, "-=0.6");
        }
      });

      // ENHANCED INTERACTIVE HOVER EFFECTS
      if (buttonRef.current) {
        const button = buttonRef.current;
        
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            y: -8,
            rotationX: 15,
            boxShadow: "0 15px 35px rgba(255, 73, 0, 0.6)",
            duration: 0.4,
            ease: "power2.out"
          });
          
          // Add ripple effect
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;
          button.appendChild(ripple);
          
          setTimeout(() => ripple.remove(), 600);
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            rotationX: 0,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.4,
            ease: "power2.out"
          });
        });
      }

      if (playButtonRef.current) {
        const playBtn = playButtonRef.current;
        
        playBtn.addEventListener('mouseenter', () => {
          gsap.to(playBtn, {
            scale: 1.2,
            rotation: 360,
            boxShadow: "0 10px 25px rgba(0, 73, 255, 0.4)",
            duration: 0.6,
            ease: "back.out(1.7)"
          });
          
          // Create orbital effect
          const orbitalElements = playBtn.querySelectorAll('div');
          orbitalElements.forEach((elem, index) => {
            gsap.to(elem, {
              rotation: 360,
              duration: 1,
              ease: "none",
              repeat: 3,
              delay: index * 0.1
            });
          });
        });

        playBtn.addEventListener('mouseleave', () => {
          gsap.to(playBtn, {
            scale: 1,
            rotation: 0,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.6,
            ease: "back.out(1.7)"
          });
        });
      }

      // TITLE INTERACTIVE EFFECTS
      if (titleRef.current) {
        titleRef.current.addEventListener('mouseenter', () => {
          const chars = titleRef.current!.querySelectorAll('.char-reveal');
          chars.forEach((char, index) => {
            gsap.to(char, {
              y: -10,
              rotation: Math.random() * 20 - 10,
              scale: 1.1,
              color: "#FF4900",
              duration: 0.3,
              delay: index * 0.02,
              ease: "power2.out"
            });
          });
        });

        titleRef.current.addEventListener('mouseleave', () => {
          const chars = titleRef.current!.querySelectorAll('.char-reveal');
          gsap.to(chars, {
            y: 0,
            rotation: 0,
            scale: 1,
            color: "#ffffff",
            duration: 0.3,
            stagger: 0.01,
            ease: "power2.out"
          });
        });
      }

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Subtle parallax for decorative elements only
          if (decor1Ref.current) {
            gsap.to(decor1Ref.current, {
              y: progress * 20,
              x: progress * 10,
              duration: 0.1
            });
          }
          
          if (decor2Ref.current) {
            gsap.to(decor2Ref.current, {
              y: progress * -15,
              x: progress * -8,
              duration: 0.1
            });
          }
          
          if (decor3Ref.current) {
            gsap.to(decor3Ref.current, {
              y: progress * 25,
              x: progress * -12,
              duration: 0.1
            });
          }
          
          if (decor4Ref.current) {
            gsap.to(decor4Ref.current, {
              y: progress * -20,
              x: progress * 15,
              duration: 0.1
            });
          }

          // Mori floating is now independent of scroll
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-white md:my-10 overflow-x-clip">
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .sparkle-particle {
          animation: sparkle 3s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        .char-reveal {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .char-reveal:hover {
          text-shadow: 0 0 20px rgba(255, 73, 0, 0.6);
        }
        
        .enhanced-glow {
          filter: drop-shadow(0 0 20px rgba(255, 73, 0, 0.4));
          transition: filter 0.3s ease;
        }
        
        .enhanced-glow:hover {
          filter: drop-shadow(0 0 30px rgba(255, 73, 0, 0.8));
        }
      `}</style>
      
      <div className="px-4 md:px-0 max-w-[100vw]">
        <div className="w-full flex justify-center rounded-[60px] md:rounded-[40px] bg-white relative h-[400px] md:h-auto overflow-x-clip">
          <div className="relative w-full aspect-[1810/1100] overflow-x-clip">
            <Image 
              ref={bgMobileRef}
              src={bgheromobile} 
              alt="Background Simpul Memori Mobile" 
              fill 
              className="object-cover rounded-[60px] z-0 md:hidden" 
            />
            <Image 
              ref={bgDesktopRef}
              src={bghero} 
              alt="Background Simpul Memori" 
              fill 
              className="object-contain z-0 hidden md:block" 
            />

            <div className="absolute inset-0 z-10 pointer-events-none overflow-x-clip">
              <div 
                ref={decor1Ref}
                className="absolute top-[20%] md:top-[15%] right-[30%] md:right-[40%] w-[4vw]"
              >
                <Image src={decor1} alt="decoration" />
              </div>
              <div 
                ref={decor2Ref}
                className="absolute top-[35%] right-[35%] md:right-[45%] w-[8vw]"
              >
                <Image src={decor2} alt="decoration" />
              </div>
              <div 
                ref={decor3Ref}
                className="absolute top-[55%] right-[10%] md:right-[15%] w-[35vw]"
              >
                <Image src={decor3} alt="decoration" />
              </div>
              <div 
                ref={decor4Ref}
                className="absolute bottom-[30%] md:bottom-[20%] right-[30%] md:right-[40%] w-[8vw]"
              >
                <Image src={decor4} alt="decoration" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-20 px-6 md:px-20 lg:px-40 py-10 md:py-14 flex flex-row items-center justify-between gap-6 md:gap-8 max-w-[100vw] overflow-x-clip">
            <div className="flex flex-col text-white space-y-2 min-w-0">
              <p 
                ref={kabinetTextRef}
                className="hidden md:block text-[clamp(0.875rem,1.5vw,1.5rem)] font-medium"
              >
                KABINET EM UB 2025
              </p>
              <h1 
                ref={titleRef}
                className="text-[clamp(3rem,6vw,6.875rem)]  font-bold leading-none"
              >
                Simpul<br />Memori
              </h1>
              <p 
                ref={subtitleRef}
                className="text-[clamp(1rem,2vw,3rem)] text-white/90"
              >
                Bergerak bersama satukan Brawijaya.
              </p>

              <div className="flex items-center mt-4 md:mt-6">
                <button 
                  ref={buttonRef}
                  className="bg-[#FF4900] text-white text-[clamp(1rem,1.4vw,1.8vw)] font-medium px-4 md:px-10 py-2 rounded-full shadow-md whitespace-nowrap min-w-[160px] flex-shrink-0"
                >
                  Satcita Bercerita
                </button>

                <div 
                  ref={playButtonRef}
                  className="ml-2 bg-white hover:bg-[#FF7C48] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <div className="bg-[#0049FF] w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center">
                    <Image src={play} alt="Play" className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={moriRef}
              className="relative w-[90vw] md:w-[40vw] mt-6 md:mt-0 right-[-10%] md:right-0 max-w-[100vw] overflow-x-clip"
            >
              <Image src={mori} alt="Mori Maskot" className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;