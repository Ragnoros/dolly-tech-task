<h3>1: Outdated version of Next.js</h3>
Outdated Version of next.js threw an error while opening "View All Notes". Ran the command "npm install next@latest"<br>

<h3>2: noteService.ts missing curley brackets</h3>
Missing curley brackets in noteService.ts causing View All Notes link to throw an error. Added the bracket back in.

<h3>3: page.tsx params Promise</h3>
I think when I updated next.js I turned params into a promise according to the reading I did and the error tooltip. I implemented React.use in [id] page.tsx to unwrap the promise and made sure to specify to typecript that params was a Promise

<h3>4: GET [id] route.ts</h3>
Similar problem to change 3 but inside the routes.ts folder for the GET function. params is now a promise but because its .ts and not a react .tsx file I instead awaited the params promise to fulfil before continuing.

<h3>5: onSubmit(data) NoteForm component</h3>
I added "await onSubmit(data)" to the handleSubmit function in the NoteForm componenet so that the data inserts. I used await to ensure the data is submitted before carrying on because handleSubmit is an async function.

<h3>6: DELETE [id] route.ts</h3>
Same problem as 4 but for DELETE in route.ts so made sure to await the promise because params is a promise

<h3>7: PUT [id] route.ts</h3>
I made the same change as 6 and 4 for the PUT function for update note but it did not fix the 405 error when trying to edit/update note. Will continue working on it.

<h3>8: BUG 1</h3>
Changed the method for updating note to PUT rather than POST in noteServices (was looking in the wrong place for ages). Can now update notes

<h3>9: BUG 2</h3>
Stopped const updatedNote from updating createdAt every time by switching "new Date().toISOString()" to "notes[noteIndex].createdAt"

<h3>10: Dark Mode</h5>
First I set darkMode: "media" in tailwind.config.js rather than class so that it would use my system settings to decide dark vs light. Then I implemented dark mode by adding things like "dark:text-gray-100" to the inline CSS.  After implementation I added DarkModeToggle.tsx and changed darkMode: "media" to "class" so I could put a button on the web app that changes the theme. I placed the button on the navigation bar

<h3>11: DarkModeToggle.tsx localStorage bug for dark mode</h3>
On first render localStorage threw an error because it was undefined. I originally tried to put a '?' next to localStorage to make it optional but the program still didn't like it. Decided to add in boolean | null>(null) to useState so that initally localStorage doesn't get accessed because it's null. The setDarkMode is then put into a useEffect and runs on component render. Once this happens localStorage now exists so the error does not happen.

<h4>The error in question: </h4>

ReferenceError: localStorage is not defined
at DarkModeToggle (src\components\DarkModeToggle.tsx:5:4)

```
3 | const DarkModeToggle: React.FC = () => {
4 | const [darkMode, setDarkMode] = useState<boolean>(

> 5 | localStorage?.getItem("theme") === "dark"

    |    ^

6 | );
7 |
8 | useEffect(() => { {
digest: '1750764143'
}
```
