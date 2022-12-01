import cn from 'classnames';
import { useAppContext } from '../../context/AppContext';
import { useRouteFragments } from '../../hooks/useRouteFragments';
import { Crumb } from './Crumb';
import { formatName } from './formatName';
import { BreadCrumbsProps } from './props';

import styles from './style.module.scss';

export const BreadCrumbs = ({ className, categoryId, subCategoryId, productName, ...props }: BreadCrumbsProps): JSX.Element => {

    const { catalog } = useAppContext();
    const fragments = useRouteFragments();
    const crumbs = getCrumbs(fragments);

    function getCrumbs(fragments: string[]) {
        const crumbs = fragments.map((el, idx) => {
            const route = '/' + fragments.slice(0, idx + 1).join('/');
            return { text: formatName(el, productName), route };
        });
        const crumbsArr = [{ text: 'Главная', route: '/' }, ...crumbs];
        const categories = [];

        if (categoryId) {
            const category = catalog.find(el => el.id === Number(categoryId));
            if (!category) {
                return crumbsArr;
            }
            const subCategory = (category.subcategories && subCategoryId) ?
                category.subcategories
                    .find(el => el.id === Number(subCategoryId)) : null;

            subCategory ? categories.push(
                {
                    text: category.name,
                    route: `/products?categoryId=${category.id}`
                },
                {
                    text: subCategory.name,
                    route: `/products?categoryId=${category.id}&subCategoryId=${subCategory.id}`
                })
                :
                categories.push({
                    text: category.name,
                    route: `/products?categoryId=${category.id}`
                });
        }

        if (productName) {
            crumbsArr.splice(-1, 0, ...categories);
        }
        if (!productName && categories.length !== 0) {
            crumbsArr.push(...categories);
        }

        return crumbsArr;
    }

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