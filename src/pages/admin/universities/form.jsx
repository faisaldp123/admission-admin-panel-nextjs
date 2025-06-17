// pages/users/form.js
import { useForm, Controller } from "react-hook-form";
import {
  Container, Typography, TextField, Button, Stack,
  FormControl, Select, InputLabel, MenuItem, Grid
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { DropDownCoursesData } from "@/constant/dropdownData";
import { useState } from "react";

export default function AddUniversityForm() {
  const router = useRouter();
  const { register, handleSubmit, control, watch } = useForm();
  const [bannerFile, setBannerFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const courseList = DropDownCoursesData.flatMap(i => i.subCourses || []);

  const handleCourseChange = e => {
    const courseName = e.target.value;
    setSelectedCourse(courseName);
    const specs = courseList.find(c => c.name === courseName)?.specialization || [];
    setFilteredSpecializations(specs);
  };

  const onSubmit = async data => {
    const formData = new FormData();
    // append text fields
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val);
    });
    // append the file under the same name your backend expects
    if (bannerFile) formData.append('bannerFile', bannerFile);

    try {
      setUploading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/universities`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('University added successfully!');
      router.push('/universities');
    } catch (err) {
      console.error(err);
      alert('Failed to add university');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom><strong>Add New University</strong></Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',  // Allow scroll if content exceeds 80% of the viewport height
            overflowY: 'auto',
            padding: '16px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
        <Grid container spacing={2} mb={3}>
          {/* file input + preview */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth disabled={uploading}>
              {uploading ? 'Uploading…' : 'Select Banner Image'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={e => setBannerFile(e.target.files[0])}
              />
            </Button>
            {bannerFile && (
              <img
                src={URL.createObjectURL(bannerFile)}
                alt="Banner Preview"
                style={{ width: '100%', maxHeight: 100, objectFit: 'cover', marginTop: 8, borderRadius: 4 }}
              />
            )}
          </Grid>

          {/* You can still register `banner` if you want to store a manually entered URL */}
          <Grid item xs={12}>
            <TextField label="Banner URL (optional)"
              {...register("banner")}
              fullWidth />
          </Grid>

          {/* other fields */}
          <Grid item xs={12}><TextField fullWidth label="Name" {...register("name")} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Title" {...register("title")} /></Grid>

          <Grid item xs={12}>
            <Controller name="course" control={control} defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Course</InputLabel>
                  <Select
                    {...field}
                    value={selectedCourse}
                    label="Course"
                    onChange={e => {
                      field.onChange(e);
                      handleCourseChange(e);
                    }}
                  >
                    {courseList.map((c, i) => (
                      <MenuItem key={i} value={c.name}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller name="specialization" control={control} defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Specialization</InputLabel>
                  <Select {...field} label="Specialization">
                    {filteredSpecializations.map((s, i) => (
                      <MenuItem key={i} value={s.name}>{s.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}><TextField fullWidth label="Fee" {...register("fee")} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Ranking" {...register("ranking")} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Slug" {...register("slug")} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Location" {...register("location")} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Entrance" {...register("entrance")} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Course Duration" {...register("course_duration")} /></Grid>
        </Grid>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={uploading}
        >
          {uploading ? 'Saving...' : 'Please Add University'}
        </Button>
      </form>
    </Container>
  );
}
