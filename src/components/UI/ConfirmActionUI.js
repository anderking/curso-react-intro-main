// src/components/UI/ConfirmActionUI.js
import React from "react";
import { Modal } from "./Modal";
import { DeleteIcon } from "./Icons/DeleteIcon";

function ConfirmActionUI({ title, description, onConfirm, onCancel, isOpen }) {
  if (!isOpen) return null;

  return (
    <Modal>
      <div className="ConfirmAction">
        <div className="ConfirmAction-header">
          <div className="ConfirmAction-iconContainer">
            <DeleteIcon color="#ff4d4d" width="48" height="48" />
          </div>
          <h3>{title}</h3>
        </div>

        <p className="ConfirmAction-description">{description}</p>

        <div className="ConfirmAction-buttons">
          <button className="btn-cancel btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-confirm btn-danger" onClick={onConfirm}>
            <DeleteIcon color="white" />
            Sí, eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { ConfirmActionUI };
