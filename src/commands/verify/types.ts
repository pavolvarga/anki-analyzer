import { AnkiRecord, CardType } from '../../types';
import { OptionLimitRowCount, OptionMeaningSeparator, OptionOmitRowCount, OptionTags } from '../types';

export type VerifyCmdOptions = OptionMeaningSeparator &
  OptionLimitRowCount &
  OptionTags &
  OptionOmitRowCount & {
    operation: VerifyOperation;
    operationArg?: CardType;
  };

export type VerifyOperation =
  | 'verify-tags-used'
  | 'verify-tags-not-used'
  | 'verify-meaning-separator-used'
  | 'verify-meaning-separator-not-used';

export type VerificationResult = {
  outcome: 'success' | 'failure';
  failed?: AnkiRecord[];
  successMsg?: string;
  failureMsg?: string;
};
