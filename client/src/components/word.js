import React, { Component } from 'react';
import BgKill from '../img/kill.JPG';
import BgBlueM from '../img/bm.JPG';
import BgRedM from '../img/rm.JPG';
import BgWhiteM from '../img/wm.JPG';
import BgBlueW from '../img/bw.JPG';
import BgRedW from '../img/rw.JPG';
import BgWhiteW from '../img/ww.JPG';

class Word extends Component {
    constructor(props){
        super(props)

        this.myRef = React.createRef();
        this.state = {
            none: '',
            id: this.props.id,
            word: this.props.curbase.curwords[this.props.id],
            smallinner: this.props.curbase.curwords[this.props.id],
            inner: this.props.curbase.curwords[this.props.id],
            selected: false,
            confirmed: false,
            style: {
                background: '',
              }
        }
    }

    chst = (imgURL,selected,inner,smallinner,confirmed) => {
        this.setState({style: { backgroundImage: imgURL},selected: selected,inner: inner,smallinner: smallinner,confirmed: confirmed})
    }

    handleclickconf = () => {
        setTimeout(() => {
            var imgURL = ''
            switch (this.props.curbase.key[this.state.id]){
                case 0 : imgURL = `url(${BgKill})` ;break;
                case 1 : (Math.random() < 0.5) ? imgURL = `url(${BgRedM})`  : imgURL = `url(${BgRedW})`;  break;
                case 2 : (Math.random() < 0.5) ? imgURL = `url(${BgBlueM})` : imgURL = `url(${BgBlueW})`; break;
                case 3 : (Math.random() < 0.5) ? imgURL = `url(${BgWhiteM})`: imgURL = `url(${BgWhiteW})`;break;
                default : console.log('ERR')
            }
            this.chst(imgURL,false,'','',true)
        }, 1);
    }

    SweetConfirm = function(){
        return function(b,e,a){
            let c;
            a||(a={
                bg:"rgb(0,0,0,0.1)",
                bgSize:"250% 100%",
                bgPositionIn:"right bottom",
                bgPositionOut:"left bottom",
                trans:{
                    init:!0,
                    in:.5,
                    out:.5,
                },
                gradient:{
                    deg:"130deg",
                    from_color:"rgb(0,0,0,0.1) 50%",
                    to_color:"rgb(0,0,0,0.0) 50%"
                },
                question:"Are you sure?",
                success:{
                    message:"",
                    color:"#00b16a"
                },timeout:1E3
            });
            b.style.background=a.bg;
            b.style.background=`linear-gradient(${a.gradient.deg}, ${a.gradient.from_color}, ${a.gradient.to_color})`;
            b.style.backgroundSize=a.bgSize;
            b.style.backgroundPosition=a.bgPositionIn;
            a.trans.init && (b.style.transition=`all ${a.trans.in} ease`);
  
            b.addEventListener("mousedown",()=>{
                b.style.backgroundPosition=a.bgPositionOut;
                b.style.transition=`all ${a.timeout/1E3}s ease`;
                c=window.setTimeout(()=>{
                    b.disabled=!0;
                    b.style.background=a.success.color;
                    b.style.transition=`all ${a.trans.out} ease`;
                    e()},a.timeout)
            });
  
            b.addEventListener("mouseup",()=>{
                window.clearTimeout(c);
                b.style.backgroundPosition=a.bgPositionIn;
                b.style.transition=`all ${a.trans.out} ease`
            })
        }
    }();

    componentDidMount(){
        this.SweetConfirm(this.myRef.current, () => {
            this.handleclickconf()
        });
    }

    render() {
        return (
            <div className='bgbutton' id='bgbutton'>
                <button className='button' style={this.state.style} id='button' ref={this.myRef}>
                    <div className="smallword">{ this.state.smallinner }</div>
                    <div className="bigword" >{ this.state.inner }</div>
                </button>
            </div>
        );
    }
}

export default Word;