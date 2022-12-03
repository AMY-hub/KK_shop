import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getPricesWithSale } from '../helpers/getPricesWithSale';
import { BasketProduct } from '../interfaces';
import basketService from '../services/basketService';
import { RootStore } from './rootStore';

export class BasketStore {
    private _root: RootStore;
    private _basket: BasketProduct[] = [];
    private _finalPrice = 0;
    private _oldPrice = 0;
    private _error = '';
    bonusDiscount = 0;
    promoDiscount = 0;
    promoActive = '';
    status: 'idle' | 'loading' = 'idle';

    constructor(root: RootStore) {
        this._root = root;
        this.loadClientBasket();
        makeAutoObservable(this);
    }

    set basket(data: BasketProduct[]) {
        this._basket = data;
        this.setFinalPrice();
    }

    get basket() {
        return this._basket;
    }

    set error(message: string) {
        runInAction(() => {
            this._error = message;
        });
    }

    get error() {
        return this._error;
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
        const percents = Math.round((val * 100) / this.finalPrice);
        if (percents > 50) {
            this.error = 'Вы не можете оплатить бонусами более 50% суммы заказа';
            this.bonusDiscount = 0;
        } else {
            this.bonusDiscount = val;
            this.error = '';
        }
    }

    async setPromoDiscount(name: string) {
        try {
            if (this.promoDiscount) {
                runInAction(() => {
                    this.error = 'Вы уже использовали промокод!';
                });
                return;
            }
            const { data } = await basketService.checkPromo(name);
            if (data) {
                runInAction(() => {
                    this.promoDiscount = data.discount;
                    this.promoActive = `${data.name}: скидка ${data.discount}%`;
                });
                return;
            } else {
                runInAction(() => {
                    this.promoDiscount = 0;
                    this.promoActive = '';
                    this._error = 'Промокод не найден';
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
        }
    }

    async loadClientBasket() {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            this.status = 'loading';
            const res = await basketService.getBasket();
            if (res.status === 200 && res.data) {
                runInAction(() => {
                    this.basket = res.data;
                    this.setFinalPrice();
                    this.status = 'idle';
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            this.status = 'idle';
        }
    }

    async addProduct(productId: number) {
        try {
            const res = await basketService.addProduct(productId);
            if (res.status === 200) {
                runInAction(() => {
                    this._error = '';
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
                    this._error = '';
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
                    this._error = '';
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.basket = this.basket.filter(p => p.id !== basketProduct.id);
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

    async clearBasket() {
        if (this._basket.length !== 0) {
            const basketId = this._basket[0].basketId;
            const res = await basketService.clearBasket(basketId);
            if (res.status === 200) {
                runInAction(() => {
                    this.bonusDiscount = 0;
                    this.promoDiscount = 0;
                    this.basket = [];
                });
            }
        }
    }
}
