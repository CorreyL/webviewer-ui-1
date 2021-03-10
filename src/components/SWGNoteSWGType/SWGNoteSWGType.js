import React, { useState, useRef, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useTranslation } from 'react-i18next';

import DataElementWrapper from 'components/DataElementWrapper';
import Icon from 'components/Icon';
import useDidUpdate from 'hooks/useDidUpdate';
import core from 'core';

import './SWGNoteSWGType.scss';

const propTypes = {
  annotation: PropTypes.object,
  isSelected: PropTypes.bool,
  openOnInitialLoad: PropTypes.bool,
  isAnnotationModify: PropTypes.bool,
  handleStatusChange: PropTypes.func
};

function SWGNoteSWGType(props) {
  const {
    annotation,
    isSelected =false,
    openOnInitialLoad = false,
    isAnnotationModify,
    handleStatusChange
  } = props;

  const [t] = useTranslation();
  const [isOpen, setIsOpen] = useState(openOnInitialLoad);
  const popupRef = useRef();

  useOnClickOutside(popupRef, () => {
    setIsOpen(false);
  });

  const togglePopup = e => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  function onTypeOptionsButtonClick() {
    setIsOpen(false);
  }

  function createOnTypeOptionButtonClickHandler(status, type) {
    return function onTypeOptionButtonClick() {
      if (handleStatusChange) {
        handleStatusChange(status, type);
      }
    };
  }

  if (!annotation) {
    return null;
  }

  if (isAnnotationModify) {
    console.log("SWGNoteSWGType isAnnotationModify");
    return null;
  }
  const annotationType = annotation.getCustomData("SWGtype");
  const selectedType = `swg.option.type.${annotationType}`;
  const isReply = annotation.isReply();

  //user role 1 - admin, 2 - ee, 3 - pr
  return (
    <div class="swgNoteSWGTypeContent">
      <DataElementWrapper
        className="SWGNoteSWGType"
        dataElement="swgNoteSWGTypeUserRole3"
        onClick={togglePopup}
      >
        <div className="overflow">
        { (annotation.getCustomData("SWGstatus") === 'rejected') &&
            (<Icon glyph="icon-annotation-status-rejected" />
        )}
          {t(selectedType)}
        </div>
        {isOpen && (
          <button ref={popupRef} className="note-type-options" onClick={onTypeOptionsButtonClick}>
            <DataElementWrapper dataElement="notePopupType">
            { annotationType !== 'revision' && 
            (<DataElementWrapper
                dataElement="notePopupTypeRevision"
                className="note-type-option"
                onClick={createOnTypeOptionButtonClickHandler('none', 'revision')}
              >
                {t('swg.option.type.revision')}
              </DataElementWrapper>
              )}
              {  annotationType !== 'clarification' && 
              (<DataElementWrapper
                dataElement="notePopupTypeClarification"
                className="note-type-option"
                onClick={createOnTypeOptionButtonClickHandler('none','clarification')}
              >
                {t('swg.option.type.clarification')}
              </DataElementWrapper>
              )}
            </DataElementWrapper>
          </button>
        )}
      </DataElementWrapper>
      <DataElementWrapper
        className="SWGNoteSWGType"
        dataElement="swgNoteSWGTypeUserRole2"
        onClick={togglePopup}
      >
        <div className="overflow">
          {t(selectedType)}
        </div>
        {isOpen && (
          <button ref={popupRef} className="note-type-options" onClick={onTypeOptionsButtonClick}>
            <DataElementWrapper dataElement="notePopupType">
            { (annotationType !== 'revision') && 
            (<DataElementWrapper
                dataElement="notePopupTypeRevision"
                className="note-type-option"
                onClick={createOnTypeOptionButtonClickHandler('none', 'revision')}
              >
                {t('swg.option.type.revision')}
              </DataElementWrapper>
              )}
              {  (annotationType !== 'clarification') && 
              (<DataElementWrapper
                dataElement="notePopupTypeClarification"
                className="note-type-option"
                onClick={createOnTypeOptionButtonClickHandler('none', 'clarification')}
              >
                {t('swg.option.type.clarification')}
              </DataElementWrapper>
              )}
              {  annotationType !== 'modification' && 
              (<DataElementWrapper
                dataElement="notePopupTypeModification"
                className="note-type-option"
                onClick={createOnTypeOptionButtonClickHandler('none', 'modification')}
              >
                {t('swg.option.type.modification')}
              </DataElementWrapper>
              )}
            </DataElementWrapper>
          </button>
        )}
      </DataElementWrapper>
    </div>
  );
}

SWGNoteSWGType.propTypes = propTypes;

export default SWGNoteSWGType;
