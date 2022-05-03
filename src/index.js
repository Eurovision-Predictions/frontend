import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { HashRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import store from './reducers/eurovision';

store.dispatch({
  type: "INIT"
});

const auth = {
  domain: "dev-11hy0hqn.us.auth0.com",
  clientId: "kAF5ywmIG4XkxmYB0vOLSmZ0vU4CTrKv",
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider {...auth} redirectUri={window.location.origin + window.location.pathname}>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
