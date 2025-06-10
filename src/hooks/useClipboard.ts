import { useState, useCallback, useEffect } from 'react';

interface UseClipboardOptions {
  timeout?: number;
}

/**
 * Custom hook for handling clipboard operations with feedback
 */
export const useClipboard = (options: UseClipboardOptions = {}) => {
  const { timeout = 1000 } = options;
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available');

      return false;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });

    return true;
  }, []);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isCopied, timeout]);

  return { isCopied, copyToClipboard };
};
