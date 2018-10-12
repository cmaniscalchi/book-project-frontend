import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BookshelfBook from './BookshelfBook'
import { Grid, Button, Header, Segment, Image } from 'semantic-ui-react'
import { setShelvedBooks, clearSelectedCover, clearSelectedBook } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks, clearSelectedBook, selectedBook, clearSelectedCover, selectedCover } = this.props
    setShelvedBooks(shelvedBooks)
    clearSelectedBook(selectedBook)
    clearSelectedCover(selectedCover)
  }

  newUserHeader = () => {
    const newUserImage = require('../assets/img/Alexander-Deineka.jpg')
    return (
      <div>
        <Segment style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: 800 }}>
          <Header as='h2' textAlign='center'>My Bookshelf</Header>
          <Header sub textAlign='center'>Welcome to Ex Libris, your virtual bookshelf!<br />
          Begin by exploring books to add to your shelf.</Header>
          <br />
          <Image src={newUserImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '80%' }}/>
          <br />
          <Link to="/search"><Button fluid>Go To Search</Button></Link>
        </Segment>
        <br />
      </div>
    )
  }

  changeCoverHeader = () => {
    let { clearSelectedCover, selectedCover } = this.props
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>Select a New Cover for {selectedCover.title}</Header>
          <Header sub textAlign='center'>Please note: The covers displayed here may not all match your book exactly;<br />
          they are Google Books's best guess at covers for this work.</Header>
          <br />
          <Button fluid onClick={clearSelectedCover}>Cancel Book Cover Change</Button>
        </Segment>
        <br />
      </div>
    )
  }

  bookshelfHeader = () => {
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>My Bookshelf</Header>
          <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
        </Segment>
        <br />
      </div>
    )
  }

  render() {
    // console.log("BookshelfList props:", this.props)
    let { shelvedBooks, bookCovers, selectedBook } = this.props
    return (
      <div>
        <div>
          {bookCovers.length > 0 ? this.changeCoverHeader() : null}
          {shelvedBooks.length === 0 ? this.newUserHeader() : null}
          {shelvedBooks.length > 0 && bookCovers.length === 0 ? this.bookshelfHeader() : null}
        </div>
        <div>
          <Grid relaxed columns={4}>
            {shelvedBooks.length > 0 && bookCovers.length === 0 ? shelvedBooks.map(book => <BookshelfBook book={book} key={book.goodreads_book_id} />).reverse() : null}
            {shelvedBooks.length > 0 && bookCovers.length > 0 ? bookCovers.map(cover => <BookshelfBook book={selectedBook} cover={cover} key={cover.src} />).reverse() : null}
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shelvedBooks: state.user.user.books,
  bookCovers: state.book.bookCovers,
  selectedBook: state.book.selectedBook,
  selectedCover: state.book.selectedCover
})

export default connect(mapStateToProps, { setShelvedBooks, clearSelectedCover, clearSelectedBook })(BookshelfList)
