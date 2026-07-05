import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, children, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-neon-green font-orbitron text-xl font-bold mb-4">{title}</h3>
        <div className="mb-6">{children}</div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-600 text-gray-300 px-4 py-2 rounded font-inter hover:bg-gray-800 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-neon-green text-dark-bg px-4 py-2 rounded font-inter font-bold hover:bg-neon-green/80 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
