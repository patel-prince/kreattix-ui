'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@kreattix-ui/react';

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard errors in non-HTTPS environments
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {title && (
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--kx-text-muted)',
            marginBottom: '0.35rem',
          }}
        >
          {title}
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <pre className="docs-code-block">
          <code>{code}</code>
        </pre>
        <Button
          size="xs"
          variant="soft"
          tone={copied ? 'success' : 'neutral'}
          leftIcon={copied ? <Check size={12} /> : <Copy size={12} />}
          onClick={handleCopy}
          style={{ position: 'absolute', top: '0.625rem', right: '0.625rem' }}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
