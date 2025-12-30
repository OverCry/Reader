import { cleanAll, getLastVideoLink, setLastVideoLink } from '@LocalStorage';
import DirectoryContext from '@MainContext';
import { Button, Card, CardActions, CardHeader, CardMedia, Drawer, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const parseVideoId = (url: string): string => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : ''; // Extract and return the part after "v=" up to "&" if it exists
};

const YT_BASE_URL: string = 'https://www.youtube.com/embed/';
const DEFAULT_EMBED: string = 'UEbd9hm7kLM';
const Settings = () => {
  const { openNav, setOpenNav } = useContext(DirectoryContext);
  const [videoLink, setVideoLink] = useState<string>(YT_BASE_URL + DEFAULT_EMBED);
  const [clearCache, setClearCache] = useState<boolean>(false);

  const closeDraw = () => {
    if (setOpenNav) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    const previousLink: string | null = getLastVideoLink();
    if (previousLink !== null) {
      setVideoLink(YT_BASE_URL + previousLink);
      setClearCache(true);
    }
  }, []);

  const cleanAndReset = () => {
    cleanAll();
    setVideoLink(YT_BASE_URL + DEFAULT_EMBED);
    setClearCache(false);
  };

  const updateVideo = (input: string) => {
    const embeded = parseVideoId(input);
    if (embeded !== '') {
      setLastVideoLink(embeded);
      setVideoLink(YT_BASE_URL + embeded);
      setClearCache(true);
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
      {/* <div id='youtube' style={{ padding: '10px', borderRadius: '5px' }}> */}
      <Card id='youtube' sx={{ minWidth: 275 }}>
        <CardHeader title='Player' />
        <CardActions>
          <TextField size='small' fullWidth label='Paste Link' onChange={e => updateVideo(e.target.value)} />
        </CardActions>
        <CardMedia>
          <div style={{ padding: '10px', borderRadius: '5px' }}>
            <iframe id='iframeVid' src={videoLink} allow='autoplay; encrypted-media' allowFullScreen></iframe>
          </div>
        </CardMedia>
      </Card>
      {/* </div> */}

      <Button variant='contained' style={{ margin: '10px' }} disabled={!clearCache} onClick={cleanAndReset}>
        Clear Video Cache
      </Button>
    </Drawer>
  );
};

export default Settings;
