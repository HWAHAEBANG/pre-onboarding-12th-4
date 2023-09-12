import React, { useState, MouseEvent } from "react";
import "./App.css";
import CombinationChart from "./components/charts/CombinationChart";
import CategoryBtnList from "./components/charts/CategoryBtnList";

function App() {
  const [selected, setSelected] = useState<string>("해제");
  const selectCategory = (e: MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.innerText);
  };

  return (
    <>
      <CategoryBtnList selectCategory={selectCategory} selected={selected} />
      <CombinationChart setSelected={setSelected} selected={selected} />
    </>
  );
}

export default App;
