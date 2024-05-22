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
  const zoom = 15;

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
      <head>
          <link rel="icon" sizes="any" href="/images/icon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </head>
      <div className="flex h-screen">
        <div className="flex-initial w-2/5 overflow-hidden">
                <div className="sticky top-0 h-screen">
                  <GoogleMap
                    // apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                    apiKey={googleMapsApiKey}
                    zoom={zoom}
                    center={center}
                    listings={listings}
                    currentUser={currentUser}
                  // onIdle={onIdle}
                  // onMarkerClick={onMarkerClick}
                  // highlightedMarkerId={highlightedHotel?.hotelId}
                  />
            </div>
          </div>
        <div className="flex-initial w-3/5 overflow-y-auto h-full">
          
          <Container>
            <div className="
              pt-24
              pb-5
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-3
              xl:grid-cols-3
              2xl:grid-cols-3
              gap-8
              md:mt-20
              
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
      </div>
    </ClientOnly>
  );
};

export default Home;
