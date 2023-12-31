###### 19/12/2023

```
npx expo init gatito
npx expo start
npm run test
npm run api
npm install webpack-dev-server
npm cache clean -f
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config
```

Curso de React Native: criando testes para sua aplicação

@01-Fundamentos de Teste

@@01
Apresentação

[00:00] Olá, eu sou a Natália Kelim Thiel, instrutora aqui da Alura e nesse curso vamos aprender a criar testes para a nossa aplicação React Native.
[00:09] Esse curso é para você: Se você já está habituado a criar componentes de React Native no seu dia a dia; se você já utiliza hooks também, de efeitos e de estado, os hooks mais básicos mesmo; e se você quiser ir além disso, se você pretender criar aplicações confiáveis e com menos bugs. Porque, com testes automatizados conseguimos, criar uma automatização que rode no terminal e que faça testes para nós sem que precisemos testar toda a nossa aplicação manualmente.

[00:43] O terminal é que vai testar para nós. Parece muito bom. Vamos ver que aplicação que vamos ter nesse curso, vamos ter uma aplicação que vai simular leilões. Vamos ter uma lista de leilões, uma tela com leilão, os lances e vamos também poder efetuar lances. Essa aplicação já vai centrar ali pronta para nós, só vamos testar. Porque isso aqui não importa muito qual aplicação é exatamente.

[01:13] E o que vamos aprender nesse curso, já que já vamos ter a aplicação pronta? Vamos aprender a testar funções isoladas, também vamos aprender a testar componentes React Native mesmo, testá-los em memória e vamos testar hooks, vamos conseguir testar os nossos próprios hooks customizáveis além de simular funções. Se quisermos simular alguma função externa que requisita a API, sendo não queremos que requisite a API, podemos simular essa função sem que façamos de fato a requisição, mas o nosso teste continue funcionando.

[01:52] É isso que vamos aprender nesse curso. Gostou do que viu aqui? Vamos lá.

@@02
Fundamentos de Teste

[00:00] Nesse vídeo vamos entender alguns fundamentos importantes de teste para que possamos saber quais são as possibilidades de teste da nossa aplicação e quais são os prós e contras de testar a nossa aplicação.
[00:12] Para esse vídeo vamos considerar que a Roberta, que é uma desenvolvedora de software, é muito feliz porque trabalha em casa, ela trabalha Home Office. Ela estava lá indo na cozinha buscar um café, esperando o café passar e começou a checar o chat da empresa no celular e eis que ela se depara com um monte de mensagens falando que o que ela acabou de publicar está dando problema para os clientes. Ela fica desesperada e vai resolver o problema, mas ela fica pensando, depois que tudo isso passou, "será que ela podia fazer alguma coisa para tentar evitar isso ter acontecido?"

[00:50] O que podemos tentar pensar em ajudar a Roberta, seria fazer esses testes automatizados. Como é que fazemos testes automatizados? O que são testes automatizados? Normalmente quando estamos desenvolvendo uma aplicação nós criamos uma funcionalidade nova e testa essa funcionalidade na mão mesmo preencheram os dados ou apertamos no botão para ver se o que fizemos está funcionando.

[01:17] Mas, conforme a aplicação cresce fica difícil controlar onde que estamos mexendo exatamente. Porque pode ser que alteramos, como a Roberta alterou, uma coisa e fez com que causasse um bug em outra coisa que ela não chegou nem a perceber que tinha afetado. Por isso podemos fazer testes automatizados, podemos fazer automações, criar scripts que facilitam e nos ajudam a testar toda a aplicação antes de publicarmos e vermos se tudo que tínhamos funcionando antes também está funcionando agora.

[01:54] Alguns desses testes automatizados podemos, inclusive, fazer no próprio terminal. Não precisamos abrir o simulador em todas as vezes e testar manualmente, podemos fazer com que o terminal faça isso para nós, o computador testa sozinho. Além do que já falamos, que poderia descobrir o problema antes, temos que fazer o teste. Temos aqui um gráfico de esforço e tempo sobre se vale a pena mesmo fazer testes automatizados.

[02:28] Imagine que aqui no começo do gráfico, que fica à esquerda, seja o começo do nosso desenvolvimento da aplicação e a linha vermelha é como que estamos desenvolvendo a nossa aplicação de acordo com o tempo e o esforço.

Gráfico de linha. O eixo X corresponde ao Tempo e o eixo Y corresponde ao Esforço. Existem três linhas, todas saindo da posição 0 em X, mas acima de 0 em Y: a vermelha, que corresponde ao desenvolvimento "Sem testes", a laranja pontilhada, que corresponde ao desenvolvimento "Com testes ruins" e a verde claro tracejada, que corresponde a "Com testes". A vermelha é a que se inicia com menor Esforço, subindo levemente conforme avança no Tempo. Aproximadamente na metade do Tempo, ela sobe totalmente até o topo do Esforço. A linha laranja começa um pouco acima da vermelha no Esforço e segue no mesmo nível até um pouco depois da metade do eixo X, quando começa a ter um aumento constante de Esforço até o final do Tempo. A linha verde claro começa logo acima da laranja em relação ao Esforço, mas sobe linearmente à medida que avança o eixo Tempo.

[02:46] Aqui no começo a linha vermelha, que é sem testes, uma aplicação sem nenhum teste vai ter menos esforço para começar a desenvolver porque não precisamos nos preocupar com os testes. Porém conforme vai passando o tempo, a aplicação vai crescendo e vai virando uma bola de neve. Temos essa linha aqui do esforço subindo porque as coisas vão saindo do nosso controle.

[03:09] Temos também outras linhas aqui, por exemplo, essa pontilhada verde é a linha de Com testes. Se começamos criando testes, aqui começa já com um pouco mais de esforço, porque temos que pensar nos testes da nossa aplicação enquanto estamos desenvolvendo, mas podemos ver que o desenvolvimento continua com o esforço linear, ele continua aumentando esforço, mas não é um exponencial, que vira uma bola de neve que aumenta sem parar, ele vai aumentando conforme o tamanho da aplicação e o tempo aumenta também.

[03:50] E temos a possibilidade de fazer testes ruins. O que é teste ruim? Isso é muito é subjetivo, não existe um teste ruim, mas o que podemos levar em consideração sobre testes ruins é você testar simplesmente por testar e não pensar no requisito ensino, o que aquela funcionalidade precisa fazer. Sempre quando testamos é legal pensarmos no requisito, no que queremos que o usuário consiga fazer e que continue funcionando não só em quanto ifs tem lá dentro, nesses casos.

[04:26] Quando temos testes ruins começamos com um pouco mais de esforço, tem uma melhora, mas repare que também subimos um pouco mais rápido do que se tivéssemos testes de qualidade, teste de qualidade é sempre melhor.

[04:43] Dado o que já vimos nesse gráfico, vamos entender um pouco mais sobre os tipos de teste. Eu falei que alguns podem ser rodados no terminal e outros nem tanto. Vamos ver o que são esses tipos de testes e o que podemos testar na nossa aplicação.

[04:57] Começando com o teste de unidade que é o mais simples que temos e o mais comum também. Ele testa um comportamento isolado, por exemplo, temos no slide um teste de unidade que testa uma função soma e aí já temos escrito aqui no teste que "3 mais 2 deve retornar 5", queremos testar se a função, passando os valores 3 e 2, retorna o valor 5. Mais ou menos esse código aqui vai ser o que vamos fazer lá no JavaScript para testar essa função soma. Esse é um teste de unidade, ele testa uma única parte do código, um único método geralmente.

[05:36] Depois do teste de unidade nós também temos o teste de integração, que testa parecido com o teste de unidade, onde vamos chamar uma função geralmente, mas ele testa uma integração com outros módulos da aplicação, com outras coisas externas à aplicação. Não é somente uma função de soma que fizemos dentro da nossa aplicação. Geralmente vai ser o banco de dados, uma conexão com a API, alguma coisa externa.

[06:05] Por exemplo, esse teste do slide busca os cursos da API da Alura e ele espera que existam mais de 1300 cursos. Aqui vamos chamar uma função obterCursos() que vai bater na API, vai fazer uma requisição na API pela Web e vai retornar um resultado, digamos assim. Já está tudo pronto ali, a lista já está sendo retornada pronta para nós nessa variável resultado.

[06:34] E aí pegamos qual que é a quantidade dos cursos, quantos cursos temos e verificamos se ele é maior que 1300. Nesse teste estamos fazendo um teste de integração, porque, fazendo requisição diretamente para a API, estamos fazendo requisição usando coisas que são fora da nossa aplicação.

[06:56] Também temos um teste de interface, não só esses temos outros, mas o teste de interface testa uma aplicação real, algo mais parecido com que o usuário final vai utilizar. Podemos ver aqui que teremos que abrir a aplicação e rodar, ali por trás, um terminal também, mas vai rodar o simulador.

[07:21] Porque demora mais, como vocês podem ver. Vai carregando, mas ele vai preenchendo para nós os campos e testando se as coisas estão acontecendo, como é o exemplo dessa tela de login, que foi feita para testar os testes, digamos assim, para demonstrar esse teste.

[07:37] Ele faz vários fluxos e verifica o que passou, mas repare que ele demora muito mais. E é por essa diferença dos tempos que existe a pirâmide de testes. Nós podemos classificar os testes dentro de uma pirâmide, começando pelos testes de unidade que já vimos. Eles geralmente são a base da nossa pirâmide de testes, eles são os testes que vamos ter em mais quantidade. Porque temos uma menor fidelização, porém é mais barato e rápido. É barato fazermos esse teste da soma, não precisamos carregar nenhum simulador e nem nada tipo fazemos diretamente no terminal.

[08:22] A fidelização é a semelhança com a aplicação real. Nos testes de unidade temos a menor semelhança com o simulador mesmo. Estamos mais distantes do simulador porque estamos testando funções do nosso código. Já no teste de integração temos uma fidelização maior, porque estamos testando a tela mesmo da aplicação.

[08:46] Seguindo aqui na nossa pirâmide temos aqui no meio desses exemplos que trouxemos o teste de integração. Esse teste não vai ter em tanta quantidade quanto os teste de unidade, e está no meio da pirâmide, porque ele também precisa de mais recursos que os testes de unidade. Ele precisa que tenha conexão com a Internet, ele precisa acessar o banco de dados.

[09:10] Às vezes pode até acontecer dele falhar, mas não quer dizer que a nossa aplicação está com problema, e sim que a API possa estar com problema. Por isso temos que tomar cuidado e ver a necessidade de fazer teste de integração. Às vezes podem fazer apenas teste de unidade.

[09:27] Por fim, no topo da nossa pirâmide, que é onde teremos a menor quantidade de testes, há os testes de interface, de use interface, a sigla UI do inglês. Temos esses testes em menor quantidade porque é mais caro e mais lento, precisamos ter uma máquina que vai rodar esse simulador. Caso queiramos fazer esses testes na nuvem precisamos de um computador na nuvem que tenha a interface gráfica. Se fôssemos fazer só testes de unidade, não precisaríamos dessa interface gráfica, por isso que esse tipo de teste é mais caro e também mais lento.

Fundo branco com o título "Pirâmide de Testes" no centro superior escrito em azul escuro. Abaixo dele há uma pirâmide fragmentada em três partes. A base é azul ciano e está escrito "Unidade" no centro, a parte do meio é laranja está escrito "Integração" no meio e o topo é amarelo e está escrito "UI" no meio. Ao lado esquerdo da pirâmide há, na parte superior, o texto "Maior fidelização: Caro e Lento", seguida de uma seta que aponta para cima e para baixo. Na parte abaixo da seta há o texto "Menor Fidelização: Barato e Rápido". No lado superior direito da pirâmide, há o texto "Fidelização: Semelhança com a aplicação real".

[10:03] Dado a pirâmide de testes, vamos ver um pouco mais de tipos e técnicas, porque não são somente esses tipos específicos de testes. Esses são os mais comuns e os que mais vemos por aí, mas temos outros tipos e técnicas principalmente dado o contexto. Como estamos no contexto de React Native temos algumas coisas diferentes, por exemplo, o teste de fluxo testa um passo a passo dentro da nossa aplicação, não é exclusivo do mundo mobile podemos testar um passo a passo dentro de praticamente qualquer tipo de aplicação.

[10:38] Ele vai testar alguns passos da nossa aplicação, não necessariamente integrando com alguma coisa externa, mas fazendo com que as coisas dentro da nossa aplicação estejam funcionando. E ele vai ser bem usado também no React Native com o teste de componente, que é o teste de renderizar um componente em memória. O que podemos fazer é pegar o componente que escrevemos em JavaScript e transformá-lo como se fosse um JSON, em um objeto JavaScript, e executar algumas funções por cima dele.

[11:12] É uma ótima alternativa para os testes de interface, porque os testes de interface precisam de uma configuração do simulador rodando para conseguir testar, e com o teste de componente não precisamos porque ele é renderizado em memória. E com essa renderização em memória podemos fazer um teste de fluxo apertando em botões, preenchendo coisas toda em memória, sem um simulador de fato, sem ser a interface de fato, e sim esses componentes simulados em memória.

[11:43] E outra coisa que temos também em testes, que na verdade é uma técnica, é o TDD, o Test Driven Development ou Desenvolvimento Guiado por Testes. É uma prática que está aumentando cada vez mais, que é você fazer o teste primeiro e depois você cria a funcionalidade, você cria um teste pensando em todos os requisitos que essa funcionalidade precisa ter.

[12:09] No começo, esse teste vai falhar, porque o seu método não está implementado ainda, e você vai implementando a funcionalidade e, quando todos os testes passarem, é porque a sua funcionalidade está desenvolvida. Você faz primeiro o teste e depois a funcionalidade.

[12:29] Nós já falamos um pouco sobre os prós e contras de testar, mas vamos deixá-los mais explícitos aqui. Vamos começar pelos prós, primeiro é diminuir a criação de novos bugs. Podemos começar testando as coisas que estamos fazendo para diminuir o caso da Roberta, por exemplo, de ter alterado alguma coisa e ter refletido em outra parte do código que ela não tinha nem ideia. Diminui a criação desses novos bugs, incentivar códigos coesos, que são códigos que tem menos responsabilidade, códigos que fazem apenas coisas pequenas, então conseguimos fazer mais testes de unidade nesses códigos, e deixar o nosso projeto mais organizado.

[13:17] É sempre bom termos códigos mais coesos para melhor entender as coisas e também para poder testar melhor cada parte do projeto. Se tivermos tudo em uma função só, como vamos poder testar mais detalhadamente? Fica mais complicado. E também, se você já é desenvolvedor, você pode perceber que um arquivo gigante com uma função única, também é muito difícil de dar manutenção, por isso códigos coesos é sempre uma boa ideia.

[13:45] Ajuda na validação dos requisitos, como eu falei, bons testes sempre são pensando nos requisitos da nossa aplicação. Podemos fazer testes para validar a lista de requisitos, mesmo os funcionais, que podemos ter obtido do nosso cliente e tudo mais, podemos validar esses requisitos via testes.

[14:09] E diminui o custo em longo prazo. No final, a longo prazo da aplicação, teremos menos custo de manutenção porque as funcionalidades vão ser bem mais fáceis de implementar e verificar se não está afetando alguma coisa que já estava funcionando antes. Por isso que diminui o custo, porém apenas em longo prazo.

[14:29] E os contras são: aumenta a curto prazo, porque vamos precisar desenvolver os testes já quando vamos desenvolvendo a aplicação. No começo pode ser que fique mais lento fazermos, vamos precisar de mais esforço no começo, porém no final vai compensar. As métricas podem ser mal-entendidas. Como já falamos, testar uma função exige uma coisa que se chama cobertura de testes, e não quer dizer que se temos 100% do código coberto. Se aquele script viu que estamos testando todos os ifs, todos os fors, todas as sentenças da nossa aplicação, não quer dizer que testamos todos os requisitos da nossa aplicação.

[15:13] Por isso precisamos pensar muito bem que esses números, às vezes tem algumas ferramentas que trazem esses números para nós, eles podem ser mal interpretados. Precisamos muito pensar nos requisitos e pensar menos na cobertura do teste em si. Esses são os contras, precisamos tomar cuidado com as métricas.

[15:33] Como fazemos para aplicar testes em React Native? É o que vamos ver a seguir.

@@03
Preparando o ambiente: instalando o React Native

Neste curso, iremos utilizar um projeto React Native previamente preparado com Expo. Portanto, é imprescindível que você tenha o ambiente Expo instalado no seu computador.
As versões utilizadas neste curso são:

Node: 16.8.0
NPM: 8.1.3
Expo: 5.2.0
Para ajudar no processo de instalação, confira o Alura+ do seu sistema operacional (não é necessário criar um novo projeto):

Windows (na maioria dos computadores): React Native: Como instalar o Expo no Windows;
Linux: React Native: Como instalar o Expo no Linux;
MacOS (em computadores da Apple): React Native: Como instalar o Expo no Mac.
Após finalizar a instalação, é possível seguir para o próximo passo!

https://cursos.alura.com.br/extra/alura-mais/react-native-como-instalar-o-expo-no-windows-c1222

https://cursos.alura.com.br/extra/alura-mais/react-native-como-instalar-o-expo-no-linux-c1224

https://cursos.alura.com.br/extra/alura-mais/react-native-como-instalar-o-expo-no-mac-c1223

@@04
Preparando o ambiente: baixando o projeto

O projeto do curso está disponível no github de projetos da Alura por meio deste link. No readme do projeto, você encontra várias informações sobre ele.
Caso não tenha o git instalado no seu computador, é possível baixar o zip do projeto por meio deste link direto.

Se seu computador estiver com o git instalado, você pode baixar o projeto pelo terminal, usando o seguinte comando:

git clone <https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao.git>COPIAR CÓDIGO
Uma pasta com nome “react-native-criando-testes-para-sua-aplicacao" será criada no local da execução do comando.

Após finalizar o download, aproveite para estudar como o código está organizado e prossiga para o próximo passo!

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao/archive/refs/heads/main.zip

@@05
Testes para sua aplicação

[00:00] Para conseguirmos fazer testes automatizados precisamos ter uma aplicação na qual testar, ou isso, ou aplicamos o TDD, fazemos os testes primeiro e depois criamos a aplicação. Porém criar uma aplicação está fora do contexto do nosso curso de testes, já vamos ter uma aplicação pronta para aprendermos somente os conceitos de teste mesmo.
[00:22] Você baixou essa aplicação seguindo as instruções de download e de preparação do ambiente nas atividades anteriores. Se você ainda não baixou, confere lá, tem o link do GitHub para você baixar e as instruções de como fazer isso.

[00:35] Quando você baixa a sua aplicação, eu abri ela aqui no VS Code, vai ter as pastas aqui, mas a primeira coisa que precisamos fazer é instalar as dependências. Eu vou abrir o terminal. Aqui na barra superior tem um menu, "Terminal > New Terminal" e aí eu vou rodar dentro dessa pasta o npm install para instalar as dependências do meu projeto.

[01:03] Vai ser criada essa pasta "node_modules" e as dependências vão ser baixadas da Internet. Pode demorar um pouco mais, dependendo da quantidade de dependências que você já tenha salvado no NPM, na sua máquina ou não. Também depende da Internet e da velocidade da sua máquina.

[01:18] Depois de instalar as dependências, podemos tentar rodar o nosso projeto, vou dar um npm start. Esse projeto React Native é um projeto Expo, para facilitar aqui. Agora rodamos ele e eu vou mandá-lo rodar aqui no iOS. Eu já rodei no terminal, vou apertar "i" e ele roda no iOS. Ou você pode também escanear o QR Code para rodar no seu celular como já vimos em outros cursos aqui sobre Expo.

[01:57] Está rodando a aplicação, porém está uma lista de leilões vazia, não tem nada na nossa aplicação. Isso está acontecendo porque ela aplicação depende de uma API de leilões, mas essa API não é externa, não precisa conectar com a Internet. Estamos utilizando o JSON Server, que é uma biblioteca que cria uma API com base em JSON. Para podermos rodar essa API, o JSON está aqui no "db.json", na raiz do nosso projeto.

[02:28] Para podermos rodar essa API, criamos um script aqui no "package.json". Podemos ver que na seção scripts tem o script "api", que cria um "json-server" em um host, em um IP, e fica olhando, watch quer dizer que continua observando. Vai ficar mostrando os logs para nós e vamos escolher o arquivo "db.json" como o nosso arquivo de banco de dados mesmo. Podemos fazer requisições que ele vai alterar esse "db.json".

[03:00] Só que temos um problema, porque para podermos rodar e acessar essa API a partir do simulador do Android, precisamos utilizar um IP. Está aqui o IP, esse é o IP da minha máquina na minha rede interna, esse não é o IP da Internet em si é o IP da minha máquina na rede interna. Precisamos descobrir qual que é o seu IP e qual que é o meu IP de novo também, porque IP muda dependendo do tipo de configuração do seu roteador. Cada vez que você vai iniciar a sua aplicação você precisa verificar se está tudo certo com seu IP.

[03:39] No meu caso, eu já consigo ver que não está tudo certo com meu IP. Se expandirmos o terminal, quando o Expo roda, ele já diz onde que está rodando. Ele está mostrando aqui no terminal o meu IP local. Abaixo do QR Code temos aqui que ele está rodando lá no exp:// e o IP. Esse IP é diferente do IP que está aqui. Antes eu estava no 192.168.1.3, agora eu estou no 192.168.1.6. Eu preciso copiar esse IP e colar aqui no script dentro do "package.json".

[04:21] Eu vou substituir e você faça isso também, procure qual que é o IP local da sua máquina. Se você estiver executando o Expo, ele vai aparecer aqui. Além do "package.json" precisamos alterar esse IP no nosso código-fonte, quando chamamos a API. Aqui é quando criamos a API, quando subimos a API e quando chamamos é em "src > servicos > apiLeiloes.js".

[04:47] Aqui na "apiLeiloes.js" temos a nossa URL base, eu vou substituir o IP que está aqui pelo IP novo, que é o 192.168.1.6 na minha máquina, pode ser que seja diferente na sua máquina. E a porta aqui é a 3000 nesse caso, quando eu vou rodar ali ele vai rodar automaticamente na 3000, mas se você já estiver alguma coisa rodando pode ser que ele rode na 3001. Você tem que verificar quando você starta a API para ver se ele está na porta 3000 mesmo, mas essa é a padrão.

[05:19] Vou salvar aqui e aí vamos rodar para ver como que ele vai rodar isso. Vou apertar no mais para criar um novo terminal e aí temos o script, como eu mostrei para vocês. Para rodar o script de API, eu vou rodar o comando npm run api, "Enter". E aqui já podemos ver que está na home 3000, 192.168.1.6:3000, confere se está rodando certo na sua máquina. Tem que aparecer essa mensagem aqui Watching, aguardando, para ver se está pegando mesmo.

[05:53] E agora eu vou atualizar a minha lista de leilões na aplicação e pronto, agora sim temos uma lista de leilões carregando. Ele mostra que o log também fez uma requisição GET e o status foi 200, status sucesso para a rota “/leiloes”. A nossa aplicação vai ser uma lista de leilões e temos também uns detalhes aqui dos leilões e também podemos dar um lance. Se eu der um lance aqui maior do que os lances que já têm, ele vai aparecer aqui em cima.

[06:28] Agora vamos dar uma olhada como é que foi feito isso por baixo dos panos. Ajustamos o IP e aqui no nosso "src", no nosso código-fonte temos uma pasta chamada "telas" e temos duas telas, que é a "ListaLeiloes", essa lista aqui de leilões da tela inicial e no "index.js" temos a "FlatList" que carrega os dados que vieram desse useListaLeiloes que é um hook que criamos, que já tem pronto aqui.

[07:02] Na pasta "hooks > useListaLeiloes", esse hook obtém os leilões utilizando o repositório que é uma coisa um pouco diferente que temos agora. Está uma pasta chamada "repositorio" e dentro dessa pasta temos "leilao" e "lance" que são requisições para as rotas de leilão e requisições para as rotas de lance. A nossa aplicação segue esse fluxo. Temos o serviço que conecta com a API, o repositório faz a requisição para a API e os hooks transformam essa informação para pegarmos a nossa tela.

[07:41] Essa pasta "negócio" vai nos ajudar também em alguns formatadores para formatar moeda, para formatar o lance, e também "validadores" para validar se o lance existe mesmo. Tudo isso pode ser testado na nossa aplicação. Nós também temos alguns componentes que é o cartão, esse componente de cartão aqui, e também tem o ícone, que é esse ícone com uma cor de fundo aqui.

[08:08] Inclusive esse ícone podemos escolher dentro do "db.json". Aqui temos uma lista de leilões e cada leilão vai ter um ID, um nome, uma descrição, o valor inicial, um ícone, que vai estar de acordo com a biblioteca de ícones que já vamos ver, e a cor do ícone, que é uma cor hexadecimal.

[08:31] Aqui embaixo também temos a rota de lances que vai ser basicamente uma tabela do banco de dados, digamos assim. Uma rota que vai armazenar o valor do lance vinculado a qual leilão que esse lance está sendo dado. E isso aqui tudo vamos gerar utilizando o Json Server para fazer as requisições.

[08:52] Dentro da lista de leilões temos o componente de leilão, que é esse quadrado aqui. Nós também temos outra tela, que é a tela de leilão em si. Essa tela quando entra aqui, quando clicamos em algum leilão, estamos utilizando uma flat list para listar os lances do leilão. Também temos esse componente EnviaLance que está dentro dos componentes, que é formulário na parte inferior do aplicativo em que você pode digitar e apertar no botão para enviar o lance.

[09:28] Nós também temos o lance em si, que é o cartão do lance, e o topo, que é essa parte do topo aqui, mostrando a imagem, o ícone do leilão e também algumas informações como o melhor lance, valor inicial, o nome do leilão e a descrição.

[09:46] A respeito desse ícone que eu falei para vocês, vamos abrir o componente de ícone e ele vem lá do expo/vector-icons, FontAwesome5. Ele está dentro dessa biblioteca de fontes. Se você entrar lá na documentação vai encontrar e você pode trocar por qualquer outro ícone dentro dessa biblioteca do Expo de fonte.

[10:08] E se você também ficou curioso sobre a navegação, podemos acessar navegação entrando aqui em "rotas > AppRotas" e vamos ter basicamente uma stack navigator, já estamos deixando todo o layout do react navigation, que é um biblioteca de navegação.

[10:24] Todos já prontos aqui para que possamos fazer essa navegação de voltar, não precisamos implementar nada disso porque ele já cria para nós. Só temos duas telas, temos uma stack com duas telas, que é a tela de ListaLeiloes e a tela de Leilao que acabamos de ver.

[10:41] E dado esse contexto, essa aplicação que já temos pronta vamos descobrir quais são as bibliotecas que vamos utilizar para aplicar os testes automatizados na nossa aplicação.

@@06
Bibliotecas para React Native

[00:00] Cada linguagem geralmente tem bibliotecas ou pacotes que auxiliam nesse processo de teste de aplicação. No React Native qual biblioteca vai usar? Por exemplo, no Java temos a JUnit, no PHP tem a PHPUnit, mas como o React Native é feito em JavaScript, como tem JavaScript por baixo temos muitas bibliotecas que podemos testar JavaScript e que também são aplicadas no React Native.
[00:26] Se olharmos aqui na documentação do React Native em si, temos uma pasta de teste, no menu à esquerda “Workflow > Testing”, temos várias informações sobre testes e se formos Writing Tests, escrevendo testes, ele já nos diz que tem uma biblioteca padrão instalada no React Native. Nesse caso, se estamos fazendo aplicações novas o React Native já virá com o Jest instalado, que é a biblioteca de testes unitários, também vai dar para fazer alguns testes de integração e ela vai nos ajudar a integrar com todas as bibliotecas de testes que vamos utilizar na nossa aplicação.

[01:07] O Jest é o fundamental, a base de testes para nossa aplicação. Existem outras bibliotecas que fazem coisas parecidas com o Jest, mas como o próprio React Native já está utilizando ela e ela também integra com bastante outras bibliotecas vamos utilizá-la.

[01:25] Porém estamos no Expo. Como estamos no Expo em um versão do React Native que talvez não seja tão recente assim, ainda não temos Jest instalado por padrão em nosso projeto. Vamos ter que instalá-lo depois, vamos ver como fazer isso, não precisa se preocupar.

[01:42] Vou abrir a documentação do Jest, basicamente é isso aqui, ele funciona com Babel, TypeScript, Node, React, Angular, Vue e mais. Inclusive, React Native que vem do React. Se formos nas documentações podemos dar uma olhada também em outra coisa que ele integra muito legal, vou clicar aqui em “Testing React Apps”.

[02:08] Ele ensina aqui como é que usa a react-test-renderer que é uma biblioteca muito legal para podermos renderizar os nossos componentes em memória. Ele cria um objeto JavaScript que podemos integrar, fazer ações ou verificar se os estilos estão certos e tudo mais, podemos fazer várias coisas com essa react-test-renderer.

[02:34] Para conseguirmos clicar em um botão e preencher um texto, ela não é muito otimizada. Vamos utilizar outra biblioteca que é a React Native Testing Library, que é baseada na React Testing Library que é uma biblioteca do React, que vai nos auxiliar, vai utilizar essa react-test-renderer para que possamos fazer esse preenchimento de campos, esse clica em botões e esperar alguns eventos que vão ser mais otimizado para nós do que simplesmente fazer tudo a mão com a react-test-renderer.

[03:11] Inclusive, aqui está falando o que a biblioteca faz e o problema, que fica difícil fazermos esses testes todos a mão, trazendo a solução. Essa biblioteca que utiliza react-test-renderer e faz várias coisas e eles, inclusive, encorajam boas práticas de teste. Dessas boas práticas basicamente ele está falando aqui que quanto mais nos aproximamos da aplicação que é utilizada pelo usuário mesmo, mais confiante, mais fiel, aquela fidelidade que falamos, o nosso teste vai ser. Ele nos ajuda a fazermos esse teste com mais fidelidade, sem tanto processamento quanto abrir um simulador, que é o que já vimos nos slides anteriores.

[04:12] Vamos utilizar a react-test-renderer juntamente com a React Native Testing Library para fazer o teste de botões, o teste de campos, o teste de componente em si e o fluxo do componente. Além disso, nós também vamos utilizar outra biblioteca que vem lá do Testing Library, do mesmo grupo, que é a react-hooks-testing-library, ela vai nos ajudar muito a fazer testes dos fluxos de hook.

[04:40] Porque os hooks, ele até explica também aqui, não podemos simplesmente chamar um hook que usa useState, useEffect no meio do nada, precisamos utilizar esse hook dentro de um componente. E quando estamos testando vamos ter um erro aqui, ele até nos mostra que vamos ter um erro falando que o hook só pode ser chamado dentro de um componente, de uma função de componente, vai dar um erro e com essa biblioteca vamos poder fazer esses testes muito mais fáceis.

[05:11] Aqui ele tem um exemplo de um hook, chamamos um renderHook aqui, e ele renderiza o hook já para nós. Conseguimos efetuar alterações nesse hook e os estados e a manipulação dos valores desse hook ficam mais fáceis.

[05:29] Mais uma biblioteca por último, essa não vamos utilizar nesse curso. Caso você esteja interessado e depois queira pesquisar mais sobre, é a Detox. Essa biblioteca é do wix / Detox, você pode acessá-la por meio do “github.com/wix/detox”, ela é a biblioteca que faz os testes de interface, ela abre o simulador e testa apertando. Só que o problema é que essa biblioteca precisa de um projeto React Native puro e tem várias configurações internas lá nos códigos nativos que precisamos fazer para conseguir rodar essa biblioteca.

[06:17] Inclusive, para rodar no iOS é mais complicado ainda, precisamos ter aquela licença de desenvolvimento, precisamos pagar aquela taxa para a Apple para conseguir rodá-la dentro do iOS, por isso é mais fácil testar com um Android mesmo.

[06:33] Não vamos utilizar essa biblioteca nesse curso, mas caso você queira fazer esses testes de interface, lembrando que eles são mais pesados, tem maior fidelidade, mas a Testing Library do React Native também aplica maior fidelidade para nós, permite maior fidelidade. Porém, se você quiser, depois você pode pesquisar e olhar aqui como que ela funciona.

[06:59] Já vimos os fundamentos das bibliotecas que vamos utilizar nesse curso, que são: a Jest para testar os testes de unidade e alguns testes de interface também e ela vai integrar com outras bibliotecas, inclusive com a react-test-renderer, que é a segunda biblioteca que vamos utilizar. Ela não vai ser usada diretamente, mas ela vai ser usada como dependência para a React Native Testing Library para fazermos renderização em memória dos nossos componentes e poder fazer ações de clicar, de preencher campos em memória.

[07:38] Além dessa biblioteca vamos utilizar a quarta biblioteca que é a react-hooks-testing-library, para conseguirmos testar os hooks. E eu também falei da biblioteca Detox que não vamos utilizar nesse curso porque ela é bem mais complexa, mas você pode pesquisar sobre ela se quiser.

[07:57] Não esqueça de dar uma olhada nas atividades dessa aula para fixar os conteúdos e vamos fazer os próximos testes de unidade de fato da nossa aplicação.

@@07
Fundamentos de Teste

Nesta aula, vimos os conceitos iniciais sobre testes e também repassamos o projeto do curso. Sabemos que testes automatizados podem ser muito importantes para a nossa aplicação, e apresentam vantagens e desvantagens.
Sobre os fundamentos de teste, assinale as frases verdadeiras abaixo:

Testes de unidade precisam rodar no simulador, uma vez que precisamos da aplicação mais próxima da realidade para conseguirmos testar a unidade como um todo.
 
Alternativa correta
Ao conquistarmos 100% de coverage (100% das linhas de código testadas), podemos dizer que a aplicação estará livre de bugs.
 
Alternativa correta
Podemos usar testes de integração para garantir que nossa aplicação está funcionando em harmonia com serviços externos.
 
Resposta Correta! Exatamente! Com testes de integração, podemos testar a comunicação com banco de dados, APIs REST, módulos externos, etc.
Alternativa correta
Geralmente, o custo de criação e execução de um teste está diretamente ligado ao nível de fidelização. Quanto maior a fidelização, maior o custo.
 
Resposta Correta! Quando buscamos uma maior fidelização, utilizamos simuladores e/ou serviços externos. E, para garantir que tudo isso funcione, precisamos de mais tempo de execução e máquinas mais potentes.
Alternativa correta
Os testes automatizados somente podem ser desenvolvidos em aplicações já prontas e consolidadas, pois assim saberemos o que testar

@@08
Faça como eu fiz

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula. Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

Continue com os seus estudos, e se houver dúvidas, não hesite em recorrer ao nosso fórum!

@@09
O que aprendemos?

Nesta aula, estudamos os seguintes assuntos:
Conceitos de testes de unidade, integração e interface;
Vantagens e desvantagens de testar uma aplicação;
Revisão do projeto já existente de leilões;
Quais as bibliotecas mais comuns para testes em React Native, como a jest.

#### 26/12/2023

@02-Teste de Unidade

@@01
Instalando o jest

[00:00] Para começar a fazer os testes de unidade no projeto, vamos utilizar a biblioteca Expo. E como já sabemos a biblioteca Expo vem instalada no React Native nas versões mais recentes, mas como estamos utilizando o Expo, essa biblioteca ainda não vem instalada. Então vamos instalar a biblioteca Jest no nosso projeto.
[00:22] Para fazer isso, vamos seguir as orientações da documentação do próprio Expo, porque tem algumas diferenças para conseguirmos instalar a versão certa compatível com o Expo. Caso você esteja rodando no React Native puro, você pode seguir a documentação do próprio Jest para instalar tranquilamente que não vai precisar fazer essas configurações que vamos fazer agora. Na verdade eu, se você estiver utilizando o React Native na versão mais recente vai vir instalada e em uma versão antiga você vai precisar instalar.

[00:52] Aqui no site “expo.dev” vou digitar test e ele tem uma página Testing with Jest que é “docs.expo.dev/guides/testing-with-jest/”. Aqui ele fala que vamos precisar fazer uma instalação. A primeira coisa que queremos instalar é o jest-expo que é um Jest com algumas coisas do Expo já configuradas para nós e aí precisamos instalar o Jest também.

[01:33] Para que ele pegue a versão certa precisamos rodar o comando expo install jest-expo jest, porque se instalarmos normalmente com o comando npm install -- save dev que você pode vê-lo no Jest, ele não vai instalar a biblioteca correta e podem ocorrer erros no final quando formos fazer alguns outros tipos de testes.

[01:58] Segure essa vontade de instalar normalmente e instale dessa forma aqui. Vou copiar esse comando e vou colocar aqui no terminal no VS Code mesmo. Vou clicar aqui em cima em "Terminal > New Terminal" e vou colar o comando aqui para ele instalar, ele já abre o terminal dentro da pasta do projeto. Se você quiser navegar para a pasta do projeto manualmente pode navegar. expo install jest-expo jest. Vamos aguardar e ele vai utilizar o npm install para instalar as versões compatíveis.

[02:34] Já instalou aqui, vamos ver no "package.json" quais são as versões, caso você precise instalar exatamente essas versões. Repare que ele colocou em "dependencies" e não em "dev dependencies", ele instalou o "jest" na versão 26.6.3 e o "jest-expo" na versão 44.0.1. Agora que já temos as versões instaladas, podemos criar um script para rodar o Jest.

[03:03] Aqui dentro do "package.json" temos os scripts, lembra que tem o script da API que trocamos o IP. Vamos criar um novo script, um novo nome para podermos chamar um código mais facilmente. Esse script vai chamar-se test com T mudo, test em inglês, e vamos colocar o comando Jest, "test": "jest", simplesmente assim.

[03:36] Vou rodar agora aqui no terminal o comando npm test e vamos ver o que acontece. Ele rodou e disse que não foram encontrados testes. Isso aqui está rodando certinho, não foram encontrados testes porque não fizemos nenhum teste ainda para a nossa aplicação. Repare que eu não dei o npm run test, igual fizemos com o npm run api, porque test é um script já comum, ele já sabe que se você rodar npm test, ele não precisa desse run. Já no caso da API como não é um script o NPM conhece ele vai precisar rodar com npm run api.

[04:25] Rodamos aqui, funcionou, mas ainda tem algumas coisas que precisamos dar uma olhada na documentação do Expo aqui. Ele até está mostrando que vamos fazer esse script para poder rodar o teste mais facilmente e ele está dizendo aqui também podemos querer fazer mais umas configurações, que são as configurações do Jest. Dentro do "package.json", eu vou copiar essa parte aqui documentação. Logo abaixo dos scripts temos uma propriedade "jest": { "preset": "jest-expo" }.

[05:03] Eu vou copiar e vou colocar aqui no final do "package.json". Isso quer dizer que não vamos rodar com Jest puro mesmo, vamos rodar os testes com o "jest-expo" para não termos nenhum problema. Vou salvar aqui e vamos dar uma olhada na documentação. Ele mostra aqui como é que instala "react-test-renderer", mas não vamos instalar agora ainda, vamos instalar mais tarde, e também tem algumas outras configurações que podemos querer fazer.

[05:41] Na sessão Jest Configuration tem o "transformIgnorePatterns". Vamos copiar todos esses transforms patterns e colocar junto nesse objeto Jest no nosso "package.json". Tem alguns arquivos do Babel que ele compila e, quando rodamos os testes, pode ser que ele não compile alguns específicos. Assim, no teste, ele se perde e não consegue rodar. Esse "transformIgonorePatterns" é para ignorar essas coisas que ele não conseguiu transformar.

[06:18] Neste caso que estamos no React Native pode ser interessante fazermos isso, repare que é tudo dentro do "node_modules". Isso aqui é uma regex para dentro do node_modules/, então ele tem vários padrões de arquivos, de bibliotecas, que pode ser que dê esse problema e ele já tenta evitar isso.

[06:40] Caso tenha uma biblioteca nova que dê esse problema, podemos simplesmente adicionar aqui no final /react-native-svg. Podemos colocar barra e o nome da biblioteca, a pasta que está dando problema. Eu vou copiar esse "transformIgonorePatterns" e vou colocar aqui dentro do "package.json", dentro dessa propriedade Jest.

[07:16] Vamos ver se tem mais alguma coisa que precisamos fazer no momento e ele já mostra um exemplo aqui. No momento é apenas isso que precisamos fazer, no próximo vídeo vamos começar a fazer os testes de unidade em si. Podemos ainda testar aqui se está rodando conforme o esperado, vou rodar novamente npm test e ele vai mostrar a mesma mensagem. Vamos fazer os testes de unidade.

@@02
Criando Testes de Unidade

[00:00] Agora vamos começar a fazer os testes de unidade. Vamos olhar para a nossa aplicação, para uma função, alguma coisa que possamos testar.
[00:09] Aqui em "src > negocio > formatadores > moedas.js" temos algumas funções simples para começar. Por exemplo, essa segunda função aqui da linha 8 é formataBrasileiroParaDecimal(valor), ela recebe um valor em string e ajusta a pontuação, remove os pontos e adiciona ponto onde tinha vírgula porque quando digitamos em brasileiro, digamos assim, no formato que usamos aqui no Brasil digitamos 10,5.

[00:43] Mas o computador vai entender apenas 10.5, por isso temos que substituir isso e usar a função parseFloat do JavaScript para conseguirmos retornar um valor em float mesmo, em um ponto flutuante no valor decimal que o JavaScript entenda.

[01:01] Vamos testar essa função aqui para ver se conseguimos validá-la e vamos conferir se está tudo funcionando corretamente e evitar também que alguma alteração cause problemas na nossa aplicação. Para começar vamos criar uma pasta que vai armazenar todos os nossos testes, esse é um tipo de estrutura de testes que existe, vamos criar aqui dentro da pasta do projeto que neste caso é "leilaoTeste", mas quando você baixa pode ser que tenha outro nome, se você renomear também pode ter outro nome.

[01:35] Vamos criar uma nova pasta, new folder, e essa pasta vai ser __tests__, esse é um padrão que podemos fazer de testes e aí vamos criando a estrutura de pastas igual temos dentro de "src".

[01:58] Nesse caso vamos criar uma pasta chamada "negocio", outra pasta chamada "formatadores", “tests/negocio/formatadores”. E aí criamos um arquivo que vai corresponder ao arquivo de "moeda.js", mas temos um padrão também para criar arquivos de teste, vamos criar um novo arquivo dentro desta pasta "formatadores" que vai ser: “moeda.test.js”.

[02:34] Repare que ele até já colocou aqui o JS e ficou na cor laranja, O VS Code colocou o ícone na cor laranja diferente do ícone na cor amarela dos arquivos de JavaScript normal, ele já sabe que esse é um arquivo de teste. É um padrão para nomearmos os arquivos de teste.

[02:52] Existem outros padrões também, por exemplo, como colocar o próprio arquivo de teste dentro da pasta do "src" para você não precisar voltando pastas para importar os arquivos, porém, eu acho que fica muita coisa aqui dentro da pasta, ficam muitos conceitos diferentes, tendo a implementação e o teste dentro da mesma pasta. Eu gosto desse formato aqui, mas você pode utilizar, depois dos projetos, padrões diferentes. O recomendado é que você mantenha o mesmo padrão dentro do projeto inteiro.

[03:24] No nosso projeto vamos utilizar esse padrão, criando duas pastas: __tests__/negocio/formatadores e moeda.test.js. Dentro do arquivo "moeda.test.js" queremos testar a função formataBrasileiroParaDecimal do arquivo "moeda.js", precisamos primeiro importar esse arquivo.

[03:50] Eu vou importar como importamos os outros arquivos JavaScript, com import, e vou abrir chaves porque é uma função que está sendo exportada, não é default então import { formataBrasileiroParaDecimal } from e precisamos voltar as pastas , voltamos uma pasta para entrar dentro do negócio, voltamos mais uma pasta para entrar dentro do teste e voltamos mais uma pasta, ”../../../src/negocio/formatadores/moeda";. Vamos salvar aqui e aí podemos começar o nosso teste em si.

[04:50] Geralmente queremos descrever o que vamos fazer de fato nesse teste, é legal termos, onde estamos testando, uma descrição para sabermos depois, caso o teste falhar, o que está falhando de fato. No Jest para testar podemos usar uma propriedade, uma função global chamada describe, e como é uma função abrimos parênteses. O primeiro parâmetro dessa função que eu vou passar será uma descrição mesmo e eu vou passar a URL de onde estamos trabalhando, digamos assim.

[05:28] Pode ser qualquer coisa que você quiser, se você quiser escrever um texto detalhado que está testando, mas como estamos testando negocio/formatadores/moeda eu vou escrever isso mesmo no primeiro parâmetro, describe(“negocio/formatadores/moeda”).

[05:46] Precisamos passar um segundo parâmetro para essa função describe que vai ser uma nova função, eu vou abrir aqui uma função e vou abrir chaves e apertar "Enter" para que possamos escrever coisas aqui dentro. Tudo que estiver nessa função vai ser descrito por esse describe que fizemos aqui: describe{"negocio/formatadores/moeda", () => { });. Agora os testes do negocio/fornecedores/moeda vão estar descritos aqui dentro desse describe.

[06:14] Eu vou criar mais um describe para descrever a função que eu quero testar, eu posso criar quantos eu quiser. Vou criar describe(“formataBrasileiroParaDecimal”, () => {}) e, assim como no outro describe, o segundo parâmetro vai ser um função e tudo que estiver aqui dentro vai ser correspondente ao formataBrasileiroParaDecimal e o negocio/formatadores/moeda. Depois quando for testar a outra função eu vou criar um outro describe para a função formataDecimalParaReal, por exemplo.

[07:04] Agora dentro do describe vamos criar o teste mesmo, para isto existem duas formas basicamente mais comum para criar o teste que é utilizar a função test e também utilizar a função it, elas são atalhos uma para a outra. Eu vou utilizar a it mesmo, que é para descrever. Você consegue fazer uma sentença em inglês mesmo. Vamos escrever em português, mas vai ser a mesma lógica do inglês. Então, it e vamos chamar a função formataBrasileiroParaDecimal para formatar algum valor, eu vou escrever aqui o que eu quero que desse teste: it("deve retornar 8.59 quando o valor for '8,59'”). Ele deve retornar 8.59, uma valor decimal que o JavaScript pode entender, quando eu passar 8,59 para essa função.

[08:37] Terminou a string, vou colocar uma vírgula e abrir função novamente. it("deve retornar 8.59 quando dor '8,59'", () => { });.

[08:42] Nos testes sempre vamos fazer nesse formato aqui de abrir uma função e as coisas vão fincando dentro dessas funções. Dentro desse teste vamos chamar a função formataBrasileiroParaDeciamal, vou criar uma constante, const resultado = formataBrasileiroParaDecimal e vou passar o número que eu falei que vai ser uma string, const resultado = formataBrasileiroParaDecimal("8,59");. Passei uma string 8,59 e vamos dar um console.log no que está vindo do resultado para vermos o que é, console.log(resultado);.

[09:30] Vou salvar e nada vai acontecer, porque não estamos rodando nada. Vou dar um npm no terminal, npm test, e ele vai rodar. Repare que ele já achou o teste dentro de tests/negocio/formatadores/moeda.test.js e testou. Passou, porque não deu nenhum erro, ele considera que passou, e ele deu console.log 8.59, que é exatamente o que o queríamos, o que estávamos descrevendo aqui cima.

[10:09] Embora tenha passado aqui, é legal sempre validarmos se o valor é igual ao que estamos esperando, porque pode ser que o formataBrasileiroParaDecimal não der nenhum erro, mas ele não retorna o que queremos, não estamos validando se ele está retornando isso mesmo, só estamos chamando ele e vendo se não tem nenhum erro.

[10:30] Para validar se 8,59 vai retornar 8.59 podemos chamar uma propriedade global do Jest que é chamada de expect, expect(resultado).toBe(8.59);. Vou apagar esse console.log(resultado) e vou rodar novamente.

[11:22] Pronto, temos o nosso teste passando aqui. Caso o fomataBrasileiroParaDecimal tenha algum problema aqui no meio e retorne alguma coisa incorreta, por exemplo, eu vou colocar aqui 8.598, supondo que tenha algum erro, isso aqui não está certo, depois que rodo npm test e ele deu falha e ele me diz onde que está a falha, por isso damos o describe, ele diz aqui negocio/formatadores/moeda > formataBrasileiraParaDecimal > deve retornar 8.59 quando o valor for '8,59'.

[12:08] E ele diz aqui que esperava receber 8.598, que está errado, já que recebeu 8.59. É isso que vai aparecer quando o nosso teste falhar.

[12:19] Vou corrigir aqui o expect para ele não falhar e vamos fazer um teste de outra função. Aqui abaixo do describe formataBrasileiraParaDecimal eu vou fazer um teste da outra função que é: describe ("formataDecimalParaReal", () => { }). Abre uma função e dentro dela vamos ter o nosso teste. Nessa função específica vamos testar: it("deve retornar R$ 8,59 quando o valor for 8,59”, () => {}) e vou colocar R$ que é em formato em real, 8,59 quando o valor for 8.59. O segundo parâmetro é aquela função que precisamos colocar o que queremos testar dentro dela.

[13:38] Agora precisamos importar essa outra função, já importamos: import { formataBrasileiroParaDecimal, formataDecimalParaReal } e aí vamos chamar essa função aqui. Vou criar embaixo desse teste que estamos criando uma constante: const resultado = formataDecimalParaReal e aqui eu preciso passar um decimal que vai ser 8.59, const resultado = formataDecimalRapaReal(8.59);

[14:14] Agora esperamos que esse resultado seja R$ 8,59. Vamos fazer isso: expect(resultado).toBe("R$ 8,59"); e vamos ver o que acontece. Vamos rodar e deu falha.

[14:50] Deu falha porque aqui ele está esperando receber R$ 8,59 e está recebendo o esperando. Aqui estamos vendo a mesma string, mas o problema é que esse espaço aqui, no INTL dessa biblioteca de formatação, usa um espaço muito diferente que estamos acostumados e não adianta nem copiar aqui porque não está funcionando, não vai funcionar.

[15:22] Precisamos fazer um expect diferente, nesse caso vamos fazer uma regex, uma expressão regular. Para validarmos uma expressão regular utilizamos, ao invés de toBe, o toMatch. Na expressão regular, vamos usar a barra no começo, ao invés das aspas, vai ser: expect(resultado).toMatch(/R$8,59/);, onde tinha aspas eu utilizei barra, a barra normal mesmo de comentário, mas só uma barra. Repare que o cifrão está com uma cor diferente porque o cifrão de real é um caractere da regex, um caractere especial.

[16:18] Para não utilizarmos ele como caractere especial e sim como uma string vamos colocar outra barra, dessa vez será a barra invertida. Vamos colocar uma barra invertida antes do $, expect(resultado).toMatch(/R\$ 8,59/);. Agora esse cifrão aqui não vai ser um caractere especial e sim uma string normal. E aqui no meio, onde tinha esse espaço, vamos chamar uma regex de espaço mesmo porque temos um caractere específico, uma função, digamos assim, do regex para representar qualquer tipo de espaço. Esse caractere é /s, expect(resultado).toMatch(/R\$\s8,59/);.

[16:59] Isso significa que esperamos que o resultado tenha validade com essa expressão regular. A expressão regular começa com a barra e termina com a barra, não é mais as aspas. E vamos ter um \$, vamos ter um cifrão, vamos ter um espaço, \s, qualquer espaço pode ser um tab, pode ser qualquer coisa 8,59 e fechamos a expressão regular. Vamos salvar e rodar o teste novamente. Agora sim, o nosso teste passou.

[17:35] Esse é um caso muito específico que podemos utilizar o toMatch. Não existe só o toBe e o toMatch, existem vários expects que podemos utilizar, vamos ter um "Saiba Mais" a seguir, que vai mostrar mais expects que você pode utilizar nos seus testes. Além disso, também vamos ter outro "Saiba Mais" falando sobre describe, sobre o it, sobre o test e sobre outras funções globais que podemos utilizar no Jest.

[18:06] Confira essas funções globais que podemos te ajudar muito, a saber, o que você pode fazer com testes. Não vamos ver todas elas porque são muitas, funções globais e expects são muitas, olhe para você saber o que você pode fazer. Até breve.

@@03
Para saber mais: lista de Expects

Para checar se os valores nos testes são os esperados, usamos expects. Na biblioteca jest, existem várias formas de fazer isso, sendo as principais:
toBe(): compara inteiros ou textos;
toBeCloseTo(): compara pontos flutuantes obtidos através de operações matemáticas, pois, devido a arredondamentos, podem haver erros com toBe();
toBeFalsy()/toBeTruthy(): compara valores falsos/verdadeiros em um contexto booleano. No caso de falsy, não apenas false será validado, mas valores como null, 0, '', undefined e NaN também. O restante dos valores é considerado truthy;
toEqual(): compara objetos, verificando se as propriedades internas são iguais. Usar toBe() não retornará o mesmo resultado.
Todos os demais métodos de validação podem ser acessados na documentação do jest, clicando aqui.

É interessante que você verifique a lista completa, para ter uma ideia de todos os tipos que existem. Com isso, durante suas implementações, você pode lembrar de algum uso e consultar a documentação para entender mais detalhes.

https://jestjs.io/pt-BR/docs/expect

@@04
Para saber mais: funções globais

Nesta aula, usamos as funções describe e it com frequência. Porém, elas não são as únicas funções globais que existem no jest. Podemos usar algumas funções para controlar quais métodos de teste serão executados ou até executar funções antes/depois das funções de teste.
Veja abaixo as funções globais mais comuns:

describe('', () => {}): cria um contexto com uma descrição para todos os testes dentro da função;
test('', () => {}): cria um teste com uma descrição que deve ser correspondida ao que o teste pretende testar.
it('', () => {}): funciona exatamente igual ao test('', () => {}). É usado para começar a frase do teste, geralmente em inglês, onde a palavra it não precisa ser repetida. Exemplo: it('deve retornar verdadeiro') ou it('must return true');
afterAll(() => {}): executa a função após todos os testes do seu contexto (arquivo ou describe) terminarem sua execução;
beforeAll(() => {}): executa a função antes que todos os testes do seu contexto (arquivo ou describe) comecem sua execução;
afterEach(() => {}): executa a função várias vezes, sempre que um teste do seu contexto (arquivo ou describe) terminarem sua execução;
beforeEach(() => {}): executa a função várias vezes, sempre antes que um teste do seu contexto (arquivo ou describe) começar sua execução.
Mais métodos globais podem ser acessados pela documentação, clicando neste link.

Experimente também os métodos only e skip nos seus testes, mas lembre-se de que não é recomendado que você mantenha eles ao mandar os testes para produção. Exclua testes desnecessários e mantenha históricos em sistemas de versionamento, como o git.

https://jestjs.io/pt-BR/docs/api

@@05
Configurando o Coverage

[00:00] Agora já sabemos como fazer um teste unitário básico, já demos os primeiros passos nos testes unitários. Será que é possível saber quais arquivos que eu testei quais arquivos não testei, se tem alguma parte de um arquivo que eu não testei? Sim, é possível e isso é uma métrica, é o Coverage que chamamos, é a cobertura de testes.
[00:24] Já conversamos sobre isso nos slides de fundamentos de testes e podemos aplicar aqui utilizando o Jest, mas vale tomar cuidado, não quer dizer que 100% de coverage seja 100% do nosso código, dos nossos requisitos testados.

[00:42] Vamos configurar o coverage. Para isto eu vou novamente na documentação do Expo, estamos nessa página de novo e aqui no menu a direita podemos navegar diretamente para Code Coverage Reports.

[01:05] Ele desceu aqui, fez um scroll e podemos configurar o coverage, basta copiar esse código aqui que está dentro dessa caixa de código e colar dentro do nosso "package.json". Vamos copiar a partir do collectCoverage, já sabemos que é dentro da propriedade Jest que vamos fazer as configurações do Jest no nosso projeto, vou copiar tudo o que está abaixo dos três pontinhos menos essa última chaves.

[01:37] Vou colocar no "package.json" do projeto e abaixo do transformIgnorePatterns vou colocar uma vírgula e colocar aqui e indentar. Estamos fazendo: "collectCoverage": true,, vamos coletar o coverage, essa cobertura de testes, vamos coletar de qualquer arquivo .js ou .jsx e não vamos coletar de dentro, a ! é uma negação, não vamos coletar de dentro da pasta coverage que é uma pasta que ele gera mesmo do coverage, não vamos coletar de dentro do "node_modules", de "babel_config" ou de "jest.setup.js".

[02:26] Basicamente vamos coletar de todos os arquivos JavaScript dentro do nosso projeto mesmo, dos nossos arquivos JavaScript.

[02:34] Para coletar o coverage, como essa função já está true aqui, basta rodarmos um npm test e ele já vai coletar o coverage para nós. Vou rodar aqui no terminal npm test, validou e repare que apareceram aqui mais coisas depois da validação. A validação está aqui em cima, passou e ele nos trouxe uma tabela com todos os lugares que estamos testando e também os que passaram e os que não passaram.

[03:03] Essa tabela pode ser um pouco difícil para entender, ele gera para nós uma coisa muito interessante que é um HTML na primeira coluna da tabela. Podemos abrir esse HTML no navegador para navegar e entender quais são os arquivos que estamos testando. Eu vou abrir a nossa pasta do projeto, pode ser no próprio VS Code mesmo, repare que ele criou a pasta "coverage" na raiz do nosso projeto.

[03:30] Eu vou clicar com o botão direito e vou revelar in finder, “Reviel in Finder” e, dependendo do seu sistema operacional, pode ser revelar nas pastas, revelar no Explorer ou você pode navegar diretamente, abrir uma pasta e abrir essa pasta diretamente. Eu vou revelar essa pasta aqui no meu Finder.

[03:51] A pasta “coverage” está aqui, como todos os arquivos do projeto. Vou entrar dentro da pasta “coverage”, vou entrar dentro da pasta "icov-report" e temos esse "index.html". Pode clicar com o botão direto, abrir com o Chrome. Caso ele não esteja abrindo com o Chrome, você abre com o Google Chrome ou com o navegador que você tiver. Eu vou abrir com o Chrome. Na verdade ele está abrindo em outra aba, mas eu vou fazer com que ele abra aqui, vou copiar a URL que apareceu aqui para mim.

[04:25] Ele vai abrir dentro dos meus arquivos, abriu aqui e ele já nos mostra várias informações. Aqui em cima no começo ele fala All files, todos os arquivos, 2.09%, essa é porcentagem de covarage do nosso projeto, testamos 3 de 143, são 3 coisas de 143 coisas que poderíamos ter testado no nosso projeto. Podemos fazer um filtro aqui, pesquisar o que queremos, mas vamos dar uma olhada nessa tabela do que testamos. Repare que aqui o "leilaoTestes/src/negocio/formatadores", que é o que estávamos, está em 50%, testamos arquivos desse.

[05:21] E se clicarmos nele conseguimos ver os dois arquivos o “lance.js” e o “moeda.js”. “moeda.js” está 100% testado, está tudo certo, está verde não está mostrando nada com problema, testamos as duas funções.

[05:43] E basicamente tem três linhas de teste que ele mostra, por isso que aqui é 100% statements 3 de 3, 3 linhas que podíamos ter testado e testamos as três. Agora de abrirmos o “lance.js” vamos ver que não conseguimos testar tudo, não testamos nada, na verdade está 0%. Teria uma função, tem esse if também que temos que testar e o return. Faltaram essas coisas para testar e você pode testá-las nas atividades a seguir, no "Faça Como Eu Fiz".

[06:20] Os "Faça Como Eu Fiz" vão instigar você a testar, a treinar esses conhecimentos que aprendemos na aula. Você vai dar uma olhada lá e vai tentar testar e fazer com o que esse lance aqui esteja em 100% também. Assim, conseguimos ver o coverage da nossa aplicação.

[06:41] Ainda temos esse monte de coisas aqui no nosso teste e toda vez temos que ficar rodando npm test. No próximo vídeo vamos criar alguns scripts para facilitar a nossa vida na hora de rodar os testes.

@@06
Adicionando Scripts

[00:00] Estamos rodando o comando npm test cada vez que queremos rodar os testes. Assim ele coleta o coverage e tudo isso que já fizemos. Seria bom criarmos scripts, como já comentamos, para agilizar esse processo, não queremos toda vez ficar coletando coverage e também não queremos ficar toda vez digitando npm test.
[00:20] Para isto no "package.json", aqui em cima nos scripts, temos o script test que vai ser o script que vai rodar quando rodarmos o npm test. Vamos agilizar isso aqui e ao invés de mudar apenas o Jest vamos passar alguns parâmetros, o primeiro deles vai "test": "jest --watch".

[00:56] Então vamos ficar assistindo. O nosso Jest vai ficar olhando os arquivos do nosso projeto e, quando salvarmos, ele vai rodar os testes novamente. Não precisamos ficar rodando toda vez o comando npm test, ele já vai rodar para nós, vou mostrar como é que funciona.

[01:11] Quando estamos testando, nós também não queremos coletar o coverage todas as vezes. Nesse comando test eu vou passar mais um parâmetro que vai ser --coverage=false. Eu não quero coletar o coverage quando rodar simplesmente npm test.

[01:32] E eu vou coletar o coverage apenas uma vez, não quero ficar dando um watch e ele ficar gerando coverage em todas as vezes. Vou colocar vírgula aqui e vou criar um novo script que vai ser: "testFinal":, o teste final mesmo, como se fosse o teste para a produção, o teste real que eu quero testar e não o teste enquanto estou fazendo os testes.

[01:59] Vou abrir aqui aspas e vou escrever o comando que eu quero escrever e que é basicamente o Jest, o comando que estávamos chamando antes, "testFinal": "jest". Vou salvar aqui e vamos testar esse teste e o testFinal.

[02:12] Vou abrir o terminal, "Terminal > New Terminal", e vamos rodar o npm test que é o que rodávamos antes. Repare que ele não rodou nada porque ele já verifica o que alteramos ou não, nesse caso acabamos de rodar e não alterou nada. Para rodar os testes todos novamente repare que ele tem aqui várias opções, watch usage. Como podemos usar esse comando? Podemos apertar "a" para rodar todos os testes. É isso que queremos.

[02:57] Vamos apertar "a", só apertar "a" no teclado e ele roda todos os testes e ele passou os dois testes novamente. Para ver os comandos, para mostrar o que mais podemos ver, basta apertar "w" para mostrar mais. Ele mostra os comandos novamente. O "a" vai rodar tudo, o "f" vai rodar apenas os testes que falharam, o "o" vai rodar apenas os testes que tiveram mudança e assim por diante. Podemos fazer vários testes. Podemos pressionar "Enter" aqui para rodar algum teste específico e também podemos sair desse modo. O penúltimo comando é o "q", apertamos "q" e saímos do watch do teste, voltando para o terminal.

[03:50] Agora vejamos o que o comando testFinal faz. Vamos rodar o npm, lembra que como o teste é um comando conhecido, um script conhecido não precisamos dar o run, mas no caso do "testFinal" precisamos: npm run testFinal. Ele não vai ficar olhando, o teste já terminou aqui e ele gerou o coverage para nós. Quando quisermos gerar o coverage rodamos testFinal.

[04:22] Assim agilizamos o processo de testes da nossa aplicação. Na próxima aula vamos começar a entender melhor como funcionam os mocks dos testes, como podemos simular algumas coisas nos testes para que não peguemos as APIs reais, os bancos de dados reais, por exemplo, queremos camuflar isso, simular essas funções. Te vejo na próxima aula.

@@07
Testes de Unidade

Vimos sobre os testes de unidade em aula. Agora, observe a função abaixo:
function soma(num1, num2) {
        return num1 + num2;
}COPIAR CÓDIGO
Gostaríamos de fazer um teste unidade com essa função.

A partir dos aprendizados vistos, você pode identificar qual dos códigos abaixo corresponde a um teste de unidade?

it('deve retornar 3 quando os parâmetros forem 1 e 2', () => {
        if (soma(1,2) === 3)
                return true;
        return false;
});
 
Alternativa correta
it(() => {
        expect(soma(1,2)).toBe(3);
});
 
Alternativa correta
test('deve retornar 3 quando os parâmetros forem 1 e 2', () => {
        expect(soma(1,2)).toBe(3);
});
 
Resposta Correta! Podemos usar test ou it para criar um teste, passando sempre a descrição. Usando o expect, podemos testar diferentes ocasiões, por exemplo, o toBe para verificar igualdade.

@@08
Faça como eu fiz: mais testes de unidade

Nesta aula, começamos a criar os testes de unidade.
Agora, é hora de colocar a mão no código!

Finalize os testes de unidade dos arquivos negocio/formatadores/lance.js e negocio/validadores/lance.js, tentando replicar os passos vistos durante os vídeos.

Se precisar de ajuda, nos chame no fórum!

É possível acessar o commit dos testes de unidade desses arquivos por meio deste link.

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao/tree/FCEFAula2

@@09
O que aprendemos?

Nesta aula, estudamos os seguintes assuntos:
Instalação da biblioteca jest;
Configuração da biblioteca jest;
Criação de um teste de unidade;
Configuração de scripts para facilitar a execução dos testes no package.json.
Nos vemos na próxima aula!

#### 28/12/2023

@03-Mocks e Chamadas

@@01
Projeto da aula anterior

Para acessar o projeto com os códigos realizados na aula anterior, caso você esteja começando a partir desta aula ou não tenha acompanhado alguma parte, veja a branch por meio deste link.

@@02
Mockando um arquivo

[00:00] Para essa aula vamos testar o repositório de leilões, que é esse arquivo que está dentro de "src > repositorio > leilao.js". Repositório é um tipo de padrão de projeto que podemos utilizar que vem do inglês repository. Também testaremos o obtemLeiloes, o primeiro método do nosso repositório de leilão. Vai lá na API e dar um get no barra leilões para pegar todos os leilões, ele vai retornar uma lista de leilões.
[00:33] Caso dê algum erro nessa requisição, ele vai retornar uma lista vazia, simplesmente. Ele estava fazendo um try cat aqui. E o método obtemLeilao, passando o Id, é bem semelhante. Ele vai fazer um get /leiloes/${id}e vai retornar o leilão, caso contrário ele retorna um objeto vazio.

[00:55] Vamos testar essa função de obtemLeilao. Para isso, primeiro na nossa pasta de "tests" vamos criar outra pasta chamada "repositorio" para fazer o mesmo caminho que tem dentro do "src", "repositorio" e dentro dele vamos ter o nosso arquivo "leilao.test.js". Agora aqui dentro fazemos o import da função que queremos testar: import { obtemLeiloes } from '../../src/repositorio/leilao";.

[01:42] Vamos fazer os describe do arquivo: describe('repositorio/leilao', () => { }); e aqui dentro vamos criar o segundo describe da nossa função: describe('obtemLeiloes', () => { });. Agora estamos fazendo testes dentro da função obtemLeiloes. Vamos testar com it. Isso é o método de teste que deve retornar uma lista de leilões quando chamamos o obtemLeiloes: it('deve retornar uma lista de leilões', () => { });. Nessa descrição eu posso colocar acento que não tem nenhum problema.

[02:51] Aqui vamos criar um constante const leiloes = await obtemLeiloes();, estamos armazenando os leilões em uma variável e como utilizamos o await precisamos usar o async no começo da função. Nessa função do it vamos colocar um async antes da função, it('deve retornar uma lista de Leilões', async () => { const leiloes = await obtemLeiloes(); });. Vamos dar um console.log(leiloes); nos leilões e ver o que está aparecendo para nós. Vou salvar e vou rodar aqui npm test no terminal.

[03:29] Rodamos aqui o npm test, passou um teste que tinha. Como esse é o único que ele está alterando é o único que ele está chamando, se rodarmos todos vai pegar os outros testes que já fizemos também. No console.log, deu um array vazio, pode ser que no seu caso apareçam os leilões de fato, porque eu não estou rodando a API aqui na minha máquina. Eu vou abrir um novo terminal e vou dar o npm rum api para rodar ela na máquina, na porta 3000. Se você já estiver rodando não precisa rodar de novo.

[04:05] Agora vou fazer o teste e passar de novo, vou apertar "a" aqui, já rodou mais testes. Repare aqui que no log está vindo os leilões e aqui no log da API também ele deu o GET "/leiloes". Só que isso pode não ser tão interessante, porque, dependendo se API está online ou offline, vai retornar uma coisa diferente. Como é que vamos testar isso?

[04:30] Pode haver casos que podem ser interessantes, mas no nosso caso não queremos fazer um teste de integração, aquele teste que testa o serviço externo mesmo, queremos fazer um teste de unidade que vai testar apenas o funcionamento do obtemLeiloes, sem ver se a API está online, se o banco de dados está funcionando ou qualquer outro serviço externo.

[04:53] Como podemos fazer para testar esse método obtemLeiloes se ele tem acesso a uma API? Também serve para qualquer outro caso que queiramos testar sem utilizar uma função real. Para isto podemos fazer uma simulação da nossa API. Temos o apiLeiloes que vem de servicos/apiLeiloes, podemos fazer com que esse arquivo seja mockado, seja simulado, e não seja chamado o arquivo real mesmo.

[05:28] Para fazer isso aqui no nosso arquivo de testes “leilao.test.js”, vamos escrever, antes de todos os describes, abaixo do import, um jest.mock(). É uma função do Jest. Estou chamando o Jest em uma função chamada mock e vou passar entre "" o caminho do arquivo que eu quero mockar. O caminho do arquivo é ../../, volta duas pastas e aí entramos dentro de "src". É o mesmo caminho que está no import do “leilao.js”. Queremos mockar a API de leilões do serviço da API e não o arquivo do repositório. Vai ser jest.mock('../../src/servicos/apiLeiloes');.

[06:42] Aqui no nosso arquivo original, quando o “leilao.js” chamar a apiLeiloes.get, ele não vai chamar esse servicos/apiLeiloes. Não é para receber nenhum log diferente na nossa API. Não vamos chamá-lo, e sim uma função mockada. Vamos testar para ver o que ele retorna. Vou mandar rodar novamente aqui no terminal do teste, vou apertar "a" e temos uma função vazia.

[07:14] Pode ver que não foi chamado novamente na nossa API, ele está sendo mockado, está sendo substituído por alguma outra coisa, porém ainda não descrevemos o que exatamente queremos que retorne a função get da API leilões. É isso que vamos fazer no próximo vídeo, vamos descrever o que queremos que volte dessa função.

@@03
Customizando a implementação

[00:00] Continuando o nosso teste do repositório de leilão quando mockamos a API ele mocka as funções, mas não declaramos o que exatamente queremos que a função retorne. Para que retornemos alguma coisa há várias formas de fazer, podemos colocar uma vírgula aqui, por exemplo, nesse jest.mock o primeiro parâmetro é a string, a URL onde damos o caminho do arquivo que queremos mockar, podemos passar como segundo parâmetro uma função que vai retornar o que exatamente vamos ter dentro da API leilões.
[00:39] Porém não vamos fazer dessa forma, é uma forma mais fácil de fazer. Caso você queira mockar uma coisa mais simples, dá para fazer dessa forma. Não vamos fazer dessa forma porque cada API, cada método desse aqui, vai retornar coisas diferentes. Se fizermos um get no leilões vai retornar uma lista de leilões, se fizermos um get no leiloes/${id} vai retornar um objeto de leilões, queremos fazer mocks diferentes para cada teste que formos fazer.

[01:12] Ao invés de fazermos isso, vou apagar e deixar apenas jest.mock. Vamos fazer de uma forma um pouco diferente. Primeiro, vamos definir o que são os nossos leilões, vou fazer uma constante aqui abaixo do mock, cons mockLeiloes = [ igual a uma [] de leilões. Vai ser uma [] com um único leilão só para testarmos mesmo. O leilão será um objeto, abre e fecha chaves id: 1, vai ter também um nome: 'Leilão', descricao: 'Descrição do leilão' } ];.

[02:05] Criamos um objeto, o mockLeiloes, que vai ser uma representação da nossa lista de leilões que queremos retornar. Vamos fazer agora um mock da função de requisição, vamos descrever como queremos que ele seja. Ainda não estamos definindo que ela vai ser um mock, mas queremos descrever como queremos que ela seja.

[02:24] Vou criar uma constante aqui que vai ser uma função. Mocka requisição igual e vamos receber um parâmetro para podermos modificar o que vamos retornar. No caso, se quisermos testar o retorno dos leilões vamos retornar uma lista de leilões, se quisermos testar o retorno de um leilão específico, vamos retornar um único leilão. Vamos fazer com que essa requisição retorne qualquer coisa que queiramos. Vou colocar aqui uma variável chamada retorno e vamos passar o retorno do nosso mock por parâmetro: const mockRequisicao = (retorno) => { };.

[03:02] Dentro da função, vamos retornar e, para simular de fato uma função, ela retorna uma promise. Demora um tempo para fazer a requisição, então vamos utilizar um set time out e criar uma promise para essa requisição. Para criar uma promise, primeiro damos um return new Promise();. Depois, nossa promise vai ser uma função aqui dentro, vai ser uma função e podemos definir um parâmetro. Pode ter o parâmetro resolve, que é o primeiro, e podemos ter o parâmetro reject, mas no nosso caso não vamos ter, vamos sempre ter o sucesso: return new Promise((resolve) => {});.

[03:49] Temos o parâmetro resolve e agora, dentro da função da promise, vamos fazer um set time out, setTimeout() =>, a função do time out para simular o tempo de demora da requisição, e o segundo parâmetro depois da função vai ser os milissegundos, vou colocar 200 milissegundos que vai demorar a requisição. Então vamos utilizar essa função resolve para retornar a promise o que vai acontecer, o que vai retornar quando a promise terminar, quando o set time out rodar.

[04:30] Vamos retornar um objeto, que vai ter dentro data, porque repare que quando fazemos uma requisição no “leilao.js”, quando damos um get, nós sempre pegamos a resposta por data. Data é uma propriedade do Axios mesmo, da requisição que podemos pegar um corpo de retorno da nossa requisição, por isso que temos esse data;. E o retorno em si: resolve({ data: retorno }) }, 200); }); }. Vamos resolver um objeto que tem data dentro, dois pontos o retorno que passamos por parâmetro.

[05:07] Isso quer dizer que quando chamarmos essa função, ela vai retornar, depois de 200 milissegundos, o objeto data com a mesma coisa que passamos para ela. Já fizemos o nosso mock de requisição, vamos fazer com que esse mock seja aplicado de fato na nossa API. Primeiro precisamos importar o arquivo de API.

[05:32] Aqui em cima eu vou fazer um import apiLeiloes from '../../src/servicos/apiLeiloes'; Agora podemos pegar as referências mockadas das funções que existem aqui, que o mock fez para nós, e fazer uma implementação diferente.

[06:01] Para isto viremos aqui no nosso teste mesmo, no 'deve retornar uma lista de leilões', no it. Dentro eu vou criar. Pela primeira vez eu vou mockar a função de fato, vou definir que o get do apiLeiloes vai ser esse mock que acabamos de criar.

[06:22] Para fazer isso vamos pegar o objeto que acabamos de importar que é o apiLeiloes.get, que é a função que queremos mockar lá dentro. Como estamos mockando aqui, temos várias funções de mock que podemos fazer com esse mock. Uma delas é mockImplementation, ele mocka a implementação do nosso método. Queremos mockar a implementação do get, mockImplementation() é uma função e passamos dentro dos () como queremos que essa função seja.

[07:04] Queremos que seja novamente uma função e aqui vamos usar o mockRequisicao que criamos. A requisição recebe alguma coisa como parâmetro para que possamos retornar. A requisição vai receber o mock de leilões que criamos. Dentro do mockRequisicao, vamos passar o mockLeiloes, então apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));.

[07:32] Vamos ver o que estamos fazendo aqui. Estamos pegando o método get da nossa API, mockando a implementação dele para ele retornar uma função que retorne essa função que criamos, que dá um time out, retornando sempre o mockLeiloes. Se quisermos retornar alguma outra coisa na requisição, podemos só mudar esse parâmetro, por isso que fizemos dessa forma, e não colocando vírgula aqui no mock.

[08:01] Vamos testar, vamos salvar e rodar o npm test. Se você já estiver rodando basta só apertar a tecla "a" para ele rodar de novo o teste. E o console.log foi o próprio leilão que tínhamos mockado, estamos recebendo esse leilão como mock. Vamos também fazer um expect para esperarmos que o leilões seja, de fato, a lista de leilões, ao invés de dar um console.log, vamos fazer isso.

[08:36] Aqui no lugar do console.log vou fazer um expect(leiloes)., e nesse caso não vai ser um toBe, porque ele é um objeto, e para objetos utilizamos o toEqual. E leilões vai ser igual ao mockLeiloes que criamos, então expect(leiloes).toEqual(mockLeiloes);. Vou salvar, ele vai rodar de novo e pronto, já temos o nosso arquivo de teste passando.

[09:15] Vamos fazer um segundo teste agora para utilizarmos esse mockRequisicao. Vamos fazer um teste, caso a implementação do get dê algum erro, caso a API esteja com falha o nosso software. Não pode travar porque a API está offline. Vamos copiar esse teste 'deve retornar uma lista de leilões', vou colar aqui, duplicar o teste e vou renomear: it('deve retornar uma lista vazia quando a requisição falhar', async () =>. Essa vai ser a descrição.

[09:55] Agora vamos ter a mockRequisicao, obtemLeiloes, toEqual a uma lista vazia. O expect vai ser uma lista vazia, expect(leiloes).toEqual([]);. E agora a implementação aqui não vai ser mockRequisicao. Precisamos criar um outro mock de requisição com erro. Vou copiar essa função do mock de requisição aqui em cima e vou renomear a segunda função para const mockRequisicaoErro = () => [. Não precisamos de um parâmetro para receber, porque vamos retornar sempre erro.

[10:28] Agora vamos utilizar aquele segundo parâmetro da promise, não vamos mais utilizar o resolve vamos utilizar o reject, return new Promise((_, reject) => {. Aqui onde está o resolve vou colocar um underline porque não vamos utilizá-lo e ele não precisa ser salvo em memória. E ao invés do resolve, dentro do set time out eu vou simplesmente dar um reject, reject();.

[10:54] Ficou assim: temos o mock de requisição, eu o dupliquei para baixo para mockRequisicaoErro. É uma função que vai retornar uma promise, vai pegar o reject depois de 200 milissegundos e vai retornar apenas reject, vai chamar o método de reject.

[11:12] Agora podemos utilizar esse mockRequisicaoErro para mockar a requisição. Vou apagar e, dentro do nosso segundo teste, no mockImplementation, vai retornar uma função que vai ser a mockRequisicaoErro, sem nenhum parâmetro, não precisamos desse parâmetro: apiLeiloes.get.mockImplementatios(() => mockRequisicaoErro());. Vamos salvar e ver o que acontece. Os dois teste passaram, agora quando temos uma requisição com erro ele retorna o array vazio aqui no leilões.

[11:42] Será que retornar alguma coisa diferente é a única coisa que podemos fazer com esses mocks? No próximo vídeo vamos descobrir um pouco mais sobre o que podemos fazer com mocks.

@@04
Para saber mais: funções de Mock

Nesta aula, aprendemos a simular funções para que os dados originais não sejam afetados. Usamos alguns métodos do jest para trabalhar com mocks, e abaixo estão os mais utilizados:
mockClear(): Limpa todos os registros das chamadas das funções;
mockReset(): Faz tudo o que mockClear() faz, e também limpa as implementações e valores a serem retornados, voltando a ser como quando criamos uma função jest.fn();
mockRestore(): Faz tudo o que mockClear() faz, e também volta a implementação de método original;
mockImplementation(fn): Seta uma nova implementação para a função mockada. Há um atalho para esse método: jest.fn(implementation);
mockReturnValue(value): Seta um valor fixo a ser retornado.
Você pode verificar mais funções neste link da documentação.

https://jestjs.io/pt-BR/docs/mock-function-api

@@05
Verificando Chamadas

[00:00] Agora vamos ver o que mais podemos fazer com os mocks além de mockar a implementação. Podemos verificar se tal método foi chamado, quantas vezes e com quais parâmetros ele foi chamado, por exemplo, estamos chamando o obtemLeiloesaqui no nosso teste, no leilao.test.js. Esse obtemLeiloes chama o método get passando o parâmetro /leiloes. Podemos verificar se ele chamou esse método get e se ele chamou esse método get passando o parâmetro, uma string /leiloes.
[00:38] Para fazer isso basta, nesse primeiro teste onde temos const leiloes = await obtemLeiloes();, depois do expect, começar com outros expects, que vão ser expects de validação para verificar as chamadas, verificar se os métodos foram chamados em tal parâmetro.

[01:09] Vamos criar um expect(apiLeiloes.get), que esperamos que o método get toHaveBeen, tenha sido called, chamado, with, com. Que o método apiLeiloes.get tenha sido chamado com e passar o parâmetro que eu espero que ele tenha sido chamado, que é expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes'); Vamos salvar e testar.

[01:55] Vou rodar o teste, npm test, e o teste passou, ele foi chamado com leilões. Ainda podemos verificar quantas vezes ele foi chamado. Na linha debaixo colocamos: expect(apiLeiloes.get).toHaveBeenCalledTimes(1);, eu quero que esse método tenha sido chamado apenas uma vez. Vamos salvar, rodamos os testes novamente e novamente passaram.

[02:36] Vamos fazer esses mesmos testes para o teste de baixo, para o testo do erro. Quando temos uma requisição com erro esperamos que dê essa falha aqui, vou colar abaixo esses mesmos expects de to have been called e to have been called times para vermos se está correto, se foi chamado com /leiloes e uma vez. Esperamos que ele deve ter sido chamado, deve passar esse teste, porém quando salvamos temos uma falha.

[03:17] Repare que a falha é nessa toHaveBeenCalledTimes, quantas vez ele foi chamado. Esperávamos que ele tivesse sido chamado 1 vez, porém ele foi chamado 2 vezes. Por que duas vezes? Aqui no nosso código será que estamos chamando o get, fazendo duas vezes a requisição? Na verdade não, o que acontece é que esse toHaveBeenCalled, essa informação da função é global para todo o nosso teste.

[03:48] Já fizemos um teste, e nesse teste foi chamado uma vez, e na segunda vez fazemos outro teste e chamamos novamente, foram chamados duas vezes. Podemos utilizar uma propriedade do Jest para limpar esse mock, para limpar esse número de vezes que a função foi chamada.

[04:09] Para fazer isso, aqui no nosso describe geral, entre os dois describes, eu vou chamar uma função, que é a beforeEach. Essa uma função, se você já viu as funções globais do Jest, você pode ter observado ela, é uma função que vai rodar sempre antes de cada teste. Antes de cada teste, vamos passar uma função aqui dentro para rodar alguma coisa, para executar alguma coisa, que vai ser limpar esse mock para que ele resete a contagem de requisições.

[04:50] beforeEach(() => { função. Dentro dela, vamos ter apiLeiloes.get.mockClear(); que é uma outra função do mock. Vamos ter também um "Saiba Mais" com várias funções do mock para você dar uma olhada. Essa função mockClear vai limpar apenas a requisição, ela não vai limpar a implementação em si.

[05:15] Vou salvar aqui e agora sim, tivemos sucesso. É assim que conseguimos. Sempre devemos limpar quando vamos testar a mesma coisa em vários testes diferentes, porque senão podemos ter esse problema do número de requisições, do número de chamadas, ficar sujo ou mesmo da chamada que estamos esperando pegar a chamada anterior, e não a chamada do teste que queremos mesmo. Podemos usar esse be for each.

[05:43] Também tem o be fore all, tem o after each que é depois de cada, after all que é depois de todos. Têm vários métodos que podemos utilizar para fazer essa limpeza do nosso mock.

[06:02] Não esqueça de dar uma olhada no "Faça Como Eu Fiz" para concluirmos mais testes aqui nesse arquivo, para você treinar esses conceitos que aprendemos de mocks. Te vejo na próxima aula.

@@06
Para saber mais: outra forma de mockar

Além do mock do arquivo ou módulo completo, podemos também mockar um único método. Veja o exemplo abaixo de como podemos mockar o método useEffect do próprio React Native:
import React from 'react';

test('mock de um método', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
});COPIAR CÓDIGO
Neste exemplo, o useEffect mockado irá executar a função (f) logo ao ser chamado.

Você pode acessar a documentação do spyOn neste link.

https://jestjs.io/pt-BR/docs/jest-object#jestspyonobject-methodname

@@07
Faça como eu fiz: mais testes com mocks

Nesta aula, adicionamos mocks para simular funções nos nossos testes. Para reforçar os conceitos vistos e seu aprendizado, você pode finalizar os testes, usando os mocks dos arquivos repositorio/lance.js e respositorio/leilao.js.

O objetivo desta atividade é que você criasse os mocks nos arquivos repositorio/lance.js e respositorio/leilao.js, os quais não vimos em aula. No entanto, a lógica de implementação é bastante semelhante e não apresenta grandes dificuldades.
Acesse o commit dos testes de unidade desses arquivos por meio deste link.

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao/tree/FCEFAula3

@@08
O que aprendemos?

Nesta aula, aprendemos a:
Aplicar um mock a um arquivo, prevenindo a execução do comportamento original;
Simular o comportamento das funções do arquivo mockado;
Verificar se as funções mockadas foram chamadas, considerando os parâmetros e a quantidade de chamadas;
Criar um método para limpar os mocks.

#### 29/12/2023

@04-Testes de Hook e Componente

@@01
Projeto da aula anterior

Para acessar o projeto com os códigos realizados na aula anterior, caso você esteja começando a partir desta aula ou não tenha acompanhado alguma parte, veja a branch por meio deste link.

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao/tree/Aula3

@@02
Testing Library

[00:00] Vamos focar nessa aula começando com os testes de hook. Vamos ver qual hook que podemos testar. Aqui dentro de “src” tem uma pasta "hooks" e vamos testar esse hook em "useListaLeiloes", que é o hook que utiliza aquele método que testamos antes de obtemLeiloes(). Como que poderíamos fazer para testar? Já no começo, quando olhamos para a caixa, já imagina que vai acontecer um erro e que vai mesmo, porque o hooks só podem ser chamados dentro de componentes.
[00:33] Esse useState aqui já vai trazer um erro para nós, então não podemos simplesmente chamar esse hook normalmente como se fosse uma função. Tem algumas alternativas para que possamos fazer teste de hook. A primeira alternativa que eu vou dar aqui para vocês é sobre mockar o useState. Já vimos em um "Saiba Mais" de outras formas de mockar como podemos mockar propriedades do React Native mesmo, como o useState.

[01:02] Mas o problema é que precisamos refazer a simulação de como que essas funções irão funcionar, porque precisamos que o useState funcione para que o seteLeiloes funcione, para conseguirmos testar de fato isso. Pode ser que fique um pouco complicado de implementarmos todas as funções que precisamos de outra forma, mocando e implementando elas.

[01:29] Outra forma de testar hooks pode ser criando um componente para testarmos. Como vamos ver nos próximos vídeos, podemos testar componentes mesmo do React Native. podemos testá-los renderizando memória, já ouvimos um pouco falar sobre isso, mas não é legal criarmos um componente só para testarmos um hook, porque temos várias formas de atualizar esse* hook*.

[01:54] Por exemplo, podemos chamar função aqui atualizaLeiloes, para atualizar, podemos recarregar a tela, podemos carregar pela primeira vez. Então existem várias formas de que isso seja atualizado.

[02:05] Vamos ter que gerenciar tudo isso também. Porque não é interessante criarmos um componente só para fazer um teste de um hook. O que podemos fazer? A alternativa que vamos fazer é usar uma biblioteca de testes de hook, que é a Test Library react Hooks. Ela tem dependências com outras bibliotecas também e vamos ter que instalar todas elas juntas, e essas outras também vão nos ajudar a fazer os testes das próximas aulas.

[02:37] Como vamos instalar essa biblioteca? Eu vou pegar o terminal aqui e vou expandi-lo bem grande para vermos. No nosso terminal, eu vou dar uma npm install, e a biblioteca, vou instalá-la lá nas dependências de desenvolvimento. Então vou colocar aqui -- save-dev. Para instalá-la, poderíamos passar simplesmente o nome dela, que é @test-libary, mas precisamos pegar a versão certa compatível com o react-test-renderer, que é aquela biblioteca que transforma o nosso componente naquele arquivo JavaScript, para conseguirmos renderizar em memória.

[03:26] Precisamos que tudo isso se encaixe muito certo. O primeiro passo que precisamos é saber qual que é a versão do React que estamos utilizando, então eu vou vir aqui no "package.json" e vou rolar aqui nas dependências. Temos aqui a dependência do "react": "17.0.1", então essa versão "17.0.1" é a versão do react-test-renderer que vamos precisar instalar. Precisamos fazer tudo isso em um mesmo comando para que todas as bibliotecas sejam instaladas nas versões certas.

[04:06] Começando. Estamos rodando npm install – save-dev react-test-renderer, e essa biblioteca que precisamos especificar a versão, então npm install – save-dev react-test-renderer@17.0.1. Agora podemos chamar as outras bibliotecas que elas vão se adaptar as versões corretas. Então fazemos um espaço, tem que ser tudo na mesma linha, a biblioteca test library, mesmo do React Native, que é a que vamos utilizar para renderizar e nos ajudar ali as chamadas, preencher campos e apertar botões, essas coisas. Vamos usá-la e ela também é uma dependência da biblioteca de testes para hooks.

[04:55] Essa biblioteca começa com @testing-libary/react-native. A próxima, espaço, agora é a última delas, é a biblioteca de hooks mesmo, então vamos chamá-la com @testing-libary. Elas são irmãs digamos assim, @testing-libary/react-hooks. Ok. Deixa só conferir aqui, acho que estar tudo certo, vou dar uma "Enter" para ver se instala. Esse processo pode demorar um pouco, para baixar as bibliotecas.

[05:38] Vamos instalar aqui. Perfeito. Instalamos todas as bibliotecas. Podíamos ter instalado na mão os valores aqui, as versões certas. Se você quiser instalar separado, você pode pegar essas versões e instalar na mão, mas para você pegar as versões mais recentes, independente da sua versão do Expo, da sua versão do React, você pode fazer essa técnica aqui, de passar o react-test-renderer com a versão certa do React, e as outras bibliotecas vão se adaptar a isso.

[06:09] Já instalamos as bibliotecas, então vamos testar a hook com a biblioteca test-library-react-hooks.

@@03
Testando um Hook

[00:00] Agora vamos testar de fato o nosso hook useListaLeiloes. Para fazer isso, iremos para nossa pasta de testes, criaremos outra pasta chamada "hooks", que é o mesmo caminho da original, e dentro dela teremos "useListaLeiloes.test.js". Já temos o nosso arquivo de teste aqui.
[00:25] Primeiro vamos importar o no nosso hook, useListaLeiloes, import useListaLeiloes from '../../src/hooks/useListaLeiloes. Vamos fazer um describe do arquivo que estamos testando, então describe('hooks/useListaLeiloes', () =>). Não precisamos fazer um outro describe para função, porque essa é a única função que nosso arquivo tem, ele só utilizou o hook useListaLeiloes.

[01:07] Agora já podemos começar fazendo o nosso teste, então it(), vai fazer o quê? O hook deve retornar uma lista de leilões e ele também deve retornar aquele segundo parâmetro que é um parâmetro para atualizar a lista, então it('deve retornar uma lista de leiloes e uma função para atualizar', () =>), e aqui estar a nossa função de fato.

[01:46] Chamamos aqui useListaLeiloes. Lembra que eu falei que não poderíamos chamá-lo diretamente? Eu não demonstrei isso aqui, mas podemos simplesmente chamar, vou simplesmente chamar o useListaLeiloes, vou dar um npm test aqui. Já temos um erro, informando que precisa conter pelo menos um teste. Não está salvo, vamos salvar. Aqui estar falando: "invalid hook call", então é "chamada de hook inválida". Os hooks devem ser chamados apenas dentro do corpo de componentes de função.

[02:22] Esse é o erro que aconteceu, e instalamos a biblioteca para não ter esse erro aqui. Como que vamos fazer para chamar o hook useListaLeiloes usando a biblioteca? Aqui em cima, como primeiro import, antes desse, eu vou fazer um import { renderHook } from e vamos adicionar a biblioteca test-library que instalamos, que é @testing-library/react-hooks. Ok.

[03:07] Agora vamos utilizar o renderHook aqui na chamada do teste, então onde antes estávamos chamando simplesmente useListaLeiloes, vamos chamar renderHook( () => useListaLeiloes() ). Agora, se salvarmos, continuamos tendo erros aqui. Isso é bem natural. Mas não é o mesmo erro que tínhamos antes. O que é esse erro que estamos tendo agora? Qual é o problema?

[03:46] Ele está falando aqui no erro que atualizações por componente "TestComponent", que esse "TestComponent" é um componente dentro da biblioteca test library de react-hooks. Ele está falando que algum updates não está sendo feito dentro do método act. Só que temos uma coisa: esse método renderHook já usa o método act por trás dos panos. O problema é que estamos chamando o useListaLeiloes, e ele vai ser criado contendo o useEffect, que atualiza ListaLeiloes.

[04:30] Esse atualizaListaLeiloes vai obter informações da API, vai demorar um tempo, e ele vai setar aqui os leilões. Isso aqui não ser síncrono, isso é assíncrono, vai ser em paralelo do que estar sendo executado. Vamos chamar isso daqui. Vamos iniciar esse processo. Porém, esse processo não está terminando dentro desse teste, então precisamos esperar que esse processo termine para podermos fazer alguma coisa, não podemos simplesmente terminar o teste antes que todas as funções sejam chamadas.

[05:01] O que vamos fazer é capturar desse renderHook. Vou criar uma constante para armazenar esse renderHook, as informações, só que eu vou desconstruir aqui, então const { } = renderHook( () => useListaLeiloes() ). Quais são as variáveis que eu quero pegar do renderHook? Primeiro podemos colocar a waitForNextUpdate, então esse método vai esperar até o próximo update e é isso que queremos.

[05:34] Vou copiar esse nome do método e vou fazer na linha de baixo um awaitForNextUpdate, chamando essa função. Como estamos usando o await aqui, preciso colocar um async no começo da função do nosso teste. Vamos salvar agora e pronto, não temos mais o erro. Passou aqui porque não deu nenhum erro, mas não tem nada acontecendo. Só estamos renderizando hooks, mas não estamos nem vendo o que estar acontecendo.

[06:03] Até podemos rodar nossa API para ver que ele está sendo chamado e isso vai acontecer mesmo, ele vai ser chamado, a nossa API, porque o useListaLeiloes usa o obtemLeiloes. Nós mocamos a API, só que mockamos em outro arquivo de teste. O mock que está lá naquele arquivo não vai ser passado para esse nosso novo arquivo de teste de hook, então precisamos mockar de novo. O que vamos mockar?

[06:27] Diferente do que fizemos antes, quando tínhamos mockado a API, vamos mockar diretamente o obtemLeiloes, o repositório de leilão. Vamos fazer isso, vamos mockar o repositório de leilão. Aqui embaixo dos import, vou chamar jest.mock('../../'src/repositorio/leilao'). Pronto, agora já temos o nosso repositório mockado aqui. Vamos ver o que estamos recebendo.

[07:10] Para vermos o que estamos recebendo, nessa constante podemos desconstruir mais um parâmetro. Antes do waitForNextUpdate vou chamar aqui { result, waitForNextUpdate }. Então, do renderHook, obtivemos esse result também. Vamos dar uma olhada no que tem nesse result, então console.log(result). E eu vou fazer um console.log(result) antes do waitForNextUpdate também, então vão ser dois console.log.

[07:39] Além disso, aqui no result, precisamos também fazer console.log(result.current[0]) para pegarmos o valor exato do resultado nesse momento em que estamos acessando o resultado. Então para pegarmos o que o hook está retornando, é assim que pegamos. Vou salvar e vamos ter aqui o console, primeiro ele retorna um array vazio e segundo ele retorna um undefined. Vamos ver aqui porque ele está retornando undefined.

[08:13] Ok. Está totalmente correto. Por que, o que estar acontecendo aqui? Primeiro, estamos dando o console.log antes de chamarmos de fato o que estar acontecendo aqui no useEffect, antes de atualizarmos a lista de leilões. O primeiro retorno dele aqui é o leiloes, por isso que estávamos dando um 0 aqui, estamos pegando result.current[0], que é a primeira posição do array que ele está retornando, que é a variável leiloes. E a variável leiloes começo do começo como um array vazio e esperamos pelo próximo update.

[08:54] E depois esse obtemLeiloes retorna e seta nos leilões undefined, por quê? Porque mockamos o nosso repositório de leilão, mas não identificamos o que queremos que retorne desse repositório de leilão. O que eu quero que retorne vai ser um mock de leilões. Até podemos copiar do outro teste, então vou pegar o teste de repositório leilão e aqui em cima vou copiar o mockLeiloes e vou colar aqui para também termos um mockLeiloes aqui.

[09:26] É legal que todas essas constantes fiquem exatamente no arquivo que estamos testando para que não se confunda, não misture o mesmo mock de leilões para vários arquivos. Nesse caso, vamos simplesmente copiar e colar mesmo e temos agora um mock de leilões com array de um leilão com id 1, nome "leilão", descrição "descrição do leilão".

[09:52] Agora vamos mockar o método do nosso repositório de leilão. Para mockarmos, lembra que precisamos importá-lo? Vamos importar, import { obtemLeiloes }, que é a função aqui que o nosso hook está chamando, import {obtemLeiloes} from '../../src/repositório/leilao'. Agora, antes de cada chamada no nosso teste vamos mockar o retorno. Não precisamos fazer aquela coisa complexa, de requisição. Por quê? Isso já está feito lá.

[10:39] Vamos fazer o seguinte: vamos chamar o obtemLeiloes.mockImplementation(), então vamos mockar a implementação do obtemLeiloes para que ela seja uma função que simplesmente retorne o mock de leilões: obtemLeiloes.mockImplementation( () => mopckLeiloes). Pronto, agora já estamos mockando a implementação do obtemLeiloes. Vou salvar e, rodando o teste de novo, já temos aqui um resultado diferente.

[11:07] O primeiro console.log retorna um array vazio e o segundo console.log retorna o array do mock de leilões que criamos. Já estamos pegando aqui o array vazio e depois o array com mock. Até podemos fazer um expect para isso, então no console.log vou chamar expect(result.currente[0].toEqual().

[11:38] Espero que, quando eu chamo o hook, a primeira coisa que ele faz é me retornar um array vazio e, depois que passar pelo useEffect e fazer uma atualização, eu espero que ele me retorne, como primeira posição no array de leilões, o mock dos leilões, expect(result.currente[0].toEqual(mockLeiloes).

[11:55] Isso já é um teste que estamos fazendo. Vou salvar aqui, dar um "Enter". Para termos um espaço melhor, não tem mais console.log. Está passando os nossos testes. Legal. Agora podemos fazer o seguinte: podemos mudar o mock aqui que fizemos do obtemLeiloes e atualizá-lo para adicionar mais um leilão na nossa lista. Como podemos fazer isso? Eu vou copiar esse mockLeiloes, essa constante, vou colar aqui embaixo e essa constante de mockLeiloes vai ter um leilão a mais, então eu vou copiar o objeto e colar aqui para baixo.

[12:33] Temos agora no nosso array dois objetos. Vou trocar aqui o id para 2, vou botar um Leilão 2 em nome e descrição do leilão 2. Nada está acontecendo ainda. Depois que já esperamos que retorne os leilões do mock, precisamos alterar o nome também, const mockLeiloesAtualizada. É uma lista atualizada, senão ele falha aqui porque tem duas variáveis com o mesmo nome.

[13:03] Temos a nossa lista atualizada. Agora, no final do nosso teste, vamos mudar o mock. Então vamos fazer o obtemLeiloes ser implementando por obtemLeiloes.mockImplementation) () => mockLeiloesAtualizado). Agora quando o hook for chamar o obtemLeiloes novamente, ele vai retornar novos leilões, vai retornar essa lista com dois leilões, não só a lista com um apenas.

[13:36] Estamos aqui com obtemLeiloes um dado mock. Agora, aqui para baixo, precisamos fazer uma coisa. Precisamos chamar a função de atualizar os leilões, porque aqui no nosso useListaLeiloes, no nosso hook mesmo, retornamos os leilões e retornamos uma função que vai atualizar esses leilões quando a chamarmos, então precisamos chamar essa função. E precisamos chamar essa função dentro daquele act que já demos uma olhada lá no erro, apareceu esse nome.

[14:07] Esse act vai fazer com que as funções que estejam dentro de estados e use Effects sejam rodados e fiquem aguardando até terminar esse processo, para depois fazer alguma coisa. Então não precisamos fazer waitForNextUpdate de novo. Como que vamos fazer esse act? Primeiro, vamos dar um await act( () =>, vamos criar uma função.

[14:44] E essa função vai fazer o quê? Vai chamar o segundo parâmetro do nosso hook, então o segundo parâmetro está onde? await act( () => result.current[1]() ). Estamos esperando que essa função seja chamada. Esse await é porque essa função é async await mesmo, por isso que estamos dando esse await aqui. Podemos dar um expect() e agora vamos esperar que a lista de leilões não seja mais mockLeiloes, e sim mockLeiloesAtualizada.

[15:31] Vamos esperar que expect(result.current[0]).toEqual(mockLeiloesAtualizada). Vamos salvar aqui e ver o que acontece. Deu uma falha. "Act is not defined". Muito bem. Nós não importamos essa função act, então lá no começo, naquele primeiro import, import { renderHook, act } from '@testing-library/react-hooks'. Pronto. Agora nosso teste passou.

[16:11] Agora estamos testando um hook de fato. É muito legal podermos testar usando essas bibliotecas que vão facilitar a nossa vida. Você não precisa fazer todos esses testes, mas estou dando uma demonstração aqui do que você pode fazer com essa biblioteca. Agora, além dessa biblioteca, instalamos também testing-library/react-native, então vamos ver como fazemos para testar, de fato, a renderização dos componentes em memória. Te vejo em breve.

@@04
Renderizando o Componente

[00:00] Agora que já vimos sobre testes unitários, também já fizemos mocks, já verificamos chamadas, já fizemos um monte de coisa, vamos dar uma olhada nos testes de componente, o teste que renderiza o componente por baixo dos panos. Eu falei também lá no começo de um outro tipo de teste, que é o teste de interface, que é aquele teste que a aplicação roda no simulador mesmo.
[00:22] Esse teste de componente não vai precisar do simulador e ele vai também ter uma fidelidade maior do que o teste de unidade, porque ele vai integrar mais componentes, os componentes que estão dentro desse componente que vamos testar. Enfim, vamos testar qual componente então. Vamos pegar aqui "telas > Leilao > componentes > EnviaLance", que é aquele input, aquele texto que podemos digitar para apertar no botão verde e enviar o lance.

[00:53] É esse componente que vamos testar, esse "EnviaLance.js". Ele tem aqui algumas validações, tem o input, tem algumas mensagens de erro e também tem o botão para apertar e poder fazer alguma coisa com ele. Como de costume, iremos na pasta "testes" e criaremos o mesmo caminho. Vou criar aqui uma pasta chamada "telas", mais uma pasta dentro de "telas" chamada "Leilao/componentes".

[01:28] Agora também precisamos criar o arquivo de teste, que é o "EnviaLance.test.js". Como que vamos começar o nosso teste de enviar lance? Vamos importar o arquivo de enviar lance, import EnviaLance from '../../../../src/telas/Leilao/componentes/EnviaLance'. Importamos o arquivo de "EnviaLance" e vamos fazer o describe, describe ('telas/Leilao/componentes/EnviaLance', () => { }. Como segundo parâmetro vamos usar um método e, dentro dele, vamos poder fazer os nossos testes.

[02:40] O que vai ser o nosso teste? Precisamos verificar se quando o botão for pressionado ele envia um lance de fato, então it('deve enviar o lance quando o botão for pressionado', () =>). Esse é o teste que queremos fazer, vamos abrir a função para escrever o nosso teste aqui dentro. Como que podemos chamar o nosso EnviaLance? Vamos utilizar a biblioteca testing-library do React Navigation.

[03:26] Antes desse import aqui vou importar os métodos da biblioteca que vamos precisar, no caso, é só uma por enquanto, import { render } from '@testing-library*/react-native', é a biblioteca de testes focada no React Native. Essa testing-library tem várias bibliotecas para vários tipos de testes diferentes. Agora podemos chamar esse render aqui passando como parâmetro o componente que queremos.

[04:12] Para isso, também vamos ter que importar o React, igual fazemos nos componentes mesmo. Por quê? Porque vamos utilizar um componente, import React from 'react'. Dentro do nosso teste vamos fazer um const { toJSON } = render() e, aqui dentro, vamos renderizar o EnviaLance. Então como vamos fazer? Vamos chamar como se fosse um componente mesmo. Vamos abrir <EnviaLance, e o EnviaLance recebe alguns parâmetros, que podemos ver aqui no começo da nossa função de componente, onde recebemos o enviaLance, que é uma função que vai ser chamada quando clicarmos no botão.

[05:14] E também a cor, é aquela cor do ícone do nosso leilão. Cada leilão tem uma cor, podemos simplesmente colocar qualquer cor aqui, <EnviaLance enviaLance cor="blue", qualquer cor, não tem problema. E vou fechar o componente, <EnviaLance enviaLance cor="blue" />. Eu posso renderizá-lo dessa forma. O enviaLance vou dar um igual aqui e vou chamar uma função vazia por enquanto, enviaLance ={() => }.

[05:45] Vamos salvar. Só checar se dá algum erro quando rodamos o teste, npm test. Está rodando e ele passou. Não deu nenhum erro. Não fizemos nenhuma validação também, apenas isso. Agora vamos dar um console.log(toJSON()). Olha só, o que temos aqui, temos que o tipo é uma view, tem propriedades de estilos que foram printados aqui, também temos os filhos dessa view que vão ser um ExpoBlurView, e você pode ver que temos no nosso componente enviaLance mesmo, é um BlurView, é para ficar aquele efeito bonito que funciona no IOS e no Android, ele só adiciona uma transparência.

[06:46] Mas conseguimos acessar todas as propriedades no formato de JSON do nosso componente. O nosso componente é transformado em um objeto e conseguimos fazer coisas com esse objeto. Aqui, o toJSON() estamos utilizando apenas para ver o que estar acontecendo. Tem um "Saiba Mais" também que vai mostrar como utilizá-lo para fazer snapshots, você pode conferir se quiser, uma outra funcionalidade aqui do toJSON(), porque podemos utilizar isso.

[07:16] Mas não vamos utilizar esse toJSON() nesse momento, vamos fazer outras coisas. Primeiro, vamos implementar esse enviaLance. O enviaLance é uma função que recebemos e ela é chamada depois do validaEnvio, quando clicamos no botão, ele vai validar o envio e ele chama enviaLance. Repara que ela é uma promisse, porque tem um await aqui, então temos que retornar uma promisse também. Aqui vamos criar essa função enviaLance.

[07:59] Antes do render do nosso componente, vamos criar uma const enviaLance =. Vai ser igual a quê? Lembra dos mocks que estávamos utilizando? Podemos criar uma função que é mocável, uma função mocada para que possamos verificar lá se ele foi chamado, quantas vezes, com quais parâmetros e alterar a implementação dessa função. Vamos fazer essa função nessa forma.

[08:28] Como fazemos isso? Chamando jest.fn() com const enviaLance = jest.fn(). Aqui dentro do fn(), como é uma função, podemos implementar o que queremos dentro dela. Vou criar uma nova função new Promisse(resolve => resolve()). Vamos resolver o quê? Podemos resolver o status enviado, por exemplo, porque se formos ver esse enviaLance tem vários status que podem acontecer. Deixa-me abrir "negocio > constantes > estadosLance.js".

[09:19] Tem o estado ENVIADO, que é aquela mensagem "Lance enviado com sucesso", tem o estado NÃO_ENVIADO, que é "Lance não enviado, tente novamente". Apenas esses dois estados são utilizados aqui no nosso enviaLance, então podemos retornar um deles. Vamos importar esses estados, import { ENVIADO } from '../../../../src/negocio/constantes/estadosLance'.

[10:04] Nessa função mock queremos resolver ENVIADO, queremos seja enviado o lance, que a resposta seja mocada aqui sempre que o lance for enviado com sucesso. Agora passamos essa função enviaLance no lugar dessa função vazia que estávamos chamando antes, quando damos o render enviaLance ={enviaLance}. Vou salvar aqui.

[10:31] Na próxima aula, vamos ver mais como é que podemos manipular esse componente. Se olharmos a execução, aqui ainda está passando, está tudo certo, mas vamos ver como que podemos verificar melhor esse componente, fazer ações dentro dele, preencher o campo E clicar no botão mesmo, para que essa função verifique se ela foi chamada. Porque aqui ela não foi chamada ainda, só renderizamos. Te vejo em breve.

@@05
Para saber mais: Snapshots

O que são snapshots?
Um tipo de teste muito interessante são os snapshots. Como funciona?

Podemos testar componentes da aplicação usando snapshots, que basicamente verificam se a estrutura do componente permanece a mesma, usando a referência JSON que a renderização retorna.

Porém, devemos ter cuidado com esse tipo de teste, pois ele não testa de fato a regra de negócio, mas, sim, as estruturas e até estilos do componente. Além disso, adicionar esse teste pode não fazer sentido algum no caso de um componente que sofre alterações constantes, já que ele sempre irá falhar e solicitar que atualizemos a snapshot.

Então, quando devemos usar testes de snapshot?
Em componentes simples, que não contém regras de negócio e que não mudam com frequência. É importante sempre tomar cuidado para que o coverage gerado por esse teste não seja aplicado a subcomponentes, esquecendo, assim, de avaliar se eram necessários testes daqueles também.

Abaixo, você pode ver um exemplo de teste de snapshot:

import React from 'react';
import { render } from '@testing-library/react-native';

import Componente from '../Componente.js';

describe('Componente.js', () => {
  it('deve renderizar sem erros', () => {
    const { toJSON } = render(<Componente />);

    expect(toJSON()).toMatchSnapshot();
  });
});COPIAR CÓDIGO
Você pode rodar npm jest -u --coverage=false para atualizar as snapshots que falharam, ou até adicionar este comando aos seus scripts no package.json.

@@06
Manipulando o Componente

[00:00] Agora que estamos renderizando o nosso componente em memória, vamos testá-lo de fato. Qual o componente? Vou abrir o simulador para entendermos melhor. Vou entrar aqui, por exemplo, nesse leilão de geladeira, e temos um campo aqui embaixo, um input, com um botão. Quando eu digito um valor que seja válido, por exemplo, o valor inicial é 500 eu posso dar um lance de 500, vou digitar 500 e apertar no botão. Ele dá aqui que o lance foi enviado com sucesso.
[00:28] Para conseguirmos testar um envio de lance precisamos pegar a referência desse input, desse campo de digitar. Para pegarmos essa referência podemos olhar no layout e vemos que tem esse R$ aqui por baixo dos panos, podemos tentar pegar pelo place holder do campo. Podemos pegar por diversas formas diferentes, mas nesse caso vamos testar pelo placeholder.

[00:55] Aqui onde estamos renderizando o nosso componente, no “EnviaLance.test.js”, estamos pegando o toJSON. Eu vou apagar esse toJSON porque não precisamos usá-lo, só vimos mesmo para tentar entender o que estava acontecendo com o render. Ao invés do toJSON eu vou chamar outra função que se chama getByPlaceholdertext, pegar pelo texto do placeholder, const { getByPlaceholderText } = render. O placeholder é esse texto que fica fraquinho aqui.

[01:28] Agora aqui embaixo, depois de renderizarmos, eu vou criar uma constante chamada input que é o campo mesmo, referência do input, e vou fazer um getByPlaceholderText R$, que é o texto no input ali, const input = getByPlaceholderText("R$");. Vamos dar um console.log aqui no input para ver se está vindo alguma coisa, console.log(input);, e precisamos rodar no nosso terminal npm test. Se você já estiver rodando, não precisa rodar de novo, é só apertar a tecla "A" para ele testar novamente.

[02:04] O console.log está retornando um monte de referências e parece que deu certo. Aqui podemos ver que tem o TextInput, e é isso mesmo que queríamos, ele pegou a referência desse componente. Agora, com a referência desse componente, podemos tentar preencher alguma coisa, mas antes de preencher vamos pegar a referência do botão também só para termos tudo referenciado certinho.

[02:31] Para pegarmos a referência do botão, ele está usando um ícone aqui, tem a cor, ele é um tipo de botão. Vamos fazer um jeito diferente para pegarmos. Podemos utilizar as propriedades de acessibilidade para pegar elementos na tela.

[02:48] Eu vou abrir aqui o arquivo "src > telas > Leilao > componentes > EnviaLance.js". Nesse arquivo, o botão aqui não tem nada de acessibilidade, podemos setar aqui no TouchableOpacity, da linha 43, e podemos setar accessibility e dizemos que esse botão aqui, até fica melhor pela acessibilidade, para dizer o que esse botão faz. Podemos dizer que esse botão é o botão de enviar lance, accessibilityHint="Enviar lance".

[03:26] Salvei, não vai mudar nada aqui na nossa tela, porque isso daqui não aparece visualmente, ele vai aparecer somente para questões de acessibilidade. Agora conseguimos pegar pelo accessibilityhint. Primeiro precisamos pegar a função do render, que faz essa busca por campos de acessibilidade. Para fazer isso, vamos dar uma vírgula aqui no render e vai desconstruir junto com o getPlaceholderText o getBy. Podemos digitar accessibility, mas ele tem um atalho também para isso que é "A11Hint", const { getByPlaceholderText, getByA11yHint } = render(.

[04:13] Agora podemos pegar o getByA11yHint. Vamos armazenar essa constante aqui botão, que é o nosso botão, e o texto que colocamos lá que é enviar lance, const botao = getByA11Hint("Enviar lance");. Vou salvar aqui e o ideal é ele não dar nenhum erro. Não deu nenhum erro, ele já está pegando o Enviar lance também.

[04:43] Agora vamos preencher os campos e fazer ações dentro do nosso componente. Para isto podemos usar o fireEvent da biblioteca "testing-library", esse é um dos grandes diferenciais dessa biblioteca para aquela biblioteca que renderiza.

[05:08] Aqui no import, onde importamos o render, vou dar uma vírgula e vou importar também o fireEvent. Agora o fireEvent chamamos aqui embaixo, depois de pegar as instâncias do input do botão, e podemos fazer várias coisas como, por exemplo, changeText, vamos mudar o texto do input ,que vai ser o primeiro parâmetro, e o segundo parâmetro vai ser o que queremos mudar, eu vou escrever 10 aqui no input, entre aspas mesmo porque o input é sempre uma string, fireEvent.changeText(input, "10");

[05:55] Depois de preenchermos o campo precisamos apertar no botão. Existe também um evento para apertar no botão, vamos utilizar o fireEvent.press. Depois temos que dizer o que queremos pressionar, que é o botão, fireEvent.press(botao); Aqui já preenchemos e a apertamos o botão, agora podemos verificar se o nosso método EnviaLance foi chamado.

[06:24] Eu vou fazer aqui um expect(enviaLance).toHaveBeenCalledWith("10"); o que ele tenha sido chamado com o número 10. Se olharmos aqui no enviaLances, quando apertamos, ele chama o validaEnvio, que vai fazer a validação, e recebemos esse valor na função enviaLance, que é a função que estamos chamando aqui.

[07:02] Vamos salvar aqui e verificar o que acontece. Passou no teste, porém estamos recebendo um warning aqui, estamos recebendo que useNativeDriver não está suportado por causa de animações nativas. Está falando aqui que temos que verificar se rodamos o pod install? Estamos no Expo, não precisaríamos receber essa mensagem. Isso acontece porque estamos utilizando a biblioteca React Navigation e essa biblioteca tem uma sessão falando sobre esse problema. Se formos na documentação, em “reactnavigation.org/docs/testing”, já temos aqui algumas coisas que podemos fazer para evitar que ocorram erros.

[07:53] Nesse caso só vamos copiar essa linha aqui do jest.mok e vamos mockar essa biblioteca antes de testar. Eu vou copiar esse mock e vou colar aqui no arquivo mesmo que estamos utilizando antes do describe. Vou colocar esse mock e vou salvar, jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

[08:17] Agora não temos mais o erro, não temos mais o erro de aparecer aquela mensagem porque estamos mockando esse arquivo da navegação, não precisamos dele funcionando exatamente agora quando estamos testando porque estamos renderizando em memória, não estamos renderizando no celular mesmo, resolvemos esse problema.

[08:39] Já estamos verificando se o enviaLance foi chamado com o valor que passamos, que é o 10. Vamos fazer mais uma verificação, vamos verificar fazer um expect se o texto lance enviado com sucesso apareceu na tela, porque precisamos dessa mensagem depois que enviamos um lance, e ele vem com sucesso que é a promise que fizemos aqui, o enviado. Vamos fazer isso. Primeiro precisamos pegar o texto e podemos adicionar uma desconstrução aqui no render para poder pegar o texto.

[09:16] Eu vou quebrar as linhas aqui, para ficar mais visível, e eu vou colocar uma vírgula aqui depois do getByA11yHint, vai ser um getByText, simplesmente isso. Então conseguimos pegar elementos que tenham esse texto dentro, que vão ser textos mesmo. Agora esperamos que o getByText enviado, vamos pegar o elemento que tiver dentro dessa mensagem do enviado, que é essa mensagem: lance enviado com sucesso. E queremos que isso aqui exista, podemos usar uma propriedade que se chama .toBeTruthy, que seja verdadeiro, que exista, expect(getByText(ENVIADO)).toBeTruthy();

[10:13] Recebemos um erro. Por que recebemos esse erro, o que está acontecendo se deu tudo certo até agora? Porque não achou o enviado na nossa tela. Porque quando enviamos, setamos essa mensagem no estado, a mensagem do estado do lance setSucesso, e utilizamos esse estado sucesso para preencher o nosso texto. Só que o estado não é uma coisa que vai aguardar, não é uma coisa síncrona é assíncrono. Precisamos fazer alguma coisa para esperar que esse texto apareça na tela para depois verificar se ele existe.

[10:59] Podemos utilizar um método que vem aqui da nossa biblioteca "testing-library", junto com render, fireEvent. Eu vou importar mais uma coisa no topo que vai ser o waitFor, aguarde para.

[11:19] Eu vou fazer um await aqui no final do arquivo. Antes de chamar o expect do enviado, eu vou fazer um await e vou utilizar essa função waitFor para passar uma função dentro dela, e o que estiver dentro da função ele vai esperar. Eu vou colocar esse expect que fizemos do getByText toBeTruthy, await waitFor(() => { expect(getByText(ENVIADO)).toBeTruthy(); Vou salvar e estamos chamando o await, mas não demos o async aqui em cima.

[11:57] Aqui no teste, precisamos adicionar um async na função do teste também, na função principal do teste, it('deve enviar o lance quando o botão for pressionado', async () => {. Vamos salvar, e ainda temos falha, não conseguiu achar o lance enviado com sucesso. Vamos olhar o código. Se olharmos a função, deveríamos estar mostrando esse enviado, mas se olharmos essa função, eu escrevi errado, Promise é com um s só e não dois ss. Aqui na linha 11 const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO);

[12:42] Vamos salvar e ver o que acontece. Agora sim, agora temos o método passando, encontramos esse toBeTruthy. Se removermos o waitFor não vamos encontrar, ele dá um erro aqui, falando que não encontrou. Primeiro porque está fora do act, o act é um método que é chamado por vários outros métodos, inclusive esse waitFor. Quando chamamos um render, ele também chama esse act, ele é o que faz toda a mágica por trás de esperar as ações do React Native, do React mesmo, com o waitFor funciona.

[13:24] Agora podemos fazer uma espera de alguma coisa que der errado, ou seja, quando temos aqui lance enviado com sucesso aparecendo na tela, não queremos que a mensagem de erro esteja aparecendo, a mensagem de erro é NAO ENVIADO. Eu vou importar aqui NAO ENVIADO lá dos estados lance, Lance nao enviado, tente novamente. Vou importar aqui no topo junto com ENVIADO.

[14:06] Agora eu quero que essa mensagem não apareça na tela de jeito nenhum. Depois do await ,eu vou fazer um expect e vou chamar uma função expect(() => getByText(NAO-ENVIADO)). Então, quando tentamos chamar um getByText que não conseguimos encontrar, como fizemos antes, e ele não encontrar e dar um erro, falando que não existe, se eu tirar esse getByText(NAO_ENVIADO), vou tirá-lo e vou salvar, ele vai dar um erro aqui falando que o elemento Lance não enviado, tente novamente. Ele não conseguiu encontrar, ele dá uma exceção.

[15:13] Nós queremos verificar que, mesmo que exista uma exceção ali, vamos fazer um expect passando uma função que vai chamar esse getByText. Depois damos um ponto toThrow, expect(() => getByText(NAO_ENVIADO)).toThrow(); e esse toThrow vai dar problema. Esperamos que dê algum problema ao rodar essa função aqui, que tem o getByText. Vamos salvar e ver o que acontece.

[15:49] Agora está passando e estamos esperando que dê algum erro quando tentarmos pegar esse NAO_ENVIADO, porque não queremos que ele apareça na tela. Por exemplo, quando eu digito alguma outra coisa aqui, ele vai dar uma mensagem de erro. Não queremos que nenhuma mensagem de erro apareça na tela, somente a mensagem de "enviado com sucesso". Com isso, nós também aprendemos como validar erros, até podemos passar alguns parâmetros aqui dentro, caso você queira validar um erro mesmo.

[16:25] Antes de sair desse curso, de despedir-se, dê uma olhada na sessão "Faça Como Eu Fiz", para você exercitar mais testes de componente como esse. Também você pode acessar o desafio do curso, que vai fazer você fazer vários tipos de testes que aprendemos nesse curso. Eu espero que você consiga exercitar os conceitos no desafio.

@@07
Faça como eu fiz: teste o componente com erro

Nesta aula, testamos componentes do React Native carregados em memória. Para reforçar os conceitos vistos e seu aprendizado, você pode finalizar os testes de componente do arquivo telas/Leilao/componentes/EnviaLance.js. Experimente criar o fluxo de teste de quando o lance não é enviado.

Você pode acessar o commit dos testes de unidade desses arquivos por meio deste link.

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao/tree/FCEFAula4

@@08
Desafio: Coverage 100%

Agora é sua vez!
Antes de começar o desafio, lembre de que 100% de coverage não quer dizer que 100% das regras estão sendo testadas, e, para testar todas as regras, muitas vezes não precisamos focar em uma porcentagem de coverage!

Mas, então, por que fazer este desafio? Por um motivo importante: treinar suas habilidades em aplicar testes em diferentes situações. Ou seja, para fins de estudo e aprofundamento!

Neste desafio, você deve atingir 100% de cobertura de testes, considerando a porcentagem de Statements gerada pelo coverage do jest. Para evitar a aplicação da cobertura aos subcomponentes, pode ser interessante que você teste os arquivos na ordem contrária à listada no coverage.

Considerando a lista abaixo de arquivos, comece pelo arquivo telas/ListaLeiloes/componentes/Leilao.js, e, por último, faça o App.js.

Lista de arquivos gerada pelo comando `npm run testFinal`, que foi configurado para rodar o coverage do jest. 

Ao terminar o desafio, compartilhe essa conquista incrível no seu LinkedIn ou outra rede social!

O objetivo deste desafio é praticar os aprendizados construídos ao longo do curso. Assim, pedimos que você aplicasse as técnicas de testes em um contexto diferente, o que é importante para fixar o conteúdo.
Caso queira conferir a branch com todos os testes feitos, você pode clicar neste link. Lembrando que não existe uma única forma de chegar a 100% de coverage.

https://github.com/alura-cursos/react-native-criando-testes-para-sua-aplicacao/tree/DesafioCoverage

@@09
O que aprendemos?

Nesta aula, aprendemos a:
Instalar as bibliotecas @testing-library/react-native e @testing-library/react-hooks;
Testar hooks usando a biblioteca @testing-library/react-hooks;
Renderizar componentes em memória usando a @testing-library/react-native;
Capturar campos do componente carregado em memória;
Efetuar ações usando o fireEvent da @testing-library/react-native.

@@10
Conclusão

[00:00] Parabéns por ter concluído mais um curso de React Native aqui na Alura. Nesse curso testamos aplicações de leilões e fizemos testes unitários. Por exemplo, aqui no "negocio/formatadores > moeda.test.js", testamos o formatoBrasileiroParaDecimal e o formataDecimalParaReal. Testamos esses valores reais que estão sendo exibidos aqui na nossa aplicação.
[00:26] Nós também testamos o repositório de leilões. No "repositorio > leilao.test.js", fizemos um mock simulamos a API de leilões, para que pudéssemos fazer o teste do método que busca os leilões sem precisar fazer uma requisição na API mesmo. Caso a API esteja fora do ar ou qualquer coisa, o nosso teste não vai falhar por causa disso. Estamos simulando a API retornando o que esperamos retornar no nosso teste.

[00:57] Além disso, nós também estamos testando a requisição com erro e estamos testando se métodos foram chamados com os parâmetros. Estamos testando se a requisição para a API foi realmente chamada com o /leiloes, por exemplo.

[01:12] Também testamos os nossos hooks, aqui em "tests/hooks/useListaLeiloes.test.js". Testamos o hook de useListaLeiloes, que é o hook que usamos na tela para pegar a lista de leilões.

[01:28] Dessa vez, ao invés de mockarmos a API, nós mockamos o próprio repositório de leilões e utilizamos a biblioteca "testing-library/react-hooks" para fazer a renderização desse hook, porque normalmente não poderíamos renderizar um hook fora de um componente. Essa biblioteca nos ajudou a renderizar o hook, e o método act nos ajudou a fazer ações dentro do hook, por exemplo, chamar o atualizaLista que o próprio hook retorna.

[01:58] Além do hook nós também testamos o componente de enviaLance. Ele está dentro de "telas/Leilao/componentes" e é o componente que, se entramos aqui em algum leilão da nossa aplicação, tem esse formulário aqui embaixo para enviarmos o lance.

[02:16] Testamos renderizar esse formulário em memória e digitar um valor aqui, por exemplo, e apertar no botão para verificar se recebemos a mensagem com sucesso, se a função de enviar lance realmente foi chamada e com o valor certo que escrevemos aqui. Por isso utilizamos os fireEvent para mudar o texto, e isso tudo graças a biblioteca "testing-library-react=native" que utilizamos, que é uma irmã da biblioteca "testing-library-react-hooks" e nos possibilitou a fazer essas coisas mais facilmente.

[02:56] Além disso, se você fez o desafio que foi proposto nesse curso, você também testou toda a aplicação e pode ter utilizado, para te ajudar, o coverage que instalamos na nossa aplicação. Quando rodamos o npm run testFinal geramos o coverage também. Ele aparece aqui no terminal, mas vimos que ele está aqui nessa pasta "Coverage", dentro do "Icov-report", e abrimos esse "index.html" lá no nosso navegador.

[03:33] Aqui no navegador, ele vai gerar para nós uma porcentagem de quantos por centro do código está testado. Até o fim desse curso o básico seria de 26.57% do código testado. Se você concluiu o desafio, você teve mais do que isso.

[03:54] Aqui conseguimos ver exatamente quais os métodos que foram testados, se faltou testarmos alguma coisa, mas também lembramos que o coverage não é tudo. Não adianta termos 100% de coverage, que não quer dizer que testamos todos os requisitos da nossa aplicação. É importante focarmos mais em testes de qualidade do que simplesmente aumentar o coverage.

[04:20] Espero que você tenha gostado desse curso. Não esqueça de deixar o comentário aqui no final para sabermos o que você achou, quais foram os pontos positivos, quais foram os pontos negativos desse curso para que continuemos melhorando aqui na Alura. Se você gostar, crie um projeto no GitHub, compartilhe na redes sociais e nos marque nas redes sociais também, lá no LinkedIn e no GitHub. Até o próximo curso.

@@11
Créditos

Este curso foi produzido pela equipe de mobile da Alura, incluindo principalmente:
Natalia Kelim Thiel - Instrutora;
André Oliveira Cunha - Instrutor;
Alex Felipe - Instrutor e tech lead;
Christian Rosa - Didática;
Flávia de Oliveira - Produtora de vídeo;
Vinícius Oliveira ("Hide") - Editor de vídeo