import React from "react";

function InputSearchUI({ searchValue, setSearchValue, loading }) {
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="InputSearchUI"
      placeholder="Buscar..."
      value={searchValue}
      onChange={onSearchValueChange}
      disabled={loading}
    />
  );
}

export { InputSearchUI };
