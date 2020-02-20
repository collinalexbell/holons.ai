/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';
import {ScoreLocation, Score} from "./Score";
import {connect} from "react-redux";
import {State} from "./State";
import {editKeyResultDescriptionAction} from "./redux/KeyResultsReducer";
import {Dispatch} from 'redux';
import {TextEditable} from "./TextEditable";

const keyResultDescriptionTextStyle = {display:'inline'};

interface KeyResultComponentProps {
  id: number;
  description: string;
  score: number;
  editDescription: (description: string) => void;
}
class KeyResultComponent extends React.Component<KeyResultComponentProps, {}>  {
  render(): ReactNode {
    return (
        <div className="key-result-description">
          <TextEditable
              className="key-result-description-text"
              style={keyResultDescriptionTextStyle}
              onChange={this.props.editDescription}
          >
            {this.props.description}
          </TextEditable>
          <Score id={this.props.id} parentType={ScoreLocation.KeyResult}/>
        </div>
    );
  }
}

interface KeyResultContainerProps {
  id: number;
}

class KeyResultContainerMethods {
  static mapStateToProps = (state: State, ownProps: KeyResultContainerProps): {id: number; description: string; score: number} => {
    const kr = state.KeyResults[ownProps.id];
    return {id: kr.id(), description: kr.description(), score: kr.score()};
  };

  static mapDispatchToProps = (dispatch: Dispatch, ownProps: KeyResultContainerProps): {editDescription: (a: string) => void} => {
    return {
      editDescription: (newDescription: string) => dispatch(editKeyResultDescriptionAction(ownProps.id, newDescription)),
    };
  };
}

const KeyResult = connect<{id: number; description: string; score: number}, {editDescription: (a: string) => void}, KeyResultContainerProps, State>(
    KeyResultContainerMethods.mapStateToProps,
    KeyResultContainerMethods.mapDispatchToProps
)(KeyResultComponent);

export {KeyResultContainerMethods, KeyResultComponent, KeyResult}

