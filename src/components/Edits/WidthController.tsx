import { setImageWidth } from '@LocalStorage';
import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, Card, Slider } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

const WidthController = () => {
  const [value, setValue] = useState<number>(80);

  const handleChange = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      setImageWidth(newValue);
    }
  };

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <Box m={2}>
          <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
            <ZoomOut />
            <Slider step={10} marks min={30} max={100} value={value} onChange={(_, value) => handleChange(value)} />
            <ZoomIn />
          </Stack>
        </Box>
      </Card>
    </div>
  );
};

export default WidthController;
