import { useEffect, useRef } from "react";
import { ModalProps } from "../types";

/**
 * Modal: Functional component that renders a dialog overlay to display content
 * over the main application interface.
 * @param props props object for Modal
 * @param props.isOpen Boolean flag to open/close modal
 * @param props.onClose Callback function to execute on modal close
 * @param props.children ReactNode children
 * @returns A JSX Modal element wrapping the provided children
 */
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
      <div ref={modalRef}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
