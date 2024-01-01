import { obtemLeiloes } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/servicos/apiLeiloes';

jest.mock('../../src/servicos/apiLeiloes');

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilao',
    descricao: 'Descricao do leilao',
  }
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: retorno })
    }, 2000);
  })
}

const mockRequisicaoError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 2000);
  })
}

describe('repositorio/leilao', () => {

  beforeEach(() => {
    apiLeiloes.get.mockClear();
  });

  describe('ObtemLeiloes', () => {
    it('Deve retornar uma lista de leiloes', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

      const leiloes = await obtemLeiloes();

      //console.log(leiloes);

      expect(leiloes).toEqual(mockLeiloes);

      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma lista vazia quando a requisicao falhar', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoError());

      const leiloes = await obtemLeiloes();

      //console.log(leiloes)

      expect(leiloes).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);

    })
  });
});