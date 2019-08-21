import React from 'react';

export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<option key={element} key={Math.random()} name={element} value={element}>{element}</option>)
  })
  return render;
}

export const eternalStorageAddress = "0x3f69452797c779bfd8e6702742929d9b85d508ce";
