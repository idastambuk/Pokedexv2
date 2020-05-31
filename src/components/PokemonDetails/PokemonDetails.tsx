import React from 'react'
import {IPokemon, IType} from "../../models/pokemon";
import {Pokemon} from "../Pokemon/Pokemon";

interface IProps {
  pokemon: IPokemon;
}

export class PokemonDetails extends React.PureComponent<IProps> {
  render() {
    const {pokemon} = this.props;
    return (
        <div className="pokemonDetails">
          <p className="pokemonDetails__title">{pokemon.name}</p>
          <div className="pokemonDetails__stats">
            <div className="pokemonDetails__stats--left">
              <label>Type</label>
              {pokemon.types.map((type: {type: IType}) => (<p key={type.type.name}>{type.type.name}</p>))}
            </div>
            <Pokemon
                pokemon={pokemon}
                showName={false}
                showAddButton={false}
            />
            <div className="pokemonDetails__stats--right">
              <label>Primary move</label>
              {pokemon.moves.map((type: {move: IType}) => (<p key={type.move.name}>{type.move.name}</p>))}
            </div>
          </div>
        </div>
    )
  }

}
