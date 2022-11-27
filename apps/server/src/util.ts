import { getPrisma } from './database';
export const generateDottoId: (username: string, counter?: number) => Promise<string> = async (username: string, counter: number = 0) => {
    const prisma = getPrisma();
    
    let dottoId = '@' + username.split(' ').join('')
    if (counter > 0) {
        dottoId += `${counter}`;
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            conta: {
                dotto_id: dottoId
            }
        }
    });

    if (existingUser) {
        return generateDottoId(username, counter+1);
    }

    return dottoId;
}