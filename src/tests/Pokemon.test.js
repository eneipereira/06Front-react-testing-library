import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente `Pokemon`', () => {
  it('deve renderizar um card com as infos de determinado pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const {
      averageWeight: { measurementUnit, value },
      image,
      name,
      type,
    } = pokemons[0];

    const pokeName = screen.getByText(/Pikachu/i);
    const pokeType = screen.getByText(/Electric/i);
    const pokeWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokeImage = screen.getByRole('img');
    expect(pokeName.textContent).toBe(name);
    expect(pokeType.textContent).toBe(type);
    expect(pokeWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage).toHaveAttribute('src', image);
    expect(pokeImage).toHaveAttribute('alt', `${name} sprite`);
  });
  it('deve conter um link de navegação para `More details` no card do pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const { id } = pokemons[0];

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkToDetails).toBeDefined();
    expect(linkToDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it('deve redirecionar para a página de detalhes do pokemon correspondente, '
  + 'quando o botao for clicado', () => {
    renderWithRouter(<App />);

    const { name } = pokemons[0];

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const pokeTitle = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(pokeTitle).toBeDefined();
  });
  it('deve exibir a url com o `id` do pokemon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    const { id } = pokemons[0];

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('deve existir um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const { name } = pokemons[0];

    const pokeImage = screen.getAllByRole('img');
    expect(pokeImage[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(pokeImage[1]).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
