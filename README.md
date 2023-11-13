## TPA-005 (Back End Web Dev)
-------------------------------------------------------------------------------------------------------------------------------------------------------
### How To Run
- npm init -y
- npm install
- npm run dev

### Library
- bcrypt
- Express JS          
- Sequelize
- Sequelize-Cli
- MySql2
- Nodemon
- Bcrypt
- JWT (JSON Web Token)
- Body-Parser         
- Dotenv
- cors
-------------------------------------------------------------------------------------------------------------------------------------------------------

### End Point
Di sini saya membagi 2 route yaitu public dan private 

#### Public
| Method | Endpoint |
| ------ | ------ |
| Post | /login |
| Post | /register |

#### Private

##### Users
| Method | Endpoint |
| ------ | ------ |
| Get | /users |
| Get | /users/:usersId |

##### Task/Todo
| Method | Endpoint |
| ------ | ------ |
| Get | /todos |
| Get | /todos/:todosId |
| Post | /todos |
| Patch | /todos/:todosId |
| Delete | /todos/:todosId |

