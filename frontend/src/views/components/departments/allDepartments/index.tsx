import React, { useState } from "react";
import Header from "src/views/components/departments/Header";
import UserList from "src/views/components/departments/List";
import UserCard from "src/views/components/departments/Card";

const AllDepartments: React.FC = () => {
  const [display, setDisplay] = useState<boolean>(true);
  const [filter, setFilter] = useState<string | undefined>();
  const handleViewChange = (childState: boolean) => {
    setDisplay(childState);
  };

  const handleSearch = (childState: string) => {
    setFilter(childState);
  };

  return (
    <>
      <Header searchData={handleSearch} displayChange={handleViewChange} />
      {display ? <UserList searchData={filter} /> : <UserCard searchData={filter} />}
    </>
  );
};

export default AllDepartments;
