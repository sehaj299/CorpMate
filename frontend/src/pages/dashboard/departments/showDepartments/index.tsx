import { useState, useEffect } from 'react';
import OptionsMenu from 'src/@core/components/option-menu';
import Icon from 'src/@core/components/icon';
import { IconButton, Modal } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import { Theme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ListItemText from '@mui/material/ListItemText'
import Autocomplete from '@mui/material/Autocomplete'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { Ref, forwardRef, ReactElement, MouseEvent, Fragment } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
interface Department {
  id: number;
  attributes: {
    name: string;
  };
}

interface Resource {
  id: number;
  attributes: {
    name: string;
    email: string;
  }
}
interface OptionsType {
   id: number;
  attributes: {
    name: string;
  }
}
  // Add more properties as needed
const CardUser = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [options, setOptions ] = useState<OptionsType[]>([])


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
  const { settings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  // ** Var
  const { direction } = settings

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleOpenPopup = async () => {
    setOpenPopup(true);
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await axios.get<Resource[]>("http://localhost:1337/api/resources", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data.data;
      console.log(data);

      setResources(data);
      setOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };


  return (
    <Box sx={{ display: 'flex', alignItems: 'inherit', justifyContent: 'space-between' }}>
      <Grid container spacing={8} direction="row" xs={12} sm={12} md={12} lg={12}>
        {departments.length > 0 ? (
          departments.map((department) => (
            <Grid item key={department.id} xs={12} sm={6} md={4}>
              <Card sx={{ position: 'relative', marginBottom: '1rem' }}>
                <Box sx={{ height: 65, bgcolor: '#66b8ff', display: 'flex', justifyContent: 'flex-end' }}>
                  <OptionsMenu
                    options={['Edit Department', 'Delete Department']}
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
<IconButton onClick={handleOpenPopup}>
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

  <Modal open={openPopup} onClose={handleClosePopup}>
  <Dialog
        fullWidth
        open={openPopup}
        maxWidth='md'
        scroll='body'
        onClose={() => setOpenPopup(false)}
        // TransitionComponent={Transition}
        onBackdropClick={() => setOpenPopup(false)}
      >

        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>

          <IconButton
            size='small'
            onClick={() => setOpenPopup(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'left'}}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Assign Resources
            </Typography>
          </Box>
          <InputLabel
            htmlFor='add-members'
            sx={{
              mb: 1.5,
              fontWeight: 500,
              lineHeight: '2rem',
              display: 'inline-flex',
              fontSize: ['1.125rem', '1.25rem']
            }}
          >
            Add Resource
          </InputLabel>

           <Autocomplete
            autoHighlight
            sx={{ mb: 8 }}
            id='add-members'
            options={options}
            ListboxComponent={List}
            getOptionLabel={option => option.attributes.name}
            renderInput={params => <TextField {...params} size='small' placeholder='Add Resources...' />}
            renderOption={(props, option) => (
              <ListItem {...props}>
                <ListItemText primary={option.attributes.name} />
              </ListItem>
            )}
          />
          <Typography variant='h6'>{`${resources.length} Resources`}</Typography>
          <List dense sx={{ py: 4 }}>
            {resources.map(member => {
              return (
                <ListItem
                  key={member.id}
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    '.MuiListItem-container:not(:last-child) &': { mb: 4 }
                  }}
                >
                     <Box
                      sx={{
                        top: 10,
                        right: '50%',
                        transform: 'translateX(-50%)',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '2rem',
                        border: 1,
                      }}
                    >
                      {member.attributes.name.charAt(0).toUpperCase()}
                    </Box>
                  <ListItemText
                    primary={member.attributes.name}
                    secondary={member.attributes.email}
                    sx={{ m: 0, '& .MuiListItemText-primary, & .MuiListItemText-secondary': { lineHeight: '1.25rem' } }}
                  />
                  <ListItemSecondaryAction sx={{ right: 0 }}>
                    {/* {hidden ? (
                      <IconButton
                        size='small'
                        aria-haspopup='true'
                        // onClick={handleClick}
                        aria-controls='modal-share-examples'
                      >
                        <Icon icon='mdi:chevron-down' fontSize={20} />
                      </IconButton>
                    ) : (
                      <Fragment>
                        <Button
                          color='secondary'
                          aria-haspopup='true'
                          // onClick={handleClick}
                          sx={{ textTransform: 'capitalize' }}
                          aria-controls='modal-share-examples'
                          endIcon={<Icon icon='mdi:chevron-down' fontSize={20} />}
                        >
                          {/* {member.value} */}
                        {/* </Button>
                      </Fragment> */}
                    {/* )} */}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon icon='mdi:account-multiple-outline' fontSize='1.25rem' />
              {/* <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {`Public to ${themeConfig.templateName} - Pixinvent`}
              </Typography> */}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
  </Modal>
</Box>
);
};

export default CardUser;
