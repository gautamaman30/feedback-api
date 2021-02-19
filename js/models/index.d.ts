declare type status = 'rejected' | 'approved' | 'waiting';
export interface User {
    user_id: string;
    name: string;
    admin_key?: string;
    email?: string;
    title?: string;
    date_of_birth?: Date;
}
export interface Technology {
    technology_id: string;
    name: string;
    details?: string;
}
export interface Feedback {
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
export interface Count {
    feedback_id: string;
    user_counted_feedback: string[];
}
export declare let users: Array<User>;
export declare let technologies: Array<Technology>;
export declare let feedbacks: Array<Feedback>;
export {};
