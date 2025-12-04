"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleCamper } from "@/lib/api";

const CamperDetailsClient = () => {
  const params = useParams();
  const id = params?.id;

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camper", id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("No id"));
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
      <p>{camper.description}</p>
    </div>
  );
};

export default CamperDetailsClient;
