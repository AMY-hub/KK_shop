import { CertificateCard, Grid } from '../../components';
import { BreadCrumbs, Container, Paragraph, Title } from '../../components';
import { CertificatesPageProps } from './props';

import styles from './style.module.scss';

export const CertificatesPage = ({ certificates }: CertificatesPageProps): JSX.Element => {
    return (
        <Container>
            <BreadCrumbs />
            <Title tag='h1'>Сертификаты</Title>
            <div className={styles.info}>
                <Paragraph fontSize='l'>
                    Выбор подарка зачастую оказывается очень сложной задачей, ведь все мы индивидуальны, а порадовать любимых всегда хочется чем-то особенным, что запомнится надолго и будет ежедневно дарить радость от использования.<br />
                    В этой ситуации оптимальным решением может стать подарочный сертификат нашего магазина. Приобретая наши подарочные сертификаты вы дарите выбор! Наши консультанты профессионально подберут для ваших близких самые нужные и подходящие средства, которые дадут ощущение собственной красоты, уникальности и неповторимости. С корейской косметикой Вы дарите больше чем подарок - Вы дарите ощущения!
                </Paragraph>
                <Paragraph fontSize='l'>
                    На покупку подарочных сертификатов не действуют карты постоянного клиента (но если у вас есть карта, вы можете получить скидку по ней при обналичивании сертификата).
                </Paragraph>
                <Paragraph fontSize='l'>
                    Срок действия подарочного сертификата - год с момента приобретения (дата будет указана на сертификате).
                </Paragraph>
                <Paragraph fontSize='l'>
                    В наличии имеются сертификаты номиналом 500, 1000, 2000, 3000, 5000, 7000 и 10000 рублей.
                </Paragraph>
                <Paragraph fontSize='l'>
                    Если вы хотели бы заказать индивидуальные подарочные сертификаты с вашим дизайном или сертификаты другого номинала, мы с удовольствием предложим вам такую услугу. Возможность изготовления, сроки и стоимость рассчитываются индивидуально по запросу на электронную почту
                    <a href='mailto:Sale@kkshop.ru'> Sale@kkshop.ru</a>
                </Paragraph>
            </div>
            <Grid>
                {certificates &&
                    certificates.map(el => (
                        <CertificateCard
                            key={el.name}
                            name={el.name}
                            price={el.price}
                            img={el.img}
                        />
                    ))}
            </Grid>
        </Container>
    );
};


