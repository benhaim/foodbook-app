import React from "react";

import "./imageUpload.css";

const ImageUpload = ({ file, setFile }) => {
  return (
    <div className=''>
      <i
        onClick={() => {
          setFile(null);
        }}
        className='remove-image'
      >
        X
      </i>
      <img
        src={file ? URL.createObjectURL(file) : null}
        className='img-preview'
      />
    </div>
  );
};

export default ImageUpload;
