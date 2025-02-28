import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import { classNames } from "../../util/classes";
import { InkIcon } from "../..";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (enabled: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  indeterminate,
  onChange,
  className,
  ...props
}) => {
  const Component = onChange ? HeadlessCheckbox : "span";
  return (
    <Component
      checked={checked}
      indeterminate={!checked && indeterminate}
      onChange={(eventOrValue) => {
        /* Only happens when we're using the HeadlessCheckbox component. If we are not, then we don't track changes. */
        if (typeof eventOrValue === "boolean") {
          onChange?.(eventOrValue);
        }
      }}
      className={classNames(
        "ink:group ink:relative ink:flex ink:items-center ink:justify-center ink:size-3 ink:shrink-0 ink:rounded-xs ink:box-border",
        "ink:transition-colors ink:transition-default-animation",
        "ink:bg-button-secondary ink:shadow-xs",
        "ink:ring-text-on-secondary ink:focus-visible:outline-none ink:focus-visible:text-on-primary ink:focus-visible:ring-2 ink:focus-visible:ring-offset-2",
        "ink:data-checked:bg-button-primary ink:group-data-checked:bg-button-primary",
        "ink:data-indeterminate:bg-button-primary ink:group-data-indeterminate:bg-button-primary",
        "ink:data-selected:bg-button-primary ink:group-data-selected:bg-button-primary",
        "ink:flex ink:items-center",
        "ink:text-button-primary ink:data-checked:text-text-on-primary ink:data-indeterminate:text-text-on-primary",
        "ink:group-data-checked:text-text-on-primary ink:group-data-indeterminate:text-text-on-primary",
        "ink:group-data-selected:text-text-on-primary",
        "ink:cursor-pointer",
        className
      )}
      data-checked={checked ? "true" : undefined}
      data-indeterminate={indeterminate ? "true" : undefined}
      {...props}
    >
      <div className="ink:absolute ink:inset-0 ink:flex ink:items-center ink:justify-center ink:box-border">
        <InkIcon.Check
          className={classNames(
            "ink:size-3",
            "ink:animate-svg-path ink:group-data-checked:not-in-data-indeterminate:animate-svg-path-start",
            "ink:group-data-selected:animate-svg-path-start"
          )}
        />
      </div>

      <InkIcon.Minus
        className={classNames(
          "ink:size-3",
          "ink:animate-svg-path ink:group-data-indeterminate:animate-svg-path-start"
        )}
      />
    </Component>
  );
};
