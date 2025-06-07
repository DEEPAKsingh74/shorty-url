type SuccessResponseOptions<T> = {
	data?: T;
	message?: string;
	statusCode?: number;
	meta?: Record<string, any>;
};

export class SuccessResponse<T = unknown> {
	success: boolean;
	message: string;
	data?: T;
	meta?: Record<string, any>;

	constructor({ data, message = "Success", statusCode = 200, meta }: SuccessResponseOptions<T>) {
		this.success = true;
		this.message = message;
		this.data = data;
		this.meta = meta;

		Object.defineProperty(this, "statusCode", {
			value: statusCode,
			enumerable: false,
		});
	}

	toJSON() {
		return {
			success: this.success,
			message: this.message,
			data: this.data ?? null,
			meta: this.meta ?? undefined,
		};
	}
}