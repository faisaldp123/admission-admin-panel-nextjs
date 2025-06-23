import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  Button,
  Modal,
  Box,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { getUniversities, deleteUniversityById } from '@/helper/api/university';
import UniversityFormModal from '@/components/university/UniversityFormModal';
import axios from 'axios';




// export const getServerSideProps = async (ctx) => {
//   const cookie = ctx.req.headers.cookie || '';

//   try {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-admin-session`, {
//       headers: {
//         Cookie: cookie, // ✅ send cookie manually
//       },
//       withCredentials: true, // ✅ needed to support auth cookies
//     });

//     if (res.status === 200 && res.data.success) {
//       return { props: {} };
//     }
//   } catch (error) {
//     console.error('Auth failed:', error.response?.data || error.message);
//   }

//   return {
//     redirect: {
//       destination: '/admin/adminLogin',
//       permanent: false,
//     },
//   };
// };

const Universities = () => {
  console.log('university page loading..')
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ page: 1, pageSize: 10 });
  const { page, pageSize } = filter;
  const [isLoading, setIsLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [passengersCount, setPassengersCount] = useState(0);
  const [controller, setController] = useState({ page: 0, rowsPerPage: 10 });

  const form = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      course: '',
      specialization: '',
      fee: '',
      ranking: '',
      slug: '',
      title: '',
      location: '',
      entrance: '',
      course_duration: '',
    },
  });

  const { reset } = form;

  const getData = async (page = 1, pageSize = 10) => {
    setIsLoading(true);
    try {
      const data = await getUniversities({ page, pageSize });
      setUniversities(data);
      setPassengersCount(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(page, pageSize);
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this university?');
    if (!confirmDelete) return;

    try {
      await deleteUniversityById(id);
      setUniversities((prev) => prev.filter((item) => item._id !== id));
      setPassengersCount((prev) => prev - 1);
    } catch (error) {
      console.error('Delete failed:', error.response ? error.response.data : error.message);
      alert('Failed to delete university. See console for details.');
    }
  };

  const handlePageChange = (event, newPage) => {
    setController({ ...controller, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({ ...controller, rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  const handleCloseModal = () => {
    setModal(false);
    setSelectedUniversity(null);
    resetForm();
  };

  const handleEditModal = (university) => {
    setModal(true);
    setSelectedUniversity(university);
    reset(university);
  };

  const resetForm = () => {
    reset({
      name: '',
      course: '',
      specialization: '',
      fee: '',
      ranking: '',
      slug: '',
      title: '',
      location: '',
      entrance: '',
      course_duration: '',
    });
  };

  return (
    <>
      <div className="flex justify-between align-middle mb-5">
        <h2 className="text-3xl">Universities ({universities.length})</h2>
        <Button variant="outlined" color="success">
          <Link href="/universities/form">Add +</Link>
        </Button>
      </div>

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
                <TableCell>Logo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell>Rankings</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Entrance</TableCell>
                <TableCell>Course Duration</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {universities.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell>
                    <img src={row.banner} alt={row.banner} width={50} height={50} style={{ borderRadius: '5px' }} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>{row.specialization}</TableCell>
                  <TableCell>{row.fee}</TableCell>
                  <TableCell>{row.ranking}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.entrance}</TableCell>
                  <TableCell>{row.course_duration}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditModal(row)}>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(row._id)}>
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
                )}
      </Card>

      <Modal open={modal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <UniversityFormModal form={form} selectedUniversity={selectedUniversity} onClose={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
};

export default Universities;
