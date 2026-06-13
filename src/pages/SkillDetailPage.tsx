import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSkillStore, Skill } from '../store/skillStore'; // Assuming skillStore exists
import { formatDetailedSkillDate } from '../utils/dateHelpers';
import { toast } from 'react-hot-toast';
import { Edit, Trash2, ArrowLeft } from 'lucide-react'; // Lucide icons

export function SkillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { skills, deleteSkill } = useSkillStore(); // Removed fetchSkillById as it's not used for mock data
  const skill = skills.find((s) => s.id === id);

  // In a real application, you would fetch the skill from an API here
  // useEffect(() => {
  //   if (id && !skill) {
  //     // fetchSkillById(id); // Example: if fetchSkillById was an async API call
  //   }
  // }, [id, skill, fetchSkillById]);

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm(`Are you sure you want to delete the skill "${skill?.name}"?`)) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        deleteSkill(id);
        toast.success(`Skill "${skill?.name}" deleted successfully!`);
        navigate('/skills');
      } catch (error) {
        toast.error(`Failed to delete skill "${skill?.name}".`);
        console.error('Error deleting skill:', error);
      }
    }
  };

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Skill Not Found</h2>
        <p className="text-gray-600 mb-6">The skill you are looking for does not exist or has been deleted.</p>
        <Link to="/skills" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Skills List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/skills" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="text-lg font-medium">Back to Skills</span>
        </Link>
        <div className="flex gap-3">
          <Link
            to={`/skills/${skill.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
            aria-label={`Edit skill: ${skill.name}`}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            aria-label={`Delete skill: ${skill.name}`}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {skill.name}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {skill.description || 'No description provided.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Skill Details</h2>
            <div className="space-y-2 text-gray-600">
              <p><strong>ID:</strong> <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{skill.id}</span></p>
              <p><strong>Category:</strong> <span className="capitalize">{skill.category || 'Uncategorized'}</span></p>
              <p><strong>Created:</strong> {formatDetailedSkillDate(skill.createdAt)}</p>
              {skill.updatedAt && skill.updatedAt !== skill.createdAt && (
                <p><strong>Last Updated:</strong> {formatDetailedSkillDate(skill.updatedAt)}</p>
              )}
              <p><strong>Author:</strong> {skill.authorId || 'Unknown'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {skill.tags && skill.tags.length > 0 ? (
                skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full transition-colors duration-200 hover:bg-blue-200"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-600 rounded-full">
                  No Tags
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Prompt Template</h2>
          <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono whitespace-pre-wrap break-words border border-gray-200">
            {skill.promptTemplate || 'No prompt template provided.'}
          </pre>
        </div>

        {skill.parameters && Object.keys(skill.parameters).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Parameters</h2>
            <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md border border-gray-200">
              {Object.entries(skill.parameters).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong className="font-mono text-blue-700">{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {skill.exampleUsage && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Example Usage</h2>
            <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono whitespace-pre-wrap break-words border border-gray-200">
              {skill.exampleUsage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
