import { Typography } from '@mui/material';

type HeadingParams = {
  children: string;
};

export const Heading = ({ children }: HeadingParams) => {
  return (
    <Typography variant='h5' component='h5' color='secondary'>
      <b>{children}</b>
    </Typography>
  );
};

export const SubHeading = ({ children }: HeadingParams) => {
  return (
    <Typography variant='h6' component='h6' color='secondary'>
      <b>{children}</b>
    </Typography>
  );
};

export const Title = ({ children }: HeadingParams) => {
  return (
    <Typography variant='subtitle1' component='h6' color='secondary'>
      {children}
    </Typography>
  );
};

export const Plaintext = ({ children }: HeadingParams) => {
  return (
    <Typography variant='body2' component='p' color='primary'>
      {children}
    </Typography>
  );
};
