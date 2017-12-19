import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import _get from 'lodash/get';
import _padEnd from 'lodash/padEnd';

import images from './card-images';

const Attribute = styled.div`
  ${props => props.attributeStyle};
`;
const CardFront = styled.div`
  ${props =>
    props.bgColor
      ? `
    background: ${props.bgColor} !important;
  `
      : ''};
`;
const CardBack = CardFront;

const DEFAULT_LOGO_STYLE = 'right: 10%; top: 10%';
const DEFAULT_ISSUE_DATE_STYLE = 'bottom: 15%; left: 65%;';
const DEFAULT_ISSUE_NUMBER_STYLE = 'bottom: 15%; left: 10%;';
const DEFAULT_CARD_NUMBER_STYLE = 'top: 20%; left: 10%;';
const DEFAULT_MEMBER_NUMBER_STYLE = 'bottom: 15%; left: 10%;';
const DEFAULT_NAME_STYLE = 'bottom: 40%; left: 20%;';
const DEFAULT_RANK_STYLE = 'bottom: 40%; left: 10%;';

const _formatDate = (date, format) => {
  const dateFormatArray = format.split('/');
  let startIndex = 0;
  let newDate = [];

  dateFormatArray.forEach(element => {
    const dateFormatElementLength = element.length;
    const dateElement = date.slice(startIndex, startIndex + dateFormatElementLength);
    startIndex += dateFormatElementLength;
    newDate = [...newDate, _padEnd(dateElement || '', dateFormatElementLength, '•')];
  });

  return newDate.join('/');
};

const _includesPositioning = styleText =>
  styleText &&
  (styleText.includes('bottom') ||
    styleText.includes('top') ||
    styleText.includes('right') ||
    styleText.includes('left'));

class Card extends Component {
  getFocusedClass = attribute => {
    const { focused } = this.props;
    return attribute === focused ? 'react-health-card--focused' : '';
  };

  shouldCardBeFlipped = focused => {
    const position = _get(this.props, `${focused}Position`);
    return position === 'back';
  };

  handleToggleFlipCard = () => this.setState({ isFlipped: !this.state.isFlipped });

  render = () => {
    const {
      bgColorFront,
      bgColorBack,
      logoUri,
      focused,
      isFlipped,
      cardNumber,
      issueDate,
      issueNumber,
      memberNumber,
      name,
      namePlaceholder,
      rank,
      type,
      logoPosition,
      logoStyle,
      rankPosition,
      rankStyle,
      rankLength,
      rankTitle,
      namePosition,
      nameStyle,
      memberNumberPosition,
      memberNumberStyle,
      memberNumberTitle,
      memberNumberLength,
      issueDateStyle,
      issueDateTitle,
      issueDatePosition,
      issueDateFormat,
      issueNumberPosition,
      issueNumberStyle,
      issueNumberTitle,
      issueNumberLength,
      cardNumberPosition,
      cardNumberStyle,
      cardNumberTitle,
      cardNumberLength,
      showLogo,
      showCardNumber,
      showIssueDate,
      showIssueNumber,
      showMemberNumber,
      showRank,
      showName,
      showSwipeBar
    } = this.props;

    const newLogoStyle = `${_includesPositioning(logoStyle) ? '' : DEFAULT_LOGO_STYLE}${logoStyle || ''}`;
    const newIssueDateStyle = `${
      _includesPositioning(issueDateStyle) ? '' : DEFAULT_ISSUE_DATE_STYLE
    }${issueDateStyle || ''}`;
    const newIssueNumberStyle = `${
      _includesPositioning(issueNumberStyle) ? '' : DEFAULT_ISSUE_NUMBER_STYLE
    }${issueNumberStyle || ''}`;
    const newCardNumberStyle = `${
      _includesPositioning(cardNumberStyle) ? '' : DEFAULT_CARD_NUMBER_STYLE
    }${cardNumberStyle || ''}`;
    const newMemberNumberStyle = `${
      _includesPositioning(memberNumberStyle) ? '' : DEFAULT_MEMBER_NUMBER_STYLE
    }${memberNumberStyle || ''}`;
    const newNameStyle = `${_includesPositioning(nameStyle) ? '' : DEFAULT_NAME_STYLE}${nameStyle || ''}`;
    const newRankStyle = `${_includesPositioning(rankStyle) ? '' : DEFAULT_RANK_STYLE}${rankStyle || ''}`;

    return (
      <div className="react-health-card__container">
        <div
          className={classNames(
            'react-health-card',
            type ? `react-health-card--${type}` : '',
            isFlipped || this.shouldCardBeFlipped(focused) ? 'react-health-card--flipped' : ''
          )}
        >
          <CardFront className="react-health-card__front" bgColor={bgColorFront}>
            {logoPosition === 'front' &&
              showLogo && (
                <Attribute className="react-health-card__attribute" attributeStyle={newLogoStyle}>
                  <img
                    src={logoUri || _get(images, `default.logoUri`)}
                    className={classNames('react-health-card__logo', `react-health-card--${type}`)}
                    alt="logo"
                  />
                </Attribute>
              )}
            {rankPosition === 'front' &&
              showRank && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('rank')
                  )}
                  attributeStyle={newRankStyle}
                >
                  <div className="react-health-card__with-content" data-before={rankTitle}>
                    {_padEnd(rank, rankLength, '•')}
                  </div>
                </Attribute>
              )}
            {namePosition === 'front' &&
              showName && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('name')
                  )}
                  attributeStyle={newNameStyle}
                >
                  {name || namePlaceholder}
                </Attribute>
              )}
            {memberNumberPosition === 'front' &&
              showMemberNumber && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('memberNumber')
                  )}
                  attributeStyle={newMemberNumberStyle}
                >
                  <div className="react-health-card__with-content" data-before={memberNumberTitle}>
                    {_padEnd(memberNumber, memberNumberLength, '•')}
                  </div>
                </Attribute>
              )}
            {issueDatePosition === 'front' &&
              showIssueDate && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('issueDate')
                  )}
                  attributeStyle={newIssueDateStyle}
                >
                  <div className="react-health-card__with-content" data-before={issueDateTitle}>
                    {_formatDate(issueDate, issueDateFormat)}
                  </div>
                </Attribute>
              )}
            {issueNumberPosition === 'front' &&
              showIssueNumber && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('issueNumber')
                  )}
                  attributeStyle={newIssueNumberStyle}
                >
                  <div className="react-health-card__with-content" data-before={issueNumberTitle}>
                    {_padEnd(issueNumber, issueNumberLength, '•')}
                  </div>
                </Attribute>
              )}
            {cardNumberPosition === 'front' &&
              showCardNumber && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('cardNumber')
                  )}
                  attributeStyle={newCardNumberStyle}
                >
                  <div className="react-health-card__with-content" data-before={cardNumberTitle}>
                    {_padEnd(cardNumber, cardNumberLength, '•')}
                  </div>
                </Attribute>
              )}
          </CardFront>
          <CardBack className="react-health-card__back" bgColor={bgColorBack}>
            {showSwipeBar && <div className="react-health-card__bar" />}
            {logoPosition === 'back' &&
              showLogo && (
                <Attribute className="react-health-card__attribute" attributeStyle={newLogoStyle}>
                  <img
                    src={_get(images, `default.logoUri`) || logoUri}
                    className={classNames('react-health-card__logo', `react-health-card--${type}`)}
                    alt="logo"
                  />
                </Attribute>
              )}
            {rankPosition === 'back' &&
              showRank && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('rank')
                  )}
                  attributeStyle={newRankStyle}
                >
                  <div className="react-health-card__with-content" data-before={rankTitle}>
                    {_padEnd(rank, rankLength, '•')}
                  </div>
                </Attribute>
              )}
            {namePosition === 'back' &&
              showName && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('name')
                  )}
                  attributeStyle={newNameStyle}
                >
                  {name || namePlaceholder}
                </Attribute>
              )}
            {memberNumberPosition === 'back' &&
              showMemberNumber && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('memberNumber')
                  )}
                  attributeStyle={newMemberNumberStyle}
                >
                  <div className="react-health-card__with-content" data-before={memberNumberTitle}>
                    {_padEnd(memberNumber, memberNumberLength, '•')}
                  </div>
                </Attribute>
              )}
            {issueDatePosition === 'back' &&
              showIssueDate && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('issueDate')
                  )}
                  attributeStyle={newIssueDateStyle}
                >
                  <div className="react-health-card__with-content" data-before={issueDateTitle}>
                    {_formatDate(issueDate, issueDateFormat)}
                  </div>
                </Attribute>
              )}
            {issueNumberPosition === 'back' &&
              showIssueNumber && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('issueNumber')
                  )}
                  attributeStyle={newIssueNumberStyle}
                >
                  <div className="react-health-card__with-content" data-before={issueNumberTitle}>
                    {_padEnd(issueNumber, issueNumberLength, '•')}
                  </div>
                </Attribute>
              )}
            {cardNumberPosition === 'back' &&
              showCardNumber && (
                <Attribute
                  className={classNames(
                    'react-health-card__attribute react-health-card__editable',
                    this.getFocusedClass('cardNumber')
                  )}
                  attributeStyle={newCardNumberStyle}
                >
                  <div className="react-health-card__with-content" data-before={cardNumberTitle}>
                    {_padEnd(cardNumber, cardNumberLength, '•')}
                  </div>
                </Attribute>
              )}
          </CardBack>
        </div>
      </div>
    );
  };
}

Card.propTypes = {
  bgColorFront: PropTypes.string,
  bgColorBack: PropTypes.string,
  logoUri: PropTypes.string,
  focused: PropTypes.string,
  isFlipped: PropTypes.bool,
  cardNumber: PropTypes.string,
  issueDate: PropTypes.string,
  issueNumber: PropTypes.string,
  memberNumber: PropTypes.string,
  namePlaceholder: PropTypes.string,
  rank: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  logoPosition: PropTypes.string,
  logoStyle: PropTypes.string,
  rankPosition: PropTypes.string,
  rankStyle: PropTypes.string,
  rankLength: PropTypes.number,
  rankTitle: PropTypes.string,
  namePosition: PropTypes.string,
  nameStyle: PropTypes.string,
  memberNumberPosition: PropTypes.string,
  memberNumberStyle: PropTypes.string,
  memberNumberTitle: PropTypes.string,
  memberNumberLength: PropTypes.number,
  issueDateStyle: PropTypes.string,
  issueDateTitle: PropTypes.string,
  issueDatePosition: PropTypes.string,
  issueDateFormat: PropTypes.string,
  issueNumberPosition: PropTypes.string,
  issueNumberStyle: PropTypes.string,
  issueNumberLength: PropTypes.number,
  issueNumberTitle: PropTypes.string,
  cardNumberPosition: PropTypes.string,
  cardNumberStyle: PropTypes.string,
  cardNumberTitle: PropTypes.string,
  cardNumberLength: PropTypes.number,
  showLogo: PropTypes.bool,
  showCardNumber: PropTypes.bool,
  showIssueDate: PropTypes.bool,
  showIssueNumber: PropTypes.bool,
  showMemberNumber: PropTypes.bool,
  showRank: PropTypes.bool,
  showName: PropTypes.bool,
  showSwipeBar: PropTypes.bool
};

Card.defaultProps = {
  bgColorFront: '#2053B1',
  bgColorBack: '#2053B1',
  isFlipped: false,
  focused: null,
  logoUri: images.default.logoUri,
  type: 'default',
  rank: null,
  name: null,
  namePlaceholder: 'FULL NAME',
  cardNumber: null,
  memberNumber: null,
  issueNumber: null,
  issueDate: '',
  issueDateFormat: 'DD/MM/YYYY',
  logoStyle: null,
  logoPosition: 'front',
  issueDateStyle: null,
  issueDatePosition: 'front',
  issueDateTitle: 'Issue date',
  issueNumberStyle: null,
  issueNumberPosition: 'back',
  issueNumberTitle: 'Issue number',
  issueNumberLength: 2,
  cardNumberStyle: null,
  cardNumberPosition: 'front',
  cardNumberTitle: 'Card number',
  cardNumberLength: 8,
  memberNumberStyle: null,
  memberNumberPosition: 'front',
  memberNumberTitle: 'Member number',
  memberNumberLength: 8,
  nameStyle: null,
  namePosition: 'front',
  rankStyle: null,
  rankPosition: 'front',
  rankLength: 2,
  rankTitle: null,
  showLogo: true,
  showCardNumber: true,
  showIssueDate: true,
  showIssueNumber: true,
  showMemberNumber: true,
  showRank: true,
  showName: true,
  showSwipeBar: true
};

export default Card;
