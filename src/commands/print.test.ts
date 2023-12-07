import { createLimitMsg } from './print';

describe('createLimitMsg', () => {
  describe('omit is not defined', () => {
    it('should handle the case when limit is greater than total number of records', () => {
      expect(createLimitMsg(10, 5, undefined)).toEqual('5 of 5');
    });
    it('should handle the case when limit is less than total number of records', () => {
      expect(createLimitMsg(5, 10, undefined)).toEqual('first 5 of 10');
    });
  });
  describe('omit is defined', () => {
    it('should handle the case when limit + omit is greater than total number of records', () => {
      expect(createLimitMsg(5, 10, 5)).toEqual('last 5 of 10');
    });
    it('should handle the case when limit + omit is less than total number of records', () => {
      expect(createLimitMsg(5, 10, 3)).toEqual('5 of 10 [ommited first 3]');
    });
  });
});
