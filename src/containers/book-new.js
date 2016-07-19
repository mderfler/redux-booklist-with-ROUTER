import React, { Component, PropTypes } from 'react';
import { createBook } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class BookNew extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onFormSubmit(e) {
    e.preventDefault();
    this.props.createBook({title:this.state.title}).then(() => { this.context.router.push('/'); });
    this.setState({title: '' });
    
  }
 
 onInputChange(title) {
    this.setState({title});
  }
 
  render() {
    return (
      <div className="col-md-4">
      Or add a new book
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <input type="text" placeholder="Title" value={this.state.title}
          onChange={event => this.onInputChange(event.target.value)}
         />
        <input type="submit" value="Create Book" />
      </form>
      <Link to="/" className="btn btn-warning btn-sm">Index</Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createBook: createBook
   }, dispatch);
}

export default connect(null, mapDispatchToProps)(BookNew);
