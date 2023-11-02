/** @type {import('next').NextConfig} */
module.exports = {
    env: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
    images: {
        domains: ['lh3.googleusercontent.com'], // Add the hostname(s) here
      },
  }
  
