import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const MAX_ID = 25;
const ARR_LENGTH = 4;

const fav = pokemons.filter(({ id }) => id <= MAX_ID);

describe('Testa o componente `FavoritePokemons`', () => {
  it('deve exibir na tela a mensagem `No favorite pokemon found`,'
  + 'se não houverem pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeDefined();
  });
  it('deve exibir na tela os cards dos pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ fav } />);

    const favPokes = screen.getAllByTestId('pokemon-name');
    expect(favPokes).toHaveLength(ARR_LENGTH);
  });
});
