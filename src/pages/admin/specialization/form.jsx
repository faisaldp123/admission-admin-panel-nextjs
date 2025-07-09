import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AddOrUpdateSpecializationForm() {
  const router = useRouter();
  const { id } = router.query;

  const { register, handleSubmit, control, reset } = useForm();
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      fetchSpecialization(id);
    } else {
      setIsReady(true); // form ready for "add"
    }
  }, [id]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/course`);
      setCourses(res.data || []);
    } catch (err) {
      console.error('❌ Failed to fetch courses:', err.message);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/universities`);
      setUniversities(res.data || []);
    } catch (err) {
      console.error('❌ Failed to fetch universities:', err.message);
    }
  };

  const fetchSpecialization = async (specId) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/specialization/${specId}`);
      const data = res.data;

      reset({
  name: data?.name ?? '',
  courseId: data?.course?._id ?? data?.course ?? '',
  universityId: data?.university?._id ?? data?.university ?? '',
  image1: data?.image1 ?? '',
  image2: data?.image2 ?? '',
  image3: data?.image3 ?? '',
  contentHtml: data?.contentHtml ?? '',

  // SEO Fields (updated)
  metaTitle: data?.metaTitle ?? '',
  metaDescription: data?.metaDescription ?? '',
  canonicalUrl: data?.canonicalUrl ?? '',

  ogTitle: data?.ogTitle ?? '',
  ogDescription: data?.ogDescription ?? '',
  ogImage: data?.ogImage ?? '',

  twitterCard: data?.twitterCard ?? '',
  twitterTitle: data?.twitterTitle ?? '',
  twitterDescription: data?.twitterDescription ?? '',
  twitterImage: data?.twitterImage ?? ''
});

      setIsReady(true);
    } catch (err) {
      console.error('❌ Failed to load specialization:', err.message);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isUpdate) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/specialization/${id}`, data);
        alert('Specialization updated successfully!');
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/specialization`, data);
        alert('Specialization added successfully!');
      }

      router.push(`/admin/specialization`);
    } catch (err) {
      console.error('❌ Save failed:', err.message);
      alert('Failed to save specialization.');
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) return <p className="p-4">Loading form...</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{isUpdate ? 'Update' : 'Add'} Specialization</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Meta Fields */}
        <div className="col-span-2"><label>Meta Title</label><input {...register("metaTitle")} className="border p-2 w-full" /></div>
        <div className="col-span-2"><label>Meta Description</label><textarea {...register("metaDescription")} className="border p-2 w-full" rows={2} /></div>
        <div className="col-span-2"><label>Canonical URL</label><input {...register("canonicalUrl")} className="border p-2 w-full" /></div>

        {/* OG Tags */}
        <div className="col-span-2"><h3 className="font-semibold mt-4 mb-2">Open Graph Tags</h3></div>
        <div className="col-span-2"><label>OG Title</label><input {...register("ogTitle")} className="border p-2 w-full" /></div>
        <div className="col-span-2"><label>OG Description</label><textarea {...register("ogDescription")} className="border p-2 w-full" rows={2} /></div>
        <div className="col-span-2"><label>OG Image URL</label><input {...register("ogImage")} className="border p-2 w-full" /></div>

        {/* Twitter Tags */}
        <div className="col-span-2"><h3 className="font-semibold mt-4 mb-2">Twitter Tags</h3></div>
        <div><label>Twitter Card Type</label><input {...register("twitterCard")} className="border p-2 w-full" /></div>
        <div><label>Twitter Title</label><input {...register("twitterTitle")} className="border p-2 w-full" /></div>
        <div className="col-span-2"><label>Twitter Description</label><textarea {...register("twitterDescription")} className="border p-2 w-full" rows={2} /></div>
        <div className="col-span-2"><label>Twitter Image URL</label><input {...register("twitterImage")} className="border p-2 w-full" /></div>

        {/* Main Fields */}
        <div><label>Name</label><input {...register("name", { required: true })} className="border p-2 w-full" /></div>

        <div>
          <label>Course</label>
          <select {...register("courseId", { required: true })} className="border p-2 w-full">
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>University</label>
          <select {...register("universityId", { required: true })} className="border p-2 w-full">
            <option value="">Select University</option>
            {universities.map((u) => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
        </div>

        <div><label>Image 1 URL</label><input {...register("image1")} className="border p-2 w-full" /></div>
        <div><label>Image 2 URL</label><input {...register("image2")} className="border p-2 w-full" /></div>
        <div><label>Image 3 URL</label><input {...register("image3")} className="border p-2 w-full" /></div>

        <div className="col-span-2">
          <label>Content (Rich Text)</label>
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
            {loading ? (isUpdate ? 'Updating...' : 'Adding...') : (isUpdate ? 'Update' : 'Add')}
          </button>
        </div>
      </form>
    </>
  );
}
