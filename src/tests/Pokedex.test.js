import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const getTypes = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

const TEST_ID = 'pokemon-name';

describe('Testa o componente `Pokedex`', () => {
  it('deve conter um heading com o texto `Encountered pokemons`', () => {
    renderWithRouter(<App />);

    const title = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(title).toBeDefined();
  });
  it('deve exibir o próximo Pokémon quando o botão `Próximo pokémon` é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((pokemon) => {
      const pokeName = screen.getByText(pokemon.name);
      userEvent.click(nextBtn);
      expect(pokeName).toBeDefined();
    });
  });
  it('deve ser mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokeName = screen.getAllByTestId(TEST_ID);
    expect(pokeName.length).toBe(1);

    userEvent.click(nextBtn);

    expect(pokeName.length).toBe(1);
  });
  it('deve conter os botões de filtro`', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    const allBtn = screen.getByRole('button', { name: /All/i });

    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtns.length).toBe(getTypes.length);

    getTypes.forEach((type) => {
      const btn = screen.getByRole('button', { name: type });
      userEvent.click(btn);
      expect(allBtn).toBeEnabled();
      const pokeByType = pokemons.filter((poke) => poke.type === type);
      if (pokeByType.length > 1) {
        let pokemon = screen.getByTestId(TEST_ID).textContent;
        expect(pokemon).toBe(pokeByType[0].name);
        userEvent.click(nextBtn);
        pokemon = screen.getByTestId(TEST_ID).textContent;
        expect(pokemon).toBe(pokeByType[1].name);
      }
    });
  });
  it('deve conter um botao de reset de filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeDefined();

    const anotherBtn = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(anotherBtn);

    userEvent.click(allBtn);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((pokemon) => {
      const pokeName = screen.getByText(pokemon.name);
      userEvent.click(nextBtn);
      expect(pokeName).toBeInTheDocument();
    });
  });
});
