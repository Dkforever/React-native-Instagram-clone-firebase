import {USERS} from './Users'

export const POSTS = [
    {
    imageUrl :'https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg',
    user: USERS[0].user,
    likes: 7870,
    caption:'Bike Ride to Durgapur',
    profile_picture: USERS[0].image,
    comments:[{
        user:'Dhiraj Ram',
        comment:'You are doing a Good job',
    },
{
    user:'Rani Singh',
    comment:'Nice',
},
{
    user:'Raja Singh',
    comment:'Nice Work',
},
{
    user:'Riya Singh',
    comment:'You are My Love',
},
],
},
{
    imageUrl :'https://www.onthisday.com/images/people/robert-downey-jr-medium.jpg',
    user: USERS[1].user,
    likes: 7877,
    caption:'Bike Ride to Durgapur and waria',
    profile_picture: USERS[1].image,
    comments:[
        {
            user:'Dhiraj Roma',
            comment:'You are doing a Good job',
        },
    {
        user:'Soni Singh',
        comment:'Miss the happiness',
    },
{
    user:'Ranjay Ram',
    comment:'Go sleep Tight',
},
],
},
]