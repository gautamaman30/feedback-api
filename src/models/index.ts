type status = 'rejected' | 'approved' | 'waiting';


export interface User{
    user_id: string;
    name: string;
    admin_key?: string;
    email?: string;
    title?: string; 
    date_of_birth?: Date;
}

export interface Technology{
    technology_id: string;
    name: string;
    details?: string;
}

export interface Feedback{
    feedback_id: string;
    name: string;
    feedback: string;
    posted_by: string;
    status: status;
    user_id?: string;
    technology_id?: string;
    created_on: Date;
    count: number; 
}

export interface Count{
    feedback_id: string,
    user_counted_feedback: string[]
}


export let users: Array<User> = [{
    user_id: "000000001",
    name: "admin1",
    admin_key: "Ui89g5o0a-96aOq3620-yTqPcndf5-82G3Klpc3",
    email: "admin1@crownstack.com"
}, {
    user_id: "000000100",
    name: "john",
    email: "john@crownstack.com",
    date_of_birth: new Date(1998, 12, 5),
}, {
    user_id: "000000200",
    name: "zack",
    email: "zack@crownstack.com",
    date_of_birth: new Date(1990, 2, 25),
}, {
    user_id: "000000250",
    name: "frank",
    email: "frank@crownstack.com",
    date_of_birth: new Date(1995, 2, 10),
}, {
    user_id: "000000300",
    name: "claire",
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


export let feedbacks: Array<Feedback> = [{
    feedback_id: '22222222a',
    posted_by: '000000200',
    name: 'john',
    user_id: '000000100',
    feedback: 'John is very hard working',
    status: 'approved',
    created_on:  new Date(2021,2,12,10,52,51.57),
    count: 0
  }, {
    feedback_id: '22222222b',
    posted_by: '000000200',
    name: 'nodejs',
    technology_id: '11111111a',
    feedback: 'Nodejs is fast',
    status: 'approved',
    created_on: new Date(2021,2,11,10,52,51.57),
    count: 0
},{
    feedback_id: '22222222c',
    posted_by: '000000250',
    name: 'mongodb',
    technology_id: '11111111c',
    feedback: 'Easy to learn',
    status: 'approved',
    created_on: new Date(2021,2,10,10,52,51.57), 
    count: 0
}];




 
