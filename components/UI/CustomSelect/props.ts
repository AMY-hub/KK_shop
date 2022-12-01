import { GroupBase, OnChangeValue, OptionsOrGroups, PropsValue } from 'react-select';
import { Option } from '../../../interfaces';

export interface SelectProps<E extends Option, M extends boolean> {
    id: string;
    name: string;
    options: OptionsOrGroups<E, GroupBase<E>>;
    isMulti: M;
    onChange: (opt: OnChangeValue<E, M>) => void;
    value: PropsValue<E> | null;
    isSearchable?: boolean;
}