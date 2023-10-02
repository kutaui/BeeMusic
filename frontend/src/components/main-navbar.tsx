import Image from 'next/image';

export default function MainNavbar() {
    return (
        <div className="w-full flex justify-center pt-6">
            <Image src="/icons/bee-icon.png" width={60} height={60} alt="Bee Icon"/>
        </div>
    );
}