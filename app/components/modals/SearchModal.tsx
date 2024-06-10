"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import Button from "../Button";

enum STEPS {
  INFO = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.INFO);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onReset = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      guestCount: null,
      roomCount: null,
      bathroomCount: null,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    setGuestCount(1);
    setRoomCount(1);
    setBathroomCount(1);
    searchModal.onClose();
  };

  const onSubmit = useCallback(async () => {
    if (step != STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathroomCount,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.INFO);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step == STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What is your rent limit?"
        subtitle="Find the perfect price!"
      />
      <hr />
    </div>
  );

  if (step == STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Search Filters"
          subtitle="Get listings in which the # of T/R/B is GREATER THAN OR EQUAL TO what you select"
        />
        <Counter
          title="Tenants"
          subtitle="How many tenants do you have?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
        <Button outline label="Reset all filters" onClick={onReset} />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      canAdvance={true}
    />
  );
};

export default SearchModal;
