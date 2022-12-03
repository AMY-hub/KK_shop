import { observer } from 'mobx-react-lite';
import { Controller, useWatch } from 'react-hook-form';
import { AddressPicker, MPickPointsList } from '../../../components';
import { useAppContext } from '../../../context/AppContext';
import { AddressTabProps } from './props';

import styles from './style.module.scss';

export const AddressTab = observer(({ addresses, control, pickFn, onSelectFn }: AddressTabProps): JSX.Element => {

    const { city } = useAppContext();
    const deliveryType = useWatch({ control, name: 'delivery' });

    return (
        <div className={styles.tab}>
            <div className={styles.tabHeader}>
                {deliveryType === 'курьер'
                    ? 'Выберите адрес доставки' : 'Выберите пункт самовывоза'}
            </div>
            {deliveryType === 'курьер' ?
                <Controller
                    name='address'
                    control={control}
                    rules={{ required: 'Обязательно для заполнения' }}
                    render={({ field: { ref, onChange } }) => (
                        <AddressPicker
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
        </div>
    );
});