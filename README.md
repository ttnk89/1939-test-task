This is a simple Login app [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Install [Node.js](https://nodejs.org/en) version 18

- Clone/download the project and run the development server in the project root folder (where this README file is located):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- With a mobile device, make sure the device is connected to same local network that the machine running the app is, and go to [http://local-ip-address:3000](http://local-ip-address:3000) after figuring out your ip address (*ipconfig* command on the command line is one such method).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Basic usage

- Users can log in with a username + password if the username is found in [playerData.json](https://github.com/ttnk89/1939-test-task/blob/master/data/playerData.json) and passwords match. (Currently logging in is only only supported with player id: 1 / default name: `JohnnyBadName`)
- Users can switch the site language between english, chinese, japanese
- Logged in player can change username with following restrictions:
  - length of 4-20 characters 
  - name cannot have words included in [badWords.json](https://github.com/ttnk89/1939-test-task/blob/master/data/badWords.json)
  - name cannot already exist in [playerData.json](https://github.com/ttnk89/1939-test-task/blob/master/data/playerData.json)


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
