import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

import { AMINO_ACID_GROUPS } from '../../constants/aminoAcids';

export const Legend: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Цветовая схема аминокислот
      </Typography>
      <Grid container spacing={2}>
        {AMINO_ACID_GROUPS.map(group => (
          <Box
            key={group.description}
            sx={{ width: { xs: '50%', sm: '33%', md: '16.66%' }, p: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: group.color,
                  borderRadius: 1,
                  mr: 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                {group.acids.join(', ')} — {group.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    </Paper>
  );
};
