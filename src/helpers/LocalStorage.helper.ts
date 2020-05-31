import {IPokemon} from "../models/pokemon";

export class LocalStorageHelper {
  public static modifyDataForStorage(pokemon: IPokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      order: pokemon.order,
      weight: pokemon.weight,
      sprites: {
        front_default: pokemon.sprites.front_default, back_default: pokemon.sprites.back_default,
      },
      types: [pokemon.types[0], ...(pokemon.types[1] ? [pokemon.types[1]] : [])],
      moves: [{move: pokemon.moves[0].move}],
    }
  }
}
