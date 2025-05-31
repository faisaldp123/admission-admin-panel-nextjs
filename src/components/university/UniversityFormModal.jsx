import { Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { updateUniversityById } from '@/helper/api/university';
import { DropDownCoursesData } from "@/constant/dropdownData";
import { Controller } from "react-hook-form";

const UniversityFormModal = ({ form, selectedUniversity, onClose }) => {
    const { register, handleSubmit, formState, reset, watch } = form;
    const { errors } = formState;
    const [selectedCourse, setSelectedCourse] = useState(selectedUniversity?.course || "");
    const [filteredSpecializations, setFilteredSpecializations] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // If a new file is selected, include it
            if (selectedFile) {
                formData.append("bannerFile", selectedFile);
            }

            await updateUniversityById(selectedUniversity._id, formData);
            alert("University updated successfully");
            onClose();
        } catch (err) {
            console.error("Update error:", err);
            alert("Update failed. Check console.");
        }
    };

    useEffect(() => {
        if (selectedUniversity) {
            reset(selectedUniversity);
        }
    }, [selectedUniversity, reset]);

    useEffect(() => {
        if (selectedUniversity?.course) {
            setSelectedCourse(selectedUniversity.course);
            const foundSpecs = DropDownCoursesData.flatMap(cat => cat.subCourses || [])
                .find(sub => sub.name === selectedUniversity.course)?.specialization || [];
            setFilteredSpecializations(foundSpecs);
        }
    }, [selectedUniversity]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '16px',
                marginTop: '10px',
                marginBottom: '10px',
            }}>
                <Stack spacing={2} style={{ flexGrow: 1 }}>
                    {/* Preview */}
                    {selectedFile ? (
    <div style={{ width: 100, height: 50, overflow: "hidden", borderRadius: 8, border: "1px solid #ccc" }}>
        <img
            src={URL.createObjectURL(selectedFile)}
            alt="Banner Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
    </div>
) : watch("banner") ? (
    <div style={{ width: 100, height: 50, overflow: "hidden", borderRadius: 8, border: "1px solid #ccc" }}>
        <img
            src={watch("banner")}
            alt="Banner Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
    </div>
) : null}
                    <TextField
                        label="Banner Image URL"
                        {...register("banner")}
                        error={!!errors.banner}
                        helperText={errors.banner?.message}
                    />

                    {/* File Upload */}
                    <input
    type="file"
    accept="image/*"
    onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Reset the banner URL since we're now using a file
            reset({ ...watch(), banner: "" });
        }
    }}
    style={{ marginTop: "10px" }}
/>

                    <TextField
                        label="Name"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    {/* Course Dropdown */}
                    <Controller
                        name="course"
                        control={form.control}
                        defaultValue={selectedUniversity?.course || ""}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>Course</InputLabel>
                                <Select
                                    {...field}
                                    value={selectedCourse}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value);
                                        setSelectedCourse(value);
                                        const matched = DropDownCoursesData
                                            .flatMap((cat) => cat.subCourses || [])
                                            .find(sub => sub.name === value)?.specialization || [];
                                        setFilteredSpecializations(matched);
                                    }}
                                    label="Course"
                                >
                                    {DropDownCoursesData.flatMap((item) => item.subCourses || []).map((item, idx) => (
                                        <MenuItem key={idx} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />

                    {/* Specialization Dropdown */}
                    <Controller
                        name="specialization"
                        control={form.control}
                        defaultValue={selectedUniversity?.specialization || ""}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>Specialization</InputLabel>
                                <Select {...field} label="Specialization">
                                    {filteredSpecializations.map((spec, idx) => (
                                        <MenuItem key={idx} value={spec.name}>
                                            {spec.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />

                    {/* More fields */}
                    <TextField label="Ranking" {...register("ranking")} />
                    <TextField label="Slug" {...register("slug")} />
                    <TextField label="Title" {...register("title")} />
                    <TextField label="Location" {...register("location")} />
                    <TextField label="Entrance" {...register("entrance")} />
                    <TextField label="Course Duration" {...register("course_duration")} />
                </Stack>
            </div>

            <Stack direction="row" spacing={2} style={{ marginTop: '20px' }}>
                <Button type="submit" variant="contained">Update</Button>
                <Button onClick={onClose} variant="outlined">Cancel</Button>
            </Stack>
        </form>
    );
};

export default UniversityFormModal;
