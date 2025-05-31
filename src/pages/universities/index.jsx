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
import { getUniversities, deleteUniversityById, updateUniversityById } from '@/helper/api/university';
import UniversityFormModal from '@/components/university/UniversityFormModal';


const Universities = () => {
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10
  })
  const {page, pageSize} = filter;
  const [isLoading, setIsLoading] = useState(false)
  const [universities, setUniversities] = useState([]);
  

  
  const [selectedUniversity, setSelectedUniversity] = useState(null);
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
        course: "",
        specialization: "",
        fee: "",
        ranking: "",
        slug: "",
        title: "",
        location: "",
        entrance: "",
        course_duration: ""
    },
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors } = formState;
 
  useEffect(() => {
    
    getData(page, pageSize);
  }, [page, pageSize]);

  const getData = async (page = 1, pageSize = 10) => {
    setIsLoading(true);
    try {
      const data = await getUniversities({ page, pageSize });
      console.log("Fetched universities:", data); // <-- Check this
      setUniversities(data);
      console.log("Set universities:", data);
      setPassengersCount(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch universities:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this university?");
    if (!confirmDelete) return;
  
    try {
      await deleteUniversityById(id);
      setUniversities((prev) => prev.filter((item) => item._id !== id));
      setPassengersCount((prev) => prev - 1);
    } catch (error) {
      console.error("Delete failed:", error.response ? error.response.data : error.message);
      alert("Failed to delete university. See console for details.");
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
    setSelectedUniversity(null);
    clearForm();
  }
  
  const handleEditModal = (university) => {
    setModal(true);
    setSelectedUniversity(university);
    reset(university);
  }


  function clearForm() {
    reset({
      name: "",
      course: "",
      specialization: "",
      fee: "",
      ranking: "",
      slug: "",
      title: "",
      location: "",
      entrance: "",
      course_duration: ""
    })
  }

console.log(universities)
  return (
    <>
      <div className="flex justify-between align-middle  mb-5">
        <h2 className='text-3xl'>Universities ({universities.length})</h2>
        <Button variant='outlined' color='success'  >
          <Link href='/universities/form'>Add +</Link>
        </Button>
      </div>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Logo</TableCell>

                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                Course
                </TableCell>
                <TableCell>
                Specialization
                </TableCell>
                <TableCell>
                Fee
                </TableCell>
                <TableCell>
                  Rankings
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                    Location
                </TableCell>
                <TableCell>
                    Entrance
                </TableCell>
                <TableCell>
                    Course Duration
                </TableCell>
                <TableCell>
                    Edit
                </TableCell>
                <TableCell>
                    Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {universities.map((row, index) => (
                <TableRow
                  sx={{ '& > *': { borderBottom: 'unset' } }}
                  hover

                  tabIndex={-1}
                  key={row._id}
                >
                    <TableCell>
  <img src={row.banner} alt={row.banner} width={50} height={50} style={{ borderRadius: '5px' }} />
</TableCell>

                  <TableCell>
                    {row.name}
                  </TableCell>

                  
                  <TableCell>
                    {row.course}
                  </TableCell>

                  <TableCell>
                    {row.specialization}
                  </TableCell>

                  <TableCell>
                    {row.fee}
                  </TableCell>
                  <TableCell>
                    {row.ranking}
                  </TableCell>
                  <TableCell>
                    {row.title}
                  </TableCell>
                  <TableCell>
                    {row.location}
                  </TableCell>
                  <TableCell>
                    {row.entrance}
                  </TableCell>
                  <TableCell>
                    {row.course_duration}
                  </TableCell>


                  {/* <TableCell>
                    {
                        row.status == 1 ? <Chip label={"active"} color={"success"} variant="outlined" /> : <Chip label={"inactive"} color={"error"} variant="outlined" />
                    }
                    

                  </TableCell> */}
                  <TableCell>
                    <Button onClick={() => handleEditModal(row)}>
                    Edit
                    </Button>
                    
                  </TableCell>
                  <TableCell>
                  <Button
      size="small"
      variant="outlined"
      color="error"
      onClick={() => handleDelete(row._id)}
    >
      Delete
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
            <UniversityFormModal
            form={form}
            selectedUniversity={selectedUniversity}
            onClose={handleCloseModal}
            />
        </Box>
      </Modal>
    </>
  )
}

export default Universities;




