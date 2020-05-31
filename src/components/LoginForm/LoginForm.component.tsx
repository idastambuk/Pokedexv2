import React from "react";
import {ICredentials} from "store/authentication/authentication.saga";

interface IProps {
  isSignUp: boolean;
  goToSignUp: () => void;
  logIn: (cred: ICredentials) => void;
  signUp: (credentials: ICredentials) => void
  authError: string;
}

interface IState {
  email: string;
  password: string;
}

export class LoginForm extends React.Component<IProps, IState> {

  public state: IState = {
    email: "",
    password: ""
  }

  render() {
    return (
        <div>
          <div className="login">
            <label htmlFor="email">Email</label>
            <input
              required
              maxLength={100}
              placeholder="Email Address"
              id="email"
              name="email"
              autoComplete="email"
              value={this.state.email}
              onChange={(event: any) => this.fieldChange(event, "email")}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              maxLength={100}
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              autoComplete="email"
              value={this.state.password}
              onChange={(event: any) => this.fieldChange(event, "password")}
            />
            <button
                className="button"
                onClick={() => this.props.isSignUp ? this.props.signUp(this.state) : this.props.logIn(this.state)}
            >
              {this.props.isSignUp ? "Register" : "Log In"}
            </button>
            {!this.props.isSignUp &&
            <div>
                    <p className="sign-up" onClick={() => this.props.goToSignUp()}>
                        Don't have an account? <strong>Sign Up Here</strong>
                    </p>
            </div>
            }
          </div>
        </div>
    )
  }

  private fieldChange(event: any, field: keyof IState) {
    this.setState({...this.state, [field]: event.target.value})
  }
}

