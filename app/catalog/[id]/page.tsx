import { getSingleCamper } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CamperDetailsClient from "./CamperDetails.client";
import { Suspense } from "react";

type Props = {
  params: { id: string };
};

const CamperDetails = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getSingleCamper(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <CamperDetailsClient />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CamperDetails;
