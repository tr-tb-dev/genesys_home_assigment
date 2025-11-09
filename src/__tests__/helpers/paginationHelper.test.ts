import { calculateStartRank, paginateArray } from '@/helpers/paginationHelper';

describe('paginationHelper', () => {
  describe('calculateStartRank', () => {
    it('should calculate correct start rank for page 1', () => {
      expect(calculateStartRank(1, 10)).toBe(1);
    });

    it('should calculate correct start rank for page 2', () => {
      expect(calculateStartRank(2, 10)).toBe(11);
    });

    it('should calculate correct start rank for page 5 with 20 items per page', () => {
      expect(calculateStartRank(5, 20)).toBe(81);
    });

    it('should handle page 1 with different items per page', () => {
      expect(calculateStartRank(1, 5)).toBe(1);
      expect(calculateStartRank(1, 25)).toBe(1);
    });

    it('should handle page 10 with 30 items per page', () => {
      expect(calculateStartRank(10, 30)).toBe(271);
    });
  });

  describe('paginateArray', () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('should return correct first page items', () => {
      const result = paginateArray(testArray, 1, 3);
      expect(result.paginatedItems).toEqual([1, 2, 3]);
      expect(result.totalPages).toBe(4);
      expect(result.startIndex).toBe(0);
      expect(result.endIndex).toBe(3);
    });

    it('should return correct second page items', () => {
      const result = paginateArray(testArray, 2, 3);
      expect(result.paginatedItems).toEqual([4, 5, 6]);
      expect(result.totalPages).toBe(4);
      expect(result.startIndex).toBe(3);
      expect(result.endIndex).toBe(6);
    });

    it('should return correct last page items', () => {
      const result = paginateArray(testArray, 4, 3);
      expect(result.paginatedItems).toEqual([10]);
      expect(result.totalPages).toBe(4);
      expect(result.startIndex).toBe(9);
      expect(result.endIndex).toBe(12);
    });

    it('should handle empty array', () => {
      const result = paginateArray([], 1, 10);
      expect(result.paginatedItems).toEqual([]);
      expect(result.totalPages).toBe(0);
      expect(result.startIndex).toBe(0);
      expect(result.endIndex).toBe(10);
    });

    it('should handle array with exact page size', () => {
      const result = paginateArray([1, 2, 3, 4, 5], 1, 5);
      expect(result.paginatedItems).toEqual([1, 2, 3, 4, 5]);
      expect(result.totalPages).toBe(1);
    });

    it('should handle page beyond total pages', () => {
      const result = paginateArray(testArray, 10, 3);
      expect(result.paginatedItems).toEqual([]);
      expect(result.totalPages).toBe(4);
    });

    it('should work with different data types', () => {
      const stringArray = ['a', 'b', 'c', 'd', 'e'];
      const result = paginateArray(stringArray, 2, 2);
      expect(result.paginatedItems).toEqual(['c', 'd']);
      expect(result.totalPages).toBe(3);
    });
  });
});
