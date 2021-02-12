export interface Feedback{
    feedback_id: string;
    name: string;
    feedback_type: 'user' | 'technology';
    user_id?: string;
    technology_id?: string;
    posted_by: string;
    status: 'rejected' | 'approved' | 'waiting';
    content: string;
    created_on: Date;
    count: string[]; 
}


export interface User{
    user_id: string;
    name: string;
    role: 'admin' | 'employee';
    email?: string;
    title?: string; 
    date_of_birth?: Date;
}


export interface Technology{
    technology_id: string;
    name: string;
    details?: string;
}