import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from 'next/image';
import { useRouter } from "next/router";


const App: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Dotto bank</title>
                <meta name="description" content="Banco digital legal" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <div className="absolute hidden xl:block z-[-2] bg-blue-400 top-0 right-0
            w-[55vw] xl:rounded-bl-[10rem] xl:h-[16vh] 2xl:h-[16vh] fhd:h-[14vh]"></div>
            <Header />
            <div className="flex-col flex md:flex-row justify-between items-center w-full md:max-h-[70vh]">
                <div className="md:w-1/2 h-96 md:h-auto">
                    <Image src="/phone.svg" alt="phone app" layout="intrinsic" width={1000} height={1200} priority={true} />
                </div>
                <div className="md:w-1/2 w-3/4 mx-auto">
                    <h1 className="text-3xl font-semibold">Dottobank App</h1>
                    <br />
                    <p className="max-w-xs">Você pode baixar o app e utilizar pelo seu celular ou acessar a versão para web!</p>
                    <br />
                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="bg-blue-400 rounded-xl md:rounded-3xl text-white text-xl cursor-pointer mt-4 px-4 py-2 hover:bg-blue-500 transition">Baixe o app</button>
                        <button onClick={() => router.push('/webapp')} className="bg-blue-400 rounded-xl md:rounded-3xl text-white text-xl cursor-pointer mt-4 px-4 py-2 hover:bg-blue-500 transition">Utilize a versão para navegadores</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default App