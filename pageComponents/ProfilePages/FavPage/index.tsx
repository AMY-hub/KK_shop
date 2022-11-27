import { observer } from 'mobx-react-lite';
import { Title, FavProductCard } from '../../../components';
import { useFavContext } from '../../../context/AppContext';

export const FavPage = observer((): JSX.Element => {

    const favList = useFavContext().favList;

    return (
        <div>
            {favList.length === 0 ?
                <Title tag='h2'>В листе пожеланий пусто.</Title>
                :
                favList.map(el => (
                    <FavProductCard
                        key={el.id}
                        productData={el.product} />
                ))
            }
        </div>
    );
});
