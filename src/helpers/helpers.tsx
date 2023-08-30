import { FirstLevelMenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/page.interface';
import CoursesIcon from './icons/cources.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Courses', icon: <CoursesIcon/>, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Services', icon: <ServicesIcon/>, id: TopLevelCategory.Books },
  { route: 'books', name: 'Books', icon: <BooksIcon/>, id: TopLevelCategory.Books },
  { route: 'products', name: 'Products', icon: <ProductsIcon/>, id: TopLevelCategory.Products }
];

export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' $');

export const declOfNum = (number: number, titles: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)]];
};