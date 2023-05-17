import React, { useState } from "react";
import Header from "src/views/components/departments/Header";
import UserList from "src/views/components/departments/List";
import UserCard from "src/views/components/departments/Card";

const AllDepartments: React.FC = () => {
  const [display, setDisplay] = useState(true);
  const handleViewChange = (childState: any) => {
    if (childState === true) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  return (
    <>
      <Header displayChange={handleViewChange} />
      {display ? <UserList /> : <UserCard />}
    </>
  );
};

export default AllDepartments;
