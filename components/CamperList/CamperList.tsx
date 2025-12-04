import { Camper } from "@/lib/api";
import CamperItem from "../CamperItem/CamperItem";
import css from "./CamperList.module.css";

type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
  return (
    <ul className={css.camperList}>
      {campers.map((camper) => (
        <CamperItem key={camper.id} item={camper} />
      ))}
    </ul>
  );
};

export default CamperList;
