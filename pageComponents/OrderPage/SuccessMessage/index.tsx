import Link from 'next/link';
import { useEffect } from 'react';
import { Button, Container, Paragraph, Title } from '../../../components';
import { SuccessMessageProps } from './props';

import styles from './style.module.scss';

export const SuccessMessage = ({ order, isAuthorized }: SuccessMessageProps): JSX.Element => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container className={styles.order}>
            <Title tag='h1'>Ваш заказ успешно оформлен!</Title>
            <div className={styles.orderNum}>
                Номер заказа: <span> {order}</span>
            </div>
            <Paragraph>
                Вы получите СМС о прибытии заказа на номер, указанный при оформлении. В случае курьерской доставки курьер свяжется с вами по указанному номеру для согласования времени доставки.
            </Paragraph>
            {isAuthorized ?
                <Paragraph>
                    Вы можете отслеживать статус вашего заказа в
                    <Link href='/profile/orders'><a> Личном кабинете</a></Link>.
                </Paragraph>
                :
                <Paragraph>
                    <Link href='/login'><a> Зарегистрируйтесь</a></Link>,
                    чтобы иметь возможность отслеживать статус своих заказов и получать бонусы с каждого заказа.
                </Paragraph>}
            <Button
                like='Link'
                href='/products'
            >Вернуться в каталог</Button>
        </Container>
    );
};