import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Categoria from './pages/Categoria/Categoria';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';
import Login from './pages/Login/Login';
import * as serviceWorker from './serviceWorker';

//rotas
import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import Eventos from './pages/Eventos/Eventos';

//resto das propriedades = ...rest
//só poderão acessar as páginas com a rota privada os usuários logados
//component = página Categoria
const RotaPrivada = ({component: Component}) =>(
    <Route 
    //props= propriedades como path e component = atributos
    render = {props => 
        localStorage.getItem("usuario-gufos") !== null ? 
            //rota de categorias
            <Component {...props}/> : <Redirect to={{ pathname: "/login", state: {from: props.location} }}/>
            }
    >        
    </Route>
)

const routing = (
    <Router>
        <div>
            <Switch>
            <Route exact path='/' component={App}/>
            <RotaPrivada path='/categorias' component={Categoria}/>
            <RotaPrivada path='/eventos' component={Eventos}/>
            <Route path='/login' component={Login}/>
            <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
