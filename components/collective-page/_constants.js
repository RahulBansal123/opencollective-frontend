/**
 * Shared dimensions between collective page's components
 */
export const Dimensions = {
  PADDING_X: [15, 30],
  MAX_SECTION_WIDTH: 1260,
};

/**
 * Durations for page animations
 */
export const AnimationsDurations = {
  HERO_COLLAPSE: 150,
};

/**
 * A map of unique identifiers for the sections of the page
 */
// export const Sections = {
//   GOALS: 'goals',
//   TICKETS: 'tickets',
//   CONTRIBUTIONS: 'contributions',
//   RECURRING_CONTRIBUTIONS: 'recurring-contributions',
//   CONTRIBUTE: 'contribute',
//   UPDATES: 'updates',
//   PARTICIPANTS: 'participants',
//   LOCATION: 'location',
//   BUDGET: 'budget',
//   CONTRIBUTORS: 'contributors',
//   CONVERSATIONS: 'conversations',
//   TRANSACTIONS: 'transactions',
//   CONNECT: 'connect',
//   ABOUT: 'about',
//   EVENTS: 'events',
//   PROJECTS: 'projects',
// };

export const Sections = {
  // 1. CONTRIBUTE
  CONTRIBUTE: 'contribute',
  CONTRIBUTIONS: 'contributions',
  RECURRING_CONTRIBUTIONS: 'recurring-contributions',
  TICKETS: 'tickets',
  // 2. EVENTS/PROJECTS
  EVENTS: 'events',
  PROJECTS: 'projects',
  // 3. BUDGET/TRANSACTIONS
  TRANSACTIONS: 'transactions',
  BUDGET: 'budget',
  EXPENSES: 'expenses',
  GOALS: 'goals', // COLLECTIVE_GOALS
  PARTICIPANTS: 'participants',
  CONTRIBUTORS: 'contributors', // TOP_FINANCIAL_CONTRIBUTORS and ALL_FINANCIAL_CONTRIBUTORS
  // 4. CONNECT
  CONNECT: 'connect',
  UPDATES: 'updates',
  CONVERSATIONS: 'conversations',
  // 5. ABOUT
  ABOUT: 'about',
  TEAM: 'team',
  // OTHER
  LOCATION: 'location',
};

/** A list of all section names */
export const AllSectionsNames = Object.values(Sections);
