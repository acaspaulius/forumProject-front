import React, { useState } from 'react';

function ActivationModal({ isOpen, onClose, onActivate }) {
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className='modal-overlay modal-activation'>
      <div className='modal-content'>
        <h2>Enter activation code</h2>
        <input type='text' value={code} onChange={(e) => setCode(e.target.value)} placeholder='Activation code' />
        <div className='modal-buttons-content'>
          <button className='primary-btn' onClick={() => onActivate(code)}>
            CONFIRM
          </button>
          <button className='secondary-btn' onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivationModal;
