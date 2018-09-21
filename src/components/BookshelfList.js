import React from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { Grid } from 'semantic-ui-react'

const BookshelfList = props => {
  // console.log("BookshelfList props:", props)
  return (
    <div>
      <Grid relaxed columns={4}>
        {props.books.length > 0 ? props.books.map(book => <Book book={book} key={book.goodreads_book_id} />) : null}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("BookshelfList state:", state)
  return {
    books: state.book.shelvedBooks
  }
}

export default connect(mapStateToProps)(BookshelfList)