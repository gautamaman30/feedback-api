import {User, Feedback, Technology} from '../components/index'


export let feedbacks: Array<Feedback> = [{
    feedback_id: '22222222a',
    posted_by: '000000200',
    name: 'john',
    feedback_type: 'user',
    user_id: '000000100',
    content: 'John is very hard working',
    status: 'approved',
    created_on:  new Date(2021,2,12,10,52,51.57),
    count: ["john", "zack"]
  }, {
    feedback_id: '22222222b',
    posted_by: '000000200',
    name: 'nodejs',
    feedback_type: 'technology',
    technology_id: '11111111a',
    content: 'Nodejs is fast',
    status: 'approved',
    created_on: new Date(2021,2,11,10,52,51.57),
    count: ["john", "zack", "frank", "claire"]
},{
    feedback_id: '22222222c',
    posted_by: '000000250',
    name: 'mongodb',
    feedback_type: 'technology',
    technology_id: '11111111c',
    content: 'Easy to learn',
    status: 'approved',
    created_on: new Date(2021,2,10,10,52,51.57),
    count: ["zack", "frank", "claire"]
}];


export let users: Array<User> = [{
    user_id: "000000001",
    name: "admin1",
    role: 'admin',
    email: "admin1@crownstack.com"
},{
    user_id: "000000002",
    name: "admin2",
    role: 'admin',
    email: "admin2@crownstack.com"
}, {
    user_id: "000000100",
    name: "john",
    role: 'employee',
    email: "john@crownstack.com",
    date_of_birth: new Date(1998, 12, 5),
}, {
    user_id: "000000200",
    name: "zack",
    role: 'employee',
    email: "zack@crownstack.com",
    date_of_birth: new Date(1990, 2, 25),
}, {
    user_id: "000000250",
    name: "frank",
    role: 'employee',
    email: "frank@crownstack.com",
    date_of_birth: new Date(1995, 2, 10),
}, {
    user_id: "000000300",
    name: "claire",
    role: 'employee',
    email: "claire@crownstack.com",
    date_of_birth: new Date(1990, 3, 25),
}];


export let technologies: Array<Technology> = [{
    technology_id: "11111111a",
    name: "nodejs",
    details: "Js runtime environment based on V8 engine"
},{
    technology_id: "11111111b",
    name: "nginx",
    details: "Web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache"
},{
    technology_id: "11111111c",
    name: "mongodb",
    details: "nosql database" 
},{
    technology_id: "11111111d",
    name: "postgres",
    details: "sql database" 
}];



 
