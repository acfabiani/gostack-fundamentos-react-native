## :rocket: Sobre o desafio
Criar uma nova aplicação, a GoMarketplace. Dessa vez é hora de você praticar o que você aprendeu até agora no React Native junto com o TypeScript, utilizando rotas, Async Storage e a Context API.

### Utilizando uma fake API
Antes de tudo, para que você tenha os dados para exibir em tela, criamos um arquivo que você poderá utilizar como fake API para te prover esses dados.

Para isso, deixamos instalado no seu package.json uma dependência chamada `json-server`, e um arquivo chamado `server.json` que contém os dados para uma rota `/products`. Para executar esse servidor você pode executar o seguinte comando:
```bash
yarn json-server server.json -p 3333
```

### Funcionalidades da aplicação

- **`Listar os produtos da fake API`**: Sua página `Dashboard` deve ser capaz de exibir uma listagem através de uma tabela, com os campos `title`, `image_url` e `price`.

**Dica**: Você pode utilizar a função [Intl](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) para formatar os valores. Dentro da pasta `utils` no template você encontrará um código para te ajudar.

- **`Adicionar itens ao carrinho`**: Em toda sua aplicação, você deve utilizar o Contexto chamado `cart` que deixamos disponível. Você vai precisar completar as funcionalidades dentro de `hooks/cart.tsx` para que você consiga adicionar itens ao carrinho.

**Dica**: No seu contexto de carrinho, utilize uma propriedade chamada `quantity` para controlar quantos desse item existem no seu carrinho.

**Dica 2**: Caso um produto que você está adicionando já exista no carrinho, apenas altere a quantidade dele no seu contexto para evitar itens duplicados.

- **`Exibir itens do carrinho`**: Na página `Cart` você deve exibir todos os itens do carrinho, junto com a quantidade, valor único, valor subtotal dos itens e total de todos os items.

- **`Aumentar quantidade de itens do carrinho`**: Na página `Cart` você deve permitir que o usuário aumente a quantidade de itens do mesmo produto, para isso você pode utilizar a função `increment` dentro do seu contexto em `/src/hooks/cart.tsx`.

- **`Diminuir quantidade de um item do carrinho`**: Na página `Cart` você deve permitir que o usuário decremente a quantidade de itens do mesmo produto, para isso você pode utilizar a função `decrement` dentro do seu contexto em `/src/hooks/cart.tsx`.

- **`Exibir valor total dos itens no carrinho`**: Tanto na página `Dashboard`, tanto na página `Cart` você deve exibir o valor total de todos os itens que estão no seu carrinho.

### Específicação dos testes

Para esse desafio temos os seguintes testes:

- **`should be able to list the products`**: Para que esse teste passe, sua aplicação deve permitir que sejam listados na sua tela `Dashboard`, toda os produtos que são retornadas do Fake API. Essa listagem deve exibir o `title` e o `price` que deve ser formatado utilizando a função `Intl`.

- **`should be able to add a product to the cart`**: Para que esse teste passe, você deve permitir que seja possível adicionar produtos da sua `Dashboard` ao carrinho, utilizando o contexto de `cart` disponibilizado.

- **`should be able to list the products on the cart`**: Para que esse teste passe, você deve permitir que seja possível listar os produtos que estão salvos no contexto do seu carrinho na página `Cart`, nessa página exiba o nome do produto e o subtotal total de cada produto (price \* quantity).

- **`should be able to calculate the cart total`**: Para que esse teste passe, tanto na página `Dashboard`, tanto na página `Cart` você deve exibir o valor total de todos os itens que estão no seu carrinho.

**Dica**: Para calcular o total de todos os itens, você pode utilizar o [reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) para somar todos os valores e retornar o valor total.

- **`should be able to show the total quantity of itens in the cart`**: Para que esse teste passe, tanto na página `Dashboard`, tanto na página `Cart` você deve exibir o número total de itens que estão no seu carrinho.

**Dica**: Para calcular o total de todos os itens, você pode utilizar o [reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) para somar todos os valores e retornar o valor total.

**Dica 2**: Utilize o useMemo para armazenar o valor total do carrinho que você calculou.

- **`should be able to increment product quantity on the cart`**: Para que esse teste passe, você deve permitir que seja possível incrementar a quantidade de um produto do seu carrinho, utilizando o contexto de `cart` disponibilizado.

- **`should be able to decrement product quantity on the cart`**: Para que esse teste passe, você deve permitir que seja possível decrementar a quantidade de um produto do seu carrinho, utilizando o contexto de `cart` disponibilizado.

**Dica**: Ao decrementar a quantidade de um produto, não permita que ele seja decrementado para um valor negativo, sendo a quantidade mínima 1 para estar no carrinho.

- **`should be able to navigate to the cart`**: Para que esse teste passe, no seu componente `FloatingCart` na Dashboard, você deve permitir que ao clicar no botão de carrinho com o testID de `navigate-to-cart-button`, o usuário seja redirecionado para a página `Cart`.

- **`should be able to add products to the cart`**: Para que esse teste passe, no seu arquivo onde contém o contexto do carrinho, você deve permitir que a função `addToCart` adicione um novo item ao carrinho.

- **`should be able to increment quantity`**: Para que esse teste passe, no seu arquivo onde contém o contexto do carrinho, você deve permitir que a função `increment` incremente em `1` unidade a quantidade de um item que está armazenado no contexto.

- **`should be able to decrement quantity`**: Para que esse teste passe, no seu arquivo onde contém o contexto do carrinho, você deve permitir que a função `decrement` decremente em `1` unidade a quantidade de um item que está armazenado no contexto.

- **`should store products in AsyncStorage while adding, incrementing and decrementing`**: Para que esse teste passe, no seu arquivo onde contém o contexto do carrinho você deve permitir que todas as atualizações que você fizer no carrinho, sejam salvas no AsyncStorage. Por exemplo, ao adicionar um item ao carrinho, adicione-o também no AsyncStorage. Lembre de também atualizar o valor do AsyncStorage quando você incrementar ou decrementar a quantidade de um item.

- **`should load products from AsyncStorage`**: Para que esse teste passe, no seu arquivo onde contém o contexto do carrinho, você deve permitir que todos os produtos que foram adicionados sejam buscados do AsyncStorage.

## :blue_book: Principais conceitos
### `Node`
- #### Arquitetura Event-loop
    Baseada em eventos e o ponto central de sua arquitetura se chama *Call Stack* executado em forma de pilha *(o último que entra é o primeiro que sai)* através de um loop eterno.
- #### Single-thread
    Executado em uma única thread do processador, porém em background utiliza libs do C++, a mais famosa delas é a libuv, e essa lib permite usar múltiplas threads do processamento.
- #### Non-blocking I/O
    A conexão se mantém aberta, possibilitando retorno das informações em partes.

### `API`
- #### Fluxo da requisição
    Cliente - servidor - cliente
- #### Benefícios
    - Múltiplos clientes (front-end), mesmo back-end
    - Protocolo de comunicação padronizado. (JSON)
- #### Tipos de parâmetros
    - **Query Params**: Filtros e paginação
    - **Route Params**: Identificar recursos (Atualizar/Deletar)
    - **Request Body**: Conteúdo na hora de riar ou editar um recurso (JSON)
- #### HTTP codes
    - **1xx**: Informational
    - **2xx**: Success
        - 200: SUCCESS
        - 201: CREATED
    - **3xx**: Redirection
        - 301: MOVED PERMANENTLY
        - 302: MOVED
    - **4xx**: Client Error
        - 400: BAD REQUEST
        - 401: UNAUTHORIZED
        - 404: NOT FOUND
    - **5xx** Server Error
        - 500: INTERNAL SERVER ERROR

## :carousel_horse: Como usar
- Clone o repositório
- Baixe as dependências
    ```bash
    $ yarn
    ```
- Rode a API
    ```bash
    $ yarn dev
    ```
- Para rodar os testes
    ```bash
    $ yarn test
    ```
---
Feito com :hearts: by acfabiani :unicorn:
