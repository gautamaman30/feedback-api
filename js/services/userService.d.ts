export default class UserService {
    getAllUsers(): Promise<any>;
    removeUser(user_info: {
        user_id: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    checkUserExist(key: string, value: any): Promise<any>;
    addUser(user_info: {
        name: string;
        email?: string;
        title?: string;
        date_of_birth?: Date;
    }): Promise<any>;
}
