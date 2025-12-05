"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getSingleCamper, Camper } from "@/lib/api";
import Loading from "@/app/loading";
import ErrorMessage from "@/app/error";
import BookingForm from "@/components/BookingForm/BookingForm";

const CamperDetailsClient = () => {
  const params = useParams();

  let id = params?.id;
  if (Array.isArray(id)) id = id[0];

  const {
    data: camper,
    isLoading,
    error,
    refetch,
  } = useQuery<Camper>({
    queryKey: ["camper", id],
    queryFn: () => {
      if (!id) throw new Error("Invalid id");
      return getSingleCamper(id);
    },
    enabled: !!id,
    refetchOnMount: false,
  });

  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );

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
      <p>Rating: {camper.rating}</p>
      <p>Location: {camper.location}</p>
      <p>Price: {camper.price}</p>
      <p>{camper.description}</p>

      <div className="gallery">
        {camper.gallery?.map((img, idx) => (
          <div key={idx}>
            <Image
              src={img.thumb}
              alt={`${camper.name} photo ${idx + 1}`}
              width={200}
              height={140}
            />
          </div>
        ))}
      </div>

      <div className="tabs">
        <button
          onClick={() => setActiveTab("features")}
          disabled={activeTab === "features"}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          disabled={activeTab === "reviews"}
        >
          Reviews
        </button>
      </div>

      {activeTab === "features" && (
        <div className="features">
          <h3>Technical Specs</h3>
          <ul>
            {camper.transmission && (
              <li>Transmission: {camper.transmission}</li>
            )}
            {camper.engine && <li>Engine: {camper.engine}</li>}
            {camper.AC && <li>AC: Yes</li>}
            {camper.bathroom && <li>Bathroom: Yes</li>}
            {camper.kitchen && <li>Kitchen: Yes</li>}
            {camper.TV && <li>TV: Yes</li>}
            {camper.radio && <li>Radio: Yes</li>}
            {camper.refrigerator && <li>Refrigerator: Yes</li>}
            {camper.microwave && <li>Microwave: Yes</li>}
            {camper.gas && <li>Gas: Yes</li>}
            {camper.water && <li>Water: Yes</li>}
          </ul>

          <h3>Dimensions</h3>
          <ul>
            {camper.form && <li>Form: {camper.form}</li>}
            {camper.length && <li>Length: {camper.length}</li>}
            {camper.width && <li>Width: {camper.width}</li>}
            {camper.height && <li>Height: {camper.height}</li>}
            {camper.tank && <li>Tank: {camper.tank}</li>}
            {camper.consumption && <li>Consumption: {camper.consumption}</li>}
          </ul>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="reviews">
          {camper.reviews && camper.reviews.length > 0 ? (
            camper.reviews.map((review, idx) => (
              <div key={idx}>
                <strong>{review.reviewer_name}</strong> (
                {review.reviewer_rating}/5)
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
      <BookingForm camper={camper} />
    </div>
  );
};

export default CamperDetailsClient;
