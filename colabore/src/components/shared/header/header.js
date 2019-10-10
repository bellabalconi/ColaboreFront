import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './header.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button } from 'reactstrap';
  
const styles =  {
  link: {
    textDecoration:'none',
  },
  logo: {
    margin: '0',
    marginLeft: '15px',
    textDecoration: 'none',
    color: "#54c242"
  }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  deslogar = () => {
    localStorage.clear()
    // ARRUMAR O DESLOGAR DESSA BAGAÇA
    window.location.href = '/'
  }

  render() { 
    return (
      <div>
        <Navbar className="header-color" color="header-color" light expand="md" fixed={`top`}>
          <NavbarBrand >
              <Button className="logo"
              style={{ fontSize: '25px', background: 'none', border: 'none', margin: '0', color: "#54c242" }}
              onClick={ this.deslogar }>Colabore</Button>
          </NavbarBrand> 
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <Link 
                  className="cabecalho-links"  
                  to="/campanhas"
                  style={ styles.link }>
                  Campanhas</Link>                
              </NavItem>
              <NavItem>
                  <Link 
                  className="cabecalho-links"
                  to="/minhasContribuicoes"
                  style={ styles.link }>
                  Contribuições</Link>  
              </NavItem>
              <NavItem>
                  <Link 
                  className='cabecalho-links'
                  to="/cadastroCampanha"
                  style={ styles.link }>
                  Criar campanha    
                  </Link>  
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}