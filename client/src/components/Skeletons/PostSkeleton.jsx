import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PostSkeleton = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: '50%', marginBottom: '25px' }} />
      </Skeleton>
    </div>
  );
};

export default PostSkeleton;
