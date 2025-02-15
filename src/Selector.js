import Select from "react-select";

const levels=[
  {value:3,label:"3x3"},
  {value:4,label:"4x4"},
  {value:5,label:"5x5"},
  {value:6,label:"6x6"},
  {value:7,label:"7x7"},
  {value:8,label:"8x8"},
  {value:9,label:"9x9"},
  {value:10,label:"10x10"},
  {value:11,label:"11x11"},
  {value:12,label:"12x12"},
  {value:13,label:"13x13"},
  {value:14,label:"14x14"},
  {value:15,label:"15x15"},
];

const modes=[
  {value:1,label:"empty"},
  {value:2,label:"random"}, 
];

const formatLabel =({label})=>(
  <div data-name="selector">
    {label}
  </div>

);


const Selector = ({setFieldSize, setMode}) =>{
  const selectStyles = {
    menuList: styles => {
      return {
        ...styles,
        maxHeight: 72
      };
    }
  };

  return(
  <>
  <div className="sizeSelect">
  <Select
    defaultValue=""
    formatLabel={formatLabel}
    options={levels}
    onChange={(size)=>{setFieldSize(size);}}
    styles={selectStyles}
  />
  </div>
  <div className="modeSelect">
  <Select
    defaultValue=""
    formatLabel={formatLabel}
    options={modes}
    onChange={(mode)=>{setMode(mode);
      }}
    />
   </div> 
  </>);
};

export default Selector;