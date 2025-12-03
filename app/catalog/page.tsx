import { getCampers } from "@/lib/api";
import CamperList from "@/components/CamperList/CamperList";

const Campers = async () => {
  const response = await getCampers();
  return (
    <section>
      {response?.items?.length > 0 && <CamperList campers={response.items} />}
    </section>
  );
};

export default Campers;
