import {KeyResult} from "./KeyResult";
import React, {ReactNode} from "react";
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import ObjectiveModel from "../common/Objective"
import {State} from "./State";
import {TextEditable} from "./TextEditable";
import {editObjectiveDescriptionAction} from "./redux/ObjectiveReducer";

interface ObjectiveComponentProps {
  description: string;
  krIds: number[];
  hideKRs?: boolean;
  editDescription: (newDescription: string) => void;
}
class ObjectiveComponent extends React.Component<ObjectiveComponentProps, {hideKRs: boolean}> {
  constructor(props: ObjectiveComponentProps) {
    super(props);
    this.hideKeyResults = this.hideKeyResults.bind(this);
    this.showKeyResults = this.showKeyResults.bind(this);
    this.state = {hideKRs: props.hideKRs ? props.hideKRs : false}
  }

  componentCSS = {paddingBottom: '20px'};
  objectiveLabelCSS = {display:'inline'};
  descriptionCSS = {display:'inline'};
  toggleCSS = {display:'inline', position:'relative' as 'relative', left:'3px', top:'5px'};

  hideKeyResults(): void {
    this.setState({hideKRs: true})
  }

  showKeyResults(): void {
    this.setState({hideKRs: false})
  }

  keyResultComponents(): ReactNode[] {
    return this.props.krIds.map((krId) => <KeyResult id={krId} key={krId}/>);
  };

  renderKeyResultToggle(): ReactNode {
    if(!this.state.hideKRs) {
      return(
          <i className='material-icons hide-key-result-visibility-toggle'
             onClick={this.hideKeyResults}
              style={this.toggleCSS}
          >
            visibility_off
          </i>
      );
    } else {
      return(
          <i className='material-icons show-key-result-visibility-toggle'
             onClick={this.showKeyResults}
             style={this.toggleCSS}
          >
            visibility
          </i>
      );
    }
  }

  renderKeyResultList(): ReactNode {
    if(!this.state.hideKRs) {
      return (
          <div style={{display: 'inline'}}>
            <ul className={'keyResults'}>
              {this.keyResultComponents()}
              <i className="material-icons" style={{position: 'relative', left:'-30px', top:'6px'}}> add </i>
            </ul>
          </div>
      );
    } else {
      return null;
    }
  }

  render(): ReactNode {
    return (
        <div style={this.componentCSS}>
          <div style={this.objectiveLabelCSS}>Objective:</div>
          <TextEditable
              style={this.descriptionCSS}
              className={'description'}
              onChange={this.props.editDescription}
          >
            {this.props.description}
          </TextEditable>
          <div style={{display: 'block'}}>
            Key Results:
            {this.renderKeyResultToggle()}
            {this.renderKeyResultList()}
          </div>
        </div>
    );
  }
}

interface ObjectiveContainerProps {
  id: number;
}

class ObjectiveContainerMethods {
  static mapStateToProps = (state: State, ownProps: ObjectiveContainerProps): ObjectiveModel => {
    const objective =  state.Objectives[ownProps.id];
    return Object.assign({}, objective, objective.getKRs());
  };

  static mapDispatchToProps = (dispatch: Dispatch, ownProps: ObjectiveContainerProps): {editDescription: (a: string) => void} => {
    return {
      editDescription: (newDescription: string) => dispatch(editObjectiveDescriptionAction(ownProps.id, newDescription))
    };
  };
}

const Objective = connect<ObjectiveModel, {editDescription: (a: string) => void}, ObjectiveContainerProps, State>(
    ObjectiveContainerMethods.mapStateToProps,
    ObjectiveContainerMethods.mapDispatchToProps
)(ObjectiveComponent);


export {ObjectiveComponent, Objective}

