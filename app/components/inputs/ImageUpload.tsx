'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import Carousel from "../Swiper/Carousel";
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  PREV,
  NEXT,
  Item
} from "../Swiper/components";
declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback((result: any) => {
    const newImageUrl = result.info.secure_url;
    value.push(newImageUrl);
    const updatedImages = [...value];
    onChange(updatedImages);
    console.table(value);
  }, [onChange, value]);

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="okg5red2"
      options={{
        maxFiles: 30,
        styles: {
          palette: {
            window: "#F5F5F5",
            sourceBg: "#FFFFFF",
            windowBorder: "#90a0b3",
            tabIcon: "#69778A",
            inactiveTabIcon: "#69778A",
            menuIcons: "#69778A",
            link: "#F43F5E",
            action: "#8F5DA5",
            inProgress: "#0194c7",
            complete: "#53ad9d",
            error: "#c43737",
            textDark: "#90A0B3",
            textLight: "#FFFFFF",
          },
          frame: {
            background: "#67676700",
          },
        },
      }}
    >
      {({ open }) => {
        return (
          <div className="relative flex flex-col h-full w-full">
            <div className="flex-grow">
              <div
                onClick={() => open?.()}
                className="
                cursor-pointer
                  hover:opacity-70
                  transition
                  border-dashed
                  border-2
                  p-4
                  border-neutral-300
                  flex
                  flex-col
                  justify-center
                  items-center
                  gap-2
                  text-neutral-600
                  bg-white
                  rounded-lg
                  h-full
                "
              >
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg text-center">Click to upload photos</div>
              </div>
            </div>
            {value.length > 0 && (
              <div className="flex-grow">
                <div className="w-full h-full">
                  <Carousel>
                    {value.map((imageUrl, index) => (
                      <Item key={index} img={imageUrl} />
                    ))}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
