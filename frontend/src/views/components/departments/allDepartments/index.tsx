import React, { useState } from 'react';
import Header from 'src/views/components/departments/Header';
import List from 'src/views/components/departments/List';

const AllDepartments: React.FC = () => {
  const [ display, setDisplay ] = useState(true)
  const handleViewChange = (childState: any) => {
    if(childState === true) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  return (
    <>
      <Header displayChange={handleViewChange} />
      {display ? <List /> : <h1>Hello</h1>}
    </>
  );
};

export default AllDepartments;
