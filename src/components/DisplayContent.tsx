import DirectoryContext from '@MainContext';
import React from 'react';
import { useContext } from 'react';
import style from './DisplayContent.module.css';

const DisplayContent = () => {
  const { files } = useContext(DirectoryContext);

  return (
    <div className={style.content}>
      {files?.map((content, i) => {
        return <img className={style.content} alt={content.name} key={i} src={URL.createObjectURL(content)} />;
      })}
    </div>
  );
};

export default DisplayContent;
