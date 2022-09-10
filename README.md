#### 3813ICT Assignment 1 - Phase 1
# Angular Chat App

## Git
#### Git Layout
The git repository for this assignment contains the project folder and a README file. The default branch is called main which acts as a master branch for the repository.
#### Version Control Approach
In the development phase of the assignment, I frequently committed my changes to ensure that each change was tracked as necessary, and to prevent potential  conflicts. Instead of branching I just ensured that my commits were frequent enough to not cause any trouble if there was a conflict.

## Data Structures  
There are three primary data structures used in this program. They are users, groups, and rooms. Users is an array that consists of a user object. A user has an id, username, email address and a role.
Users is an array that consists of a user object. A user has an id, username, email address and a role.
Groups is an array that consist of a group object. A group has an id and a group name.
Rooms is an array that consist of a room object. A room has an id and a room name

## REST API
To be completed ...

## Angular Architecture
#### Login
Login was the default route for the program, consisting of a simple login form with inputs for username and password and a submit button. The login authenticates the user by ensuring that the correct details are entered and already exist in the database.
#### Chat
The chat is the main feature of the site including a the messaging feature where users are able to select a group or room and send/recieve live messages via sockets.
#### Permissions
Permissions were utilised througout the site to provide and limit access to specific users based on their role.
#### User Management Console
The user management console allows the key users to manage other site users via changing roles, assigning to groups, and deleting where necessary.
#### Account
The account allows the user to view and update their personal details.
