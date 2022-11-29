import { NextPage } from "next";
import Head from "next/head";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';
import { useRouter } from "next/router";
import { CadastroData } from "./cadastro";


const LoginPage: NextPage = () => {
    const [loginInfo, setLoginInfo] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })

    const router = useRouter();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    useEffect(() => {
        let token: any = localStorage.getItem('token')

        console.log('trying request')
        axios.get('http://localhost:4000/auth/me', { headers: { 'authorization': 'Bearer ' + token } })
            .then(res => {
                const user = res.data.user as CadastroData

                if (user) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Você já está logado!',
                        text: 'Impossível realizar cadastro, já está logado como ' + user.cliente.username,
                        confirmButtonText: 'Deslogar',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar'
                    }).then(result => {
                        if (result.isConfirmed) {
                            localStorage.clear()
                            Swal.mixin({
                                toast: true,
                                position: 'bottom-start',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                            }).fire({
                                title: 'Sessão encerrada.',
                                icon: 'info'
                            })
                        }
                    })
        
                    router.push("/")
                }
            })
    }, [])

    const handleChange = (e: any) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    const submitLogin = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:4000/auth/login', loginInfo)
            
            Toast.fire({
                icon: 'success',
                title: 'Logado com sucesso'
            })
            localStorage.setItem('token', res.data.token)
            router.push("/conta")
        } catch (err: any) {
            Toast.fire({
                icon: 'error',
                title: 'Credenciais inválidas',
                text: err.response.data.err
            })
        }
    }

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

            <h1 className="text-3xl text-center my-16 xl:my-8 font-semibold">Login</h1>

            <form onSubmit={submitLogin} className="flex text-lg flex-col gap-5 items-center">
                <label>
                    <span>Email</span><br />
                    <input className="input" type="email" placeholder="exemplo@gmail.com" name="email" value={loginInfo.email} onChange={handleChange} />
                </label>
                <label>
                    <span>Senha</span><br />
                    <input className="input" type="password" placeholder="Senha" name="password" value={loginInfo.password} onChange={handleChange} />
                </label>

                <button type="submit" className="text-white bg-blue-400 transition-all hover:bg-blue-500 rounded-3xl px-4 py-2">
                    Entrar
                </button>
            </form>

            <p className="text-center mt-8">
                Não possui conta? <a href={'/cadastro'} className="text-blue-500">Registre-se aqui</a>
            </p>
        </>
    )
}

export default LoginPage;