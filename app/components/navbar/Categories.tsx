'use client';

import Container from "../Container";
import { FaHouse, FaPeopleRoof } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { MdApartment } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Houses',
        icon: FaHouse,
        description: 'Invite us to the function when you find the perfect house!'
    },
    {
        label: 'Apartments',
        icon: MdApartment,
        description: "Don't have more than 3 friends? Find an apartment!"
    },
    {
        label: 'Subleases',
        icon: FaPeopleRoof,
        description: "Don't need a long-term lease, look no further!"
    },
    {
        label: 'University Housing',
        icon: IoSchool,
        description: 'Utilities and rules included free of charge!'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }

    return (
        <Container>
            <div
                className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category == item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;