import * as yup from 'yup';
import { VALID_AMINO_ACIDS } from '../../constants/aminoAcids';

export const schema = yup.object().shape({
  sequence1: yup
    .string()
    .required('Первая последовательность обязательна')
    .matches(
      new RegExp(`^[${VALID_AMINO_ACIDS}]+$`, 'i'),
      'Последовательность может содержать только латинские буквы аминокислот и символ -'
    ),
  sequence2: yup
    .string()
    .required('Вторая последовательность обязательна')
    .matches(
      new RegExp(`^[${VALID_AMINO_ACIDS}]+$`, 'i'),
      'Последовательность может содержать только латинские буквы аминокислот и символ -'
    ),
});
