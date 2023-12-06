import { createLimitMsg } from '../print';
import { VerificationResult, VerifyCmdOptions } from './types';

export function printResult(result: VerificationResult, options: VerifyCmdOptions): void {
  const { limitRowCount } = options;

  // success
  if (result.outcome === 'success') {
    console.info(result.successMsg);
    return;
  }

  // failure
  console.info(result.failureMsg);
  const limitMsg = createLimitMsg(options.limitRowCount, result.failed!.length);
  console.log(`Showing first ${limitMsg} failed records:`);
  console.table(result.failed!.slice(0, limitRowCount));
}
