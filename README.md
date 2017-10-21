# Create React App FB Login Demo

## Installation

```commandline
> git clone https://github.com/madeinfree/create-react-app-fblogin-demo.git
> cd create-react-app-fblogin-demo
> yarn
> yarn start
```

## Config

### Setting your firebase config < ./public/index.html >

```html
<script>
    // Initialize Firebase
    var config = {
      apiKey: "{your-firebase-api-key}",
      authDomain: "專案名稱.firebaseapp.com",
      databaseURL: "https://專案名稱.firebaseio.com",
      projectId: "專案名稱",
      storageBucket: ""
    };
    firebase.initializeApp(config);
  </script>
```

### Setting your facebook config < ./pages/App/App.js >

```javascript
window.fbAsyncInit = function() {
  window.FB.init({
    appId: '{your-application-api-key}',
    cookie: true,
    xfbml: true,
    version: '{your-sdk-version}'
  });
  window.FB.AppEvents.logPageView();
};
```

## License

MIT