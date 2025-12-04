// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { getSingleCamper } from "@/lib/api";

// const CamperDetailsClient = () => {
//   const params = useParams();
//   const { id } = useParams;

//   const {
//     data: camper,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["camper", id],
//     queryFn: () => {
//       if (!id || Array.isArray(id)) throw new Error("Invalid id");

//       return getSingleCamper(id);
//     },
//     enabled: !!id,
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading...</p>;

//   if (error || !camper) return <p>Some error..</p>;

//   return (
//     <div>
//       <h2>{camper.name}</h2>
//       <p>{camper.rating}</p>
//       <p>{camper.location}</p>
//       <p>{camper.price}</p>
//       <p>{camper.description}</p>
//       <p>{camper.description}</p>
//     </div>
//   );
// };

// export default CamperDetailsClient;

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleCamper } from "@/lib/api";

const CamperDetailsClient = () => {
  const { id } = useParams(); // вызов функции useParams()

  // если id массив — берем первый элемент
  const safeId = Array.isArray(id) ? id[0] : id;

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camper", safeId],
    queryFn: () => {
      if (!safeId) throw new Error("Invalid id");
      return getSingleCamper(safeId);
    },
    enabled: !!safeId,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !camper) return <p>Some error..</p>;

  return (
    <div>
      <h2>{camper.name}</h2>
      <p>{camper.rating}</p>
      <p>{camper.location}</p>
      <p>{camper.price}</p>
      <p>{camper.description}</p>
    </div>
  );
};

export default CamperDetailsClient;
