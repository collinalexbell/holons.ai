/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ChangeEvent, ReactNode, KeyboardEvent} from 'react';
import {State} from './State'
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {updateKeyResultScore} from "./redux/KeyResultsReducer";

const scoreIconDiameter = '10px';


const scoreValueStyle = {
  display: 'inline'
};

interface DispatchProps {
  updateScore: (score: number) => void;
}

interface ScoreComponentProps extends DispatchProps{
  score: number;
}
class ScoreComponent extends React.Component<ScoreComponentProps, {editingScore: boolean; tmpValue: string}> {
  constructor(props: ScoreComponentProps) {
    super(props);
    this.state = {editingScore: false, tmpValue: ''};
    this.editScore = this.editScore.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.scoreInputHandler = this.scoreInputHandler.bind(this);
  }

  editScore(): void {
    this.setState({editingScore: true, tmpValue: this.props.score.toString()});
  }

  scoreInputHandler(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({editingScore: true, tmpValue: event.target.value})
  }


  handleEnter(event: KeyboardEvent<HTMLInputElement>): void {
    if(event.key === "Enter") {
      this.setState({editingScore: false});
      this.props.updateScore(parseFloat(event.currentTarget.value));
    }
  }

  isFailing(): boolean {
    return this.props.score < 0.4;
  }
  isMiddling(): boolean {
    return this.props.score < 0.7 && !this.isFailing();
  }
  isPassing(): boolean {
    return !this.isMiddling() && !this.isFailing();
  }
  scoreIconStyle(): DOMStringMap {
    const background = (): string => {
      if (this.isFailing()) return 'red';
      if (this.isMiddling()) return 'yellow';
      if (this.isPassing()) return 'green';
      return '';
    };

    return {
      borderRadius: '50%',
      height: scoreIconDiameter,
      width: scoreIconDiameter,
      background: background(),
      display: 'inline-block',
      marginRight: '2px'
    };
  };

  scoreEvaluationClass(): string {
    if (this.isFailing()) return 'score-failing' ;
    if (this.isMiddling()) return 'score-middling';
    if (this.isPassing())  return 'score-passing';
    return '';
  }

  renderScoreValue(): ReactNode{
    if(this.state.editingScore){
      return (
          <input className='score-value'
                 autoFocus={true}
                 css={scoreValueStyle}
                 value={this.state.tmpValue}
                 onChange={this.scoreInputHandler}
                 onKeyDown={this.handleEnter}
          />
      );
    } else {
      return (
          <div className='score-value'
               onClick={this.editScore}
               css={scoreValueStyle}
          >
            {this.props.score}
          </div>
      );
    }
  }

  render(): ReactNode {
    return (
        <div className={`score-component ${this.scoreEvaluationClass()}`}>
          <div className='score-icon' css={this.scoreIconStyle()} />
          {this.renderScoreValue()}
        </div>
    );
  };
}

export enum ScoreLocation {Objective, KeyResult}

interface OwnProps {
  id: number;
  parentType: ScoreLocation;
}

const ScoreComponentModules  = {
  mapStateToProps: (state: State, ownProps: OwnProps): {score: number} => {
    let sourceList;
    switch (ownProps.parentType) {
      case ScoreLocation.KeyResult:
        sourceList = state.KeyResults;
        break;
      default:
        return {score: 0};
    }
    return {
      score: sourceList[ownProps.id].score()
    }
  },
  mapDispatchToProps: (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => {
    return {
      updateScore: (score: number): void => {
        updateKeyResultScore(dispatch, ownProps.id, score);
      }
    };
  }
};

const Score = connect<{score: number}, DispatchProps, OwnProps, State>(
    ScoreComponentModules.mapStateToProps,
    ScoreComponentModules.mapDispatchToProps
)(ScoreComponent);

export {ScoreComponent, Score}
