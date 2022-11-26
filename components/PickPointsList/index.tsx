import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../context/AppContext';
import { PickPointsListProps } from './props';

import styles from './style.module.scss';

export const PickPointsList = observer(({ addresses, selectFn, className, ...props }: PickPointsListProps): JSX.Element => {

    const city = useAppContext().city;

    const pickPoints = addresses.filter(el => el.city === city)
        .map(el => (
            <li key={el.id}>
                <button
                    type='button'
                    onClick={() => selectFn(el.address)}>
                    {el.address}
                </button>
            </li>));

    return (
        <div className={className} {...props}>
            <div className={styles.pickTitle}>
                Пункты самовывоза:
            </div>
            <ul className={styles.pickList}>
                {
                    pickPoints.length > 0 ?
                        pickPoints :
                        <li>
                            Нет доступных пунктов самовывоза в указанном регионе.
                        </li>}
            </ul>
        </div>
    );
});
