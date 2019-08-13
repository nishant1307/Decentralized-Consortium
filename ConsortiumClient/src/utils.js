import React from 'react';

export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<option key={element} key={Math.random()} name={element} value={element}>{element}</option>)
  })
  return render;
}

export const eternalStorageAddress = "0xb1b69647f58e728346537b4d8898f2be7897ea79";
