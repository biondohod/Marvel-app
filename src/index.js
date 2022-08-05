import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './styles/style.scss';

const marvel = new MarvelService();
marvel.getCharacter(1009144).then(res => res.data.results.forEach(item => console.log(item)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);