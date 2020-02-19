import React from 'react';

import './text-input.styles.scss';

class TextInput extends React.Component {
  state = { 
    text: ''
    }

    onInputChange = (e) => {
      console.log(e.target.value)
      this.setState({text: e.target.value}) 
    }
  render() { 
    return ( 
        <div>
          <textarea type='text' placeholder='type message' value={this.state.text} onChange={this.onInputChange} spellCheck='true'/>
          <p>{this.state.text}</p>
        </div>
      );
  }
}

export default TextInput;