import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente `NotFound`', () => {
  it('deve conter um heading com o texto `Page requested not found`', () => {
    renderWithRouter(<NotFound />);

    const title = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(title).toBeDefined();
  });
  it('deve conter uma imagem com o link correspondente`', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', src);
    expect(img[1])
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
