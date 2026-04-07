'use client';

import React from 'react';
import Image from 'next/image';

type LogoColor = 'preta' | 'branca' | 'amarela';

interface LogoHorizontalImageProps {
  color?: LogoColor;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function LogoHorizontalImage({
  color = 'preta',
  width = 400,
  height = 200,
  className = '',
  alt = 'Six Saúde',
  priority = false,
}: LogoHorizontalImageProps) {
  const colorMap: Record<LogoColor, string> = {
    preta: '/six-saude-logo-preta-horizontal.svg',
    branca: '/six-saude-logo-branca-horizontal.svg',
    amarela: '/six-saude-logo-amarela-horizontal.svg',
  };

  const altText = alt || `Six Saúde Logo Horizontal - ${color}`;

  return (
    <Image
      src={colorMap[color]}
      alt={altText}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}
