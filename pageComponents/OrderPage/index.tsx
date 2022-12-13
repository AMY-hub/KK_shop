import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import cn from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { CustomCheckbox, Dropdown, Input, Button, Title, Container, RadioBadge, PrivacyLabel, Modal, CityPicker, InputTel, MAlertMessage } from '../../components';
import { useAppContext, useBasketContext, useUserContext } from '../../context/AppContext';
import { OrderPreview } from './OrderPreview';
import { StepHeader } from './StepHeader';
import { isEmptySpaces } from '../../helpers/isEmptySpaces';
import { SuccessMessage } from './SuccessMessage';
import { AddressTab } from './AddressTab';
import { useOrderSubmit } from './useOrderSubmit';
import { useDelivery } from '../../hooks/useDelivery';
import { OrderFormFields } from './interfaces';
import { OrderPageProps } from './props';
import CardIcon from '../../assets/images/icons/credit-card.svg';
import PickIcon from '../../assets/images/icons/pick.svg';

import styles from './style.module.scss';

export const OrderPage = observer(({ cities, addresses }: OrderPageProps): JSX.Element => {

    const userState = useUserContext();
    const city = useAppContext().city;
    const basket = useBasketContext().basket;
    const [modalAddressShown, setModalAddressShown] = useState<boolean>(false);
    const [modalCityShown, setModalCityShown] = useState<boolean>(false);
    const { deliveryPrice, pickPrice, pick } = useDelivery(addresses);
    const {
        register,
        formState: { errors, isSubmitting, dirtyFields },
        getValues,
        setValue,
        handleSubmit, reset, control } = useForm<OrderFormFields>({
            defaultValues: {
                address: '',
                name: userState.user?.name || '',
                lastName: userState.user?.lastname || '',
                email: userState.user?.email || '',
                privacy: true,
                delivery: 'курьер',
                payment: 'онлайн'
            }
        });
    const [deliveryType, address] = useWatch({ control, name: ['delivery', 'address'] });

    const {
        orderData,
        error,
        setError,
        submitHandler } = useOrderSubmit(reset, deliveryPrice);

    const deliveryOptions = useMemo(() => {
        if (pick) {
            return [{
                value: 'курьер',
                labelTitle: 'Курьер',
                labelFooter: `${deliveryPrice} руб`,
                labelBody: 'Служба доставки'
            },
            {
                value: 'cамовывоз',
                labelTitle: 'Самовывоз',
                labelFooter: pickPrice ? `${pickPrice} руб` : 'Бесплатно',
                labelBody: 'Пункты выдачи'
            }];
        } else {
            return [{
                value: 'курьер',
                labelTitle: 'Курьер',
                labelFooter: `${deliveryPrice} руб`,
                labelBody: 'Служба доставки'
            }];
        }
    }, [deliveryPrice, pickPrice, pick]);

    const paymentOptions = useMemo(() => (
        [{
            value: 'онлайн',
            labelBody: (
                <div className={styles.payment}>
                    <CardIcon /><br />
                    картой на сайте
                </div>)
        },
        {
            value: 'при получении',
            labelBody: (
                <div className={styles.payment}>
                    <PickIcon width={32} /><br />
                    при получении
                </div>)
        }]), []);

    if (orderData) {
        return (
            <SuccessMessage
                order={orderData}
                isAuthorized={userState.isLoggedIn}
            />);
    }
    if (basket.length === 0) {
        return (
            <Container>
                <Title tag='h2'>
                    Добавьте товары в корзину, чтобы оформить заказ.
                </Title>
            </Container>);
    }

    return (
        <Container className={styles.order}>
            <Title tag='h1' className={styles.orderTitle}>
                Оформление заказа
            </Title>
            <div className={styles.orderRegistration}>

                <form onSubmit={(handleSubmit((data, e) => submitHandler(data, e)))}>

                    <Dropdown
                        opened
                        className={styles.orderStep}
                        header={<StepHeader step='1/3' title='Адрес и доставка' />}>
                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>Населенный пункт</Title>
                            <div className={styles.orderStepSectionFields}>
                                <div className={styles.orderCity}>
                                    {city}
                                </div>
                                <Button
                                    type='button'
                                    styleType='ghost'
                                    onClick={() => setModalCityShown(true)}
                                >Изменить город</Button>
                            </div>
                        </div>
                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>Способ доставки</Title>
                            <div className={styles.orderStepSectionFields}>
                                <RadioBadge
                                    control={control}
                                    name='delivery'
                                    options={deliveryOptions}
                                />
                                {!cities.includes(city) &&
                                    <div className={styles.orderDisclaimer}>
                                        *самовывоз недоступен в вашем регионе
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>
                                {deliveryType === 'курьер'
                                    ? 'Адрес' : 'Пункт самовывоза'}
                            </Title>
                            <div className={styles.orderStepSectionFields}>
                                <div className={styles.orderAddress}>
                                    {getValues('address') || 'Не выбран'}
                                </div>
                                <Button
                                    type='button'
                                    styleType='ghost'
                                    onClick={() => setModalAddressShown(true)}
                                >
                                    {deliveryType === 'курьер'
                                        ? 'Изменить адрес' : 'Выбрать пункт самовывоза'}
                                </Button>
                            </div>
                        </div>
                    </Dropdown>

                    <Dropdown
                        opened={address ? true : false}
                        className={styles.orderStep}
                        header={<StepHeader step='2/3' title='Получатель' />}>
                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>Ваши данные</Title>
                            <div
                                className={cn(styles.orderStepSectionFields, styles.personalData)}>
                                <Input {...register('lastName', {
                                    required: 'Обязательно для заполнения', maxLength: 20,
                                    validate: isEmptySpaces
                                })}
                                    error={errors.lastName}
                                    placeholder='Фамилия'
                                    required
                                    isWide />
                                <Input {...register('name', {
                                    required: 'Обязательно для заполнения', maxLength: 20,
                                    validate: isEmptySpaces
                                })}
                                    error={errors.name}
                                    placeholder='Имя'
                                    required
                                    isWide />
                                <Input {...register('middleName', {
                                    required: 'Обязательно для заполнения', maxLength: 20,
                                    validate: isEmptySpaces
                                })}
                                    error={errors.middleName}
                                    required
                                    placeholder='Отчество'
                                    isWide />
                            </div>
                        </div>

                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>Контакты</Title>
                            <div
                                className={cn(styles.orderStepSectionFields, styles.personalData)}>
                                <InputTel
                                    control={control}
                                    name='phone'
                                    placeholder='(XXX) XXX-XX-XX'
                                    code='+7 '
                                    required
                                    isWide
                                />
                                <Input {...register('email', {
                                    required: 'Обязательно для заполнения',
                                    validate: isEmptySpaces
                                })}
                                    type='email'
                                    error={errors.email}
                                    placeholder='Ваша почта'
                                    hint='*Необходимо для отправки чека'
                                    required
                                    isWide />
                                <CustomCheckbox
                                    label={<PrivacyLabel />}
                                    control={control}
                                    name='privacy'
                                    value='privacy'
                                />
                            </div>
                        </div>
                    </Dropdown>

                    <Dropdown
                        opened={dirtyFields.name
                            && dirtyFields.lastName
                            && dirtyFields.middleName
                            && dirtyFields.phone}
                        className={styles.orderStep}
                        header={<StepHeader step='3/3' title='Оплата' />}>
                        <p><b>Бесконтактная доставка действует для всех заказов, оплаченных онлайн</b></p>
                        <RadioBadge
                            control={control}
                            name='payment'
                            options={paymentOptions}
                        />
                        <pre />
                        <p>Оплата курьеру банковской картой или наличными.</p>
                        <p>Обратите внимание! Подарочные сертификаты и бонусы к оплате не принимаются.</p>
                    </Dropdown>

                    <Button
                        type='submit'
                        styleType='ghost'
                        withLoading
                        loading={isSubmitting}
                        isWide
                        className={styles.orderSubmit}
                    >Оформить заказ
                    </Button>
                </form>

            </div>
            <OrderPreview
                deliveryType={deliveryType}
                deliveryPrice={deliveryPrice}
                pickPrice={pickPrice}
                className={styles.orderPreview} />
            <AnimatePresence>
                {error &&
                    <MAlertMessage
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ bounce: 0 }}
                        type='warning'
                        message={error}
                        onClose={() => setError('')} />
                }
            </AnimatePresence>

            <Modal
                shown={modalCityShown}
                onClose={() => setModalCityShown(false)}>
                <CityPicker
                    defaultCity={city}
                    onSelect={() => {
                        setModalCityShown(false);
                        setValue('delivery', 'курьер');
                    }} />
            </Modal>
            <Modal
                shown={modalAddressShown}
                onClose={() => setModalAddressShown(false)}>
                <AddressTab
                    control={control}
                    addresses={addresses}
                    onSelectFn={() => setModalAddressShown(false)}
                    pickFn={(val: string) => setValue('address', val)}
                />
            </Modal>
        </Container>
    );
});