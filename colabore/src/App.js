import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './components/telaLogin';
import CadastroCampanha from './components/cadastroCampanha';
import CadastroUsuario from './components/cadastroUsuario/cadastroUsuario';
import DetalheCampanha from './components/detalheCampanha';
import EdicaoCampanha from './components/edicaoCampanha';
import ListaCampanha from './components/listaCampanhas';
import MinhasContribuicoes from './components/telaListaContribuicoes';




class App extends Component {

  render() {

    return (
      <div className="screen">
        <Router>
          <React.Fragment>
            <Route path="/" exact component={Login} />
            <Route path="/cadastroUsuario" component={CadastroUsuario} />

            {!localStorage.getItem("token") && window.location.pathname !== '/' && window.location.pathname !== '/cadastroUsuario'?
              <a href="/" style={{ color: "#59c9a9", fontSize: "36px" }}>Faça login para acessar o sistema </a>
              :
              <React.Fragment>
                <Route path="/cadastroCampanha" component={CadastroCampanha} />
                <Route path="/detalheCampanha/:id" component={DetalheCampanha} />
                <Route path="/edicaoCampanha/:id" component={EdicaoCampanha} />
                <Route path="/campanhas" component={ListaCampanha} />
                <Route path="/minhasContribuicoes" component={MinhasContribuicoes} />
              </React.Fragment>
            }
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;





