import React, { useId } from 'react';

export interface FounderGridLogoProps {
  variant?: 'full' | 'horizontal' | 'mark' | 'icon' | 'monochrome-white' | 'monochrome-black';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  className?: string;
  showTagline?: boolean;
  withContainer?: boolean;
  responsive?: boolean;
}

export const FounderGridLogo: React.FC<FounderGridLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  className = '',
  showTagline = true,
  withContainer = false,
  responsive = true
}) => {
  const uniqueId = useId().replace(/:/g, '');

  // Dimension presets with tight bounding-box proportions
  const sizeMap: Record<string, { mark: number; title: string; tagline: string; gap: string; tracking: string }> = {
    xs: { mark: 20, title: 'text-xs font-bold', tagline: 'text-[6px]', gap: 'gap-2', tracking: 'tracking-[0.12em]' },
    sm: { mark: 26, title: 'text-sm font-bold', tagline: 'text-[6.8px]', gap: 'gap-2.5', tracking: 'tracking-[0.14em]' },
    md: { mark: 36, title: 'text-lg sm:text-xl font-bold', tagline: 'text-[7.2px] sm:text-[7.8px]', gap: 'gap-3', tracking: 'tracking-[0.14em] sm:tracking-[0.16em]' },
    lg: { mark: 48, title: 'text-2xl sm:text-3xl font-bold', tagline: 'text-[9.5px]', gap: 'gap-3.5', tracking: 'tracking-[0.18em]' },
    xl: { mark: 64, title: 'text-3xl sm:text-4xl font-bold', tagline: 'text-[12px]', gap: 'gap-4', tracking: 'tracking-[0.20em]' },
    responsive: { mark: 32, title: 'text-base sm:text-lg lg:text-xl font-bold', tagline: 'text-[6.8px] sm:text-[7.5px]', gap: 'gap-2.5 sm:gap-3', tracking: 'tracking-[0.14em]' }
  };

  const selectedSize = sizeMap[size] || sizeMap.md;
  const { mark: markSize, title: titleClass, tagline: taglineClass, gap: gapClass, tracking: trackingClass } = selectedSize;

  // Theme colors & monochrome checks
  const isWhiteMono = variant === 'monochrome-white';
  const isBlackMono = variant === 'monochrome-black';
  const isDark = isWhiteMono || (theme === 'dark' && !isBlackMono);

  const tileFill = isWhiteMono ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0B0B0B';
  const graphiteFill = isWhiteMono ? '#FFFFFF' : isDark ? '#E4E4E7' : '#222222';
  const textTitleColor = isWhiteMono || isDark ? 'text-white' : 'text-neutral-950';
  const textTaglineColor = isWhiteMono || isDark ? 'text-neutral-400' : 'text-neutral-600';

  const gradientId = `brandBronzeLeaf-${uniqueId}-${size}-${theme}`;
  const leafFill = isWhiteMono
    ? '#FFFFFF'
    : isBlackMono
    ? '#0B0B0B'
    : `url(#${gradientId})`;

  const EmblemMark = (
    <svg
      viewBox={withContainer ? '0 0 200 200' : '18 16 164 166'}
      width={markSize}
      height={markSize}
      className="shrink-0 transition-transform duration-300 group-hover:scale-105 select-none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="15%" y1="100%" x2="85%" y2="0%">
          <stop offset="0%" stopColor="#805728" />
          <stop offset="45%" stopColor="#986D3B" />
          <stop offset="80%" stopColor="#AA7E48" />
          <stop offset="100%" stopColor="#9C703D" />
        </linearGradient>
      </defs>

      {withContainer && (
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          rx="46"
          fill="#FFFFFF"
          className="shadow-md"
        />
      )}

      <g transform={withContainer ? 'translate(22, 22) scale(0.78)' : undefined}>
        <path
          d="M 20,95 L 20,72 C 20,32 38,18 95,18 L 95,95 Z"
          fill={withContainer ? '#0B0B0B' : tileFill}
        />
        <path
          d="M 105,95 C 105,48 138,20 180,18 C 180,64 152,95 105,95 Z"
          fill={leafFill}
        />
        <rect
          x="20"
          y="105"
          width="75"
          height="75"
          rx="14"
          fill={withContainer ? '#0B0B0B' : tileFill}
        />
        <path
          d="M 105,105 L 180,105 C 180,152 148,180 105,180 Z"
          fill={withContainer ? '#222222' : graphiteFill}
        />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        {EmblemMark}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <FounderGridLogo variant="mark" withContainer={true} size={size} theme="light" />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${gapClass} select-none shrink-0 max-w-full ${className}`}>
      {EmblemMark}

      <div className="flex flex-col justify-center leading-none min-w-0">
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span
            className={`font-serif italic font-medium opacity-90 text-[0.68em] tracking-wide ${textTitleColor}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The
          </span>
          <span
            className={`font-serif font-black tracking-tight ${titleClass} ${textTitleColor}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Founder Grid
          </span>
        </div>

        {(variant === 'full' || showTagline) && (
          <span
            className={`font-sans uppercase font-bold mt-1 whitespace-nowrap ${taglineClass} ${trackingClass} ${textTaglineColor} ${
              responsive ? 'hidden sm:block' : 'block'
            }`}
          >
            WHERE BUSINESS MEETS OPPORTUNITY
          </span>
        )}
      </div>
    </div>
  );
};
