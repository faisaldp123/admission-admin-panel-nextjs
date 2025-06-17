import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  TableContainer,
  Chip,
  Button,
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { getUsers } from '@/helper/api/users';


const Students = () => {
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10
  })
  const {page, pageSize} = filter;
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([]);
  

  
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [passengersList, setPassengersList] = useState([
    {
      name: "faijan",
      password: "9191919191",
      role: "admin",
      email: "test1@gmail.com",
      status: "INACTIVE",
      id: 1
    },
    {
      name: "faijan 1",
      password: "9191919191",
      role: "superadmin",
      email: "test1@gmail.com",
      status: "ACTIVE",
      
      id: 2
    },
    {
      name: "faijan 2",
      password: "9191919191",
      role: "admin",
      email: "test1@gmail.com",
      status: "ACTIVE",
      
      id: 3
    },
    {
      name: "faijan 3",
      password: "9191919191",
      role: "superadmin",
      email: "test1@gmail.com",
      status: "INACTIVE",
      
      id: 4
    },
    {
      name: "faijan 4",
      password: "9191919191",
      role: "admin",
      email: "test1@gmail.com",
      status: "ACTIVE",
      
      id: 5
    }
  ]);
  const [passengersCount, setPassengersCount] = useState(5);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10
  });
  const form = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      status: "",
      managerId: null
    },
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors } = formState;
 
  useEffect(() => {
    
    getData(page, pageSize);
  }, [page, pageSize]);

  const getData = async (page = 1, pageSize = 10) => {
    setIsLoading(true)
    try {
   
        const data = await getUsers({page, pageSize});
        setUsers(data.result)
     
    } catch (error) {
    
      setIsError(true)
    } finally{
      setIsLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const handleCloseModal = () => {
    setModal(false); 
    setSelectedCounsellor(null);
    clearForm()
  }

  const handleEditModal = (manager) => {
   
    setModal(true);
    setSelectedCounsellor(manager);
    reset(manager);
  }

  const handleAddModal = () => {
    setModal(true);
    setSelectedCounsellor(null);
    clearForm()
  }


  function onSubmit(data) {
    console.log(data)
  }

  function clearForm() {
    reset({
      name: "",
      email: "",
      password: "",
      role: "",
      status: "",
      managerId: ""
    })
  }

console.log(users)
  return (
    <>
      <div className="flex justify-between align-middle  mb-5">
        <h2 className='text-3xl'>Users (5)</h2>
        <Button variant='outlined' color='success'  >
          <Link href='/users/form'>Add +</Link>
        </Button>
      </div>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                Email
                </TableCell>
                <TableCell>
                Password
                </TableCell>
                <TableCell>
                Role
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => (
                <TableRow
                  sx={{ '& > *': { borderBottom: 'unset' } }}
                  hover

                  tabIndex={-1}
                  key={row.id}
                >

                  <TableCell>
                    {row.name}
                  </TableCell>

                  
                  <TableCell>
                    {row.email}
                  </TableCell>

                  <TableCell>
                    {row.password}
                  </TableCell>

                  <TableCell>
                    {row.role}
                  </TableCell>


                  <TableCell>
                    {
                        row.status == 1 ? <Chip label={"active"} color={"success"} variant="outlined" /> : <Chip label={"inactive"} color={"error"} variant="outlined" />
                    }
                    

                  </TableCell>
                  <TableCell>
                    <Button >
                    <Link href={`/users/form?id=${row.user_id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>

              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            onPageChange={handlePageChange}
            page={controller.page}
            count={passengersCount}
            rowsPerPage={controller.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Card>
      <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Counsellor
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default Students;




