import cn from 'classnames';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { AddressSuggestions, DaDataAddressSuggestion } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { AddressPickerProps } from './props';

import styles from './style.module.scss';

export const AddressPicker = forwardRef(({ uid, city, defaultQuery = '', onSelect, onChange, className, ...rest }: AddressPickerProps, ref: ForwardedRef<AddressSuggestions>) => {

    const [value, setValue] = useState<DaDataAddressSuggestion>();

    useEffect(() => {
        if (value && onChange) {
            onChange(value.value);
        }
        if (value && onSelect) {
            onSelect();
        }
    }, [value, onChange, onSelect]);

    const cityNameArr = city.match(/г [А-Я \-а-я]{1,}/);
    const cityName = cityNameArr ? cityNameArr[0].replace('г ', '') : '';

    return (
        <motion.div layout className={cn(styles.picker, className)} {...rest}>
            <div className={styles.pickerTitle}>
                Выберите ваш адрес:
            </div>
            <p className={styles.pickerText}>
                Вы можете выбрать <span>более 150 000</span> населённых пунктов по всей Российской Федерации.
            </p>
            <AddressSuggestions
                containerClassName={styles.pickerContainer}
                currentSuggestionClassName={styles.pickerSelected}
                suggestionClassName={styles.pickerOption}
                uid={uid}
                token={process.env.NEXT_PUBLIC_DADATA_API_KEY || ''}
                inputProps={{
                    placeholder: "Найти адрес",
                }}
                defaultQuery={defaultQuery}
                value={value}
                onChange={setValue}
                delay={500}
                filterFromBound='city'
                filterToBound='houses'
                filterLocations={[{ "city": cityName }]}
                ref={ref}
            />
        </motion.div>
    );
});