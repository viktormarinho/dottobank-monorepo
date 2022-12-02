import { useState } from "react";
import { LoadingSpinner, useUserOrRedirect } from ".";
import axios from 'axios';
import { getAuthHeaders } from "../../util";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';


const DepositoRoute = () => {
    const { user, isLoading } = useUserOrRedirect();
    const [value, setValue] = useState('0');
    const router = useRouter();

    const handleAddValue = (valueToAdd: string) => {
        setValue(prev => (Number(valueToAdd) + Number(prev)).toString())
    }

    const handleDeposit = async () => {
        const depositValue = Number(value);

        await axios.post('http://localhost:4000/app/deposit', { contaId: user?.conta.id, value: depositValue }, { headers: getAuthHeaders() });

        Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        }).fire({
            title: 'Depósito efetuado com sucesso',
            icon: 'success'
        });

        router.push('/webapp')
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full flex flex-col items-center gap-4 mt-16">
            <h2 className="text-center text-lg">Olá, {user?.cliente.username}!</h2>
            <h1 className="text-center text-2xl px-4">Digite o valor do depósito a ser realizado.</h1>
            <input type="number" className="input" onChange={(e) => setValue(e.target.value)} value={value} />
            <div className="flex gap-2">
                <AddValueChip value="10" onClick={handleAddValue} />
                <AddValueChip value="20" onClick={handleAddValue} />
                <AddValueChip value="50" onClick={handleAddValue} />
                <AddValueChip value="100" onClick={handleAddValue} />
            </div>
            <div className="md:w-96 w-full flex flex-col gap-4 px-16">
                <button onClick={handleDeposit} className="text-white text-xl bg-[#3F83A9] hover:bg-[#377294] rounded-lg py-1 w-full">Efetuar depósito</button>
                <button onClick={() => router.push('/webapp')} className="text-xl bg-[#ebebeb] hover:bg-[#e4e4e4] rounded-lg py-1 w-full">Cancelar</button>
            </div>
        </div>
    )
}

export const AddValueChip = ({ value, onClick }: { value: string, onClick: (value: string) => void }) => {
    return <button className="rounded-3xl border w-12 hover:bg-slate-100" onClick={() => onClick(value)}>{value}</button>
}

export default DepositoRoute;