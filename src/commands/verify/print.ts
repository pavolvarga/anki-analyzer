import { createLimitMsg } from '../print';
import { VerificationResult, VerifyCmdOptions } from './types';
import { sliceRecords } from '../common';

export function printResult(result: VerificationResult, options: VerifyCmdOptions): void {
  const { limitRowCount, omitRowCount } = options;

  // success
  if (result.outcome === 'success') {
    console.info(result.successMsg);
    return;
  }

  // failure
  console.info(result.failureMsg);
  const limitMsg = createLimitMsg(options.limitRowCount, result.failed!.length, omitRowCount);
  console.log(`Showing ${limitMsg} failed records:`);
  console.table(sliceRecords(result.failed!, limitRowCount, omitRowCount));
}
