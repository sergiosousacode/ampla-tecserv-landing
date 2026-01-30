import { ReactNode } from "react";

interface MaxWidthProps {
  children: ReactNode;
}

export function MaxWidth({ children }: MaxWidthProps) {
  return (
    <div className="container mx-auto px-4">
      {children}
    </div>
  );
}
