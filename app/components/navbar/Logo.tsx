'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="81"
            width="81"
            src="/images/edurent-logo-final.svg"
        />
    )
}
export default Logo;