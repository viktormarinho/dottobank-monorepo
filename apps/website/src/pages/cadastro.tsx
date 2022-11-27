import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Swal from 'sweetalert2';
import { useRouter } from "next/router";

export interface CadastroData {
    email: string
    password: string
    username: string
    cliente: {
        username: string
        cpf: string
        sexo: string
        nascimento: string
        telefone: string
    }
    conta: {
        dotto_id: string
        tipo: string
        saldo: number
    }
}

const RegistroPage: NextPage = () => {
    const [cadastroData, setCadastroData] = useState<CadastroData>({
        email: '',
        password: '',
        username: '',
        cliente: {
            cpf: '',
            nascimento: '',
            sexo: 'M',
            telefone: '',
            username: ''
        },
        conta: {
            dotto_id: '',
            saldo: 0,
            tipo: 'S'
        }
    })

    const router = useRouter();
    const cpf = router.asPath

    useEffect(() => {
        let token: any = localStorage.getItem('token')

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

        if (cpf) {
            handleChange({
                target: {
                    name: "cliente.cpf",
                    value: cpf
                }
            })
        }
    }, [])


    const handleChange = (e: any) => {
        const name = e.target.name
        const value = e.target.value

        if (name.includes('.')) {
            const arr = name.split('.')
            setCadastroData({ ...cadastroData, [arr[0]]: { ...cadastroData.cliente, [arr[1]]: value } })
            if (arr[1] == 'cpf') {
                setCadastroData({ ...cadastroData, [arr[0]]: { ...cadastroData.cliente, [arr[1]]: cpfMask(value) } })
            }
        } else {
            setCadastroData({ ...cadastroData, [name]: value })
        }
    }

    const preenchaMessage = (campo: string) => {
        Swal.mixin({
            toast: true,
            position: 'top-start',
            timer: 3000,
            timerProgressBar: true,
        }).fire({
            icon: 'error',
            title: `Preencha o campo ${campo}`
        })
    }

    const submitCadastro = async (e: any) => {
        e.preventDefault()

        if (cadastroData.cliente.cpf === '') {
            preenchaMessage('CPF')
            return
        }

        if (cadastroData.email === '') {
            preenchaMessage('Email')
            return
        }

        if (cadastroData.username === '') {
            preenchaMessage('Username')
            return
        }

        if (cadastroData.username.includes(' ')) {
            Swal.mixin({
                toast: true,
                position: 'top',
                timer: 3000,
                timerProgressBar: true
            }).fire({
                title: 'Por favor, não utilize espaços no nome de usuário.',
                icon: 'error'
            })
            return
        }

        if (cadastroData.password === '') {
            preenchaMessage('Senha')
            return
        }

        if (cadastroData.password.length < 8) {
            Swal.mixin({
                toast: true,
                position: 'top',
                timer: 3000,
                timerProgressBar: true
            }).fire({
                title: 'Por favor, utilize uma senha de ao menos 8 caracteres.',
                icon: 'error'
            })
            return
        }

        if (cadastroData.cliente.nascimento === '') {
            preenchaMessage('Data de Nascimento')
            return
        }

        if (cadastroData.cliente.telefone === '') {
            preenchaMessage('Telefone')
            return
        }

        if (cadastroData.cliente.username === '') {
            preenchaMessage('Nome')
            return
        }

        try {
            const { data } = await axios.post('http://localhost:4000/auth/signup', cadastroData)

            Swal.fire({
                icon: 'success',
                title: `Bem-vindo, ${data.user.cliente.username}`,
                text: 'Conta criada com sucesso.',
                confirmButtonText: 'Oba!',
                didClose() {
                    router.push('/login')
                },
            })
        } catch (error) {
            console.log(error)
            Swal.mixin({
                toast: true,
                position: 'top',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).fire({
                title: 'Algo de errado aconteceu ao tentarmos te registrar.',
                icon: 'error'
            })
        }
    }

    const cpfMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
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

            <h1 className="text-center my-8 text-2xl font-semibold">Cadastro</h1>

            <form onSubmit={submitCadastro} className="flex text-lg flex-col gap-5 items-center">
                <label>
                    <span>CPF</span><br />
                    <input type="text" placeholder="XXX.XXX.XXX-XX" name="cliente.cpf" value={cadastroData.cliente.cpf} onChange={handleChange} className="input" />
                </label>
                <label>
                    <span>Email</span><br />
                    <input type="email" placeholder="exemplo@gmail.com" name="email" value={cadastroData.email} onChange={handleChange} className="input" />
                </label>
                <label>
                    <span>Nome de usuário</span><br />
                    <input type="text" name="username" placeholder="xaolinmatadordeporco" value={cadastroData.username} onChange={handleChange} className="input" />
                </label>
                <label>
                    <span>Nome Completo</span><br />
                    <input type="text" placeholder="João Equals Ignore" name="cliente.username" value={cadastroData.cliente.username} onChange={handleChange} className="input" />
                </label>
                <label>
                    <span>Senha</span><br />
                    <input type="password" placeholder="Senha" name="password" value={cadastroData.password} onChange={handleChange} className="input" />
                </label>
                <label>
                    <span>Telefone</span><br />
                    <input type="text" placeholder="(XX) XXXXX-XXXX" maxLength={15} name="cliente.telefone" value={cadastroData.cliente.telefone} onChange={handleChange} className="input" />
                </label>
                <label>
                    <span>Sexo</span><br />
                    <select name="cliente.sexo" value={cadastroData.cliente.sexo} onChange={handleChange} className="input cursor-pointer hover:bg-slate-50">
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </label>
                <label>
                    <span>Data de Nascimento</span><br />
                    <input type="date" name="cliente.nascimento" value={cadastroData.cliente.nascimento} onChange={handleChange} className="input" />
                </label>

                <button type="submit" className="text-white bg-blue-400 transition-all hover:bg-blue-500 rounded-3xl px-4 py-2">
                    Cadastrar
                </button>
            </form>
            <br /><br />
        </>
    )
}

export default RegistroPage;