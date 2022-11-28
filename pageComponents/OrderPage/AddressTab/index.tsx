import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { AddressPicker, MPickPointsList } from '../../../components';
import { useAppContext } from '../../../context/AppContext';
import { AddressTabProps } from './props';

import styles from './style.module.scss';

export const AddressTab = observer(({ addresses, control, pickFn, onSelectFn }: AddressTabProps): JSX.Element => {

    const [currentTab, setCurrentTab] = useState<'pick' | 'address'>('address');
    const { city } = useAppContext();

    return (
        <div className={styles.tab}>
            <div className={styles.tabHeader}>
                <motion.button
                    className={styles.tabBtn}
                    initial={{ color: "var(--semi-black)" }}
                    animate={{
                        color: currentTab === 'address' ?
                            "var(--accent-dark)" : "var(--semi-black)"
                    }}
                    onClick={() => setCurrentTab('address')}>
                    Доставка
                    {currentTab === 'address' &&
                        <motion.span
                            className={styles.activeLine}
                            layoutId="active"></motion.span>}
                </motion.button>
                <motion.button
                    className={styles.tabBtn}
                    initial={{ color: "var(--semi-black)" }}
                    animate={{
                        color: currentTab === 'pick' ?
                            "var(--accent-dark)" : "var(--semi-black)"
                    }}
                    onClick={() => setCurrentTab('pick')}>
                    Самовывоз
                    {currentTab === 'pick' &&
                        <motion.span
                            className={styles.activeLine}
                            layoutId="active"></motion.span>}
                </motion.button>
            </div>
            <motion.div layout>
                {currentTab === 'address' ?
                    <Controller
                        name='address'
                        control={control}
                        rules={{ required: 'Обязательно для заполнения' }}
                        render={({ field: { ref, onChange } }) => (
                            <AddressPicker
                                uid='address-city-picker'
                                ref={ref}
                                city={city}
                                onChange={onChange}
                                onSelect={onSelectFn}
                            />)}
                    />
                    :
                    <MPickPointsList
                        layout
                        selectFn={(val: string) => {
                            pickFn(val);
                            onSelectFn();
                        }}
                        addresses={addresses} />
                }
            </motion.div>
        </div>
    );
});