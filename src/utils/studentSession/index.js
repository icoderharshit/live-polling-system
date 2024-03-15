// utils/studentSession.js

// Generate a random alphanumeric ID
function generateStudentId() {
    return 'student_' + Math.random().toString(36).substr(2, 9);
}

// Get the student ID from localStorage
export function getStudentId() {
    let studentId = sessionStorage.getItem('studentId');
    if (!studentId) {
        studentId = generateStudentId();
        sessionStorage.setItem('studentId', studentId);
    }
    return studentId;
}

// Set the student ID in localStorage
export function setStudentId(studentId) {
    sessionStorage.setItem('studentId', studentId);
}

// Get the student name from localStorage
export function getStudentName() {
    return sessionStorage.getItem('studentName') || '';
}

// Set the student name in localStorage
export function setStudentName(name) {
    sessionStorage.setItem('studentName', name);
}
