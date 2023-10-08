<div align="center">
<h1>BeeMusic</h1>

[Live](https://beemusic.kutaybekleric.com/)

<h3>Fullstack GraphQL social media app</h3>
</div>

![Landing Page](./frontend/public/landing_page.png)

<h4>Note:The backend is hosted on Render, so TTFB(Time to first byte) might be long. Please be patient with the first requests</h4>

# Introduction




## Tech Stack

- Next.js
- Express.js
- MongoDB
- TailwindCSS
- shadcn/ui
- Typescript & Zod
- Redux

## Features

- <b>JWT Authentication</b> <br>

Express.js backend uses JWT to authenticate users. The token is stored in a httpOnly cookie and is valid for 30 days.

- <b>Full CRUD functionality on notes</b> <br>

Users can create, read, update and delete notes. The notes are stored in a MongoDB database.

- <b>Autosave notes and title</b><br>

While this was not that hard to implement, it was a bit tricky to get it working with the WYSIWYG editor. Also, there
are still some tweaking left to do in order to maximize UX.

- <b>Zod for input validation</b> <br>

Currently, I am using Zod only in the frontend. I am planning to use it in the backend as well.

- <b>WYSIWYG editor</b> <br>

Used Tiptap rich text editor.

### Development

- Used Airbnb eslint and prettier configs
- Used Jest and Testing Library for testing

