export const formatName = (text: string, productName?: string): string => {
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

    return text;
};