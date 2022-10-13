import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board'

const queryString = window.location.search;
const roomname = queryString.slice(1, 25);
const master = queryString.slice(25,26);

class App extends Component {
    constructor(props) {
        super(props);
        
        this.timer = null

        this.state = {
            roomname: null,
            id: {id: roomname},
            data: null,
        }
    }

    Fetch = (url,destynation) => {
        var Fetchdata = null

        
        //turn ON to local debug
        //url = 'http://localhost:8080/' + url

        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                Fetchdata = data
                this.setState({[destynation]: data})
                return Fetchdata
            })
            .catch(err => console.log(err))
    }

    app = () => {
        if(this.state.data){
            return <Board master={master} curbase={this.state.data}/>
        }else if(this.state.id.id){
            this.Fetch('codenames/id/' + this.state.id.id,'data')
            window.history.pushState({},null,  '/?' + this.state.id.id + master);
        }else{
            return (
                <div className="noroom">
                    <label >Nazwa pokoju:</label>
                    <input onKeyDown={this.handleClick} type='text' onChange={e => this.setState({ roomname: e.target.value })} />
                    <button onClick={this.handleClick}>Graj!</button>
                </div>
            );
        }
    }

    handleClick = () => {
        this.Fetch('codenames/roomname/' + this.state.roomname,'id')
    }

    render() {
        return (
            <div className='app'>
                {(!this.state.data && this.state.id.id) && <p>Loading...</p>}
                {this.app()}
            </div>
        );
    }
}

///////////////////////////////////////////

ReactDOM.render(
    <div className="App">
        <App />
    </div>,
    document.getElementById('root')
);