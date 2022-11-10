import { Category } from '../../interfaces';

export const formatName = (text: string, idx: number, catalog: Category[], productName?: string): string => {
    //constant routes:
    switch (text) {
        case 'products':
            return 'Каталог';
        case 'cosmetologists':
            return 'Клуб косметологов';
        case 'certificates':
            return 'Сертификаты';
        case 'delivery':
            return 'Доставка и Оплата';
        case 'contacts':
            return 'Контакты';
        case 'profile':
            return 'Профиль пользователя';

        default:
            break;
    }

    //dynamic routes:
    if (Number(text) && productName) {
        return productName;
    }

    if (idx === 1) {
        const category = catalog.find(el => el.route === text);
        return category ? category.name : text;
    }

    if (!Number(text) && idx > 1) {
        const subcategory = catalog
            .flatMap(el => el.subcategories)
            .find(sc => sc.route === text);
        return subcategory ? subcategory.name : text;
    }

    return text;
};