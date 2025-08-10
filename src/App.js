import React, {Component} from 'react';
import {scan, onReading} from './nfc'
class App extends Component {
  state = { seedInput: '' };

  render() {
    const {actions} = this.props;
    const {seedInput} = this.state;
    return (
      <div>
        <header>
          <h1>straight up dnb-ing it, and by it....lets just say.</h1>
        </header>
        <main>
          <div style={{display:'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
            <input
              type="text"
              placeholder="yubi otp code"
              value={"just scan"}
              onChange={e => this.setState({seedInput: scan()})}
              style={{minWidth: 260}}
            />
            <button type="button" onClick={() => actions.fromSeed(seedInput)}> get ur music :P</button>
            <button type="button" onClick={actions.togglePlay}>pause</button>
          </div>
        </main>
        <footer>           
        </footer>
      </div>
    );
  }
}
export default App;
