
import React from 'react';
import { useTranslation } from 'react-i18next';

const JISLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';
  const textColor = props.color || "#212529";
  const mutedTextColor = "#a1a1aa";
  const lineColor = "#d1d5db";


  if (isArabic) {
    return (
      <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#006C35', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4ade80', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
         <text x="125" y="35" fontFamily="Tajawal, sans-serif" fontSize="28" fontWeight="800" fill={textColor} textAnchor="middle">
          جس
        </text>
        <line x1="95" y1="15" x2="95" y2="35" stroke={lineColor} strokeWidth="1" />
        <text x="88" y="22" fontFamily="Tajawal, sans-serif" fontSize="8" fill={mutedTextColor} textAnchor="end">
            مبتكرة. موثوقة.
        </text>
         <text x="88" y="32" fontFamily="Tajawal, sans-serif" fontSize="8" fill={mutedTextColor} textAnchor="end">
            مستدامة.
        </text>
        <path
          d="M 190,25 C 185,10 170,10 165,25 C 160,40 145,40 140,25"
          stroke="url(#grad1)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="190" cy="25" r="3" fill="#006C35" />
        <circle cx="140" cy="25" r="3" fill="#4ade80" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#006C35', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4ade80', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M 10,25 C 15,10 30,10 35,25 C 40,40 55,40 60,25"
        stroke="url(#grad1)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="10" cy="25" r="3" fill="#006C35" />
      <circle cx="60" cy="25" r="3" fill="#4ade80" />

      <text x="75" y="32" fontFamily="Manrope, sans-serif" fontSize="24" fontWeight="800" fill={textColor}>
        JIS
      </text>
      <line x1="115" y1="15" x2="115" y2="35" stroke={lineColor} strokeWidth="1" />
      <text x="120" y="22" fontFamily="Manrope, sans-serif" fontSize="8" fill={mutedTextColor}>
        Innovative. Reliable.
      </text>
       <text x="120" y="32" fontFamily="Manrope, sans-serif" fontSize="8" fill={mutedTextColor}>
        Sustainable.
      </text>
    </svg>
  );
};


export default JISLogo;