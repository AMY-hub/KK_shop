import { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import cn from 'classnames';
import { ClientPortal } from '../ClientPortal';
import { ModalProps } from './props';
import CloseIcon from '../../../assets/images/icons/close.svg';

import styles from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal = ({ children, shown, onClose, className, title }: ModalProps): JSX.Element | null => {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        if (shown) {
            document.body.setAttribute('style', 'overflow: hidden');
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.removeAttribute('style');
        };
    }, [shown, onClose]);

    // if (!shown) {
    //     return null;
    // }

    return (
        <ClientPortal selector='#modal'>
            <AnimatePresence>
                {shown &&
                    <FocusTrap>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: 'tween'
                            }}
                            className={styles.modalOverlay}
                            onClick={onClose}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 1000 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 1000 }}
                                transition={{
                                    type: 'tween'
                                }}
                                onClick={e => e.stopPropagation()}
                                className={cn(styles.modal, className)}
                            >
                                <button
                                    className={styles.modalClose}
                                    aria-label='Закрыть окно'
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </button>
                                <div className={styles.modalBody}>
                                    {title &&
                                        <div className={styles.modalTitle}>
                                            {title}
                                        </div>
                                    }
                                    <div className={styles.modalContent}>
                                        {children}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </FocusTrap>
                }
            </AnimatePresence>


        </ClientPortal>
    );
};
