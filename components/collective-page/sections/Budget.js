import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import memoizeOne from 'memoize-one';
import { FormattedMessage, injectIntl } from 'react-intl';

import hasFeature, { FEATURES } from '../../../lib/allowed-features';
import { getTopContributors } from '../../../lib/collective.lib';
import { CollectiveType } from '../../../lib/constants/collectives';
import { formatCurrency } from '../../../lib/currency-utils';
import { getEnvVar } from '../../../lib/env-utils';
import { GraphQLContext } from '../../../lib/graphql/context';
import { API_V2_CONTEXT, gqlV2 } from '../../../lib/graphql/helpers';
import { parseToBoolean } from '../../../lib/utils';

import { Dimensions } from '../_constants';
import Container from '../../Container';
import * as ContributorsFilter from '../../ContributorsFilter';
import ContributorsGrid, { COLLECTIVE_CARD_MARGIN_X } from '../../ContributorsGrid';
import DefinedTerm, { Terms } from '../../DefinedTerm';
import { Box, Flex } from '../../Grid';
import Link from '../../Link';
import MessageBox from '../../MessageBox';
import StyledButton from '../../StyledButton';
import StyledCard from '../../StyledCard';
import { H3, H4, P, Span } from '../../Text';
import { transactionsQueryCollectionFragment } from '../../transactions/graphql/fragments';
import TransactionsList from '../../transactions/TransactionsList';
import { withUser } from '../../UserProvider';
import ContainerSectionContent from '../ContainerSectionContent';
import SectionHeader from '../SectionHeader';
import TopContributors from '../TopContributors';

import { TopContributorsContainer } from './Contribute';
import SectionGoals from './Goals';

export const budgetSectionQuery = gqlV2/* GraphQL */ `
  query BudgetSection($slug: String!, $limit: Int!) {
    transactions(account: { slug: $slug }, limit: $limit) {
      ...TransactionsQueryCollectionFragment
    }
  }
  ${transactionsQueryCollectionFragment}
`;

export const getBudgetSectionQueryVariables = slug => {
  return { slug, limit: 3 };
};

const getContributorsFilters = memoizeOne((coreContributors, financialContributors) => {
  if (financialContributors.length && coreContributors.length) {
    return ContributorsFilter.FILTERS_LIST;
  } else {
    return [];
  }
});

const filterContributors = memoizeOne((coreContributors, financialContributors, filter) => {
  // Return the proper list
  if (filter === ContributorsFilter.CONTRIBUTOR_FILTERS.CORE) {
    return coreContributors;
  } else if (filter === ContributorsFilter.CONTRIBUTOR_FILTERS.FINANCIAL) {
    return financialContributors;
  } else {
    const coreContributorsIds = new Set(coreContributors.map(c => c.id));
    return [...coreContributors, ...financialContributors.filter(c => !coreContributorsIds.has(c.id))];
  }
});

/**
 * The budget section. Shows the expenses, the latests transactions and some statistics
 * abut the global budget of the collective.
 */
const SectionBudget = ({ collective, stats, financialContributors, LoggedInUser, coreContributors, section }) => {
  const budgetQueryResult = useQuery(budgetSectionQuery, {
    variables: getBudgetSectionQueryVariables(collective.slug),
    context: API_V2_CONTEXT,
  });
  const { data, refetch } = budgetQueryResult;
  const monthlyRecurring =
    (stats.activeRecurringContributions?.monthly || 0) + (stats.activeRecurringContributions?.yearly || 0) / 12;
  const isFund = collective.type === CollectiveType.FUND;
  const isProject = collective.type === CollectiveType.PROJECT;
  const isEvent = collective.type === CollectiveType.EVENT;
  const getTopContributorsMemoized = memoizeOne(getTopContributors);
  const [topOrganizations, topIndividuals] = getTopContributorsMemoized(financialContributors);
  React.useEffect(() => {
    refetch();
  }, [LoggedInUser]);
  // contributors
  const [filter, setFilter] = React.useState(ContributorsFilter.CONTRIBUTOR_FILTERS.ALL);
  const onlyShowCore = collective.type === CollectiveType.ORGANIZATION;
  const activeFilter = onlyShowCore ? ContributorsFilter.CONTRIBUTOR_FILTERS.CORE : filter;
  const filters = getContributorsFilters(coreContributors, financialContributors);
  const contributors = filterContributors(coreContributors, financialContributors, activeFilter);
  const hasFilters = !onlyShowCore && filters.length > 1;

  const renderNewSubsections = () => {
    if (parseToBoolean(getEnvVar('NEW_COLLECTIVE_NAVBAR'))) {
      return (
        <React.Fragment>
          {hasFeature(collective, FEATURES.COLLECTIVE_GOALS) && <SectionGoals collective={collective} />}
          {!isEvent && (topOrganizations.length !== 0 || topIndividuals.length !== 0) && (
            <TopContributorsContainer>
              <Container maxWidth={1090} m="0 auto" px={[15, 30]}>
                <H4 fontWeight="500" color="black.900" mb={3}>
                  <FormattedMessage
                    id="SectionContribute.TopContributors"
                    defaultMessage="Top financial contributors"
                  />
                </H4>
                <TopContributors
                  organizations={topOrganizations}
                  individuals={topIndividuals}
                  currency={collective.currency}
                />
              </Container>
            </TopContributorsContainer>
          )}
          <ContainerSectionContent px={4} py={5} mt={3}>
            {!onlyShowCore ? (
              <React.Fragment>
                <H4 fontWeight="500" color="black.900" mb={3}>
                  <FormattedMessage
                    id="CollectivePage.AllOfUs"
                    defaultMessage="{collectiveName} is all of us"
                    values={{ collectiveName: collective.name }}
                  />
                </H4>
                <H3 mb={3} fontWeight="500" fontSize="20px" color="black.700">
                  <FormattedMessage
                    id="CollectivePage.OurContributors"
                    defaultMessage="Our contributors {count}"
                    values={{
                      count: (
                        <Span color="black.400" fontSize="28px">
                          {stats.backers.all + coreContributors.length}
                        </Span>
                      ),
                    }}
                  />
                </H3>
                <P color="black.600">
                  <FormattedMessage
                    id="CollectivePage.ContributorsDescription"
                    defaultMessage="Everyone who has supported {collectiveName}. Individuals and organizations that believe in –and take ownership of– our purpose."
                    values={{ collectiveName: collective.name }}
                  />
                </P>
              </React.Fragment>
            ) : (
              <H4 fontWeight="500" color="black.900" mb={3}>
                <FormattedMessage id="ContributorsFilter.Core" defaultMessage="Team" />
              </H4>
            )}
          </ContainerSectionContent>
          {hasFilters && (
            <Container maxWidth={Dimensions.MAX_SECTION_WIDTH} margin="0 auto">
              <ContributorsFilter.default
                selected={filter}
                onChange={setFilter}
                filters={filters}
                selectedButtonStyle="primary"
                px={Dimensions.PADDING_X}
              />
            </Container>
          )}
          <ContributorsGrid
            contributors={contributors}
            collectiveId={collective.id}
            currency={collective.currency}
            getPaddingLeft={({ width, rowWidth, nbRows }) => {
              if (width < Dimensions.MAX_SECTION_WIDTH) {
                // No need for padding on screens small enough so they don't have padding
                return 0;
              } else if (nbRows > 1) {
                if (rowWidth <= width) {
                  // If multiline and possible center contributors cards
                  const cardsLeftOffset = COLLECTIVE_CARD_MARGIN_X / 2;
                  return (width - rowWidth) / 2 - cardsLeftOffset;
                } else {
                  // Otherwise if multiline and the grid is full, just use the full screen
                  return 0;
                }
              } else {
                // Otherwise add a normal section padding on the left
                const cardsLeftOffset = COLLECTIVE_CARD_MARGIN_X / 2;
                return (width - Math.max(Dimensions.MAX_SECTION_WIDTH, rowWidth)) / 2 - cardsLeftOffset;
              }
            }}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <ContainerSectionContent pt={[4, 5]} pb={3}>
      <SectionHeader
        section={section}
        subtitle={
          <FormattedMessage
            id="CollectivePage.SectionBudget.Subtitle"
            defaultMessage="Transparent and open finances."
          />
        }
        info={
          <FormattedMessage
            id="CollectivePage.SectionBudget.Description"
            defaultMessage="See how money openly circulates through {collectiveName}. All contributions and all expenses are published in our transparent public ledger. Learn who is donating, how much, where is that money going, submit expenses, get reimbursed and more!"
            values={{ collectiveName: collective.name }}
          />
        }
      />
      <Flex flexDirection={['column-reverse', null, 'row']} justifyContent="space-between" alignItems="flex-start">
        {isEmpty(data?.transactions) && (
          <MessageBox type="info" withIcon maxWidth={800} fontStyle="italic" fontSize="14px">
            <FormattedMessage
              id="SectionBudget.Empty"
              defaultMessage="No transaction or expense created yet. They'll start appearing here as soon as you get your first
                  financial contributors or when someone creates an expense."
            />
          </MessageBox>
        )}

        <Container flex="10" mb={3} width="100%" maxWidth={800}>
          <GraphQLContext.Provider value={budgetQueryResult}>
            <TransactionsList
              collective={collective}
              transactions={data?.transactions?.nodes}
              displayActions
              onMutationSuccess={() => refetch()}
            />
          </GraphQLContext.Provider>
          <Flex flexWrap="wrap" justifyContent="space-between" mt={3}>
            <Box flex="1 1" mx={[0, 2]}>
              <Link route="transactions" params={{ collectiveSlug: collective.slug }}>
                <StyledButton
                  data-cy="view-all-transactions-btn"
                  my={2}
                  minWidth={290}
                  width="100%"
                  buttonSize="small"
                  fontSize="14px"
                >
                  <FormattedMessage id="CollectivePage.SectionBudget.ViewAll" defaultMessage="View all transactions" />
                </StyledButton>
              </Link>
            </Box>
            <Box flex="1 1" mx={[0, 2]}>
              <Link route="expenses" params={{ collectiveSlug: collective.slug }}>
                <StyledButton
                  data-cy="view-all-expenses-btn"
                  my={2}
                  minWidth={290}
                  width="100%"
                  buttonSize="small"
                  fontSize="14px"
                >
                  <FormattedMessage
                    id="CollectivePage.SectionBudget.ViewAllExpenses"
                    defaultMessage="View all expenses"
                  />
                </StyledButton>
              </Link>
            </Box>
          </Flex>
        </Container>

        <Box width="32px" flex="1" />

        <StyledCard
          display="flex"
          flex={[null, null, '1 1 300px']}
          width="100%"
          flexDirection={['column', 'row', 'column']}
          mb={2}
          mx={[null, null, 3]}
        >
          <Box data-cy="budgetSection-today-balance" flex="1" py={16} px={4}>
            <P fontSize="10px" textTransform="uppercase" color="black.700">
              <FormattedMessage id="CollectivePage.SectionBudget.Balance" defaultMessage="Today’s balance" />
            </P>
            <P fontSize="20px" mt={1}>
              {formatCurrency(stats.balance, collective.currency)} <Span color="black.400">{collective.currency}</Span>
            </P>
          </Box>
          {!isFund && !isProject && (
            <Container data-cy="budgetSection-estimated-budget" flex="1" background="#F5F7FA" py={16} px={4}>
              <DefinedTerm
                term={Terms.ESTIMATED_BUDGET}
                fontSize="10px"
                textTransform="uppercase"
                color="black.700"
                extraTooltipContent={
                  <Box mt={2}>
                    <FormattedMessage
                      id="CollectivePage.SectionBudget.MonthlyRecurringAmount"
                      defaultMessage="Monthly recurring: {amount}"
                      values={{ amount: formatCurrency(monthlyRecurring, collective.currency) }}
                    />
                    <br />
                    <FormattedMessage
                      id="CollectivePage.SectionBudget.TotalAmountReceived"
                      defaultMessage="Total received in the last 12 months: {amount}"
                      values={{ amount: formatCurrency(stats?.totalAmountReceived || 0, collective.currency) }}
                    />
                  </Box>
                }
              />
              <P fontSize="20px" mt={2}>
                <Span fontWeight="bold">~ {formatCurrency(stats.yearlyBudget, collective.currency)}</Span>{' '}
                <Span color="black.400">{collective.currency}</Span>
              </P>
            </Container>
          )}
        </StyledCard>
      </Flex>
      {renderNewSubsections()}
    </ContainerSectionContent>
  );
};

SectionBudget.propTypes = {
  /** Collective */
  collective: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    isArchived: PropTypes.bool,
    settings: PropTypes.object,
  }),

  /** Stats */
  stats: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    yearlyBudget: PropTypes.number.isRequired,
    activeRecurringContributions: PropTypes.object,
    totalAmountReceived: PropTypes.number,
  }),

  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(Object.values(CollectiveType)).isRequired,
      isBacker: PropTypes.bool,
      tiersIds: PropTypes.arrayOf(PropTypes.number),
    }),
  ),

  LoggedInUser: PropTypes.object,

  section: PropTypes.string,

  /** @ignore from injectIntl */
  intl: PropTypes.object,
};

export default React.memo(withUser(injectIntl(SectionBudget)));
