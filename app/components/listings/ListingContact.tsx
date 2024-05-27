'use client';
import { SafeUser } from '@/app/types';
import Button from '../Button';

interface ListingContactProps {
    user: SafeUser;
    email: string | null;
    disabled?: boolean;
    url: string;
    title: string;
    landlordName: string | null;
    currentUserName: string | null | undefined;
}

const ListingContact: React.FC<ListingContactProps> = ({
    email,
    disabled,
    url,
    title,
    landlordName,
    currentUserName
}) => {
    const handleContactClick = () => {
        const subject = encodeURIComponent(`Interest in '${title}' listing from EduRent`);
        const body = encodeURIComponent(`Hi, ${landlordName}! \n\nI am interested in your '${title}' listing from EduRent. \n\n<Insert more personalized, relevant info for the landlord. Include what year you are, when/how long you want to lease, and how many tenants are in your group> \n\nRegards, \n${currentUserName}`);
        const gmailUrl = `${url}${email}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
    }

    return (
        <div className="p-4 w-[45%]">
            <Button
                disabled={disabled}
                label="Contact Landlord"
                onClick={handleContactClick}
            />
        </div>
    );
}

export default ListingContact;
