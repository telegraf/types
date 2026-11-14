import type { ApiError, ApiResponse, ApiSuccess, ResponseParameters } from "../api.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Values

export const floodWait: ResponseParameters = { retry_after: 35 };

export const migrated: ResponseParameters = { migrate_to_chat_id: -1001234567890 };

export const tooManyRequests: ApiError = {
	ok: false,
	error_code: 429,
	description: "Too Many Requests: retry after 35",
	parameters: floodWait,
};

export const chatNotFound: ApiError = { ok: false, error_code: 400, description: "Bad Request: chat not found" };

export const deleted: ApiSuccess<true> = { ok: true, result: true };

export const responses: ApiResponse<number>[] = [{ ok: true, result: 42 }, tooManyRequests];

// Reading

export function resultOf<T>(response: ApiResponse<T>) {
	if (response.ok) return response.result;
	return response.parameters?.retry_after;
}

export type ResultOfNarrowing = Assert<Equal<ReturnType<typeof resultOf<string>>, string | number | undefined>>;

export function errorOf<T>(response: ApiResponse<T>) {
	if (!response.ok) return response;
	return undefined;
}

export type ErrorOfNarrowing = Assert<Equal<ReturnType<typeof errorOf<string>>, ApiError | undefined>>;

export type ApiErrorFields = Assert<
	Equal<
		[ApiError["ok"], ApiError["error_code"], ApiError["description"], ApiError["parameters"]],
		[false, number, string, ResponseParameters | undefined]
	>
>;

export type ApiSuccessFields = Assert<Equal<[ApiSuccess<string>["ok"], ApiSuccess<string>["result"]], [true, string]>>;

export type ResponseParametersFields = Assert<
	Equal<
		[ResponseParameters["migrate_to_chat_id"], ResponseParameters["retry_after"]],
		[number | undefined, number | undefined]
	>
>;

// Rejections

// @ts-expect-error — description is required
export const errorWithoutDescription: ApiError = { ok: false, error_code: 400 };

export const successWithError: ApiResponse<true> = {
	ok: true,
	result: true,
	// @ts-expect-error — error_code belongs to ApiError, and `ok` discriminates the union
	error_code: 400,
};

// Required fields

export type ApiErrorRequiredFields = Assert<Extends<"description" | "error_code" | "ok", RequiredKeys<ApiError>>>;
export type ApiSuccessRequiredFields = Assert<Extends<"ok" | "result", RequiredKeys<ApiSuccess<string>>>>;
