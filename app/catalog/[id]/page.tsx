import { getSingleCamper } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

const CamperDetails = async ({ params }: Props) => {
  const { id } = await params;
  const camper = await getSingleCamper(id);

  return (
    <div>
      <h2>{camper.name}</h2>
      <p>{camper.rating}</p>
      <p>{camper.location}</p>
      <p>{camper.price}</p>
      <p>{camper.description}</p>
           <p>{camper.description}</p>
    </div>
  );
};

export default CamperDetails;
