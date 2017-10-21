import React, { Component } from 'react';
import './App.css';

class App extends Component {
  getUserProfolio = ({ authResponse: { userID, accessToken } }) => {
    window.FB.api(`/${userID}`, result => {
      const userRootRef = this.handleFirebaseDBQuery(`users/${userID}`);
      this.handleFirebaseDBSet(
        { rootRef: userRootRef },
        {
          userID,
          accessToken,
          createdOn: new Date(),
          updatedOn: new Date()
        }
      );
      const userPromise = new Promise((OK, NOT) => {
        userRootRef.on('value', snapshot => OK(snapshot.val()));
      });
      userPromise.then(user => console.log(user));
    });
  };
  statusLoginCallback = response => {
    console.log('response =>', response);
    if (response.authResponse && response.status) {
      this.getUserProfolio({
        authResponse: response.authResponse
      });
    } else {
      alert('授權失敗，請重試。');
    }
  };
  handleFBSDKInit = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '{your-application-api-key}',
        cookie: true,
        xfbml: true,
        version: '{your-sdk-version}'
      });
      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };
  handleLogin = () =>
    window.FB.login(this.statusLoginCallback, {
      scope: 'email'
    });
  handleFirebaseDBQuery = Model => {
    return window.firebase.database().ref(Model);
  };
  handleFirebaseDBSet = ({ rootRef }, payload) => {
    rootRef.set(payload);
  };
  componentWillMount() {
    this.handleFBSDKInit();
  }

  render() {
    return <button onClick={this.handleLogin}>FB Login</button>;
  }
}

export default App;
