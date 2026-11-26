import React, { createContext, useCallback, useContext, useState } from 'react';

export type FormValues = Record<string, unknown>;
export type FormErrors = Record<string, string | undefined>;

export interface SchemaLike<T extends FormValues = FormValues> {
  safeParse: (data: unknown) =>
    | { success: true; data: T }
    | {
        success: false;
        error: { issues: { path: (string | number)[]; message: string }[] };
      };
}

interface FormContextValue {
  values: FormValues;
  errors: FormErrors;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldError: (name: string, error?: string) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  return useContext(FormContext);
}

export function useFormField(name: string) {
  const ctx = useFormContext();
  return {
    value: ctx?.values[name],
    error: ctx?.errors[name],
    onChange: (val: unknown) => ctx?.setFieldValue(name, val),
  };
}

export interface FormProps<T extends FormValues = FormValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues?: T;
  schema?: SchemaLike<T>;
  validate?: (values: T) => FormErrors;
  onSubmit?: (values: T) => void | Promise<void>;
}

export function Form<T extends FormValues = FormValues>({
  initialValues = {} as T,
  schema,
  validate,
  onSubmit,
  children,
  ...rest
}: FormProps<T>) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const setFieldValue = useCallback((name: string, val: unknown) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const setFieldError = useCallback((name: string, err?: string) => {
    setErrors((prev) => ({ ...prev, [name]: err }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nextErrors: FormErrors = {};
    let parsedValues = values as T;

    if (schema) {
      const res = schema.safeParse(values);
      if (!res.success) {
        for (const issue of res.error.issues) {
          const key = String(issue.path[0] ?? '_form');
          if (!nextErrors[key]) nextErrors[key] = issue.message;
        }
      } else {
        parsedValues = res.data;
      }
    }

    if (validate) {
      nextErrors = { ...nextErrors, ...validate(parsedValues) };
    }

    const hasErrors = Object.values(nextErrors).some(Boolean);
    setErrors(nextErrors);
    if (!hasErrors) {
      await onSubmit?.(parsedValues);
    }
  };

  return (
    <FormContext.Provider value={{ values, errors, setFieldValue, setFieldError }}>
      <form data-kx="form" onSubmit={handleSubmit} noValidate {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
