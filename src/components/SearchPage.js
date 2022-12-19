import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../api/BooksAPI";
import * as HeaderConstants from '../constants/Constants'
import Book from "./Book";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {booksData:[], searchedBooks: []};
    BooksAPI.getAll().then((booksData) => {
      if(booksData && booksData.length){
        this.setState({ booksData: booksData })
      } 
    });
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(book, previousState) {
    this.props.onShelfChange(book, previousState);
  }

  search = (key) => {
    const searchKey = key.trim();
    if (searchKey.length) {
      BooksAPI.search(searchKey)
        .then((response) => {
          if (response && response.length > 0) {
            const searchedBooks = response.map((book) => {
              const bookFromShelf = this.state.booksData.find((bookFromShelf) => bookFromShelf.id === book.id);
              return bookFromShelf
                ? { ...book, shelf: bookFromShelf.shelf }
                : { ...book, shelf: HeaderConstants.SHELF_NONE };
            });
            this.setState({ searchedBooks });
          }
          else {
            this.setState({ searchedBooks: [] });
          }
        })
        .catch((e) => {
          this.setState({ searchedBooks: [] });
        });
    }
    else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link to='/'>
          <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.search(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((book) => (
              <li key={book.id}>
                <Book onShelfChange={this.handleShelfChange} book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
