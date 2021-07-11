import React, { useState } from 'react';
import { createJob } from './requests';
import { useHistory } from 'react-router';

export const JobForm = () => {
  const history = useHistory();
  const [jobFromState, setJobFormState] = useState({
    title: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { title, description } = jobFromState;
    createJob({ title, description }).then((job) => {
      history.push(`/jobs/${job.id}`);
    });
    console.log('should post a new job:', jobFromState);
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={jobFromState.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: '10em' }}
                name="description"
                value={jobFromState.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
