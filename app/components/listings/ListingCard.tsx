"use client";

//import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../inputs/HeartButton";
import Button from "../Button";
import RentModal from "../modals/RentModal";
import EditModal from "../modals/EditModal";
import useEditModal from "@/app/hooks/useEditModal";
import useRentModal from "@/app/hooks/useRentModal";
import useListingHoverEffect from "@/app/hooks/useListingHoverEffect";
import Carousel from "../Swiper/Carousel";
import { Item } from "../Swiper/components";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  onEdit?: boolean;
  disabled?: boolean;
  actionLabel?: string;
  editLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onEdit,
  disabled,
  actionLabel,
  editLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const listHoverEffect = useListingHoverEffect();

  const location = data.locationValue;
  const editModal = useEditModal();
  const rentModal = useRentModal();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

    //   onAction?.(actionId);
      editModal.onOpen();
      console.log("Pressed");
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      onMouseOver={() => {
        listHoverEffect.setCurrListing(data.id);
      }}
      onMouseOut={() => {
        listHoverEffect.setCurrListing(null);
      }}
      className="col-span-1 cursor-pointer group"
      style={{ width: "100%" }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    ">
                    <Image 
                        fill
                        alt = "Listing"
                        src = {data.imageSrc[0]}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                            {/* <Carousel>
                              {data.imageSrc.map((image) => {
                                return (
                                  <Item img={image}/>
                                )
                              })}
                            </Carousel> */}
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.title}</div>
        <div className="font-light text-neutral-500">
          {location}
          <br></br>
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light"> per month</div>}
        </div>
        {onEdit &&
          editLabel && ( // Render the edit button
            <Button small label={editLabel} onClick={handleEdit} />
          )}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
