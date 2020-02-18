import React, {ReactNode} from "react";
import ObjectiveModel from "../common/Objective";
import {Objective} from './Objective';
import {Objectives, State} from "./State";
import {connect} from "react-redux";

interface OkrComponentProps {objectives: Objectives}
class OkrListComponent extends React.Component<OkrComponentProps, {}> {
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
      <ul>
        {this.getObjectives()}
      </ul>
    );
  }
}

class ContainerMethods {
  static mapStateToProps = (state: State): {objectives: Objectives} => {
    console.log(state);
    return {objectives: state.Objectives}
  };

  static mapDispatchToProps: {} = () => {
    return {};
  };
}

const OkrList = connect<OkrComponentProps, {}, {}, State>(
    ContainerMethods.mapStateToProps,
    ContainerMethods.mapDispatchToProps
)(OkrListComponent);

export default OkrList;