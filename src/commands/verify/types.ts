export type VerifyCmdOptions = {
  meaningSeparator: string;
  tags?: string[];
  operation: VerifyOperation;
  operationArg?: 'card1' | 'card2' | 'both';
};

export type VerifyOperation =
  | 'verify-tags-used'
  | 'verify-tags-not-used'
  | 'verify-meaning-separator-used'
  | 'verify-meaning-separator-not-used';
