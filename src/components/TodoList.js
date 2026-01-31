import React from "react";

function TodoList(props) {
  const renderProp = props.children || props.render;

  return (
    <section className="TodoList-container">
      {props.error && props.onError()}

      {props.loading && props.onLoading()}

      {!props.loading && !props.totalItems && props.onEmptyItems()}

      {!!props.totalItems &&
        !props.itemsFilterSearchValue.length &&
        props.onEmptySearchResults(props.searchValue)}

      {!props.loading &&
        !props.error &&
        props.itemsFilterSearchValue.map(renderProp)}
    </section>
  );
}

export { TodoList };
