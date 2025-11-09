import { getErrorMessage } from '@/helpers/errorHelper';

describe('errorHelper', () => {
  describe('getErrorMessage', () => {
    it('should return error message from Error instance', () => {
      const error = new Error('Something went wrong');
      expect(getErrorMessage(error)).toBe('Something went wrong');
    });

    it('should return default message for non-Error objects', () => {
      expect(getErrorMessage('string error')).toBe('An error occurred');
    });

    it('should return custom default message when provided', () => {
      expect(getErrorMessage('string error', 'Custom error')).toBe('Custom error');
    });

    it('should return default message for null', () => {
      expect(getErrorMessage(null)).toBe('An error occurred');
    });

    it('should return default message for undefined', () => {
      expect(getErrorMessage(undefined)).toBe('An error occurred');
    });

    it('should return default message for numbers', () => {
      expect(getErrorMessage(404, 'Not found')).toBe('Not found');
    });

    it('should return default message for objects', () => {
      expect(getErrorMessage({ code: 500 })).toBe('An error occurred');
    });

    it('should handle Error with empty message', () => {
      const error = new Error('');
      expect(getErrorMessage(error)).toBe('');
    });

    it('should handle custom Error subclasses', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      const error = new CustomError('Custom error occurred');
      expect(getErrorMessage(error)).toBe('Custom error occurred');
    });
  });
});
