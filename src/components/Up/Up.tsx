import styles from './Up.module.css';
import Image from 'next/image';
import { useScrollY } from '@/hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Button, ButtonIcon } from '@/components';

export const Up = (): JSX.Element => {

  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className={ styles.up }
      animate={ controls }
      initial={{opacity: 0}}
    >
      {/*<Image className={ styles.up } src="/up.svg" alt="Button Up" width="40" height="40"/>*/}
      {/*<UpIcon />*/ }
      <ButtonIcon appearance='white' icon='menu' onClick={ scrollToTop }/>
    </motion.div>
  );
};