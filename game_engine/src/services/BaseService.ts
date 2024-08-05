import axiosInstance from "./AxiosInstance";

class BaseService {
	id: number;

	constructor(id: number) {
		this.id = id;
	}

	async getQuestionario() {
		return await axiosInstance.get(`/questionarios/${this.id}/`);
	}
}

export default BaseService;
