import DirectoryContext from '@MainContext';
import { Button, Drawer } from '@mui/material';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

const ViewMenu = () => {
  const { openView, setOpenView, setFiles } = useContext(DirectoryContext);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (setFiles) {
      setFiles(acceptedFiles as FileWithPath[]);
    }
  }, [acceptedFiles, setFiles]);

  const closeDraw = () => {
    if (setOpenView) {
      setOpenView(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const providedFileList = event.target.files;
    if (providedFileList !== null && setFiles) {
      //reformata for FileWithPath type
      const fileList: File[] = [...providedFileList];
      const providedFormattedList: FileWithPath[] = fileList.map((file: File) => {
        const blob = new Blob([file], { type: file.type });

        // Create a new File instance
        const newFile = new File([blob], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        return newFile;
      });
      setFiles(providedFormattedList as FileWithPath[]);
    }
  };

  return (
    <Drawer
      key={`drawer_viewMenu`}
      {...{
        sx: { zIndex: 3000 },
        variant: 'temporary',
        anchor: 'left',
        ModalProps: { keepMounted: true },
        PaperProps: {},
        open: openView,
        onClose: closeDraw,
      }}
    >
      <div>
        <input
          id='file-upload'
          key='fileAccepter'
          type='file'
          style={{ display: 'none' }} // Hide the default file input
          webkitdirectory={'true'}
          onChange={e => handleFileChange(e)}
        />

        <label htmlFor='file-upload'>
          <Button variant='contained' component='span'>
            Select File
          </Button>
        </label>
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <p>{process.env.REACT_APP_CURRENT_DATE || 'wuzzup'}</p>
    </Drawer>
  );
};

export default ViewMenu;
