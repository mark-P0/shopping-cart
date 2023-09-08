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

export function ModalOverlay(props: PropsWithChildren) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function close() {
    setIsOpen(false);
  }

  function dismiss(event: MouseEvent) {
    if (ref.current !== event.target) return;
    setIsOpen(false);
  }

  function back(event: TransitionEvent) {
    if (ref.current !== event.target) return;
    if (isOpen) return;
    history.back();
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
    <ModalOverlayContext.Provider value={{ close }}>
      <div
        ref={ref}
        onClick={dismiss}
        onTransitionEnd={back}
        className={classes}
      >
        {children}
      </div>
    </ModalOverlayContext.Provider>
  );
}
