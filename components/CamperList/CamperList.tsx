import { Camper } from "@/lib/api";
import CamperItem from "../CamperItem/CamperItem";
import Container from "../Container/Container";
import css from "./CamperList.module.css";

type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
  return (
    <Container>
      <ul className={css.camperList}>
        {campers.map((camper) => (
          <CamperItem key={camper.id} item={camper} />
        ))}
      </ul>
    </Container>
  );
};

export default CamperList;
