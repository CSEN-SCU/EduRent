'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

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
    console.table(value);
  }, [onChange, value]);

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="okg5red2"
      options={{
        maxFiles: 69,
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
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload photos</div>
            {value.length > 0 && (
              <div className="absolute inset-0 w-full h-full grid grid-cols-2 gap-2">
                {value.map((imageUrl, index) => (
                  <div key={index} className="relative w-full h-48">
                    <Image
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      src={imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;