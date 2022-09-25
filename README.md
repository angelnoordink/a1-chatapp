#### 3813ICT Assignment 1 - Phase 2
# Angular Chat App
**Angelique Noordink - s5215609**  
  

## To Do List
- [ ] Add Table of Contents
- [ ] Video Recording of Site
- [ ] ERD Diagram image
- [ ] Add Personal details


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
|                   | super_admin_ind       | Boolean()             | True if super_admin.                                                |
|                   | password              | String(20)            | Encrypted for safety, minimum 7 characters.                         |
| GROUP             | <ins>group_id<ins>    | Int()                 | Primary Key, Unique, Incr.                                          |
|                   | group_name            | String(50)            |                                                                     |
| ROOM              | <ins>room_id<ins>     | Int()                 | Primary Key, Unique, Incr.                                          |
|                   | room_name             | String(30)            |                                                                     |
|                   | *group_id*            | Int()                 | Foreign Key (References group.group_id).                            |
| USER_GROUP        | <ins>*user_id*<ins>   | Int()                 | Primary Key, Foreign Key (References user.user_id).                 |
|                   | <ins>*group_id*<ins>  | Int()                 | Primary Key, Foreign Key (References group.group_id).               |
|                   | role                  | Enum()                | Options will include; 'Group_Admin', 'Group_Assis" and 'Member'.    |
| MESSAGE           | <ins>message_id<ins>  | Init()                | Primary Key, Unique, Incr.                                          |
|                   | message               | String(5000)          |                                                                     |
|                   | *group_id*            | Int()                 | Foreign Key (References group.group_id).                            |
|                   | *user_id*             | Int()                 | Foreign Key (References user.user_id).                              |
|                   | *room_id*             | Int()                 | Foreign Key (References room.room_id).                              |

### Database ERD
<img src="https://github.com/angelnoordink/a1-chatapp/blob/main/documentation/ERD.png?raw=true" width="600" height="600"/>

---
## REST API
To be completed ...
### Auth Route
**Route:** `/api/auth`  
**Method:** `POST`  
**Parameters:** `{username: string, password: string}`  
**Return Value:**   
```
`{username: string, password: string}`  
```
Technical Explanation paragraph.    

### Create User


### Update User


### Delete User


### Get Users


### Get User Groups


### Get User Details


### Assign User to Group


### Assign User to Role


### Join User into Room

  
### Create Group


### Update Group


### Delete Group


### Remove User from Group


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
Using Express.js, cors, etc.
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
