# Dolphin Wet APIs documentation

## Before we start

You can access the apis here: [server_url]: http://88395-17112.pph-server.de or [server_ip]: 45.131.109.222

!!! Before you dive into to use the apis, it is recommended to have some basic knowledge of [Axios](https://axios-http.com/docs/intro), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [JWT authentication](https://jwt.io/introduction).

**Some video tutorial**:

[Axios Crash Course | HTTP Library](https://www.youtube.com/watch?v=6LyagkoRWYA)

[Axios Tutorial](https://www.youtube.com/watch?v=mS48F0swwAY&t=33s)

JavaScript Nuggets is a series of JavaScript tutorial to teach you the important concepts in JavaScript.
[Javascript Nuggets - Promises](https://www.youtube.com/watch?v=IBjmTlShf6U&list=PLnHJACx3NwAfRUcuKaYhZ6T5NRIpzgNGJ&index=15)

[What is JWT authorization really about - Java Brains](https://www.youtube.com/watch?v=soGRyl9ztjI)

## API Usage

### User API

**Register User**

- address: http://88395-17112.pph-server.de/api/users/register

- method: POST

- response:
  
  - request successful
    
    HTTP status: 200
    
    ```textile
    OK
    ```
  
  - request failed
    
    HTTP status > 400
    
    Error message here varies based on the error, e.g when the user name already exists in database, the error message will be `USER_ALREDY_EXISTS`
    
    ```json
    {
        "error": "some error message"
    }
    ```

- example:
  
  ```javascript
  import axios from 'axios';
  const url = 'http://88395-17112.pph-server.de/api/users/register';
  
  const requestBody = {
      name: 'john doe',
      email: 'john.doe@example.mail',
      password: 'secret_password',
  };
  
  axios
      .post(url, requestBody)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data);
      });
  ```

**Login User**

!!! WHENEVER you want to send a POST or a PATCH request which will change the data in the database, there has to be a user login, and you attach the token in the request header. It will be shown how to do that later in this document.

[How to use Tokens and Cookies for Axios Authentication?](https://rapidapi.com/guides/axios-tokens-cookies-auth)

- address: http://88395-17112.pph-server.de/api/users/login

- method: POST

- response:
  
  - request successful
    
    HTTP status: 200
    
    JWT Token is something like this:
    
    ```textile
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    ```
  
  - request failed
    
    HTTP status > 400
    
    Error message here varies based on the error, e.g when the user name or passport is wrong, the error message will be `INVALID_NAME_OR_PASSWORD`
    
    ```json
    {
        "error": "some error message"
    }
    ```

- example:
  
  ```javascript
  import axios from 'axios';
  const url = 'http://88395-17112.pph-server.de/api/users/login';
  
  const requestBody = {
      username: 'john doe', // notice here is username not name!
      password: 'secret_password',
  };
  
  axios
      .post(url, requestBody)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data);
      });
  ```

**Change Password**

To change the password of the user, you will need to attach the JWT token of this user in the request header.

- address: http://88395-17112.pph-server.de/api/users/changePassword

- method: POST

- response:
  
  - request successful:
    
    HTTP status: 200
    
    ```textile
    # There is no reponse provided by carecentive by default
    ```
  
  - request failed:
    
    HTTP status > 400
    
    ```json
    {
        "error": "some error message"
    }
    ```

- example:
  
  ```javascript
  import axios from 'axios';
  
  const url = 'http://88395-17112.pph-server.de/api/users/changePassword';
  
  // Change the token with the current user!!!
  // This token is just a example, it won't work!!!
  const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiam9obiBkb2UiLCJpYXQiOjE2ODY4NTU0NTUsImV4cCI6MTY4Njg5ODY1NX0.4moQ1iDnCYbbU0tSME3VfNMygXLgQ3A2FfvUXhQjQZI';
  
  // Set up request config.
  const config = {
      headers: {
          'Cookie': `token=${token}`,
      },
  };
  const requestBody = {
      newPassword: 'new_secret_password',
  };
  
  axios
      .post(url, requestBody, config)
      .then((response) => {
          console.log('HTTP status:', response.status);
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error(error.response.status);
          console.error(error.response.data);
      });
  ```

**User Logout**

After logout a user, the JWT token for this user will be cleared on the server.

So if user want to send any data, he or she has to login again.

- address: http://88395-17112.pph-server.de/api/users/logout

- method: GET

- response:
  
  - request successful:
    
    HTTP status: 200
    
    ```textile
    # There is no reponse provided by carecentive by default
    ```

- example:
  
  ```javascript
  import axios from 'axios';
  
  const url = 'http://88395-17112.pph-server.de/api/users/logout';
  
  // Change the token with the current user!!!
  // This token is just a example, it won't work!!!
  const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiam9obiBkb2UiLCJpYXQiOjE2ODY4NTU0NTUsImV4cCI6MTY4Njg5ODY1NX0.4moQ1iDnCYbbU0tSME3VfNMygXLgQ3A2FfvUXhQjQZI';
  
  // Set up request config.
  const config = {
      headers: {
          'Cookie': `token=${token}`,
      },
  };
  
  axios
      .get(url, config)
      .then((response) => {
          console.log('HTTP status:', response.status);
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error(error.response.status);
          console.error(error.response.data);
      });
  ```

### Dolphins API

**Create a dolphin**

- address: http://88395-17112.pph-server.de/api/dolphins

- method: POST

- Request body:
  
  ```json
  {
      "name": // name of dolphin,
      "sex": // 1: female, 0: male
      "on_site": // 1: yes, 0: for no
      "year_of_birth": // an integer of birth year
      "place_of_birth": // a string of birth place
  }
  ```

- response:
  
  - request successful
    
    HTTP status: 201
    
    The response body will contain all information you send to the server.
    
    ```json
    {
        "name": "test",
        "sex": 1, 
        "on_site": 1, 
        "year_of_birth": 2010,
        "place_of_birth": 
        "dolphin_id": 1 // id is generated by database, 
                        //  you don't have to include it
    }
    ```
  
  - request failed
    
    HTTP status > 400
    
    - The request body is invalid:
      
      HTTP status: 400
    
    - Without valid JWT token attached:
      
      HTTP status: 401
    
    - Dolphin to create already exists:
      
      HTTP status: 409
    
    - Internal server error:
      
      HTTP status: 500
    
    Error message here varies based on the error, e.g when the dolphin to create already exists in database, the error is  `Dolphin [name_here] already existed!` with HTTP status 409.
    
    ```json
    {
        "error": "some error message"
    }
    ```

- example:
  
  ```javascript
  import axios from 'axios';
  const url = 'http://88395-17112.pph-server.de/api/dolphins';
  
  const requestBody = {
      name: "test dolphin",
      sex: 1,
      on_site: 1,
      year_of_birth: 2010,
      place_of_birth: "Erlangen"
  };
  
  // Change the token with the current user!!!
  // This token is just a example, it won't work!!!
  const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiam9obiBkb2UiLCJpYXQiOjE2ODY4NTU0NTUsImV4cCI6MTY4Njg5ODY1NX0.4moQ1iDnCYbbU0tSME3VfNMygXLgQ3A2FfvUXhQjQZI';
  
  // Set up request config.
  const config = {
      headers: {
          'Cookie': `token=${token}`,
      },
  };
  
  axios
      .post(url, requestBody, config)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data)
      });
  ```

**Get all dolphins**

- address: http://88395-17112.pph-server.de/api/dolphins

- method: GET

- response:
  
  - request successful
    
    HTTP status: 200
    
    The response body will be an array of dolphin information objects.
    
    ```json
    [
      {
        dolphin_id: 1,
        name: 'test dolphin',
        sex: 1,
        on_site: 1,
        year_of_birth: 2010,
        place_of_birth: 'Erlangen',
        created_at: '2023-06-15T19:58:32.000Z',
        updated_at: '2023-06-15T19:58:32.000Z'
      },
      {
        dolphin_id: 2,
        name: 'test dolphin',
        sex: 1,
        on_site: 1,
        year_of_birth: 2010,
        place_of_birth: 'Erlangen',
        created_at: '2023-06-15T19:59:32.000Z',
        updated_at: '2023-06-15T19:59:32.000Z'
      },
      {
        dolphin_id: 3,
        name: 'test dolphin',
        sex: 1,
        on_site: 1,
        year_of_birth: 2010,
        place_of_birth: 'Erlangen',
        created_at: '2023-06-15T19:58:32.000Z',
        updated_at: '2023-06-15T19:58:32.000Z'
      }
    ]
    ```
  
  - request failed
    
    HTTP status > 400
    
    - Internal server error:
      
      HTTP status: 500
      
      Error message here varies based on the error.
      
      ```json
      {
          "error": "some error message"
      }
      ```

- example:
  
  ```javascript
  import axios from 'axios';
  const url = 'http://88395-17112.pph-server.de/api/dolphins';
  
  axios
      .get(url)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data)
      });
  ```

**Get single dolphin by name**

- address: http://88395-17112.pph-server.de/api/dolphins/:name

- method: GET

- response:
  
  - request successful
    
    HTTP status: 200
    
    The response body will be an array of dolphin information object.
    
    ```json
    {
        dolphin_id: 1,
        name: 'test dolphin',
        sex: 1,
        on_site: 1,
        year_of_birth: 2010,
        place_of_birth: 'Erlangen',
        created_at: '2023-06-15T19:58:32.000Z',
        updated_at: '2023-06-15T19:58:32.000Z'
     },
    ```
  
  - request failed
    
    HTTP status > 400
    
    - Dolphin not fount:
      
      HTTP status: 404
    
    - Internal server error:
      
      HTTP status: 500
      
      Error message here varies based on the error, e.g when the dolphin to query is not in database, the error is `No dolphin named [dolphin_name]` with HTTP status 404.
      
      ```json
      {
          "error": "some error message"
      }
      ```

- example:
  
  ```javascript
  import axios from 'axios';
  // here you need to put the name of dolphin at the end of url
  const url = 'http://88395-17112.pph-server.de/api/dolphins/test1';
  
  axios
      .get(url)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data)
      });
  ```

**Update the info for one dolphin**

**Delete one dolphin**

### Good Feeding API

**Upload the result of good feeding test**

- address: http://88395-17112.pph-server.de/api/good_feeding

- method: POST

- request body:
  
  ```json
  {
      "dolphin_name":"test", // name of dolphin
      "body_condition_score":3, // 1, 2, 3
      "weight": 3, // 1, 3
      "weight_measured": 15.5, // weekly measured weight of dolphin
      "kcal_calculations": 3, // 1, 3
      "blood_hydration":3, // 1, 2, 3
      "fish_quality":3, // 1, 3 
      "fish_variety":3 // 1, 2, 3
  }
  ```

- response:
  
  - request successful
    
    HTTP status: 201
    
    The response body will be the good feeding object that has been inserted to database.
    
    ```json
    // This is a example
    {
        "user_id": 1,
        "dolphin_id": 1,
        "body_condition_score": 3,
        "weight": 3,
        "weight_measured": 15.5,
        "kcal_calculations": 3,
        "blood_hydration": 3,
        "fish_quality": 3,
        "fish_variety": 3,
        "feeding_record_id": 52
    }
    ```
  
  - request failed
    
    HTTP status > 400
    
    - Bad request body:
      
      HTTP status: 400
    
    - Internal server error:
      
      HTTP status: 500
      
      Error message here varies based on the error, e.g when there is a typo in the dolphin name, the error message is `dolphin not exists in database!` with HTTP status 400
      
      ```json
      {
          "error": "some error message"
      }
      ```

- example:
  
  ```javascript
  import axios from 'axios';
  const url = 'http://88395-17112.pph-server.de/api/good_feeding';
  
  const requestBody = {
      dolphin_name:"test1",
      body_condition_score:3,
      weight: 3,
      weight_measured: 15.5,
      kcal_calculations: 3,
      blood_hydration:3,
      fish_quality:3,
      fish_variety:3
  }
  
  // Change the token with the current user!!!
  // This token is just a example, it won't work!!!
  const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiam9obiBkb2UiLCJpYXQiOjE2ODY4NTU0NTUsImV4cCI6MTY4Njg5ODY1NX0.4moQ1iDnCYbbU0tSME3VfNMygXLgQ3A2FfvUXhQjQZI';
  
  // Set up request config.
  const config = {
      headers: {
          'Cookie': `token=${token}`,
      },
  };
  
  axios
      .post(url, requestBody, config)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data)
      });
  ```

**Get a test result by date**

- address: http://88395-17112.pph-server.de/api/good_feeding?date=[yyyy-mm-dd]

- method: GET

- response:
  
  - request successful
    
    HTTP status: 200
    
    The response body will be a list of good_feeding test object created by the given date.
    
    ```json
    // This is a example
    [
        {
            "feeding_record_id": 51,
            "user_id": 47,
            "dolphin_id": 55,
            "body_condition_score": 3,
            "weight": 3,
            "weight_measured": 15.5,
            "kcal_calculations": 3,
            "blood_hydration": 3,
            "fish_quality": 3,
            "fish_variety": 3,
            "created_at": "2023-06-15T20:45:49.000Z",
            "updated_at": "2023-06-15T20:45:49.000Z"
        },
        {
            "feeding_record_id": 52,
            "user_id": 47,
            "dolphin_id": 56,
            "body_condition_score": 3,
            "weight": 3,
            "weight_measured": 15.5,
            "kcal_calculations": 3,
            "blood_hydration": 3,
            "fish_quality": 3,
            "fish_variety": 3,
            "created_at": "2023-06-15T21:16:17.000Z",
            "updated_at": "2023-06-15T21:16:17.000Z"
        }
    ]
    ```
  
  - request failed
    
    HTTP status > 400
    
    - Bad request body:
      
      HTTP status: 400
    
    - Internal server error:
      
      HTTP status: 500
      
      Error message here varies based on the error, e.g when the query parameter is not in the format of yyyy-mm-dd, the error message is `Invalid date format. Please provide a date in the format yyyy-mm-dd` with HTTP status 400
      
      ```json
      {
          "error": "some error message"
      }
      ```

- example:
  
  ```javascript
  import axios from 'axios';
  const date = '2023-06-15'
  const url = `http://88395-17112.pph-server.de/api/good_feeding?${date}`;
  
  axios
      .post(url, requestBody)
      .then((response) => {
          console.log('Response:', response.data);
      })
      .catch((error) => {
          console.error('Error:', error.response.data)
      });
  ```