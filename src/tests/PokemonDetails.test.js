import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { name, summary, foundAt } = pokemons[0];

describe('Testa o componente `PokemonDetails`', () => {
  it('deve mostrar as informações detalhadas do pokemon selecionado', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const title = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(title).toBeDefined();
    expect(linkToDetails).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { level: 2, name: /Summary/i });
    const summaryText = screen.getByText(summary);
    expect(summaryTitle).toBeDefined();
    expect(summaryText).toBeDefined();
  });
  it('deve existir na página uma seção com os mapas'
  + 'contendo as localizações do pokemon', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const title = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    expect(title).toBeDefined();

    expect(foundAt.length).toBe(2);

    foundAt.forEach(({ location, map }, i) => {
      const image = screen.getAllByRole('img');
      expect(image[i + 1]).toHaveAttribute('src', map);
      expect(image[i + 1]).toHaveAttribute('alt', `${name} location`);
      const locations = screen.getByText(location);
      expect(locations).toBeDefined();
    });

    const summaryTitle = screen.getByRole('heading', { level: 2, name: /Summary/i });
    const summaryText = screen.getByText(summary);
    expect(summaryTitle).toBeDefined();
    expect(summaryText).toBeDefined();
  });
  it('deve ser possivel favoritar um pokemon através da pagina de detalhes', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const favCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favCheckbox).toBeDefined();

    userEvent.click(favCheckbox);
    const isFavorite = screen.getAllByRole('img')[1];
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(favCheckbox);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
