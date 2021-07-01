import { Component } from "react";
import _uniqueId from "lodash/uniqueId";
import NavBar from "./common/navbar.component";
import Criteria from "./criteria.component";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: props.criterias[0].filters,
      criterias: props.criterias,
      currentCriteria: null,
      selectedCriterias: [],
      isValid: false
    };
  }

  setCurrentCriteria = (criteria) => {
    this.setState({
      currentCriteria: criteria
    });
  };

  addCriteria = (e) => {
    e.preventDefault();
    const { criterias, isValid } = this.state;

    this.setSelectedCriterias();

    if (criterias.length < 6 && isValid) {
      setTimeout(() => {
        const criteriaArr = criterias;
        criteriaArr.push(this.getFilteredCriteria(criteriaArr[0]));
        this.setState({ criterias: criteriaArr });
      });
    }
  };

  getFilteredCriteria = (criteriaToAdd) => {
    const { selectedCriterias } = this.state;

    const newCriteriaToAdd = criteriaToAdd.filters.filter((filterItem) => {
      return !selectedCriterias.includes(filterItem);
    });

    return { filters: newCriteriaToAdd };
  };

  setSelectedCriterias = () => {
    const { currentCriteria } = this.state;
    const currentSelectedField = currentCriteria;

    this.setState(
      {
        selectedCriterias: [
          ...this.state.selectedCriterias,
          currentSelectedField
        ]
      },
      () => {
        if (
          this.state.criterias.length === this.state.selectedCriterias.length
        ) {
          this.setValidation(false);
        }
      }
    );
  };

  removeCriteria = (indexOfItemToRemove, removedFilter) => {

    // remove current criteria
    // remove current selected criteria
    this.setState(
      (prevState) => ({
        criterias: prevState.criterias.filter((item, index) => index !== indexOfItemToRemove),
        selectedCriterias: prevState.selectedCriterias.filter((item, index) => index !== indexOfItemToRemove)
      }), () => {
        console.log("removedFilter", removedFilter);
        console.log("state criterias", this.state.criterias);
        const { criterias, selectedCriterias } = this.state; 
        criterias[criterias.length-1].filters.push(removedFilter);
        console.log("removedFilter", removedFilter);
        console.log("state criterias", this.state.criterias);
        console.log("criterias", criterias);
        this.setState({
          criterias: criterias
        }, () => {
          console.log("deep state criterias", this.state.criterias);
        })
      });
      
  };

  setValidation = (value) => {
    if (this.state.criterias.length > 5) {
      this.setState({
        isValid: false
      });
    } else {
      this.setState({
        isValid: value
      });
    }
  };

  applyRules = (field, operators, values) => {
    // set rules
  };

  render() {
    const { criterias, isValid, selectedCriterias } = this.state;

    return (
      <div className="container">
        <NavBar />
        <form>
          <div className="criteria-wrapper">
            {criterias.map((criteria, index) => {
              return (
                <Criteria
                  key={index}
                  id={_uniqueId("criteria-")}
                  index={index}
                  setCurrentCriteria={this.setCurrentCriteria}
                  selectedCriterias={selectedCriterias}
                  filters={criteria.filters}
                  setValidation={this.setValidation}
                  removeCriteria={this.removeCriteria}
                  applyRules={this.applyRules}
                  disabled={
                    criterias.length > 1 && criterias.length > index + 1
                  }
                />
              );
            })}
          </div>
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item col-sm-12">
              {isValid && (
                <button
                  className="btn btn-default criteria"
                  onClick={this.addCriteria}
                  disabled={!isValid && criterias.length > 5}
                >
                  + Add Criteria
                </button>
              )}
              {(criterias.length > 5 && (
                <span className="badge bg-danger">
                  no more criterias allowed
                </span>
              )) ||
                (!isValid && (
                  <span className="badge bg-danger">
                    please choose criteria
                  </span>
                ))}
            </li>
          </ul>
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item col-sm-8"></li>
            <li className="list-group-item col-sm-4">
              <button className="btn btn-primary">SEARCH</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
