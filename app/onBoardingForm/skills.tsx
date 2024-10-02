import React, { useState } from "react";

interface SkillsProps {
  onSkillsChange: (skills: string[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ onSkillsChange }) => {
  const [skillInput, setSkillInput] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      setSkillInput(""); 
      onSkillsChange(newSkills); 
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    onSkillsChange(newSkills); 
  };

  return (
    <div>
      <h2>Skills</h2>
      <input
        type="text"
        value={skillInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        style={{ padding: "10px", borderRadius: "4px", border: "1px solid grey", width: "100%", backgroundColor: "black", color: "white" }}
      />
      <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {skills.map((skill) => (
          <div key={skill} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ 
              backgroundColor: "black",
              border: "2px solid white",
              borderRadius: "15px", 
              padding: "8px 12px", 
              display: "flex", 
              alignItems: "center" 
            }}>
              {skill}
              <span 
                onClick={() => removeSkill(skill)} 
                style={{ 
                  marginLeft: "8px", 
                  cursor: "pointer", 
                  color: "red" 
                }}
              >
                &times; 
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 