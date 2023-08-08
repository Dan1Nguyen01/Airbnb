import React from "react";

const Image = ({ src, ...rest }) => {
  const PF = ".../uploads/";
  src = src && src.includes(`https://`) ? src : `${PF}${src}`;
  return <img {...rest} src={src} alt="" />;
};

export default Image;
