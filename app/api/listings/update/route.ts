import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    id,
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
    leaseStartDate,
    leaseEndDate,
    distFromBenson
  } = body;

  if (!id) {
    return NextResponse.error();
  }

  Object.keys(body).forEach((value: any) => {
    if (body[value] === undefined || body[value] === null) {
      NextResponse.error();
    }
  });

  try {
    const listing = await prisma.listing.update({
      where: { id: id },
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        leaseStartDate,
        leaseEndDate,
        listingLatLong: location.latlng,
        distFromBenson: location.distValue
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error();
  }
}