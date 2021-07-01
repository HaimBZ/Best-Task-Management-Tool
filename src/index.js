import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";

const appState = [
  {
    filters: [
      {
        name: "Work Item Type",
        operators: ["Equals", "Contains", "Does Not Contain"],
        values: ["Backlog", "Bug", "Task"]
      },
      {
        name: "Tags",
        operators: ["Include", "Exclude"],
        values: ["UI", "DSP", "ADFR", "DB"]
      },
      {
        name: "Created By",
        operators: ["Include", "Exclude"],
        values: ["User A", "User B", "User C"]
      },
      {
        name: "Team",
        operators: ["Include", "Exclude"],
        values: ["Team A", "Team B", "Team C"]
      },
      {
        name: "State",
        operators: ["Equals", "Contains", "Does Not Contain"],
        values: ["New", "In Progress", "Done"]
      },
      {
        name: "ID",
        operators: ["Equals", "Start With", "Ends With"],
        values: ["1100", "1101", "1102", "1103", "1104"]
      }
    ]
  }
];

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App criterias={appState} />
  </StrictMode>,
  rootElement
);
