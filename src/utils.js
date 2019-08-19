import React from 'react';

export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<option key={element} key={Math.random()} name={element} value={element}>{element}</option>)
  })
  return render;
}

export const eternalStorageAddress = "0xedbea0b0b981d6b328f3cffcdbf9559dd3525359";
