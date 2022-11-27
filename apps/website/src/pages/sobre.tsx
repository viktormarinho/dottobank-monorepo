import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";


const Sobre: NextPage = () => {

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
            <h1 className="mt-4 text-2xl font-semibold text-center">Sobre</h1>
            <p className="mt-4 text-md text-center max-w-xs lg:max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit in nulla corrupti neque provident, sequi quae aliquid recusandae iure eligendi corporis, nihil quas accusantium doloribus fugit itaque? Harum, unde nihil.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam voluptates expedita voluptas quas saepe explicabo consequuntur veritatis non? Ipsa explicabo distinctio voluptatum minima mollitia dolor numquam non commodi impedit maiores.
            </p>
            <p className="mt-4 text-md text-center max-w-xs lg:max-w-2xl mx-auto">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur cum tempora iste, magni facilis rerum explicabo magnam neque, non sed numquam saepe hic accusamus voluptatibus. Possimus, praesentium! Impedit, facilis sunt.
            </p>
            <p className="mt-4 text-md text-center max-w-xs lg:max-w-2xl mx-auto mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum architecto vero non a enim! Explicabo accusamus facilis illo totam obcaecati reiciendis itaque, rerum doloremque ab sed odit culpa harum laborum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam temporibus dolorum earum, commodi totam quidem iure itaque asperiores alias, sit, illum voluptatum voluptates impedit nesciunt. Illo, sequi molestiae? Magni, dolore.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore harum odit veniam similique repudiandae. Dolore vero minima quod saepe libero. Expedita dolores quidem et in nobis! Exercitationem obcaecati molestiae sint!
            </p>
            <Footer />
        </>
    )
}

export default Sobre