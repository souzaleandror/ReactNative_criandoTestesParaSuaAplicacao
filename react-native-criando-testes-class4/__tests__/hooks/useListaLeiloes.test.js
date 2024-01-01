import { fireEvent, renderHook, act, waitFor } from '@testing-library/react-hooks';
import useListaLeiloes from '../../src/hooks/useListaLeiloes';

import { obtemLeiloes } from '../../src/repositorio/leilao';

jest.mock('../../src/repositorio/leilao');

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilao',
    descricao: 'Descricao do leilao',
  }
];

const mockLeiloesAtualizada = [
  {
    id: 1,
    nome: 'Leilao',
    descricao: 'Descricao do leilao',
  },
  {
    id: 2,
    nome: 'Leilao2',
    descricao: 'Descricao do leilao2',
  }
];

describe('hooks/useListaLeiloes', () => {
  it('Deve retornar uma lista de leiloes e uma funcao para atualizar', async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes);

    //const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());
    //expect(result.current[0]).toEqual([]);

    // await waitForNextUpdate;
    // expect(result.current[0]).toEqual(mockLeiloes);

    // obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada);
    // await act(() => result.current[1]());
    // expect(result.current[0]).toEqual(mockLeiloesAtualizada);
  });
});