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
export declare class Database {
    findAll(collectionName: string): Promise<any>;
    updateFeedback(filter: any, update: any): Promise<any>;
    updateTechnology(filter: any, update: any): Promise<any>;
    deleteFeedback(query: any): Promise<any>;
    deleteTechnology(query: any): Promise<any>;
    deleteUser(query: any): Promise<any>;
    findUser(query: any): Promise<any>;
    findTechnology(query: any): Promise<any>;
    findFeedback(query: any): Promise<any>;
    insertUser(user_info: any): Promise<any>;
    insertTechnology(technology_info: any): Promise<any>;
    insertFeedback(feedback_info: any): Promise<any>;
}
export {};
