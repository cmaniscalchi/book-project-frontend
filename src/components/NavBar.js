import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { Segment, Menu, Container, Image } from 'semantic-ui-react'
import { clearSelectedBook, logoutUser } from '../actions'


const NavBar = ({ clearSelectedBook, loggedIn, logoutUser, user, location: { pathname } }) => {

  const logo = require('../assets/img/ex-libris.png')

  return (
    <Segment textAlign='center' style={{padding: '1em 1em'}} vertical >
      <Menu size='large' borderless style={{ border: 'none', boxShadow: 'none' }}>
        {loggedIn ? (
          <Container>
            <Link to="/bookshelf"><Image src={logo} style={{ width:'122px', height:'125px' }} /></Link>
            <Link to="/bookshelf"><Menu.Item as='h1' name="Ex Libris" /></Link>
            <Menu.Item as={NavLink} to="/bookshelf" name="Bookshelf" onClick={clearSelectedBook} active={pathname === '/bookshelf'} />
            <Menu.Item as={NavLink} to="/search" name="Search Books" onClick={clearSelectedBook} active={pathname === '/search'} />
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login" name="Log out" onClick={() => logoutUser(user.name)} />
            </Menu.Menu>
          </Container>
        ) : (
          <Container>
            <Image src={logo} style={{ width:'122px', height:'125px' }} />
            <Menu.Item as='h1' name="Ex Libris" />
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login" name="Log In or Sign Up" active={pathname === '/login'} />
            </Menu.Menu>
          </Container>
        )}
      </Menu>
    </Segment>
  )
}

const mapStateToProps = ({ user: { loggedIn, user } }) => ({ loggedIn, user })

export default withRouter(connect(mapStateToProps, { clearSelectedBook, logoutUser })(NavBar))
