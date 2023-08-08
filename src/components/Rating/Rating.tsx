import { RatingProps } from './Rating.props';
import { KeyboardEvent, useEffect, useState } from 'react';
import StartIcon from './star.svg';
import cn from 'classnames';
import styles from './Rating.module.css';

export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const changeDisplay = (index: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(index);
  };

  const onClick = (index: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(index);
  };

  const handeSpace = (index: number, event: KeyboardEvent<SVGElement>) => {
    if (event.code != 'Space' || !setRating) {
      return;
    }
    setRating(index);
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((element: JSX.Element, index: number) => {
      return (
        <span
          className={ cn(styles.star, {
            [styles.filled]: index < currentRating,
            [styles.editable]: isEditable
          }) }
          onMouseEnter={ () => changeDisplay(index + 1) }
          onMouseLeave={ () => changeDisplay(rating) }
          onClick={ () => onClick(index + 1) }
        >
          <StartIcon
            tabIndex={ isEditable ? 0 : -1 }
            onKeyDown={ (event: KeyboardEvent<SVGElement>) => isEditable && handeSpace(index + 1, event) }
          />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  return (
    <div { ...props }>
      { ratingArray.map((element, index) => (<span key={ index }>{ element }</span>)) }
    </div>
  );
};