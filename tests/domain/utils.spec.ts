import { describe, expect, it } from 'vitest';
import { DefaultTake, MaxTake, SortOrder } from '@/domain/utils';

describe('Domain Utils', () => {
  describe('SortOrder enum', () => {
    it('should have ASC value', () => {
      expect(SortOrder.ASC).toBe('asc');
    });

    it('should have DESC value', () => {
      expect(SortOrder.DESC).toBe('desc');
    });
  });

  describe('constants', () => {
    it('should have correct DefaultTake value', () => {
      expect(DefaultTake).toBe(24);
    });

    it('should have correct MaxTake value', () => {
      expect(MaxTake).toBe(100);
    });
  });
});
