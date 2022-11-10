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
    subCategoryId: number;
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
    name: string;
    price: number;
    img: string;
}

export interface Review {
    id: number;
    text: string;
    productId: number;
    userId: number;
    products: BasketProduct[];
}

export interface BasketProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    productId: number;
    amount: number;
    product: ProductPreview;
}

export interface Basket {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    products: BasketProduct;
}

export interface FavProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    favListId: number,
    productId: number,
    product: ProductPreview;
}

export interface FavList {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    favs: FavProduct[];
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
    basket: Basket;
    fav_list: FavList;
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