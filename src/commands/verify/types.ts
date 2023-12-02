export type VerifyCmdOptions = {
  meaningSeparator: string;
  tags?: string[];
  operation: VerifyOperation;
  operationArg?: string;
};

export type VerifyOperation =
  | 'verify-tags-used'
  | 'verify-meaning-separator-used'
  | 'verify-meaning-separator-not-used';
