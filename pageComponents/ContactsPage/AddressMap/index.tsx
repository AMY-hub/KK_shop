import cn from 'classnames';
import { Map, SearchControl } from '@pbe/react-yandex-maps';
import { AddressMapProps } from './props';

import styles from './style.module.scss';

export const AddressMap = ({ state, className, placeMarks, ...props }: AddressMapProps): JSX.Element => {
    return (
        <div className={cn(styles.map, className)} {...props}>
            <Map state={state} width='100%' height='100%'>
                <SearchControl options={{ float: "right" }} />
                {placeMarks}
            </Map>
        </div>
    );
};
