import type React from 'react';
import * as Hero from './hero';
import * as Features from './features';
import * as Pricing from './pricing';
import * as Auth from './auth';
import * as Marketing from './marketing';
import * as AppShells from './appShells';
import * as Dashboards from './dashboards';
import * as Crud from './crud';
import * as Settings from './settings';
import * as Errors from './errors';

export type SectionCategory =
  | 'Hero'
  | 'Features'
  | 'Pricing & Billing'
  | 'Authentication'
  | 'Marketing & Content'
  | 'App Shells'
  | 'Dashboards & Analytics'
  | 'CRUD & Data'
  | 'Settings & Account'
  | 'Errors & Status';

export interface SectionCatalogItem {
  id: string;
  name: string;
  category: SectionCategory;
  description: string;
  Component: React.ComponentType;
  code: string;
}

function entry(
  id: string,
  name: string,
  category: SectionCategory,
  Component: React.ComponentType,
  description: string
): SectionCatalogItem {
  return {
    id,
    name,
    category,
    description,
    Component,
    code: `import { ${name} } from '@kreattix-ui/sections';\n\nexport default function Example() {\n  return <${name} />;\n}`,
  };
}

export const SECTION_CATEGORIES: SectionCategory[] = [
  'Hero',
  'Features',
  'Pricing & Billing',
  'Authentication',
  'Marketing & Content',
  'App Shells',
  'Dashboards & Analytics',
  'CRUD & Data',
  'Settings & Account',
  'Errors & Status',
];

export const SECTIONS_CATALOG: SectionCatalogItem[] = [
  // Hero (8)
  entry('hero-centered', 'HeroCentered', 'Hero', Hero.HeroCentered, 'Centered SaaS hero with badge and dual CTAs.'),
  entry('hero-split', 'HeroSplitPreview', 'Hero', Hero.HeroSplitPreview, 'Split hero with live interactive card preview.'),
  entry('hero-cli', 'HeroDeveloperCli', 'Hero', Hero.HeroDeveloperCli, 'Developer-focused hero with copyable CLI snippet.'),
  entry('hero-waitlist', 'HeroWaitlist', 'Hero', Hero.HeroWaitlist, 'Waitlist email capture hero.'),
  entry('hero-enterprise', 'HeroEnterpriseTrust', 'Hero', Hero.HeroEnterpriseTrust, 'Enterprise trust hero with subtle surface.'),
  entry('hero-gradient', 'HeroGradientMesh', 'Hero', Hero.HeroGradientMesh, 'Primary gradient banner hero.'),
  entry('hero-interactive', 'HeroInteractiveDemo', 'Hero', Hero.HeroInteractiveDemo, 'Interactive counter hero card.'),
  entry('hero-video', 'HeroVideoShowcase', 'Hero', Hero.HeroVideoShowcase, 'Product tour showcase hero.'),

  // Features (8)
  entry('features-3col', 'FeaturesThreeColumn', 'Features', Features.FeaturesThreeColumn, '3-column feature grid cards.'),
  entry('features-bento', 'FeaturesBentoGrid', 'Features', Features.FeaturesBentoGrid, 'Asymmetric bento feature grid.'),
  entry('features-rows', 'FeaturesAlternatingRows', 'Features', Features.FeaturesAlternatingRows, 'Alternating feature spotlight row.'),
  entry('features-tabs', 'FeaturesTabbedShowcase', 'Features', Features.FeaturesTabbedShowcase, 'Tabbed feature walkthrough.'),
  entry('features-compare', 'FeaturesComparisonMatrix', 'Features', Features.FeaturesComparisonMatrix, 'Architecture comparison card.'),
  entry('features-stats', 'FeaturesBenchmarkStats', 'Features', Features.FeaturesBenchmarkStats, 'KPI benchmark stat cards.'),
  entry('features-integrations', 'FeaturesIntegrationHub', 'Features', Features.FeaturesIntegrationHub, 'Ecosystem badge hub.'),
  entry('features-code-ui', 'FeaturesCodeToUiSplit', 'Features', Features.FeaturesCodeToUiSplit, 'Code-to-UI split showcase.'),

  // Pricing (8)
  entry('pricing-3tier', 'PricingThreeTier', 'Pricing & Billing', Pricing.PricingThreeTier, '3-tier SaaS pricing grid.'),
  entry('pricing-toggle', 'PricingToggleBilling', 'Pricing & Billing', Pricing.PricingToggleBilling, 'Monthly/Annual billing toggle card.'),
  entry('pricing-enterprise', 'PricingEnterpriseQuote', 'Pricing & Billing', Pricing.PricingEnterpriseQuote, 'Enterprise custom quote banner.'),
  entry('pricing-table', 'PricingFeatureTable', 'Pricing & Billing', Pricing.PricingFeatureTable, 'Plan feature comparison table.'),
  entry('pricing-calculator', 'PricingUsageCalculator', 'Pricing & Billing', Pricing.PricingUsageCalculator, 'Interactive seat slider calculator.'),
  entry('pricing-addons', 'PricingAddOnModules', 'Pricing & Billing', Pricing.PricingAddOnModules, 'Add-on modules grid.'),
  entry('pricing-upgrade', 'PricingUpgradeBanner', 'Pricing & Billing', Pricing.PricingUpgradeBanner, 'Inline upgrade alert banner.'),
  entry('pricing-invoices', 'PricingInvoiceHistory', 'Pricing & Billing', Pricing.PricingInvoiceHistory, 'Billing invoice history table.'),

  // Auth (8)
  entry('auth-split', 'AuthSplitSignIn', 'Authentication', Auth.AuthSplitSignIn, 'Split-screen sign in.'),
  entry('auth-signup', 'AuthCenteredSignUp', 'Authentication', Auth.AuthCenteredSignUp, 'Centered sign up with password strength.'),
  entry('auth-otp', 'AuthOtpVerification', 'Authentication', Auth.AuthOtpVerification, '6-digit PinInput OTP verification.'),
  entry('auth-reset', 'AuthResetPassword', 'Authentication', Auth.AuthResetPassword, 'Password reset request card.'),
  entry('auth-wizard', 'AuthOnboardingWizard', 'Authentication', Auth.AuthOnboardingWizard, 'Stepper onboarding wizard.'),
  entry('auth-workspace', 'AuthWorkspaceSetup', 'Authentication', Auth.AuthWorkspaceSetup, 'Workspace slug setup card.'),
  entry('auth-sso', 'AuthEnterpriseSso', 'Authentication', Auth.AuthEnterpriseSso, 'SAML SSO login card.'),
  entry('auth-invite', 'AuthInviteTeammates', 'Authentication', Auth.AuthInviteTeammates, 'Team invitation form card.'),

  // Marketing (8)
  entry('mkt-logos', 'MarketingLogoCloud', 'Marketing & Content', Marketing.MarketingLogoCloud, 'Customer logo badge cloud.'),
  entry('mkt-testimonials', 'MarketingTestimonialGrid', 'Marketing & Content', Marketing.MarketingTestimonialGrid, 'Customer testimonial cards.'),
  entry('mkt-case-study', 'MarketingCaseStudy', 'Marketing & Content', Marketing.MarketingCaseStudy, 'Case study spotlight.'),
  entry('mkt-faq', 'MarketingFaqAccordion', 'Marketing & Content', Marketing.MarketingFaqAccordion, 'FAQ accordion block.'),
  entry('mkt-changelog', 'MarketingChangelogTimeline', 'Marketing & Content', Marketing.MarketingChangelogTimeline, 'Release changelog timeline.'),
  entry('mkt-blog', 'MarketingBlogGrid', 'Marketing & Content', Marketing.MarketingBlogGrid, 'Interactive blog article grid.'),
  entry('mkt-newsletter', 'MarketingNewsletterBanner', 'Marketing & Content', Marketing.MarketingNewsletterBanner, 'Newsletter capture banner.'),
  entry('mkt-footer', 'MarketingFooter', 'Marketing & Content', Marketing.MarketingFooter, 'Clean site footer.'),

  // App Shells (8)
  entry('shell-sidebar', 'AppShellSidebar', 'App Shells', AppShells.AppShellSidebar, 'Sidebar navigation shell.'),
  entry('shell-dual-rail', 'AppShellDualRail', 'App Shells', AppShells.AppShellDualRail, 'Dual-rail workspace shell.'),
  entry('shell-command', 'AppShellCommandHeader', 'App Shells', AppShells.AppShellCommandHeader, 'Command-first topbar.'),
  entry('shell-breadcrumb', 'AppShellBreadcrumbHeader', 'App Shells', AppShells.AppShellBreadcrumbHeader, 'Breadcrumb + CTA page header.'),
  entry('shell-org', 'AppShellOrgSwitcher', 'App Shells', AppShells.AppShellOrgSwitcher, 'Org switcher + user menu bar.'),
  entry('shell-notifications', 'AppShellNotificationDrawer', 'App Shells', AppShells.AppShellNotificationDrawer, 'Slide-over notification drawer.'),
  entry('shell-mobile-nav', 'AppShellMobileBottomNav', 'App Shells', AppShells.AppShellMobileBottomNav, 'Mobile bottom navigation bar.'),
  entry('shell-subnav', 'AppShellSettingsSubNav', 'App Shells', AppShells.AppShellSettingsSubNav, 'Tabbed settings sub-navigation.'),

  // Dashboards (10)
  entry('dash-kpi', 'DashboardKpiStrip', 'Dashboards & Analytics', Dashboards.DashboardKpiStrip, '4-card KPI stat strip.'),
  entry('dash-revenue', 'DashboardRevenueOverview', 'Dashboards & Analytics', Dashboards.DashboardRevenueOverview, 'Revenue progress overview.'),
  entry('dash-activity', 'DashboardActivityFeed', 'Dashboards & Analytics', Dashboards.DashboardActivityFeed, 'Audit activity timeline.'),
  entry('dash-health', 'DashboardSystemHealth', 'Dashboards & Analytics', Dashboards.DashboardSystemHealth, 'System uptime health cards.'),
  entry('dash-cohort', 'DashboardCohortTable', 'Dashboards & Analytics', Dashboards.DashboardCohortTable, 'Retention cohort table.'),
  entry('dash-funnel', 'DashboardFunnelCard', 'Dashboards & Analytics', Dashboards.DashboardFunnelCard, 'Conversion funnel progress bars.'),
  entry('dash-goal', 'DashboardGoalTracker', 'Dashboards & Analytics', Dashboards.DashboardGoalTracker, 'Milestone goal tracker.'),
  entry('dash-workload', 'DashboardTeamWorkload', 'Dashboards & Analytics', Dashboards.DashboardTeamWorkload, 'Team workload list.'),
  entry('dash-quota', 'DashboardApiQuota', 'Dashboards & Analytics', Dashboards.DashboardApiQuota, 'API quota usage monitor.'),
  entry('dash-exec', 'DashboardExecutiveSummary', 'Dashboards & Analytics', Dashboards.DashboardExecutiveSummary, 'Executive summary card.'),

  // CRUD (8)
  entry('crud-toolbar', 'CrudToolbar', 'CRUD & Data', Crud.CrudToolbar, 'Search + export + create toolbar.'),
  entry('crud-master-detail', 'CrudMasterDetail', 'CRUD & Data', Crud.CrudMasterDetail, 'Master-detail split inspector.'),
  entry('crud-datagrid', 'CrudDataGridView', 'CRUD & Data', Crud.CrudDataGridView, 'Full DataGrid with sort & select.'),
  entry('crud-empty', 'CrudEmptyView', 'CRUD & Data', Crud.CrudEmptyView, 'Empty state with create CTA.'),
  entry('crud-import', 'CrudImportWizard', 'CRUD & Data', Crud.CrudImportWizard, 'CSV/JSON file upload wizard.'),
  entry('crud-views', 'CrudSavedViewsTabs', 'CRUD & Data', Crud.CrudSavedViewsTabs, 'Saved filter view tabs.'),
  entry('crud-drawer', 'CrudDetailDrawer', 'CRUD & Data', Crud.CrudDetailDrawer, 'Record detail edit drawer.'),
  entry('crud-delete', 'CrudDeleteConfirm', 'CRUD & Data', Crud.CrudDeleteConfirm, 'Destructive AlertDialog confirm.'),

  // Settings (8)
  entry('set-profile', 'SettingsProfile', 'Settings & Account', Settings.SettingsProfile, 'User profile & avatar settings.'),
  entry('set-appearance', 'SettingsAppearance', 'Settings & Account', Settings.SettingsAppearance, 'Density & accent ColorPicker.'),
  entry('set-2fa', 'SettingsSecurity2fa', 'Settings & Account', Settings.SettingsSecurity2fa, '2FA security toggle card.'),
  entry('set-apikeys', 'SettingsApiKeys', 'Settings & Account', Settings.SettingsApiKeys, 'API keys table.'),
  entry('set-webhooks', 'SettingsWebhooks', 'Settings & Account', Settings.SettingsWebhooks, 'Webhook endpoint config.'),
  entry('set-rbac', 'SettingsRbacMatrix', 'Settings & Account', Settings.SettingsRbacMatrix, 'RBAC permissions matrix.'),
  entry('set-notif', 'SettingsNotifications', 'Settings & Account', Settings.SettingsNotifications, 'Notification switches.'),
  entry('set-danger', 'SettingsDangerZone', 'Settings & Account', Settings.SettingsDangerZone, 'Danger zone alert.'),

  // Errors & Status (8)
  entry('err-404', 'Error404Page', 'Errors & Status', Errors.Error404Page, '404 Not Found view.'),
  entry('err-500', 'Error500Page', 'Errors & Status', Errors.Error500Page, '500 Server Error view.'),
  entry('err-maint', 'ErrorMaintenancePage', 'Errors & Status', Errors.ErrorMaintenancePage, 'Scheduled maintenance notice.'),
  entry('err-403', 'Error403Forbidden', 'Errors & Status', Errors.Error403Forbidden, '403 Permission Denied view.'),
  entry('err-receipt', 'StatusPaymentReceipt', 'Errors & Status', Errors.StatusPaymentReceipt, 'Payment confirmation card.'),
  entry('err-offline', 'StatusOfflineBanner', 'Errors & Status', Errors.StatusOfflineBanner, 'Offline reconnecting banner.'),
  entry('err-success', 'StatusOnboardingSuccess', 'Errors & Status', Errors.StatusOnboardingSuccess, 'Workspace ready success card.'),
  entry('err-session', 'StatusSessionExpired', 'Errors & Status', Errors.StatusSessionExpired, 'Session expired alert.'),
];
