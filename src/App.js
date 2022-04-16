import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

//get local storage & initialize the list
const getLocalStorageItems = () => {
  let localList = localStorage.getItem("groceryList");

  if (localList) {
    return JSON.parse(localList);
  } else {
    return [];
  }
};

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getLocalStorageItems());
  const [editValue, setEditValue] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      showAlert(true, "please enter a value", false);
    } else if (editValue !== "") {
      setList(list.map((i) => (i === editValue ? value : i)));
      showAlert(true, "item changed", true);
    } else if (list.includes(value)) {
      showAlert(true, "item already exists", false);
    } else {
      setList(list.concat(value));
      showAlert(true, "item added to the list", true);
    }

    setEditValue("");
    setValue("");
  };

  const showAlert = (show = false, text = "", success = false) =>
    setAlert({ show, text, success });

  const handleRemove = (product) => {
    setList(list.filter((item) => item !== product));
    setAlert({ show: true, text: "item removed", success: false });
  };

  const clearList = () => {
    showAlert(true, "empty list", false);
    setList([]);
  };

  const handleEdit = (product) => {
    setValue(product);
    setEditValue(product);
  };

  //setup local storage
  useEffect(() => {
    // setItem takes two arguments a key and a string
    localStorage.setItem("groceryList", JSON.stringify(list));
  }, [list]);

  return (
    <article className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="submit-btn" type="submit">
            {editValue ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <section className="grocery-container">
          {list.map((item, index) => (
            <List
              item={item}
              key={index}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
            />
          ))}

          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </section>
      )}
    </article>
  );
}

export default App;
