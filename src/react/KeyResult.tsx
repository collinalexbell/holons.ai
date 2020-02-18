/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';
import {ScoreLocation, Score} from "./Score";
import {connect} from "react-redux";
import {State} from "./State";

const keyResultDescriptionTextStyle = {display:'inline'};

interface KeyResultComponentProps {
  id: number;
  description: string;
  score: number;
}
class KeyResultComponent extends React.Component<{id: number; description: string; score: number}, {}>  {
  render(): ReactNode {
    return (
        <div className="key-result-description">
          <div className="key-result-description-text" css={keyResultDescriptionTextStyle}>
            {this.props.description}
          </div>
          <Score id={this.props.id} parentType={ScoreLocation.KeyResult}/>
        </div>
    );
  }
}

interface KeyResultContainerProps {
  id: number;
}

class KeyResultContainerMethods {
  static mapStateToProps = (state: State, ownProps: KeyResultContainerProps): KeyResultComponentProps => {
    const kr = state.KeyResults[ownProps.id];
    return {id: kr.id(), description: kr.description(), score: kr.score()};
  };

  static mapDispatchToProps: {} = () => {
    return {};
  };
}

const KeyResult = connect<KeyResultComponentProps, {}, KeyResultContainerProps, State>(
    KeyResultContainerMethods.mapStateToProps,
    KeyResultContainerMethods.mapDispatchToProps
)(KeyResultComponent);

export {KeyResultContainerMethods, KeyResultComponent, KeyResult}

