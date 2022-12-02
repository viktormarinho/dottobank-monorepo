import { useEffect, useState } from "react";
import { LoadingSpinner, useUserOrRedirect } from ".";
import axios from 'axios';
import { getAuthHeaders } from "../../util";
import Link from "next/link";
import { useRouter } from "next/router";

const CartoesRoute = () => {
    const { user, isLoading } = useUserOrRedirect();
    const cards = useCards();
    const router = useRouter();

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full flex flex-col items-center gap-8 mt-16">
            <h2 className="text-2xl">Seus Cartões</h2>
            <div className="flex flex-col gap-4 w-full px-4">
                {cards.isLoading ? (
                    <LoadingSpinner />
                ): (
                    cards.data?.length === 0 ? (
                            <p className="text-center">Você ainda não possui nenhum cartão!</p>
                    ) : (
                        cards.data!.map((card, idx) => {
                            return <Card key={idx} card={card} /> 
                        })
                    )
                )}
            </div>
            <Link href="/conta">
                <p className="text-center text-blue-500 underline cursor-pointer">É possível pedir cartões pelo site, na aba de Conta.</p>
            </Link>
            <button onClick={() => router.push('/webapp')} className="text-xl bg-[#ebebeb] hover:bg-[#e4e4e4] rounded-lg py-1 w-96">Retornar</button>
        </div>
    )
}

const Card = ({ card }: { card: CardData }) => {
    return (
        <div className="rounded-xl mx-4 border shadow-xl p-8 text-black flex flex-col gap-2 text-lg md:w-96 md:mx-auto">
            <p className="font-semibold">{card.numero}</p>
            <p>Validade: {card.validade} - CVV: {card.codigoSeguranca}</p>
            <p>Limite: R$ {card.limite.toFixed(2)}</p>
            <p>Fatura Atual: R$ {card.fatura.toFixed(2)}</p>
        </div>
    )
}

type CardData = {
    id?: string
    numero: string
    validade: string
    codigoSeguranca: string
    limite: number
    fatura: number
    userId: string
}

const useCards = () => {
    const [data, setData] = useState<CardData[]>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchCards = async () => {
        const { data } = await axios.get("http://localhost:4000/web/get-cards", { headers: getAuthHeaders() })
        setData(data.cards);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCards();
    }, []);

    return { data, isLoading };
}

export default CartoesRoute;