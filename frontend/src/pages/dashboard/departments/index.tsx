import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import NoDepartment from "./components/noDepartment";
import WithDepartment from "./components/withDepartment";

interface Department {
  id: number;
  name: string; // Add other attributes here
  companyId: number | null;
  companyName: string | null;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface DepartmentResponse {
  data: Department[];
  meta: any; // Adjust the type if needed
}

const MyComponent = (): JSX.Element => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async (): Promise<void> => {
      try {
        const response: AxiosResponse<DepartmentResponse> =
          await axios.get<DepartmentResponse>(
            "http://localhost:1337/api/departments"
          );
        setDepartments(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array to run effect only on initial mount

  useEffect(() => {
    const fetchDataOnChange = async (): Promise<void> => {
      try {
        const response: AxiosResponse<DepartmentResponse> =
          await axios.get<DepartmentResponse>(
            "http://localhost:1337/api/departments"
          );

        setDepartments(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchDataOnChange();
    }, 5000); // Fetch data every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, [departments]); // Add departments as a dependency to re-run effect on every change

  if (isLoading) {
    // Render loading state or spinner
    return <div>Loading...</div>;
  } else if (departments.length === 0) {
    return <NoDepartment />;
  } else {
    return (
      <>
        {departments.map((department) => (
          <WithDepartment key={department.id} />
        ))}
      </>
    );
  }
};

export default MyComponent;
