import { useId } from 'react';
import Select, { StylesConfig } from 'react-select';
import { Option } from '../../../interfaces';
import { SelectProps } from './props';

export function CustomSelect<E extends Option, M extends boolean>({ name, options, onChange, value, isSearchable = false, isMulti }: SelectProps<E, M>) {

    const id = useId();

    const customStyles: StylesConfig<E, M> = {
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'var(--accent-dark)' : 'var(--black)',
            background: state.isFocused ? 'var(--dark-bg)' : 'var(--bg)',
        }),
        control: (provided) => ({
            ...provided,
            minWidth: '100px',
            padding: '0.5rem 0',
            background: 'none',
            color: 'var(--black)',
            border: 'none',
            borderBottom: '1.5px solid var(--black)',
            borderRadius: 0,
            boxShadow: 'none',
            transition: 'border 300ms',
            ":focus": {
                borderBottom: '1.5px solid var(--accent-dark)'
            },
            ":hover": {
                borderBottom: '1.5px solid var(--accent-dark)'
            }
        }),
        placeholder: (provided, state) => ({
            ...provided,
            fontSize: '1.1rem',
            fontWeight: '500',
            color: state.isFocused ? 'var(--accent-dark)' : 'var(--black)'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--black)',
            fontSize: '1rem',
            fontWeight: '500'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0'
        }),
        dropdownIndicator: () => ({
            display: 'none'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 10,
            background: 'var(--bg)'
        }),
        menuList: (provided) => ({
            ...provided,
            width: 'fit-content',
            '::-webkit-scrollbar': {
                width: '3px',
                height: '0px',
            },
            '::-webkit-scrollbar-track': {
                background: 'var(--dark-bg)'
            },
            '::-webkit-scrollbar-thumb': {
                background: 'var(--gray)',
                borderRadius: '2px'
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: 'var(--gray-dark)'
            }
        }),
        container: (provided) => ({
            ...provided,
            width: 'fit-content'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'var(--black)',
            fontSize: '100%',
            fontWeight: '500'
        }),
        multiValueRemove: () => ({
            display: 'none'
        }),
        input: (provided) => ({
            ...provided,
            padding: 0,
            margin: 0
        }),
        multiValue: (provided) => ({
            ...provided,
            padding: 0,
            margin: 0
        }),
        clearIndicator: (provided) => ({
            ...provided,
            padding: 0,
            ":hover": {
                color: 'var(--accent-dark)'
            }
        }),
    };

    return (
        <div>
            <Select
                instanceId={id}
                placeholder={name}
                options={options}
                value={value}
                onChange={onChange}
                isSearchable={isSearchable}
                styles={customStyles}
                isMulti={isMulti}
                isClearable
            />
        </div>
    );
}