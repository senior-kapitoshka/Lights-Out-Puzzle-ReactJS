import { useReducer, useState } from "react";
import Selector from "./Selector.js";
import Field from "./Field.js";
import classes from "./App.module.css";


let mtrx=[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],];;

let mtrx1=[[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],
[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],];;

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
  for(let x=0;x<15;++x){
    for(let y=0;y<15;++y){
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
        <h1 className="header">Lights out</h1>
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
            You can choose the size of the game field and the filling mode.
          </p>
          <Selector setFieldSize = {setFieldSize} setMode={setMode}/>
        </div>
        <input
            className="startButton"
            type="submit"
            disabled={fieldSize.value===0 || mode.value===0}
            value={"start"}
            onClick={buttStart}
          />
      </div> 
    </div> }
    {showField && <div className={flyField}>
       <label className="restart"> 
        <input
          className="restartButton"
          type="submit"
          value={"re-start"}
          onClick={buttRestart}
        />
        </label>
        <Field randomFlag={mode.value===2?true:false} mx={mode.value===1?mtrx:mtrx1} fieldSize= {fieldSize}/> 
    </div>}   
    </>
  );
}


export default App;
