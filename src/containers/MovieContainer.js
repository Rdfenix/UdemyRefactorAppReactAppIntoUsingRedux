import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMovie,
  showLoaddingSpinner,
  clearMovie,
  setMoviePersistedState
} from '../actions';
import Movie from '../components/Movie/Movie';

class MovieContainer extends Component {
  componentDidMount() {
    const { movieId } = this.props.match.params;

    if (sessionStorage.getItem(`${movieId}`)) {
      const movie = JSON.parse(sessionStorage.getItem(`${movieId}`));
      this.props.setMoviePersistedState(movie);
    } else {
      this.getMovie(movieId);
    }
  }

  componentDidUpdate() {
    const { movieId } = this.props.match.params;
    const { movie, actors, directors } = this.props;

    if (this.props.movie) {
      const persistedMovieState = { movie, actors, directors };
      sessionStorage.setItem(`${movieId}`, JSON.stringify(persistedMovieState));
    }
  }

  getMovie = movieID => {
    this.props.clearMovie();
    this.props.showLoaddingSpinner();
    this.props.getMovie(movieID);
  };

  render() {
    return (
      <Movie
        movie={this.props.movie}
        directors={this.props.directors}
        actors={this.props.actors}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = state => {
  return state.Movie;
};

const mapDispatchToProps = {
  getMovie,
  showLoaddingSpinner,
  clearMovie,
  setMoviePersistedState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieContainer);
