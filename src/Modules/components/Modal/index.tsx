import { useEffect, useRef } from 'react';
import './Modal.css';

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  children: React.ReactNode;
  modalCentreCls?: string;
};

export default function Modal({
  open,
  setOpen,
  id = '',
  children,
  modalCentreCls = '',
}: ModalProps) {
  const modalRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    function handleOutsideClick(event: React.MouseEvent) {
      if (modalRef.current && modalRef.current.id === (event.target as HTMLElement).id) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('click', handleOutsideClick as unknown as EventListener);
    } else {
      document.removeEventListener('click', handleOutsideClick as unknown as EventListener);
    }

    // Cleanup to avoid memory leaks
    return () => {
      document.removeEventListener('click', handleOutsideClick as unknown as EventListener);
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Cleanup in case component unmounts while modal is open
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <div
      id={`Modal${id}`}
      className={`ModalMainContainer ${open ? 'activeModal' : ''}`}
      ref={modalRef}
    >
      <div className={`ModalCenter ${modalCentreCls}`}>
        <svg
          className="absolute right-[20] top-[20] cursor-pointer"
          onClick={() => setOpen(false)}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.5264 0.875771C13.8214 1.16648 13.825 1.64134 13.5343 1.9364L1.53426 14.1164C1.24356 14.4115 0.768698 14.415 0.473632 14.1243C0.178567 13.8336 0.175032 13.3587 0.465737 13.0637L12.4657 0.883667C12.7564 0.588601 13.2313 0.585066 13.5264 0.875771Z"
            fill="black"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.473632 0.875771C0.768698 0.585066 1.24356 0.588601 1.53426 0.883667L13.5343 13.0637C13.825 13.3587 13.8214 13.8336 13.5264 14.1243C13.2313 14.415 12.7564 14.4115 12.4657 14.1164L0.465737 1.9364C0.175032 1.64134 0.178567 1.16648 0.473632 0.875771Z"
            fill="black"
          />
        </svg>
        {children}
      </div>
    </div>
  );
}
