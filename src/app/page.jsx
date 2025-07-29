import Header from "@/components/header/header";
import Image from "next/image";

export default function Home() {
  return (
    <div>


      <section className="min-h-screen grid grid-cols-1 md:grid-cols-[3fr_2fr]">


        <div className="relative hidden md:block">
          <img
            src="/background-login.png"
            alt="Imagem de fundo"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute top-[40%] text-white text-[40px] font-bold max-w-[30ch] mx-[50px]">Bem-vindo ao software<br /> educacional para<br /> <a className="text-[#00579D]" >Bobinagem</a> de motores<br /> monofásicos e trifásicos.</h1>
        </div>




        <div className=" m-auto flex flex-col justify-center items-center gap-[50px] ">
          <h1 className="text-[#02335E] font-bold text-[64px]">Login</h1>
          <div className="flex flex-col gap-5">
            <div>
              <label className="flex items-center border-b border-black py-2 px-6">
                <img
                  src="/icones-login/usuario-login-icon.png"
                  alt="Usuario"
                  className="w-4 h-4 mr-2"
                />
                <input type="text" id="email" name="email" placeholder="Insira seu login" className="w-full outline-none" required />
              </label>
            </div>

            <div>
              <label className="flex items-center border-b border-black py-2 px-6" >
                <img
                  src="/icones-login/senha-login-icon.png"
                  alt="Usuario"
                  className="w-4 h-4 mr-2"
                />
                <input type="text" id="senha" name="senha" placeholder="Insira sua senha" className="" required />
              </label>
            </div>

            <div className="text-rigth text-[10px] text-[#02335E] hover:underline cursor-pointer">
              <a href="#">Esqueceu a senha?</a>
            </div>

            <button className=" cursor-pointer w-full bg-[#02335E] text-white text-2xl font-bold py-2 rounded-2xl hover:bg-[#00579D]">Entrar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
