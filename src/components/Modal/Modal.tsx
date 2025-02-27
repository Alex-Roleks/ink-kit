import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useModalContext } from "./ModalContext";
import { classNames } from "../../util/classes";
import { InkIcon } from "../..";
import { useEffect, useRef } from "react";
import { InkHeader } from "../../layout/InkParts";
import { InkPanel } from "../../layout/InkParts/InkPanel";

export interface ModalProps<TOnCloseProps = boolean> {
  id: string;
  title?: string;
  size?: "lg" | "md";
  hasBackdrop?: boolean;
  openOnMount?: boolean;
  onClose?: (props?: TOnCloseProps) => void;
  children: ({
    closeModal,
  }: {
    closeModal: (props?: TOnCloseProps) => void;
  }) => React.ReactNode;
}

export const Modal = <TOnCloseProps,>({
  id,
  title,
  size = "lg",
  hasBackdrop,
  openOnMount,
  onClose,
  children,
}: ModalProps<TOnCloseProps>) => {
  const { isModalOpen, closeModal, modalIndex, openModal } =
    useModalContext(id);

  const wasOpenedOnMount = useRef(false);
  useEffect(() => {
    if (openOnMount && !wasOpenedOnMount.current) {
      openModal();
      wasOpenedOnMount.current = true;
    }
  }, [openModal, openOnMount]);

  const handleClose = (props?: TOnCloseProps) => {
    closeModal();
    onClose?.(props);
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={() => handleClose()}
        transition
        className="ink:relative ink:font-default ink:text-text-default"
        style={{ zIndex: 15 + modalIndex }}
      >
        {hasBackdrop && (
          <DialogBackdrop
            transition
            className="ink:fixed ink:inset-0 ink:transition-opacity ink:transition-default-animation ink:backdrop-blur-lg ink:data-closed:opacity-0"
          />
        )}
        <div
          className={classNames(
            "ink:fixed ink:inset-0 ink:p-4",
            "ink:flex ink:items-center ink:justify-center"
          )}
        >
          <DialogPanel transition>
            <InkPanel size={size} centered shadow>
              <DialogTitle
                as={InkHeader}
                title={title}
                icon={
                  <InkIcon.Close
                    className="ink:cursor-pointer ink:size-3"
                    onClick={() => handleClose()}
                  />
                }
              />
              <div className="ink:flex-1 ink:flex ink:flex-col ink:justify-center ink:items-center">
                {children({ closeModal: handleClose })}
              </div>
            </InkPanel>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
