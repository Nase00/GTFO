/* globals document */
import React, { PureComponent, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'withstyles';
import { isNil } from 'lodash';
import { compose } from 'recompose';

import { VelocityComponent } from 'velocity-react';

import * as LayoutActions from 'ducks/layout';
import * as NavigationActions from 'ducks/navigation';
import stylesGenerator from './styles';

class Modal extends PureComponent {
  static propTypes = {
    modalContent: PropTypes.node.isRequired,
    computedStyles: PropTypes.shape({
      base: PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    const { modalContent, computedStyles } = this.props;

    return ReactDOM.createPortal(
      <div className={computedStyles.base}>
        <VelocityComponent animation={{ opacity: modalContent ? 1 : 0 }} duration={250}>
          <div>{isNil(modalContent) ? null : cloneElement(modalContent, this.props)}</div>
        </VelocityComponent>
      </div>,
      document.getElementById('modal')
    );
  }
}

const mapStateToProps = ({ layoutReducer, navigationReducer, router }) => ({
  ...layoutReducer.toJS(),
  ...navigationReducer.toJS(),
  router
});

const mapDispatchToProps = (dispatch) => {
  const actions = {
    ...LayoutActions,
    ...NavigationActions
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(stylesGenerator)
)(Modal);
