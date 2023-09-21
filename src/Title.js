import React from 'react';

function Title({ text }) {
  const titleStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '20px 0',
    color: 'black', // Cambia el color del texto aquí
  };

  return <h1 style={titleStyle}>{text}</h1>;
}

export default Title;
