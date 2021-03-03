export declare class Database {
    findAll(collectionName: string): Promise<any>;
    insertUser(user_info: any): Promise<any>;
    updateUser(filter: any, update: any): Promise<any>;
    deleteUser(query: any): Promise<any>;
    findUser(query: any): Promise<any>;
    findUsers(query: any): Promise<any>;
    findTechnology(query: any): Promise<any>;
    updateTechnology(filter: any, update: any): Promise<any>;
    deleteTechnology(query: any): Promise<any>;
    insertTechnology(technology_info: any): Promise<any>;
    findFeedback(query: any): Promise<any>;
    findFeedbacks(query: any): Promise<any>;
    findFeedbacksSorted(query: any, sortField: any): Promise<any>;
    updateFeedback(filter: any, update: any): Promise<any>;
    updateFeedbackCount(filter: any, update: any): Promise<any>;
    insertFeedback(feedback_info: any): Promise<any>;
    deleteFeedback(query: any): Promise<any>;
}
