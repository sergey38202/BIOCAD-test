import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { ISequenceFormData } from './components/SequenceForm/types';
import { Legend, SequenceForm, SequenceVisualizer } from './components';
import { theme } from './styles';

function App() {
  const [sequences, setSequences] = useState<ISequenceFormData | null>(null);

  const handleFormSubmit = (data: ISequenceFormData) => {
    setSequences(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box component="main" sx={{ minHeight: '100vh' }}>
          <SequenceForm onSubmit={handleFormSubmit} />

          <Legend />

          {sequences && (
            <SequenceVisualizer
              sequence1={sequences.sequence1}
              sequence2={sequences.sequence2}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
