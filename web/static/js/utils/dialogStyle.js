const borderColours = {
  acton: '#749ec4',
  baxter: '#E0BF97',
  clive: '#87CACA',
  darwin: '#B292C5',
  houseman: '#FF7878',
  webb: '#DADA58'
};

const style = (house, width = false) => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '35px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: `4px solid ${borderColours[house]}`,
    width: width ? `${width}px` : 'auto'
  }
});

export default style;
