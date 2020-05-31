import React from 'react'
import {IPokemon} from "../../models/pokemon";

interface IProps {
  pokemon: IPokemon;
  addToMyPokemon?: (id: number) => void;
  showName: boolean;
  showAddButton: boolean;
  selectPokemon?: (pokemon: IPokemon) => void;
}

export class Pokemon extends React.PureComponent<IProps> {
  render() {
    const {pokemon, showName, showAddButton} = this.props;
    const primaryType = pokemon.types[0]?.type?.name ?? "normal";
    const secondaryType = pokemon.types[1]?.type?.name ?? primaryType;
    return (
        <div
            onClick={() => this.props.selectPokemon? this.props.selectPokemon(pokemon) : false}
            className={"pokemonCard pokemonCard--primary pokemonCard--primary--" + primaryType}>
          {showName && <p className="pokemonCard__title">{pokemon.name}</p>}
          <img
              className="pokemonCard__image"
              src={pokemon.sprites.front_default}
              alt="Pokemon avatar"/>
          {showAddButton &&
          <button
              className="button-add"
              onClick={(event: React.SyntheticEvent) => this.addToMyPokemonHandler(event, pokemon.id)}/>
          }
          <div className={"pokemonCard--secondary pokemonCard--secondary--" + secondaryType}></div>
        </div>
    )
  }
  private addToMyPokemonHandler(event: React.SyntheticEvent, pokemonId: number) {
    event.stopPropagation();
    if (this.props.addToMyPokemon) {
    this.props.addToMyPokemon(pokemonId)
    }
  }

}
