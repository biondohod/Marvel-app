import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
        </main>
      </div>
    )
  }
}

export default App;
