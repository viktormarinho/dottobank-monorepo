import Image from 'next/image';
import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-400 text-white p-4 mt-16 min-h-[15vh] pb-[10vh] pt-[5vh]">
          <div className=" w-40 mx-auto
          xl:w-52">
            <Image src="/logo-full-new.svg" alt="logo dotto bank" layout="intrinsic" width={500} height={220} />
          </div>
          <div className="h-[2px] w-[70%] bg-white mx-auto"></div>
          <div className="flex flex-col gap-4 text-center pt-[10vh]">
            <a href="#" className="text-base hover:underline">Página do aplicativo na Play Store</a>
            <a href="#" className="text-base hover:underline">Página do aplicativo na AppStore</a>
            <a href="#" className="text-base hover:underline">Serviço de atendimento ao cliente</a>
          </div>
    </footer>
  );
}

export default Footer;