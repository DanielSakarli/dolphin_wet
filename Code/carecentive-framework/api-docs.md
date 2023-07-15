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

### Catalog

[User API](#user-api)

    [Register user](#register-user)

    [Login user](#login-user)

    [Change password](#change-password)

    [User logout](#user-logout)

[Dolphins API](#dolphins-api)

    [Create a dolphin](#create-a-dolphin)

    [Get all dolphins](#get-all-dolphins)

    [Get single dolphin by name](#get-single-dolphin-by-name)

[Good Feeding API](#good-feeding-api)

    [Upload the result of good feeding test](#upload-the-result-of-good-feeding-test)

    [Get a test result by date](#get-a-test-result-by-date)

[Good Health API](#good-health-api)

    [Upload the result of good health test](#upload-the-result-of-good-health-test)

[Good Housing API](#good-housing-api)

    [Upload the result of good housing test](#upload-the-result-of-good-housing-test)

[Appropriate Behaviour API](#appropriate-behaviour-api)

    [Upload the result of behaviour test](#upload-the-result-of-behaviour-test)

[Photo Uploading API](#photo-uploading-api)

---

## API Usage

### User API

#### Register User

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

#### Login User

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

#### Change Password

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

#### User Logout

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

#### Create a dolphin

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

#### Get all dolphins

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

#### Get single dolphin by name

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

#### Upload the result of good feeding test

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

#### Get a test result by date

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

### Good Health API

#### Upload the result of good health test

- address: http://88395-17112.pph-server.de/api/good_health

- method: POST

- request body:
  
  ```json
  // The type of the indicators can be string, it's fine.
  {
      "dolphin_name": "test_dolphin1",
      "normal_floatability": 1,
      "eye_lesions": null, // null is allowed, when there is no data, just use null
      "visual_cues": 1,
      "mouth_exam": 1,
      "respiratory_disease": 1,
      "force_expiration": 1,
      "external_disease_signs":1,
      "comments": null
  }
  ```

- response:
  
  - request successful
    
    HTTP status: 201
    
    The response body will be the good health object that has been inserted to database.
    
    ```json
    // This is a example
    {
        "dolphin_id": 4,
        "user_id": 4,
        "dolphin_name": "test1",
        "normal_floatability": 1,
        "eye_lesions": null,
        "visual_cues": 1,
        "mouth_exam": 1,
        "respiratory_disease": 1,
        "force_expiration": 1,
        "external_disease_signs": 1,
        "health_record_id": 4,
        "comments":null
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

### Good Housing API

#### Upload the result of good housing test

- address: http://88395-17112.pph-server.de/api/good_housing

- method: POST

- request body:
  
  ```json
  // The type of the indicators can be string, it's fine.
  {
      "dolphin_name": "test1",
      "enclosure_barrier_safety": 1,
      "foreign_body_ingestion": null, // null is allowed, when there is no data, just use null
      "pool_design": 1,
      "forced_loneliness": 1,
      "water_quality": 1,
      "sufficient_shade": 1,
      "acoustic_comfort":1,
      "comments": null
  } 
  ```

- response:
  
  - request successful
    
    HTTP status: 201
    
    The response body will be the good housing object that has been inserted to database.
    
    ```json
    // This is a example
    {
        "dolphin_id": 4,
        "user_id": 4,
        "dolphin_name": "test1",
        "enclosure_barrier_safety": 1,
        "foreign_body_ingestion": null,
        "pool_design": 1,
        "forced_loneliness": 1,
        "water_quality": 1,
        "sufficient_shade": 1,
        "acoustic_comfort": 1,
        "housing_record_id": 1,
        "comments": null
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

### Appropriate Behaviour API

#### Upload the result of behaviour test

- address: http://88395-17112.pph-server.de/api/behaviour

- method: POST

- request body:
  
  ```json
  // The type of the indicators can be string, it's fine.
  {
      "dolphin_name":"test1",
      "environmental_enrichment":"3", // string is fine
      "affiliative_behaviour":1,
      "play_behaviour":1,
      "socio_sexual_behaviour":1,
      "maternal_behaviour":1,
      "displacement_behaviour":1,
      "oral_stereotypic_behaviour":1,
      "repetitive_body_movement":1,
      "self_grooming_behaviour":1,
      "regurgitation_reingestion":1,
      "rake_marks":1,
      "displaying_aggressive_behaviour":1,
      "receiving_aggressive_behaviour":1,
      "social_isolation":1,
      "avoidance_pool_areas":1,
      "comments": null
  }
  ```

- response:
  
  - request successful
    
    HTTP status: 201
    
    The response body will be the behaviour data object that has been inserted to database.
    
    ```json
    // This is a example
    {
        "dolphin_id": 4,
        "user_id": 4,
        "dolphin_name": "test1",
        "environmental_enrichment": 3,
        "affiliative_behaviour": 1,
        "play_behaviour": 1,
        "socio_sexual_behaviour": 1,
        "maternal_behaviour": 1,
        "displacement_behaviour": 1,
        "oral_stereotypic_behaviour": 1,
        "repetitive_body_movement": 1,
        "self_grooming_behaviour": 1,
        "regurgitation_reingestion": 1,
        "rake_marks": 1,
        "displaying_aggressive_behaviour": 1,
        "receiving_aggressive_behaviour": 1,
        "social_isolation": 1,
        "avoidance_pool_areas": 1,
        "behaviour_record_id": 1,
        "comments": null
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



### Photo Uploading API

Uploading a photo for a test.

- address: http://88395-17112.pph-server.de/api/photo

- method: POST

- example:
  
  to show you how to use it, I created a minimum demo in raw HTML and JavaScript.        

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Dolphin Wet test picture uploading</title>
		<link rel="stylesheet" href="./style.css" />
	</head>
	<body>
		<div class="container">
			<h1>File Upload</h1>
			<form id="form">
				<div class="input-group">
					<label for="name">Your name</label>
					<input name="name" id="name" placeholder="Enter your name" />
				</div>
				<div class="input-group">
					<label for="files">Select files</label>
					<input id="files" name="files" type="file" multiple />
				</div>
				<button class="submit-btn" type="submit">Upload</button>
			</form>
		</div>
		<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
		<script src="./app.js"></script>
	</body>
</html>

```

```js
const form = document.getElementById('form');

form.addEventListener('submit', submitForm);

/**
 * Submit the format with given data attached photo to server.
 * @param {String} date - The test date in the format of yyyy-mm-dd. This is very important!
 * @param {String} test_name - The test name, based on the detailed checkbox document,
 * 												it is either 'eye_lesions', 'mouth_condition', 
 */
function submitForm(e, test_date, test_name) {
	// prevents the default behavior of the browser, which is to perform a full page reload.
	// I have no idea wether you need this in ionic.
	e.preventDefault();

	// gets the form input html element.
	const files = document.getElementById('files');

    // !!! The code above is needed for plain HTML and JS,
    // Maybe in Ionic you can also do it but I'm not sure...
    // Please use corresponding methods in Ionic.

	// create a new FormData object, you can learn more here
	// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
	const formData = new FormData();

	// in case of multiple photos, use a loop here to add all photos.
    // files.files: first files is the html element,
    // second files is the name for that html element
    // The html element is like: 
    // <input id="files" name="files" type="file" multiple />
	for (let i = 0; i < files.files.length; i++) {
		formData.append('files', files.files[i]);
	}
    
    // Give test_date and test_name for this picture!
	formData.append('test_date', test_date);
	formData.append('test_name', test_name);

	axios
		.post('http://88395-17112.pph-server.de/api/photo', formData, {
			headers: {
                // !!! The content-type must be multipart/form-date
                // otherwise errors arise
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((response) => {
			console.log(response);
			if (response.status === 201) {
				// do something after uploading successfully
				console.log('success!');
			}
		})
		.catch((error) => {
			// error handling here
			console.log(error);
		});
}

```
