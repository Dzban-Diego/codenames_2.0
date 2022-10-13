import Word from './word'
import React, { Component } from 'react';
import KeyCell from './keyCell'
import Footer from './footer'
import KeyCellList from './keyCellList'

import MapBlue from '../img/mapb.JPG'
import MapRed from '../img/mapr.JPG'

class Board extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            master: this.props.master,
            prof: false,
        }
    }

    chprof = () => {
        this.setState({prof: true})
    }

    getButtonsUsingForLoop = () => {
        if(this.state.master){
            const array = []

            for(var i = 0; i < 25; i++){
                var nameclass = 'c'+ i
                array.push(<KeyCell key={nameclass} id={ i } curbase={this.props.curbase} />)
            }

            var style
            if(this.props.curbase.key[25]){
                style = {backgroundImage: `url(${MapBlue})`}
            }else{
                style = {backgroundImage: `url(${MapRed})`}
            }
            
            return (
            <div>
                {!this.state.prof && <div className="prof"><h6>Tę stronę mogą widzieć tylko prowadzący grę. Czy na pewno nim jesteś?</h6><button onClick={this.chprof}>Tak jestem liderem.</button></div>}
                {this.state.prof && <div><div style={ style } className="masterboard">{array}</div><KeyCellList curbase={this.props.curbase} /></div>}
            </div>)

        }else{
            const array = []
    
            for(var j = 0; j < 25; j++){
                array.push(<Word key={'Word' + j} id={j} curbase={this.props.curbase}/>)
            }
            return <div className='board2'><div className="board">{array}</div><Footer roomid={this.props.curbase._id} /></div>
        }
      }

    render() {
        return (
            <div className='Board'>
                {this.getButtonsUsingForLoop()}
            </div>
        );
    }
}

export default Board;