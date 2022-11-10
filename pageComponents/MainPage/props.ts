import { ProductPreview } from '../../interfaces';

export interface MainPageProps {
    newest: ProductPreview[];
    sale: ProductPreview[] | null;
    popular: ProductPreview[];
} 