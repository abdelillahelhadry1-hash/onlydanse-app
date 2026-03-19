export default function InstructorPage({ params }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Instructor {params.id}
      </h1>
      <p className="text-gray-600">Instructor details coming soon.</p>
    </div>
  );
}
