import React, { useState, useRef,  useCallback} from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useTranslation } from 'react-i18next';

import DataElementWrapper from 'components/DataElementWrapper';
import Icon from 'components/Icon';
import core from 'core';

import './SWGNoteSWGPanel.scss';

const propTypes = {
  annotation: PropTypes.object,
  isSelected: PropTypes.bool,
  openOnInitialLoad: PropTypes.bool,
  handleTypeChange: PropTypes.func
};

function SWGNoteSWGPanel(props) {
  const {
    annotation,
  } = props;

  //PARIS parameter für Annotration, die von PARIS definiert sind
  const swgPanel = annotation.getCustomData('SWGpanel');

  return (
    <div className="author-and-panel">
        {swgPanel}
    </div>
  );
}

SWGNoteSWGPanel.propTypes = propTypes;

export default SWGNoteSWGPanel;
