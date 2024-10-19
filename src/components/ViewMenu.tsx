import DirectoryContext from '@MainContext';
import { Button } from '@mui/material';
import { Drawer } from '@mui/material';
import React, { useContext } from 'react';

const ViewMenu = () => {
  const { openView, setOpenView } = useContext(DirectoryContext);

  const closeDraw = () => {
    if (setOpenView) {
      setOpenView(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('event', event);
    console.log('event.target', event.target.files);
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
    </Drawer>
  );
};

export default ViewMenu;
