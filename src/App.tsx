import React from 'react';
import './App.scss';
import {firebaseConfig} from "./firebase/firebase";
import firebase from 'firebase/app';
import {history, store} from "./store";
import {ConnectedRouter} from "connected-react-router";
import {Provider} from "react-redux";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {Route, Switch} from "react-router";
import {LOGIN, MY_POKEMON, POKEMON_LIST} from "./constants/routes";
import {LoginContainer} from "./containers/Login/Login.container";
import {MyPokemonContainer} from "./containers/MyPokemon/MyPokemon.container";
import {PokemonListContainer} from "./containers/PokemonList/PokemonList.container";

const rrfConfig = {userProfile: 'users'} // react-redux-firebase config

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

function App() {
  return (
      <Provider store={store}>
        {/*<ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            closeOnToastrClick/>*/}
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact={true} path={LOGIN} component={LoginContainer}/>
              <Route exact={true} path={MY_POKEMON} component={MyPokemonContainer}/>
              <Route exact={true} path={POKEMON_LIST} component={PokemonListContainer}/>
            </Switch>
          </ConnectedRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
  );
}

export default App;
