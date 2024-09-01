import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/UseAuth';

const MySubmission = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [links, setLinks] = useState({}); // State to store links for each submission

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axiosPublic.get(`/submissions?worker_email=${user.email}`);
        setSubmissions(response.data);
        // Initialize links state with existing submissions
        const initialLinks = response.data.reduce((acc, submission) => {
          acc[submission._id] = ''; // Initialize empty link for each submission
          return acc;
        }, {});
        setLinks(initialLinks);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchSubmissions();
    }
  }, [user, axiosPublic]);

  const handleLinkChange = (submissionId, e) => {
    setLinks({
      ...links,
      [submissionId]: e.target.value
    });
  };

  const handleSubmitLink = async (submissionId) => {
    try {
      await axiosPublic.put(`/submissions/${submissionId}`, { link: links[submissionId] });
      // Update UI or notify user as needed
    } catch (error) {
      console.error('Error submitting link:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Submissions</h2>
      {submissions.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Task Title</th>
              <th className="px-4 py-2">Task Detail</th>
              <th className="px-4 py-2">Submission Details</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Submission Date</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Submit Link</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border px-4 py-2">{submission.task_title}</td>
                <td className="border px-4 py-2">{submission.task_detail}</td>
                <td className="border px-4 py-2">{submission.submission_details}</td>
                <td className="border px-4 py-2">{submission.status}</td>
                <td className="border px-4 py-2">{new Date(submission.current_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={links[submission._id] || ''}
                    onChange={(e) => handleLinkChange(submission._id, e)}
                    placeholder="Enter link here"
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleSubmitLink(submission._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Submit Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No submissions found</div>
      )}
    </div>
  );
};

export default MySubmission;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ApprovalList = () => {
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      try {
        const response = await axios.get('https://micro-task-earnning-pf-server.vercel.app/submissions/approved', {
          params: { status: 'approved' },
        });

        if (Array.isArray(response.data)) {
          setApprovedSubmissions(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching approved submissions:', error);
        setError('Error fetching approved submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedSubmissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Approval List</h2>
      {approvedSubmissions.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Submission Details</th>
              <th>Payable Amount</th>
              <th>Task Link</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((submission, index) => (
              <tr key={submission._id}>
                <td>{index + 1}</td>
                <td>{submission.worker_name}</td>
                <td>{submission.task_title}</td>
                <td>{submission.submission_details}</td>
                <td>{submission.payable_amount}</td>
                <td>
                  {submission.link ? (
                    <a href={submission.link} target="_blank" rel="noopener noreferrer">
                      View Task
                    </a>
                  ) : (
                    'No link provided'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved submissions found.</p>
      )}
    </div>
  );
};

export default ApprovalList;
