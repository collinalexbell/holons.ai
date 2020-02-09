import {KeyResult} from "./KeyResult";
import React, {ReactNode} from "react";

interface ObjectiveComponentProps {
  description: string; krIds: number[]; hideKRs?: boolean;
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
          <div style={this.descriptionCSS} className={'description'}>{this.props.description}</div>
          <div style={{display: 'block'}}>
            Key Results:
            {this.renderKeyResultToggle()}
            {this.renderKeyResultList()}
          </div>
        </div>
    );
  }
}

export {ObjectiveComponent}

