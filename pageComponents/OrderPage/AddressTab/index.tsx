import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { AddressPicker, PickPointsList } from '../../../components';
import { useAppContext } from '../../../context/AppContext';
import { AddressTabProps } from './props';

import styles from './style.module.scss';

export const AddressTab = observer(({ addresses, control, pickFn, onSelectFn }: AddressTabProps): JSX.Element => {

    const [currentTab, setCurrentTab] = useState<'pick' | 'address'>('address');
    const { city } = useAppContext();

    return (
        <div className={styles.tab}>
            <div className={styles.tabHeader}>
                <button
                    className={cn(styles.tabBtn, {
                        [styles.tabBtn_active]: currentTab === 'address'
                    })}
                    onClick={() => setCurrentTab('address')}>
                    Доставка
                </button>
                <button
                    className={cn(styles.tabBtn, {
                        [styles.tabBtn_active]: currentTab === 'pick'
                    })}
                    onClick={() => setCurrentTab('pick')}>
                    Самовывоз
                </button>
            </div>
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
                <PickPointsList
                    selectFn={(val: string) => {
                        pickFn(val);
                        onSelectFn();
                    }}
                    addresses={addresses} />
            }
        </div>
    );
});