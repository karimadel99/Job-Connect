import React, { useState, useRef } from 'react';

const SkillsList = ({ field, form }) => {
  const [skillName, setSkillName] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const inputRef = useRef(null);
  
  const handleSkillRemove = (index) => {
    const newSkills = [...field.value];
    newSkills.splice(index, 1);
    form.setFieldValue(field.name, newSkills);
  };
  
  const handleSkillAdd = () => {
    if (skillName.trim() !== '') {
      const newSkill = {
        skillName: skillName.trim()
      };
      
      if (editingIndex >= 0) {
        // Update existing skill
        const updatedSkills = [...field.value];
        updatedSkills[editingIndex] = newSkill;
        form.setFieldValue(field.name, updatedSkills);
        setEditingIndex(-1);
      } else {
        // Add new skill
        form.setFieldValue(field.name, [...field.value, newSkill]);
      }
      
      setSkillName('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleSkillEdit = (index, skill) => {
    setSkillName(skill.skillName);
    setEditingIndex(index);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCancelEdit = () => {
    setSkillName('');
    setEditingIndex(-1);
  };
  
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillName.trim() !== '') {
      e.preventDefault();
      handleSkillAdd();
    }
  };



  return (
    <div className="w-full">
      <div className="mb-4 p-4 border rounded-lg bg-light-background-secondary dark:bg-dark-background-secondary">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
            Skill Name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="e.g. JavaScript, Python, etc."
            className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSkillAdd}
            disabled={!skillName.trim()}
            className="flex-1 px-4 py-2 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-md hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingIndex >= 0 ? 'Update Skill' : 'Add Skill'}
          </button>
          {editingIndex >= 0 && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      
      {field.value.length > 0 ? (
        <ul className="space-y-3 bg-light-background-secondary dark:bg-dark-background-secondary p-4 rounded-md">
          {field.value.map((skill, index) => (
            <li key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-dark-neutral-700">
              <div className="flex items-center flex-grow">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-light-primary-100 dark:bg-dark-primary-100 text-light-primary-600 dark:text-dark-primary-500 text-sm font-semibold">
                  {index + 1}
                </span>
                <div className="flex-grow">
                  <span className="text-light-text-primary dark:text-dark-text-primary font-medium">
                    {skill.skillName}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSkillEdit(index, skill)}
                  className="text-light-primary-500 dark:text-dark-primary-400 hover:text-light-primary-600 dark:hover:text-dark-primary-500 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleSkillRemove(index)}
                  className="text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-error dark:hover:text-dark-error transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-light-text-tertiary dark:text-dark-text-tertiary italic mt-2 text-center py-8">
          No skills added yet. Add your professional skills and rate your proficiency level.
        </div>
      )}
    </div>
  );
};

export default SkillsList; 