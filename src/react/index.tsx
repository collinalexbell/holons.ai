import * as React from 'react';
import * as ReactDOM from 'react-dom';
import KeyResultComponent from "./components/KeyResultComponent";

ReactDOM.render(
    <div>
      <KeyResultComponent description="render key result" score={0.5} />
      <KeyResultComponent description="this result is failing" score={0.39} />
    </div>,
    document.getElementById('root'),
);

