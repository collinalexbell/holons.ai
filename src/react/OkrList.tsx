import React, {ReactNode} from "react";
import {Dispatch} from 'redux';
import ObjectiveModel from "../common/Objective";
import {Objective} from './Objective';
import {Objectives, State} from "./State";
import {connect} from "react-redux";
import {addObjectiveAction} from "./redux/ObjectiveReducer";

interface OkrComponentProps {
  objectives: Objectives;
  addObjective: () => void;
}
class OkrListComponent extends React.Component<OkrComponentProps, {}> {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd(): void {
    this.props.addObjective();
  }
  getObjectives(): ReactNode[] {
    return this.props.objectives.map((objective: ObjectiveModel) => {
      return (
          <li key={objective.id}>
            <Objective
                krIds={objective.getKRs().map((kr) => kr.id())}
                id={objective.id}
            />
          </li>
      );
    });
  }
  render(): ReactNode {
    return (
        <div>
          <i
              className="material-icons"
              onClick={this.handleAdd}
          >
            add
          </i>
          <ul>
            {this.getObjectives()}
          </ul>
        </div>
    );
  }
}

class ContainerMethods {
  static mapStateToProps = (state: State): {objectives: Objectives} => {
    console.log(state);
    return {objectives: state.Objectives}
  };

  static mapDispatchToProps = (dispatch: Dispatch): {addObjective: () => void} => {
    return {
      addObjective: () => dispatch(addObjectiveAction(new ObjectiveModel( '')))
    };
  };
}

const OkrList = connect<{objectives: Objectives}, {addObjective: () => void}, {}, State>(
    ContainerMethods.mapStateToProps,
    ContainerMethods.mapDispatchToProps
)(OkrListComponent);

export default OkrList;