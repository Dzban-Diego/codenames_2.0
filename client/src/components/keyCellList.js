import React from 'react'

function keyCellList(props) {
    var sortlist = {
        black: [],
        white: [],
        blue: [],
        red: [],
    }
    
    for(var i = 0; i < 25; i++){
        switch(props.curbase.key[i]){
            case 0 : sortlist.black.push(props.curbase.curwords[i]);  break;
            case 1 : sortlist.red.push(props.curbase.curwords[i] + ', ');  break;
            case 2 : sortlist.blue.push(props.curbase.curwords[i] + ', ');  break;
            case 3 : sortlist.white.push(props.curbase.curwords[i] + ', ');  break;
            default : console.log('ERROR')
        }
    }
    
    return (
        <div className="">
            <div className="black wordbox">
                {sortlist.black}
            </div>
            <div className="red wordbox">
                {sortlist.red}
            </div>
            <div className="blue wordbox">
                {sortlist.blue}
            </div>
            <div className="white wordbox">
                {sortlist.white}    
            </div>
        </div>
    )
}

export default keyCellList