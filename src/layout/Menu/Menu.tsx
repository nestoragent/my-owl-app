import { KeyboardEvent, useContext } from 'react';
import { AppContext } from '@/context/app.context';
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '@/helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29
    },
    hidden: {
      opacity: 1,
      height: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((m) => {
      if (m._id.secondCategory == secondCategory) {
        m.isOpened = !m.isOpened;
      }

      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      openSecondLevel(secondCategory);
      key.preventDefault();
    }
  };

  const buildFirstLevel = () => {
    return (
      <>
        { firstLevelMenu.map((menuCurrent) => (
          <div key={ menuCurrent.id }>
            <Link href={ `/${ menuCurrent.route }` }>
              <div className={ cn(styles.firstLevel, {
                [styles.firstLevelActive]: menuCurrent.id == firstCategory
              }) }>
                { menuCurrent.icon }
                <span>{ menuCurrent.name }</span>
              </div>
            </Link>
            { menuCurrent.id == firstCategory && buildSecondLevel(menuCurrent) }
          </div>
        )) }
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={ styles.secondBlock }>
        { menu.map((m) => {
          if (m.pages.map((page) => page.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <div key={ m._id.secondCategory }>
              <div tabIndex={ 0 }
                   className={ styles.secondLevel }
                   onClick={ () => openSecondLevel(m._id.secondCategory) }
                   onKeyDown={ (key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory) }
              >
                { m._id.secondCategory }
              </div>
              <motion.div
                layout
                variants={ variants }
                initial={ m.isOpened ? 'visible' : 'hidden' }
                animate={ m.isOpened ? 'visible' : 'hidden' }
                className={ cn(styles.secondLevelBlock) }
              >
                { buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false) }
              </motion.div>
            </div>
          );
        }) }
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map((page) => (
        <motion.div variants={ variantsChildren } key={ page._id }>
          <Link tabIndex={ isOpened ? 0 : -1 } href={ `/${ route }/${ page.alias }` }
                className={ cn(styles.thirdLevel, {
                  [styles.thirdLevelActive]: `/${ route }/${ page.alias }` == router.asPath
                }) }>
            { page.category }
          </Link>
        </motion.div>
      ))
    );
  };

  return (
    <div className={ styles.menu }>
      { buildFirstLevel() }
    </div>
  );
};