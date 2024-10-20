import React, { useState, useRef } from 'react';
import { FiList, FiUpload, FiPause, FiPlay, FiX, FiFile } from 'react-icons/fi';
import axios from 'axios';

const Candidates = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showList, setShowList] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [candidateDetails, setCandidateDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      setIsPaused(false);
      setUploadProgress(0); // Reset progress
      simulateFileUpload();
    }
  };

  const simulateFileUpload = () => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setUploadProgress((prev) => {
          if (!isPaused) {
            const nextProgress = prev + 5;
            if (nextProgress >= 100) {
              clearInterval(intervalRef.current!);
              setUploadProgress(100);
              setIsUploading(false);
              intervalRef.current = null;
            }
            return nextProgress;
          }
          return prev;
        });
      }, 500);
    }
  };

  const pauseUpload = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeUpload = () => {
    setIsPaused(false);
    if (!isUploading && uploadProgress < 100) {
      setIsUploading(true);
      simulateFileUpload();
    }
  };

  const cancelUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop();
    if (extension === 'zip') {
      return <FiFile className="w-5 h-5 text-blue-500" />;
    }
    return <FiFile className="w-5 h-5 text-gray-400" />; // Default icon for unknown file types
  };

  const handlePost = async () => {
    // Handle post action here (e.g., submit the file)
    console.log('File posted:', file);
    setLoader(true);
    const formData = new FormData();
    formData.append('file', file!);
    formData.append(
      'jd',
      'About the job As a Frontend Engineer Intern specializing in Javascript(React/Ember), you will work closely with the engineering team to develop and maintain our products while contributing to the design, implementation, and maintenance of our web-based applications. You will be responsible for building scalable and efficient frontend systems, ensuring their reliability and performance. This internship offers an excellent opportunity to gain practical experience in frontend development while contributing to real-world projects.  Responsibilities  Collaborate with cross-functional teams to understand project requirements and deliver high-quality frontend solutions  Implement product features writing clean, robust, reusable code with tests  Develop responsive and user-friendly interfaces using HTML, CSS, and JavaScript frameworks  Bring new ideas and best practices to improve the team and quality of frontend features  Requirements  Currently pursuing a degree in Computer Science, Software Engineering, or a related field  Prior Internship Experience Showcasing Frontend Development Is Required  Solid understanding of HTML, CSS, and JavaScript is preferred  Understanding of frontend development concepts, building web applications with javascript frameworks like Ember.js or React.js  Solid understanding of software development principles with knowledge of building single-page web apps and a good understanding of best practices in frontend development  Ability to work effectively in a collaborative team environment  Good verbal and written communication skills and a willingness to learn  Passion to solve complex technical problems and troubleshoot issues  Internship Details  Full-time Paid Internship  Internship duration: 6 months  Mode of work: Work from office (Guindy, Chennai)  Full time opportunity will be available to interns with good performance'
    );
    try {
      const response = await axios.post(
        'https://intellirecruit.onrender.com/ATS_tracker/evaluate_resume/',
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        if (!Array.isArray(response.data)) {
          setCandidateDetails([response.data]);
        }
        else {
          let a = [];
          for (let i = 1; i < response.data.length; i++) {
            a.push(response.data[i]);
          }
          setCandidateDetails(a);
          if (!showList)
            setShowList(!showList);
          if (showUpload)
            setShowUpload(!showUpload);
        }
        setError(null); // Clear any previous errors
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      if (error.response) {
        setError(`Server Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError(`Request Error: ${error.message}`);
      }
      console.error('Error during resume evaluation:', error);
    }
    setLoader(false)
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col md:flex-row justify-start items-start">
      <div className="w-full md:w-1/3">
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold mb-2">CANDIDATES</h1>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setShowList(!showList); if (showUpload) setShowUpload(!showUpload) }}>
              <FiList className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700"  >List</span>
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => { if (showList) setShowList(!showList); setShowUpload(!showUpload) }}
            >
              <FiUpload className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Upload</span>
            </div>
          </div>
        </div>

        {showUpload && (
          <div className="mt-6 w-full">
            <h2 className="text-lg font-semibold">Resume Or CV Upload</h2>
            <p className="text-sm text-gray-500">
              Add your documents here, and you can upload up to 5 files max
            </p>
            <div className="border-2 border-dashed border-blue-400 rounded-md p-4 mt-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 text-blue-500">
                  <FiUpload size={30} />
                </div>
                <p>Drag your file(s) to start uploading</p>
                <span className="my-2">OR</span>
                <input
                  type="file"
                  accept=".zip"
                  id="fileUpload"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="fileUpload" className="btn btn-blue cursor-pointer">
                  <span className="text-blue-600 border px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition">
                    Browse files
                  </span>
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Only support .jpg, .png, .svg and .zip files
            </p>

            {file && uploadProgress < 100 && (
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file?.name || '')}
                    <span className="truncate max-w-xs md:max-w-full">{file?.name || 'No file selected'}</span>
                  </div>
                  <span>{((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded mt-2">
                  <div className="absolute h-full bg-blue-500 rounded" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">{uploadProgress}%</span>
                  <div className="flex space-x-2">
                    {isUploading && !isPaused ? (
                      <button className="p-1 rounded bg-gray-200 hover:bg-gray-300" onClick={pauseUpload}>
                        <FiPause className="text-gray-700" />
                      </button>
                    ) : (
                      <button className="p-1 rounded bg-green-500 hover:bg-green-600" onClick={resumeUpload}>
                        <FiPlay className="text-white" />
                      </button>
                    )}
                    <button className="p-1 rounded bg-red-500 hover:bg-red-600" onClick={cancelUpload}>
                      <FiX className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="mt-4 border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getFileIcon(file?.name || '')}
                  <div>
                    <p className="font-semibold text-gray-800">{file?.name || 'No file selected'}</p>
                    <p className="text-sm text-gray-500">
                      {((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button className="p-1 rounded bg-red-500 hover:bg-red-600" onClick={cancelUpload}>
                  <FiX className="text-white" />
                </button>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="mt-2">
                <button className="bg-orange-500 text-white py-2 px-4 rounded" onClick={handlePost}>
                  Post
                </button>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {Loader && (
          <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
            <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
            </svg>
            <span class="text-4xl font-medium text-gray-500">Loading...</span>
          </div>)}
        <div className="w-full md:w-2/3 mt-6 md:mt-0">
          {candidateDetails && showList && (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th style={{ minWidth: '150px' }} className="py-2 px-4 bg-gray-200 text-left">Name</th>
                  <th style={{ minWidth: '200px' }} className="py-2 px-4 bg-gray-200 text-left">Email</th>
                  <th style={{ minWidth: '150px' }} className="py-2 px-4 bg-gray-200 text-left">Phone</th>
                  <th style={{ minWidth: '150px' }} className="py-2 px-4 bg-gray-200 text-left">Job Role</th>
                  <th style={{ minWidth: '150px' }} className="py-2 px-4 bg-gray-200 text-left">Contract Type</th>
                  <th style={{ minWidth: '100px' }} className="py-2 px-4 bg-gray-200 text-left">ATS Score</th>
                </tr>
              </thead>
              <tbody>
                {candidateDetails.map((candidate, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{candidate["Candidate Name"]}</td>
                    <td className="py-2 px-4">{candidate["Mail ID"]}</td>
                    <td className="py-2 px-4">{candidate["Phone Number"]}</td>
                    <td className="py-2 px-4">{candidate["Job Role"]}</td>
                    <td className="py-2 px-4">{candidate["Contract Type"]}</td>
                    <td className="py-2 px-4">{candidate["ATS Score"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          )}
          {!candidateDetails && showList && !showUpload && <p className="text-gray-500 mt-20">No candidate details available.</p>}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
