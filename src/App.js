import './App.css';
import React from 'react';
import buttonInfo from './data';
import $ from 'jquery';

class Power extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.status){
      $('#power').css('float', 'right');
    }
    else {
      $('#power').css('float', 'left');
    }
    return (
      <div className='switch-wrapper'>
        <label for='power'>Power</label>
        <div className='outer-switch' onClick={this.props.toggle}>
          <div className='switch' id='power'></div>
        </div>
      </div>
    );
  }
}

class Bank extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.status){
      $('#bank').css('float', 'right');
    }
    else {
      $('#bank').css('float', 'left');
    }
    return (
      <div className='switch-wrapper'>
        <label for='bank'>Bank</label>
        <div className='outer-switch' onClick={this.props.power ? this.props.switchBank : ()=>null}>
          <div className='switch' id='bank'></div>
        </div>
      </div>
    );
  }
}

class Drum extends React.Component {
  constructor(){
    super();
    this.state = {
      'power': true,
      'bank': 0
    }
    this.play = this.play.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.switchBank = this.switchBank.bind(this);
  }
  componentDidMount() {
    //document.addEventListener('keydown', this.handleKeyPress);
    //$(body).on('keydown', this.handleKeyPress);
    $('body').on('keydown ', this.handleKeyPress);
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const buffer = context.createBuffer(1, 1,22050);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
  }
  componentWillUnmount() {
    //document.removeEventListener('keydown', this.handleKeyPress);
    $('body').off('keydown', this.handleKeyPress);
  }
  play(item) {
    const audio = $('#'+item.key)[0];
    audio.currentTime = 0;
    audio.play();
    $('#display').text(item.id[this.state.bank]);
  }
  handleKeyPress(event) {
    for(let i=0; i<buttonInfo.length; i++){
      if (event.key.toUpperCase() === buttonInfo[i].key){
        //document.getElementById(buttonInfo[i].id).click();
        $('#'+buttonInfo[i].id[this.state.bank]).trigger('click');
      }
    }
  }
  toggleChange(){
    this.setState({
      'power': !this.state.power
    });
    if(this.state.power===true){
      $('#display').text('');
    }
  }
  switchBank(){
    if (this.state.bank===0){
      this.setState({
        bank: 1
      });
    }
    else {
      this.setState({
        bank: 0
      });
    }
  }
  render() {
    const buttonMap = buttonInfo.map((item) => {
      return (
        <button className='drum-pad' id={item.id[this.state.bank]} key={item.id[this.state.bank]} onClick={this.state.power ? (() => this.play(item)) : ()=>null}>
          <audio src={item.audio[this.state.bank]} id={item.key} className='clip'></audio>
          {item.key}
        </button>
      );
    })
    return(
      <div id='drum-machine'>
        <div id='pad'>{buttonMap}</div>
        <div id='setting'>
          <Power toggle={this.toggleChange} status={this.state.power}/>
          <div id='display'></div>
          {/*<div id='sound'></div>*/}
          <Bank switchBank={this.switchBank} status={this.state.bank} power={this.state.power}/>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Drum />
      <p className='credit' id='credit1'>Photo by <a href='https://unsplash.com/@clemono?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Clem Onojeghuo</a> on <a href='https://unsplash.com/s/photos/night-cafe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a></p>
      <p className='credit' id='credit2'><a href='https://www.freepik.com/photos/black-leather'>Black leather photo created by denamorado - www.freepik.com</a></p>
    </div>
  );
}

export default App;