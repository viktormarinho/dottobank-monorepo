import { useState } from "react";
import { LoadingSpinner, useUserOrRedirect } from ".";
import axios from 'axios';
import { getAuthHeaders } from "../../util";
import { useRouter } from "next/router";
import { AddValueChip } from "./deposito";
import Swal from 'sweetalert2';

const TransferenciaRoute = () => {
    const { user, isLoading } = useUserOrRedirect();
    const [value, setValue] = useState('0');
    const [toId, setToId] = useState('');
    const router = useRouter();

    const handleAddValue = (valueToAdd: string) => {
        setValue(prev => (Number(valueToAdd) + Number(prev)).toString())
    }

    const handlePix = async () => {
        const depositValue = Number(value);

        axios.post('http://localhost:4000/app/transferencia', { to: toId, value: depositValue }, { headers: getAuthHeaders() })
            .then(res => {
                Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                }).fire({
                    title: 'Transferência enviada com sucesso',
                    text: 'Taxa: ' + res.data.taxa,
                    icon: 'success'
                });
                router.push('/webapp');
            })
            .catch(err => {
                Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                }).fire({
                    title: err.response.data.err,
                    icon: 'error'
                });
                console.log(err);
            })

    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full flex flex-col items-center gap-8 mt-16">
            <h2 className="text-center text-lg">Olá, {user?.cliente.username}!</h2>
            <h1 className="text-center text-2xl px-4">Digite o valor da transferência a ser enviada.</h1>
            <p>Importante: Transferências são taxadas em 10%.</p>
            <input type="number" className="input" onChange={(e) => setValue(e.target.value)} value={value} />
            <div className="flex gap-2">
                <AddValueChip value="10" onClick={handleAddValue} />
                <AddValueChip value="20" onClick={handleAddValue} />
                <AddValueChip value="50" onClick={handleAddValue} />
                <AddValueChip value="100" onClick={handleAddValue} />
            </div>
            <h1 className="text-center text-2xl px-4">Digite o dottoId da pessoa que receberá o pagamento.</h1>
            <input type="text" className="input" onChange={(e) => setToId(e.target.value)} value={toId} placeholder="@ViniciusFerreira" />
            <div className="w-full md:max-w-sm flex flex-col gap-4 px-16">
                <button onClick={handlePix} className="text-white text-xl bg-[#3F83A9] hover:bg-[#377294] rounded-lg py-1 w-full">Transferir</button>
                <button onClick={() => router.push('/webapp')} className="text-xl bg-[#ebebeb] hover:bg-[#e4e4e4] rounded-lg py-1 w-full">Cancelar</button>
            </div>
        </div>
    )
}

export default TransferenciaRoute;