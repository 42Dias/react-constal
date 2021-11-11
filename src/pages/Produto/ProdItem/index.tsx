interface RepositoryItemProps {
  repository: {
    id: string,
    name: string,
    title: string,
    price: string,
    image: string
  }
}

export function RepositoryItem(props: RepositoryItemProps) {
  return (
    <>
      <strong>{props.repository.name}</strong>
      <br />
      <strong>{props.repository.title}</strong>
      <strong>{props.repository.price}</strong>
      <img src={props.repository.image} alt="" />
    </>
  );
}
