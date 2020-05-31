import {IInitialPokemonData, IPokemon, IPokemonStorage} from "../../models/pokemon";
import firebase from "firebase";
import {LocalStorageHelper} from "../../helpers/LocalStorage.helper";

const URL = 'https://pokeapi.co/api/v2/';
// location for Pokemon list cache  in localstorage
const pokemonListLocal = "pokemon_list";

export const fetchUserPokemonIds = (uid: string): Promise<number[]> => {
  return firebase.database().ref('my_pokemon/' + uid).once('value')
      .then((response: firebase.database.DataSnapshot) => {
        const items: number[] = [];
        response.forEach((child: any) => {
          items.push(+child.key);
        });
        return items;
      }).catch(error => {
        throw error
      })
}

export const saveMyPokemon = (pokemonId: number, uid: string): Promise<number> => {
  return firebase.database().ref('my_pokemon/' + uid + "/" + pokemonId).push(pokemonId)
      .then(() => {
        return pokemonId;
      })
      .catch(error => {
        throw error;
      });
}
export const removeFromMyPokemon = (pokemonId: number, uid: string): Promise<number> => {
  return firebase.database().ref('my_pokemon/' + uid + "/" + pokemonId).remove()
      .then(() => {
        // removeMyPokemonIdFromCache(pokemonId);
        return pokemonId;
      })
      .catch(error => {
        throw error;
      });
}

export const fetchPokemonIdList = (start: number, limit: number): Promise<IInitialPokemonData> => {
  return fetch(`${URL}pokemon?offset=${start}&limit=${limit}`)
      .then(response => response.json())
      .then(resp => resp)
      .catch((error) => {
        throw error
      })
}

export const fetchCachedPokemon = (): IPokemonStorage => {
  return JSON.parse(localStorage.getItem(pokemonListLocal) ?? "{}");
}

const savePokemonToCache = (cache: IPokemonStorage, pokemon: IPokemon): void => {
  cache[pokemon.id] = LocalStorageHelper.modifyDataForStorage(pokemon);
  localStorage.setItem(pokemonListLocal, JSON.stringify(cache));
}
export const fetchPokemonDetails = (pokemonId: number, cachedPokemon: IPokemonStorage): Promise<IPokemon> => {
  if (cachedPokemon[pokemonId]) {
    return Promise.resolve(cachedPokemon[pokemonId])
  } else {
    return fetch(`${URL}pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(resp => {
          savePokemonToCache(cachedPokemon, resp);
          return LocalStorageHelper.modifyDataForStorage(resp);
        })
        .catch((error) => {
          throw error
        })
  }
}
