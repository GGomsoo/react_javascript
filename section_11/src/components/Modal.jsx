import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // 의존성에 아무런 값도 없다면, modal 창이 실행되지 않는다.
  // open 값의 변화에 따라 useEffect가 실행된다.
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
