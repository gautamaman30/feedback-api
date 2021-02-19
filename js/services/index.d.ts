import { User, Feedback, Technology } from '../models/index';
export declare class Service {
    getAllUsers(): User[];
    getAllTechnologies(): Technology[];
    getAllFeedbacks(): Feedback[];
    editFeedbackStatus(feedback_info: {
        feedback_id: string;
        status: "approved" | "rejected";
    }): Feedback | {
        error: string;
    };
    removeFeedback(feedback_info: {
        feedback_id: string;
    }): {
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    };
    editFeedback(feedback_info: {
        feedback_id: string;
        feedback: string;
    }): Feedback | {
        error: string;
    };
    removeTechnology(technology_info: {
        name: string;
    }): {
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    };
    removeUser(user_info: {
        user_id: string;
    }): {
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    };
    editTechnology(technology_info: {
        name: string;
        details: string;
    }): Technology | {
        error: string;
    };
    checkUserExist(key: string, value: any): User | {
        error: string;
    };
    checkTechnologyExist(key: string, value: any): Technology | {
        error: string;
    };
    checkFeedbackExist(key: string, value: any): Feedback | {
        error: string;
    };
    addUser(user_info: {
        name: string;
        email?: string;
        title?: string;
        date_of_birth?: Date;
    }): User;
    addTechnology(technology_info: {
        name: string;
        details?: string;
    }): Technology;
    addFeedback(feedback_info: {
        name: string;
        posted_by: string;
        feedback: string;
        user_id?: string;
        technology_id?: string;
    }): Feedback;
    filterFeedback(feedback_array: Array<Feedback>, key: string, values: string[]): Feedback[];
    sortFeedback(feedback_array: Array<Feedback>, key: string): Feedback[];
}
