import { RatingProps } from './Rating.props';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import StartIcon from './star.svg';
import cn from 'classnames';
import styles from './Rating.module.css';

export const Rating = forwardRef(({
                                    isEditable = false,
                                    rating,
                                    setRating,
                                    error,
                                    tabIndex,
                                    ...props
                                  }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

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

  const handeKey = (event: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (event.code === 'ArrowRight' || event.code === 'ArrowUp') {
      if (!rating) {
        setRating(1);
      } else {
        event.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingArrayRef.current[rating]?.focus();
    }
    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
      event.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
  };

  const computeFocus = (rating: number, index: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating  && index == 0) {
      return tabIndex ?? 0;
    }
    if (rating == index + 1) {
      return tabIndex ?? 0;
    }
    return -1;
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
          tabIndex={ computeFocus(rating, index) }
          onKeyDown={ handeKey }
          ref={ (ref) => ratingArrayRef.current?.push(ref) }
        >
          <StartIcon/>
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  return (
    <div ref={ ref } { ...props } className={ cn(styles.ratingWrapper, {
      [styles.error]: error
    }) }>
      { ratingArray.map((element, index) => (<span key={ index }>{ element }</span>)) }
      { error && <span className={ styles.errorMessage }> { error.message }</span> }
    </div>
  );
});