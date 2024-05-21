"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  // const onEdit = useCallback(
  //   (id: string) => {
  //     // Implement logic to navigate to the edit page with the listing id
  //     router.push(`/edit-listing/${id}`);
  //   },
  //   [router]
  // );

  return (
    <Container>
      <div className="pb-15 pt-20">
        <Heading title="Properties" subtitle="List of your properties" />
        <div
          className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {/* {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId == listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))} */}
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            onEdit={true} // Pass the edit action handler
            disabled={deletingId == listing.id}
            actionLabel="Delete property"
            editLabel="Edit property" // Pass label for the edit button
            currentUser={currentUser}
          />
        ))}
        </div>
      </div>
    </Container>
  );
};

export default PropertiesClient;