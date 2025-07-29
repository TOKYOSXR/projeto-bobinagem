import Image from "next/image";

export default function Header() {
    return (
        <>
            <header>
                <nav className="h-[80px] bg-[#02335E] p-6">
                    <Image
                        src="/logo-weg 1.png"
                        alt="Logo"
                        width={70}
                        height={70}
                    />
                </nav>
                
            </header>

        </>
    )
}