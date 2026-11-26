import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Accordion,
  Alert,
  Button,
  Checkbox,
  Dialog,
  Drawer,
  DropdownMenu,
  Input,
  Popover,
  Progress,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tabs,
  Textarea,
  ToastProvider,
  Tooltip,
  toast,
} from '../index';

describe('@kreattix-ui/react Milestone 4 Forms & Overlays', () => {
  it('wires Field ARIA attributes automatically for Input, Textarea, Checkbox, and Switch', () => {
    render(
      <div>
        <Input label="Email" description="Work email" error="Invalid email" required />
        <Textarea label="Bio" showCount maxLength={50} defaultValue="Hello" />
        <Checkbox label="Accept terms" defaultChecked />
        <Switch label="Notifications" defaultChecked />
      </div>
    );

    const emailInput = screen.getByLabelText(/Email/);
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');

    expect(screen.getByText('5 / 50')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();
  });

  it('renders RadioGroup, Slider, Select, Alert, and Progress', () => {
    render(
      <div>
        <RadioGroup
          label="Plan"
          defaultValue="pro"
          options={[
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Pro' },
          ]}
        />
        <Slider label="Volume" defaultValue={[40]} showValue />
        <Select
          label="Framework"
          options={[
            { value: 'next', label: 'Next.js' },
            { value: 'vite', label: 'Vite' },
          ]}
        />
        <Alert tone="success" title="Saved" description="All changes synced." />
        <Progress value={65} showValue label="Upload" />
      </div>
    );

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('supports Tabs, Accordion, Dialog, Drawer, Popover, DropdownMenu, Tooltip, and Toast', () => {
    const onToastClick = vi.fn();

    function Demo() {
      return (
        <ToastProvider>
          <Tabs
            items={[
              { value: 't1', label: 'Overview', content: 'Overview Panel' },
              { value: 't2', label: 'API', content: 'API Panel' },
            ]}
          />
          <Accordion
            type="single"
            collapsible
            items={[{ value: 'a1', title: 'FAQ 1', content: 'Answer 1' }]}
          />
          <Dialog trigger={<Button>Open Dialog</Button>} title="Confirm Action">
            Dialog Body
          </Dialog>
          <Drawer trigger={<Button>Open Drawer</Button>} title="Settings">
            Drawer Body
          </Drawer>
          <Popover trigger={<Button>Info</Button>} content="Popover Details" />
          <DropdownMenu
            trigger={<Button>Menu</Button>}
            items={[{ label: 'Profile', onSelect: onToastClick }]}
          />
          <Tooltip content="Helpful tip">
            <Button>Hover me</Button>
          </Tooltip>
          <Button onClick={() => toast({ title: 'Synced!', tone: 'success' })}>
            Trigger Toast
          </Button>
        </ToastProvider>
      );
    }

    render(<Demo />);

    expect(screen.getByText('Overview Panel')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'FAQ 1' }));
    expect(screen.getByText('Answer 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog Body')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Trigger Toast' }));
    expect(screen.getByText('Synced!')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close notification' }));
    expect(screen.queryByText('Synced!')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open Drawer' }));
    expect(screen.getByText('Drawer Body')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(screen.queryByText('Drawer Body')).not.toBeInTheDocument();
  });

  it('supports unstyled escape hatch on form controls', () => {
    render(<Input label="Raw Input" unstyled placeholder="raw" />);
    const input = screen.getByPlaceholderText('raw');
    expect(input).not.toHaveClass('kx-input');
  });
});
