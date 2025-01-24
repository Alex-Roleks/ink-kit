import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const tagVariants = cva(
  "ink:inline-flex ink:font-default ink:items-center ink:gap-1 ink:flex-shrink-0 ink:rounded-full ink:text-body-3-bold ink:font-bold ink:leading-[18px] ink:py-1.5 ink:px-1.5 ",
  {
    variants: {
      variant: {
        fill: "ink:bg-background-container ink:text-text-muted",
        outline:
          "ink:text-text-muted ink:border-background-container ink:border-[1.5px]",
        filter:
          "ink:text-text-muted ink:hover:text-text-default ink:duration-200 ink:cursor-pointer",
      },
      selected: {
        true: "",
        false: "",
      },
      hasIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "filter",
        selected: true,
        class: "ink:bg-background-container ink:text-text-default",
      },
      {
        hasIcon: true,
        class: "ink:py-1",
      },
    ],
    defaultVariants: {
      variant: "fill",
      hasIcon: false,
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  icon?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, selected, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ variant, selected, hasIcon: !!icon, className })
        )}
        {...props}
      >
        {icon && <div className="ink:size-3">{icon}</div>}
        {children}
      </div>
    );
  }
);

Tag.displayName = "Tag";
