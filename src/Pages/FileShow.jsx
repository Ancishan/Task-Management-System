const FileShow = ({ files }) => {
    return (
        <div className='mt-10 mb-10'>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <a href={`http://localhost:5000/uploads/${file}`} download>
                            {file}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileShow;
