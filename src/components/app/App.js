import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
          <section className="char__content">
            <h2 className="visually-hidden">Characters</h2>
            <CharList/>
            <CharInfo/>
          </section>
          <img src={decoration} alt="vision" aria-hidden="true" className="bg-decoration" />
        </main>
      </div>
    );
  }
}

export default App;
