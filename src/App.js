import React, { Component } from 'react';
import './App.css';
import PictureCard from "./components/PictureCard/PictureCard";
import Wrapper from "./components/Wrapper/Wrapper";
import cards from "./cards.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    clickedArray: [],
    highscore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickImage = id => {
    
    const randomArray = this.randomArray(cards);
    this.setState({cards: randomArray});
    
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect!", shakeit: "true"});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct",
        shakeit: "false"
      });
    }
    
    if (this.state.score > this.state.highscore) {
      this.setState({ highscore: this.state.score });
    }
    
  }
  
  randomArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Welcome to React Clicky Game!!</h1>
        </header>
        <h3 className="App-intro">
          <strong>Click on an image to earn points, but don't click on any, more than once!</strong> 
          <p className = "score"><strong>Score: {this.state.score} | TopScore: {this.state.highscore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper
        shakeWrapper = {this.state.shakeit}
        pictures=
          {this.state.cards.map(picture => (
            <PictureCard
              clickImage={this.clickImage}
              id={picture.id}
              key={picture.id} // to get rid of unique key prop warning
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
        
      </div>
    );
  }
}
export default App;