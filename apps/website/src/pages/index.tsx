import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CountUp from "react-countup";
import Footer from "../components/Footer";
import Header from "../components/Header";

// <Spline scene="https://prod.spline.design/9X2wyMxoFVAfPtIv/scene.splinecode" />

const Home: NextPage = () => {

  const [cpf, setCpf] = useState('');
  const router = useRouter();

  const cpfMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const seInscrever = () => {
    router.push("/cadastro", { query: { cpf: cpf } })
  }

  return (
    <>
      <Head>
        <title>Dotto bank</title>
        <meta name="description" content="Banco digital legal" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="overflow-hidden">
        {/*MOBILE HELPER DIV */}
        <div className="h-[12vh] absolute z-[-1] bg-blue-400 top-0 right-0 w-[100vw] xl:hidden"> </div>

        {/* BLUE BACKGROUND WITH WOMAN */}
        <div className="absolute z-[-2] bg-blue-400 top-0 right-0
        w-[100vw] h-[45vh] rounded-bl-[20vw] mt-[10vh]
        xl:w-[64vw] xl:h-[70vh] xl:rounded-bl-[20rem] xl:mt-0
        2xl:w-[64vw] 2xl:h-[75vh]
        fhd:w-[60vw] fhd:h-[80vh]">
          <Image src="/woman-bg.svg" alt="woman holding phone" layout="fill" className="animate-fadeinspecial" priority={true} />
        </div>

        {/* PHONE */}
        <div className="absolute z-[-1] bg-transparent animate-fadeinspecial hidden
        xl:top-[-20%] xl:h-[74vh] xl:right-[20%] xl:block
        2xl:top-[-15%] 2xl:h-[77vh] 2xl:right-[25%] 
        fhd:top-[-10%] fhd:h-[80vh] fhd:right-[30%]">
          <Image src="/phone.svg" alt="phone app" layout="intrinsic" width={1000} height={1200} priority={true} />
        </div>

        <Header />

        {/* ESPAÇADOR */}
        <div className="h-[48vh] xl:h-[70vh]"></div>

        {/* NUMEROS SUBINDO */}
        <div className="flex xl:flex-row flex-col items-center xl:justify-around gap-16 xl:px-24">
          <p className="animate-fadeinspecial text-3xl text-center font-bold">
            <CountUp
              end={128564}
              duration={2.5}
              separator="."
            />
            <br />
            <span className="font-normal text-xl"> <span className="text-blue-500 font-semibold">Cartões enviados</span></span>
          </p>
          <p className="animate-fadeinspecial text-3xl text-center font-bold">
            <CountUp
              end={315643.17}
              duration={2}
              separator="."
              prefix="R$ "
              decimal=","
              decimals={2}
            />
            <br />
            <span className="font-normal text-xl"> Transferidos <span className="text-blue-500 font-semibold">hoje</span></span>
          </p>
          <p className="animate-fadeinspecial text-3xl text-center font-bold">
            <CountUp
              end={721985.8}
              duration={3}
              separator="."
              prefix="R$ "
              decimal=","
              decimals={2}
            />
            <br />
            <span className="font-normal text-xl"> <span className="text-blue-500 font-semibold">Devolvido</span> em cashback</span>
          </p>
        </div>

        {/* PEÇA SEU CARTAO BOX */}
        <div className="rounded-3xl p-4 xl:flex flex-col gap-8 animate-fadeinspecial 
        text-center items-center mt-6
        xl:top-[22%] xl:left-[12%] xl:absolute xl:text-left xl:items-start xl:mt-0
        2xl:top-[30%] 2xl:left-[15%]">
          <h1 className="font-semibold
          text-xl
          lg:text-2xl">
            Peça seu cartão agora!
          </h1>
          <p className=" max-w-xs mx-auto
          xl:max-w-xs text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid explicabo deserunt odit nobis perspiciatis dolorem natus
            iusto nihil delectus sapiente, dolorum, pariatur reprehenderit quis architecto! Deserunt nulla sit a dicta.
          </p>
          <div>
            <p className="p-1 font-semibold">CPF</p>
            <input type="text"
              className="input"
              placeholder="Ex.: 000.000.000-00"
              maxLength={14}
              value={cpf}
              onChange={(e) => setCpf(cpfMask(e.target.value))}
            />
          </div>
          <br />
          <button className="bg-blue-400 rounded-3xl text-white cursor-pointer px-4 py-2 hover:bg-blue-500 transition" onClick={seInscrever}>Se inscrever</button>
        </div>

        <Footer />
        </main>
    </>
  );
};

export default Home;
