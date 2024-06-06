'use client';

import useEditModal from "@/app/hooks/useEditModal";
import Modal from "./Modal";
import { useEffect, useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import DatePick from "../inputs/DatePick";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { type } from "os";
import { latLng } from "leaflet";
import Switch from "react-switch";

enum STEPS {
  INFO = 0,
  //LOCATION = 1,
  IMAGES = 1,
  DESCRIPTION = 2,
  PRICE = 3,
}


const EditModal = () => {
  const router = useRouter();
  const editModal = useEditModal();

  const [step, setStep] = useState(STEPS.INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false); 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      id: "",
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: [],
      price: 1,
      title: "",
      description: "",
      leaseStartDate: null,
      leaseEndDate: null,
      isActive: true
    },
  });

  useEffect(() => {
    if (editModal.data) {
      console.log(editModal.data);
      reset(editModal.data);
    }
  }, [editModal.data, reset]);

  const category = watch("category");
  const location = watch("location");
  const listingLatLong = watch("listingLatLong");
  const distFromBenson = watch("distValue");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const leaseStartDate = watch("leaseStartDate");
  const leaseEndDate = watch("leaseEndDate");
  const isActive = watch("isActive");

  //console.log("Location value:", locationValue);
  //console.log("listingLatLong: ", listingLatLong);
  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("../Map"), {
  //       ssr: false,
  //     }),
  //   [location]
  // );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const listingId = data.id; // Assuming the listing ID is part of the form data
    
    if (!canAdvance) {
      return; 
    }
    
    if (!listingId) {
      toast.error("Listing ID is required.");
      return;
    }
  
    if (step !== STEPS.PRICE) {
      return onNext();
    }
  
    setIsLoading(true);
  
    axios
      .put(`/api/listings/update/${listingId}`, data)
      .then(() => {
        toast.success("Listing Updated");
        router.refresh();
        reset();
        setStep(STEPS.INFO);
        editModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Update";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }
    return "Back";
  }, [step]);

  useEffect(() => {
    if (leaseStartDate && leaseEndDate) {
      if ((leaseEndDate - leaseStartDate) <= 0) {
        toast.error("Lease End Date must end after the Lease Start Date"); 
        setCanAdvance(false); 
      } else {
        setCanAdvance(true); 
      }
    }
  }, [leaseStartDate, leaseEndDate])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      />
      <Counter
        title="Tenants"
        subtitle="How many tenants are you looking for (max)?"
        value={guestCount}
        onChange={(value) => setCustomValue("guestCount", value)}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you have?"
        value={roomCount}
        onChange={(value) => setCustomValue("roomCount", value)}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={(value) => setCustomValue("bathroomCount", value)}
      />
      <hr />
    </div>
  );

  // if (step === STEPS.LOCATION) {
  //   console.log(editModal.data.locationValue); 
  //   console.log(typeof(editModal.data.locationValue)); 

  //   const location: CountrySelectValue = {
  //     flag: "📍",  
  //     label: editModal.data.locationValue as string, 
  //     region: editModal.data.locationValue as string,
  //     latlng: editModal.data.listingLatLong as number[],
  //     locationValue: editModal.data.locationValue,
  //     distValue: editModal.data.distFromBenson as number,
  //   }
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Where is your place located?"
  //         subtitle="Help students see where they'll stay!"
  //       />
  //       <CountrySelect
  //         locationValue={location}
  //         //initialAddress={editModal.data.locationValue}
  //         onChange={(value) => setCustomValue("location", value)}
  //       />
  //       <Map center={editModal.data.listingLatLong} />
  //     </div>
  //   );
  // }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload photos"
          subtitle="Add more pictures!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Edit your description?"
          subtitle="Short and sweet works best!"
        />
        <hr />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <div className="flex gap-8">
          <div className="flex-grow">
            <DatePick
              id="leaseStartDate"
              label="Lease start date"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              value={leaseStartDate}
              onChange={(value) => setCustomValue("leaseStartDate", value)}
            />
          </div>
          <div className="flex-grow">
            <DatePick
              id="leaseEndDate"
              label="Lease end date"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              value={leaseEndDate}
              onChange={(value) => setCustomValue("leaseEndDate", value)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Edit your price & activate/deactivate your listing"
          subtitle="Activate to indicate you are currently looking for tenants for your upcoming lease term. Deactivate once you have found tenants!"
        />
        <Input
          id="price"
          label="Price per month"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        
        <div className="flex items-center mt-4">
          <span className="mr-2">Activate your listing</span>
          <Switch
            checked={isActive}
            onChange={(checked) => setCustomValue("isActive", checked)}
            disabled={isLoading}
            offColor="#888"
            onColor="#862633"
            className="ml-3"
          />
        </div>
      </div>
    );
  }


  return (
    <Modal
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.INFO ? undefined : onBack}
      title="Edit your edurent listing"
      body={bodyContent}
      canAdvance={canAdvance}
    />
  );
};

export default EditModal;
