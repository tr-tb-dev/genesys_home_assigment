import { extractDomain, getPageFromUrl } from '@/helpers/urlHelper';

describe('urlHelper', () => {
  describe('extractDomain', () => {
    it('should extract domain from a valid URL', () => {
      expect(extractDomain('https://example.com/path')).toBe('example.com');
    });

    it('should remove www. prefix from domain', () => {
      expect(extractDomain('https://www.example.com/path')).toBe('example.com');
    });

    it('should return empty string for undefined URL', () => {
      expect(extractDomain(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(extractDomain('')).toBe('');
    });

    it('should return empty string for invalid URL', () => {
      expect(extractDomain('not-a-valid-url')).toBe('');
    });

    it('should handle URLs with subdomains', () => {
      expect(extractDomain('https://blog.example.com')).toBe('blog.example.com');
    });

    it('should handle URLs with ports', () => {
      expect(extractDomain('https://example.com:8080/path')).toBe('example.com');
    });
  });

  describe('getPageFromUrl', () => {
    it('should extract page number from URLSearchParams', () => {
      const params = new URLSearchParams('?page=5');
      expect(getPageFromUrl(params)).toBe(5);
    });

    it('should return 1 if page parameter is not present', () => {
      const params = new URLSearchParams('?foo=bar');
      expect(getPageFromUrl(params)).toBe(1);
    });

    it('should return 1 if page parameter is empty', () => {
      const params = new URLSearchParams('?page=');
      expect(getPageFromUrl(params)).toBe(1);
    });

    it('should return 1 if page parameter is not a number', () => {
      const params = new URLSearchParams('?page=abc');
      expect(getPageFromUrl(params)).toBe(1);
    });

    it('should handle page=0 and return 0', () => {
      const params = new URLSearchParams('?page=0');
      expect(getPageFromUrl(params)).toBe(1);
    });

    it('should handle large page numbers', () => {
      const params = new URLSearchParams('?page=999');
      expect(getPageFromUrl(params)).toBe(999);
    });
  });
});
