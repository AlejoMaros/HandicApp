import React, { useState } from 'react';
import Modal from 'react-modal';
import { QrReader } from 'react-qr-reader';

// Indica el elemento root para accesibilidad
Modal.setAppElement('#root');

const QRScannerModal = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState(null);

  const handleResult = (result, error) => {
    if (result) {
      onScan(result?.text);
      onClose();
    }
    if (error) {
      setError(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="QR Scanner"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '400px',
        },
      }}
    >
      <h2>Escanea el QR</h2>
      <button onClick={onClose} style={{ marginBottom: '1rem' }}>Cerrar</button>
      <div>
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </div>
    </Modal>
  );
};

export default QRScannerModal;
