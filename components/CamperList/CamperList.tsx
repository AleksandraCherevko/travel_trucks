import { Camper } from "@/lib/api";
import CamperItem from "../CamperItem/CamperItem";

type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
  return (
    <ul>
      {campers.map((camper) => (
        <CamperItem key={camper.id} item={camper} />
      ))}
    </ul>
  );
};

export default CamperList;
