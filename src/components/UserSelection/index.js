// UserTypeSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';

function UserTypeSelection() {
    const navigate = useNavigate();
    const { updateUserType } = useUser();

    const handleUserTypeSelection = (type) => {
        updateUserType(type);
        if (type === 'teacher') {
            navigate('/createPoll');
        } else if (type === 'student') {
            navigate('/answerQuestion');
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center h-screen flex-col gap-5'>
                <h1>Select what type of user you are ?</h1>
                <div className='flex gap-[40px]'>
                    <button className="border border-2 p-4 rounded" onClick={() => handleUserTypeSelection('student')}>
                        I am Student
                    </button>
                    <button className="border border-2 p-4 rounded" onClick={() => handleUserTypeSelection('teacher')}>
                        I am Teacher
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserTypeSelection;
