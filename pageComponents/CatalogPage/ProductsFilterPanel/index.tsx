import cn from 'classnames';
import { CustomSelect } from '../../../components';
import { useFilterParams } from './useFilterParams';
import { FilterProps } from './props';

import styles from './style.module.scss';

export const ProductsFilterPanel = (props: FilterProps): JSX.Element => {

    const { brandList,
        className,
        ...rest } = props;

    const brandsOptions = brandList.map(el => ({
        value: `${el.id}`,
        label: el.name
    }));

    const sortingOptions = [
        { value: 'price-ASC', label: 'Сначала дешевые' },
        { value: 'price-DESC', label: 'Сначала дорогие' },
        { value: 'orderQuantity-DESC', label: 'По популярности' },
        { value: 'createdAt-DESC', label: 'По обновлению' }
    ];

    const priceOptions = [
        { value: '0-1000', label: 'до 1000' },
        { value: '0-1999', label: 'до 2000' },
        { value: '2000-5000', label: 'от 2 до 5 тыс.' },
        { value: '5000-10000', label: 'от 5 до 10 тыс.' }
    ];

    const {
        sorting,
        handleSorting,
        price,
        handlePrice,
        brands,
        handleBrand
    } = useFilterParams({ brandsOptions, priceOptions, sortingOptions });

    return (
        <div className={cn(styles.panel, className)} {...rest}>
            <CustomSelect
                id='sort'
                options={sortingOptions}
                value={sorting}
                name='Сортировать'
                onChange={handleSorting}
                isMulti={false}
            />
            <CustomSelect
                id='price'
                options={priceOptions}
                value={price}
                name='Цена'
                onChange={handlePrice}
                isMulti={false}
            />
            <CustomSelect
                id='brand'
                options={brandsOptions}
                value={brands.length ? brands : null}
                name='Бренд'
                onChange={handleBrand}
                isSearchable={true}
                isMulti={true}
            />
        </div>
    );
};





