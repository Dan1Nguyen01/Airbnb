import React from "react";

const Image = ({ src, ...rest }) => {
  const PF = "airbnb-flzpg1snd-dan1nguyen01.vercel.app/uploads/";
  src = src && src.includes(`https://`) ? src : `${PF}${src}`;
  return <img {...rest} src={src} alt="" />;
};

export default Image;
