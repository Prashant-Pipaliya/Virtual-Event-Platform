import React, { useState } from "react";

const InteractiveContent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [pollResults, setPollResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const pollQuestion = "What feature do you find most interesting?";
  const pollOptions = [
    "Networking",
    "Interactive Content",
    "Sessions",
    "User Profiles",
  ];

  const handleVote = () => {
    if (selectedOption) {
      setPollResults((prevResults) => ({
        ...prevResults,
        [selectedOption]: (prevResults[selectedOption] || 0) + 1,
      }));
      setSelectedOption("");
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion) {
      setQuestions((prev) => [...prev, newQuestion]);
      setNewQuestion("");
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
      setFile(uploadedFile);
    }
  };

  return (
    <div className="interactive-content">
      <h2>{pollQuestion}</h2>
      <div className="poll-options">
        {pollOptions.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="poll"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      <button onClick={handleVote}>Vote</button>

      {Object.keys(pollResults).length > 0 && (
        <div className="poll-results">
          <h3>Poll Results:</h3>
          <ul>
            {pollOptions.map((option) => (
              <li key={option}>
                {option}: {pollResults[option] || 0} votes
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleQuestionSubmit}>
        <h3>Submit a Question</h3>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter your question..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      {questions.length > 0 && (
        <div className="questions">
          <h3>Questions:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="file-upload">
        <h3>Share Slides or Documents</h3>
        <input
          type="file"
          accept=".pdf, .ppt, .pptx, .doc, .docx"
          onChange={handleFileChange}
        />
        {file && (
          <div className="file-preview">
            <p>Uploaded File: {file.name}</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveContent;
