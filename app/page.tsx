import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import GoogleMap from "./components/GoogleMap";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const googleMapsApiKey = process.env.GOOGLE_MAPS_EMBED_KEY;

  const center = { lat: 37.3489, lng: -121.9368 };//SCU coordinates
  const zoom = 17;

  if (!googleMapsApiKey) {
    // Handle case when API key is not available
    return <div>Error: Google Maps API key is not provided.</div>;
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="flex h-screen">
        <div className="flex-initial w-3/5 h-full overflow-y-auto">
          <Container>
            <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-3
          gap-8
          md:mt-12
          ">
              {listings.map((listing) => {
                return (
                  <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                  />
                )
              })}
            </div>
          </Container>
        </div>
        <div className="flex-initial w-2/5 h-screen">
          <GoogleMap
            apiKey={googleMapsApiKey}
            zoom={zoom}
            center={center}
            listings={listings}
            currentUser = {currentUser}
          />
        </div>
      </div>
    </ClientOnly>
  );
};

export default Home;
