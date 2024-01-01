import { renderHook } from '@testing-library/react-hooks';
import useListaLeiloes from '../../src/hooks/useListaLeiloes';


describe('hooks/useListaLeiloes', () => {
  it('Deve retornar uma lista de leiloes e uma funcao para atualizar', async () => {
    const { waitForNextUpdate } = renderHook(() => useListaLeiloes());
    await waitForNextUpdate;

  });
});