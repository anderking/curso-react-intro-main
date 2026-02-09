import React from "react";

function TodoFormUI({
  label,
  placeholder,
  value,
  onChange,
  onCancel,
  onSubmit,
  submitText,
  textareaRef,
}) {
  return (
    <form onSubmit={onSubmit} className="TodoForm">
      <label className="TodoForm-label">{label}</label>

      <textarea
        ref={textareaRef}
        className="TodoForm-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />

      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
          disabled={!value.trim()}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}

export { TodoFormUI };
