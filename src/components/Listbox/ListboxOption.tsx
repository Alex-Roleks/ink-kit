import { ListboxOption as HeadlessListboxOption } from "@headlessui/react";
import { classNames } from "../../util/classes";
import { ListItem, ListItemProps } from "../ListItem";
import { Checkbox, InkIcon } from "../..";

interface ListboxOptionProps<T> extends Omit<ListItemProps, "value"> {
  value: T;
  disabled?: boolean;
}

export const ListboxOption = <T,>({
  children,
  disabled,
  iconLeft,
  iconRight,
  ...props
}: ListboxOptionProps<T>) => {
  return (
    <HeadlessListboxOption
      className={classNames(
        "ink:flex ink:items-center ink:px-3 ink:py-2 ink:text-sm ink:cursor-pointer"
      )}
      disabled={disabled}
      as={ListItem}
      iconLeft={iconLeft || (iconRight ? <Checkbox /> : undefined)}
      iconRight={
        <div className="ink:flex ink:items-center ink:justify-center ink:gap-1.5">
          {iconRight || (
            <InkIcon.Check className="ink:not-in-data-selected:hidden" />
          )}
        </div>
      }
      {...props}
    >
      {children}
    </HeadlessListboxOption>
  );
};

ListboxOption.displayName = "ListboxOption";
