import React from "react";
import { InkLayoutLink, InkNavLink } from "../InkNavLink";

export interface InkLayoutMobileNavProps {
  links: InkLayoutLink[];
  onLinkClick?: React.MouseEventHandler<HTMLElement>;
  bottom?: React.ReactNode;
}

export const InkLayoutMobileNav: React.FC<InkLayoutMobileNavProps> = ({
  links,
  onLinkClick,
  bottom,
}) => {
  return (
    <nav className="ink:h-full ink:w-full ink:p-3 ink:box-border ink:font-default ink:text-text-default ink:gap-4 ink:flex ink:flex-col ink:pb-4">
      <div className="ink:flex ink:flex-col ink:gap-1">
        {links.map((link) => {
          return <InkNavLink {...link} key={link.href} onClick={onLinkClick} />;
        })}
      </div>
      <div className="ink:flex-1 ink:flex ink:flex-col ink:justify-end">
        {bottom}
      </div>
    </nav>
  );
};
