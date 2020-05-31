import React from "react";
import {connect} from "react-redux";
import {IAppState} from "../../app-state";
import {IPokemon} from "../../models/pokemon";
import {changeRouteAction} from "../../store/routing/routing.actions";
import {RouteInfo} from "../../constants/routes";
import {removeFromMyPokemonAction} from "../../store/pokemonList/pokemonList.actions";
import {Header} from "../../components/Header/Header";
import {Pokemon} from "../../components/Pokemon/Pokemon";
import {Modal} from "../../components/Modal/Modal";
import {PokemonDetails} from "../../components/PokemonDetails/PokemonDetails";

interface IProps {
  myPokemonList: IPokemon[];
  isPokemonLoading: boolean;
  goToPokemonList: () => void;
  removeFromMyPokemon: (id: number) => void;
  goBack: () => void;
}

interface IState {
  isDetailsModalOpen: boolean;
  selectedPokemon: IPokemon | null;
}

class MyPokemonContainerInner extends React.Component<IProps, IState> {

  public state: IState = {isDetailsModalOpen: false, selectedPokemon: null};

  render() {
    return (
        <>
          <Header goBack={this.props.goBack} title={"My Pokemon"} goToAllPokemon={this.props.goToPokemonList}/>
          {this.props.isPokemonLoading &&
          <div className="loader">
              <div className="lds-dual-ring"></div>
          </div>
          }
          <div className="pokemonList__container">
            {this.props.myPokemonList.length > 0 && this.renderPokemon()}
          </div>
          {this.state.isDetailsModalOpen &&
          <Modal>
              <>
                  <PokemonDetails pokemon={this.state.selectedPokemon as IPokemon}/>
                  <button className="button" onClick={() => this.toggleDetailsModal()}>Close Details</button>
              </>
          </Modal>
          }
        </>
    )
  }

  renderPokemon() {
    return this.props.myPokemonList.map((pokemon: IPokemon) => (
        <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            showName
            showAddButton={false}
            selectPokemon={(pokemon: IPokemon) => this.selectPokemon(pokemon)}
        />
    ))
  }

  toggleDetailsModal() {
    this.setState({isDetailsModalOpen: !this.state.isDetailsModalOpen})
  }

  selectPokemon(pokemon: IPokemon) {
    this.setState({selectedPokemon: pokemon}, () => this.setState({isDetailsModalOpen: true}))
  }
}

export const MyPokemonContainer = connect(mapState, mapDispatchToProps)(MyPokemonContainerInner);

function mapState(state: IAppState) {
  return {
    isPokemonLoading: state.pokemonList.loading,
    myPokemonList: state.pokemonList.myPokemonList.data
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    goBack: () => dispatch(changeRouteAction({routeInfo: RouteInfo.login()})),
    goToPokemonList: () => dispatch(changeRouteAction({routeInfo: RouteInfo.pokemonList()})),
    removeFromMyPokemon: (id: number) => dispatch(removeFromMyPokemonAction(id))
  }
}

