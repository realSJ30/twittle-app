import React from "react";

interface ILogo {
  size?: number;
  className?: string;
  withWordmark?: boolean;
  mono?: boolean;
}

const Logo: React.FC<ILogo> = ({
  size = 32,
  className = "",
  withWordmark = false,
  mono = false,
}) => {
  const gradientId = React.useId();
  const stroke = mono ? "currentColor" : `url(#${gradientId})`;
  const fill = mono ? "currentColor" : `url(#${gradientId})`;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Twittle"
      >
        {!mono && (
          <defs>
            <linearGradient id={gradientId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#525252" />
              <stop offset="55%" stopColor="#171717" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
        )}
        {/* outer ripple */}
        <path
          d="M20 3 A17 17 0 0 1 37 20"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          opacity={mono ? 0.45 : 0.55}
        />
        {/* inner ripple */}
        <path
          d="M20 10 A10 10 0 0 1 30 20"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* core */}
        <circle cx="20" cy="20" r="4.5" fill={fill} />
      </svg>
      {withWordmark && (
        <span className="font-display font-extrabold text-ink text-[20px] tracking-tight">
          twittle
        </span>
      )}
    </span>
  );
};

export default Logo;
