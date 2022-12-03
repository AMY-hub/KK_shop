import { BreadCrumbs, Container, InfoBadge, Scroll, Title } from '../../components';
import { useMemo, useRef, useState } from 'react';
import { AddressMap } from './AddressMap';
import { Placemark } from '@pbe/react-yandex-maps';
import { formatPhoneNumber } from '../../helpers/formatPhoneNumber';
import { ContactsPageProps } from './props';

import styles from './style.module.scss';

export const ContactsPage = ({ addresses }: ContactsPageProps): JSX.Element => {

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState<[number, number]>([55.75, 37.57]);
    const [zoom, setZoom] = useState<number>(10);
    const mapState = useMemo(
        () => ({ center: coords, zoom }),
        [coords, zoom]
    );

    const cartMarks = addresses.map(p => (
        <Placemark
            key={p.id}
            geometry={[+p.coord[0], +p.coord[1]]}
            properties={{
                balloonContent: `${p.type === 'shop' ?
                    'Магазин' : 'Пункт выдачи'}<br>${p.address}<br>${formatPhoneNumber(p.phone)}`
            }} />
    ));

    const handleMapNav = (coords: [number, number]) => {
        setCoords(coords);
        setZoom(13);
        if (mapContainerRef.current) {
            mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    return (
        <Container>
            <BreadCrumbs />
            <Title tag='h1'>Контакты</Title>
            <div className={styles.contacts}>
                <Scroll >
                    <div className={styles.pointsList}>
                        {addresses &&
                            addresses.map(p => (
                                <InfoBadge
                                    key={p.id}
                                    className={styles.point}
                                    styleType='gray'>
                                    <span className={styles.pointType}>
                                        {p.type === 'shop' ? 'Магазин' : 'Пункт выдачи'}
                                    </span>
                                    <div className={styles.pointAddress}>
                                        {p.address}
                                    </div>
                                    <a
                                        href={`mailto:${p.email}`}
                                        className={styles.pointMail}>
                                        {p.email}
                                    </a>
                                    <a
                                        href={`tel:${p.phone}`}
                                        className={styles.pointPhone}>
                                        {formatPhoneNumber(p.phone)}
                                    </a>
                                    <button
                                        onClick={() => handleMapNav([+p.coord[0], +p.coord[1]])}
                                        className={styles.pointBtn}>
                                        Показать на карте
                                    </button>
                                </InfoBadge>
                            ))}
                    </div>
                </Scroll>
                <div
                    className={styles.contactsMapWrapper}
                    ref={mapContainerRef}>
                    <AddressMap
                        state={mapState}
                        placeMarks={cartMarks}
                        className={styles.contactsMap} />
                </div>
            </div>
            <div className={styles.disclaimer}>
                *Если ваш населенный пункт отсутствут в списке, вы можете заказать курьерскую доставку по тарифу в соотсетствии с вашим регионом.
            </div>
        </Container>
    );
};
