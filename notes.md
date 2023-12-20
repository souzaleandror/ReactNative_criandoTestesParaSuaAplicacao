###### 19/12/2023

```
npx expo init gatito
npx expo start
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
