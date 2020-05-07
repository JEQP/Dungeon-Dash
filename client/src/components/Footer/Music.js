import React from "react";
import "./style.css";
import Background from "../../assets/backgroundmusic.mp3";

class Music extends React.Component {
    state = {
      play: false
    }
    
    audio = new Audio(Background)
  
    componentDidMount() {
      this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }
  
    componentWillUnmount() {
      this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
    }
  
    togglePlay = () => {
      this.setState({ play: !this.state.play }, () => {
        this.state.play ? this.audio.play() : this.audio.pause();
      });
    }
  
    render() {
        console.log("this.props.url: ", this.props.url);
        console.log("audio: ", this.audio);
      return (
        <div>
          <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
        </div>
      );
    }
  }
  
  export default Music;