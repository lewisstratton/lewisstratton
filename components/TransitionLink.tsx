"use client";

import { usePageTransition } from "./PageTransition";
import { ReactNode, MouseEvent } from "react";

interface TransitionLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  className,
  children,
  onClick,
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
