import cn from 'classnames';
import { useAppContext } from '../../context/AppContext';
import { useRouteFragments } from '../../hooks/useRouteFragments';
import { Crumb } from './Crumb';
import { formatName } from './formatName';
import { BreadCrumbsProps } from './props';

import styles from './style.module.scss';

export const BreadCrumbs = ({ className, productName, ...props }: BreadCrumbsProps): JSX.Element => {

    const { catalog } = useAppContext();
    const fragments = useRouteFragments();

    const getCrumbs = (fragments: string[]) => {
        const crumbs = fragments.map((el, idx) => {
            const route = '/' + fragments.slice(0, idx + 1).join('/');
            return { text: formatName(el, idx, catalog, productName), route };
        });

        return [{ text: 'Главная', route: '/' }, ...crumbs];
    };

    const crumbs = getCrumbs(fragments);

    return (
        <div
            className={cn(styles.bc, className)}
            aria-label="breadcrumb" {...props}>
            {crumbs.map((crumb, idx) => (
                <Crumb
                    text={crumb.text}
                    route={crumb.route}
                    last={idx === crumbs.length - 1}
                    key={crumb.route}
                />
            ))}
        </div>
    );
};
