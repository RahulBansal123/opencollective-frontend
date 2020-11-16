import { gql } from '@apollo/client';

/**
 * Fields fetched for updates
 */
export const updatesFieldsFragment = gql`
  fragment UpdatesFields on UpdateType {
    id
    slug
    title
    summary
    createdAt
    publishedAt
    isPrivate
    userCanSeeUpdate
    fromCollective {
      id
      type
      name
      slug
      imageUrl
    }
  }
`;

/**
 * Fields fetched for contributors
 */
export const contributorsFieldsFragment = gql`
  fragment ContributorsFields on Contributor {
    id
    name
    roles
    isAdmin
    isCore
    isBacker
    since
    image
    description
    collectiveSlug
    totalAmountDonated
    type
    publicMessage
    isIncognito
    isGuest
    tiersIds
    collectiveId
  }
`;

/**
 * Fields fetched for all possible features
 */
export const collectiveNavbarFieldsFragment = gql`
  fragment NavbarFields on CollectiveFeatures {
    CONTRIBUTE
    CONTRIBUTIONS
    RECURRING_CONTRIBUTIONS
    EVENTS
    PROJECTS
    BUDGET
    TRANSACTIONS
    USE_EXPENSES
    COLLECTIVE_GOALS
    TOP_FINANCIAL_CONTRIBUTORS
    ALL_FINANCIAL_CONTRIBUTORS
    CONNECT
    CONVERSATIONS
    UPDATES
    ABOUT
    TEAM
  }
`;
