/* globals setInterval, clearInterval */
import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';

import DisplayError from '../common/display-error';
import MapLegend from './map-legend';

import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';

import Location from './location';

import { applyStyles } from '../../config/composition';
import { styles, rules } from './styles';
import { pluckLocations, updateLocationIndex, hasAnchor } from '../../utils';
import { PING_TIMEOUT } from '../../constants';

let originalLocation;

class LayoutController extends Component {
  componentDidMount() {
    if (this.props.ping) {
      this.flashPing();
    }
  }

  /**
   * Forces default location parameter to first location.
   */
  componentDidUpdate() {
    const { meetingRooms, ping, params } = this.props;
    const locations = pluckLocations(meetingRooms);

    if (!params.location && locations.length) {
      updateLocationIndex(locations[0]);
    }

    if (ping) {
      this.flashPing();
    }
  }

  /**
   * Checks that view is on correct location for ping.
   * Automatically clears pings after defined amount of time.
   */
  flashPing() {
    const { actions, params, location, ping } = this.props;
    const { anchor } = location.query;

    // Save original location.
    originalLocation = originalLocation || params.location;

    if (params.location !== ping.location) {
      updateLocationIndex(ping.location, anchor);
    }

    const setPingTimeout = setInterval(() => {
      actions.emitClearPing();

      // Revert to original location and re-save.
      updateLocationIndex(originalLocation, anchor);
      originalLocation = params.location;

      clearInterval(setPingTimeout);
    }, PING_TIMEOUT);
  }

  handleChangeLocation(newIndex) {
    const { meetingRooms, location } = this.props;
    const { anchor } = location.query;
    const locations = pluckLocations(meetingRooms);

    updateLocationIndex(locations[newIndex], anchor);
  }

  render() {
    const { meetingRooms, displayLegend, params, location } = this.props;
    const locationKeys = pluckLocations(meetingRooms);

    const renderLocation = (locationKey, index) => (
      <Location key={index} locationKey={locationKey} {...this.props}/>
    );

    return (
      <span>
        <Paper style={styles.paperOverride} zDepth={1}>
          <Style rules={rules.officeLayout}/>
          <SwipeableViews
            className='swipeable-viewport'
            style={styles.swipableOverride}
            index={locationKeys.indexOf(params.location)}
            onChangeIndex={this.handleChangeLocation.bind(this)}
            resistance={true}>
              {locationKeys.map(renderLocation)}
          </SwipeableViews>
          <MapLegend
            enabled={displayLegend}
            showYouAreHere={hasAnchor(location)}/>
        </Paper>
        <DisplayError {...this.props}/>
      </span>
    );
  }
}

LayoutController.propTypes = {
  location: PropTypes.object.isRequired,
  meetingRooms: PropTypes.array,
  stalls: PropTypes.array,
  markers: PropTypes.array,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  tempScale: PropTypes.string.isRequired,
  params: PropTypes.shape({
    location: PropTypes.string
  }).isRequired,
  ping: PropTypes.object,
  actions: PropTypes.shape({
    emitClearPing: PropTypes.func.isRequired
  }).isRequired
};

export default applyStyles(LayoutController);
