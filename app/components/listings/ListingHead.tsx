"use client";

//import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import HeartButton from "../inputs/HeartButton";
import Carousel from "../Swiper/Carousel";
import { Item, AppContainer, Code } from "../Swiper/components";
import ReactDOM from "react-dom";
import React from "react";

interface IListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
  isActive: Boolean;
}

const ListingHead: React.FC<IListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
  isActive
}) => {
  //const { getByValue } = useCountries();

  const location = locationValue;
  const status = isActive ? "ACTIVE" : "INACTIVE";
  const statusColor = isActive ? "text-[#862633]" : "text-gray-500";


  return (
    <>
      <Heading
        title={title}
        subtitle={location}
      />
      <div className="text-lg font-bold flex flex-row gap-2">
        <div>Status:</div>
        <div className={statusColor}>{status}</div>
      </div>
      {imageSrc.length > 1 ? (
        <div
          className="
          w-full
          h-full
          overflow-hidden
          rounded-xl
          relative
        "
        >
          <Carousel>
            {imageSrc.map((image, idx) => {
              return <Item key={idx} img={image} />;
            })}
          </Carousel>

          <div className="absolute top-5 right-5">
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        </div>
      ) : (
        <div
          className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        "
        >
          <Image
            alt="Image"
            src={imageSrc[0]}
            fill
            sizes="100%"
            className="object-cover w-full"
          />
          <div className="absolute top-5 right-5">
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        </div>
      )}
    </>
  );
};

export default ListingHead;