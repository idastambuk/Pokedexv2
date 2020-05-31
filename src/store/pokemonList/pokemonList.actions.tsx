import * as actionTypes from "./pokemonList.action-types";
import {IAction} from "../../models/action";
import {IPokemon} from "../../models/pokemon";

export interface IFetchPokemonPayload {
  start: number,
  limit: number
}

export const initialFetchPayload: IFetchPokemonPayload = {
  start: 0,
  limit: 20
}
export const fetchAllPokemonDetailsAction = (payload: IFetchPokemonPayload): IAction<IFetchPokemonPayload> => ({
  type: actionTypes.FETCH_ALL_POKEMON_DETAILS, payload
})

export const fetchAllPokemonDetailsSuccessAction = (payload: IPokemon[]): IAction<IPokemon[]> => ({
  type: actionTypes.FETCH_ALL_POKEMON_DETAILS_SUCCESS, payload
})
export const fetchUserPokemonDetailsAction = () => ({
  type: actionTypes.FETCH_USER_POKEMON_DETAILS
})

export const fetchUserPokemonDetailsSuccessAction = (payload: IPokemon[]): IAction<IPokemon[]> => ({
  type: actionTypes.FETCH_USER_POKEMON_DETAILS_SUCCESS, payload
})

export const fetchUserPokemonIdsSuccessAction = (payload: number[]): IAction<number[]> => ({
  type: actionTypes.FETCH_USER_POKEMON_IDS_SUCCESS, payload
})

export const setTotalPokemonCountAction = (payload: number): IAction<number> => ({
  type: actionTypes.SET_TOTAL_POKEMON_COUNT, payload
})

export const fetchPokemonDetailsErrorAction = (error: any): IAction<any> => ({
  type: actionTypes.FETCH_POKEMON_DETAILS_ERROR, payload: error
})

export const setLoadingAction = (payload: boolean): IAction<boolean> => ({
  type: actionTypes.SET_LOADING, payload
})

export const saveToMyPokemonAction = (id: number): IAction<number> => ({
  type: actionTypes.SAVE_POKEMON, payload: id
})
export const saveToMyPokemonErrorAction = (error: any): IAction<any> => ({
  type: actionTypes.SAVE_POKEMON_ERROR, payload: error
})

export const removeFromMyPokemonAction = (id: number): IAction<number> => ({
  type: actionTypes.REMOVE_POKEMON, payload: id
})
export const removeFromMyPokemonErrorAction = (error: any): IAction<any> => ({
  type: actionTypes.REMOVE_POKEMON_ERROR, payload: error
})
