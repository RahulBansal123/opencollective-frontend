import React from 'react';
import PropTypes from 'prop-types';
import { Info } from '@styled-icons/feather/Info';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import { NAVBAR_CATEGORIES } from '../../lib/collective-sections';
import i18nNavbarCategory from '../../lib/i18n/navbar-categories';

import Container from '../Container';
import { Flex } from '../Grid';
import StyledHr from '../StyledHr';
import StyledTooltip from '../StyledTooltip';
import { P } from '../Text';

import { Dimensions } from './_constants';
import SectionTitle from './SectionTitle';

import aboutSectionHeaderIcon from '../../public/static/images/collective-navigation/CollectiveSectionHeaderIconAbout.png';
import budgetSectionHeaderIcon from '../../public/static/images/collective-navigation/CollectiveSectionHeaderIconBudget.png';
import connectSectionHeaderIcon from '../../public/static/images/collective-navigation/CollectiveSectionHeaderIconConnect.png';
import contributeSectionHeaderIcon from '../../public/static/images/collective-navigation/CollectiveSectionHeaderIconContribute.png';
import eventsSectionHeaderIcon from '../../public/static/images/collective-navigation/CollectiveSectionHeaderIconEvents.png';

const ContainerWithMaxWidth = styled(Container).attrs({
  maxWidth: Dimensions.MAX_SECTION_WIDTH,
  p: Dimensions.PADDING_X,
  m: '0 auto',
})`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
`;

const TypeIllustration = styled.img.attrs({ alt: '' })`
  width: 48px;
  height: 48px;
`;

const getCategoryData = (intl, collective, category) => {
  switch (category) {
    case NAVBAR_CATEGORIES.ABOUT:
      return {
        img: aboutSectionHeaderIcon,
        title: i18nNavbarCategory(intl, category),
      };
    case NAVBAR_CATEGORIES.BUDGET:
      return {
        img: budgetSectionHeaderIcon,
        title: i18nNavbarCategory(intl, category),
        subtitle: (
          <FormattedMessage
            id="CollectivePage.SectionBudget.Subtitle"
            defaultMessage="Transparent and open finances."
          />
        ),
        info: (
          <FormattedMessage
            id="CollectivePage.SectionBudget.Description"
            defaultMessage="See how money openly circulates through {collectiveName}. All contributions and all expenses are published in our transparent public ledger. Learn who is donating, how much, where is that money going, submit expenses, get reimbursed and more!"
            values={{ collectiveName: collective.name }}
          />
        ),
      };
    case NAVBAR_CATEGORIES.CONNECT:
      return {
        img: connectSectionHeaderIcon,
        title: i18nNavbarCategory(intl, category),
        subtitle: <FormattedMessage id="section.connect.subtitle" defaultMessage="Let’s get the ball rolling!" />,
        info: (
          <FormattedMessage
            id="section.connect.info"
            defaultMessage="Start conversations with your community or share updates on how things are going."
          />
        ),
      };
    case NAVBAR_CATEGORIES.CONTRIBUTE:
      return {
        img: contributeSectionHeaderIcon,
        title: i18nNavbarCategory(intl, category),
        subtitle: (
          <FormattedMessage
            id="CollectivePage.SectionContribute.Subtitle"
            defaultMessage="Become a financial contributor."
          />
        ),
        info: (
          <FormattedMessage
            id="CollectivePage.SectionContribute.info"
            defaultMessage="Support {collectiveName} by contributing to them once, monthly, or yearly."
            values={{ collectiveName: collective.name }}
          />
        ),
      };
    case NAVBAR_CATEGORIES.EVENTS:
      return {
        img: eventsSectionHeaderIcon,
        title: i18nNavbarCategory(intl, category),
        subtitle: <FormattedMessage id="section.events.subtitle" defaultMessage="Create and manage events" />,
        info: (
          <FormattedMessage
            id="section.events.info"
            defaultMessage="Find out where your community is gathering next."
          />
        ),
      };
    default:
      return null;
  }
};

const CategoryHeader = React.forwardRef(({ collective, category, ...props }, ref) => {
  const intl = useIntl();
  const data = getCategoryData(intl, collective, category);
  if (!data) {
    return null;
  }

  return (
    <ContainerWithMaxWidth ref={ref} {...props}>
      <Flex alignItems="center" justifyContent="center">
        <Flex alignItems="center" mr={2}>
          <TypeIllustration src={data.img} />
        </Flex>
        <Flex alignItems="center" mr={3}>
          <SectionTitle mr={2} my={3} data-cy={`category-${category}-title`}>
            {data.title}
          </SectionTitle>
          {data.info && (
            <StyledTooltip content={() => data.info}>
              <Info size={18} color="#76777A" />
            </StyledTooltip>
          )}
        </Flex>
        <StyledHr flex="1" borderStyle="solid" borderColor="black.300" mt={1} />
      </Flex>
      {data.subtitle && (
        <Flex mb={4} justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <P color="black.700" my={2} mr={2} css={{ flex: '1 0 50%', maxWidth: 780 }}>
            {data.subtitle}
          </P>
        </Flex>
      )}
    </ContainerWithMaxWidth>
  );
});

CategoryHeader.displayName = 'CategoryHeader';

CategoryHeader.propTypes = {
  category: PropTypes.oneOf(Object.values(NAVBAR_CATEGORIES)),
  collective: PropTypes.object,
};

export default CategoryHeader;
