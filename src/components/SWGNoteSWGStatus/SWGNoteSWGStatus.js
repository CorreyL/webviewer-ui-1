import React, { useState, useRef,  useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useTranslation } from 'react-i18next';

import DataElementWrapper from 'components/DataElementWrapper';
import Icon from 'components/Icon';
import core from 'core';

import './SWGNoteSWGStatus.scss';

const propTypes = {
  annotationSWGType: PropTypes.string,
  annotationSWGStatus: PropTypes.string,
  isSelected: PropTypes.bool,
  isAnnotationModify: PropTypes.bool,
  handleStatusChange: PropTypes.func
};

function SWGNoteSWGStatus(props) {
  const {
    annotationSWGType,
    annotationSWGStatus,
    isSelected = false,
    handleStatusChange
  } = props;

  const [t] = useTranslation();
  
  const setAnnotationStatus = (e, status, type) => {
    // prevent the textarea from blurring out which will unmount these two buttons
    e.preventDefault();
   if (handleStatusChange) {
      handleStatusChange(status, type);
    }
 };

  return (
    <DataElementWrapper
      className="SWGNoteSWGStatus"
      dataElement="swgNoteSWGStatus"
    >
       { (annotationSWGType === "clarification") &&
       (annotationSWGStatus === "none") &&
       (<div class="swg-status-buttons">
          <div
            className="swg-status-agree-button"
            onClick={e => {
              e.stopPropagation();
              setAnnotationStatus(e, "none", "modification");
            }}
          >
            {t('swg.action.agree')}
          </div>
          <div
            className="swg-status-disagree-button"
            onClick={e => {
              e.stopPropagation();
              setAnnotationStatus(e, "rejected", "clarification");
            }}
          >
            {t('swg.action.disagree')}
          </div>
        </div>) }
          
        { (annotationSWGType === "revision") &&
       (annotationSWGStatus === "none") &&
       (<div class="swg-status-buttons">
          <div
            className="swg-status-disagree-button"
            onClick={e => {
              e.stopPropagation();
              setAnnotationStatus(e, "rejected", "revision");
            }}
          >
            {t('swg.action.disagree')}
          </div>
        </div>) }

        { (annotationSWGType === "modification") &&
       (annotationSWGStatus === "none") &&
       (<div class="swg-status-buttons">
          <div
            className="swg-status-disagree-button"
            onClick={e => {
              e.stopPropagation();
              setAnnotationStatus(e, "none", "modification");
            }}
          >
            {t('swg.action.modification')}
          </div>
        </div>) }

    </DataElementWrapper>
  );
}

SWGNoteSWGStatus.propTypes = propTypes;

export default SWGNoteSWGStatus;
