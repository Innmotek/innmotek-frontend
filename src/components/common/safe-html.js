'use client';

/**
 * SafeHtml - Renders sanitized HTML strings securely
 * 
 * Strips executable <script>, onerror, onload, and iframe vectors while preserving
 * standard typography, lists, tables, links, and bold/italic markup.
 */
function basicServerSanitize(dirty) {
  if (!dirty || typeof dirty !== 'string') return '';
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*(["'])?[^"'>\s]+\1?/gi, '')
    .replace(/javascript\s*:/gi, '');
}

export default function SafeHtml({ html, className = '' }) {
  if (!html) return null;

  let cleanHtml = '';
  try {
    const DOMPurify = require('isomorphic-dompurify');
    const sanitizer = DOMPurify.default || DOMPurify;
    if (sanitizer && typeof sanitizer.sanitize === 'function') {
      cleanHtml = sanitizer.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
          'table', 'thead', 'tbody', 'tr', 'th', 'td', 'h1', 'h2', 'h3',
          'h4', 'h5', 'h6', 'span', 'div', 'hr', 'blockquote'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class', 'colspan', 'rowspan']
      });
    } else {
      cleanHtml = basicServerSanitize(html);
    }
  } catch (err) {
    cleanHtml = basicServerSanitize(html);
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml || basicServerSanitize(html) }}
    />
  );
}
