import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null
  }

  onUpdateSelectedChar = (id) => {
    this.setState({
      selectedChar: id
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <ErrorBoundary>
            <RandomChar/> 
          </ErrorBoundary>
          <section className="char__content">
            <h2 className="visually-hidden">Characters</h2>
            <ErrorBoundary>
              <CharList onUpdateSelectedChar={this.onUpdateSelectedChar}/> 
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo selectedChar={this.state.selectedChar}/>
            </ErrorBoundary>
          </section>
          <img src={decoration} alt="vision" aria-hidden="true" className="bg-decoration" />
        </main>
      </div>
    );
  }
}

export default App;
