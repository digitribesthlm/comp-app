import { useState } from 'react';

const MeetingForm = () => {
  const [company, setCompany] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company,
      meeting_notes: meetingNotes,
      homepage: meetingNotes, // Set homepage to meeting_notes value
    };

    const queryParams = new URLSearchParams(payload).toString();
    const url = `${process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL}?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        setSuccessMessage('Meeting notes submitted successfully!');
        setCompany('');
        setMeetingNotes('');
      } else {
        setSuccessMessage('Failed to submit meeting notes.');
      }
    } catch (error) {
      console.error('Error submitting meeting notes:', error);
      setSuccessMessage('An error occurred while submitting meeting notes.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Meeting Notes</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Meeting Notes</span>
          </label>
          <textarea
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Send
        </button>
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default MeetingForm;
