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
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<IListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  //const { getByValue } = useCountries();

  const location = locationValue;

  return (
    <>
      <Heading
        title={title}
        subtitle={location}
      />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        {/* <Image
          alt="Image"
          src={imageSrc}
          fill
          sizes="100%"
          className="object-cover w-full"
        /> */}
        <Carousel>
          <Item img={imageSrc}/>
          <Item img={imageSrc} />
          <Item img={imageSrc} />
          <Item img={imageSrc} />
          <Item img={imageSrc} />
        </Carousel>

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;