import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getPricesWithSale } from '../helpers/getPricesWithSale';
import { BasketProduct } from '../interfaces';
import basketService from '../services/basketService';
import { RootStore } from './rootStore';

export class BasketStore {
    private root: RootStore;
    private _basket: BasketProduct[] = [];
    private _finalPrice = 0;
    private _oldPrice = 0;
    bonusDiscount = 0;
    promoDiscount = 0;
    error = '';

    constructor(root: RootStore) {
        this.root = root;
        if (!this._basket.length) {
            this.loadBasket();
        }
        makeAutoObservable(this);
    }

    setBasket(data: BasketProduct[]) {
        this._basket = data;
        this.setFinalPrice();
    }

    getBasket() {
        return this._basket;
    }

    async loadBasket() {
        try {
            const res = await basketService.getBasket();
            if (res.status === 200) {
                runInAction(() => {
                    this._basket = res.data;
                    this.setFinalPrice();
                    console.log('BASKET LOADED', res.data);
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
        }
    }

    get finalPrice() {
        if (this.bonusDiscount && this.promoDiscount) {
            return Math.round((this._finalPrice - this.bonusDiscount) * (1 - this.promoDiscount / 100));
        }

        if (this.bonusDiscount) {
            return Math.round(this._finalPrice - this.bonusDiscount);
        }
        if (this.promoDiscount) {
            return Math.round(this._finalPrice * (1 - this.promoDiscount / 100));
        }
        return this._finalPrice;
    }

    get finalDiscount() {
        return this._oldPrice - this.finalPrice;
    }

    setBonusDiscount(val: number) {
        if (this.bonusDiscount) {
            this.bonusDiscount = 0;
        }

        const percents = Math.round((val * 100) / this.finalPrice);
        console.log(percents);

        if (percents > 50) {
            this.error = 'Вы не можете оплатить бонусами более 50% суммы заказа';
        } else {
            this.bonusDiscount = val;
            this.error = '';
        }
    }

    async setPromoDiscount(name: string) {
        try {
            if (this.promoDiscount) {
                return 'Вы уже использовали промокод!';
            }
            const { data } = await basketService.checkPromo(name);
            if (data) {
                this.promoDiscount = data.discount;
                return `${data.name}: скидка ${data.discount}%`;
            }
            return 'Промокод не найден';
        } catch (err) {
            this.error = getErrorMessage(err);
        }
    }

    async addProduct(productId: number) {
        try {
            const res = await basketService.addProduct(productId);
            if (res.status === 200) {
                runInAction(() => {
                    this.error = '';
                    this._basket?.push(res.data);
                    this.setFinalPrice();
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

    async updateProduct(productId: number, amount: number) {
        try {
            const basketProduct = this._basket.find(p => p.productId === productId);
            if (!basketProduct) return;

            const res = await basketService.updateProduct(basketProduct.id, amount);
            if (res.status === 200) {
                runInAction(() => {
                    this.error = '';
                    basketProduct.amount = amount;
                    this.setFinalPrice();
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

    async deleteProduct(productId: number) {
        try {
            const basketProduct = this._basket.find(p => p.productId === productId);
            if (!basketProduct) return;

            const res = await basketService.deleteProduct(basketProduct.id);
            if (res.status === 200 && res.data && this._basket) {
                runInAction(() => {
                    this.error = '';
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this._basket = this._basket.filter(p => p.id !== basketProduct.id);
                    this.setFinalPrice();
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

    findInBasket(productId: number) {
        return this._basket.find(p => p.productId === productId);
    }

    setFinalPrice() {
        const sum = this._basket.reduce<[number, number]>((prev, cur) => {
            const [salePrice, oldPrice] = getPricesWithSale(cur.product.price, cur.product.brand.special_sale?.discount);

            prev[0] += (salePrice * cur.amount);
            prev[1] += (oldPrice * cur.amount);
            return prev;
        }, [0, 0]);

        this._finalPrice = sum[0];
        this._oldPrice = sum[1];
    }
}
