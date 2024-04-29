// @ts-expect-error TS(2307): Cannot find module './Modal.module.css' or its cor... Remove this comment to see the full error message
import styles from './Modal.module.css';
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from '../img/close_btn.png';
import { useState, useEffect, useRef } from 'react';

function Modal() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (event: any) => {
        // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
        if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
        } else {
        document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
        {isOpen && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={styles.modal_overlay}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div ref={modalRef} className={styles.modal_wrapper}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.modal_inside}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.modal_close}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <img src={closeBtn} alt='close' className={styles.close_btn} onClick={closeModal} />
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className={styles.modal_content}>
                    {/* 모달 컨텐츠 내용 */}
                </div>
                </div>
            </div>
            </div>
        )}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button className={styles.openModalBtn} onClick={openModal}>
            모달 열기
        </button>
        </>
    );
    }

export default Modal;