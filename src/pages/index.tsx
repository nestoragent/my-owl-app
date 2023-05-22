import { Button, Htag, P } from '@/components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>
        Text
      </Htag>
      <Button appearance='primary' className="testrsdfdslfms" arrow="right">
        Primary
      </Button>
      <Button appearance='ghost' arrow="down">
        Ghost
      </Button>
      <P size='small'>Tests small</P>
      <P>Tests medium</P>
      <P size='large'>Tests large</P>
    </>
  );
}
