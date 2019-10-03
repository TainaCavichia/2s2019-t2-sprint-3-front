//está no node modules
import React, { Component } from 'react';

//img
import logo from '../../assets/img/icon-login.png';

//component
import Rodape from '../../components/Rodape/Rodape';
import Titulo from '../../components/Titulo/Titulo';

//herança, poderemos usar o que tem no component
class Categoria extends Component {

  constructor() {
    super();
    //cria uma lista vazia dentro do estado
    this.state = {
      lista: [
        // { idCategoria: 1, nome: "Design" },
        // { idCategoria: 2, nome: "Jogos" },
        // { idCategoria: 3, nome: "Meetup" }
      ],
      nome: ''
    };
  }

  //faz conexao com a api
  //sintaxe normal de function
  componentDidMount(){
    this.listaAtualizada();
  }

  listaAtualizada = () => {
    fetch('http://192.168.7.85:5000/api/categorias')
    .then(response => response.json())
    //atribui valores da api para a lista 
    .then(data => this.setState({lista: data}));
  }

  //criar função = usar arrow function para nao confundir o rolê
  adcionaItem = (event)=>{
    //recarrega a página
    event.preventDefault();
    
    //biblioteca externa
    fetch('http://192.168.7.85:5000/api/categorias',{
      method: "POST",
      body: JSON.stringify({nome: this.state.nome}),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    .then(this.listaAtualizada)
    .catch(error => console.log(error));
  }
  
  // adicionaCategoria = ()=>{
  //   //capturei valores da lista
  //   let valores_lista = this.state.lista;
  //   let categoria = {idCategoria: this.state.nome}
    
  //   valores_lista.push(categoria);

  //   this.setState({lista: valores_lista});
  // }

  atualizarNome = (event)=>{
    this.setState({nome: event.target.value})
    console.log(this.state)    
  }

  render() {
    return (
      <div>
        <header className="cabecalhoPrincipal">
          <div className="container">
            <img src={logo} />

            <nav className="cabecalhoPrincipal-nav">
              Administrador
          </nav>
          </div>
        </header>

        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
            <Titulo titulo='Categorias'/>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                  </tr>
                </thead>

                <tbody id="tabela-lista-corpo">
                  {this.state.lista.map(element => {
                    //acessa a lista e faz um "foreach" que é o map
                    return (
                      <tr>
                        <tr>{element.idCategoria}</tr>
                        <td>{element.nome}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Categoria
            </h2>
              <form>
                <div className="container">
                  <input
                    type="text"
                    className="className__categoria"
                    id="input__categoria"
                    placeholder="tipo do evento"
                    value={this.state.nome}
                    onChange={this.atualizarNome}
                  />
                  <button
                  //"this" se refere a classe Categoria
                    onClick={this.adcionaItem}
                    id="btn__cadastrar"
                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                  >
                    Cadastrar
                </button>
                </div>
              </form>
            </div>
          </section>
        </main>

        <Rodape />
      </div>

    )
  }
}
export default Categoria;