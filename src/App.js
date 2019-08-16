import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      message: 'hello',
      shift: 2,
      ciphertext: ''
    }
    this.caesarShift = this.caesarShift.bind(this); 
    this.handleClick = this.handleClick.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleShiftChange = this.handleShiftChange.bind(this);
  }

  caesarShift(str, amount) {
    // Wrap the amount
    if (amount < 0)
      return this.caesarShift(str, amount + 26);
    // Make an output variable
    let output = '';
    // Go through each character
    for (let i = 0; i < str.length; i ++) {
      // Get the character we'll be appending
      let c = str[i];
      // If it's a letter...
      if (c.match(/[a-z]/i)) {
        // Get its code
        let code = str.charCodeAt(i);
        // Uppercase letters
        if ((code >= 65) && (code <= 90))
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        // Lowercase letters
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
      // Append
      output += c;
    }
    // All done!
    return output;
  };

  handleClick(){
    let encrypted = this.caesarShift(this.state.message, this.state.shift)
    this.setState({ciphertext: encrypted})
  }

  handleMessageChange(event){
    
    this.setState({message: event.target.value})
  }

  handleShiftChange(event){
    this.setState({shift: Number(event.target.value)})
  }


  render() {
  
  return (
    <div className="App">
        <p>Message: <input type="text" value={this.state.message} onChange={this.handleMessageChange}/></p>
        <p>Shift: <input type="text" value={this.state.shift} onChange={this.handleShiftChange}/></p>
        <button onClick={this.handleClick}>Click to encrypt your message.</button>
        <p>{this.state.ciphertext}</p>
    </div>
  );
  }
}

export default App;
