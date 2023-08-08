import React from "react";

const Image = ({ src, ...rest }) => {
  const PF = "https://airbandb-clone.onrender.com/uploads/";
  src = src && src.includes(`https://`) ? src : `${PF}${src}`;
  return <img {...rest} src={src} alt="" />;
};

export default Image;
