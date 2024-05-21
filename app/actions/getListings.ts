import prisma from "@/app/libs/prismadb"


export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    price?: string;
  }

export default async function getListings(
    params: IListingParams

) {
    try {
        const { 
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
            price,

        } = params;

        let query: any = {};

        if(userId){
            query.userId = userId;
        }

        if(category){
            query.category = category;
        }

        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }

        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }

        if(bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if(price){
            query.price = {
                lte: +price
            }
        }

        const listings = await prisma.listing.findMany({
            where: query, 
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),

        }));
        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}