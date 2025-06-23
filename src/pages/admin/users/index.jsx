import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Chip,
  TableContainer,
  CircularProgress,
} from '@mui/material';
import { getAllUsers } from '@/helper/api/users';

const Students = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState({ page: 0, rowsPerPage: 10 });

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.result || data); // adjust based on actual structure
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setController((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const paginatedUsers = users.slice(
    controller.page * controller.rowsPerPage,
    controller.page * controller.rowsPerPage + controller.rowsPerPage
  );

  return (
    <>
      <h2 className="text-3xl mb-5">Registered Users ({users.length})</h2>

      <Card>
        {isLoading ? (
          <div className="flex justify-center p-10">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user._id || user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.status === 1 || user.status === 'ACTIVE' ? (
                        <Chip label="Active" color="success" variant="outlined" />
                      ) : (
                        <Chip label="Inactive" color="error" variant="outlined" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={users.length}
              page={controller.page}
              rowsPerPage={controller.rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Card>
    </>
  );
};

export default Students;
