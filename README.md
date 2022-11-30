Como rodar este repositório:

Utilize o `git clone` para clonar na sua máquina.

Entre na pasta.

`pnpm install`

Entre na pasta do servidor com o comando `cd apps/server/`.

Digite `pnpm prisma db push` para gerar o banco de dados a partir do schema do prisma.

Agora volte para a raiz do diretório com `cd ../..`

`pnpm run dev`
  
Abra o app no browser na porta 3000.
