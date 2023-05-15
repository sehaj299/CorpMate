<<<<<<< HEAD
import React from "react";
import InvoiceList from "src/pages/dashboard/departments/components/List";
import Link from "next/link";

function Departments() {
  const handleOnclick = () => [];

  return (
    <div>
      <InvoiceList />
    </div>
  );
}

export default Departments;
=======
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';
import { log } from 'console';


const CardSupport = () => {
  const [error, setError] = useState<Error | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        axios.get("http://localhost:1337/api/departments")
         .then((response) =>setDepartments(response.data.data))
         console.log(departments);

        // const token = localStorage.getItem('jwt'); // Get JWT token from localStorage
        // const response = await axios.get('http://localhost:1337/api/departments', {
        //   // headers: {
        //   //   Authorization: `Bearer ${token}`, // Set Authorization header with JWT token
        //   // },
        // });
        // console.log("'''''''''''''''"+response.data.data);
        // console.log("................."+response.data.data.attributes);
        // setDepartments(response.data);
        setIsLoading(false);
      } catch (error) {
  console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {departments.length > 0 ? (
        departments.map((item) => (
          <Card key={item.id} style={{ margin: 80 }}>
            <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar skin="light" sx={{ width: 76, height: 76, mb: 2 }}>
                <Icon icon='mdi:help-circle-outline' fontSize='2rem' />
              </CustomAvatar>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {item.attributes.departmentname}
              </Typography>
              {/* <Typography variant="body2" sx={{ mb: 6.5 }}>
                {item.attributes.email}
              </Typography> */}
              <Button variant="contained" sx={{ p: (theme) => theme.spacing(1.75, 5.5) }}>
                Contact Now
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No departments found</div>
      )}
    </div>
  );
};

export default CardSupport;
>>>>>>> c49b22576328fee20b3717c3ae6e202f917800a7
