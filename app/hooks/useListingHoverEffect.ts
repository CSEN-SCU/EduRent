import { create } from "zustand";

interface ListingHoverEffectStore {
  currListing?: string | null;
  setCurrListing: (listing: string | null) => void;
}

const useListingHoverEffect = create<ListingHoverEffectStore>((set) => ({
  currListing: null,
  setCurrListing: (listing) => set({ currListing: listing }),
}));

export default useListingHoverEffect;
