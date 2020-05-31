import React from 'react'

interface IProps {
  goBack: () => void;
  title: string;
  goToAllPokemon?: () => void;
}

export class Header extends React.PureComponent<IProps> {
  render() {
    return (
        <header className="header">
          <button
              className="button-back"
              onClick={() => this.props.goBack()}>
            {"<"}
          </button>
          <h1 className="header__title">{this.props.title}</h1>
          {this.props.goToAllPokemon &&
          <button
              onClick={() => this.props.goToAllPokemon!()}
              className="button">Go To All Pokemon</button>
          }
        </header>
    )
  }
}
