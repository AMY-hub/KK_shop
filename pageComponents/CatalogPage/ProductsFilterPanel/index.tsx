import cn from 'classnames';
import { CustomSelect } from '../../../components';
import { FilterProps } from './props';

import styles from './style.module.scss';

export const ProductsFilterPanel = (props: FilterProps): JSX.Element => {

    const { brandList,
        sorting,
        setSorting,
        price,
        setPrice,
        brands,
        setBrands,
        className,
        ...rest } = props;

    const brandsOptions = brandList.map(el => ({
        value: el.route,
        label: el.name
    }));

    const sortingOptions = [
        { value: 'price-ASC', label: 'Сначала дешевые' },
        { value: 'price-DESC', label: 'Сначала дорогие' },
        { value: 'popular', label: 'По популярности' },
        { value: 'newest', label: 'По обновлению' }
    ];

    const priceOptions = [
        { value: '0-1000', label: 'до 1000' },
        { value: '0-2000', label: 'до 2000' },
        { value: '2000-5000', label: 'от 2 до 5 тыс.' },
        { value: '5000-10000', label: 'от 5 до 10 тыс.' }
    ];

    return (
        <div className={cn(styles.panel, className)} {...rest}>
            <CustomSelect
                options={sortingOptions}
                value={sorting}
                name='Сортировать'
                onChange={setSorting}
                isMulti={false}
            />
            <CustomSelect
                options={priceOptions}
                value={price}
                name='Цена'
                onChange={setPrice}
                isMulti={false}
            />
            <CustomSelect
                options={brandsOptions}
                value={brands.length ? brands : null}
                name='Бренд'
                onChange={setBrands}
                isSearchable={true}
                isMulti={true}
            />
        </div>
    );
};





