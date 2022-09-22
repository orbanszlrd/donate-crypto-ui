import { FunctionComponent } from 'react';

import './Error.css';

type ErrorProps = {
  message: string;
};

const Error: FunctionComponent<ErrorProps> = ({ message }) => {
  return <div className="Error">{message}</div>;
};

export default Error;
