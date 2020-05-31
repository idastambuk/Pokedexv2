import React from "react";
import {connect} from "react-redux";
import {IAppState} from "../../app-state";
import {IPokemon} from "../../models/pokemon";
import {fetchAllPokemonDetailsAction, saveToMyPokemonAction} from "../../store/pokemonList/pokemonList.actions";
import MaterialPagination from "../../components/Pagination/MaterialPagination";
import {defaultItemsPerPage} from "../../constants/pagination";
import {Pokemon} from "../../components/Pokemon/Pokemon";
import {Modal} from "../../components/Modal/Modal";
import {changeRouteAction} from "../../store/routing/routing.actions";
import {RouteInfo} from "../../constants/routes";
import {PokemonDetails} from "../../components/PokemonDetails/PokemonDetails";
import {Header} from "../../components/Header/Header";

interface IProps {
  allPokemonList: IPokemon[];
  isPokemonLoading: boolean;
  addToMyPokemon: (id: number) => void;
  totalPokemon: number,
  myPokemonList: number[],
  fetchPokemon: (page: number) => void;
  goBack: () => void;
}

interface IState {
  isDetailsModalOpen: boolean;
  selectedPokemon: IPokemon | null;
}

class PokemonListContainerInner extends React.Component<IProps, IState> {
  public state: IState = {isDetailsModalOpen: false, selectedPokemon: null}

  render() {
    // @ts-ignore
    return (
        <>
          <Header goBack={this.props.goBack} title={"List of all Pokemon"}/>
          {this.props.isPokemonLoading &&
          <div className="loader">
              <div className="lds-dual-ring"></div>
          </div>
          }
          <div className="pokemonList__container">
            {this.props.allPokemonList.length > 0 && this.renderPokemon()}
          </div>
          <MaterialPagination
              itemsPerPage={defaultItemsPerPage}
              totalItems={this.props.totalPokemon}
              pageRangeDisplayed={3}
              hideFirstLastPages={true}
              onChange={(page) => this.props.fetchPokemon(page)}
              nextPageText={
                <p>next</p>
              }
              prevPageText={
                <p>prev</p>}
          />
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

  toggleDetailsModal() {
    this.setState({isDetailsModalOpen: !this.state.isDetailsModalOpen})
  }

  shouldShowAddButton(id: number) {
    return !(this.props.myPokemonList.indexOf(id) !== -1);
  }

  renderPokemon() {
    return this.props.allPokemonList.map((pokemon: IPokemon) => (
        <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            showName
            addToMyPokemon={this.props.addToMyPokemon}
            showAddButton={this.shouldShowAddButton(pokemon.id)}
            selectPokemon={(pokemon: IPokemon) => this.selectPokemon(pokemon)}
        />
    ))
  }
  selectPokemon(pokemon: IPokemon) {
    this.setState({selectedPokemon: pokemon}, () => this.setState({isDetailsModalOpen: true}))
  }
}

export const PokemonListContainer = connect(mapState, mapDispatchToProps)(PokemonListContainerInner);

function mapState(state: IAppState) {
  return {
    isPokemonLoading: state.pokemonList.loading,
    myPokemonList: state.pokemonList.myPokemonList.pokemonIds,
    allPokemonList: state.pokemonList.allPokemonList.data,
    totalPokemon: state.pokemonList.allPokemonList.total
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    addToMyPokemon: (id: number) => dispatch(saveToMyPokemonAction(id)),
    fetchPokemon: (page: number) => dispatch(fetchAllPokemonDetailsAction({
      start: (page - 1) * defaultItemsPerPage,
      limit: defaultItemsPerPage
    })),
    goBack: () => dispatch(changeRouteAction({routeInfo: RouteInfo.myPokemon()}))
  }
}

