import { defineMessages } from 'react-intl';

import { Sections } from '../components/collective-page/_constants';

const I18N_SECTIONS = defineMessages({
  // 1. CONTRIBUTE
  [Sections.CONTRIBUTE]: {
    id: 'Contribute',
    defaultMessage: 'Contribute',
  },
  [Sections.CONTRIBUTIONS]: {
    id: 'Contributions',
    defaultMessage: 'Contributions',
  },
  [Sections.RECURRING_CONTRIBUTIONS]: {
    id: 'CollectivePage.SectionRecurringContributions.Title',
    defaultMessage: 'Recurring Contributions',
  },
  [Sections.TICKETS]: {
    id: 'section.tickets.title',
    defaultMessage: 'Tickets',
  },
  // 2. EVENTS/PROJECTS
  [Sections.EVENTS]: {
    id: 'Events',
    defaultMessage: 'Events',
  },
  [Sections.PROJECTS]: {
    id: 'CollectivePage.SectionProjects.Title',
    defaultMessage: 'Projects',
  },
  // 3. BUDGET/TRANSACTIONS
  [Sections.TRANSACTIONS]: {
    id: 'SectionTransactions.Title',
    defaultMessage: 'Transactions',
  },
  [Sections.BUDGET]: {
    id: 'section.budget.title',
    defaultMessage: 'Budget',
  },
  [Sections.USE_EXPENSES]: {
    id: 'section.expenses.title',
    defaultMessage: 'Expenses',
  },
  // expenses? -- change to USE_EXPENSE
  [Sections.GOALS]: {
    id: 'Goals',
    defaultMessage: 'Goals',
  },
  [Sections.CONTRIBUTORS]: {
    id: 'section.contributors.title',
    defaultMessage: 'Contributors',
  },
  [Sections.PARTICIPANTS]: {
    id: 'CollectivePage.NavBar.Participants',
    defaultMessage: 'Participants',
  },
  // 4. CONNECT
  [Sections.CONNECT]: {
    id: 'CollectivePage.SectionConnect.Title',
    defaultMessage: 'Connect',
  },
  [Sections.UPDATES]: {
    id: 'updates',
    defaultMessage: 'Updates',
  },
  [Sections.CONVERSATIONS]: {
    id: 'conversations',
    defaultMessage: 'Conversations',
  },
  // 5. ABOUT
  [Sections.ABOUT]: {
    id: 'collective.about.title',
    defaultMessage: 'About',
  },
  [Sections.TEAM]: {
    id: 'ContributorsFilter.Core',
    defaultMessage: 'Team',
  },
  // Other
  [Sections.LOCATION]: {
    id: 'SectionLocation.Title',
    defaultMessage: 'Location',
  },
});

const i18nCollectivePageSection = (intl, section) => {
  return I18N_SECTIONS[section] ? intl.formatMessage(I18N_SECTIONS[section]) : section;
};

export default i18nCollectivePageSection;
