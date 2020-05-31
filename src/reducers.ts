import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {firebaseReducer} from "react-redux-firebase";
import {authenticationReducer} from "./store/authentication/authentication.reducer";
import {pokemonListReducer} from "./store/pokemonList/pokemonList.reducer";

export const createRootReducer = (history: any) => combineReducers({
  ...reducers,
  router: connectRouter(history),
})

export const reducers = {
  authentication: authenticationReducer,
  firebase: firebaseReducer,
  pokemonList: pokemonListReducer
  // toastr: toastrReducer
};
