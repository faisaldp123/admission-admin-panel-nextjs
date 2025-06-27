import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";
import { createSpecialization } from "@/api/specialization";

const specializationForm = ({ selectedCourseId, universityId, onSuccess }) => {

    const [register, handleSubmit] = useForm();
    const [editorContent, setEditorContent] = useState("");

    const onSubmit = async (data) => {
        try {
            await createSpecialization({
                name: data.name,
                image: data.image1,
                courseId: selectedCourseId,
                universityId,
                contentHtml: editorContent,
            });
            alert("Specialization Created!");
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    
  return (
    <form action="">
        <input {...register("name")} placeholder="Specialization Name" required />
        <input {...register("image1")} placeholder="Image Url" />
        <ReactQuill value={editorContent} onChange={setEditorContent}/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default specializationForm