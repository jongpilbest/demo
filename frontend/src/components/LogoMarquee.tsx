import { useRef, useEffect, useState } from 'react';
import partner_company1 from '../../public/assets/parnerlogo_1-BW_R_aWv.svg'
import partner_company2 from '../../public/assets/parnerlogo_2-CxF7em_o.svg'

import partner_company3 from '../../public/assets/parnerlogo_3-BaTghd4M.svg'
import partner_company4 from '../../public/assets/parnerlogo_4-DSyE2Hd5.svg'





interface Logo {
  name: string;
  svg: React.ReactNode;
}

const logos: Logo[] = [
  {
    name: '한국가스공사',
    svg: (
     <img src={partner_company1}></img>
    ),
  },
  {
    name: '국토교통부',
     svg: (
     <img src={partner_company2}></img>
    ),
  },
  {
    name: '한국도로공사',
      svg: (
     <img src={partner_company3}></img>
    ),
  },
  {
    name: '행정안전부',
    svg: (
     <img src={partner_company4}></img>
    ),
  },
];

export default function LogoMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-5 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
    
    bg-white overflow-hidden " ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-gray-500 text-lg font-medium tracking-wide uppercase 
        
        py-4 
sm:py-8
        ">
          신뢰할 수 있는 파트너사
        </p>
      </div>
      
      <div className="relative">
        {/* Left fade */}
     
        {/* Marquee container */}
        <div 
          className={`flex gap-14 ${isVisible ? 'animate-marquee' : ''}`}
          style={{
            width: 'fit-content',
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center px-10 py-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 min-w-[220px]"
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
