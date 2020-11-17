/**
 * Matches opencollective-api/server/lib/allowed-features.ts
 */

import { get } from 'lodash';

import { CollectiveType } from './constants/collectives';

export const FEATURES = {
  RECEIVE_EXPENSES: 'RECEIVE_EXPENSES',
  TRANSFERWISE: 'TRANSFERWISE',
  PAYPAL_DONATIONS: 'PAYPAL_DONATIONS',
  PAYPAL_PAYOUTS: 'PAYPAL_PAYOUTS',
  TWO_FACTOR_AUTH: 'TWO_FACTOR_AUTH',
  REJECT_CONTRIBUTION: 'REJECT_CONTRIBUTION',
  MODERATION: 'MODERATION',
  SUBMIT_EXPENSE_ON_BEHALF: 'SUBMIT_EXPENSE_ON_BEHALF',
  // legacy, will be moved to COLLECTIVE_PAGE_FEATURES
  CONVERSATIONS: 'CONVERSATIONS',
  UPDATES: 'UPDATES',
  COLLECTIVE_GOALS: 'COLLECTIVE_GOALS',
};

export const COLLECTIVE_PAGE_FEATURES = {
  // Collective page main sections (1-5)
  // 1. Contribute
  CONTRIBUTE: 'CONTRIBUTE',
  CONTRIBUTIONS: 'CONTRIBUTIONS', // show contributions the collective has made
  RECURRING_CONTRIBUTIONS: 'RECURRING_CONTRIBUTIONS',
  // 2. Events/Projects - no features/subsections at the moment
  EVENTS: 'EVENTS',
  PROJECTS: 'PROJECTS',
  // 3. Budget/Transactions
  TRANSACTIONS: 'TRANSACTIONS', // for USERS instead of BUDGET
  BUDGET: 'BUDGET',
  USE_EXPENSES: 'USE_EXPENSES',
  COLLECTIVE_GOALS: 'COLLECTIVE_GOALS',
  TOP_FINANCIAL_CONTRIBUTORS: 'TOP_FINANCIAL_CONTRIBUTORS',
  ALL_FINANCIAL_CONTRIBUTORS: 'ALL_FINANCIAL_CONTRIBUTORS',
  // 4. Connect
  CONNECT: 'CONNECT',
  CONVERSATIONS: 'CONVERSATIONS',
  UPDATES: 'UPDATES',
  // 5. About
  ABOUT: 'ABOUT',
  TEAM: 'TEAM',
};

// Please refer to and update https://docs.google.com/spreadsheets/d/15ppKaZJCXBjvY7-AjjCj3w5D-4ebLQdEowynJksgDXE/edit#gid=0
const FeatureAllowedForTypes = {
  // old
  [FEATURES.RECEIVE_EXPENSES]: [
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  // new
  // 1. Contribute
  [COLLECTIVE_PAGE_FEATURES.CONTRIBUTE]: [
    CollectiveType.USER,
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  [COLLECTIVE_PAGE_FEATURES.CONTRIBUTIONS]: [
    CollectiveType.USER,
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.FUND,
  ],
  [COLLECTIVE_PAGE_FEATURES.RECURRING_CONTRIBUTIONS]: [
    CollectiveType.USER,
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.FUND,
  ],
  // 2. Events/Projects
  [COLLECTIVE_PAGE_FEATURES.EVENTS]: [CollectiveType.ORGANIZATION, CollectiveType.COLLECTIVE],
  [COLLECTIVE_PAGE_FEATURES.PROJECTS]: [CollectiveType.FUND],
  // 3. Budget/Transactions
  [COLLECTIVE_PAGE_FEATURES.TRANSACTIONS]: [CollectiveType.USER],
  [COLLECTIVE_PAGE_FEATURES.BUDGET]: [
    CollectiveType.USER,
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  [COLLECTIVE_PAGE_FEATURES.USE_EXPENSES]: [
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  [COLLECTIVE_PAGE_FEATURES.COLLECTIVE_GOALS]: [CollectiveType.COLLECTIVE, CollectiveType.ORGANIZATION],
  [COLLECTIVE_PAGE_FEATURES.TOP_FINANCIAL_CONTRIBUTORS]: [
    CollectiveType.COLLECTIVE,
    CollectiveType.ORGANIZATION,
    CollectiveType.FUND,
  ],
  [COLLECTIVE_PAGE_FEATURES.ALL_FINANCIAL_CONTRIBUTORS]: [
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  // 4. Connect
  [COLLECTIVE_PAGE_FEATURES.CONNECT]: [CollectiveType.ORGANIZATION, CollectiveType.COLLECTIVE],
  [COLLECTIVE_PAGE_FEATURES.CONVERSATIONS]: [CollectiveType.COLLECTIVE, CollectiveType.ORGANIZATION],
  [COLLECTIVE_PAGE_FEATURES.UPDATES]: [CollectiveType.COLLECTIVE, CollectiveType.ORGANIZATION],
  // 5. About
  [COLLECTIVE_PAGE_FEATURES.ABOUT]: [
    CollectiveType.USER,
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  [COLLECTIVE_PAGE_FEATURES.TEAM]: [
    CollectiveType.ORGANIZATION,
    CollectiveType.COLLECTIVE,
    CollectiveType.EVENT,
    CollectiveType.FUND,
    CollectiveType.PROJECT,
  ],
  // Other
  [COLLECTIVE_PAGE_FEATURES.CONTACT_FORM]: [CollectiveType.COLLECTIVE, CollectiveType.EVENT],
};

/**
 * A map of paths to retrieve the value of a feature flag from a collective
 */
export const FEATURE_FLAGS = {
  [FEATURES.CONVERSATIONS]: 'settings.features.conversations',
  [FEATURES.COLLECTIVE_GOALS]: 'settings.collectivePage.showGoals',
  [FEATURES.UPDATES]: 'settings.features.updates',
  [FEATURES.PAYPAL_DONATIONS]: 'settings.features.paypalDonations',
  [FEATURES.PAYPAL_PAYOUTS]: 'settings.features.paypalPayouts',
  [FEATURES.TWO_FACTOR_AUTH]: 'settings.features.twoFactorAuth',
  [FEATURES.REJECT_CONTRIBUTION]: 'settings.features.rejectContribution',
  [FEATURES.MODERATION]: 'settings.features.moderation',
  [FEATURES.SUBMIT_EXPENSE_ON_BEHALF]: 'settings.features.submitExpenseOnBehalf',
};

// TO DO - add helper for settings.collectivePage.sections.find(s => section === FEATURE)

/**
 * Returns true if feature is allowed for this collective type, false otherwise.
 */
export const isFeatureAllowedForCollectiveType = (collectiveType, feature) => {
  const allowedTypes = FeatureAllowedForTypes[feature];
  return allowedTypes ? allowedTypes.includes(collectiveType) : true;
};

/**
 * Check if the given feature is activated for collective.
 */
const hasFeature = (collective, feature) => {
  if (!collective) {
    return false;
  }

  // Allow Host Collectives to receive expenses
  if (feature === FEATURES.RECEIVE_EXPENSES && collective.isHost) {
    return true;
  }

  if (collective.type === CollectiveType.FUND) {
    if (feature === FEATURES.CONVERSATIONS) {
      return false;
    }
  }

  // Check collective type
  if (!isFeatureAllowedForCollectiveType(collective.type, feature)) {
    return false;
  }

  // Check opt-out flags
  if (feature === FEATURES.UPDATES && collective.type === CollectiveType.COLLECTIVE) {
    return Boolean(get(collective, FEATURE_FLAGS[FEATURES.UPDATES], true));
  }

  // Check opt-in flags
  const activationFlag = FEATURE_FLAGS[feature];
  if (activationFlag) {
    return Boolean(get(collective, activationFlag, false));
  }

  return true;
};

export default hasFeature;
