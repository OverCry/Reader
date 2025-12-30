import DirectoryContext from '@MainContext';
import { Box, Button, Drawer } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import style from './ViewMenu.module.css';

const ViewMenu = () => {
  const { openView, setOpenView, setFiles } = useContext(DirectoryContext);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (setFiles) {
      const readable = acceptedFiles as FileWithPath[];
      if (readable.length > 0) {
        setFiles(readable);
        closeDraw();
      }
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
      console.log('WAHA providedFormattedList', providedFormattedList);
      setFiles(providedFormattedList as FileWithPath[]);
      closeDraw();
    }
  };

  const resetImages = () => {
    if (setFiles !== undefined) setFiles([]);
  };

  return (
    <Drawer
      key={`drawer_viewMenu`}
      {...{
        sx: { zIndex: 3000 },
        variant: 'temporary',
        anchor: 'left',
        ModalProps: { keepMounted: true },
        // PaperProps: {},
        open: openView,
        onClose: closeDraw,
      }}
    >
      <input
        id='file-upload'
        key='fileAccepter'
        type='file'
        style={{ display: 'none' }} // Hide the default file input
        webkitdirectory={'true'}
        onChange={e => handleFileChange(e)}
      />
      <label htmlFor='file-upload'>
        <Box m={1}>
          <Button className={style.button} fullWidth variant='contained' component='span'>
            Select Folder
          </Button>
        </Box>
      </label>

      <div {...getRootProps({ className: 'dropzone' })} className={style.dropzone}>
        <input {...getInputProps()} />
        Drag and drop, or click to select files
      </div>
      <Box m={1}>
        <Button className={style.button} fullWidth variant='contained' component='span' onClick={resetImages}>
          Clear Cache
        </Button>
      </Box>
    </Drawer>
  );
};

export default ViewMenu;
