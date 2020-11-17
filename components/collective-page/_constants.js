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
  USE_EXPENSES: 'expenses',
  GOALS: 'goals', // legacy, will turn into COLLECTIVE_GOALS
  COLLECTIVE_GOALS: 'goals', // COLLECTIVE_GOALS
  TOP_FINANCIAL_CONTRIBUTORS: 'top-contributors',
  PARTICIPANTS: 'participants',
  ALL_FINANCIAL_CONTRIBUTORS: 'contributors',
  CONTRIBUTORS: 'contributors', // legacy, will turn into ALL_FINANCIAL_CONTRIBUTORS
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

export const NavbarSections = {
  // 1. CONTRIBUTE
  CONTRIBUTE: 'contribute',
  CONTRIBUTIONS: 'contributions',
  // 2. EVENTS/PROJECTS
  EVENTS: 'events',
  PROJECTS: 'projects',
  // 3. BUDGET/TRANSACTIONS
  BUDGET: 'budget',
  TRANSACTIONS: 'transactions',
  PARTICIPANTS: 'participants',
  // 4. CONNECT
  CONNECT: 'connect',
  // 5. ABOUT
  ABOUT: 'about',
  // OTHER
  LOCATION: 'location',
};

/** A list of all section names */
export const AllSectionsNames = Object.values(Sections);
export const NavbarSectionsNames = Object.values(NavbarSections);
export const NavbarSectionsKeys = Object.keys(NavbarSections);
