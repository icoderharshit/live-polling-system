GitHub Repository:
- Frontend - https://github.com/icoderharshit/live-polling-system
- Backend - https://github.com/icoderharshit/live-polling-backend
- Deployed Project: https://live-polling-system.netlify.app
- Hosted Backend URL: https://live-polling-backend.onrender.com/

Technologies Used
         Frontend:React.js, Redux, Tailwind.css
         Backend: Express, Socket.io

Steps to run the project using deployed link:
1. Go to https://live-polling-system.netlify.app
2. Choose user type (Student/Teacher)
3. Let suppose, you chose Teacher now you'll see the form to create a poll and ask the question from students.
4. Fill it however you want the question to be, you'll also see an option to adjust the timer for this question.
5. Alongside, just open the same link i.e.  https://live-polling-system.netlify.app on any mobile/new tab and choose student this time, and simply fill in your name and continue. You can open as many new tabs or on mobile (as student user type) as you wish to. Basically, this will be like the project serves the purpose if let say a teacher wants to ask a question and poll with the students in the class.
6. Finally, after you're done opening such student profiles..you'll be seeing a waiting message that suggests that the teacher needs to ask the question. So, from here in the teacher profile tab that you had opened earlier just click on ask question button after filling the req. question details in PollForm and now every student/each tab will be seeing that question for a certain time period (60 seconds by default, or if you'd have provided something else while asking question) .
7. Here, the live polling starts now...as the students will be submitting their answers they'll be seeing the Live Poll after submitting the answer and also after the timer goes away and if someone chooses not to answer anything, it won't be considered as a valid submission and hence not counted in the live poll..Also, if a student has already submitted the answer he/she won't be available to answer the same again anyway..
8. On the teacher screen, the live poll will be visible as well but along with 2 extra things, one button which can be used to Reveal Answer to all the students on their screens and another is to Ask Another Question.
9. The best part is all of this happens in real time :) 
