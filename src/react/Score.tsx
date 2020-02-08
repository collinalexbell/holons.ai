/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {ReactNode} from 'react';
import State from './State'
import {connect} from "react-redux";

const scoreIconDiameter = '10px';


const scoreValueStyle = {
  display: 'inline'
};

class ScoreComponent extends React.Component<{score: number}, {}> {
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
  render(): ReactNode {
    return (
        <div className={`score-component ${this.scoreEvaluationClass()}`}>
          <div className='score-icon' css={this.scoreIconStyle()} />
          <div className='score-value' css={scoreValueStyle}>{this.props.score}</div>
        </div>
    );
  };
}

const ScoreComponentModules  = {
  mapStateToProps: (state: State, ownProps: {id: number}): {score: number} => {
    return {
      score: state.KeyResults[ownProps.id].score
    }
  },
  mapDispatchToProps: (): {} => {
    return {};
  }
};

const Score = connect(
    ScoreComponentModules.mapStateToProps,
    ScoreComponentModules.mapDispatchToProps
)(ScoreComponent);

export {ScoreComponent, Score}
