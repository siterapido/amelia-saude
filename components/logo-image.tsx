'use client';

import React from 'react';
import Image from 'next/image';

type LogoColor = 'preta' | 'branca' | 'amarela';

interface LogoImageProps {
  color?: LogoColor;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function LogoImage({
  color = 'preta',
  width = 200,
  height = 200,
  className = '',
  alt = 'Six Saúde',
  priority = false,
}: LogoImageProps) {
  const colorMap: Record<LogoColor, string> = {
    preta: '/six-saude-logo-preta.svg',
    branca: '/six-saude-logo-branca.svg',
    amarela: '/six-saude-logo-amarela.svg',
  };

  const altText = alt || `Six Saúde Logo - ${color}`;

  return (
    <Image
      src={colorMap[color]}
      alt={altText}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized // SVGs don't need optimization
    />
  );
}
