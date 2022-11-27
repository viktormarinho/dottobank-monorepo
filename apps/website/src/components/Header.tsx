import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ActiveLink } from './ActiveLink';
import { BiMenu, BiX } from 'react-icons/bi';


const Header: React.FC = () => {
    const router = useRouter();
    const [height, setHeight] = useState('bg-white')


    const toggleHeight = () => {
        if (height === "bg-white") {
            setHeight('h-[100vh] bg-blue-400 flex-col')
        } else {
            setHeight('bg-white')
        }
    }

    const HeaderLinks = [
        { nome: "Cartões", special: false, href: "/cartoes" },
        { nome: "Sobre", special: false, href: "/sobre" },
        { nome: "Conta", special: false, href: "/conta" },
        { nome: "App", special: false, href: "/app" },
        { nome: "Login", special: true, href: "/login" },
    ];

    return (
        <>
            <Head>
                <title>Dotto bank</title>
                <meta name="description" content="Banco digital legal" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            {/* HEADER */}
            <header className={"flex rounded-bl-[20vw] xl:bg-transparent items-center justify-around xl:p-8 " + height}>
                <div onClick={() => router.replace("/")} className=" w-40
          xl:w-52 cursor-pointer">
                    <Image src="/logo-full-new.svg" alt="logo dotto bank" layout="intrinsic" width={500} height={220} />
                </div>
                {/* LINKS DESKTOP */}
                <ul className="hidden
          list-none xl:flex items-center gap-6">
                    {HeaderLinks.map((link) => {
                        if (!link.special) {
                            return (
                                <li key={link.nome}>
                                    <ActiveLink href={link.href} className="text-white px-4 py-2 hover:bg-white hover:text-blue-400
                    hover:font-medium rounded-3xl font-semibold transition">
                                        {link.nome}
                                    </ActiveLink>
                                </li>
                            )
                        }
                        return (
                            <li key={link.nome}>
                                <ActiveLink href={link.href} className="text-white border-2 rounded-3xl border-white px-4 py-2 hover:bg-white hover:text-blue-400
                  hover:font-medium font-semibold transition">
                                    {link.nome}
                                </ActiveLink>
                            </li>
                        )
                    })}
                </ul>
                {/* LINKS MENU OPEN */}
                {height !== 'bg-white' &&
                    <ul className="flex flex-col items-center list-none gap-8">
                        {HeaderLinks.map((link) => {
                            if (!link.special) {
                                return (
                                    <li key={link.nome}>
                                        <ActiveLink href={link.href} className="text-white text-xl px-4 py-2 hover:bg-white hover:text-blue-400
                    hover:font-medium rounded-3xl font-semibold transition">
                                            {link.nome}
                                        </ActiveLink>
                                    </li>
                                )
                            }
                            return (
                                <li key={link.nome}>
                                    <ActiveLink href={link.href} className="text-white text-xl border-2 rounded-3xl border-white px-4 py-2 hover:bg-white hover:text-blue-400
                  hover:font-medium font-semibold transition">
                                        {link.nome}
                                    </ActiveLink>
                                </li>
                            )
                        })}
                    </ul>
                }
                <button className="xl:hidden" onClick={toggleHeight}>{height == 'bg-white' ? <BiMenu className="text-3xl" /> : <BiX className="text-3xl text-white" />}</button>
            </header>
        </>
    )
}

export default Header;