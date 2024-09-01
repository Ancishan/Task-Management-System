import { useState } from 'react';
import UseAxiosPublic from '../hooks/UseAxiosPublic';

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const axiosPublic = UseAxiosPublic();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', file); // This should match the field name used in multer

        try {
            const response = await axiosPublic.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);

            // Notify parent about the new uploaded file
            if (response.data.fileName) {
                onFileUpload(response.data.fileName);
            }
        } catch (error) {
            setMessage('File upload failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleFileUpload}>
                <input type="file" name='avatar' onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
