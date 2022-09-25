import { FunctionComponent } from 'react';

import './Error.css';

const Error: FunctionComponent<ErrorProps> = ({ message }) => {
  return <div className="Error">{message}</div>;
};

export default Error;
