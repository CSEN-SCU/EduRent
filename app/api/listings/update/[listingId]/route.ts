import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IListingParams {
  listingId?: string;
}

export async function PUT(
  request: Request, 
  { params }: { params: IListingParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
      listingLatLong,
      price,
      leaseStartDate,
      leaseEndDate,
      distFromBenson,
      isActive
    } = body;

    if (!locationValue || !listingLatLong || !distFromBenson) {
      return NextResponse.json({ error: "Invalid location data" }, { status: 400 });
    }

    const updatedListing = await prisma.listing.update({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: locationValue,
        price: parseInt(price, 10),
        leaseStartDate,
        leaseEndDate,
        listingLatLong: listingLatLong,
        distFromBenson: distFromBenson,
        isActive
      },
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}
