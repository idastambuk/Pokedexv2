export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  sprites: ISprite;
  types: {type: IType}[];
  moves: { move: IType }[];
}

export interface ISprite {
  back_default: string;
  front_default: string;
}

export interface IType {
  name: string;
  url: string;
}

export interface IInitialPokemonData {
  name: string;
  url: string;
}

export interface IPokemonStorage {
  [pokemonId: string]: IPokemon
}
