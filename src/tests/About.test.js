import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente `About`', () => {
  it('deve conter um heading com o texto `About Pokedex`', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(title).toBeDefined();
  });
  it('deve conter dois parágrafos com texto sobre a pokedex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1).toBeDefined();
    expect(paragraph2).toBeDefined();
  });
  it('deve conter a imagem de uma pokedex com o link correspondente', () => {
    renderWithRouter(<About />);

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
