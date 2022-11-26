import cn from 'classnames';
import { motion } from 'framer-motion';
import { PreloaderProps } from './props';

import styles from './style.module.scss';

export const Preloader = ({ text = 'Загрузка...', className, ...props }: PreloaderProps): JSX.Element => {

    const variants = {
        start: {
            scale: 0.1,
            opacity: 1
        },
        end: {
            scale: 1,
            opacity: 0,
        },
    };

    return (
        <div className={cn(styles.loader, className)} {...props}>
            {text &&
                <div className={styles.loaderText}>{text}</div>}
            <motion.div className={styles.loaderSpinner}>
                <motion.div
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                </motion.div>
                <motion.div
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.15 }}
                ></motion.div>
                <motion.div
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
                ></motion.div>
                <motion.div
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.45 }}
                ></motion.div>
                <motion.div
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
                ></motion.div>
                <motion.div
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.75 }}
                ></motion.div>
            </motion.div>
        </div>
    );
};
