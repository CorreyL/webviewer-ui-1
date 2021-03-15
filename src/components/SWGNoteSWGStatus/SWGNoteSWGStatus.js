import React, { useState, useRef,  useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import DataElementWrapper from 'components/DataElementWrapper';

import './SWGNoteSWGStatus.scss';

const propTypes = {
  annotation: PropTypes.object,
  annotationSWGType: PropTypes.string,
  annotationSWGStatus: PropTypes.string,
  isSelected: PropTypes.bool,
  handleStatusChange: PropTypes.func
};

function SWGNoteSWGStatus(props) {
  const {
    annotation,
    annotationSWGType,
    annotationSWGStatus,
    isSelected = false,
    handleStatusChange
  } = props;

  const [t] = useTranslation();
  console.log("1111 Welche ist der Type === " + annotationSWGType);
  console.log("1111 Welche ist der Status === " + annotationSWGStatus);
  const setAnnotationStatus = (e, status, type) => {
    // prevent the textarea from blurring out which will unmount these two buttons
    e.preventDefault();
   if (handleStatusChange) {
      handleStatusChange(status, type);
    }
 };
 
 if (!annotation) {
    return null;
  }

  return (
    <DataElementWrapper
      className="SWGNoteSWGStatus"
      dataElement="swgNoteSWGStatus"
    >
       { annotationSWGType === "clarification" && 
       annotationSWGStatus === "none" && 
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
          
        { annotationSWGType === "revision" && 
          annotationSWGStatus === "none" && 
        ( <div class="swg-status-buttons">
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

        { annotationSWGType === "modification" && 
          annotationSWGStatus === "none" && 
        ( <div class="swg-status-buttons">
          <div
            className="swg-status-modification-button"
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
