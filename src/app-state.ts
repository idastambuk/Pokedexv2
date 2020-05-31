import {IAuthenticationState} from "./store/authentication/authentication.reducer";
import {FirebaseReducer} from "react-redux-firebase";
import {IPokemonListState} from "./store/pokemonList/pokemonList.reducer";
import Reducer = FirebaseReducer.Reducer;

export interface IAppState {
   authentication: IAuthenticationState,
   firebase: Reducer,
   pokemonList: IPokemonListState
}
