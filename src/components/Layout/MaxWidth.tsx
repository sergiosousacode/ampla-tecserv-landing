import { ReactNode } from "react";

interface MaxWidthProps {
  children: ReactNode;
  className?: string;
}

export function MaxWidth({ children, className = "" }: MaxWidthProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
