import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormHelperText,
} from '@mui/material';

import { schema } from './validator';
import { SEQUENCE_FORM_DEFAULT_VALUES } from './constants';
import { ISequenceFormProps, ISequenceFormData } from './types';

export const SequenceForm: React.FC<ISequenceFormProps> = props => {
  const { onSubmit } = props;

  const [lengthError, setLengthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISequenceFormData>({
    resolver: yupResolver(schema),
    defaultValues: SEQUENCE_FORM_DEFAULT_VALUES,
  });

  const sequence1 = watch('sequence1');
  const sequence2 = watch('sequence2');

  const onFormSubmit = (data: ISequenceFormData) => {
    if (data.sequence1.length !== data.sequence2.length) {
      setLengthError('Длины последовательностей должны быть одинаковыми');

      return;
    }

    setLengthError(null);

    onSubmit(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Инструмент для визуализации выравнивания аминокислотных
        последовательностей
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Введите две аминокислотные последовательности одинаковой длины,
        содержащие только допустимые символы: A, R, N, D, C, E, Q, G, H, I, L,
        K, M, F, P, S, T, W, Y, V и символ -.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Controller
          name="sequence1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Первая последовательность"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.sequence1}
              helperText={errors.sequence1?.message}
              placeholder="Например: VLSPADKTNIKASWEKIGSHG"
              inputProps={{ style: { fontFamily: 'monospace' } }}
            />
          )}
        />

        <Controller
          name="sequence2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Вторая последовательность"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.sequence2}
              helperText={errors.sequence2?.message}
              placeholder="Например: VLSPADKTNIKASWEKIGSHG"
              inputProps={{ style: { fontFamily: 'monospace' } }}
            />
          )}
        />

        {lengthError && (
          <FormHelperText error sx={{ mt: 1, fontSize: '0.9rem' }}>
            {lengthError}
          </FormHelperText>
        )}

        {sequence1 && sequence2 && sequence1.length !== sequence2.length && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Длина первой последовательности: {sequence1.length}, длина второй
            последовательности: {sequence2.length}. Длины должны совпадать.
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Визуализировать
        </Button>
      </Box>
    </Paper>
  );
};
