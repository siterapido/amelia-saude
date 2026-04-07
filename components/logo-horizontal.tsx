import React from 'react';

type LogoColor = 'preta' | 'branca' | 'amarela';

interface LogoHorizontalProps {
  color?: LogoColor;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
}

export default function LogoHorizontal({
  color = 'preta',
  width = 400,
  height = 200,
  className = '',
  alt = 'Six Saúde',
}: LogoHorizontalProps) {
  const colorMap: Record<LogoColor, string> = {
    preta: '/six-saude-logo-preta-horizontal.svg',
    branca: '/six-saude-logo-branca-horizontal.svg',
    amarela: '/six-saude-logo-amarela-horizontal.svg',
  };

  const altText = alt || `Six Saúde Logo Horizontal - ${color}`;

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
