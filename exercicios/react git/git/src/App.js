import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lista: [],
      nomeUsuario: ""
    };
  }
  atualizaTabela = (event)=>{
    event.preventDefault()
    fetch('https://api.github.com/users/'+this.state.nomeUsuario+'/repos')
        .then(response => response.json())
        .then(data => {this.setState({lista: data})})
        .catch(erro => console.log(erro))
  }
  atualizaDados = (event)=>{
    this.setState({nomeUsuario: event.target.value})    
  }

  render() {
    return (
      <div className="App">
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
        
          <h1>Buscando repositórios Git</h1>
        
          <div className="container" id="conteudoPrincipal-cadastro">
              <div className="container">
                <input type="text" id="titulo" placeholder="Nome usuário" value={this.state.nomeUsuario} onChange={this.atualizaDados}/>
              </div>
              <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" onClick={this.atualizaTabela}>Buscar</button>
            </div>

            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data Criação</th>
                    <th>Tamanho</th>
                  </tr>
                </thead>

                <tbody id="tabela-lista-corpo">
                  {
                    this.state.lista.map(element => {
                      return (
                        <tr>
                          <td>{element.id}</td>
                          <td>{element.name}</td>
                          <td>{element.description}</td>
                          <td>{element.created_at}</td>
                          <td>{element.size}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default App;
