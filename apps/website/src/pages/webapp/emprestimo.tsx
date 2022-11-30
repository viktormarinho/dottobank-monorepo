import { useEffect, useState } from "react";
import { LoadingSpinner, useUserOrRedirect } from ".";
import axios from 'axios';
import { getAuthHeaders } from "../../util";
import { useRouter } from "next/router";
import { AddValueChip } from "./deposito";
import Swal from 'sweetalert2';

const EmprestimoRoute = () => {
    const { user, isLoading } = useUserOrRedirect();
    const emprestimos = useEmprestimos();
    const [value, setValue] = useState('0');
    const router = useRouter();

    const handleAddValue = (valueToAdd: string) => {
        setValue(prev => (Number(valueToAdd) + Number(prev)).toString())
    }

    const handleEmprestimo = async () => {
        const depositValue = Number(value);

        axios.post('http://localhost:4000/app/emprestimo', { value: depositValue }, { headers: getAuthHeaders() })
            .then(res => {
                if (res.data.emprestimo.status === "Aprovado") {
                    Swal.mixin({
                        toast: true,
                        position: 'bottom',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    }).fire({
                        title: 'Empréstimo requerido com sucesso, e aceito na hora! Parabéns!',
                        icon: 'success'
                    });
                } else {
                    Swal.mixin({
                        toast: true,
                        position: 'bottom',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    }).fire({
                        title: 'Empréstimo requerido com sucesso, e irá para análise.',
                        icon: 'success'
                    });
                }

                emprestimos.pushEmprestimo(res.data.emprestimo);
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
            <h2 className="text-2xl">Seus Empréstimos</h2>
            <div className="flex flex-col gap-4 w-full px-4">
                {emprestimos.isLoading ? (
                    <LoadingSpinner />
                ): (
                    emprestimos.data?.length === 0 ? (
                        <p>Você ainda não possui nenhum empréstimo!</p>
                    ) : (
                        emprestimos.data!.map((emp, idx) => {
                            return <Emprestimo key={idx} emprestimo={emp} /> 
                        })
                    )
                )}
            </div>
            <h1 className="text-center text-2xl px-4">Requisite um empréstimo abaixo.</h1>
            <input type="number" className="input" onChange={(e) => setValue(e.target.value)} value={value} />
            <div className="flex gap-2">
                <AddValueChip value="10" onClick={handleAddValue} />
                <AddValueChip value="20" onClick={handleAddValue} />
                <AddValueChip value="50" onClick={handleAddValue} />
                <AddValueChip value="100" onClick={handleAddValue} />
            </div>
            <div className="w-full md:max-w-sm flex flex-col gap-4 px-16">
                <button onClick={handleEmprestimo} className="text-white text-xl bg-[#3F83A9] hover:bg-[#377294] rounded-lg py-1 w-full">Requerir empréstimo</button>
                <button onClick={() => router.push('/webapp')} className="text-xl bg-[#ebebeb] hover:bg-[#e4e4e4] rounded-lg py-1 w-full">Cancelar</button>
            </div>
        </div>
    )
}

const Emprestimo = ({ emprestimo }: { emprestimo: EmprestimoRegister }) => {
    return (
        <div className="rounded-xl mx-4 bg-slate-300 p-2 text-black flex flex-col gap-2 text-lg">
            <h2 className="font-bold">Status: {emprestimo.status}</h2>
            <h2 className="">Valor: R$ {emprestimo.valor.toFixed(2)}</h2>
        </div>
    )
}

type EmprestimoRegister = {
    id?: string
    status: string
    valor: number
    userId: string
}

const useEmprestimos = () => {
    const [data, setData] = useState<EmprestimoRegister[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:4000/app/emprestimos', { headers: getAuthHeaders() })
            .then(res => {
                setData(res.data.emprestimos);
                setIsLoading(false);
            })
    }, []);

    const pushEmprestimo = (emprestimo: EmprestimoRegister) => {
        if (data) {
            setData(prev => ([emprestimo, ...prev!]))
        }
    }

    return { data, isLoading, pushEmprestimo };
}

export default EmprestimoRoute;