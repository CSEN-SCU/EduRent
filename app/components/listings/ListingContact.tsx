'use client';
import { SafeUser } from '@/app/types';
import Button from '../Button';

interface ListingContactProps {
    user: SafeUser;
    email: string | null;
    disabled?:boolean;
    onSubmit: () => void;
    url: string;
}

const ListingContact:React.FC<ListingContactProps> = ({
    email,
    disabled,
    onSubmit,
    url
}) => {
    url = "mailto:" + email + "?Subject=Interest in EduRent Listing"
    return (
        <div className="p-4">
            <a href = {url}>
                <Button
                    disabled={disabled}
                    label= "Contact"
                    onClick={onSubmit}
                />
            </a>
        </div>
    );
}

export default ListingContact;