import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { GoogleMapsEmbed } from '@next/third-parties/google';

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  const googleMapsApiKey = process.env.GOOGLE_MAPS_EMBED_KEY;

  if (!googleMapsApiKey) {
    // Handle case when API key is not available
    return <div>Error: Google Maps API key is not provided.</div>;
  }

  if(listings.length == 0) {
    return(
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <div className="flex h-full">
        <div className="flex-initial w-2/3">
          <Container>
          <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          ">
            {listings.map((listing) => {
              return (
                <ListingCard
                  currentUser = {currentUser}
                  key={listing.id}
                  data={listing}
                />
              )
            })}
          </div>
        </Container>
        </div>
        <div className="flex-initial w-1/3">
          <div className="pt-24 h-full">
            <GoogleMapsEmbed
              apiKey={googleMapsApiKey}
              mode="place"
              height={600}
              width={600}
              q="Brooklyn+Bridge,New+York,NY"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
