import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KreattixProvider } from '@kreattix-ui/theme';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Heading,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from '../index';

describe('@kreattix-ui/react Milestone 3 Core Components', () => {
  it('renders Button with variants, loading state, ThemeProvider defaults, and unstyled mode', () => {
    const onClick = vi.fn();
    render(
      <KreattixProvider
        theme={{
          components: {
            Button: { defaultProps: { size: 'lg' }, slotClasses: { root: 'custom-theme-btn' } },
          },
        }}
      >
        <Button onClick={onClick}>Save</Button>
        <Button loading loadingText="Saving...">
          Save
        </Button>
        <Button unstyled className="tw-btn">
          Raw
        </Button>
      </KreattixProvider>
    );

    const saveBtn = screen.getByRole('button', { name: 'Save' });
    expect(saveBtn).toHaveAttribute('data-size', 'lg');
    expect(saveBtn).toHaveClass('kx-btn', 'custom-theme-btn');
    saveBtn.click();
    expect(onClick).toHaveBeenCalledTimes(1);

    const loadingBtn = screen.getByRole('button', { name: 'Saving...' });
    expect(loadingBtn).toBeDisabled();
    expect(loadingBtn).toHaveAttribute('aria-busy', 'true');

    const rawBtn = screen.getByRole('button', { name: 'Raw' });
    expect(rawBtn).not.toHaveClass('kx-btn');
    expect(rawBtn).toHaveClass('tw-btn');
  });

  it('supports asChild polymorphism on Box and Button', () => {
    render(
      <Box asChild p={4}>
        <section data-testid="box-section">
          <Button asChild>
            <a href="/docs">Go Docs</a>
          </Button>
        </section>
      </Box>
    );

    expect(screen.getByTestId('box-section').tagName).toBe('SECTION');
    const link = screen.getByRole('link', { name: 'Go Docs' });
    expect(link).toHaveClass('kx-btn');
  });

  it('renders Layout, Display, and Icon components cleanly', async () => {
    render(
      <Stack gap={4}>
        <Grid columns={2}>
          <Heading level={1}>Title</Heading>
          <Text tone="muted">Subtitle</Text>
        </Grid>
        <Divider label="OR" />
        <Badge variant="dot" tone="success">
          Active
        </Badge>
        <Avatar name="Prince Kumar" status="online" />
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
        <Skeleton lines={2} />
        <Icon label="Star">★</Icon>
        <IconButton aria-label="Close" icon={<span>×</span>} />
      </Stack>
    );

    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(await screen.findByText('PK')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Star' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
