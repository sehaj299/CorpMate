import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import AllDepartments from "src/views/components/departments/allDepartments";
import AddDepartment from "src/views/components/departments/addDepartment";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response: AxiosResponse<DepartmentResponse> =
        await axios.get<DepartmentResponse>(
          "http://localhost:1337/api/departments"
        );
      const departmentData = response.data.data;
      setDepartments(departmentData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : departments.length > 0 ? (
        <AllDepartments />
      ) : (
        <AddDepartment />
      )}
    </div>
  );
};

export default MyComponent;
