import { CircularProgress } from '@mui/material';

const TextAreaCircular = ({ length }) => {
  return (
    <div className="post-popup-circle">
      <CircularProgress variant="determinate" value={length / 1.4} />
      {length > 0 && <p>{length}</p>}
    </div>
  );
};

export default TextAreaCircular;
