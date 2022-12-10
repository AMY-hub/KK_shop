import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Title, MFavProductCard } from '../../../components';
import { useFavContext } from '../../../context/AppContext';

export const FavPage = observer((): JSX.Element => {

    const favList = useFavContext().favList;

    const animationConfig = {
        initial: { opacity: 0, x: -500 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -500 },
        transition: { bounce: 0 },
    };

    return (
        <div>
            <AnimatePresence initial={false}>
                {favList.length === 0 ?
                    <Title tag='h2'>В листе пожеланий пусто.</Title>
                    :
                    favList.map(el => (
                        <MFavProductCard
                            {...animationConfig}
                            key={el.id}
                            productId={el.product.id}
                            name={el.product.name}
                            name_rus={el.product.name_rus}
                            img={el.product.img}
                            price={el.product.price}
                            discount={el.product.brand.special_sale?.discount}
                        />
                    ))
                }
            </AnimatePresence>
        </div>
    );
});
