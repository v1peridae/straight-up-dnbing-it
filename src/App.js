import React, {Component} from 'react';
import {scan, onReading} from './nfc'
class App extends Component {
  state = { seedInput: '' };


  render() {
    const {actions} = this.props;
    const {seedInput} = this.state;
    return (
      <div>
        <main>
        <img src="/yubikey-working-jpg.webp" alt="yubi" />
          <div style={{display:'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
            <input
              type="text"
              placeholder="yubi otp code"
              value={'*'.repeat(seedInput.length)}
              onChange={() => { }}
              style={{minWidth: 260}}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="text"
            />
            <button type="button" onClick={() => actions.fromSeed(seedInput)}>*</button>
            <button type="button" onClick={actions.togglePlay}>*</button>
          </div>
        </main>
        <footer>           
        </footer>
      </div>
    );
  }
}
export default App;
