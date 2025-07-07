import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="h-[100px] bg-[#02335E] p-5">
        <Image className=""
          src="/logo-weg 1.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </nav>

      <section className="flex flex-row">
        <div>
          <Image className=""
            src="/background-login.png"
            alt="Background Login"
            width={933} 
            height={1000}
          />
          <h1 className="absolute top-[55%] text-white text-[40px] font-bold max-w-[30ch] mx-[50px]">Bem-vindo ao software<br /> educacional para<br /> <a className="text-[#00579D]" >Bobinagem</a> de motores<br /> monofásicos e trifásicos.</h1>
        </div>
        <div className=" m-auto flex flex-col justify-center items-center gap-[50px] bg-red-500">
          <h1 className="text-[#02335E] font-bold text-[64px]">Login</h1>
          <div>
            <input type="text" id="email" name="email" placeholder="Insira seu login" className="px-20 text-start py-2 border-none outline-none border-b-[1px] border-solid border-black" required />
            <input type="text" id="senha" name="senha" placeholder="Insira sua senha" className="px-20 text-start py-2 border-none outline-none border-b-[1px] border-solid border-black" required />
          </div>
        </div>
      </section>
    </div>
  );
}
