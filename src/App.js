import { useReducer, useState } from "react";
import Selector from "./Selector.js";
import Field from "./Field.js";
import classes from "./App.module.css";


let mtrx=[[false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]];;

let mtrx1=[[false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false],
          [false,false,false,false,false,false,false,false,false,false]];;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomizer(mx,size){
  let x=size*size;
  let n=randomIntFromInterval(1,x);
  let arr=[];
  for(let i=0;i<n;++i){
    let y=randomIntFromInterval(1,x);
    arr.push(y);
  }
  arr=arr.sort();
  let set=[...(new Set(arr))];
  let cnt=0;
  let i=0;
  for(let x=0;x<size;++x){
    for(let y=0;y<size;++y){
      if(cnt===set[i]){
         mx[x][y]=true;
         ++i;
      }
      ++cnt;
    }
  }
}

const App=()=>{
  const [showField, setShow] = useReducer(showField =>!showField,false);
  const [fieldSize, setFieldSize] = useState({value:0});
  const [mode, setMode] = useState({value:0});
  const [flyMenu,setFlyMenu] = useState(classes.startMenuDown);
  const [flyField,setFlyField] = useState(classes.fieldUp);
//////////////
  for(let x=0;x<10;++x){
    for(let y=0;y<10;++y){
        mtrx[x][y]=false;
        mtrx1[x][y]=false;
    }
  }
  if(mode.value===2){
    randomizer(mtrx1,fieldSize.value);
  }
//////////////
  function setStyleMenu() {
    flyMenu===classes.startMenuDown?
    setFlyMenu(classes.startMenuUp):
    setFlyMenu(classes.startMenuDown);
  }
  function setStyleField() {
    flyField===classes.fieldDown?
    setFlyField(classes.fieldUp):
    setFlyField(classes.fieldDown);
  }

  const buttStart=()=>{
    setStyleMenu();
    setTimeout(function() { setShow(); }, 1475);
    setStyleField();
  };

  const buttRestart=()=>{
    setStyleField();
    setTimeout(function() { setShow(); }, 1475);
    setStyleMenu();
    setTimeout(function() {setFieldSize({value:0})}, 1400);
    setTimeout(function() {setMode({value:0});}, 1475);
  };
  return(
    <>
    {!showField && <div className={flyMenu}>
      
      <div className="startMenuContainer">
      <div className="headerContainer">
        <div class="rectangle-1"></div> 
        <div class="rectangle-2"></div> 
        <div class="rectangle-3"></div> 
        <div class="rectangle-4"></div>
        <div class="rectangle-5"></div>
        <div class="rectangle-6"></div>
        <div class="rectangle-7"></div> 
        <h1 className="header" data-text="Lights out">Lights out</h1>
       </div> 
        <p className="info">
          This is very easy game to play. When you click on 
          square in the field, it flips and it flips also left, 
          right, up and down squares. The goal of the puzzle is to switch
          all the lights off, preferably in as few button 
          presses as possible.<br/><br/> More information about game&nbsp;
          <a href="https://en.wikipedia.org/wiki/Lights_Out_(game)">here</a>. Good luck!
        </p>
        <div className="selectors">
          <p className="sugg">
          To start you need to select the size of the playing field and the filling mode.
          </p>
          <Selector setFieldSize = {setFieldSize} setMode={setMode}/>
        </div>
        <button
            className={fieldSize.value===0 || mode.value===0?
              classes.startButtonDisabled:
              classes.startButton
            }
            type="submit"
            disabled={fieldSize.value===0 || mode.value===0}
            onClick={buttStart}
          >
            <span>start</span>
            <span>start</span>
            <span>start</span>
            <span>start</span>
          </button>
      </div> 
    </div> }
    {showField && <div className={flyField}>
       <label className="restart"> 
        <button
          className="restartButton"
          type="submit"
          onClick={buttRestart}>
            <span>restart</span>
            <span>restart</span>
            <span>restart</span>
            <span>restart</span>    
        </button>
        </label>
        <Field randomFlag={mode.value===2?true:false} mx={mode.value===1?mtrx:mtrx1} fieldSize= {fieldSize}/> 
    </div>}   
    </>
  );
}


export default App;
