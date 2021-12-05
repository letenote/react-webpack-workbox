import React from 'react';

const Film = () => {
  return(
    <>
      <img 
        alt="example" 
        style={{ width: '100%', height: "100%", objectFit: "cover"}} 
        src={require("./Virtual Reality Console.jpg")}
      />
    </>
  )
}

export default Film;