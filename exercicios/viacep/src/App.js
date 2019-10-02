import React, {Component} from 'react';
import './App.css';
import '../src/assets/css/style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lista: [
      { cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: ""
      }
    ],
      cepbuscado: ""
    };
  }
  componentDidMount(){
    fetch('https://viacep.com.br/ws/'+this.state.cepbuscado+'/json/')
    .then(response => response.json())
    .then(data => this.setState({lista: data}));
  }
  atualizaTabela = (event)=>{
    event.preventDefault()
    fetch('https://viacep.com.br/ws/'+this.state.cepbuscado+'/json/')
        .then(response => response.json())
        .then(data => this.setState({lista: data}))
        .then(erro => this.setState({erro: ""}))
        .catch(erro => {this.setState({erro: "CEP inválido"})})
        .catch(this.setState({lista: ""}))
  }

  atualizaDados = (event)=>{
    this.setState({cepbuscado: event.target.value})    
  }

  render()
  {
  return (
    <div className="App">
      <div className="container" id="conteudoPrincipal-lista">
        <table id="tabela-lista">
          <thead>
            <tr>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>Localidade</th>
              <th>Uf</th>
            </tr>
          </thead>

          <tbody id="tabela-lista-corpo">
                <tr>
                  <td>{this.state.lista.cep}</td>
                  <td>{this.state.lista.logradouro}</td>
                  <td>{this.state.lista.complemento}</td>
                  <td>{this.state.lista.bairro}</td>
                  <td>{this.state.lista.localidade}</td>
                  <td>{this.state.lista.uf}</td>
                </tr>
          </tbody>
        </table>
        <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Buscar CEP
            </h2>
              <form>
                <div className="container">
                  <input
                    type="text"
                    className="className__categoria"
                    id="input__categoria"
                    placeholder="tipo do evento"
                    value={this.state.cepbuscado}
                    onChange={this.atualizaDados}
                  />
                  <button
                    onClick={this.atualizaTabela}
                    id="btn__cadastrar"
                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                  >
                    Buscar
                </button>
                <p>{this.state.erro}</p>
                </div>
              </form>
            </div>
      </div>
    </div>
  );
}
}



export default App;
