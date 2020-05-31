import {LOCATION_CHANGE, LocationChangePayload, push, replace} from "connected-react-router";
import {IRouteInfo} from "../../models/route";
import {takeLatest} from "@redux-saga/core/effects";
import * as actionTypes from "./routing.action-types";
import {IAction} from "../../models/action";
import {call, put} from "redux-saga/effects";
import {LOGIN, MY_POKEMON, POKEMON_LIST, RouteInfo} from "../../constants/routes";
import firebase from "firebase";
import {changeRouteAction} from "./routing.actions";
import {LOG_IN_ERROR} from "../authentication/authentication.action-types";
import {fetchAllPokemonDetailsSaga, fetchUserPokemonDetailsSaga} from "../pokemonList/pokemonList.saga";
import {
  fetchAllPokemonDetailsAction,
  initialFetchPayload
} from "../pokemonList/pokemonList.actions";

export interface IChangeRoutePayload {
  routeInfo: IRouteInfo;
  isPush?: boolean;
}

export function* changeRouteSaga(action: IAction<IChangeRoutePayload>) {
  try {
    if (action.payload) {
      if (action.payload.routeInfo.initData) {
        yield call(action.payload.routeInfo.initData);
      }
      if (action.payload.isPush) {
        yield put(push(action.payload.routeInfo.path));
      } else {
        yield put(replace(action.payload.routeInfo.path));
      }
    }
  } catch (error) {
    yield put(push(LOGIN));
  }
}

export function* routeInitSaga(action: IAction<LocationChangePayload>) {
  try {
    if (action.payload.isFirstRendering) {
      switch (action.payload.location.pathname) {
        case MY_POKEMON: {
          const isLoggedIn = firebase.auth().currentUser?.uid;
          if (!isLoggedIn) {
            yield put(changeRouteAction({routeInfo: RouteInfo.login()}))
          } else {
            yield call(fetchUserPokemonDetailsSaga)
          }
        }
          break;
        case POKEMON_LIST: {
          const isLoggedIn = firebase.auth().currentUser?.uid;
          if (!isLoggedIn) {
            yield put(changeRouteAction({routeInfo: RouteInfo.login()}))
          } else {
            yield call(fetchAllPokemonDetailsSaga, fetchAllPokemonDetailsAction(initialFetchPayload))
          }
        }
          break;
        case LOGIN: {
          const isLoggedIn = firebase.auth().currentUser?.uid;
          if (isLoggedIn) {
            yield put(changeRouteAction({routeInfo: RouteInfo.myPokemon()}))
          }
        }
      }
    }
  } catch (error) {
    yield put({type: LOG_IN_ERROR, error});
  }
}

export function* watchRoutingSaga() {
  yield takeLatest(actionTypes.CHANGE_ROUTE, changeRouteSaga);
  yield takeLatest(LOCATION_CHANGE, routeInitSaga);
}
