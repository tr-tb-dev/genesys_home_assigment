import { formatRelativeTime } from '@/helpers/timeHelper';
import { IntlShape } from 'react-intl';
import { Time } from '@/enums/date';
import { vi } from 'vitest';

describe('timeHelper', () => {
  describe('formatRelativeTime', () => {
    let mockIntl: IntlShape;

    beforeEach(() => {
      mockIntl = {
        formatMessage: vi.fn((descriptor, values) => {
          if (descriptor.id === 'time.justNow') return 'just now';
          if (descriptor.id === 'time.minutesAgo') return `${values?.minutes} minutes ago`;
          if (descriptor.id === 'time.hoursAgo') return `${values?.hours} hours ago`;
          if (descriptor.id === 'time.daysAgo') return `${values?.days} days ago`;
          return '';
        }),
      } as unknown as IntlShape;
    });

    it('should return empty string for undefined timestamp', () => {
      expect(formatRelativeTime(undefined, mockIntl)).toBe('');
    });

    it('should return "just now" for recent timestamps (< 1 minute)', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const result = formatRelativeTime(now - 30, mockIntl);
      expect(result).toBe('just now');
    });

    it('should return minutes ago for timestamps < 60 minutes', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const fiveMinutesAgo = now - (5 * Time.ONE_MINUTE) / Time.ONE_SECOND;
      const result = formatRelativeTime(fiveMinutesAgo, mockIntl);
      expect(result).toBe('5 minutes ago');
    });

    it('should return hours ago for timestamps < 24 hours', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const threeHoursAgo = now - (3 * Time.ONE_HOUR) / Time.ONE_SECOND;
      const result = formatRelativeTime(threeHoursAgo, mockIntl);
      expect(result).toBe('3 hours ago');
    });

    it('should return days ago for timestamps >= 24 hours', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const twoDaysAgo = now - (2 * Time.ONE_DAY) / Time.ONE_SECOND;
      const result = formatRelativeTime(twoDaysAgo, mockIntl);
      expect(result).toBe('2 days ago');
    });

    it('should handle exactly 1 minute ago', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const oneMinuteAgo = now - Time.ONE_MINUTE / Time.ONE_SECOND;
      const result = formatRelativeTime(oneMinuteAgo, mockIntl);
      expect(result).toBe('1 minutes ago');
    });

    it('should handle exactly 1 hour ago', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const oneHourAgo = now - Time.ONE_HOUR / Time.ONE_SECOND;
      const result = formatRelativeTime(oneHourAgo, mockIntl);
      expect(result).toBe('1 hours ago');
    });

    it('should handle exactly 1 day ago', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const oneDayAgo = now - Time.ONE_DAY / Time.ONE_SECOND;
      const result = formatRelativeTime(oneDayAgo, mockIntl);
      expect(result).toBe('1 days ago');
    });

    it('should call intl.formatMessage with correct parameters', () => {
      const now = Math.floor(Date.now() / Time.ONE_SECOND);
      const tenMinutesAgo = now - (10 * Time.ONE_MINUTE) / Time.ONE_SECOND;
      formatRelativeTime(tenMinutesAgo, mockIntl);
      expect(mockIntl.formatMessage).toHaveBeenCalledWith(
        { id: 'time.minutesAgo' },
        { minutes: 10 }
      );
    });
  });
});
