import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { lighten } from 'polished';
import styled from 'styled-components';
import _get from 'lodash/get';
import _padEnd from 'lodash/padEnd';

import images from './card-images';

const Attribute = styled.div`${props => props.attributeStyle}`;
const CardFront = styled.div`
  ${props => props.bgColor ? `
    background: linear-gradient(to right, ${lighten(0.2, props.bgColor)}, ${props.bgColor}) !important; 
  ` : ''}
`;
const CardBack = CardFront;

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

class Card extends Component {
  getFocusedClass = attribute => {
    const { focused } = this.props;
    return (attribute === focused) ? 'react-health-card--focused' : '';
  }

  shouldCardBeFlipped = focused => {
    const position = _get(this.props, `${focused}Position`);
    return position === 'back';
  }

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
    return (
      <div className="react-health-card__container">
        <div
          className={
            classNames(
              'react-health-card',
              type ? `react-health-card--${type}` : '',
              (isFlipped || this.shouldCardBeFlipped(focused)) ? 'react-health-card--flipped' : ''
            )
          }
          >
          <CardFront className="react-health-card__front" bgColor={bgColorFront}>
            {
              logoPosition === 'front' && showLogo &&
              <Attribute className="react-health-card__attribute" attributeStyle={logoStyle}>
                <img
                  src={_get(images, `${type}.logoUri`) || logoUri}
                  className={classNames('react-health-card__logo', `react-health-card--${type}`)}
                  />
              </Attribute>
            }
            {
              rankPosition === 'front' && showRank &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('rank'))}
                attributeStyle={rankStyle}
                >
                {_padEnd(rank, rankLength, '•')}
              </Attribute>
            }
            {
              namePosition === 'front' && showName &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('name'))}
                attributeStyle={nameStyle}
                >
                {name || namePlaceholder}
              </Attribute>
            }
            {
              memberNumberPosition === 'front' && showMemberNumber &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('memberNumber'))}
                attributeStyle={memberNumberStyle}
                >
                <div className="react-health-card__with-content" data-before={memberNumberTitle}>{_padEnd(memberNumber, memberNumberLength, '•')}</div>
              </Attribute>
            }
            {
              issueDatePosition === 'front' && showIssueDate &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('issueDate'))}
                attributeStyle={issueDateStyle}
                >
                <div className="react-health-card__with-content" data-before={issueDateTitle}>{_formatDate(issueDate, issueDateFormat)}</div>
              </Attribute>
            }
            {
              issueNumberPosition === 'front' && showIssueNumber &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('issueNumber'))}
                attributeStyle={issueNumberStyle}
                >
                <div className="react-health-card__with-content" data-before={issueNumberTitle}>{_padEnd(issueNumber, issueNumberLength, '•')}</div>
              </Attribute>
            }
            {
              cardNumberPosition === 'front' && showCardNumber &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('cardNumber'))}
                attributeStyle={cardNumberStyle}
                >
                <div className="react-health-card__with-content" data-before={cardNumberTitle}>{_padEnd(cardNumber, cardNumberLength, '•')}</div>
              </Attribute>
            }
          </CardFront>
          <CardBack className="react-health-card__back" bgColor={bgColorBack}>
            { showSwipeBar && <div className="react-health-card__bar"/> }
            {
              logoPosition === 'back' && showLogo &&
              <Attribute className="react-health-card__attribute" attributeStyle={logoStyle}>
                <img
                  src={_get(images, `${type}.logoUri`) || logoUri}
                  className={classNames('react-health-card__logo', `react-health-card--${type}`)}
                  />
              </Attribute>
            }
            {
              rankPosition === 'back' && showRank &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('rank'))}
                attributeStyle={rankStyle}
                >
                {_padEnd(rank, rankLength, '•')}
              </Attribute>
            }
            {
              namePosition === 'back' && showName &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('name'))}
                attributeStyle={nameStyle}
                >
                {name || namePlaceholder}
              </Attribute>
            }
            {
              memberNumberPosition === 'back' && showMemberNumber &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('memberNumber'))}
                attributeStyle={memberNumberStyle}
                >
                <div className="react-health-card__with-content" data-before={memberNumberTitle}>{_padEnd(memberNumber, memberNumberLength, '•')}</div>
              </Attribute>
            }
            {
              issueDatePosition === 'back' && showIssueDate &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('issueDate'))}
                attributeStyle={issueDateStyle}
                >
                <div className="react-health-card__with-content" data-before={issueDateTitle}>{_formatDate(issueDate, issueDateFormat)}</div>
              </Attribute>
            }
            {
              issueNumberPosition === 'back' && showIssueNumber &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('issueNumber'))}
                attributeStyle={issueNumberStyle}
                >
                <div className="react-health-card__with-content" data-before={issueNumberTitle}>{_padEnd(issueNumber, issueNumberLength, '•')}</div>
              </Attribute>
            }
            {
              cardNumberPosition === 'back' && showCardNumber &&
              <Attribute
                className={classNames('react-health-card__attribute react-health-card__editable', this.getFocusedClass('cardNumber'))}
                attributeStyle={cardNumberStyle}
                >
                <div className="react-health-card__with-content" data-before={cardNumberTitle}>{_padEnd(cardNumber, cardNumberLength, '•')}</div>
              </Attribute>
            }
          </CardBack>
        </div>
      </div>
    );
  }
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
  logoStyle: `
    right: 10%;
    top: 10%;
  `,
  logoPosition: 'front',
  issueDateStyle: `
    bottom: 15%;
    left: 65%;
  `,
  issueDatePosition: 'front',
  issueDateTitle: 'Issue date',
  issueNumberStyle: `
    left: 10%;
    bottom: 15%;
  `,
  issueNumberPosition: 'back',
  issueNumberTitle: 'Issue number',
  issueNumberLength: 2,
  cardNumberStyle: `
    left: 10%;
    top: 20%;
  `,
  cardNumberPosition: 'front',
  cardNumberTitle: 'Card number',
  cardNumberLength: 8,
  memberNumberStyle: `
    bottom: 15%;
    left: 10%;
  `,
  memberNumberPosition: 'front',
  memberNumberTitle: 'Member number',
  memberNumberLength: 8,
  nameStyle: `
    bottom: 40%;
    left: 20%;
  `,
  namePosition: 'front',
  rankStyle: `
    bottom: 40%;
    left: 10%;
  `,
  rankPosition: 'front',
  rankLength: 2,
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
