import { NextPage } from "next";
import Header from "../components/Header";
import Head from 'next/head';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useRouter } from "next/router";
import Image from "next/image";
import axios from 'axios';
import Modal from 'react-modal';
import { getAuthHeaders } from "../util";

Modal.setAppElement('#__next')


const Cartao: NextPage = () => {

  const router = useRouter()
  const [user, setUser] = useState<any>()
  const [cards, setCards] = useState<any>({
    carregando: true
  })
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<any>()

  const orig = 'http://localhost:4000'

  const imgLoader = ({ src }: any) => {
    if (!src.startsWith('http')) {
      return `${orig}${src}`
    } else {
      return src
    }
  }

  const fetchCards = async () => {
    const { data } = await axios.get("http://localhost:4000/web/get-cards", { headers: getAuthHeaders() })
    setCards({ carregando: false, cards: data.cards })
  }

  const createCard = async () => {
    Swal.mixin({
      toast: true,
      position: 'top',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).fire({
      title: 'Solicitando seu cartão...',
      icon: 'info'
    })

    await axios.post("http://localhost:4000/web/generate-card", {}, { headers: getAuthHeaders() })
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        confirmButtonText: 'Oba!',
        title: 'Cartão gerado com sucesso.',
        didClose() {
          router.reload()
        }
      })
    }, 3000)
  }

  const selectImage = (evt: any) => {
    setSelectedFile(evt.target.files[0])
  }

  const sendFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile)
      const res = await axios.post("http://localhost:4000/web/upload-pfp/", formData, { headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" } })
      setModalOpen(false)

      if (res.status == 200) {
        res.data.newUser.hasPicture = true;
        console.log(res.data);
        setUser(res.data.newUser)

        Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        }).fire({
          title: 'Foto atualizada com sucesso.',
          icon: 'success'
        })
      }
    } catch (err) {
      Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      }).fire({
        title: 'Houve um problema ao atualizar sua foto.',
        icon: 'error'
      })
      console.log(err)
    }
  }

  useEffect(() => {
    let token: any = localStorage.getItem('token')

    if (!token) {
      Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).fire({
        title: 'Para acessar sua conta, é necessário estar logado.',
        icon: 'info'
      })
      router.push("/login")
    } else {
      axios.get('http://localhost:4000/auth/me', { headers: getAuthHeaders() })
        .then((res: any) => {
          const user = res.data.user;
          user.hasPicture = user.picture.split('/').slice(-1)[0] !== 'picture-placeholder.webp'
          setUser(user)
          fetchCards()
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
            title: 'Sua sessão expirou, logue novamente para acessar a conta.',
            icon: 'info'
          })
          router.push("/login")
        })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Dotto bank</title>
        <meta name="description" content="Banco digital legal" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <h1 className="text-xl text-center font-semibold">Envie sua foto</h1>
        <div className="mt-12 flex items-center justify-center">
          <label className="bg-blue-400 hover:bg-blue-600 transition-all py-2 px-4 rounded-2xl text-white text-center cursor-pointer">
            Selecionar
            <input className="hidden" type="file" name="picture" id="picture" accept="image/png, image/jpeg" onChange={selectImage} />
          </label>
        </div>
        <div className="max-w-xs mx-auto rounded-xl text-center h-40 mt-8 overflow-hidden">
          {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
        </div>
        <div className="max-w-xs mx-auto rounded-xl text-center h-40 overflow-hidden">
          <button
            className="bg-blue-400 hover:bg-blue-600 transition-all py-2 px-4 rounded-2xl text-white text-center cursor-pointer disabled:opacity-30"
            disabled={!selectedFile}
            onClick={sendFile}
          >
            Enviar
          </button>
        </div>
      </Modal>
      <div className="absolute hidden xl:block z-[-2] bg-blue-400 top-0 right-0
      w-[55vw] xl:rounded-bl-[10rem] xl:h-[16vh] 2xl:h-[16vh] fhd:h-[14vh]"></div>
      <Header />
      <div className="mt-8 mx-auto flex flex-col items-center gap-4 p-4">
        <div className="flex flex-col text-center">
          {user
            ?
            <>
              <div className="flex justify-between gap-2 items-center">
                <div>
                  <Image loader={imgLoader} src={user.picture} alt="profile picture" layout="fixed" height={125} width={125} priority className="rounded-full" />
                  <br />
                  <span className="text-blue-600"><button onClick={() => setModalOpen(true)}>{user.hasPicture ? 'Atualizar foto' : 'Adicionar Foto'}</button></span>
                </div>
                <div className="text-lg">
                  <p>Dotto Unique ID</p>
                  <p className="font-bold">{user.conta.dotto_id}</p>
                </div>
              </div>
              <br />
              <p>CPF: <span className="font-semibold">{user.cliente.cpf}</span></p>
              <p>Telefone: <span className="font-semibold">{user.cliente.telefone}</span></p>
              <p>Email: <span className="font-semibold">{user.email}</span></p>
              <p>Data de Nascimento: <span className="font-semibold">{new Date(user.cliente.nascimento).toLocaleDateString()}</span></p>
              <div className="mt-4">
                <h1 className="text-center text-lg font-semibold underline">Seus Cartões</h1>
                {cards.carregando ? <p>Carregando...</p> : cards.cards.map((card: any) => {
                  return (
                    <div className="flex text-left flex-col bg-slate-200 rounded py-2 px-4 mt-1" key={card.numero}>
                      <p className="font-semibold">Número: {card.numero}</p>
                      <div className="flex justify-between">
                        <p className="font-semibold">Validade: {card.validade.length == 4 ? '0' : ''}{card.validade}</p>
                        <p className="font-semibold text-blue-500">CVV: {card.codigoSeguranca}</p>
                      </div>
                      <p className="font-semibold">Limite: R$ {card.limite}</p>
                    </div>
                  )
                })}
                {!cards.carregando && cards.cards.length == 0 && <p>Você ainda não possui nenhum cartão</p>}
              </div>
              <div className="mt-16">
                <button className="rounded-3xl bg-blue-400 text-white px-4 py-2 font-semibold" onClick={createCard}>Solicitar novo cartão</button>
              </div>
            </>
            :
            <p>Carregando...</p>
          }
        </div>
      </div>
    </>
  )

}

export default Cartao