import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { forwardRef } from 'react';

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1 inline-block"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, target, rel, ...rest }, ref) => {
    // Check if the link is external by looking at the href
    const isExternal = 
      typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));
    
    // If target is explicitly set to _blank or the link is external
    const opensInNewTab = target === '_blank' || isExternal;
    
    // If opening in new tab, ensure we have proper rel attribute for security
    const safeRel = opensInNewTab 
      ? (rel || '') + ' noopener noreferrer'.trim()
      : rel;
    
    // For external links or links that open in new tab, add target="_blank"
    const safeTarget = opensInNewTab ? '_blank' : target;

    return (
      <NextLink
        href={href}
        target={safeTarget}
        rel={safeRel}
        {...rest}
        ref={ref}
      >
        {children}
        {opensInNewTab && <sup><ExternalLinkIcon /></sup>}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
