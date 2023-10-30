import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Button, Input, Rating, Textarea } from '@/components';
import CloseIcon from './Close.svg';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios, { AxiosError } from 'axios';
import { API } from '@/helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    console.log(formData);
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo,
        { ...formData, productId });
      console.log(`data response: ${ JSON.stringify(data) }`);
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Something happened wrong');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setIsError(e.message);
      } else {
        setIsError('Error in catch');
      }
      console.log(`e: ${ JSON.stringify(e) }`);
    }
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className={ cn(styles.reviewForm, className) }
           { ...props }
      >
        <Input
          { ...register('name', { required: { value: true, message: 'Fill name' } }) }
          placeholder="Name"
          error={ errors.name }
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          { ...register('title', { required: { value: true, message: 'Fill title' } }) }
          placeholder="Review subject"
          className={ styles.title }
          error={ errors.title }
          tabIndex={isOpened ? 0 : -1}
        />

        <div className={ styles.rating }>
          <span>Rating: </span>
          <Controller
            rules={ { required: { value: true, message: 'Select rating' } } }
            control={ control }
            render={ ({ field }) => (
              <Rating
                isEditable
                rating={ field.value }
                ref={ field.ref }
                setRating={ field.onChange }
                error={ errors.rating }
                tabIndex={isOpened ? 0 : -1}
              />
            ) }
            name="rating"/>

        </div>
        <Textarea
          { ...register('description', { required: { value: true, message: 'Fill description' } }) }
          placeholder="Review text"
          className={ styles.description }
          error={ errors.description }
          tabIndex={isOpened ? 0 : -1}
        />

        <div className={ styles.submit }>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>Send</Button>
          <span className={ styles.info }>* Before publication, the review will be pre-moderated and checked</span>
        </div>
      </div>
      { isSuccess && <div className={ cn(styles.success, styles.panel) }>
        <div className={ styles.successTitle }>Your review has been sent</div>
        <div>Thank you, your review will be published after check</div>
        <button
            onClick={() => setIsSuccess(false)}
            className={ styles.close }
            aria-label='Close notification'
        >
          <CloseIcon />
        </button>
      </div> }
      { isError && <div className={ cn(styles.error, styles.panel) }>
        Something went wrong, refresh the page
        <button
            onClick={() => setIsError(undefined)}
            className={ styles.close }
            aria-label='Close notification'
        >
        <CloseIcon />
        </button>
      </div> }
    </form>
  );
};