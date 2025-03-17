<h3>1: Outdated version of Next.js</h3>
Outdated Version of next.js threw an error while opening "View All Notes". Ran the command "npm install next@latest"<br>

<h3>2: noteService.ts missing curley brackets</h3>
Missing curley brackets in noteService.ts causing View All Notes link to throw an error. Added the bracket back in.

<h3>3: page.tsx params Promise</h3>
I think when I updated next.js I turned params into a promise according to the reading I did and the error tooltip. I implemented React.use in page.tsx to unwrap the promise and made sure to specify to typecript that params was a Promise

<h3>4: GET [id] route.ts</h3>
Similar problem to change 3 but inside the routes.ts folder for the GET request. params is now a promise but because its .ts and not a react .tsx file I instead awaited the params promise to fulfil before continuing.

<h3>5: onSubmit(data) NoteForm component</h3>
I added "await onSubmit(data)" to the handleSubmit function in the NoteForm componenet so that the data inserts. I used await to ensure the data is submitted before carrying on because handleSubmit is an async function.

<h3>6: DELETE [id] route.ts</h3>
Same problem as 4 but for DELETE in route.ts so made sure to await the promise because params is a promise

<h3>7: PUT [id] route.ts</h3>
I made the same change as 6 and 4 for the PUT request for update note but it did not fix the 405 error. Will continue working on it.

<h3>8: BUG 1</h3>
Changed the method for updating note to PUT rather than POST in noteServices (was looking in the wrong place for ages)

<h3>9: BUG 2</h3>
Stopped const updatedNote from updating creatiedAt every time by switching "new Date().toISOString()" to "notes[noteIndex].createdAt"

<h3>10: Dark Mode</h5>
First I set darkMode: "media" rather than class so that it would use my system settings to decide dark vs light. Then I implemented dark mode by adding things like "dark:text-gray-100" to the inline CSS.  After implementation I added DarkModeToggle.tsx and changed darkMode: "media" to "class" so I could put a button on the web app that changes the theme
