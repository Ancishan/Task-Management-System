import { useState, useEffect } from 'react';
import FileShow from '../Pages/FileShow';
import FileUpload from '../Pages/FileUpload';
import UseAxiosPublic from '../hooks/UseAxiosPublic';

const FileManagement = () => {
    const [files, setFiles] = useState([]);
    const axiosPublic = UseAxiosPublic();

    // Fetch files from the server
    const fetchFiles = async () => {
        try {
            const response = await axiosPublic.get('/files');
            setFiles(response.data);
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }
    };

    useEffect(() => {
        fetchFiles(); // Fetch files on component mount
    }, []);

    const handleNewFileUpload = (newFile) => {
        // After a new file is uploaded, fetch the updated list of files
        fetchFiles();
    };

    return (
        <div>
            <FileUpload onFileUpload={handleNewFileUpload} />
            <FileShow files={files} />
        </div>
    );
};

export default FileManagement;
