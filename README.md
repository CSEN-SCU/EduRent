# EduRent

## Introducing EduRent: 
**Your Ultimate Off-Campus Housing Solution for Santa Clara University Students**

Are you a Santa Clara University student struggling to find the perfect off-campus housing? Do you wish there was a platform tailored specifically to your needs, making the search for the ideal rental property or roommate hassle-free? Look no further! EduRent is here to revolutionize your housing experience.

EduRent is not just another generic housing platform; it's a tailored solution designed exclusively for SCU students like you. Built off the Next.js framework by a team of dedicated students as part of our CSEN 174 class project, our web app connects students and landlords in a seamless and intuitive way, ensuring you find the perfect housing situation to fit your lifestyle and preferences.

**Why EduRent?**

- **SCU-specific**: Unlike generic platforms like Zillow, EduRent focuses solely on the needs of Santa Clara University students. Our platform is designed with SCU-specific traits in mind, allowing you to easily filter properties based on factors such as proximity to campus departments, availability of Greek life, and nearby sports facilities.

- **Student-friendly features**: We understand the unique challenges students face when searching for off-campus housing. That's why EduRent enables students to rate properties and landlords, empowering you to make informed decisions based on real experiences. With our platform, property owners can build positive reputations within the SCU community, ensuring a high-quality living experience for all students.

- **Customized marketing**: Are you studying abroad for a quarter or looking for substance-free housing? EduRent enables landlords to market their properties to specific demographics, making it easier for you to find housing options tailored to your needs and preferences.

**Join the EduRent Community Today!**

Say goodbye to the stress and uncertainty of finding off-campus housing. With EduRent, discovering the perfect rental property or roommate is easier than ever before. Join the EduRent community today and unlock a world of SCU-specific housing opportunities at your fingertips.

Don't settle for anything less than the best. Choose EduRent and elevate your off-campus housing experience at Santa Clara University.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To clone:
Navigate to desired directory
```
git clone https://github.com/CSEN-SCU/csen-174-s24-project-edurent

cd into local folder

npm install 

// try the following to run development server
npm run dev

// if that doesn't work, then delete node_modules and run
npm install

// then try
npm run dev

```

## Environment file
Create a .env file in your root folder. Within this file:
```
DATABASE_URL="<your mongo db url>"
NEXTAUTH_SECRET = "NEXTAUTH_SECRET"

GOOGLE_CLIENT_ID="<your google client id>" //for google oauth login. made on google developer console
GOOGLE_CLIENT_SECRET="<your google client secret>"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<your cloudinary name>"

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY='<your google maps api key>'
```
## Running the app
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

**Nick, Anusha, Lucas, Kavya, Wesley, Matt, Lauren**