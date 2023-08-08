import { useRouter } from 'next/router';
import { notFound } from 'next/navigation';
import type { InferGetServerSidePropsType } from 'next';


type Id = {
  id: number
};

export const getServerSideProps: () => Promise<{ props: { id: number } }> = async () => {
  // let ids: Array<number>;

  await new Promise((res) => setTimeout(() => {
    res('');
  }, 3000));
  const ids: [number] = [1];
  for (let i = 1; i < 21; i++) {
    ids.push(i);
  }

  console.log('worked getServerSideProps');
  // return ids.map((id: number) => ({ id: id }));
  return { props: { id: 20 } };
};

export default function PageProduct({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  if (router.query.id === '1') {
    return notFound();
  }
  return (<div>
    Page product id: { router.query.id } \n
    Page props id: { id }
  </div>);
}
