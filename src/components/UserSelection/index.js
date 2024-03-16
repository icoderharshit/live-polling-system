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
        <div className='flex items-center justify-center h-screen'>
          <div className='flex flex-col items-center rounded'>
            <h1 className='mb-6 text-xl text-yellow-100'>Select what type of user you are?</h1>
            <div className='flex gap-4'>
              <button className="border-2 bg-lime-100 border-slate-700 p-4 rounded hover:bg-lime-200" onClick={() => handleUserTypeSelection('student')}>
                I am a Student
              </button>
              <button className="border-2 bg-lime-100 border-slate-700 p-4 rounded hover:bg-lime-200" onClick={() => handleUserTypeSelection('teacher')}>
                I am a Teacher
              </button>
            </div>
          </div>
        </div>
      );
      
}

export default UserTypeSelection;
