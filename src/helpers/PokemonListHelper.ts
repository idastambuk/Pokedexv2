import {IInitialPokemonData} from "../models/pokemon";

export class PokemonListHelper {
  public static extractId(pokemon: IInitialPokemonData) {
    // @ts-ignore
    return +(pokemon.url.match(/(?<=pokemon+\/)(.*)(?=\/)/s)[0] as string)
  }
}
