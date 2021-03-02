export default class UserService {
    getAllUsers(): Promise<any>;
    getUsers(key: string, value: any): Promise<any>;
    removeUser(user_info: {
        email: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    checkUserExist(key: string, value: any): Promise<any>;
    checkAdminExist(key: string, value: any): Promise<any>;
    addUser(user_info: {
        name: string;
        email: string;
        title?: string;
        date_of_birth?: string;
    }): Promise<any>;
    editUser(user_info: {
        email: string;
        password?: string;
        title?: string;
        date_of_birth?: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
}
