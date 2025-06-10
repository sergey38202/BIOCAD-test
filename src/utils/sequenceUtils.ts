/**
 * Validates if a string contains only valid amino acid characters
 * @param sequence - The amino acid sequence to validate
 * @returns boolean indicating if the sequence is valid
 */
export const isValidAminoAcidSequence = (sequence: string): boolean => {
  const validChars = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;
  return validChars.test(sequence);
};

/**
 * Splits a sequence into chunks for better visualization
 * @param sequence - The amino acid sequence to split
 * @param chunkSize - The size of each chunk
 * @returns Array of sequence chunks
 */
export const splitSequenceIntoChunks = (
  sequence: string,
  chunkSize: number = 50
): string[] => {
  const chunks: string[] = [];
  for (let i = 0; i < sequence.length; i += chunkSize) {
    chunks.push(sequence.substring(i, i + chunkSize));
  }
  return chunks;
};

/**
 * Compares two amino acid sequences and returns an array of booleans
 * indicating whether each position is different
 * @param seq1 - First amino acid sequence
 * @param seq2 - Second amino acid sequence
 * @returns Array of booleans where true indicates a difference at that position
 */
export const compareSequences = (seq1: string, seq2: string): boolean[] => {
  if (seq1.length !== seq2.length) {
    throw new Error('Sequences must be of the same length');
  }

  return Array.from({ length: seq1.length }, (_, i) => seq1[i] !== seq2[i]);
};
