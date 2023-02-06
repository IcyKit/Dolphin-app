import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProfileCardSkeleton = () => {
  return (
    <section className="profile card-shadow">
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: '30%', borderRadius: '0' }} />
      </Skeleton>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default ProfileCardSkeleton;
