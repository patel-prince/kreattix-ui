import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  AlertDialog,
  Breadcrumb,
  CodeBlock,
  CommandPalette,
  Container,
  DataGrid,
  DatePicker,
  EmptyState,
  Form,
  Input,
  NumberInput,
  Pagination,
  PasswordInput,
  PinInput,
  StatCard,
  Stepper,
  Tag,
  TreeView,
  useFormField,
} from '../index';

function FormEmailField() {
  const field = useFormField('email');
  return (
    <Input
      label="Email"
      value={String(field.value ?? '')}
      onChange={(e) => field.onChange(e.target.value)}
      error={field.error}
    />
  );
}

describe('@kreattix-ui/react Phase 2 (Milestones 7-9)', () => {
  it('renders Layout, Display & Navigation components', () => {
    const onPage = vi.fn();
    render(
      <Container size="lg">
        <CodeBlock code="const x = 1;" language="ts" showLineNumbers />
        <Tag tone="primary" closable>
          v2.0
        </Tag>
        <StatCard label="MRR" value="$42,500" delta="+12%" trend="up" />
        <EmptyState title="No items" description="Create your first project." />
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs' }]} />
        <Pagination page={2} totalPages={5} onPageChange={onPage} />
        <Stepper
          activeStep={1}
          steps={[{ title: 'Account' }, { title: 'Billing' }, { title: 'Launch' }]}
        />
      </Container>
    );

    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('v2.0')).toBeInTheDocument();
    expect(screen.getByText('$42,500')).toBeInTheDocument();
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toHaveAttribute('aria-current', 'page');

    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onPage).toHaveBeenCalledWith(3);
  });

  it('supports AlertDialog, NumberInput, PinInput, PasswordInput, DatePicker, and Form schema validation', () => {
    const onConfirm = vi.fn();
    const onSubmit = vi.fn();
    const schema = {
      safeParse: (data: unknown) => {
        const d = data as { email?: string };
        if (!d.email || !d.email.includes('@')) {
          return {
            success: false as const,
            error: { issues: [{ path: ['email'], message: 'Valid email required' }] },
          };
        }
        return { success: true as const, data: { email: d.email } };
      },
    };

    render(
      <div>
        <AlertDialog
          trigger={<button>Delete Item</button>}
          title="Delete forever?"
          confirmText="Yes, Delete"
          onConfirm={onConfirm}
        />
        <NumberInput label="Seats" defaultValue={2} min={1} max={10} />
        <PinInput label="OTP" length={4} />
        <PasswordInput label="Password" showStrength defaultValue="StrongPass1!" />
        <DatePicker label="Launch Date" />
        <Form initialValues={{ email: 'bad' }} schema={schema} onSubmit={onSubmit}>
          <FormEmailField />
          <button type="submit">Submit Form</button>
        </Form>
      </div>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
    expect(screen.getByLabelText('Seats')).toHaveValue(3);

    expect(screen.getByText('Strong')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Submit Form' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Valid email required');
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Delete Item' }));
    fireEvent.click(screen.getByRole('button', { name: 'Yes, Delete' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('supports DataGrid search, sort, selection, TreeView, and CommandPalette', () => {
    const onCmd = vi.fn();
    const rows = [
      { id: '1', name: 'Alpha', status: 'Active' },
      { id: '2', name: 'Beta', status: 'Paused' },
      { id: '3', name: 'Gamma', status: 'Active' },
    ];

    render(
      <div>
        <DataGrid
          data={rows}
          selectable
          columns={[
            { key: 'name', header: 'Name', sortable: true },
            { key: 'status', header: 'Status' },
          ]}
        />
        <TreeView
          data={[
            {
              id: 'src',
              label: 'src',
              children: [{ id: 'index', label: 'index.ts' }],
            },
          ]}
        />
        <CommandPalette
          open
          enableGlobalShortcut={false}
          commands={[{ id: 'new', label: 'New Project', shortcut: 'N', onSelect: onCmd }]}
        />
      </div>
    );

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search rows...'), {
      target: { value: 'Beta' },
    });
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    fireEvent.click(screen.getByText('src'));
    expect(screen.getByText('index.ts')).toBeInTheDocument();

    fireEvent.click(screen.getByText('New Project'));
    expect(onCmd).toHaveBeenCalledTimes(1);
  });
});
