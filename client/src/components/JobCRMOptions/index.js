import React, { useState, useEffect } from "react";
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { newJobModal } from "../../redux/jobModal";
import { setJobFilters, clearJobFilters } from "../../redux/jobCRM";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    const columnSizing = 'col-9 col-md-8 col-lg-6'

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
        // setJobTitleOptions([...Object.keys(jobTitleMap)]);
        // setEmployerOptions([...Object.keys(employerMap)]);
        // sort each object in the order of frequencies

        // first convert objects to an array that can be sorted
        let sortableJobTitles = [];
        let sortableEmployers = [];
        // loop through objects using for...in
        for (let title in jobTitleMap) {
            // creates an entry of the key name, key value
            sortableJobTitles.push([title, jobTitleMap[title]]);
        }

        for (let employer in employerMap) {
            sortableEmployers.push([employer, employerMap[employer]]);
        }

        // use sort method to sort each array
        // we're sorting an array of arrays structured as [key name, key value] so we need to compare key value by accessing arr[1]
        sortableJobTitles = sortableJobTitles.sort((a,b) => b[1] - a[1]);
        sortableEmployers = sortableEmployers.sort((a,b) => b[1] - a[1]);

        // create an array of the names in sorted order
        let sortedJobTitles  = sortableJobTitles.map(entry => entry[0]);
        let sortedEmployers = sortableEmployers.map(entry => entry[0]);

        // set state variables
        setJobTitleOptions([...sortedJobTitles]);
        setEmployerOptions([...sortedEmployers]);

    }, [jobs]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleSubmit = (e) => {
    //     const { jobTitle, employer} = formState; 
    //     dispatch(setJobFilters(jobTitle, employer));
    // }

    const clearFilters = () => {
        setFormState({
            jobTitle: '',
            employer: ''
        });
        dispatch(clearJobFilters());
    }

    useEffect(() => {
        // console.log(formState)
        const { jobTitle, employer } = formState;
        dispatch(setJobFilters(jobTitle, employer));
    }, [formState]);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!jobTitleOptions && !employerOptions) {
        return (
            <div>No options to filter from!</div>
        )
    }


    return (
        <>
            <form
                className={`search-form ${columnSizing}`}
            // onSubmit={handleSubmit}
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
                    className="search-form-select"
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

                {/* <button
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </button> */}
                <button
                    className='jc-main-btn'
                    type="button"
                    onClick={() => clearFilters()}
                >
                    <FontAwesomeIcon icon="redo-alt" />
                    Reset
                </button>
                <button
                    className='jc-main-btn'
                    type="button"
                    onClick={() => dispatch(newJobModal())}
                >
                    <FontAwesomeIcon icon="plus" />
                    Add Job
                </button>

            </form>

        </>
    );
};

export default JobCRMSearch;