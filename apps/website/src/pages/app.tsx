import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";


const App: NextPage = () => {

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
            
            <Footer />
        </>
    )
}

export default App