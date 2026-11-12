import type {
	EncryptedCredentials,
	EncryptedPassportElement,
	PassportData,
	PassportElementError,
	PassportElementErrorDataField,
	PassportElementErrorFile,
	PassportElementErrorFiles,
	PassportElementErrorFrontSide,
	PassportElementErrorReverseSide,
	PassportElementErrorSelfie,
	PassportElementErrorTranslationFile,
	PassportElementErrorTranslationFiles,
	PassportElementErrorUnspecified,
	PassportFile,
} from "../passport.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Values

export const scan: PassportFile = {
	file_id: "DgADAgADmQ8AAkCwyUk",
	file_unique_id: "AgADmQ8AAkCwyUk",
	file_size: 184320,
	file_date: 1709251200,
};

export const credentials: EncryptedCredentials = {
	data: "ZW5jcnlwdGVkLWRhdGE=",
	hash: "aGFzaA==",
	secret: "c2VjcmV0",
};

export const passportElement: EncryptedPassportElement = {
	type: "passport",
	data: "ZW5jcnlwdGVkLXBhc3Nwb3J0",
	front_side: scan,
	selfie: scan,
	translation: [scan],
	hash: "cGFzc3BvcnQtaGFzaA==",
};

export const utilityBillElement: EncryptedPassportElement = {
	type: "utility_bill",
	files: [scan, scan],
	hash: "YmlsbC1oYXNo",
};

export const emailElement: EncryptedPassportElement = {
	type: "email",
	email: "erika@example.com",
	hash: "ZW1haWwtaGFzaA==",
};

export const passportData: PassportData = {
	data: [passportElement, utilityBillElement, emailElement],
	credentials,
};

export const dataFieldError: PassportElementErrorDataField = {
	source: "data",
	type: "personal_details",
	field_name: "birth_date",
	data_hash: "ZGF0YS1oYXNo",
	message: "The birth date is in the future",
};

export const frontSideError: PassportElementErrorFrontSide = {
	source: "front_side",
	type: "passport",
	file_hash: "ZnJvbnQ=",
	message: "The scan is blurry",
};

export const reverseSideError: PassportElementErrorReverseSide = {
	source: "reverse_side",
	type: "driver_license",
	file_hash: "cmV2ZXJzZQ==",
	message: "The reverse side is cut off",
};

export const selfieError: PassportElementErrorSelfie = {
	source: "selfie",
	type: "identity_card",
	file_hash: "c2VsZmll",
	message: "The face is not visible",
};

export const fileError: PassportElementErrorFile = {
	source: "file",
	type: "utility_bill",
	file_hash: "ZmlsZQ==",
	message: "The bill is older than three months",
};

export const filesError: PassportElementErrorFiles = {
	source: "files",
	type: "bank_statement",
	file_hashes: ["ZmlsZTE=", "ZmlsZTI="],
	message: "Pages are missing",
};

export const translationFileError: PassportElementErrorTranslationFile = {
	source: "translation_file",
	type: "internal_passport",
	file_hash: "dHJhbnNsYXRpb24=",
	message: "The translation is not certified",
};

export const translationFilesError: PassportElementErrorTranslationFiles = {
	source: "translation_files",
	type: "rental_agreement",
	file_hashes: ["dHIx", "dHIy"],
	message: "The translation is incomplete",
};

export const unspecifiedError: PassportElementErrorUnspecified = {
	source: "unspecified",
	type: "address",
	element_hash: "YWRkcmVzcw==",
	message: "Please submit the address again",
};

export const errors: PassportElementError[] = [
	dataFieldError,
	frontSideError,
	reverseSideError,
	selfieError,
	fileError,
	filesError,
	translationFileError,
	translationFilesError,
	unspecifiedError,
];

// Reading

export type PassportElementErrorSource = Assert<
	Equal<
		PassportElementError["source"],
		| "data"
		| "front_side"
		| "reverse_side"
		| "selfie"
		| "file"
		| "files"
		| "translation_file"
		| "translation_files"
		| "unspecified"
	>
>;

export type EncryptedPassportElementType = Assert<
	Equal<
		EncryptedPassportElement["type"],
		| "personal_details"
		| "passport"
		| "driver_license"
		| "identity_card"
		| "internal_passport"
		| "address"
		| "utility_bill"
		| "bank_statement"
		| "rental_agreement"
		| "passport_registration"
		| "temporary_registration"
		| "phone_number"
		| "email"
	>
>;

export type ReverseSideType = Assert<
	Equal<PassportElementErrorReverseSide["type"], "driver_license" | "identity_card">
>;

export function fileHashes(error: PassportElementError) {
	if (error.source === "files" || error.source === "translation_files") return error.file_hashes;
	return undefined;
}

export type FileHashesNarrowing = Assert<Equal<ReturnType<typeof fileHashes>, string[] | undefined>>;

export function documentScans(element: EncryptedPassportElement) {
	return [element.front_side, element.reverse_side, element.selfie];
}

export type DocumentScansResult = Assert<Equal<ReturnType<typeof documentScans>, (PassportFile | undefined)[]>>;

export type PassportFields = Assert<
	Equal<
		[
			PassportData["data"],
			PassportData["credentials"],
			PassportFile["file_size"],
			PassportFile["file_date"],
			EncryptedPassportElement["hash"],
			EncryptedPassportElement["files"],
			EncryptedCredentials["secret"],
			PassportElementErrorDataField["field_name"],
			PassportElementErrorDataField["data_hash"],
			PassportElementErrorUnspecified["type"],
			PassportElementErrorUnspecified["element_hash"],
		],
		[
			EncryptedPassportElement[],
			EncryptedCredentials,
			number,
			number,
			string,
			PassportFile[] | undefined,
			string,
			string,
			string,
			string,
			string,
		]
	>
>;

// Rejections

export const selfieOfBill: PassportElementErrorSelfie = {
	source: "selfie",
	// @ts-expect-error — selfies exist only for identity documents
	type: "utility_bill",
	file_hash: "c2VsZmll",
	message: "No selfie",
};

export const dataErrorWithFileHash: PassportElementError = {
	source: "data",
	type: "address",
	field_name: "post_code",
	data_hash: "ZGF0YQ==",
	// @ts-expect-error — file_hash belongs to file errors, and `source` discriminates the union
	file_hash: "ZmlsZQ==",
	message: "Wrong post code",
};

// @ts-expect-error — every element carries its hash
export const elementWithoutHash: EncryptedPassportElement = { type: "email", email: "erika@example.com" };

// Required fields

export type EncryptedCredentialsRequiredFields = Assert<
	Extends<"data" | "hash" | "secret", RequiredKeys<EncryptedCredentials>>
>;
export type EncryptedPassportElementRequiredFields = Assert<
	Extends<"hash" | "type", RequiredKeys<EncryptedPassportElement>>
>;
export type PassportDataRequiredFields = Assert<Extends<"credentials" | "data", RequiredKeys<PassportData>>>;
export type PassportElementErrorDataFieldRequiredFields = Assert<
	Extends<"data_hash" | "field_name" | "message" | "source" | "type", RequiredKeys<PassportElementErrorDataField>>
>;
export type PassportElementErrorFileRequiredFields = Assert<
	Extends<"file_hash" | "message" | "source" | "type", RequiredKeys<PassportElementErrorFile>>
>;
export type PassportElementErrorFilesRequiredFields = Assert<
	Extends<"file_hashes" | "message" | "source" | "type", RequiredKeys<PassportElementErrorFiles>>
>;
export type PassportElementErrorFrontSideRequiredFields = Assert<
	Extends<"file_hash" | "message" | "source" | "type", RequiredKeys<PassportElementErrorFrontSide>>
>;
export type PassportElementErrorReverseSideRequiredFields = Assert<
	Extends<"file_hash" | "message" | "source" | "type", RequiredKeys<PassportElementErrorReverseSide>>
>;
export type PassportElementErrorSelfieRequiredFields = Assert<
	Extends<"file_hash" | "message" | "source" | "type", RequiredKeys<PassportElementErrorSelfie>>
>;
export type PassportElementErrorTranslationFileRequiredFields = Assert<
	Extends<"file_hash" | "message" | "source" | "type", RequiredKeys<PassportElementErrorTranslationFile>>
>;
export type PassportElementErrorTranslationFilesRequiredFields = Assert<
	Extends<"file_hashes" | "message" | "source" | "type", RequiredKeys<PassportElementErrorTranslationFiles>>
>;
export type PassportElementErrorUnspecifiedRequiredFields = Assert<
	Extends<"element_hash" | "message" | "source" | "type", RequiredKeys<PassportElementErrorUnspecified>>
>;
export type PassportFileRequiredFields = Assert<
	Extends<"file_date" | "file_id" | "file_size" | "file_unique_id", RequiredKeys<PassportFile>>
>;
