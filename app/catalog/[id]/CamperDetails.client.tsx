"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleCamper } from "@/lib/api";
import Loading from "@/app/loading";
import ErrorMessage from "@/app/error";

const CamperDetailsClient = () => {
  const params = useParams();

  let id = params?.id;

  if (Array.isArray(id)) id = id[0];

  const {
    data: camper,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["camper", id],
    queryFn: () => {
      if (!id) throw new Error("Invalid id");
      return getSingleCamper(id);
    },
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  if (error || !camper)
    return (
      <ErrorMessage
        error={error || new Error("Camper not found")}
        reset={refetch}
      />
    );

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
