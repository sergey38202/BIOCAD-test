export interface ISequenceFormProps {
  onSubmit: (data: ISequenceFormData) => void;
}

export interface ISequenceFormData {
  sequence1: string;
  sequence2: string;
}
