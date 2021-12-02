<h1>Excella - A Productivity Suite</h1>
  <image src='https://img.shields.io/badge/license-MIT-green.svg' />
  <h2>Description</h2>
  
  ![Excella home page](https://github.com/AshisPatel/excella/blob/main/repo-assets/excella-screencap.JPG)

  Excella is a web application that contains multiple productivity applications. The live version of Excella includes a Job CRM and Eisenhower Matrix. Soon Excella will include a Pomodoro Timer along with additional modules that are under development! The end goal of these modules is not only to excel at productive tasks or work habits, but promote the development of a more organized and efficient work flow. This which will in turn allow you for more time for recreation and things you find fulfilling. Therefore, you could say _Excella_ is here to help you _excel_. 

  **Website**: [https://excella.herokuapp.com/](https://excella.herokuapp.com/)

  <h2>Table of Contents</h2>
 <ul>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#future">Upcoming Features and Improvements</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#questions">Questions</a></li>
  <li><a href="#endNote">End Note - A Thank You to the Reader</a></li>
 </ul>

  

  <h2 id="usage">Usage</h2>
  <h3> Job CRM </h3>
  <p>The Job CRM allows you to add jobs with required inputs of a job title, employer, and application status. Optionally, you can add contacts associated with a job and include their first name, last name, phone number, and email. Currently, all unique job titles and employer names are stored in two separate select menus that can be used to filter your displayed job results. These select menus will place your most popular employers and job titles at the top of the list. All jobs and contacts entered into the CRM can be updated and deleted. </p>

  <h3> Eisenhower Matrix </h3>
  <p>
    The Eisenhower Matrix is a method of making To Do lists less cluttered, and more achievable! The Eisenhower Matrix requires that all tasks fit into one of the 4 categories: (1) Do (2) Delegate (3) Do Later (4) Delete. 
    <br />
    <ol>
      <li>DO: These tasks are URGENT and must be done you, thus they are given immediate priority.</li>
      <li>DELEGATE: These tasks are URGENT but do NOT need to be done by you, and thus you should find the right person to assign them to.</li>
      <li>DO LATER: These tasks are not urgent, but must be done by you. Therefore, they should be scheduled for after all your 'DO' tasks are complete.</li>
      <li>DELETE: These tasks are not urgent, and do not need to be done by you. Perhaps this is something that someone else needs to handle and is entirely out of your authority, or something that adds no merit either in terms of productivity or recreation. These tasks are distractions from what you really need and want to do and need to be deleted from your list. </li>
    </ol>
    <br />
    The objective is to restart your list delay, and so Excella includes some features to help manage your tasks. When tasks are created they must include some content and a category. Tasks can later be edited to be assigned to a different category, or have their content changed. Each task is a checkbox, and can be toggled as completed or incomplete. Tasks can be deleted in several ways: (1) each task can be deleted independently (2) all tasks in a specific category can be deleted (3) all tasks marked as complete can be deleted by clicking on the 'clean' button (4) the delete all button will delete all tasks. 
  </p>

  <h2 id="technologies">Technologies</h2>

  Excella is a web application built fully in Javascript using the MERN stack. On the front end, we utilized React and react-enhancing packages like React Router and Redux, and on the back end we used Node as a runtime environment for hosting a server using Express. For the database we utilized MongoDB and wrote requests to the database using Mongoose. The database-client communications were handled using GraphQL, specifically Apollo. So all queries and mutations occurred through the Apollo Client and Apollo Server pipeline. Additionally, for authentication a JWT strategy was adapted for managing user sessions. 
 
 <h2 id="future">Upcoming Features and Improvements</h2>

  Coming very soon(as of 12/1, I'm putting the date here for my own personal accountability) will be a Pomodoro Timer so that you can manage your work / activity sessions and prevent burnout! Who knows, maybe it'll even have customizable and creatable timer presets for you to use, or even a fully automated schedule based timer.

  <h3>Other Features and Improvements</h3>
  
  <ul>
    <li>Ambient noise mixer so that you can create your own rainy/city/forest/cafe ambient noise!</li>
    <li>Potential Spotify Web API integration?</li>
    <li>Over-arching goals page and tracking</li>
    <li>Daily Journal</li>
    <li>Job CRM improved search</li>
    <li>Job CRM structure change, notes with jobs or even logging of notes with specific contacts, potentially even an address book function</li>
    <li>Animations for Job CRM, Pomodoro Timer, and Eisenhower Matrix -> better user interaction and status display of errors with the server, or when the server is thinking</li>
    <li>Various UI improvements, especially regarding mobile design</li>
  </ul>
  
  <h2 id="license">License</h2>

  MIT - Find out more about this project's license(s) at: [https://choosealicense.com/licenses/](https://choosealicense.com/licenses/)

  <h2 id="questions">Questions</h2>
  
  <p> 
  Made by: <br />
  Ashis Patel (Github: https://github.com/AshisPatel)<br />
  Jacob Frazer (Github: https://github.com/coderjake91)<br />
  Collin Hallett (Github: https://github.com/Challett1129)<br />
  
  </p>Email: ashis.n.patel@gmail.com<br />Please send me an email if you have any questions, comments, or concerns regarding this project.</p>

  <h2 id="endNote">An End Note - A Thank You to the Reader</h2>

  Hello, friend! I hope that you're having a wonderful morning, afternoon, evening, or weird midnight hours! If you aren't, then perhaps the fun fact + gif that I've included at the end of this section will help brighten your day. Or at the least, give you something fun to share with a friend or loved one. But first, please allow me a small rant. This was my first full-fledged full stack project using modern web development technologies! It was oodles of work, but also oodles of fun. I've fully learned the importance of planning out components will all the various states and data that gets managed by React. *And additionally* I've learned the importance of making wire frames, scaling up from a mobile first design approach. It makes writing the CSS a lot friendlier. On top of that, I've learned how much I would appreciate a graphic designer or perhaps should I not encounter one of those, a set of lessons on UI design! With that said, thank you so much for checking out this project repository! A big shoutout and thanks to my teammates Jacob and Collin (linked in the Questions section) for their hard work on the backend making this project a reality. Please come back in the future to checkout Excella as we plan to integrate some more features into the app! And who knows, maybe it'll even help improve your daily flow. See ya sometime friend!

  **Fun Fact:** Have you heard of Parkinson's law? If not, I've got you covered: 'Work expands to fill the time that is given'. So, start managing your work flow today, get what you need to do and then enjoy the rest of your time with recreation or working towards your other goals (like starting a career in tech or something...)!

  _Real life animated footage of you demolishing your daily tasks and potential job hunt with Excella_
  ![Demolishing a hallway with a minigun](https://github.com/AshisPatel/excella/blob/main/repo-assets/minigun.gif)



  