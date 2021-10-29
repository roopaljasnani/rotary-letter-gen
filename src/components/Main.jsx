import { useState } from "react";

export default function Main() {
  const [codes, setCodes] = useState([]);
  const [formattedCodes, setFormattedCodes] = useState("");

  const generateLetterCodes = () => {
    const number = document.getElementById("number").value;

    if (number) {
      const mappings = {
        1: [""],
        2: ["A", "B", "C"],
        3: ["D", "E", "F"],
        4: ["G", "H", "I"],
        5: ["J", "K", "L"],
        6: ["M", "N", "O"],
        7: ["P", "R", "S"],
        8: ["T", "U", "V"],
        9: ["W", "X", "Y"],
        0: [""],
      };

      const allCombinations = number
        .split("")
        .map((digit) => mappings[digit])
        .reduce((accComb, currentComb) => {
          let combinations = [];
          for (let letter of accComb) for (let letter2 of currentComb) combinations.push(letter + letter2);
          return combinations;
        });
      setCodes(allCombinations);
      let html = "";
      allCombinations.forEach((comb, i) => {
        if (i && i % 3 === 0) html += "<br/>";
        html += comb + "&nbsp; &nbsp;";
      });
      setFormattedCodes(html);
    }
  };

  const validateNumericInput = (e) => !/[\d]/.test(e.key) && e.preventDefault();

  return (
    <div className="content">
      <p>Pass in any number and get the resulting rotary phone letter code combinations.</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Rotarydial.JPG" alt="Rotary Phone" className="sample" />

      <input
        type="text"
        id="number"
        minLength={1}
        maxLength={10}
        onKeyPress={validateNumericInput}
        placeholder="Enter your number"
        data-testid="input"
      />
      <button type="submit" onClick={generateLetterCodes} data-testid="button">
        Generate Letter Codes
      </button>

      {!!codes.length && formattedCodes && (
        <div className="result">
          <h2>Result ({codes.length.toLocaleString()} combinations) :</h2>
          <span dangerouslySetInnerHTML={{ __html: formattedCodes }} className="output" />
        </div>
      )}
    </div>
  );
}
