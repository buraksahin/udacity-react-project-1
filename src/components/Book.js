import React, { Component } from 'react'
import * as HeaderConstants from '../constants/Constants'
import { FaStar } from 'react-icons/fa'

export default class Book extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(state) {
    const previousState = this.props.book.shelf;
    this.props.book.shelf = state;
    this.props.onShelfChange(this.props.book, previousState);
  }

  render() {
    let content = [];
    const getStars = (count) => {
      for (let i = 0;i < count; i++) {
        content.push(<FaStar key={"star-"+ i + "-" + this.props.book.id} style={{ color: '#ef8f25', cursor: 'pointer' }} />);
      }
      return content;
    };

    const thumbnail = () => {
      let imageUrl = "";
      if(this.props.book.imageLinks && this.props.book.imageLinks.thumbnail){
        imageUrl = this.props.book.imageLinks.thumbnail;
      }
      return imageUrl;
    };

    return (
      <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+thumbnail()+'")' }}></div>
        <div className="book-shelf-changer">
          <select value={ this.props.book.shelf } onChange={ (event) => this.handleChange(event.target.value) }>
            <option value="move" disabled>{HeaderConstants.MOVE}</option>
            <option value="currentlyReading">{HeaderConstants.CURRENTLY_READING}</option>
            <option value="wantToRead">{HeaderConstants.WANT_TO_READ}</option>
            <option value="read">{HeaderConstants.READ}</option>
            <option value="none">{HeaderConstants.NONE}</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.book.title}</div>
      <div className="book-authors">{this.props.book.authors}</div>
      <div className="book-rate">
      {getStars(this.props.book.averageRating)}
      </div>
    </div>
    )
  }
}
