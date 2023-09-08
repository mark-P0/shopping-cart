import {
  MouseEvent,
  PropsWithChildren,
  TransitionEvent,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { C } from "../../utilities.ts";

type ModalOverlayContextProvision = { close: () => void };
export const ModalOverlayContext =
  createContext<ModalOverlayContextProvision | null>(null);

type ModalOverlayProps = {
  onDismissEnd?: () => void;
};
export function ModalOverlay(props: PropsWithChildren<ModalOverlayProps>) {
  const { children, onDismissEnd } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function dismiss() {
    setIsOpen(false);
  }

  function dismissFromClick(event: MouseEvent) {
    if (ref.current !== event.target) return;
    setIsOpen(false);
  }

  function endDismiss(event: TransitionEvent) {
    if (ref.current !== event.target) return;
    if (isOpen) return;
    if (onDismissEnd === undefined) return;
    onDismissEnd();
  }

  const classes = C(
    "fixed top-0 left-0",
    "h-screen w-screen",
    "grid place-items-center",
    isOpen && "bg-black/50",
    "transition duration-150",
    "[&>*]:transition [&>*]:duration-150",
    !isOpen && "[&>*]:scale-90 [&>*]:opacity-0"
  );
  return (
    <ModalOverlayContext.Provider value={{ close: dismiss }}>
      <div
        ref={ref}
        onClick={dismissFromClick}
        onTransitionEnd={endDismiss}
        className={classes}
      >
        {children}
      </div>
    </ModalOverlayContext.Provider>
  );
}
