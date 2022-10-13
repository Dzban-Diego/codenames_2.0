import React, { Component } from 'react';

class KeyCell extends Component{
    renderdiv = () => {
        const styles = 'c' + this.props.curbase.key[this.props.id]
        return <div className={styles}></div>
    }
    render(){
        return (
            <div className='cell'>
                {this.renderdiv()}
            </div>
        );
    
    }
}

export default KeyCell;