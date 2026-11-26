import React from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Heading,
  HStack,
  Input,
  PasswordInput,
  PinInput,
  Stack,
  Stepper,
  Text,
} from '@kreattix-ui/react';

export function AuthSplitSignIn() {
  return (
    <Grid minChildWidth="260px" gap={6} align="center">
      <Box surface="subtle" radius="lg" p={8}>
        <Stack gap={2}>
          <Heading level={2} size="xl">Welcome back</Heading>
          <Text size="sm" tone="muted">Sign in to manage your Kreattix workspaces and themes.</Text>
        </Stack>
      </Box>
      <Card>
        <Card.Body>
          <Stack gap={4}>
            <Input label="Email" type="email" placeholder="you@company.com" required />
            <PasswordInput label="Password" required />
            <Checkbox label="Remember this device" />
            <Button fullWidth>Sign In</Button>
          </Stack>
        </Card.Body>
      </Card>
    </Grid>
  );
}

export function AuthCenteredSignUp() {
  return (
    <Card style={{ maxWidth: '24rem', marginInline: 'auto' }}>
      <Card.Header><Heading level={3} size="md">Create your account</Heading></Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Input label="Full Name" placeholder="Prince Kumar" required />
          <Input label="Work Email" type="email" required />
          <PasswordInput label="Password" showStrength required />
          <Button fullWidth>Create Account</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function AuthOtpVerification() {
  return (
    <Card style={{ maxWidth: '24rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={4} align="center" style={{ textAlign: 'center' }}>
          <Heading level={3} size="md">Verify your email</Heading>
          <Text size="sm" tone="muted">Enter the 6-digit code sent to your inbox.</Text>
          <PinInput length={6} />
          <Button fullWidth>Verify Code</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function AuthResetPassword() {
  return (
    <Card style={{ maxWidth: '24rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={4}>
          <Heading level={3} size="md">Reset password</Heading>
          <Input label="Account Email" type="email" placeholder="you@company.com" />
          <Button fullWidth>Send Reset Link</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function AuthOnboardingWizard() {
  return (
    <Card>
      <Card.Body>
        <Stack gap={5}>
          <Stepper
            activeStep={1}
            steps={[{ title: 'Profile' }, { title: 'Workspace' }, { title: 'Invite' }]}
          />
          <Input label="Workspace Name" placeholder="acme-design" />
          <HStack justify="flex-end" gap={2}>
            <Button variant="outline">Back</Button>
            <Button>Continue</Button>
          </HStack>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function AuthWorkspaceSetup() {
  return (
    <Card style={{ maxWidth: '28rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={4}>
          <Heading level={3} size="md">Configure Workspace</Heading>
          <Input label="Organization Slug" defaultValue="kreattix-hq" />
          <Button>Launch Console</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function AuthEnterpriseSso() {
  return (
    <Card style={{ maxWidth: '24rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={3}>
          <Heading level={3} size="md">Single Sign-On</Heading>
          <Input label="Company Domain" placeholder="acme.com" />
          <Button fullWidth>Continue with SAML SSO</Button>
          <Divider label="OR" />
          <Button variant="outline" fullWidth>Use Password</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function AuthInviteTeammates() {
  return (
    <Card style={{ maxWidth: '28rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={3}>
          <Heading level={3} size="md">Invite Teammates</Heading>
          <Input label="Email Addresses" placeholder="alex@acme.com, sam@acme.com" />
          <Button>Send Invitations</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
