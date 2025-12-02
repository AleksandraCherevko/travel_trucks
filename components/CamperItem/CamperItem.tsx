import { Camper } from "@/lib/api";

type Props = {
  item: Camper;
};

const CamperItem = ({ item }: Props) => {
  return (
    <li>
      <p>{item.name}</p>
      <p>{item.price}</p>
      <p>{item.rating}</p>
      <p>{item.reviews.length}</p>
      <p>{item.location}</p>
      <p>{item.description}</p>
      <button>Show more</button>
    </li>
  );
};

export default CamperItem;
