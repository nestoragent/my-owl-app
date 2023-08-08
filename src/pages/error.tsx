export default function Error({ error }: { error: Error }) {
  return <>
    <div>Something happened</div>
    <div>{ JSON.stringify(error) }</div>
  </>;
}