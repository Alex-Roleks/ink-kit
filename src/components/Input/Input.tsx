import React, { forwardRef } from "react";
import { classNames, resetClasses } from "../../util/classes";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classNames(
          resetClasses,
          "ink-w-full ink-rounded-8 ink-bg-background-container ink-p-2 ink-text-body-2",
          "focus:ink-outline focus:ink-outline-1 ink-outline-text-on-secondary",
          className
        )}
        {...props}
      />
    );
  }
);
