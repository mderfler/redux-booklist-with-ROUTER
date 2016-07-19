import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import BookList from './containers/book-list';
import BookDetail from './containers/book-detail';
import BookNew from './containers/book-new';

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={BookList} />
    <Route path="book/new" component={BookNew} />
    <Route path="book/:id/:title" component={BookDetail} />
  </Route>
);