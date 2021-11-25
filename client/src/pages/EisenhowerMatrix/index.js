import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTasks} from "../../redux/eisenhowerMatrix";
import { newTaskModal } from "../../redux/taskModal";
import './style.css';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import TaskContainer from "../../components/TaskContainer";
import ExcellaIcon from "../../components/ExcellaIcon";
import TaskModal from "../../components/TaskModal";

const EisenHowerMatrix = () => {

    const columnSizing = 'offset-1 col-9 offset-md-3 col-md-5 offset-lg-4 col-lg-4';
    const { showTaskModal } = useSelector(state => state.taskModal); 
    const dispatch = useDispatch();

    const categories = [
        {
            title: 'Do',
            category: 'do'
        },
        {
            title: 'Do Later',
            category: 'doLater'
        },
        {
            title: 'Delegate',
            category: 'delegate'
        },
        {
            title: 'Delete',
            category: 'delete'
        }
    ]

    return (
        <>
        <div className="container">
            <div className="row">
                <h1 className={`${columnSizing} em-title`}>Eisenhower Matrix</h1>
            </div>
            <div className="row">
                <div className={`${columnSizing} em-main-btn-wrapper`}>
                    <button
                        className="em-main-btn"
                        onClick={() => dispatch(newTaskModal())}
                    >   
                        <FontAwesomeIcon icon="plus" />
                        Add Task
                    </button>
                    <button
                        className="em-main-btn delete-btn"
                        onClick = {() => dispatch(deleteAllTasks())}
                    >
                        <FontAwesomeIcon icon="trash" />
                        Delete All
                    </button>
                </div>
            </div>
            <div className="row">
                {categories.map((category, index) => <TaskContainer categoryData={category} index={index} key={category.title}/>)}
            </div>

        </div>
        {showTaskModal && <TaskModal />}
        </>
    );
};

export default EisenHowerMatrix;