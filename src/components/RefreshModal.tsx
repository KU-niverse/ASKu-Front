// @ts-expect-error TS(2307): Cannot find module './RefreshModal.module.css' or ... Remove this comment to see the full error message
import styles from './RefreshModal.module.css';
// @ts-expect-error TS(2307): Cannot find module '../img/close_btn.png' or its c... Remove this comment to see the full error message
import closeBtn from '../img/close_btn.png';
import { useEffect, useRef } from 'react';
// @ts-expect-error TS(2307): Cannot find module '../img/haho_login.png' or its ... Remove this comment to see the full error message
import haho_login from '../img/haho_login.png';

function LoginModal({
    isOpen,
    onClose
}: any) {
    const modalRef = useRef(null);

    const handleOutsideClick = (event: any) => {
        // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
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

    const refresh = () => {
        window.location.reload();
        onClose();
    }
    

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
                            <img src={closeBtn} alt='close' className={styles.close_btn} onClick={onClose} />
                        </div>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className={styles.modal_content}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <p className={styles.modal_text}>이미 처리중인 질문이 있습니다! </p>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <img className={styles.haho_login} src={haho_login} alt="character" />
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button onClick={refresh} className={styles.signin}>새로고침</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default LoginModal;