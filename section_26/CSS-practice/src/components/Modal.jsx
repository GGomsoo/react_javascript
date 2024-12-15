import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  // const hiddenAnimation = { opacity: 0, y: 30};

  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        // initial: 요소(modal)의 시작 상태를 지정할 수 있는 프로퍼티
        // exit: 요소를 닫을 때 적용할 애니메이션
        open
        className="modal"
        variants={{
          hidden: { opacity: 0, y: 30},
          visible: { opacity: 1, y: 0}
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
