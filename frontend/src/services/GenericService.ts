import { axiosPrivate } from "../api/axios";
import { PaginationResponse } from "../types/application/PaginationResponse";

class GenericService<T> {
    serviceUrl: string = "";

    constructor(serviceUrl: string) {
        this.serviceUrl = serviceUrl;
    }

    async getAll(filters?: unknown): Promise<PaginationResponse<T>> {
        const response = await axiosPrivate.get<PaginationResponse<T>>(
            `${this.serviceUrl}/`,
            {
                params: filters,
            },
        );
        return response.data;
    }

    async get(id: number): Promise<T> {
        const response = await axiosPrivate.get<T>(`${this.serviceUrl}/${id}/`);
        return response.data;
    }

    async post(data: T): Promise<T> {
        const response = await axiosPrivate.post<T>(
            `${this.serviceUrl}/`,
            data,
        );
        return response.data;
    }

    async put(id: number, data: T): Promise<T> {
        const response = await axiosPrivate.put<T>(
            `${this.serviceUrl}/${id}/`,
            data,
        );
        return response.data;
    }

    async patch(id: number, data: Partial<T>): Promise<T> {
        const response = await axiosPrivate.patch<T>(
            `${this.serviceUrl}/${id}/`,
            data,
        );
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await axiosPrivate.delete(`${this.serviceUrl}/${id}/`);
    }
}

export default GenericService;
