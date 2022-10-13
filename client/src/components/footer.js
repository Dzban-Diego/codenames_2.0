import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            masterURL: window.location.href + 't'
        }
    }
    
    getURL = () => {
        const url = '/codenames/draw/' + this.props.roomid
        fetch(url)
            .then(res => res.json())
            .then(res => {
                window.location.reload(true);
            })
            .catch(error => console.log(error));
    }

    getLink = () => {
        var el = document.createElement('textarea');
        el.value = this.state.masterURL;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    render() {
        return (
            <div className="footer">
                <div className="item">
                    <h5 className="discription">{this.state.masterURL}</h5>
                    <button onClick={this.getLink} className="btt">Kopiuj</button>
                </div>

                <button onClick={this.getURL} className="draw">Nowa gra</button>
            </div>
            );
        }
    }

export default Footer;