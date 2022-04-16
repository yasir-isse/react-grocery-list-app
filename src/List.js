import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ item, handleRemove, handleEdit }) => {
  return (
    <div className="grocery-item">
      <p className="title">{item}</p>
      <div>
        <button
          type="button"
          className="edit-btn"
          onClick={() => handleEdit(item)}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => handleRemove(item)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default List;
