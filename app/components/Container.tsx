'use client';

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return(
        <div
            className="
                max-w-[2520px]
                mx-auto
                xl:px-10
                md:px-5
                sm:px-2
                px-4
            "
        >
            {children}
        </div>
    );
}

export default Container;