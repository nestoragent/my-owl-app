import { PProps } from './P.props';
import cn from 'classnames';
import styles from './P.module.css';

export const P = ({ size = 'medium', children, ...props }: PProps): JSX.Element => {
  return (
    <p
      className={ cn(styles.p, {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large'
      }) }
      { ...props }>
      { children }
    </p>
  );
};