import Typography from '@mui/material/Typography';

const DisplayErrorMessage = ({ msg }) => {
  if (!msg) return null;

  return (
    <Typography variant="body2" color="error">
      {msg}
    </Typography>
  );
};

export default DisplayErrorMessage;
