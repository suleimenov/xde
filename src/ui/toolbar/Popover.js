import React, {PropTypes} from 'react';
import {Motion, spring} from 'react-motion';

import SharedStyles from '../Styles';
import StyleConstants from '../StyleConstants';

export default class Popover extends React.Component {
  static propTypes = {
    children: PropTypes.node, // Target over which the popover is shown.

    // Popover contents. If not specified, only the children are shown.
    body: PropTypes.node,

    isToLeft: PropTypes.bool,
    arrowOffset: PropTypes.number,
    popoverOffset: PropTypes.number,
  };

  static defaultProps = {
    arrowOffset: 0,
    popoverOffset: 0,
  };

  _renderPopoverContents() {
    const popoverStyle = this.props.isToLeft ?
      {right: this.props.popoverOffset} : {left: this.props.popoverOffset};
    const arrowStyle = this.props.isToLeft ?
      {right: this.props.arrowOffset} : {left: this.props.arrowOffset};
    const arrowFillStyle = this.props.isToLeft ?
      {right: this.props.arrowOffset + 1} : {left: this.props.arrowOffset + 1};

    return (
      <Motion defaultStyle={{x: 0}} style={{x: spring(1)}}>
        {(value) => (
          <div>
            <div style={{...Styles.popover, ...popoverStyle, opacity: value.x}}>
              <div style={{...Styles.arrow, ...arrowStyle}}></div>
              <div style={{...Styles.arrowFill, ...arrowFillStyle}}></div>
              <div style={Styles.content}>
                {this.props.body}
              </div>
            </div>
          </div>
        )}
      </Motion>
    );
  }

  render() {
    return (
      <div style={Styles.container}>
        {this.props.children}
        {this.props.body && this._renderPopoverContents()}
      </div>
    );
  }
}

const ARROW_SIZE = 12;

const Styles = {
  container: {
    display: 'inline-block',
    position: 'relative',
  },
  popover: {
    position: 'absolute',
    top: '100%',
    zIndex: StyleConstants.zIndexPopover,
  },
  arrow: {
    backgroundColor: 'white',
    borderColor: StyleConstants.colorBorder,
    borderStyle: 'solid',
    borderWidth: 1,
    transform: 'rotate(45deg)',
    width: ARROW_SIZE,
    height: ARROW_SIZE,

    position: 'absolute',
    top: 1,
    zIndex: 1,
  },
  content: {
    position: 'relative',
    top: ARROW_SIZE / 2, // To make room for the arrow
    zIndex: 2, // Higher than the arrow

    paddingTop: ARROW_SIZE / 2 + 1,
    paddingBottom: ARROW_SIZE / 2 + 1,
    ...SharedStyles.hoverBox,
  },
  arrowFill: {
    backgroundColor: 'white',
    border: 'none',
    transform: 'rotate(45deg)',
    width: 10,
    height: 10,

    position: 'absolute',
    top: 2,
    zIndex: 3, // Higher than content
  },
};
