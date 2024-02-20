import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>{message}</h2>
        <div className='modal-buttons-content'>
          <button className='primary-btn' onClick={onConfirm}>
            Confirm
          </button>
          <button className='secondary-btn' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
