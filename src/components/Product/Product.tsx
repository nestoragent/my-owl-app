import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Button, Card, Divider, Rating, Review, Tag } from '@/components';
import { declOfNum, priceRu } from '@/helpers/helpers';
import Image from 'next/image';
import cn from 'classnames';
import { useState } from 'react';

export const Product = ({ product, children, ...props }: ProductProps): JSX.Element => {

  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
    <>
      <Card className={ styles.product }>
        <div className={ styles.logo }>
          <Image
            src={ process.env.NEXT_PUBLIC_DOMAIN + product.image }
            alt={ product.title }
            width={ 70 }
            height={ 70 }
          />
          {/*<img src={ process.env.NEXT_PUBLIC_DOMAIN + product.image } alt={ product.title }/>*/ }
        </div>
        <div className={ styles.title }>{ product.title }</div>
        <div className={ styles.price }>
          { priceRu(product.price) }
          { product.oldPrice &&
            <Tag className={ styles.oldPrice } color="green">{ priceRu(product.price - product.oldPrice) }</Tag> }
        </div>
        <div className={ styles.credit }>
          { priceRu(product.credit) }/<span className={ styles.month }>mon</span>
        </div>
        <div className={ styles.rating }><Rating rating={ product.reviewAvg ?? product.initialRating }/></div>
        <div className={ styles.tags }>{ product.categories.map((category) => (
          <Tag color="ghost" className={ styles.category } key={ category }>{ category }</Tag>)) }</div>
        <div className={ styles.priceTitle }>Price</div>
        <div className={ styles.creditTitle }>Credit</div>
        <div
          className={ styles.rateTitle }>{ product.reviewCount } { declOfNum(product.reviewCount, ['review', 'reviews', 'reviews']) }</div>

        <Divider className={ styles.hr }/>

        <div className={ styles.description }>{ product.description }</div>
        <div className={ styles.feature }>
          { product.characteristics.map((characteristic) => (
            <div className={ styles.characteristics } key={ characteristic.name }>
              <span className={ styles.characteristicsName }>{ characteristic.name }</span>
              <span className={ styles.characteristicsDots }></span>
              <span className={ styles.characteristicsValue }>{ characteristic.value }</span>
            </div>
          )) }
        </div>
        <div className={ styles.advBlock }>
          { product.advantages && <div className={ styles.advantages }>
            <div className={ styles.advTitle }>Advantages</div>
            <div>{ product.advantages }</div>
          </div>
          }
          { product.disadvantages && <div className={ styles.disadvantages }>
            <div className={ styles.advTitle }>Disadvantages</div>
            <div>{ product.disadvantages }</div>
          </div>
          }
        </div>

        <Divider className={ cn(styles.hr, styles.hr2) }/>

        <div className={ styles.actions }>
          <Button appearance="primary">More details</Button>
          <Button
            onClick={ () => setIsReviewOpened(!isReviewOpened) }
            appearance="ghost"
            arrow={isReviewOpened ? 'down' : 'right'}
            className={ styles.reviewButton }>
            Read reviews
          </Button>
        </div>

      </Card>
      <Card color="blue" className={ cn(styles.reviews, {
        [styles.opened]: isReviewOpened,
        [styles.closed]: !isReviewOpened
      }) }>
        {product.reviews.map((review) => (<Review key={review._id} review={review}/>))}
      </Card>
    </>
  );
};