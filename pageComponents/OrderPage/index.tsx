import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import cn from 'classnames';
import { CustomCheckbox, Dropdown, Input, Button, Title, Container, RadioBadge, PrivacyLabel, Modal, CityPicker, InputTel, AlertMessage } from '../../components';
import { useAppContext, useUserContext } from '../../context/AppContext';
import { OrderPreview } from './OrderPreview';
import { StepHeader } from './StepHeader';
import { isEmptySpaces } from '../../helpers/isEmptySpaces';
import { SuccessMessage } from './SuccessMessage';
import { AddressTab } from './AddressTab';
import { useOrderSubmit } from './useOrderSubmit';
import { Delivery, OrderFormFields } from './interfaces';
import { OrderPageProps } from './props';
import CardIcon from '../../assets/images/icons/credit-card.svg';
import PickIcon from '../../assets/images/icons/pick.svg';

import styles from './style.module.scss';
import { AnimatePresence } from 'framer-motion';

export const OrderPage = observer(({ cities, addresses }: OrderPageProps): JSX.Element => {

    const userState = useUserContext();
    const city = useAppContext().city;
    const [delivery, setDelivery] = useState<Delivery>('курьер');
    const [modalAddressShown, setModalAddressShown] = useState<boolean>(false);
    const [modalCityShown, setModalCityShown] = useState<boolean>(false);
    const {
        register,
        formState: { errors, isSubmitting },
        getValues,
        setValue,
        handleSubmit, reset, control } = useForm<OrderFormFields>({
            defaultValues: {
                name: userState.user?.name || '',
                lastName: userState.user?.lastname || '',
                email: userState.user?.email || '',
                privacy: true,
                delivery: delivery,
                payment: 'онлайн'
            }
        });

    const deliveryPrice = useMemo(() => {
        if (delivery === 'курьер') {
            return cities.includes(city) ? 100 : 400;
        }
        return 0;
    }, [cities, city, delivery]);

    const deliveryOptions = useMemo(() => {
        if (cities.includes(city)) {
            return [{
                value: 'курьер',
                labelTitle: 'Курьер',
                labelFooter: `${cities.includes(city) ? 100 : 400} руб`,
                labelBody: 'Служба доставки'
            },
            {
                value: 'cамовывоз',
                labelTitle: 'Самовывоз',
                labelFooter: 'Бесплатно',
                labelBody: 'Пункты выдачи'
            }];
        } else {
            return [{
                value: 'курьер',
                labelTitle: 'Курьер',
                labelFooter: `${cities.includes(city) ? 100 : 400} руб`,
                labelBody: 'Служба доставки'
            }];
        }
    }, [city, cities]);

    const paymentOprions = useMemo(() => (
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

    const {
        orderNumber,
        error,
        setError,
        submitHandler } = useOrderSubmit(reset, deliveryPrice);

    if (orderNumber) {
        return (<SuccessMessage order={orderNumber} isAuthorized={userState.isLoggedIn} />);
    }

    return (
        <Container className={styles.order}>
            <Title tag='h1'
                className={styles.orderTitle}>Оформление заказа</Title>
            <div className={styles.orderRegistration}>

                <form onSubmit={(handleSubmit((data, e) => submitHandler(data, e)))}>

                    <Dropdown
                        inititialOpen
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
                            <div
                                className={styles.orderStepSectionFields}>
                                <Controller
                                    name='delivery'
                                    control={control}
                                    rules={{ required: 'Обязательно для заполнения' }}
                                    render={({ field: { ref, onChange, value } }) => (
                                        <RadioBadge
                                            error={errors.delivery}
                                            name='delivery'
                                            ref={ref}
                                            value={value}
                                            onChange={(value: Delivery) => {
                                                onChange(value);
                                                setDelivery(value);
                                            }}
                                            options={deliveryOptions}
                                        />)}
                                />
                                {!cities.includes(city) &&
                                    <div className={styles.orderDisclaimer}>
                                        *самовывоз недоступен в вашем регионе
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>Адрес</Title>
                            <div className={styles.orderStepSectionFields}>
                                <div className={styles.orderAddress}>
                                    {getValues('address') || 'Не выбран'}
                                </div>
                                <Button
                                    type='button'
                                    styleType='ghost'
                                    onClick={() => setModalAddressShown(true)}
                                >Изменить адрес
                                </Button>
                            </div>
                        </div>
                    </Dropdown>

                    <Dropdown
                        inititialOpen
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
                                    isWide />
                                <Input {...register('name', {
                                    required: 'Обязательно для заполнения', maxLength: 20,
                                    validate: isEmptySpaces
                                })}
                                    error={errors.name}
                                    placeholder='Имя'
                                    isWide />
                                <Input {...register('middleName', {
                                    required: 'Обязательно для заполнения', maxLength: 20,
                                    validate: isEmptySpaces
                                })}
                                    error={errors.middleName}
                                    placeholder='Отчество'
                                    isWide />
                            </div>
                        </div>

                        <div className={styles.orderStepSection}>
                            <Title tag='h3'>Контакты</Title>
                            <div
                                className={cn(styles.orderStepSectionFields, styles.personalData)}>
                                <Controller
                                    name='phone'
                                    control={control}
                                    rules={{ required: 'Обязательно для заполнения' }}
                                    render={({ field: { ref, onChange } }) => (
                                        <InputTel
                                            placeholder='(XXX) XXX-XX-XX'
                                            code='+7 '
                                            error={errors.phone}
                                            isWide
                                            ref={ref}
                                            onChange={onChange}
                                        />)}
                                />
                                <Input {...register('email', {
                                    required: 'Обязательно для заполнения',
                                    validate: isEmptySpaces
                                })}
                                    type='email'
                                    error={errors.email}
                                    placeholder='Ваша почта'
                                    isWide />
                                <Controller
                                    name='privacy'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { ref, onChange, value } }) => (
                                        <CustomCheckbox
                                            error={errors.privacy}
                                            label={<PrivacyLabel />}
                                            ref={ref}
                                            onChange={onChange}
                                            value={value}
                                        />)}
                                />
                            </div>
                        </div>
                    </Dropdown>

                    <Dropdown
                        inititialOpen
                        className={styles.orderStep}
                        header={<StepHeader step='3/3' title='Оплата' />}>
                        <p><b>Бесконтактная доставка действует для всех заказов, оплаченных онлайн</b></p>
                        <Controller
                            name='payment'
                            control={control}
                            rules={{ required: 'Обязательно для заполнения' }}
                            render={({ field: { ref, onChange, value } }) => (
                                <RadioBadge
                                    error={errors.delivery}
                                    name='delivery'
                                    ref={ref}
                                    value={value}
                                    onChange={onChange}
                                    options={paymentOprions}
                                />)}
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
                deliveryPrice={deliveryPrice}
                className={styles.orderPreview} />
            <AnimatePresence>
                {error &&
                    <AlertMessage
                        type='warning'
                        message={error}
                        onClose={() => setError('')} />
                }
            </AnimatePresence>

            <Modal
                shown={modalCityShown}
                onClose={() => setModalCityShown(false)}>
                <CityPicker
                    uid='city-picker'
                    defaultCity={city}
                    onSelect={() => setModalCityShown(false)} />
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