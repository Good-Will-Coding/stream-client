import React, { Component } from "react";

class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          client_id:
            "222801331379-cgmk35bv4qd90qse461tetssj0bffqkf.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();

  };

  renderAuthButton() {
    switch (this.state.isSignedIn) {
      case null:
        return null;
      case true:
        return (
          <button onClick={this.onSignOutClick}className="ui red google button">
          <i className="google icon"></i>Sign Out
          </button>
        )
      default:
        return (
          <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>Sign In
          </button>
        )
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
