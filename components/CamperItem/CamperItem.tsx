import { Camper } from "@/lib/api";
import Link from "next/link";

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
      <Link href={`/catalog/${item.id}`}>Show more</Link>
    </li>
  );
};

export default CamperItem;
