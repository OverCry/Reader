import DirectoryContext from '@MainContext';
import React from 'react';
import { useContext } from 'react';

const DisplayContent = () => {
  const { files } = useContext(DirectoryContext);
  return (
    <div>
      {files?.map((content, i) => {
        return <img alt={content.name} key={i} src={URL.createObjectURL(content)} />;
      })}
    </div>
  );
};

export default DisplayContent;
