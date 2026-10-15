import { cleanAll, getLastVideoLink, setLastVideoLink } from '@LocalStorage';
import { Button, Card, CardActions, CardHeader, CardMedia, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const YT_BASE_URL: string = 'https://www.youtube.com/embed/';
const DEFAULT_EMBED: string = 'UEbd9hm7kLM';

const parseVideoId = (url: string): string => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : ''; // Extract and return the part after "v=" up to "&" if it exists
};

const YoutubeComponent = () => {
  const [videoLink, setVideoLink] = useState<string>(YT_BASE_URL + DEFAULT_EMBED);
  const [clearCache, setClearCache] = useState<boolean>(false);

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
    <>
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
      <Button variant='contained' style={{ margin: '10px' }} disabled={!clearCache} onClick={cleanAndReset}>
        Clear Video Cache
      </Button>
    </>
  );
};

export default YoutubeComponent;
