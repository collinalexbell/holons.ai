/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';
import {Score} from "./Score";
import {connect} from "react-redux";
import {State} from "./State";
import KeyResultModel from "../common/KeyResult";

const keyResultDescriptionTextStyle = {display:'inline'};

class KeyResultComponent extends React.Component<{id: number; description: string; score: number}, {}>  {
  render(): ReactNode {
    return (
        <div className="key-result-description">
          <div className="key-result-description-text" css={keyResultDescriptionTextStyle}>
            {this.props.description}
          </div>
          <Score id={this.props.id}/>
        </div>
    );
  }
}

interface KeyResultContainerProps {
  id: number;
}

class KeyResultContainerMethods {
  static mapStateToProps = (state: State, ownProps: KeyResultContainerProps): KeyResultModel => {
    return Object.assign({}, state.KeyResults[ownProps.id]);
  };

  static mapDispatchToProps: {} = () => {
    return {};
  };
}

const KeyResult = connect<KeyResultModel, {}, KeyResultContainerProps, State>(
    KeyResultContainerMethods.mapStateToProps,
    KeyResultContainerMethods.mapDispatchToProps
)(KeyResultComponent);

export {KeyResultContainerMethods, KeyResultComponent, KeyResult}

