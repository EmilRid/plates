import React, { useState } from "react";
import "./App.css";

type Weight = "0.5" | "1.25" | "2.5" | "5" | "10" | "15" | "20" | "25";
const availablePlates: Record<Weight, boolean> = {
  "0.5": true,
  "1.25": true,
  "2.5": true,
  "5": true,
  "10": true,
  "15": true,
  "20": true,
  "25": true,
};

const platesQuantity = (
  totalWeight: number,
  barWeight: number,
  plates: Record<Weight, boolean>
): Record<Weight, number> => {
  const sortedAvailablePlates: Weight[] = Object.entries(plates)
    .filter(([w, exists]) => exists)
    .map(([w, _]) => w as Weight)
    .sort((n1, n2) => parseFloat(n2) - parseFloat(n1));

  const returnObj: Record<Weight, number> = {} as Record<Weight, number>;

  let remainingWeight = totalWeight - barWeight;
  for (let weight of sortedAvailablePlates) {
    let count = 0;
    let platePairWeight = parseFloat(weight) * 2;
    while (platePairWeight <= remainingWeight) {
      count++;
      remainingWeight = remainingWeight - platePairWeight;
    }
    returnObj[weight as Weight] = count;
  }

  return returnObj;
};

function App() {
  const [weight, setWeight] = useState(0.0);
  const [barWeight, setBarWeight] = useState(20.0);
  const [plates, setPlates] = useState(availablePlates);
  const onCheckBoxSelected = (weight: Weight) => {
    setPlates((plates) => ({ ...plates, [weight]: !plates[weight] }));
  };
  return (
    <div className="App">
      <p>Available Plates</p>
      {Object.entries(plates)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([weight, checked]) => (
          <div key={weight}>
            <label>{weight} kg</label>
            <input
              type="checkbox"
              onChange={(e) => onCheckBoxSelected(weight as Weight)}
              checked={checked}
            />
          </div>
        ))}
      <div>
        <p>Bar Weight</p>
        <input
          type="number"
          value={barWeight}
          onChange={(e) => setBarWeight(parseFloat(e.currentTarget.value))}
        />{" "}
        kg
      </div>
      <div>
        <p>Input Weight</p>
        <input
          type="number"
          onChange={(e) => setWeight(parseFloat(e.currentTarget.value))}
        />{" "}
        kg
      </div>
      <br />
      {Object.entries(platesQuantity(weight, barWeight, plates)).filter(([w, a]) => a > 0).map(
        ([weight, amount]) => (
          <div className={"w" + weight}>{2 * amount}x{weight}</div>
        )
      )}
    </div>
  );
}

export default App;
