import { Button, Htag, Input, P, Rating, Tag, Textarea } from '@/components';
import { useState } from 'react';
import { withLayout } from '@/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { API } from '@/helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [rating, setRating] = useState<number>(4);

  // useEffect(() => {
  //   console.log('Counter: ' + counter);
  //   return function cleanup() {
  //     console.log('Unmount!!!');
  //   };
  // }, );
  //
  // useEffect(() => {
  //   console.log('Mounted');
  // }, []);

  return (
    <>
      <Htag tag="h1">
        Counter: { counter }
      </Htag>
      <Button appearance="primary" className="testrsdfdslfms" arrow="right"
              onClick={ () => setCounter(() => counter + 1) }>
        Primary
      </Button>
      <Button appearance="ghost" arrow="down">
        Ghost
      </Button>
      <P size="small">Tests small</P>
      <P>Tests medium</P>
      <P size="large">Tests large</P>
      <Tag size="s">Tests tag small ghost</Tag>
      <Tag size="m" color="red">Tests tag medium red</Tag>
      <Tag size="s" color="green">Tests tag medium green</Tag>
      <Tag color="primary">Tests tag s primary</Tag>
      <Rating rating={ rating } setRating={ setRating } isEditable={ true }/>
      <Input placeholder="Tests text"/>
      <Textarea placeholder="Tests text"/>
    </>
  );
}

// async function getMenu(firstCategory: number) {
//   const response = await fetch((API.));
// }

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}