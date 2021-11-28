import React, { useState, useEffect } from "react";
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { setJobFilters, clearJobFilters } from "../../redux/jobCRM";

const JobCRMSearch = () => {
    const dispatch = useDispatch();
    const { jobTitleFilter, employerFilter, jobs } = useSelector(state => state.jobCRM);
    const [jobTitleOptions, setJobTitleOptions] = useState([]);
    const [employerOptions, setEmployerOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState(
        {
            jobTitle: jobTitleFilter,
            employer: employerFilter
        }
    )

    // get jobTitle and employer options
    const jobTitleMap = {};
    const employerMap = {};

    // on load parse through jobs array and anytime the jobs array is udpated
    useEffect(() => {
        setLoading(true);
        // add unique entries of jobTitle and employer to respective map as keys
        // also counting the number of times these appear as the value for future purposes 
        for (let i = 0; i < jobs.length; i++) {
            let { jobTitle, employer } = jobs[i];
            jobTitle = jobTitle.toLowerCase().trim();
            employer = employer.toLowerCase().trim();
            if (jobTitle in jobTitleMap) {
                jobTitleMap[jobTitle]++;
            } else {
                jobTitleMap[jobTitle] = 1;
            }

            if (employer in employerMap) {
                employerMap[employer]++;
            } else {
                employerMap[employer] = 1;
            }
        }
        setLoading(false);
        // after jobs have been parsed through, spread the keys of each object and set the options state 
        setJobTitleOptions([...Object.keys(jobTitleMap)]);
        setEmployerOptions([...Object.keys(employerMap)]);
    }, [jobs]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        const { jobTitle, employer} = formState; 
        dispatch(setJobFilters(jobTitle, employer));
    }

    const clearFilters = () => {
        setFormState({
            jobTitle: '',
            employer: ''
        });
        dispatch(clearJobFilters());
    }

    useEffect(() =>{ 
        console.log(formState)
        // const { jobTitle, employer} = formState; 
        // dispatch(setJobFilters(jobTitle, employer));
    }, [formState]);

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    if(!jobTitleOptions && !employerOptions) {
        return (
            <div>No options to filter from!</div>
        )
    }


    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <select
                    name="jobTitle"
                    value={formState.jobTitle}
                    onChange={handleChange}
                >
                    <option value="">Select Title</option>
                    {
                        jobTitleOptions.map(option => (
                            <option
                                key={option}
                                name={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))
                    }
                </select>

                <select
                    name="employer"
                    value={formState.employer}
                    onChange={handleChange}
                >
                    <option value="">Select Employer</option>
                    {
                        employerOptions.map(option => (
                            <option
                                key={option}
                                name={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))
                    }

                </select>
                
                <button
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

            </form>

            <button
                onClick={() => clearFilters()}
            >
                Clear
            </button>
        </div>
    );
};

export default JobCRMSearch