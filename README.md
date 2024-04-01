Web API project using express.js.

// TODO
  1. Will integrate with MongoDB cloud in the future. (DONE)
  2. Publish project to API platforms such as Rapid API.

// DEPLOYMENT on VERCEL
  • Default url: https://pirates-eight.vercel.app/api/

  • Pirates controller contains 4 HTTP methods.
    NOTE: HTTP methods POST, PUT & DELETE are protected by api authorization.

    1. GET
      • https://pirates-eight.vercel.app/api/pirates/get
      • https://pirates-eight.vercel.app/api/get/{id}
    
    2. POST
      • https://pirates-eight.vercel.app/api/pirates/create

    3. PUT
      • https://pirates-eight.vercel.app/api/pirates/update/{id}

    4. DELETE
      • https://pirates-eight.vercel.app/api/pirates/delete/{id}