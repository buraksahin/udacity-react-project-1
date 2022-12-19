import React, { Component } from "react";
import Book from "./Book";
import * as HeaderConstants from '../constants/Constants'

export default class BookShelf extends Component {
  constructor(props){
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }
  
  handleShelfChange(book, previousState) {
    this.props.onShelfChange(book, previousState);
  }

  render() {
    let books = Object.assign([], this.props.booksData);
    books = books.filter((book) => book.shelf === this.props.shelf);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfHeader}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length !== 0 ? (
              books.map((book) => (
                <li key={book.id}>
                  <Book onShelfChange={this.handleShelfChange} book={book} />
                </li>
              ))
            ) : (<h4>{HeaderConstants.EMPTY_SHELF}</h4>)}
          </ol>
        </div>
      </div>
    );
  }
}
