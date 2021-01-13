import './index.scss';
import icon from 'img/close-button.svg';
import {Component} from 'react';


export default class CloseButton extends Component {
    render() {
      return (
        <a className="close-button" href="#" onClick={e => e.preventDefault()}> 
            <img src={icon} className="close-button__icon" alt="close"></img>
        </a>
      );
    }
  }