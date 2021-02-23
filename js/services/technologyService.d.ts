export default class TechnologyService {
    getAllTechnologies(): Promise<any>;
    editTechnology(technology_info: {
        name: string;
        details: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    removeTechnology(technology_info: {
        name: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    checkTechnologyExist(key: string, value: any): Promise<any>;
    addTechnology(technology_info: {
        name: string;
        details?: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
}
