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
        maxHeight: 72,
        color: 'black',
        background:`radial-gradient(
          farthest-corner at .1vw .1vw,
          rgb(255, 255, 255) 54%,
          rgb(223, 218, 218) 90%,
          rgb(183, 182, 182) 98%,
          rgb(128, 128, 128) 100%
        )`,
        borderColor:"hotpink",
      };
    },
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'black' : 'inherit',
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isSelected?'black':'black',
    })
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
      styles={selectStyles}
    />
   </div> 
  </>);
};

export default Selector;