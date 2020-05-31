import {IRouteInfo} from "../models/route";
import {logOutSaga} from "../store/authentication/authentication.saga";
import {
  fetchAllPokemonDetailsAction,
  initialFetchPayload
} from "../store/pokemonList/pokemonList.actions";
import {fetchAllPokemonDetailsSaga, fetchUserPokemonDetailsSaga} from "../store/pokemonList/pokemonList.saga";

export const LOGIN = '/';
export const SIGN_UP = '/signup';
export const MY_POKEMON = '/my-pokemon';
export const POKEMON_LIST = '/list';

export class RouteInfo {
  public static pokemonList = (): IRouteInfo => ({
    path: POKEMON_LIST,
    initData: () => fetchAllPokemonDetailsSaga(fetchAllPokemonDetailsAction(initialFetchPayload))
  });

  public static myPokemon = (): IRouteInfo => ({
    path: MY_POKEMON,
    initData: fetchUserPokemonDetailsSaga
  });

  public static signUp = (): IRouteInfo => ({
    path: SIGN_UP,
    initData: () => logOutSaga(true)
  });

  public static login = (): IRouteInfo => ({
    path: LOGIN
  });
}
