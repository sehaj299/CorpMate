import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import OptionsMenu from 'src/@core/components/option-menu';
import Icon from 'src/@core/components/icon';
import { IconButton } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid';

interface Department {
  id: number;
  attributes: {
    name: string;
  };
}

const CardUser = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const jwt = localStorage.getItem('jwt');
        const response = await axios.get<Department[]>("http://localhost:1337/api/departments", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = response.data.data;
        setDepartments(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDepartments();
  }, []);
  return (
    <Box sx={{ maxWidth: 300 }}>
      <Grid container spacing={2} sx={{width: '100%'}}>
        {departments.length > 0 ? (
          departments.map((department) => (
            <Grid xs={3} item key={department.id}>
              <Card sx={{ position: 'relative', marginBottom: '1rem' }}>
                <Box sx={{ height: 65, bgcolor: '#66b8ff', display: 'flex', justifyContent: 'flex-end' }}>
                  <OptionsMenu
                    options={['Last 28 Days', 'Last Month', 'Last Year']}
                    iconButtonProps={{ size: 'small', className: 'card-more-options' }}
                  />
                  {department.attributes.name && (
                    <Box
                      sx={{
                        top: 40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 50,
                        height: 50,
                        position: 'absolute',
                        borderRadius: '50%',
                        bgcolor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '2rem',
                        border: 1,
                      }}
                    >
                      {department.attributes.name.charAt(0).toUpperCase()}
                    </Box>
                  )}
                </Box>
                <CardContent>
                  <Box
                    sx={{
                      mt: 5.75,
                      mb: 5.25,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ mr: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5">{department.attributes.name}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton>
                      <Icon icon='solar:add-circle-linear' fontSize='2rem' />
                    </IconButton>
                    <Typography variant='h6'>Assign Resources</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item>
            <Typography variant="body2">No departments found</Typography>
          </Grid>
        )}
      </Grid>
</Box>
);
};

export default CardUser;
