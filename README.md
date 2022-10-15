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
<img src="https://github.com/angelnoordink/a1-chatapp/blob/main/documentation/ERD.png?raw=true" width="600" height="600"/>

---
## REST API
To be completed ...
http://localhost:3000/

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
        role: string,
        groupList: [
             {
                 _id: string,
                 group_id: string
             }
        ]
    }
} 
```


### Get User Profile
This api end-point retrieves the current users details from the user collection in the db. This route will be called on init of the homepage in order to display the corresponding groups for the selected user.

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
    role: string,
    groupList: [
         {
             _id: string,
             group_name: string,
             roomList: [
                   {  room_id: string  }
             ]
         }
    ]
} 
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
        role: string,
        groupList: [
             {
                 _id: string,
                 group_id: string
             }
        ]
    } 
]
```


### Update User
```diff
@@ UPDATE SECTION @@
```
This api end-point updates the specific user within the user collection in the db. The user_id is specified through the query parameter 'userId' which is to be of type string. This route will be called on the action of updating user details or setting the user role.

**Route:** `/users/user/:userId`  
**Method:** `PATCH`  
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

}  
```


### Delete User
```diff
@@ UPDATE SECTION @@
```
This api end-point deletes the specific user from the user collection in the db. The user_id is specified through the query parameter 'userId' which is to be of type string. This route will be called on the action of deleting the user.

**Route:** `/users/user/{userId}`  
**Method:** `DELETE`  
**Response Body:**   
```
{

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
        id: string,
        group_name: string,
        roomList: [
             {
                 _id: string,
                 room_id: string
             }
        ]
    } 
]
```


### Get Group Details
This api end-point retrieves the current group details from the group collection in the db. The group_id is specified through the query parameter 'groupId' which is to be of type string. This route will be called after routing to the messages page to get the selected group.
```diff
@@ UPDATE SECTION @@
```
**Route:** `/groups/group/:groupId`  
**Method:** `GET`  
**Response Body:**   
```
[
    {
        id: string,
        group_name: string,
        roomList: [
             {
                 _id: string,
                 room_id: string
             }
        ]
    } 
]
```


### Create Group

### Delete Group

### Get Group Users

### Get Group Rooms

### Remove User from Group 

### Assign User to Group 

### Create Room

### Delete Room



---
## Angular Architecture
### Login
Login was the default route for the program, consisting of a simple login form with inputs for username and password and a submit button. The login authenticates the user by ensuring that the correct details are entered and already exist in the database.
### Chat
The chat is the main feature of the site including a the messaging feature where users are able to select a group or room and send/recieve live messages via sockets.
### Permissions
Permissions were utilised througout the site to provide and limit access to specific users based on their role.
### User Management Console
The user management console allows the key users to manage other site users via changing roles, assigning to groups, and deleting where necessary.
### Account
The account allows the user to view and update their personal details.
### Server
Using Express.js, cors, etc. A description of how you divide the responsibilities between client and server (you are encouraged to have the server provide a REST API which returns JSON in addition to a static directory).
### Sockets
The account allows the user to view and update their personal details.
### Database
The account allows the user to view and update their personal details.
### Video Call feature
The account allows the user to view and update their personal details.
### Testing
The account allows the user to view and update their personal details.
### User Interface Design.
The account allows the user to view and update their personal details.




---
## References

Web Dev Simplified. (2019, May 14). *Build A REST API With Node.js, Express, & MongoDB - Quick* [Video]. YouTube. Retrieved October 9, 2022, from https://www.youtube.com/watch?v=fgTGADljAeg

Rosa, S. G. da. (2020, February 19). *Angular: Unit Testing Jasmine, Karma (step by step).* Medium. Retrieved October 11, 2022, from https://medium.com/swlh/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4

Kreider, D. (2022, February 3). *How to use Protractor with Angular 12 or greater.* Retrieved October 12, 2022, from https://danielk.tech/home/angular-12-and-protractor
