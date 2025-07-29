import Image from "next/image";

export default function Header() {
    return (
        <>
            <header>
                <nav className="h-[100px] bg-[#02335E] p-5">
                    <Image
                        src="/logo-weg 1.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                </nav>
                
            </header>

        </>
    )
}