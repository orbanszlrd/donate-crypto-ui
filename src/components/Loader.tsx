import { FunctionComponent } from 'react';
import { CgSpinner } from 'react-icons/cg';

import './Loader.css';

const Loader: FunctionComponent<LoaderProps> = ({ title, description }) => {
  return (
    <div className="Loader">
      <section>
        <h3>{title}</h3>
        <div>
          <CgSpinner className="spinner" />
        </div>
        <div>{description}</div>
      </section>
    </div>
  );
};

export default Loader;
