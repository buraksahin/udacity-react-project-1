import React, { Component } from "react";
import BookShelf from "./BookShelf";
import * as HeaderConstants from "../constants/Constants";
import { Link } from "react-router-dom";

export class ShelfContainer extends Component {
  constructor(props) {
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(book, previousState) {
    this.props.onShelfChange(book, previousState);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{HeaderConstants.APP_HEADER}</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            onShelfChange={this.handleShelfChange}
            shelf={HeaderConstants.SHELF_CURRENTLY_READING}
            shelfHeader={HeaderConstants.CURRENTLY_READING}
            booksData={this.props.booksData}
          />
          <BookShelf
            onShelfChange={this.handleShelfChange}
            shelf={HeaderConstants.SHELF_WANT_TO_READ}
            shelfHeader={HeaderConstants.WANT_TO_READ}
            booksData={this.props.booksData}
          />
          <BookShelf
            onShelfChange={this.handleShelfChange}
            shelf={HeaderConstants.SHELF_READ}
            shelfHeader={HeaderConstants.READ}
            booksData={this.props.booksData}
          />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShelfContainer;
