import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export function Wrapper({ children, className = "" }: WrapperProps) {
  return <div className={className}>{children}</div>;
}
