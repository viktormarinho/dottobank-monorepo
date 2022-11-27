import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';


const CartoesPage: React.FC = () => {
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
            
            <main className='flex flex-col items-center gap-4'>
                <h1 className='mt-4 text-2xl font-medium text-center'>Cartões</h1>
                <p className='mt-4 text-md text-center max-w-xs lg:max-w-2xl mx-auto'>
                    Aqui no Dotto, você tem acesso a dois planos de conta/cartão desenhados e planejados para te
                    darem tudo o que você achava que precisava e muito mais. 
                </p>

                <h2 className='mt-4 text-lg'>Plano Dotto Starter</h2>
                <p className='mt-4 text-md text-center max-w-xs lg:max-w-2xl mx-auto'>
                    O nosso plano padrão tem todo o essencial que você sempre quis junto ao que você nem sabia que
                    queria. Perfeito para te introduzir ao Dotto, e vai fazer você se apaixonar.
                </p>
                <Image src='/CartaoStarter.svg' alt="Cartão starter" layout="fixed" width={350} height={220} />

                <h2 className='mt-4 text-lg'>Plano Dotto Black</h2>
                <p className='mt-4 text-md text-center max-w-xs lg:max-w-2xl mx-auto'>
                    A experiência premium que você merece. Seja um cliente de primeira classe e desfrute dos
                    inúmeros benefícios que te aguardam, como viagens, descontos em parceiros e muito mais.
                </p>
                <Image src='/CartaoBlack.svg' alt="Cartão Black" layout="fixed" width={350} height={220} />
                <button className='bg-blue-400 rounded-3xl text-white text-xl cursor-pointer mt-4 px-4 py-2 hover:bg-blue-500 transition'
                    onClick={() => router.push('/cadastro')}>
                        Quero fazer parte!
                </button>
                <div className='my-4'></div>
            </main>
            <Footer />
        </>
    );
}

export default CartoesPage;