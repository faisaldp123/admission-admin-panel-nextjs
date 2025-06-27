import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AddSpecializationForm() {
  const { register, handleSubmit, control } = useForm();
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`);
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch courses");
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/universities`);
      setUniversities(res.data || []);
    } catch (err) {
      console.error("Failed to fetch universities");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/specialization`, {
        ...data,
      });
      alert("Specialization added successfully!");
    } catch (err) {
      alert("Failed to add specialization");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Add New Specialization</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Meta Fields */}
        <div className="col-span-2">
          <label className="block mb-1">Meta Title</label>
          <input {...register("metaTitle")} className="border p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Meta Description</label>
          <textarea {...register("metaDescription")} className="border p-2 w-full" rows={2} />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Canonical URL</label>
          <input {...register("canonicalUrl")} className="border p-2 w-full" />
        </div>

        {/* OG Tags */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mt-4 mb-2">Open Graph Tags</h3>
        </div>

        <div className="col-span-2">
          <label className="block mb-1">OG Title</label>
          <input {...register("ogTitle")} className="border p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">OG Description</label>
          <textarea {...register("ogDescription")} className="border p-2 w-full" rows={2} />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">OG Image URL</label>
          <input {...register("ogImage")} className="border p-2 w-full" />
        </div>

        {/* Twitter Tags */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mt-4 mb-2">Twitter Tags</h3>
        </div>

        <div>
          <label className="block mb-1">Twitter Card Type</label>
          <input {...register("twitterCard")} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1">Twitter Title</label>
          <input {...register("twitterTitle")} className="border p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Twitter Description</label>
          <textarea {...register("twitterDescription")} className="border p-2 w-full" rows={2} />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Twitter Image URL</label>
          <input {...register("twitterImage")} className="border p-2 w-full" />
        </div>

        {/* Main Specialization Fields */}
        <div>
          <label className="block mb-1">Name</label>
          <input {...register("name", { required: true })} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1">Course</label>
          <select {...register("courseId", { required: true })} className="border p-2 w-full">
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">University</label>
          <select {...register("universityId", { required: true })} className="border p-2 w-full">
            <option value="">Select University</option>
            {universities.map((u) => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Image 1 URL</label>
          <input {...register("image1")} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Image 2 URL</label>
          <input {...register("image2")} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Image 3 URL</label>
          <input {...register("image3")} className="border p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Content (Rich Text)</label>
          <Controller
            name="contentHtml"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Specialization"}
          </button>
        </div>
      </form>
    </>
  );
}
