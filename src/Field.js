import { useState,useReducer } from "react";
import classes from "./App.module.css";
const Tile=({showWin,className, buttonSize, clickCD, onSelect=(_)=>_})=>{

    return(
        <button 
                className={className} 
                onClick={onSelect}
                disabled={showWin}
                style={{width: buttonSize, height: buttonSize, background: clickCD?
                    `radial-gradient( farthest-corner at 9vw 7.5vw,
                    rgba(40, 40, 40, 0.726) 2%,
                    rgb(3, 1, 15)45%,
                    rgb(0, 0, 0) 80%,
                    blueviolet 97% ,
                    aqua 98%
                  )`:
                  `radial-gradient(
                    farthest-corner at .1vw .1vw,
                    rgb(255, 255, 255) 54%,
                    rgb(223, 218, 218) 90%,
                    rgb(183, 182, 182) 98%,
                    rgb(128, 128, 128) 100%
                  )` }}
        ><div className={clickCD?"scan-line":""}>
            </div>
            <div className={clickCD?"scan-line1":""}>
            </div>
            <div className={clickCD?"scan-line2":""}>
            </div>
            <div className={clickCD?"scan-line3":""}>
            </div>
             
            
        </button>);
}

let cntWin=0;
function Field({randomFlag,mx, fieldSize}){
   const [showWin, setWin] = useReducer(showWin=>!showWin,false);
   const [dsp,setDsp] = useState({tiles:classes.tilesContainer,score:classes.score});
    const tiles=[];
    
    const n = fieldSize.value;
    let [cnt,setCnt]=useState(0);
    const buttonSize = parseInt(Math.floor(39/n))+'vw';

    const [cd,setCd]=useState(mx);
    
    function reset(){
        setCnt(0);
        for(let x=0;x<n;++x){
            for(let y=0;y<n;++y){
                mx[x][y]=false;
            }
        }
        setCd(mx);
    }


    const checkMx=(mx)=>{
        for(let x=0;x<10;++x){
            for(let y=0;y<10;++y){
                if(mx[x][y]===true) return false;
            }
        }
        setDsp({tiles:classes.tilesContainerDsp,score:classes.scoreDsp});
        setTimeout(function() { setWin(); }, 900);
        setTimeout(function() { setDsp({tiles:classes.tilesContainerDspCmp,score:classes.scoreDspCmp});}, 800);
        setCnt(0);
    }
   
    function flip(i,j,n) {
        setCnt(++cnt);
        cntWin=cnt;
        for(let x=0;x<n;++x){
            for(let y=0;y<n;++y){
                mx[x][y]=cd[x][y];
            }
        }
        let a=[0,0,-1,0,1];
        let b=[0,-1,0,1,0];
        for(let c=0;c<5;++c){
            var t=i+a[c];
            var p=j+b[c];
            if(t>=0 && t<n && p>=0 && p<n){
                if (cd[t][p]) {                
                    mx[t][p]=false;
                }
                else {
                    mx[t][p]=true;
                }
            } 
        }     
        setCd(mx);
        checkMx(mx);
    }
    //if(!showWin){
        for(let i=0;i<n;++i){
            for(let j=0;j<n;++j){
                //let className="\\"+parseInt(i)+parseInt(j);
                tiles.push(<Tile
                            showWin={showWin}
                            className="tile"
                            buttonSize={buttonSize}
                            clickCD={cd[i][j]}
                            onSelect={()=>flip(i,j,n)}
                            />)                        
            }
            tiles.push(<br></br>);
        }
    //}
    return (
        <>
            <div className="field">
                 
                    <div className={dsp.score}>
                        <label className={randomFlag?classes.resetDspCmp:classes.reset}>
                            <button
                                className="resetButton"
                                type="submit"
                                onClick={()=>reset()}
                            >
                                <span>reset</span>
                                <span>reset</span>
                                <span>reset</span>
                                <span>reset</span>
                            </button>
                        </label> 
                        <label className="scoreLabel" data-text={`score: ${cnt}`}>score: {cnt}</label>
                    </div>
                
                <div className={dsp.tiles}>
                    {tiles}
                </div>
                    {showWin && 
                    <p className="winner" data-text={`your score is ${cntWin}`}>
                        your score is {cntWin}
                        <div class="rectangle-8"></div> 
                        <div class="rectangle-9"></div> 
                        <div class="rectangle-10"></div> 
                        <div class="rectangle-11"></div>
                        <div class="rectangle-12"></div>
                        <div class="rectangle-13"></div>
                        <div class="rectangle-14"></div>
                        <div class="rectangle-15"></div> 
                        <div class="rectangle-16"></div>
                        <div class="rectangle-17"></div>
                        <div class="rectangle-18"></div>
                        <div class="rectangle-19"></div> 
                        <div class="rectangle-20"></div>
                        <div class="rectangle-21"></div>
                    </p>
                    }
            </div>
        </>
    )
};
export default Field;