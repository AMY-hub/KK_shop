export interface Category {
    id: number;
    name: string;
    route: string;
    createdAt: string;
    updatedAt: string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    id: number;
    name: string;
    route: string;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
}

export interface Country {
    id: number;
    name: string;
    route: string;
    createdAt: string;
    updatedAt: string;
}

export interface Brand {
    id: number;
    name: string;
    description: string;
    route: string;
    createdAt: string;
    updatedAt: string;
    specialSaleId: number | null;
    countryId: number;
    country: Country;
    special_sale: Sale | null
}

export interface Sale {
    id: number;
    name: string;
    discount: number;
    createdAt: string;
    updatedAt: string;
    brands: Brand[];
}

export interface ProductsResponse {
    products: {
        count: number;
        rows: ProductPreview[];
    }
}

export interface ProductPreview {
    id: number;
    name: string;
    name_rus: string;
    price: number;
    img: string;
    weight: string;
    volume: string;
    orderQuantity: number;
    createdAt: string;
    updatedAt: string;
    brandId: number;
    brand: Brand;
    countryId: number;
    country: Country;
    categoryId: number;
    category: Category;
    subCategoryId: number | null;
    sub_category: Subcategory | null;
    art: string;
}

export interface Info {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    productId: number;
}

export interface ProductAddImage {
    id: number;
    img: string;
    createdAt: string;
    updatedAt: string;
    productId: number;
}

export interface ProductDetails extends ProductPreview {
    info: Info[];
    product_add_images: ProductAddImage[];
    reviews: Review[];
}

export interface Certificate {
    id: number;
    name: string;
    price: number;
    img: string;
    reatedAt: string;
    updatedAt: string;
}

export interface Review {
    id: number;
    text: string;
    productId: number;
    userId: number;
}

export interface BasketProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    productId: number;
    amount: number;
    product: ProductPreview;
    type: 'product';
}

export interface BasketCertificate {
    id: number;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    certificateId: number;
    amount: number;
    certificate: Certificate;
    type: 'certificate'
}

export type BasketItemType = 'certificate' | 'product';

export interface Basket {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    temporary_key: string | null;
    products: Array<BasketProduct | BasketCertificate>;
}

export interface FavProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    favListId: number,
    productId: number,
    product: ProductPreview;
}

export interface BonusCard {
    id: number;
    number: string;
    points: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface UserData {
    id: number;
    email: string;
    password: string;
    name: string;
    lastname: string | null;
    role: 'USER' | 'ADMIN';
    birthdate: number | null;
    createdAt: string;
    updatedAt: string;
    bonus_card: BonusCard;
    orders: number[];
}

export interface UserResponse {
    accessToken: string;
    refreshToken: string;
    user: UserData;
    basket: BasketProduct[];
    fav_list: FavProduct[];
}

export interface RegisterFormFields {
    name: string;
    lastname: string | null;
    email: string;
    password: string;
    birthdate: string | null;
    privacyCheck: boolean;
}

export interface LoginFormFields {
    email: string;
    password: string;
}

export interface LinkOption {
    name: string;
    url: string;
}

export type Option = {
    value: string,
    label: string
};

export interface PromoCode {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    discount: number;
}

export interface LocationData {
    postal_code: string;
    country: string;
    country_iso_code: string;
    federal_district: string;
    region_fias_id: string;
    region_kladr_id: string;
    region_iso_code: string;
    region_with_type: string;
    region_type: string;
    region_type_full: string;
    region: string;
    city_fias_id: string;
    city_kladr_id: string;
    city_with_type: string;
    city_type: string;
    city_type_full: string;
    city: string;
}

export interface Location {
    value: string;
    unrestricted_value: string;
    data: LocationData;
}

export interface LocationResponse {
    location: Location | null;
}

export interface Address {
    id: number;
    type: 'shop' | 'pick';
    city: string;
    address: string;
    phone: string;
    email: string;
    coord: [string, string];
    createdAt: string;
    updatedAt: string;
}

export interface OrderProduct {
    id: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    orderId: number;
    productId: number;
    product: ProductPreview;
}

export interface OrderCertificate {
    id: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    orderId: number;
    certificateId: number;
    certificate: Certificate;
    type: 'certificate'
}

export interface Order {
    id: number;
    key: string;
    address: string;
    delivery: string;
    status: string;
    payment_status: 'не оплачен' | 'оплачен';
    payment_id: string | null;
    payment_confirmation: string | null;
    payment: string;
    phone: string;
    email: string;
    price: number;
    delivery_price: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    products: OrderProduct[];
    certificates: OrderCertificate[];
}

export interface OrderCreateResponse {
    orderNumber: string;
    points: number | undefined;
    payment_url: string | undefined;
}

export type Delivery = 'самовывоз' | 'курьер';

export type Payment = 'онлайн' | 'при получении';