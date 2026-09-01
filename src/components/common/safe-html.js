'use client';

import DOMPurify from 'isomorphic-dompurify';

/**
 * SafeHtml - Renders sanitized HTML strings securely
 * 
 * Strips executable <script>, onerror, onload, and iframe vectors while preserving
 * standard typography, lists, tables, links, and bold/italic markup.
 */
export default function SafeHtml({ html, className = '' }) {
  if (!html) return null;

  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'h1', 'h2', 'h3',
      'h4', 'h5', 'h6', 'span', 'div', 'hr', 'blockquote'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class', 'colspan', 'rowspan']
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
