import React, { forwardRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseComponentProps<'root' | 'header' | 'pre' | 'copy'> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  rawProps,
  ref
) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'CodeBlock',
    rawProps
  );
  const checkGlyph = useInternalGlyph('check');
  const [copied, setCopied] = useState(false);

  const {
    code,
    language,
    showLineNumbers = false,
    copyable = true,
    className,
    style,
    unstyled: _u,
    classNames: _cn,
    styles: _st,
    ...rest
  } = props;

  const lines = code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={ref}
      data-kx="code-block"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-code-block', className)}
      style={getSlotStyle('root', style)}
      {...rest}
    >
      {(language || copyable) && (
        <div
          data-slot="header"
          className={getSlotClass('header', 'kx-code-block-header')}
          style={getSlotStyle('header')}
        >
          <span>{language ?? 'code'}</span>
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              data-slot="copy"
              className={getSlotClass('copy', 'kx-code-block-copy')}
            >
              {copied ? (
                <>
                  {checkGlyph} Copied
                </>
              ) : (
                'Copy'
              )}
            </button>
          )}
        </div>
      )}
      <pre data-slot="pre" className={getSlotClass('pre', 'kx-code-block-pre')}>
        <code>
          {showLineNumbers
            ? lines.map((line, i) => (
                <div key={i} className={isUnstyled ? undefined : 'kx-code-line'}>
                  <span className={isUnstyled ? undefined : 'kx-code-ln'}>{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
});
