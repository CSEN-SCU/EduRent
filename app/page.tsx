import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

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
      <div className="flex">
        <div className="flex-initial w-3/5">
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
        <div className="flex-initial w-2/5 mr-12">
          <div className="pt-24 h-full">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=Space+Needle,Seattle+WA`}>
                </iframe>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
