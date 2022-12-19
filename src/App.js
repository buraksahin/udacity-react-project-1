import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ShelfContainer from './components/ShelfContainer'
import SearchPage from './components/SearchPage'
import * as BooksAPI from './api/BooksAPI'
import * as Constants from './constants/Constants'
class BooksApp extends React.Component {
  state = {
    booksData: {},
  };

  constructor(props) {
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    BooksAPI.getAll().then((booksData) => {
      this.setState({ booksData: booksData });
    });
  }

  handleShelfChange(book, previousState) {
    BooksAPI.update(book, book.shelf).then(() => {
      if (previousState === Constants.SHELF_NONE) {
        this.setState({ booksData: [...this.state.booksData, book] });
      }
      else {
        let books = this.state.booksData;
        books = books.filter(book => book.shelf !== Constants.SHELF_NONE);
        this.setState({ booksData: books });
      }
    }
    );
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/"
              element={
                <ShelfContainer
                  onShelfChange={this.handleShelfChange}
                  booksData={this.state.booksData}
                  onChangeSearchPageStatus={this.handleSearchPageStatus}
                />
              }
            />
            <Route path="/search"
              element={
                <SearchPage
                  onShelfChange={this.handleShelfChange}
                  booksData={this.state.booksData}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default BooksApp
