import React from 'react';
import { ModalImages } from '../../context/Modal';
import './ViewImages.css'
import img from './xButton.jpg'
import ViewImages from './ViewImages';

function ViewImagesModal({ spot, showModal, setShowModal }) {

  const onX = () => {
    setShowModal(false)
  }

  return (
    <>
      {/* <div onClick={() => setShowModal(true)}>Show all photos</div> */}
      {showModal && (
        <ModalImages onClose={() => setShowModal(false)}>
          <div className='viewImages-modal-container'>
            <div className='viewImages-modal-header'>
              <img className='viewImagesXButton' onClick={onX} src={img} alt=''></img>
              <div className='viewImagesviewImages'>Photos</div>
            </div>
            <div className='viewImages-modal-form'>
              {/* <div className='viewImages-welcome'>Images</div> */}
              <ViewImages spot={spot} />
            </div>
          </div>
      </ModalImages>
      )}
    </>
  );
}

export default ViewImagesModal;
