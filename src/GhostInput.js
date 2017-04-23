import React, { Component } from 'react';
import './GhostInput.css';

class GhostInput extends Component {
  
  static defaultProps = {
  	texts: [
  		'Welcome! :D',
  		'I\'m Judson Silva a brazilian',
  		'Fullstack Javascript developer',
		'UI / Graphic designer',
		'Musician in my spare time',
		'I\'m in love with science and tech <3',
		'Contact me ;)'
  	]
  };

  constructor(props){
  	super(props);
  	
  	this.state = {
  		lineIndex: 0,
  		textIndex: 0,
  		text: '',
  		pause: 0
  	};
  }

  componentDidMount() {
  	this.setState({
  		intervalId: setInterval(() => {
  			this.enter();
  		}, 80)
  	});
  }

  pause(){
  	var { pause } = this.state;

  	if( pause > -1 && pause < 15 )
  		this.setState({
  			pause: pause + 1
  		});
  	else
  		this.setState({ pause:-1 });
  }

  nextText(texts, lineLength, textLength){

  	var { pause, lineIndex, textIndex } = this.state;

  	if( lineIndex >= (lineLength - 1) )
  		lineIndex = 0;
  	else
  		lineIndex++;

  	textIndex = 0;
  	pause = 0;

  	this.setState({ textIndex, lineIndex, pause });
  }

  enter(){
  	var { pause, lineIndex, textIndex } = this.state;
  	
  	if(pause > -1)
  		return this.pause();

  	const { texts } = this.props;
  	
  	const lineLength = texts.length;
  	const textLength = texts[lineIndex].length;

  	if( textIndex === (textLength) )
  		return this.nextText(texts, lineLength, textLength);
  	else
  		textIndex++;

  	const text = texts[lineIndex].substr(0, textIndex);
  	
  	this.setState({ textIndex, text});
  }

  render() {  
    const { text, textIndex, pause } = this.state;
    
    var textBar = ' ';

    if( pause > -1 )
    	textBar = pause % 2 === 0 ? textBar: ' |';
    else
    	textBar = textIndex % 2 === 0 ? textBar: ' |';

    return (
      <p className="ghost-input">
      	{text}{textBar}
      </p>
    );
  }
}

export default GhostInput;
