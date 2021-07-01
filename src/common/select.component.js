import { Component } from "react";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 1
    };
  }
  render() {
    const {
      name, 
      setSelectedValues, 
      disabled, 
      params,
      selectedField
    } = this.props;
    return (
      <select
          name={name}
          className="form-select"
          defaultValue={{ value: 0 }}
          onChange={setSelectedValues}
          disabled={disabled}
        >
          {name === "field" && selectedField === null && <option value="0">{name}</option> || 
          name !== "field" && !params.length && selectedField !== null && <option value="0">{name}</option>} ||
          {params &&
            params.map((value, index) => {
              return (
                <option value={index} key={index}>
                  {value}
                </option>
              );
            })}
        </select>
    );
  }
}
