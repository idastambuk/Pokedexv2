import React from "react";
import {connect} from "react-redux";
import {ICredentials} from "../../store/authentication/authentication.saga";
import {logInAction, signUpAction} from "../../store/authentication/authentication.actions";
import {IAppState} from "../../app-state";
import {LoginForm} from "../../components/LoginForm/LoginForm.component";
import {Header} from "../../components/Header/Header";

interface IProps {
  route: () => void;
  signUp: (cred: ICredentials) => void;
  logIn: (cred: ICredentials) => void;
  goBack: () => void;
  isAuthLoading: boolean;
  isPokemonLoading: boolean;
  authError: string;
}

interface IState {
  isSignUp: boolean
}

class LoginContainerInner extends React.Component<IProps, IState> {
  public state: IState = {
    isSignUp: false
  };

  render() {
    return (
        <>
          {this.state.isSignUp &&
          <Header
              goBack={() => this.toggleSignUp()}
              title="Sign up"/>
          }
          {this.props.isAuthLoading &&
          <div className="loader">
              <div className="lds-dual-ring"></div>
          </div>
          }

          <main className="login__container">
            <LoginForm
                isSignUp={this.state.isSignUp}
                authError={this.props.authError}
                logIn={this.props.logIn}
                signUp={this.props.signUp}
                goToSignUp={() => this.toggleSignUp()}/>
          </main>
        </>
    )
  }

  private toggleSignUp() {
    this.setState({isSignUp: !this.state.isSignUp})
  }
}

export const LoginContainer = connect(mapState, mapDispatchToProps)(LoginContainerInner);

function mapState(state: IAppState) {
  return {
    authError: state.authentication.authError,
    isAuthLoading: state.authentication.isLoading,
    isPokemonLoading: state.pokemonList.loading
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    signUp: (credentials: ICredentials) => dispatch(signUpAction(credentials)),
    logIn: (credentials: ICredentials) => dispatch(logInAction(credentials)),
  }
}

