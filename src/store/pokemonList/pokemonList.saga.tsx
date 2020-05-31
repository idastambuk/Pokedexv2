import {IAction} from "../../models/action";
import firebase from "firebase";
import {all, call, put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "./pokemonList.action-types";
import {
  fetchAllPokemonDetailsSuccessAction,
  fetchPokemonDetailsErrorAction,
  fetchUserPokemonDetailsSuccessAction,
  fetchUserPokemonIdsSuccessAction,
  IFetchPokemonPayload,
  removeFromMyPokemonAction,
  saveToMyPokemonErrorAction,
  setLoadingAction, setTotalPokemonCountAction
} from "./pokemonList.actions";
import * as service from './pokemonList.service';
import {IInitialPokemonData, IPokemon, IPokemonStorage} from "../../models/pokemon";
import {PokemonListHelper} from "../../helpers/PokemonListHelper";


export function* fetchUserPokemonDetailsSaga(){
  try {
    yield put(setLoadingAction(true));
    const uid = firebase.auth().currentUser?.uid as string;
    const userPokemonIds = yield(service.fetchUserPokemonIds(uid));
    const userPokemon: IPokemon[] = yield call(fetchMultiPokemonDetailsSaga, userPokemonIds);

    yield put(fetchUserPokemonIdsSuccessAction(userPokemonIds));
    yield put(fetchUserPokemonDetailsSuccessAction(userPokemon));
    yield put(setLoadingAction(false));
  } catch (error) {
    yield put(fetchPokemonDetailsErrorAction(error));
  }
}

export function* fetchAllPokemonDetailsSaga(action: IAction<IFetchPokemonPayload>){
  try {
    const {start, limit} = action.payload;
    yield put(setLoadingAction(true));
    const {results, count} = yield call(service.fetchPokemonIdList, start, limit);
    const pokemonIds = results.map((pokemon:IInitialPokemonData) => PokemonListHelper.extractId(pokemon));
    const allPokemon: IPokemon[] = yield fetchMultiPokemonDetailsSaga(pokemonIds);
    yield put(fetchAllPokemonDetailsSuccessAction(allPokemon));
    yield put(setTotalPokemonCountAction(count));
    yield put(setLoadingAction(false));
  } catch (error) {
    yield put(fetchPokemonDetailsErrorAction(error));
  }
}

export function* fetchMultiPokemonDetailsSaga(ids: number[]){
  try {
    const cachedPokemon: IPokemonStorage = service.fetchCachedPokemon();
    const callArray = ids.map((id: number) => call(service.fetchPokemonDetails, id, cachedPokemon));
    const responses = yield all(callArray);
    return responses;
  } catch (error) {
    yield put(fetchPokemonDetailsErrorAction(error));
  }
}

export function* savePokemonToMyPokemonSaga(action: IAction<number>) {
  try {
    yield put(setLoadingAction(true));
    const uid = firebase.auth().currentUser?.uid as string;
    yield call(service.saveMyPokemon, action.payload, uid);
    yield put(setLoadingAction(false));
    yield call(fetchUserPokemonDetailsSaga);
  } catch (error) {
    yield put(saveToMyPokemonErrorAction(error));
  }
}

export function* removePokemonFromMyPokemonSaga(action: IAction<number>) {
  try {
    yield put(setLoadingAction(true));
    const uid = firebase.auth().currentUser?.uid as string;
    yield call(service.removeFromMyPokemon, action.payload, uid);
    yield call(fetchUserPokemonDetailsSaga);
  } catch (error) {
    yield put(removeFromMyPokemonAction(error));
  }
}

export function* watchPokemonListSaga() {
  yield takeLatest(actionTypes.FETCH_ALL_POKEMON_DETAILS, fetchAllPokemonDetailsSaga);
  yield takeLatest(actionTypes.FETCH_USER_POKEMON_DETAILS, fetchUserPokemonDetailsSaga);
  yield takeLatest(actionTypes.SAVE_POKEMON, savePokemonToMyPokemonSaga);
  yield takeLatest(actionTypes.REMOVE_POKEMON, removePokemonFromMyPokemonSaga);
}
