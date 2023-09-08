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
  modalOrigin: "center" | "right";
  afterTransition?: () => void;
};
export function ModalOverlay(props: PropsWithChildren<ModalOverlayProps>) {
  const { children, afterTransition, modalOrigin } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function close() {
    setIsOpen(false);
  }

  function todoOnOverlayClick(event: MouseEvent) {
    if (ref.current !== event.target) return;
    setIsOpen(false);
  }

  function todoAfterTransition(event: TransitionEvent) {
    if (ref.current !== event.target) return;
    if (isOpen) return;
    if (afterTransition === undefined) return;
    afterTransition();
  }

  const classes = C(
    "fixed top-0 left-0",
    "h-screen w-screen",
    ...[
      "grid items-center",
      modalOrigin === "center" && "justify-items-center",
      modalOrigin === "right" && "justify-items-end",
    ],
    isOpen && "bg-black/50",
    ...[
      "transition [&>*]:transition",
      modalOrigin === "center" && "duration-300 [&>*]:duration-300",
      modalOrigin === "right" && "duration-500 [&>*]:duration-500",
    ],
    !isOpen && modalOrigin === "center" && "[&>*]:scale-90 [&>*]:opacity-0",
    !isOpen && modalOrigin === "right" && "[&>*]:translate-x-full"
  );
  return (
    <ModalOverlayContext.Provider value={{ close }}>
      <div
        ref={ref}
        onClick={todoOnOverlayClick}
        onTransitionEnd={todoAfterTransition}
        className={classes}
      >
        {children}
      </div>
    </ModalOverlayContext.Provider>
  );
}
