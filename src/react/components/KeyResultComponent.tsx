import React, {ReactNode} from 'react';

class KeyResultComponent extends React.Component<{description: string}, {}>  {
  render(): ReactNode {
    return (
        <p>{this.props.description}</p>
    );
  }
}

export default KeyResultComponent;