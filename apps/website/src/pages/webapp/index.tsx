import { NextPage } from "next";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { getAuthHeaders, UserInfo } from "../../util";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { HiCreditCard } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import Link from "next/link";


const WebApp: NextPage = () => {
    const { user, isLoading } = useUserOrRedirect();

    if (isLoading) return <LoadingSpinner />;
    
    return (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <Application user={user!} />
    )
}

const Application = ({ user }: { user: UserInfo }) => {
  const orig = 'http://localhost:4000';
  const imgLoader = ({ src }: any) => {
    if (!src.startsWith('http')) {
      return `${orig}${src}`
    } else {
      return src
    }
  }

  return (
    <div className="bg-[#2B607D]">
      <Link href="/">
        <FiLogOut className="absolute z-10 top-2 right-2 text-white w-6 h-6" />
      </Link>
      <div className="flex items-center justify-around py-4">
        <div className="border-2 border-white rounded-full w-[7.5rem] h-[7.5rem] overflow-hidden">
          <Image loader={imgLoader} src={user.picture} alt="profile picture" layout="fixed" height={125} width={125} priority />
        </div>
        <div>
          <Link href="/conta">
            <p className="text-white text-lg font-semibold">{user.conta.dotto_id}</p>  
          </Link>
        </div>
      </div>
      <HomeApp user={user}/>
    </div>
  )
}

type Action = { icon: JSX.Element, text: string, to: string };

const ActionButtons: Action[] = [
  { icon: <GiReceiveMoney className="w-12 h-12 mx-auto mt-4"/>, text: 'Depósito', to: '/webapp/deposito' },
  { icon: <GiTakeMyMoney className="w-12 h-12 mx-auto mt-4" />, text: "Pix", to: '/webapp/pix' },
  { icon: <HiCreditCard className="w-12 h-12 mx-auto mt-4"/>, text: "Cartões", to: '/webapp/cartoes' },
  { icon: <GiPayMoney className="w-12 h-12 mx-auto mt-4"/>, text: "Transferência", to: '/webapp/transferencia' }
]

const HomeApp = ({ user }: { user: UserInfo }) => {

  return (
    <div className="text-white">
      <div className="pl-8">
        <h2 className="text-2xl">Seu saldo</h2>
        <Saldo value={user.conta.saldo}/>
      </div>
      <br />
      <div className="ml-8 flex items-center gap-2 overflow-x-scroll p-4 pl-0">
        {ActionButtons.map((action, idx) => {
          return <Button key={idx} {...action} />
        })}
      </div>
      <div className="bg-white rounded-t-3xl text-black mt-2 px-6 pt-8">
        <div className="flex flex-col gap-2 items-center justify-between mx-auto">
          <Image src="/moneyEmoji.png" alt="" width={80} height={80} priority/>
          <p className="text-2xl text-center">Empréstimo <span className="text-[#3F83A9] font-semibold">premium</span> para <span className="text-[#3F83A9] font-bold">todos!</span></p>
        </div>
        <Link href="/webapp/emprestimo">
          <button className="bg-[#3F83A9] text-white border-none rounded-3xl px-4 py-1 w-full mt-4 text-xl font-semibold">Quero o meu!</button>
        </Link>
      </div>
    </div>
  )
}

const Saldo = ({ value }: { value: number }) => {
  const [show, setShow] = useState(true);

  return (
      <div className="text-2xl flex items-center gap-2">
        <span>R$ </span>
        {show ? (
          <p>{'*'.repeat(10)}</p>
        ) : (
          <p>{value.toFixed(2).replace('.', ',')}</p>
        )}

        <span className="cursor-pointer" onClick={() => setShow(p => !p)}>
          {show ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>
  )
}

const Button = ({ icon, text, to }: Action) => {
  const router = useRouter();

  return (
    <div className="w-24 h-24 rounded-xl flex flex-col shrink-0 bg-[#3F83A9] md:hover:bg-[#336d8f] transition-all md:cursor-pointer box-border" onClick={() => router.push(to)}>
      {icon}
      <p className="text-md text-center">{text}</p>
    </div>
  )
}

export const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div role="status">
        <svg aria-hidden="true" className="mr-2 w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  </div>
)

export const useUserOrRedirect = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      const token = localStorage.getItem('token')
  
      if (!token) {
        Swal.mixin({
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).fire({
          title: 'Para acessar o WebApp, é necessário estar logado.',
          icon: 'info'
        })
        router.push("/login")
      } else {
        axios.get('http://localhost:4000/auth/me', { headers: getAuthHeaders() })
          .then((res: any) => {
            const _user = res.data.user;
            _user.hasPicture = _user.picture.split('/').slice(-1)[0] !== 'picture-placeholder.webp'
            setUser(_user)
            setIsLoading(false)
          })
          .catch(err => {
            console.log(err);
            Swal.mixin({
              toast: true,
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            }).fire({
              title: 'Sua sessão expirou, logue novamente para acessar o WebApp.',
              icon: 'info'
            })
            router.push("/login")
          })
      }
    }, [router])

    const refetch = () => {
      axios.get('http://localhost:4000/auth/me', { headers: getAuthHeaders() })
          .then((res: any) => {
            const _user = res.data.user;
            _user.hasPicture = _user.picture.split('/').slice(-1)[0] !== 'picture-placeholder.webp'
            setUser(_user)
          })
          .catch(err => {
            console.log(err);
            Swal.mixin({
              toast: true,
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            }).fire({
              title: 'Sua sessão expirou, logue novamente para acessar o WebApp.',
              icon: 'info'
            })
            router.push("/login")
          })
    }

    return { user, isLoading, refetch }
}

export default WebApp;