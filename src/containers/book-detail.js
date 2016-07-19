import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateBook, selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { newTitle: '' };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.selectBook({id:this.props.params.id, title:this.props.params.title});
  }
   
  onFormSubmit(e) {
    e.preventDefault();
    this.props.updateBook({title:this.state.newTitle, id:parseInt(this.props.book.id)})
      .then(() => { this.context.router.push('/'); });
    this.setState({newTitle: '' });
  }

  onInputChange(newTitle) {
    this.setState({newTitle});
  }

  render() {
    if (!this.props.book) {
      return <div>Select a book to get started.</div>;
    }

    return (
      <div className="col-md-4">
        <h3>Details for: {this.props.book.title}</h3>
          <h6>enter new title and press enter</h6>
            <form onSubmit={this.onFormSubmit.bind(this)}>
              <div >Title: {this.props.book.title}
               <input className="updateBox" type="text" value={this.state.newTitle}
                placeholder="edit title"
                onChange={event => this.onInputChange(event.target.value)}
                />
              </div>
            </form>
        <div>ID: {this.props.book.id}</div>
        <Link to="/">Back To Index</Link>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateBook: updateBook,
    selectBook: selectBook  
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
