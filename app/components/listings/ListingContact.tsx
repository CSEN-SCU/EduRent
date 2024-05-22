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
    url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email
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