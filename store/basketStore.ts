/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { getPriceWithSale } from '../helpers/getPriceWithSale';
import { BasketCertificate, BasketItemType, BasketProduct } from '../interfaces';
import basketService from '../services/basketService';
import { RootStore } from './rootStore';

export class BasketStore {
    private _root: RootStore;
    private _basket: Array<BasketProduct | BasketCertificate> = [];
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

    set basket(data: Array<BasketProduct | BasketCertificate>) {
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
            } else {
                runInAction(() => this.status = 'idle');
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            this.status = 'idle';
        }
    }

    async addProduct(productId: number, type: BasketItemType) {
        try {
            const res = await basketService.addProduct(productId, type);
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

    async updateProduct(productId: number, amount: number, type: BasketItemType) {
        try {
            let item: BasketProduct | BasketCertificate | undefined;
            if (type === 'certificate') {
                item = this._basket
                    .find(p => p.type === 'certificate' && p.certificateId === productId);
            } else {
                item = this._basket
                    .find(p => p.type === 'product' && p.productId === productId);
            }

            if (item) {
                const res = await basketService.updateProduct(item.id, amount, type);
                if (res.status === 200) {
                    runInAction(() => {
                        this._error = '';
                        item!.amount = amount;
                        this.setFinalPrice();
                    });
                }
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

    async deleteProduct(productId: number, type: BasketItemType) {
        try {
            let item: BasketProduct | BasketCertificate | undefined;
            if (type === 'certificate') {
                item = this._basket
                    .find(p => p.type === 'certificate' && p.certificateId === productId);
            } else {
                item = this._basket
                    .find(p => p.type === 'product' && p.productId === productId);
            }

            if (item) {
                const res = await basketService.deleteProduct(item.id, type);
                if (res.status === 200 && res.data && this._basket) {
                    runInAction(() => {
                        this._error = '';
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this.basket = this.basket.filter(p => p.id !== item?.id);
                        this.setFinalPrice();
                    });
                }
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

    findInBasket(productId: number, type: BasketItemType) {
        return type === 'product' ?
            this._basket
                .find(p => p.type === 'product' && p.productId === productId)
            :
            this._basket
                .find(p => p.type === 'certificate' && p.certificateId === productId);
    }

    setFinalPrice() {
        const sum = this._basket.reduce<[number, number]>((prev, cur) => {
            if (cur.type === 'product') {
                const salePrice = getPriceWithSale(cur.product.price, cur.product.brand.special_sale?.discount);
                prev[0] += (salePrice * cur.amount);
                prev[1] += (cur.product.price * cur.amount);
                return prev;
            } else {
                prev[0] += (cur.certificate.price * cur.amount);
                prev[1] += (cur.certificate.price * cur.amount);
                return prev;
            }
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
                    this.promoActive = '';
                    this.basket = [];
                });
            }
        }
    }
}
