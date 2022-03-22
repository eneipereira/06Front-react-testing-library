import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente `App`', () => {
  it('deve conter um conjunto de links de navegação', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeInTheDocument();

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeInTheDocument();

    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorites).toBeInTheDocument();
  });
  it('deve redirecionar para página inicial, ao clicar no link `Home`', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkToHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('deve redirecionar para página `About`, ao clicar no link `About`', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkToAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('deve redirecionar para página `Favoritos`, ao clicar no link `Favorite...`', () => {
    const { history } = renderWithRouter(<App />);

    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkToFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('deve redirecionar para página `Not Found`, ao entrar numa URL desconhecida`',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/url-desconhecida');

      const title = screen
        .getByRole('heading', { level: 2, name: /Page requested not found/i });
      expect(title).toBeInTheDocument();
    });
});
