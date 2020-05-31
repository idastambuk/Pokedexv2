import {applyMiddleware, createStore, compose} from "redux";
import {createRootReducer} from "./reducers";
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from "redux-saga";
import {watchAuthenticationSaga} from "./store/authentication/authentication.saga";
import {watchRoutingSaga} from "./store/routing/routing.saga";
import {watchPokemonListSaga} from "./store/pokemonList/pokemonList.saga";

let composeEnhancers = compose;
if (process.env.NODE_ENV !== "production") {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;
}

const saga = createSagaMiddleware();
export const history = createBrowserHistory();

export const store = createStore(
      createRootReducer(history),
      composeEnhancers(
          applyMiddleware(
              saga,
              routerMiddleware(history)
          ),
      ),
  )

saga.run(watchRoutingSaga);
saga.run(watchAuthenticationSaga);
saga.run(watchPokemonListSaga);
