import DirectoryContext from '@MainContext';
import { Drawer } from '@mui/material';
import { useContext } from 'react';
import YoutubeComponent from './YoutubeComponent';

const Settings = () => {
  const { openNav, setOpenNav } = useContext(DirectoryContext);

  const closeDraw = () => {
    if (setOpenNav) {
      setOpenNav(false);
    }
  };

  return (
    <Drawer
      key={`drawer_settings`}
      {...{
        sx: { zIndex: 3000 },
        variant: 'temporary',
        anchor: 'right',
        ModalProps: { keepMounted: true },
        PaperProps: {},
        open: openNav,
        onClose: closeDraw,
      }}
    >
      <YoutubeComponent />
      {/* <Card id='youtube' sx={{ minWidth: 275 }}>
        <CardHeader title='Player' />
        <CardActions>
          <TextField size='small' fullWidth label='Paste Link' onChange={e => updateVideo(e.target.value)} />
        </CardActions>
        <CardMedia>
          <div style={{ padding: '10px', borderRadius: '5px' }}>
            <iframe id='iframeVid' src={videoLink} allow='autoplay; encrypted-media' allowFullScreen></iframe>
          </div>
        </CardMedia>
      </Card> */}
      {/* </div> */}
    </Drawer>
  );
};

export default Settings;
