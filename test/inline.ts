import type {
	AbstractInlineQueryResultsButton,
	ChosenInlineResult,
	InlineQuery,
	InlineQueryResult,
	InlineQueryResultArticle,
	InlineQueryResultAudio,
	InlineQueryResultCachedAudio,
	InlineQueryResultCachedDocument,
	InlineQueryResultCachedGif,
	InlineQueryResultCachedMpeg4Gif,
	InlineQueryResultCachedPhoto,
	InlineQueryResultCachedSticker,
	InlineQueryResultCachedVideo,
	InlineQueryResultCachedVoice,
	InlineQueryResultContact,
	InlineQueryResultDocument,
	InlineQueryResultGame,
	InlineQueryResultGif,
	InlineQueryResultLocation,
	InlineQueryResultMpeg4Gif,
	InlineQueryResultPhoto,
	InlineQueryResultVenue,
	InlineQueryResultVideo,
	InlineQueryResultVoice,
	InlineQueryResultsButton,
	InlineQueryResultsStartButton,
	InlineQueryResultsWebAppButton,
	InputContactMessageContent,
	InputInvoiceMessageContent,
	InputLocationMessageContent,
	InputMessageContent,
	InputTextMessageContent,
	InputVenueMessageContent,
} from "../inline.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Queries

export const inlineQuery: InlineQuery = {
	id: "1234567890123456789",
	from: { id: 123456789, is_bot: false, first_name: "Erika", language_code: "de" },
	query: "berlin",
	offset: "",
	chat_type: "sender",
	location: { latitude: 52.52, longitude: 13.405 },
};

export const groupInlineQuery: InlineQuery = {
	id: "1234567890123456790",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	query: "",
	offset: "20",
	chat_type: "supergroup",
};

export const chosenResult: ChosenInlineResult = {
	result_id: "berlin-today",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	inline_message_id: "AgAAAPx",
	query: "berlin",
};

export type InlineQueryChatType = Assert<
	Equal<InlineQuery["chat_type"], "sender" | "private" | "group" | "supergroup" | "channel" | undefined>
>;

export type InlineQueryFields = Assert<
	Equal<
		[
			InlineQuery["query"],
			InlineQuery["offset"],
			ChosenInlineResult["result_id"],
			ChosenInlineResult["inline_message_id"],
		],
		[string, string, string, string | undefined]
	>
>;

export function nextOffset(query: InlineQuery) {
	return query.offset === "" ? 0 : Number(query.offset);
}

export type NextOffsetResult = Assert<Equal<ReturnType<typeof nextOffset>, number>>;

export function senderPosition(query: InlineQuery) {
	return query.location?.latitude;
}

export type SenderPositionResult = Assert<Equal<ReturnType<typeof senderPosition>, number | undefined>>;

// @ts-expect-error — "secret" is not a chat type an inline query reports
export const secretChatQuery: InlineQuery["chat_type"] = "secret";

// Message contents

export const textContent: InputTextMessageContent = {
	message_text: "<b>Berlin</b>: 12°C, light rain",
	parse_mode: "HTML",
	link_preview_options: { is_disabled: true },
};

export const textContentWithEntities: InputTextMessageContent = {
	message_text: "Berlin: 12°C",
	entities: [{ type: "bold", offset: 0, length: 6 }],
};

export const locationContent: InputLocationMessageContent = {
	latitude: 52.52,
	longitude: 13.405,
	horizontal_accuracy: 50,
	live_period: 900,
	heading: 90,
	proximity_alert_radius: 200,
};

export const venueContent: InputVenueMessageContent = {
	latitude: 52.5163,
	longitude: 13.3777,
	title: "Brandenburger Tor",
	address: "Pariser Platz, 10117 Berlin",
	foursquare_id: "4adcda09f964a520e83321e3",
	foursquare_type: "arts_entertainment/default",
	google_place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY",
	google_place_type: "tourist_attraction",
};

export const contactContent: InputContactMessageContent = {
	phone_number: "+4930123456",
	first_name: "Erika",
	last_name: "Mustermann",
	vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:Erika Mustermann\nEND:VCARD",
};

export const invoiceContent: InputInvoiceMessageContent = {
	title: "Umbrella",
	description: "Stays dry in Berlin",
	payload: "umbrella-1",
	provider_token: "284685063:TEST:abc",
	currency: "EUR",
	prices: [{ label: "Umbrella", amount: 1999 }],
	max_tip_amount: 500,
	suggested_tip_amounts: [100, 200, 500],
	photo_url: "https://example.com/umbrella.jpg",
	photo_width: 512,
	photo_height: 512,
	need_shipping_address: true,
	is_flexible: true,
};

export const messageContents: InputMessageContent[] = [
	textContent,
	locationContent,
	venueContent,
	contactContent,
	invoiceContent,
];

export function contentKind(content: InputMessageContent) {
	if ("message_text" in content) return "text";
	if ("payload" in content) return "invoice";
	if ("phone_number" in content) return "contact";
	if ("address" in content) return "venue";
	return "location";
}

export type ContentKindResult = Assert<
	Equal<ReturnType<typeof contentKind>, "text" | "invoice" | "contact" | "venue" | "location">
>;

export function invoiceOf(content: InputMessageContent) {
	if ("payload" in content) return content;
	return undefined;
}

export type InvoiceOfNarrowing = Assert<Equal<ReturnType<typeof invoiceOf>, InputInvoiceMessageContent | undefined>>;

export type MessageContentFields = Assert<
	Equal<
		[
			InputTextMessageContent["message_text"],
			InputTextMessageContent["parse_mode"],
			InputLocationMessageContent["live_period"],
			InputVenueMessageContent["address"],
			InputContactMessageContent["first_name"],
			InputInvoiceMessageContent["provider_token"],
			InputInvoiceMessageContent["prices"][number]["amount"],
		],
		[
			string,
			"Markdown" | "MarkdownV2" | "HTML" | undefined,
			number | undefined,
			string,
			string,
			string | undefined,
			number,
		]
	>
>;

// @ts-expect-error — a text content needs message_text
export const emptyTextContent: InputTextMessageContent = { parse_mode: "HTML" };

export const textContentWithBadParseMode: InputTextMessageContent = {
	message_text: "Berlin",
	// @ts-expect-error — "html" is not a parse mode; the names are case-sensitive
	parse_mode: "html",
};

// Results

const keyboard = { inline_keyboard: [[{ text: "Details", url: "https://example.com/berlin" }]] };

export const article: InlineQueryResultArticle = {
	type: "article",
	id: "berlin-today",
	title: "Berlin today",
	input_message_content: textContent,
	reply_markup: keyboard,
	url: "https://example.com/berlin",
	description: "12°C, light rain",
	thumbnail_url: "https://example.com/rain.png",
	thumbnail_width: 64,
	thumbnail_height: 64,
};

export const photo: InlineQueryResultPhoto = {
	type: "photo",
	id: "photo-1",
	photo_url: "https://example.com/berlin.jpg",
	thumbnail_url: "https://example.com/berlin-thumb.jpg",
	photo_width: 1280,
	photo_height: 720,
	title: "Berlin skyline",
	caption: "*Berlin*",
	parse_mode: "MarkdownV2",
};

export const gif: InlineQueryResultGif = {
	type: "gif",
	id: "gif-1",
	gif_url: "https://example.com/rain.gif",
	gif_width: 320,
	gif_height: 240,
	gif_duration: 3,
	thumbnail_url: "https://example.com/rain-thumb.gif",
	thumbnail_mime_type: "image/gif",
};

export const mpeg4Gif: InlineQueryResultMpeg4Gif = {
	type: "mpeg4_gif",
	id: "mp4-1",
	mpeg4_url: "https://example.com/rain.mp4",
	mpeg4_duration: 3,
	thumbnail_url: "https://example.com/rain-thumb.jpg",
	thumbnail_mime_type: "image/jpeg",
	caption: "Rain",
};

export const video: InlineQueryResultVideo = {
	type: "video",
	id: "video-1",
	video_url: "https://www.youtube.com/embed/abc",
	mime_type: "text/html",
	thumbnail_url: "https://example.com/video-thumb.jpg",
	title: "Forecast video",
	video_duration: 120,
	description: "Weekly forecast",
	input_message_content: { message_text: "https://www.youtube.com/watch?v=abc" },
};

export const audio: InlineQueryResultAudio = {
	type: "audio",
	id: "audio-1",
	audio_url: "https://example.com/rain.mp3",
	title: "Rain sounds",
	performer: "Nature",
	audio_duration: 600,
};

export const voice: InlineQueryResultVoice = {
	type: "voice",
	id: "voice-1",
	voice_url: "https://example.com/forecast.ogg",
	title: "Spoken forecast",
	voice_duration: 30,
};

export const document: InlineQueryResultDocument = {
	type: "document",
	id: "doc-1",
	title: "Monthly report",
	document_url: "https://example.com/report.pdf",
	mime_type: "application/pdf",
	description: "February 2024",
	thumbnail_url: "https://example.com/pdf.png",
};

export const location: InlineQueryResultLocation = {
	type: "location",
	id: "loc-1",
	latitude: 52.52,
	longitude: 13.405,
	title: "Berlin",
	horizontal_accuracy: 100,
	live_period: 3600,
};

export const venue: InlineQueryResultVenue = {
	type: "venue",
	id: "venue-1",
	latitude: 52.5163,
	longitude: 13.3777,
	title: "Brandenburger Tor",
	address: "Pariser Platz, 10117 Berlin",
	foursquare_id: "4adcda09f964a520e83321e3",
};

export const contact: InlineQueryResultContact = {
	type: "contact",
	id: "contact-1",
	phone_number: "+4930123456",
	first_name: "Weather",
	last_name: "Desk",
};

export const game: InlineQueryResultGame = { type: "game", id: "game-1", game_short_name: "snake" };

export const cachedPhoto: InlineQueryResultCachedPhoto = {
	type: "photo",
	id: "cached-photo-1",
	photo_file_id: "AgACAgIAAxkBAAI",
	caption: "Berlin",
};

export const cachedGif: InlineQueryResultCachedGif = {
	type: "gif",
	id: "cached-gif-1",
	gif_file_id: "CgACAgIAAxkBAAI",
};

export const cachedMpeg4Gif: InlineQueryResultCachedMpeg4Gif = {
	type: "mpeg4_gif",
	id: "cached-mp4-1",
	mpeg4_file_id: "CgACAgIAAxkBAAJ",
};

export const cachedSticker: InlineQueryResultCachedSticker = {
	type: "sticker",
	id: "cached-sticker-1",
	sticker_file_id: "CAACAgIAAxkBAAI",
};

export const cachedDocument: InlineQueryResultCachedDocument = {
	type: "document",
	id: "cached-doc-1",
	title: "Monthly report",
	document_file_id: "BQACAgIAAxkBAAI",
};

export const cachedVideo: InlineQueryResultCachedVideo = {
	type: "video",
	id: "cached-video-1",
	video_file_id: "BAACAgIAAxkBAAI",
	title: "Forecast video",
};

export const cachedVoice: InlineQueryResultCachedVoice = {
	type: "voice",
	id: "cached-voice-1",
	voice_file_id: "AwACAgIAAxkBAAI",
	title: "Spoken forecast",
};

export const cachedAudio: InlineQueryResultCachedAudio = {
	type: "audio",
	id: "cached-audio-1",
	audio_file_id: "CQACAgIAAxkBAAI",
};

export const results: InlineQueryResult[] = [
	cachedAudio,
	cachedDocument,
	cachedGif,
	cachedMpeg4Gif,
	cachedPhoto,
	cachedSticker,
	cachedVideo,
	cachedVoice,
	article,
	audio,
	contact,
	game,
	document,
	gif,
	location,
	mpeg4Gif,
	photo,
	venue,
	video,
	voice,
];

export type InlineQueryResultType = Assert<
	Equal<
		InlineQueryResult["type"],
		| "article"
		| "photo"
		| "gif"
		| "mpeg4_gif"
		| "video"
		| "audio"
		| "voice"
		| "document"
		| "location"
		| "venue"
		| "contact"
		| "game"
		| "sticker"
	>
>;

export function photoResults(result: InlineQueryResult) {
	if (result.type === "photo") return result;
	return undefined;
}

export type PhotoResultsNarrowing = Assert<
	Equal<ReturnType<typeof photoResults>, InlineQueryResultPhoto | InlineQueryResultCachedPhoto | undefined>
>;

export function cachedPhotoOf(result: InlineQueryResult) {
	if (result.type === "photo" && "photo_file_id" in result) return result;
	return undefined;
}

export type CachedPhotoOfNarrowing = Assert<
	Equal<ReturnType<typeof cachedPhotoOf>, InlineQueryResultCachedPhoto | undefined>
>;

export function stickerOf(result: InlineQueryResult) {
	if (result.type === "sticker") return result;
	return undefined;
}

export type StickerOfNarrowing = Assert<
	Equal<ReturnType<typeof stickerOf>, InlineQueryResultCachedSticker | undefined>
>;

export type ResultFields = Assert<
	Equal<
		[
			InlineQueryResultArticle["input_message_content"],
			InlineQueryResultPhoto["thumbnail_url"],
			InlineQueryResultGif["thumbnail_mime_type"],
			InlineQueryResultVideo["mime_type"],
			InlineQueryResultVideo["title"],
			InlineQueryResultAudio["title"],
			InlineQueryResultDocument["mime_type"],
			InlineQueryResultLocation["title"],
			InlineQueryResultVenue["address"],
			InlineQueryResultContact["phone_number"],
			InlineQueryResultGame["game_short_name"],
			InlineQueryResultCachedDocument["title"],
			InlineQueryResultCachedVideo["title"],
			InlineQueryResultCachedVoice["title"],
			InlineQueryResultCachedAudio["audio_file_id"],
			InlineQueryResultCachedSticker["sticker_file_id"],
			InlineQueryResultCachedGif["gif_file_id"],
			InlineQueryResultCachedMpeg4Gif["mpeg4_file_id"],
			InlineQueryResultMpeg4Gif["mpeg4_url"],
			InlineQueryResultVoice["voice_url"],
		],
		[
			InputMessageContent,
			string,
			"image/jpeg" | "image/gif" | "video/mp4" | undefined,
			"text/html" | "video/mp4",
			string,
			string,
			"application/pdf" | "application/zip",
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
		]
	>
>;

// @ts-expect-error — an article needs the content it sends
export const articleWithoutContent: InlineQueryResultArticle = { type: "article", id: "a", title: "Berlin" };

export const documentAsWord: InlineQueryResultDocument = {
	type: "document",
	id: "doc-2",
	title: "Report",
	document_url: "https://example.com/report.docx",
	// @ts-expect-error — only PDF and ZIP files can be sent by URL
	mime_type: "application/msword",
};

export const gameWithCaption: InlineQueryResult = {
	type: "game",
	id: "game-2",
	game_short_name: "snake",
	// @ts-expect-error — games have no caption, and `type` "game" names a single variant
	caption: "Play",
};

// Results buttons

export const webAppResultsButton: InlineQueryResultsWebAppButton = {
	text: "Open forecast app",
	web_app: { url: "https://example.com/app" },
};

export const startResultsButton: InlineQueryResultsStartButton = {
	text: "Connect your account",
	start_parameter: "connect",
};

export const resultsButtons: InlineQueryResultsButton[] = [webAppResultsButton, startResultsButton];

export type AbstractInlineQueryResultsButtonFields = Assert<
	Equal<[keyof AbstractInlineQueryResultsButton, AbstractInlineQueryResultsButton["text"]], ["text", string]>
>;

export type ResultsButtonsAreAbstract = Assert<Extends<InlineQueryResultsButton, AbstractInlineQueryResultsButton>>;

export function startParameter(button: InlineQueryResultsButton) {
	if ("start_parameter" in button) return button.start_parameter;
	return undefined;
}

export type StartParameterResult = Assert<Equal<ReturnType<typeof startParameter>, string | undefined>>;

// @ts-expect-error — a results button either starts the bot or opens a Web App
export const resultsButtonWithoutAction: InlineQueryResultsButton = { text: "Connect" };

// Required fields

export type AbstractInlineQueryResultsButtonRequiredFields = Assert<
	Extends<"text", RequiredKeys<AbstractInlineQueryResultsButton>>
>;
export type ChosenInlineResultRequiredFields = Assert<
	Extends<"from" | "query" | "result_id", RequiredKeys<ChosenInlineResult>>
>;
export type InlineQueryRequiredFields = Assert<Extends<"from" | "id" | "offset" | "query", RequiredKeys<InlineQuery>>>;
export type InlineQueryResultArticleRequiredFields = Assert<
	Extends<"id" | "input_message_content" | "title" | "type", RequiredKeys<InlineQueryResultArticle>>
>;
export type InlineQueryResultAudioRequiredFields = Assert<
	Extends<"audio_url" | "id" | "title" | "type", RequiredKeys<InlineQueryResultAudio>>
>;
export type InlineQueryResultCachedAudioRequiredFields = Assert<
	Extends<"audio_file_id" | "id" | "type", RequiredKeys<InlineQueryResultCachedAudio>>
>;
export type InlineQueryResultCachedDocumentRequiredFields = Assert<
	Extends<"document_file_id" | "id" | "title" | "type", RequiredKeys<InlineQueryResultCachedDocument>>
>;
export type InlineQueryResultCachedGifRequiredFields = Assert<
	Extends<"gif_file_id" | "id" | "type", RequiredKeys<InlineQueryResultCachedGif>>
>;
export type InlineQueryResultCachedMpeg4GifRequiredFields = Assert<
	Extends<"id" | "mpeg4_file_id" | "type", RequiredKeys<InlineQueryResultCachedMpeg4Gif>>
>;
export type InlineQueryResultCachedPhotoRequiredFields = Assert<
	Extends<"id" | "photo_file_id" | "type", RequiredKeys<InlineQueryResultCachedPhoto>>
>;
export type InlineQueryResultCachedStickerRequiredFields = Assert<
	Extends<"id" | "sticker_file_id" | "type", RequiredKeys<InlineQueryResultCachedSticker>>
>;
export type InlineQueryResultCachedVideoRequiredFields = Assert<
	Extends<"id" | "title" | "type" | "video_file_id", RequiredKeys<InlineQueryResultCachedVideo>>
>;
export type InlineQueryResultCachedVoiceRequiredFields = Assert<
	Extends<"id" | "title" | "type" | "voice_file_id", RequiredKeys<InlineQueryResultCachedVoice>>
>;
export type InlineQueryResultContactRequiredFields = Assert<
	Extends<"first_name" | "id" | "phone_number" | "type", RequiredKeys<InlineQueryResultContact>>
>;
export type InlineQueryResultDocumentRequiredFields = Assert<
	Extends<"document_url" | "id" | "mime_type" | "title" | "type", RequiredKeys<InlineQueryResultDocument>>
>;
export type InlineQueryResultGameRequiredFields = Assert<
	Extends<"game_short_name" | "id" | "type", RequiredKeys<InlineQueryResultGame>>
>;
export type InlineQueryResultGifRequiredFields = Assert<
	Extends<"gif_url" | "id" | "thumbnail_url" | "type", RequiredKeys<InlineQueryResultGif>>
>;
export type InlineQueryResultLocationRequiredFields = Assert<
	Extends<"id" | "latitude" | "longitude" | "title" | "type", RequiredKeys<InlineQueryResultLocation>>
>;
export type InlineQueryResultMpeg4GifRequiredFields = Assert<
	Extends<"id" | "mpeg4_url" | "thumbnail_url" | "type", RequiredKeys<InlineQueryResultMpeg4Gif>>
>;
export type InlineQueryResultPhotoRequiredFields = Assert<
	Extends<"id" | "photo_url" | "thumbnail_url" | "type", RequiredKeys<InlineQueryResultPhoto>>
>;
export type InlineQueryResultVenueRequiredFields = Assert<
	Extends<"address" | "id" | "latitude" | "longitude" | "title" | "type", RequiredKeys<InlineQueryResultVenue>>
>;
export type InlineQueryResultVideoRequiredFields = Assert<
	Extends<"id" | "mime_type" | "thumbnail_url" | "title" | "type" | "video_url", RequiredKeys<InlineQueryResultVideo>>
>;
export type InlineQueryResultVoiceRequiredFields = Assert<
	Extends<"id" | "title" | "type" | "voice_url", RequiredKeys<InlineQueryResultVoice>>
>;
export type InlineQueryResultsStartButtonRequiredFields = Assert<
	Extends<"start_parameter" | "text", RequiredKeys<InlineQueryResultsStartButton>>
>;
export type InlineQueryResultsWebAppButtonRequiredFields = Assert<
	Extends<"text" | "web_app", RequiredKeys<InlineQueryResultsWebAppButton>>
>;
export type InputContactMessageContentRequiredFields = Assert<
	Extends<"first_name" | "phone_number", RequiredKeys<InputContactMessageContent>>
>;
export type InputInvoiceMessageContentRequiredFields = Assert<
	Extends<"currency" | "description" | "payload" | "prices" | "title", RequiredKeys<InputInvoiceMessageContent>>
>;
export type InputLocationMessageContentRequiredFields = Assert<
	Extends<"latitude" | "longitude", RequiredKeys<InputLocationMessageContent>>
>;
export type InputTextMessageContentRequiredFields = Assert<
	Extends<"message_text", RequiredKeys<InputTextMessageContent>>
>;
export type InputVenueMessageContentRequiredFields = Assert<
	Extends<"address" | "latitude" | "longitude" | "title", RequiredKeys<InputVenueMessageContent>>
>;
