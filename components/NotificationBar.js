import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import AcceptRejectButtons from './host-dashboard/AcceptRejectButtons';
import Container from './Container';
import { Flex } from './Grid';
import { H1, P } from './Text';

const logo = '/static/images/opencollective-icon.svg';

const NotificationBarContainer = styled.div`
  .oc-message .logo {
    margin: 10px;
  }

  .error .oc-message {
    position: fixed;
    top: 0;
  }

  .loading .oc-progress-bar {
    position: fixed;
    bottom: 0;
    top: auto;
  }

  .loading .oc-bar {
    display: block;
    animation: oc-cssload-width 3.45s cubic-bezier(0.45, 0, 1, 1) infinite;
  }

  .error .oc-message {
    display: flex;
    align-items: center;
  }

  .error .oc-message p {
    margin: 0;
  }

  @keyframes oc-cssload-width {
    0%,
    100% {
      transition-timing-function: cubic-bezier(1, 0, 0.65, 0.85);
    }
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  .collectiveArchived {
    background: #414141;
  }
`;

class NotificationBar extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.node),
    /** Collective */
    collective: PropTypes.shape({
      id: PropTypes.number,
      slug: PropTypes.string,
    }),
    LoggedInUser: PropTypes.shape({
      roles: PropTypes.arrayOf(PropTypes.node),
      isHostAdmin: PropTypes.bool.isRequired,
    }),
  };

  render() {
    const { status, error, title, description, actions, collective, LoggedInUser } = this.props;
    const isHostAdmin = LoggedInUser && LoggedInUser.isHostAdmin(collective);

    return (
      <NotificationBarContainer className={classNames(status, 'NotificationBar')}>
        <Container
          className="oc-message"
          position="fixed"
          top="-70px"
          transition="top 1s cubic-bezier(0.45, 0, 1, 1)"
          left="0"
          height="60px"
          background="white"
          boxShadow="0px 2px 10px rgba(0, 0, 0, 0.5)"
          width="100%"
          zIndex="1000"
        >
          <img src={logo} width="40" height="40" className="logo" alt="Open Collective logo" />
          {error && <p>{error}</p>}
        </Container>
        {title && (
          <Container
            className={status}
            background="#1769f4"
            padding="1rem"
            color="#FFFFFF"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <H1 fontSize="1.8rem" margin="1rem">
              {title}
            </H1>
            <P maxWidth="60rem" textAlign="center" mb="2">
              {description}
            </P>

            {status === 'collectivePending' && isHostAdmin && (
              <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
                <AcceptRejectButtons collective={collective} />
              </Flex>
            )}
            {actions && (
              <Container display="flex">
                {actions.map(action => (
                  <Container margin="0.5rem" key={action.key}>
                    {action}
                  </Container>
                ))}
              </Container>
            )}
          </Container>
        )}
        <Container className="oc-progress-bar" position="relative" width="100%">
          <Container
            className="oc-bar"
            display="none"
            backgroundSize="23em 0.25em"
            height="4px"
            width="100%"
            position="relative"
            backgroundColor="#3385ff"
          />
        </Container>
      </NotificationBarContainer>
    );
  }
}

export default NotificationBar;
