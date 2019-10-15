import {
  API_KEY,
  API_URL
} from '../config'

import {
  fetchMovies
} from '../helpers'

export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
export const SET_POPULAR_PERSISTED_STATE = 'SET_POPULAR_PERSISTED_STATE';

export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER';

export const GET_MOVIE = 'GET_MOVIE';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';
export const SET_MOVIE_PERSISTED_STATE = 'SET_MOVIE_PERSISTED_STATE';

export const setMoviePersistedState = (state) => {
  return {
    type: SET_MOVIE_PERSISTED_STATE,
    payload: state
  }
}

export const showLoaddingSpinner = () => {
  return {
    type: SHOW_LOADING_SPINNER,
    payload: null
  }
}


export const clearMovie = () => {
  return {
    type: CLEAR_MOVIE,
    payload: null
  }
}

export const getMovie = (movieId) => {

  let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  let newState = {};

  const request = fetchMovies(endpoint, result => {
      if (result.status_code) {
        // If we don't find any movie
        return newState;
      } else {
        newState = {
          movie: result
        };
        endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        return fetchMovies(endpoint, result => {
          const directors = result.crew.filter((member) => member.job === "Director");
          newState.actors = result.cast;
          newState.directors = directors;

          return newState;

        })
      }

    })
    .catch(error => console.error("Error:", error));

  return {
    type: GET_MOVIE,
    payload: request
  }
}

export const setPopularPersistedState = state => {
  return {
    type: SET_POPULAR_PERSISTED_STATE,
    payload: state
  }
}

export const getPopularMovies = () => {
  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const request = fetchMovies(endpoint);

  return {
    type: GET_POPULAR_MOVIES,
    payload: request
  }
}

export const searchMovies = (searchTerm) => {
  let endpoint;
  if (searchTerm === "") {
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  } else {
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
  }

  const request = fetchMovies(endpoint, result => {
    return {
      ...result,
      searchTerm
    }
  });

  return {
    type: SEARCH_MOVIES,
    payload: request
  }
}

export const loadMoreMovies = (searchTerm, currentPage) => {
  let endpoint
  if (searchTerm === '') {
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
  } else {
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
  }

  const request = fetchMovies(endpoint)

  return {
    type: LOAD_MORE_MOVIES,
    payload: request
  }
}

export const clearMovies = () => {
  return {
    type: CLEAR_MOVIES,
    payload: null
  }
}