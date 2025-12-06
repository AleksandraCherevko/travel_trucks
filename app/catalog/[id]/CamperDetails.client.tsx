"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getSingleCamper, Camper } from "@/lib/api";
import Loading from "@/app/loading";
import ErrorMessage from "@/app/error";
import BookingForm from "@/components/BookingForm/BookingForm";
import Container from "@/components/Container/Container";
import css from "./CamperDetails.module.css";

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
    <Container>
      <div className={css.camperDetailContainer}>
        <h2 className={css.camperDetailTitle}>{camper.name}</h2>
        <div className={css.camperDetailReviewsContainer}>
          <div className={css.camperDetailsRatingWrapper}>
            <svg width="16" height="16" className={css.ratingIcon}>
              <use href="/symbol-defs.svg#icon-Property-1Pressed-1"></use>
            </svg>
            <p className={css.camperDetailsRating}>{camper.rating}</p>
            <p className={css.camperDetailsListReview}>
              ({camper.reviews?.length ?? 0}
              {camper.reviews?.length === 1 ? " Review" : " Reviews"})
            </p>
          </div>
          <div className={css.camperDetailsLocationWrapper}>
            <svg width="16" height="16" className={css.ratingIcon}>
              <use href="/symbol-defs.svg#icon-map"></use>
            </svg>
            <p className={css.camperDetailsLocation}>{camper.location}</p>
          </div>
        </div>
        <p className={css.camperDetailsPrice}>€{camper.price.toFixed(2)}</p>

        <div className={css.camperDetailsGallery}>
          {camper.gallery?.map((img, idx) => (
            <div key={idx}>
              <Image
                className={css.camperDetailsImg}
                src={img.thumb}
                alt={`${camper.name} photo ${idx + 1}`}
                width={292}
                height={312}
              />
            </div>
          ))}
        </div>
        <p className={css.camperDetailsDescription}>{camper.description}</p>

        <div className={css.tabsWrapper}>
          <div className={css.tabs}>
            <button
              className={`${css.camperDetailsBtn} ${
                activeTab === "features" ? css.active : ""
              }`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`${css.camperDetailsBtn} ${
                activeTab === "reviews" ? css.active : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          <div className={css.tabsDivider}></div>
        </div>
        <div className={css.camperDetailsFeautersWrapper}>
          {activeTab === "features" && (
            <div className={css.camperDetailsFeauters}>
              <div className={css.camperDetailsFeautersListWrapper}>
                <ul className={css.camperDetailsFeautersList}>
                  {[
                    {
                      key: "transmission",
                      label: "Transmission",
                      icon: "icon-diagram",
                    },
                    { key: "engine", label: "Engine", icon: "icon-engine" },
                    { key: "AC", label: "AC", icon: "icon-wind" },
                    { key: "bathroom", label: "Bathroom", icon: "icon-shower" },
                    { key: "kitchen", label: "Kitchen", icon: "icon-cup" },
                    { key: "TV", label: "TV", icon: "icon-tv" },
                    { key: "radio", label: "Radio", icon: "icon-radio" },
                    {
                      key: "refrigerator",
                      label: "Refrigerator",
                      icon: "icon-fridge",
                    },
                    {
                      key: "microwave",
                      label: "Microwave",
                      icon: "icon-microwave",
                    },
                    { key: "gas", label: "Gas", icon: "icon-gas" },
                    { key: "water", label: "Water", icon: "icon-water" },
                  ].map((feature) => {
                    const value = camper[feature.key as keyof Camper];
                    if (!value) return null;
                    return (
                      <li
                        key={feature.key}
                        className={css.camperDetailsFeautersItem}
                      >
                        <svg width={20} height={20} className={css.featureIcon}>
                          <use href={`/symbol-defs.svg#${feature.icon}`} />
                        </svg>
                        <span className={css.camperDetailsFeautersLabel}>
                          {feature.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={css.camperDetailsFeautersVehicle}>
                <h3 className={css.camperDetailsFeautersVehicleTitle}>
                  Vehicle details
                </h3>
                <div className={css.tabsDivider}></div>
                <ul className={css.camperDetailsFeautersVehicleList}>
                  {camper.form && (
                    <li className={css.camperDetailsFeautersVehicleItem}>
                      <span>Form</span>
                      <span>{camper.form}</span>
                    </li>
                  )}
                  {camper.length && (
                    <li className={css.camperDetailsFeautersVehicleItem}>
                      <span>Length</span>
                      <span>{camper.length}</span>
                    </li>
                  )}
                  {camper.width && (
                    <li className={css.camperDetailsFeautersVehicleItem}>
                      <span>Width</span>
                      <span>{camper.width}</span>
                    </li>
                  )}
                  {camper.height && (
                    <li className={css.camperDetailsFeautersVehicleItem}>
                      <span>Height</span>
                      <span>{camper.height}</span>
                    </li>
                  )}
                  {camper.tank && (
                    <li className={css.camperDetailsFeautersVehicleItem}>
                      <span>Tank</span>
                      <span>{camper.tank}</span>
                    </li>
                  )}
                  {camper.consumption && (
                    <li className={css.camperDetailsFeautersVehicleItem}>
                      <span>Consumption</span>
                      <span> {camper.consumption}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* {activeTab === "reviews" && (
            <div className="reviews">
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((review, idx) => (
                  <div key={idx}>
                    <p className={css.reviewerName}>{review.reviewer_name}</p> (
                    {review.reviewer_rating}/5)
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )} */}

          {activeTab === "reviews" && (
            <div className="reviews">
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((review, idx) => {
                  const rating = review.reviewer_rating; // число от 1 до 5
                  return (
                    <div key={idx} className={css.reviewItem}>
                      <div className={css.reviewerHeader}>
                        {/* Иконка с первой буквой имени */}
                        <div className={css.reviewerAvatar}>
                          {review.reviewer_name[0].toUpperCase()}
                        </div>

                        {/* Имя ревьювера */}
                        <div className={css.reviewerNameRating}>
                          <p className={css.reviewerName}>
                            {review.reviewer_name}
                          </p>

                          {/* Звёздочки */}
                          <div className={css.reviewerRating}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                width="16"
                                height="16"
                                className={
                                  i < rating ? css.starFilled : css.starEmpty
                                }
                              >
                                <use href="/symbol-defs.svg#icon-rating_star"></use>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Комментарий */}
                      <p className={css.reviewComment}>{review.comment}</p>
                    </div>
                  );
                })
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}

          <BookingForm camper={camper} />
        </div>
      </div>
    </Container>
  );
};

export default CamperDetailsClient;
