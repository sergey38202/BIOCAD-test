import React, { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { getAminoAcidColor } from '../../constants/aminoAcids';
import {
  splitSequenceIntoChunks,
  compareSequences,
} from '../../utils/sequenceUtils';
import { useClipboard } from '../../hooks/useClipboard';
import { Legend } from '../Legend';

import { ISequenceVisualizerProps } from './types';

export const SequenceVisualizer: React.FC<ISequenceVisualizerProps> = props => {
  const { sequence1, sequence2 } = props;

  const [chunks1, setChunks1] = useState<string[]>([]);
  const [chunks2, setChunks2] = useState<string[]>([]);
  const [differences, setDifferences] = useState<boolean[]>([]);
  const { isCopied, copyToClipboard } = useClipboard();
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    const calculateChunkSize = () => {
      const baseSize = 50;
      const width = window.innerWidth;

      if (width < 600) return 10;
      if (width < 960) return 20;

      return baseSize;
    };

    const chunkSize = calculateChunkSize();

    setChunks1(splitSequenceIntoChunks(sequence1, chunkSize));
    setChunks2(splitSequenceIntoChunks(sequence2, chunkSize));
    setDifferences(compareSequences(sequence1, sequence2));

    const handleResize = () => {
      const newChunkSize = calculateChunkSize();

      setChunks1(splitSequenceIntoChunks(sequence1, newChunkSize));
      setChunks2(splitSequenceIntoChunks(sequence2, newChunkSize));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [sequence1, sequence2]);

  const handleTextSelection = () => {
    const selection = window.getSelection();

    if (selection && selection.toString().trim() !== '') {
      const selectedText = selection.toString();

      setSelectedText(selectedText);

      copyToClipboard(selectedText);
    }
  };

  return (
    <Box sx={{ mt: 4, width: '100%', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Выравнивание последовательностей
      </Typography>

      <Legend />

      <Box
        sx={{
          fontFamily: 'monospace',
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: 1.5,
          letterSpacing: '0.05em',
          userSelect: 'text',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        onMouseUp={handleTextSelection}
      >
        {chunks1.map((chunk, chunkIndex) => {
          const startIndex = chunkIndex * chunk.length;
          return (
            <Box key={`chunk1-${chunkIndex}`} sx={{ mb: 0.5 }}>
              {Array.from(chunk).map((acid, i) => {
                const index = startIndex + i;
                return (
                  <Box
                    component="span"
                    key={`acid1-${index}`}
                    sx={{
                      display: 'inline-block',
                      backgroundColor: getAminoAcidColor(acid),
                      padding: '2px 4px',
                      margin: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    {acid}
                  </Box>
                );
              })}
            </Box>
          );
        })}

        {chunks2.map((chunk, chunkIndex) => {
          const startIndex = chunkIndex * chunk.length;
          return (
            <Box key={`chunk2-${chunkIndex}`} sx={{ mb: 2 }}>
              {Array.from(chunk).map((acid, i) => {
                const index = startIndex + i;
                const isDifferent = differences[index];
                return (
                  <Box
                    component="span"
                    key={`acid2-${index}`}
                    sx={{
                      display: 'inline-block',
                      backgroundColor: isDifferent
                        ? getAminoAcidColor(acid)
                        : 'transparent',
                      padding: '2px 4px',
                      margin: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    {acid}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Snackbar
        open={isCopied}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Последовательность "{selectedText}" скопирована в буфер обмена
        </Alert>
      </Snackbar>
    </Box>
  );
};
