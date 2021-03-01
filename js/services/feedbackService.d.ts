export default class FeedbackService {
    getAllFeedbacks(): Promise<any>;
    getFeedbacks(filter: any): Promise<any>;
    getFilteredAndSortedFeedbacks(filter: any, sort: any): Promise<any>;
    getSortedFeedbacks(sort: any): Promise<any>;
    getFilteredFeedbacks(filter: any): Promise<any>;
    editFeedbackStatus(feedback_info: {
        feedback_id: string;
        status: "approved" | "rejected";
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    editFeedbackCount(feedback_info: {
        feedback_id: string;
        count_users: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    editFeedback(feedback_info: {
        feedback_id: string;
        feedback: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    removeFeedback(feedback_info: {
        feedback_id: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    checkFeedbackExist(key: string, value: any): Promise<any>;
    addFeedback(feedback_info: {
        name: string;
        posted_by: string;
        feedback: string;
        user_id?: string;
        technology_id?: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    filterFeedback(feedback_array: Array<any>, key: string, values: string[]): any[];
}
