export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    subcategories: Subcategory[];
}

export interface Subcategory {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: number;
}