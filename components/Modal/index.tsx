import { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import cn from 'classnames';
import { ClientPortal } from '../ClientPortal';
import { ModalProps } from './props';
import CloseIcon from '../../assets/images/icons/close.svg';

import styles from './style.module.scss';

export const Modal = ({ children, shown, onClose, className, title, ...props }: ModalProps): JSX.Element | null => {

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

    if (!shown) {
        return null;
    }

    return (
        <ClientPortal selector='#modal'>
            <FocusTrap>
                <div
                    className={styles.modalOverlay}
                    onClick={onClose}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className={cn(styles.modal, className)}
                        {...props}>
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
                    </div>
                </div>
            </FocusTrap>
        </ClientPortal>
    );
};
