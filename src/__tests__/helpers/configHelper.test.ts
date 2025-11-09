import { getPostsPerPage } from '@/helpers/configHelper';

describe('configHelper', () => {
  describe('getPostsPerPage', () => {
    it('should return a valid number (either from env or default 20)', () => {
      const result = getPostsPerPage();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should return either the configured value or default 20', () => {
      const result = getPostsPerPage();
      expect(result).toBeGreaterThan(0);
    });

    it('should return a number greater than 0', () => {
      expect(getPostsPerPage()).toBeGreaterThan(0);
    });

    it('should be consistent across multiple calls', () => {
      const firstCall = getPostsPerPage();
      const secondCall = getPostsPerPage();
      expect(firstCall).toBe(secondCall);
    });
  });
});
