import {KeyResult} from "./KeyResult";
import React, {ReactNode} from "react";

class ObjectiveComponent extends React.Component<{description: string; krIds: number[]}, {}> {
  keyResultComponents(): ReactNode[] {
    return this.props.krIds.map((krId) => <KeyResult id={krId} key={krId}/>);
  };

  render(): ReactNode {
    return (
        <div>
          <div className={'description'}>{this.props.description}</div>
          <ul className={'keyResults'}>
            {this.keyResultComponents()}
          </ul>
        </div>
    );
  }
}

export {ObjectiveComponent}

