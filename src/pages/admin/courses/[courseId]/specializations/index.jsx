import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SpecializationsPage() {
  const router = useRouter();
  const { courseId } = router.query; // this is actually slug like "mba"
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) fetchCourseAndSpecializations();
  }, [courseId]);

  const fetchCourseAndSpecializations = async () => {
    try {
      // ✅ Get Course by slug to retrieve ObjectId
      const courseRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/course/slug/${courseId}`);
      const actualCourseId = courseRes.data._id;

      // ✅ Get Specializations using ObjectId
      const specRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/specialization?courseId=${actualCourseId}`);
      setSpecializations(specRes.data);
    } catch (err) {
      console.error("Error fetching:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex justify-end mb-4">
  <Link href="/admin/specialization/form">
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Add Specialization</button>
  </Link>
</div>
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Specializations for {courseId?.toUpperCase()}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : specializations.length === 0 ? (
        <p>No specializations found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">University</th>
              <th className="p-2 border">Course</th>
            </tr>
          </thead>
          <tbody>
            {specializations.map((spec) => (
              <tr key={spec._id}>
                <td className="p-2 border">{spec.name}</td>
                <td className="p-2 border">{spec.university?.name || 'N/A'}</td>
                <td className="p-2 border">{spec.course?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}
