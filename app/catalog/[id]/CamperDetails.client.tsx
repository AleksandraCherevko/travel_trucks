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
  const params = useParams(); // вызов функции useParams()

  let id = params?.id;

  // Если id — массив, берем первый элемент
  if (Array.isArray(id)) id = id[0];

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camper", id],
    queryFn: () => {
      if (!id) throw new Error("Invalid id");
      return getSingleCamper(id);
    },
    enabled: !!id,
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
