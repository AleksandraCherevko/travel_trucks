import { Camper } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import css from "./CamperItem.module.css";
import { amenities } from "@/lib/amenities";

type Props = {
  item: Camper;
};

const CamperItem = ({ item }: Props) => {
  return (
    <li className={css.camperListItem}>
      <div className={css.camperListItemWrapper}>
        <Image
          className={css.camperListImg}
          src={item.gallery[0].original}
          alt={item.name}
          width={292}
          height={320}
        />
        <div className={css.camperListTextWrapper}>
          <div className={css.camperListNamePriceWrapper}>
            <p className={css.camperListName}>{item.name}</p>
            <p className={css.camperListPrice}>€{Math.round(item.price)}</p>
          </div>
          <div className={css.camperListAfterTitle}>
            <div className={css.camperListRatingReviewsWrapper}>
              <svg width="16" height="16" className={css.ratingIcon}>
                <use href="/symbol-defs.svg#icon-Property-1Pressed-1"></use>
              </svg>
              <p className={css.camperListRating}>{item.rating}</p>
              <p className={css.camperListReviews}>
                ({item.reviews?.length ?? 0}
                {item.reviews?.length === 1 ? " Review" : " Reviews"})
              </p>
            </div>
            <div className={css.camperListLocationWrapper}>
              <svg width="16" height="16" className={css.ratingIcon}>
                <use href="/symbol-defs.svg#icon-map"></use>
              </svg>
              <p className={css.camperListLocation}>{item.location}</p>
            </div>
          </div>
          <p className={css.camperListDescription}>
            {item.description.split(" ").length > 10
              ? item.description.split(" ").slice(0, 10).join(" ") + "..."
              : item.description}
          </p>

          <div className={css.camperListAmenities}>
            {amenities.map(
              (amenityItem) =>
                item[amenityItem.key] && (
                  <div key={amenityItem.key} className={css.amenity}>
                    <svg width={16} height={16}>
                      <use
                        href={`/symbol-defs.svg#${amenityItem.iconId}`}
                      ></use>
                    </svg>
                    <span>{amenityItem.label}</span>
                  </div>
                )
            )}
          </div>

          <Link
            className={`${css.camperListBtn} basicBtn`}
            href={`/catalog/${item.id}`}
          >
            Show more
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CamperItem;
