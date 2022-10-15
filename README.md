#### 3813ICT Assignment 1 - Phase 2
# Angular Chat App
**Angelique Noordink - s5215609**  

---
## Git
### Git Layout
The git repository for this assignment contains the project folder and a README file. The default branch is called main which acts as a master branch for the repository. The repository for this assignment has been made private to mitigate the risk of plagarism.
### Version Control Approach. 
In the development phase of the assignment, I frequently committed my changes to ensure that each change was tracked as necessary, and to prevent potential  conflicts. Instead of branching I just ensured that my commits were frequent enough to not cause any trouble if there was a conflict.
In the secon phase of the assignment I made the decision to continue using the same git repository, as it is just a continuation of the same project and will be helpful to refer back to.

---
## Data Structures  
There are three primary data classes used in this program. They are users, groups, and rooms. Users is an array that consists of a user object. For this phase of the project the data structure was implemented using MongoDB. The management of these data structures was a big part of this phase of the assignment, and using MongoDB mad the data management processes far more consistent and organised.
Data management is vital in Software Development as it protects and secures data, increases effeciency, and helps minimize potential errors by restoring structure.
### Users
The Users array consists of a user id, username, email address and potentially Super_Admin access. A user can also obtain an admin role in a group if granted. There are many permissions that the users have that restrict and allow them different access and advantages.
### Groups
Groups is an array that consist of a group object. A group has an id and a group name. Each group has multiple users assigned to it and multiple rooms within it, allowing for many different potential uses.
### Rooms
Rooms is an array that consist of a room object. A room has an id and a room name, and each room belongs to one specific group. The rooms are where the messages are stored and where the users can communicate in different rooms for different uses and purposes.
### Relational Database Schema
| Collection Name   | Field                 | Type                  | Description                                                         |
| ----------------- | ----------------------|-----------------------|---------------------------------------------------------------------|
| USER              | <ins>user_id<ins>     | Int()                 | Primary Key, Unique, Incr.                                          |
|                   | user_name             | String(20)            |                                                                     |
|                   | email_address         | String(50)            | e.g. example@google.com.                                            |
|                   | role                  | String()              | e.g.'super_user','group_admim','group_assis" and 'member'.          |
|                   | password              | String(20)            | Encrypted for safety, minimum 7 characters.                         |
| GROUP             | <ins>group_id<ins>    | Int()                 | Primary Key, Unique, Incr.                                          |
|                   | group_name            | String(50)            |                                                                     |
| ROOM              | <ins>room_id<ins>     | Int()                 | Primary Key, Unique, Incr.                                          |
|                   | room_name             | String(30)            |                                                                     |
|                   | *group_id*            | Int()                 | Foreign Key (References group.group_id).                            |
| USER_GROUP        | <ins>*user_id*<ins>   | Int()                 | Primary Key, Foreign Key (References user.user_id).                 |
|                   | *group_id*            | Int()                 | Primary Key, Foreign Key (References group.group_id).               |

### Database ERD
<img src="https://github.com/angelnoordink/a1-chatapp/blob/main/documentation/ERD.png?raw=true" width="800" height="600"/>

---
## REST API
Rest API routes were used throughout the project as a way of communicating between the client side and server side. The database used to store all the data for the project was  MongoDB, and the easiest way to communicate with this database was through API's.


### Register User
This api end-point adds new user to user collection in the db. This route will be called on the action of 'Create User'. By default the role of the user will be set as 'member'. 

**Route:** `/users/register`  
**Method:** `POST`  
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Content-Type              | application/json             |

**Request Body:**
```
{
    username: string, 
    email: string, 
    password: string
}
```
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```

### Authenticate User
This api end-point authenticates the current user by checking that the user exists within the user collection in the db, as well as checking that the password matches. This route will be called on submission of the user login form and if response is not successful the login will fail.

**Route:** `/users/authenticate`  
**Method:** `POST`  
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Content-Type              | application/json             |

**Request Body:**
```
{
    username: string, 
    password: string
}
```
**Response Body:**   
```
{
    success: boolean,
    token: string,
    user: {
        id: string,
        username: string,
        email: string,
        role: string
    }
} 
```


### Get User Profile
This api end-point retrieves the current users details from the user collection in the db. This route will be called on init of the homepage in order to display the details of the user.

**Route:** `/users/profile`  
**Method:** `GET`  
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Authorization             | JWT Token (String)           |

**Response Body:**   
```
{
    id: string,
    username: string,
    email: string,
    password: string,
    role: string
} 
```

### Get User From ID
This api end-point retrieves the current users assigned groups from a given user ID.  The userId is specified through the query parameter. This route will be called on init of the homepage in order to display the corresponding groups for the selected user.

**Route:** `/users/user/:userId`  
**Method:** `GET`  
**Response Body:**   
```
[
    {
        _id: string,
        user_id: string,
        group_id: string,
        group: {
             _id: string,
             group_name: string
        }
    } 
]
```

### Get All Users
This api end-point retrieves all of the users within the user collection in the db. This route will be called on init of the users page.

**Route:** `/users/users`  
**Method:** `GET`  
**Response Body:**   
```
[
    {
        id: string,
        username: string,
        email: string,
        role: string
    } 
]
```


### Update User
This api end-point updates the specific user within the user collection in the db. The user_id is specified through the query parameter 'userId' which is to be of type string. This route will be called on the action of updating user details or setting the user role.

**Route:** `/users/user/:userId`  
**Method:** `PATCH` 
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Content-Type              | application/json             |

**Request Body:**
```
{
    username: string, 
    email: string, 
    role: string,
}
```
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```


### Delete User
This api end-point deletes the specific user from the user collection in the db. The user_id is specified through the query parameter 'userId' which is to be of type string. This route will be called on the action of deleting the user.

**Route:** `/users/user/{userId}`  
**Method:** `DELETE`  
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```

### Get All Groups
This api end-point retrieves all of the groups within the group collection in the db. This route will be called to get all existing groups for when a superuser views the homepage.

**Route:** `/groups/groups`  
**Method:** `GET`  
**Response Body:**   
```
[
    {
        _id: string,
        group_name: string
    } 
]
```


### Get Group Details
This api end-point retrieves the current group details from the group collection in the db. The group_id is specified through the query parameter.

**Route:** `/groups/group/:groupId`  
**Method:** `GET`  
**Response Body:**   
```
{
    id: string,
    group_name: string,
} 
```


### Create Group
This api end-point adds new group to grou[ collection in the db. This route will be called on the action of 'Create Group'. 

**Route:** `/groups/add`  
**Method:** `POST`  
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Content-Type              | application/json             |

**Request Body:**
```
{
    group_name: string
}
```
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```


### Delete Group
This api end-point deletes the specific group from the group collection in the db. The group_id is specified through the query parameter 'groupId' which is to be of type string. This route will be called on the action of deleting the group.

**Route:** `/groups/group/{groupId}`  
**Method:** `DELETE`  
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```


### Get Group Users
This api end-point retrieves current groups assigned users.  The groupId is specified through the query parameter and is of type string. This route will be called on init of the chat page in order to display the corresponding users for the selected group.

**Route:** `/groups/groupusers/:groupId`  
**Method:** `GET`  
**Response Body:**   
```
[
    {
        _id: string,
        user_id: string,
        group_id: string,
        user: {
             _id: string,
             username: string,
             email: string,
             password: string,
             role: string
        }
    } 
]
```

### Assign User to Group 
This api end-point adds a user to a group or vise versa by adding a group ID and user ID to a joining table. This route will be called on init of the homepage and chat page and will be used to see which users belong to which groups, and which groups belong to which users. This route was implemented to solve a relational problem between the 2 tables.

**Route:** `/users/assign`  
**Method:** `POST`  
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Content-Type              | application/json             |

**Request Body:**
```
{
    group_id: string, 
    user_id: string
}
```
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```

### Remove User from Group 
This api end-point removes a link between a user and a group without affecting the individual records. This route will be called to remove the user from the group on the chat page. The user group id is specified through the query parameter 'userGroupId' which is to be of type string. 

**Route:** `/users/{userGroupId}`  
**Method:** `DELETE`  
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```


### Get Group Rooms
This api end-point retrieves current groups assigned rooms.  The groupId is specified through the query parameter and is of type string. This route will be called on init of the chat page in order to display the corresponding rooms for the selected group.

**Route:** `/groups/room/:groupId`  
**Method:** `GET`  
**Response Body:**   
```
[
    {
        _id: string,
        room_name: string,
        group_id: string
    } 
]
```


### Create Room
This api end-point creates a room and assigns it to a specific group. The groupId is specified through the query parameter and is of type string. This route will be called on the create evemt of rooms in the chat componenent.

**Route:** `/groups/room`  
**Method:** `POST`  
**Header Parameters:**
| Key                       | Value                        |
| ------------------------- | -----------------------------|
| Content-Type              | application/json             |

**Request Body:**
```
{
    room_name: string,
    group_id: string
}
```
**Response Body:**   
```
{
    success: boolean,
    msg: string
}  
```



---
## Angular Architecture
### Components
- **Login:** The login is the default route for the program, consisting of a simple login form with inputs for username and password and a submit button. The login authenticates the user by ensuring that the correct details are entered and already exist in the database.
- **Homepage:** The homepage is the first component that displays after login and shows the assigned groups for the logged in user, by clicking on one of these groups, the user will route to the chat page for that group. The homepage also has a create group field where certain user types can add new groups.
- **Users:** The users componet allows the key users to manage other site users via changing roles, assigning to groups, and deleting where necessary.
- **Account:** The account component allows the user to view and update their personal details.
- **Chat:** The chat component is the main feature of the site including a the messaging feature where users are able to select a group or room and send/recieve live messages via sockets. The chat component also displays the list of users within the group and allows certain user types to add or delete users from the group.


### Services
- **Auth Service:** The auth service is used store Rest API routes and functions that are used to communicate with the database for auth related operations
- **Authguard Service:** The authguard service is used to protect the application's routes by ensuring that the user is logged in and activated before they can access any restricted components.
- **Chat Service:** The chat service was made to communicate with the websockets for the chat as well as store relevant chat operations. The chat service allows for multiple sockets to be run at a time and for multiple users to communicate on one socket, providing real-time communication.
- **Userdata Service:** The userdata service is used store most of the Rest API routes and functions that are used to communicate with the database for the user, group, and room collections.
- **Validate Service:** The validate service is used to validate the user in the registration process, validating the form fields before allowing the user to successfully register/login.


---
## References

Web Dev Simplified. (2019, May 14). *Build A REST API With Node.js, Express, & MongoDB - Quick* [Video]. YouTube. Retrieved October 9, 2022, from https://www.youtube.com/watch?v=fgTGADljAeg

Rosa, S. G. da. (2020, February 19). *Angular: Unit Testing Jasmine, Karma (step by step).* Medium. Retrieved October 11, 2022, from https://medium.com/swlh/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4

Kreider, D. (2022, February 3). *How to use Protractor with Angular 12 or greater.* Retrieved October 12, 2022, from https://danielk.tech/home/angular-12-and-protractor
