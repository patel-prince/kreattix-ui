import React, { useRef, useState } from 'react';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface FileUploadProps
  extends FieldControlProps,
    BaseComponentProps<'root' | 'dropzone' | 'list'> {
  accept?: string;
  multiple?: boolean;
  maxSizeBytes?: number;
  onFilesChange?: (files: File[]) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FileUpload(rawProps: FileUploadProps) {
  const { props, isUnstyled, getSlotClass, getSlotStyle } = useComponentConfig(
    'FileUpload',
    rawProps
  );
  const closeGlyph = useInternalGlyph('close');
  const {
    id: idProp,
    label,
    description,
    error: errorProp,
    required,
    accept,
    multiple = false,
    maxSizeBytes,
    onFilesChange,
    className,
    style,
  } = props;

  const { id } = useFieldIds(idProp);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string | undefined>();

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    if (maxSizeBytes) {
      const tooBig = incoming.find((f) => f.size > maxSizeBytes);
      if (tooBig) {
        setSizeError(`${tooBig.name} exceeds max size (${Math.round(maxSizeBytes / 1024)} KB).`);
        return;
      }
    }
    setSizeError(undefined);
    const next = multiple ? [...files, ...incoming] : incoming.slice(0, 1);
    setFiles(next);
    onFilesChange?.(next);
  };

  const removeFile = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    onFilesChange?.(next);
  };

  const dropzone = (
    <div
      data-kx="file-upload"
      data-slot="root"
      data-unstyled={isUnstyled || undefined}
      className={getSlotClass('root', 'kx-upload-root', className)}
      style={getSlotStyle('root', style)}
    >
      <div
        role="button"
        tabIndex={0}
        data-slot="dropzone"
        data-dragging={dragging || undefined}
        className={getSlotClass('dropzone', 'kx-upload-zone')}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>
          Click to upload or drag and drop
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>
          {accept ? `Accepted: ${accept}` : 'Any file format'}
        </span>
      </div>

      {files.length > 0 && (
        <ul data-slot="list" className={getSlotClass('list', 'kx-upload-list')}>
          {files.map((f, idx) => (
            <li key={`${f.name}-${idx}`} className={isUnstyled ? undefined : 'kx-upload-item'}>
              <span>
                {f.name}{' '}
                <span style={{ color: 'var(--kx-text-muted)', fontSize: '0.75rem' }}>
                  ({Math.max(1, Math.round(f.size / 1024))} KB)
                </span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() => removeFile(idx)}
                className="kx-input-clear"
              >
                {closeGlyph}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const error = errorProp ?? sizeError;
  if (!label && !description && !error) return dropzone;
  return (
    <Field htmlFor={id} label={label} description={description} error={error} required={required} unstyled={isUnstyled}>
      {dropzone}
    </Field>
  );
}
