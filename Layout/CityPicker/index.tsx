import cn from 'classnames';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { AddressSuggestions, DaDataAddressSuggestion } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useAppContext } from '../../context/AppContext';
import { CityPickerProps } from './props';

import styles from './style.module.scss';

export const CityPicker = ({ uid, defaultCity, onSelect, className, ...rest }: CityPickerProps) => {

    const [value, setValue] = useState<DaDataAddressSuggestion>();
    const appStore = useAppContext();
    useEffect(() => {
        if (value) {
            appStore.city = value.value;
            Cookies.set('preferCity', value.value, { expires: 365 });
            if (onSelect) {
                onSelect();
            }
        } else {
            Cookies.set('preferCity', defaultCity, { expires: 365 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, onSelect]);

    return (
        <div className={cn(styles.picker, className)} {...rest}>
            <h1 className={styles.pickerTitle}>
                Выберите ваш город:
            </h1>
            <p className={styles.pickerText}>
                Вы можете выбрать <span>более 150 000</span> населённых пунктов по всей Российской Федерации.
            </p>
            <AddressSuggestions
                containerClassName={styles.pickerContainer}
                currentSuggestionClassName={styles.pickerSelected}
                suggestionClassName={styles.pickerOption}
                uid={uid}
                token={process.env.NEXT_PUBLIC_DADATA_API_KEY || ''}
                inputProps={{ placeholder: "Найти город" }}
                defaultQuery={defaultCity}
                value={value}
                onChange={setValue}
                delay={500}
                filterFromBound='city'
                filterToBound='city'
            />
        </div>
    );
};