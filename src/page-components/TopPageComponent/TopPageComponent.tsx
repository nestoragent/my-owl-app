import { TopPageComponentProps } from '@/page-components/TopPageComponent/TopPageComponent.props';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '@/components';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { SortEnum } from '@/components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from '@/page-components/TopPageComponent/sort.reducer';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
  // const [{ products: sortedProducts }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
  const [sortState, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.title }>
        <Htag tag="h1">{ page.title }</Htag>
        <Tag color="grey" size="m">{ products && products.length }</Tag>
        <Sort sort={ sortState.sort } setSort={ setSort }/>
      </div>

      <div>
        { products && products.map((product) => (<Product layout key={ product._id } product={ product }/>)) }
      </div>

      <div className={ styles.hhTitle }>
        <Htag tag="h2">Vacancy - { page.category }</Htag>
        <Tag color="red" size="m">hh.ru</Tag>
      </div>
      { firstCategory == TopLevelCategory.Courses && page.hh && <HhData { ...page.hh }/> }

      { page.advantages && page.advantages.length > 0 && (<>
        <Htag tag="h2">Advantages</Htag>
        <Advantages advantages={ page.advantages }/>
      </>) }

      { page.seoText && <div className={ styles.seo } dangerouslySetInnerHTML={ { __html: page.seoText } }/> }

      <Htag tag="h2">Received skills</Htag>
      { page.tags.map((tag) => <Tag key={ tag } color="primary">{ tag }</Tag>) }
    </div>
  );
};