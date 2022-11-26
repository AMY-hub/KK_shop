import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ADDRESS } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Container } from '../components';
import { useBasketContext } from '../context/AppContext';
import { Address } from '../interfaces';
import { OrderPage } from '../pageComponents/OrderPage';

interface PageProps {
    cities: string[];
    addresses: Address[];
}

const Order = ({ cities, addresses }: PageProps) => {

    const basket = useBasketContext().getBasket();

    return (
        <>
            <Head>
                <title>Оформление заказа</title>
            </Head>
            {basket.length === 0 ?
                <Container>
                    Добавьте товары в корзину, чтобы оформить заказ.
                </Container>
                :
                <OrderPage cities={cities} addresses={addresses} />
            }
        </>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const { data } = await API.get<Address[]>(ADDRESS);

    return {
        props: {
            cities: data.map(el => el.city),
            addresses: data
        }
    };
};

export default Order;