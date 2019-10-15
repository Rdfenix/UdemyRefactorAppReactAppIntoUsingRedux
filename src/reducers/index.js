import {
  combineReducers
} from 'redux';
import Home from './homeReducer';
import Movie from './movieReducer';

const rootReducer = combineReducers({
  Home,
  Movie
});

export default rootReducer;