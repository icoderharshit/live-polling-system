import React, { useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('https://live-polling-backend-app.vercel.app');

function PollForm() {
    const [newQuestion, setNewQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '' }]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [timerOut, setTimerOut] = useState(60);
    const navigate = useNavigate();

    const handleQuestionChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].text = value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, { text: '' }]);
    };

    const handleAskQuestion = () => {
        if (newQuestion.trim() === '') {
            alert('Please enter a question');
            return;
        }
        if (options.filter(opt => opt.text.trim() !== '').length === 0) {
            alert('Please provide at least one option');
            return;
        }
        if (correctAnswerIndex === null) {
            alert('Please select the correct answer');
            return;
        }
        
        // Trigger socket event with question data
        socket.emit('askQuestion', { question: newQuestion, options, timeOut: timerOut, correctAnswerIndex });
        
        // Clear the input fields
        setNewQuestion('');
        setOptions([{ text: '' }]);
        setCorrectAnswerIndex(null);

        navigate('/pollResults');
    };

    return (
        <div className='p-4 flex flex-col gap-4 h-screen mt-[50px] items-center'>
            <div className='flex flex-col gap-3 w-1/2'>
                <label htmlFor="question">Enter Question and options</label>
                <textarea
                    autoFocus
                    className='border border-2 p-2 rounded resize-none'
                    id="question"
                    value={newQuestion}
                    onChange={handleQuestionChange}
                    placeholder='Enter...'
                />
            </div>
            <div className='flex gap-4 items-center justify-center'>
                Set Timer
                <input 
                    className='border border-1 rounded p-1 w-20'
                    type='number'
                    value={timerOut}
                    onChange={(e) => setTimerOut(e.target.value)}
                />
            </div>
            <div className='flex w-1/2'>
                <div className='flex-1'>
                    <div className='flex justify-between mb-5'>
                        <h3>Option</h3>
                        <h3>Is correct ?</h3>
                    </div>
                    {options.map((option, index) => (
                        <div className="flex items-center justify-between mb-4" key={index}>
                            <input
                                className='border border-1 rounded p-1 w-1/2'
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <input
                                className='h-[16px] w-[16px]'
                                type="radio"
                                name="correctAnswer"
                                checked={correctAnswerIndex === index}
                                onChange={() => setCorrectAnswerIndex(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-1/2 flex justify-between'>
                <button className='border border-2 p-2 rounded' onClick={handleAddOption}>Add another option +</button>
                <button className='border border-2 p-2 rounded' onClick={handleAskQuestion}>Ask question →</button>
            </div>
        </div>
    );
}

export default PollForm;
