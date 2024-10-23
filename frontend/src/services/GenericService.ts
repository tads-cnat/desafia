import { axiosPrivate } from "../api/axios";

class GenericService {
    serviceUrl: string = "";

    constructor(serviceUrl: string) {
        this.serviceUrl = serviceUrl;
    }

    async getAll(filters?: unknown): Promise<unknown> {
        const response = await axiosPrivate.get(`${this.serviceUrl}/`, {
            params: filters,
        });
        return response;
    }

    async get(id: number): Promise<unknown> {
        const response = await axiosPrivate.get(`${this.serviceUrl}/${id}/`);
        return response;
    }

    async post(data: unknown): Promise<unknown> {
        const response = await axiosPrivate.post(`${this.serviceUrl}/`, data);
        return response;
    }

    async put(id: number, data: unknown): Promise<unknown> {
        const response = await axiosPrivate.put(
            `${this.serviceUrl}/${id}/`,
            data,
        );
        return response;
    }

    async patch(id: number, data: FormData): Promise<unknown> {
        const response = await axiosPrivate.patch(
            `${this.serviceUrl}/${id}/`,
            data,
        );
        return response;
    }

    async delete(id: number): Promise<unknown> {
        const response = await axiosPrivate.delete(`${this.serviceUrl}/${id}/`);
        return response;
    }
}

export default GenericService;
