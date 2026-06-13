import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSkillStore } from '../store/skillStore';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Edit, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SkillDetailPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const getSkillById = useSkillStore((state) => state.getSkillById);
  // const deleteSkill = useSkillStore((state) => state.deleteSkill); // Assuming deleteSkill exists for future tasks

  const skill = skillId ? getSkillById(skillId) : undefined;

  if (!skill) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Helmet>
          <title>Skill Not Found - AgentCraft</title>
          <meta name="description" content="The requested AI skill could not be found." />
        </Helmet>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Skill Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">The skill you are looking for does not exist.</p>
        <Button onClick={() => navigate('/skills')} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    // Implement share functionality (e.g., copy link to clipboard)
    navigator.clipboard.writeText(window.location.href);
    alert('Skill link copied to clipboard!');
  };

  // const handleDelete = () => {
  //   if (window.confirm(`Are you sure you want to delete the skill "${skill.name}"?`)) {
  //     deleteSkill(skill.id);
  //     navigate('/skills');
  //   }
  // };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>{skill.name} - AgentCraft</title>
        <meta name="description" content={skill.description} />
        <meta property="og:title" content={skill.name} />
        <meta property="og:description" content={skill.description} />
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => navigate('/skills')} variant="ghost" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
        </Button>
        <div className="flex space-x-2">
          <Link to={`/skills/${skill.id}/edit`}>
            <Button variant="secondary" className="flex items-center">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </Link>
          <Button onClick={handleShare} variant="secondary" className="flex items-center">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          {/* <Button onClick={handleDelete} variant="destructive" className="flex items-center">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button> */}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">{skill.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{skill.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Category</h2>
          <Tag>{skill.category}</Tag>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {skill.tags.length > 0 ? (
              skill.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
            ) : (
              <span className="text-gray-500 dark:text-gray-400 text-sm">No tags available.</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Prompt Template</h2>
          <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-sm font-mono whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100 overflow-x-auto">
            {skill.prompt}
          </pre>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p>Created: {new Date(skill.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(skill.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;
