import { useState,useReducer } from "react";
import classes from "./App.module.css";
const Tile=({showWin,className, buttonSize, clickCD, onSelect=(_)=>_})=>{
    return(
        <button className={className} 
                onClick={onSelect}
                disabled={showWin}
                style={{width: buttonSize, height: buttonSize, backgroundColor: clickCD?'black':'white' }}
        ></button>);
}

let cntWin=0;
function Field({randomFlag,mx, fieldSize}){
   const [showWin, setWin] = useReducer(showWin=>!showWin,false);
   const [dsp,setDsp] = useState({tiles:classes.tilesContainer,score:classes.score});
    const tiles=[];
    
    const n = fieldSize.value;
    let [cnt,setCnt]=useState(0);
    const buttonSize = parseInt(Math.floor(30/n))+'em';

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
        for(let x=0;x<15;++x){
            for(let y=0;y<15;++y){
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
                        score: {cnt}
                        {!randomFlag &&
                            <label className="reset">
                                <input
                                    className="resetButton"
                                    type="submit"
                                    value={"reset"}
                                    onClick={()=>reset()}
                                />
        
                            </label> }
                    </div>
                
                <div className={dsp.tiles}>
                    {tiles}
                </div>
                    {showWin && 
                    <p className="winner">
                        your score is {cntWin}
                    </p>
                    }
            </div>
        </>
    )
};

export default Field;