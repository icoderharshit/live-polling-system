import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, useUser } from './context/userContext';
import UserTypeSelection from './components/UserSelection';
import PollForm from './components/PollForm';
import AnswerForm from './components/AnswerForm';
import PollResults from './components/PollResults';
import Error404 from './components/Error404';
import '../src/main.css';

function App() {
    return (
        <Router>
            <UserProvider>
                <AppRoutes />
            </UserProvider>
        </Router>
    );
}

function AppRoutes() {
    const { userType } = useUser();

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={userType?userType==="teacher" ? <PollForm/> : <AnswerForm/> : <UserTypeSelection />} />
                {userType === 'teacher' && <Route path="/createPoll" element={<PollForm />} />}
                {userType === 'student' && <Route path="/answerQuestion" element={<AnswerForm />} />}
                <Route path="/pollResults" element={<PollResults teacherMode={userType==="teacher"?true:false}/>} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>
    );
}

export default App;
