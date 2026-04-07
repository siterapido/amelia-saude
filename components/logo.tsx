import React from 'react';

type LogoColor = 'preta' | 'branca' | 'amarela';

interface LogoProps {
  color?: LogoColor;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
}

export default function Logo({
  color = 'preta',
  width = 200,
  height = 200,
  className = '',
  alt = 'Six Saúde',
}: LogoProps) {
  const colorMap: Record<LogoColor, string> = {
    preta: '/six-saude-logo-preta.svg',
    branca: '/six-saude-logo-branca.svg',
    amarela: '/six-saude-logo-amarela.svg',
  };

  const altText = alt || `Six Saúde Logo - ${color}`;

  return (
    <img
      src={colorMap[color]}
      alt={altText}
      width={width}
      height={height}
      className={className}
    />
  );
}
