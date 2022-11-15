import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { Container, Title } from '../components';
import { BasketPage } from '../pageComponents/ProfilePages/BasketPage';

const Basket = () => {
    return (
        <>
            <Head>
                <title>Корзина</title>
            </Head>
            <Container style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Title tag='h1'>Моя корзина</Title>
                <BasketPage />
            </Container>
        </>
    );
};

export default observer(Basket);