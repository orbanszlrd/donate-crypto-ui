import { CgSpinner } from 'react-icons/cg';

import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <CgSpinner className="spinner" />
    </div>
  );
};

export default Loader;
