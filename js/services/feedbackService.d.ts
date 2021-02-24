export default class FeedbackService {
    getAllFeedbacks(): Promise<any>;
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
    filterFeedbackKeys(feedback_array: Array<any>, key: string): any[];
    filterFeedback(feedback_array: Array<any>, key: string, values: string[]): any[];
    sortFeedback(feedback_array: Array<any>, key: string): any[];
}
