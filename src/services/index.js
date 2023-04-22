const baseURL = 'https://swapi.dev/api/';

export const getFilms = (url) => {
  return fetch(`${baseURL}${url}`)
    .then(res => res.json());
};

export const fetchCharacters = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};