import * as actionTypes from "./pokemonList.action-types";
import {IAction} from "../../models/action";
import {IPokemon} from "../../models/pokemon";

export interface IMyPokemonState {
  data: IPokemon[],
  pokemonIds: number[],
}
export interface IAllPokemonListState {
  data: IPokemon[],
  total: number,
}

export interface IPokemonListState {
  myPokemonList: IMyPokemonState,
  allPokemonList: IAllPokemonListState,
  loading: boolean
}

const initialState: IPokemonListState = {
  myPokemonList: { data: [], pokemonIds: [] },
  allPokemonList: { data: [], total: 0},
  loading: false
};
export const pokemonListReducer = (state: IPokemonListState = initialState, action: IAction<IPokemon[] | boolean | number[]|number>) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_POKEMON_DETAILS_SUCCESS:
      return {...state, allPokemonList: {...state.allPokemonList, data: action.payload as IPokemon[]}};
    case actionTypes.FETCH_USER_POKEMON_DETAILS_SUCCESS:
      return {...state, myPokemonList: {...state.myPokemonList, data: action.payload as IPokemon[]}};
    case actionTypes.FETCH_USER_POKEMON_IDS_SUCCESS:
      return {...state, myPokemonList: {...state.myPokemonList, pokemonIds: action.payload as number[]}};
      case actionTypes.SET_TOTAL_POKEMON_COUNT:
      return {...state, allPokemonList: {...state.allPokemonList, total: action.payload as number}};
    case actionTypes.SET_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};
