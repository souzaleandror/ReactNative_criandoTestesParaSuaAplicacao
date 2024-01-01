import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

import EnviaLance from '../../../../src/telas/Leilao/componentes/EnviaLance';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('telas/Leilao/componentes/EnviaLance', () => {
  it('Deve enviar o lance quando o botao for pressionado', async () => {
    //const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)));
    const enviaLance = jest.fn(
      () => new Promise((resolve) => resolve(ENVIADO))
    );
    const { getByPlaceholderText, getByA11yHint, getByText } = render(<EnviaLance enviaLance={enviaLance} cor="blue" />);

    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint("Enviar Lance");

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    //await waitFor(() => expect(enviaLance).toHaveBeenCalledWith('10'));
    await waitFor(() => expect(enviaLance).toHaveBeenCalledWith('10'));
    // expect(getByText(ENVIADO)).toBeTruthy();
    await waitFor(() => {
      expect(getByText(ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });
}); 