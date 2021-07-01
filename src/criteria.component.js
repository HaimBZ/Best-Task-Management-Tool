  import React, { useState } from "react";
  import Select from "./common/select.component";

  export default function Criteria(props) {
    const {
      id,
      index,
      setCurrentCriteria,
      selectedCriterias,
      setValidation,
      disabled,
      filters,
      removeCriteria,
      applyRules
    } = props;

    const [operators, setOperators] = useState([]);
    const [values, setValues] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [selectedVal, setSelectedVal] = useState(null);

    const fields = [];

    filters.forEach((filter) => {
      // handle field change value
      fields.push(filter.name);
    });

    const setSelectedValues = (e) => {
      e.preventDefault();
      const selectedValue = e.target.value;

      // logic of the choosing a field
      const currentSelectedField = filters.find((filter) => {
        return filter === filters[selectedValue];
      });

      setSelectedField(currentSelectedField);
      setOperators(currentSelectedField.operators);
      setValues(currentSelectedField.values);
      setSelectedOperator(currentSelectedField.operators[0]);
      setSelectedVal(currentSelectedField.values[0]);

      setCurrentCriteria(currentSelectedField);

      setValidation(true);
    };

    const setOperatorsAndValues = (e) => {
      e.preventDefault();
      const selectedValue = e.target.value;
      const selectedFieldName = e.target.name;
      setSelectedOperator(selectedField["operators"][selectedValue]);
      setSelectedVal(selectedField["values"][selectedValue]);

      if (selectedFieldName === "values") {
        // apply ruled only on change val
      }
    } 

    const deleteCriteria = (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeCriteria(index, filters[index]);
    };

    return (
      <ul className="list-group list-group-horizontal">
        {
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={deleteCriteria}
          ></button>
        }
        <li className="list-group-item col-sm-4">
          <Select 
            name="field"
            defaultValue={{ value: 0 }}
            setSelectedValues={setSelectedValues}
            disabled={disabled}
            selectedField={selectedField}
            params={fields}
          />
        </li>
        <li className="list-group-item col-sm-4">
          <Select 
            name="operators"
            defaultValue={{ value: 0 }}
            setSelectedValues={setOperatorsAndValues}
            disabled={disabled}            
            params={operators}
          />
        </li>
        <li className="list-group-item col-sm-4">
          <Select 
            name="values"
            defaultValue={{ value: 0 }}
            setSelectedValues={setOperatorsAndValues}
            disabled={disabled}
            params={values}
          />
        </li>
      </ul>
    );
  }
