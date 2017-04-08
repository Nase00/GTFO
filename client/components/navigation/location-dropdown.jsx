import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { styles } from './styles';
import { formatForDisplay } from '../../utils';
import { base } from '../../config/composition';

const LocationDropdown = (props) => {
  const { onSelectFieldChange,
          actions,
          locations,
          location } = props;

  const renderLocationSelection = (renderedLocation, index) => {
    const onClick = () => actions.emitLocationUpdate(renderedLocation, location);

    return (
      <MenuItem
        key={index}
        value={index}
        style={styles.mobileLocationSelectionMenuItem}
        primaryText={formatForDisplay(renderedLocation)}
        onClick={onClick}/>
    );
  };

  return locations ? (
    <SelectField
      className='mobile-location-selection-label'
      labelStyle={styles.mobileLocationSelectionLabel}
      underlineStyle={styles.mobileLocationSelectionUnderline}
      value={locations.indexOf(location.pathname.replace('/', ''))}
      onChange={onSelectFieldChange}>
        {locations.map(renderLocationSelection)}
    </SelectField>
  ) : (
    <span>
      There are no locations to select.
    </span>
  );
};

LocationDropdown.propTypes = {
  onSelectFieldChange: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    emitLocationUpdate: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  locations: PropTypes.array
};

export default base(LocationDropdown);
