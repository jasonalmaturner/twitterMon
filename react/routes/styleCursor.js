var colorObj = {
  red: {
    plain: '#CC3034',
    light: '#E2565A',
    dark: '#A6171B'
  },
  turq: {
    plain: '#1D7D79',
    light: '#348B88',
    dark: '#0E6663'
  },
  green: {
    plain: '#91C12D',
    light: '#ABD651',
    dark: '#729D16'
  }
};

var stylesObj = {
  utilButton:{
    background: colorObj.green.plain,
    color: 'white',
    fontSize: '2em',
    border: 'none',
    cursor: 'pointer'
  },
  headerText: {
    color: colorObj.red.plain,
    fontSize: '2em',
  }
};


export { colorObj, stylesObj };
