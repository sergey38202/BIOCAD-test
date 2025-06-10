export interface AminoAcidGroup {
  color: string;
  acids: string[];
  description: string;
}

export const AMINO_ACID_GROUPS: AminoAcidGroup[] = [
  {
    color: '#FFEA00',
    acids: ['C'],
    description: 'Цистеин',
  },
  {
    color: '#67E4A6',
    acids: ['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V', 'P'],
    description: 'Гидрофобные',
  },
  {
    color: '#C4C4C4',
    acids: ['G'],
    description: 'Глицин',
  },
  {
    color: '#FC9CAC',
    acids: ['D', 'E'],
    description: 'Отрицательно заряженные',
  },
  {
    color: '#8B99FF',
    acids: ['K', 'R'],
    description: 'Положительно заряженные',
  },
  {
    color: '#80BFFF',
    acids: ['S', 'T', 'H', 'Q', 'N'],
    description: 'Полярные незаряженные',
  },
];

export const VALID_AMINO_ACIDS = 'ARNDCEQGHILKMFPSTWYV-';

export const getAminoAcidColor = (acid: string): string => {
  const group = AMINO_ACID_GROUPS.find(group => group.acids.includes(acid));

  return group ? group.color : 'transparent';
};
