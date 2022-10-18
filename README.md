# S5-19 | 🏁 Entrega: KImóveis - TypeORM com Relacionamentos

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````


**Atenção:** é necessário utilizar o `yarn` pois esse projeto foi iniciado com esse gerenciador de pacotes.

Para verificar se já possui o gerenciador yarn instalado utilize o seguinte comando:

````
yarn --version
````

Caso não possua o yarn instalado, utilize o comando abaixo para instalar globalmente na sua máquina:

````
npm install --global yarn
````
<br>


Essa entrega já está com o Docker configurado, basta preencher as variáveis de ambiente no .env

Basta buildar e subir nossos containers usando o comando padrão:
````
docker-compose up --build
````

ou
````
docker compose up --build
````
O comando pode variar com a versão do docker compose instalada em sua máquina

***ATENÇÃO:*** a porta utilizada para rodar nosso docker é a `5431`.
Caso tenha algum problema com essa porta, basta alterá-la no docker-compose.yml.

<br>

# **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --all
````
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

#



### Agora que já sabe como iniciar o seu projeto e rodar os testes, é hora de colocar a mão no código!