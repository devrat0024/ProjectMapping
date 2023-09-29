import React, { useState, useEffect } from 'react';
import './ProjectMappingForm.css';

const ProjectMappingForm = () => {
  const [uid, setUid] = useState('');
  const [allotProject, setAllotProject] = useState('');
  const [hourAllocate, setHourAllocate] = useState('');
  const [wbsCode, setWbsCode] = useState('');
  const [wbsCodes, setWbsCodes] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const generatedUid = generateUid();
    setUid(generatedUid);

    setIsFormSubmitted(true);
  };

  const generateUid = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const uidLength = 6;

    let result = '';
    for (let i = 0; i < uidLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  };

  useEffect(() => {
    const savedWbsCodes = JSON.parse(localStorage.getItem('selectedWbsCodes') || '[]');
    setWbsCodes(savedWbsCodes);
  }, []);

  const handleWbsCodeChange = (e) => {
    setWbsCode(e.target.value);
  };

  const handleAddWbsCode = () => {
    if (wbsCode.trim() !== '') {
      setWbsCodes([...wbsCodes, wbsCode.trim()]);
      setWbsCode('');
    }
  };

  const handleRemoveWbsCode = (codeToRemove) => {
    const updatedCodes = wbsCodes.filter((code) => code !== codeToRemove);
    setWbsCodes(updatedCodes);
  };

  const handleEditForm = () => {
    setIsFormSubmitted(false);
  };

  useEffect(() => {
    localStorage.setItem('selectedWbsCodes', JSON.stringify(wbsCodes));
  }, [wbsCodes]);

  return (
    <div className="box">
      <h1>Project Mapping Form</h1>
      {!isFormSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="uid">UID (combination of small alphabet and number):</label>
          <input
            type="text"
            id="uid"
            pattern="[a-z0-9]+"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
            readOnly
          />
          <br />
          <label htmlFor="allotProject">Allot Project:</label>
          <input
            type="text"
            id="allotProject"
            value={allotProject}
            onChange={(e) => setAllotProject(e.target.value)}
            required
          />
          <br />
          <label htmlFor="hourAllocate">Hour Allocate (in time input):</label>
          <input
            type="time"
            id="hourAllocate"
            value={hourAllocate}
            onChange={(e) => setHourAllocate(e.target.value)}
            required
          />
          <br />
          <label htmlFor="wbsCode">Consumed WBS Codes:</label>
          <div>
            <input
              type="text"
              value={wbsCode}
              onChange={handleWbsCodeChange}
              placeholder="Enter WBS Code"
            />
            <button type="button" onClick={handleAddWbsCode}>
              Add
            </button>
          </div>
          <ul className="wbs-codes-list">
            {wbsCodes.map((code) => (
              <li key={code}>
                {code}
                <button type="button" className="remove-btn" onClick={() => handleRemoveWbsCode(code)}>
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>
            <strong>ID:</strong> {Math.floor(Math.random() * 100000)}
          </p>
          <p>
            <strong>UID:</strong> {uid}
          </p>
          <p>
            <strong>Allot Project:</strong> {allotProject}
          </p>
          <p>
            <strong>Hour Allocate:</strong> {hourAllocate}
          </p>
          <p>
            <strong>Consumed WBS Codes:</strong>
            <ul>
              {wbsCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </p>
          <br />
          <button onClick={handleEditForm}>Edit Form</button>
        </div>
      )}
    </div>
  );
};

export default ProjectMappingForm;

