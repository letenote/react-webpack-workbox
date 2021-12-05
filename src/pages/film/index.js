import React from 'react';
import ImageRender from '../../components/image';

const Film = () => {
  return(
      <ImageRender 
        alt="example alt text" 
        objectFit={'cover'}
        style={{ width: '100%', height: "100%", objectFit: "cover"}} 
        wrapperStyleProps={{ width: 300, height: 200 }}
        // src={require("./Virtual Reality Console.jpg")}
        src={'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80'}
      />
  )
}

export default Film;