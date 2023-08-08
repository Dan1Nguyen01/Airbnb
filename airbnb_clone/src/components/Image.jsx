import React from "react";

const Image = ({ src, ...rest }) => {
  const PF = "https://airbandb-clone.onrender.com/uploads/";
  // const PF = "http://localhost:8888/uploads/";
  src = src && src.includes(`https://`) ? src : `${PF}${src}`;
  return <img {...rest} src={src} alt="" />;
};

export default Image;
