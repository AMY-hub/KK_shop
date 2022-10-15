export type NavOptions = 'Каталог' | 'Клуб косметологов' | 'Сертификаты' | 'Доставка и Оплата' | 'Контакты';

export type FooterInfOptions = 'Клуб косметологов' | 'Сертификаты' | 'Доставка и Оплата' | 'Контакты' | 'Конфиденциальность';

export const navOtionsMap = new Map<NavOptions, string>([
    ['Каталог', '/catalog'],
    ['Клуб косметологов', '/cosmetologists'],
    ['Сертификаты', '/certificates'],
    ['Доставка и Оплата', '/delivery'],
    ['Контакты', '/contacts']
]);

export const footerInfOptions = new Map<FooterInfOptions, string>([
    ['Клуб косметологов', '/cosmetologists'],
    ['Сертификаты', '/certificates'],
    ['Доставка и Оплата', '/delivery'],
    ['Конфиденциальность', '/privacy'],
    ['Контакты', '/contacts']
]); 