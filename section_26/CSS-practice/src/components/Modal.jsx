import { createPortal } from 'react-dom';
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog 
      open 
      className="modal"
      initial={{ opacity: 0, y: -30 }} // 요소(modal)의 시작 상태를 지정할 수 있는 프로퍼티
      animate={{ opacity: 1, y: 0 }}>
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
