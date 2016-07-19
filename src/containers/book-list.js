import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks, selectBook, deleteBook } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class BookList extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  renderList() {
    return this.props.books.map((book) => {
      return (
        <div key={book.id}>
          <Link to={"book/" + book.id + "/" + book.title}>
            <span className="list-group-item">
              {book.title}
            </span>
          </Link>
          <span className="btn btn-danger btn-sm"
              onClick={() => {this.props.deleteBook(book.id)}}
            >Delete {book.title}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container-fluid col-md-4">
        <h6>Click on a title to edit</h6>
        {this.renderList()}
        <br/>
        <Link to={"book/new"} className="btn btn-success btn-sm">Create new book</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.allBooks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook: selectBook,
    fetchBooks: fetchBooks, deleteBook: deleteBook
   }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
