import React, {Component} from 'react';
import {scan, onReading} from './nfc'

class App extends Component {
  state = { seedInput: '' };

  handleMaskedKeyDown = (event) => {
    const { key, metaKey, ctrlKey, altKey } = event;
    const navigationKeys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'Tab',
      'Escape',
      'Enter',
    ];
    if (navigationKeys.includes(key)) return;
    if (key && key.length === 1 && !metaKey && !ctrlKey && !altKey) {
      this.setState(({ seedInput }) => ({ seedInput: seedInput + key }));
      event.preventDefault();
      return;
    }
    if (key === 'Backspace') {
      this.setState(({ seedInput }) => ({ seedInput: seedInput.slice(0, -1) }));
      event.preventDefault();
      return;
    }

    if (key === 'Delete') {
      this.setState(({ seedInput }) => ({ seedInput: seedInput.slice(0, -1) }));
      event.preventDefault();
    }
  };

  handleMaskedPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') || '';
    if (!pasted) return;
    this.setState(({ seedInput }) => ({ seedInput: seedInput + pasted }));
  };

  render() {
    const {actions} = this.props;
    const {seedInput} = this.state;
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <main>
          
          <img src={ "https://signmycode.com/blog/wp-content/uploads/2023/07/yubikey-working-jpg.webp"} alt="yubi" style={{width: 'auto',height: 100, display: 'block', margin: '0 auto', rotate: '-90deg', marginBottom: 50}} />
            <div style={{display:'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
            
            <input
              type="text"
              placeholder="yubi otp code"
              value={'*'.repeat(seedInput.length)}
              onChange={() => { }}
              onKeyDown={this.handleMaskedKeyDown}
              onPaste={this.handleMaskedPaste}
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
