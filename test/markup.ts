import type {
	CallbackGame,
	CallbackQuery,
	ForceReply,
	InlineKeyboardButton,
	InlineKeyboardMarkup,
	KeyboardButton,
	KeyboardButtonPollType,
	KeyboardButtonRequestChat,
	KeyboardButtonRequestUsers,
	LoginUrl,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
	SwitchInlineQueryChosenChat,
	WebAppInfo,
} from "../markup.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Inline keyboards

export const webApp: WebAppInfo = { url: "https://example.com/app" };

export const loginUrl: LoginUrl = {
	url: "https://example.com/login",
	forward_text: "Log in to Example",
	bot_username: "example_bot",
	request_write_access: true,
};

export const chosenChat: SwitchInlineQueryChosenChat = {
	query: "berlin",
	allow_user_chats: true,
	allow_bot_chats: false,
	allow_group_chats: true,
	allow_channel_chats: false,
};

export const callbackGame: CallbackGame = {};

export const urlButton: InlineKeyboardButton.UrlButton = { text: "Website", url: "https://example.com" };

export const callbackButton: InlineKeyboardButton.CallbackButton = { text: "Refresh", callback_data: "refresh:berlin" };

export const webAppButton: InlineKeyboardButton.WebAppButton = { text: "Open app", web_app: webApp };

export const loginButton: InlineKeyboardButton.LoginButton = { text: "Log in", login_url: loginUrl };

export const switchInlineButton: InlineKeyboardButton.SwitchInlineButton = {
	text: "Share",
	switch_inline_query: "berlin",
};

export const switchInlineCurrentChatButton: InlineKeyboardButton.SwitchInlineCurrentChatButton = {
	text: "Search here",
	switch_inline_query_current_chat: "",
};

export const switchInlineChosenChatButton: InlineKeyboardButton.SwitchInlineChosenChatButton = {
	text: "Send to…",
	switch_inline_query_chosen_chat: chosenChat,
};

export const gameButton: InlineKeyboardButton.GameButton = { text: "Play", callback_game: callbackGame };

export const payButton: InlineKeyboardButton.PayButton = { text: "Pay 24.50 EUR", pay: true };

export const inlineKeyboard: InlineKeyboardMarkup = {
	inline_keyboard: [
		[payButton],
		[urlButton, callbackButton],
		[webAppButton, loginButton],
		[switchInlineButton, switchInlineCurrentChatButton, switchInlineChosenChatButton],
		[gameButton],
	],
};

export type AbstractInlineKeyboardButtonKeys = Assert<
	Equal<keyof InlineKeyboardButton.AbstractInlineKeyboardButton, "text">
>;

export type InlineButtonsAreAbstract = Assert<
	Extends<InlineKeyboardButton, InlineKeyboardButton.AbstractInlineKeyboardButton>
>;

export function callbackDataOf(button: InlineKeyboardButton) {
	if ("callback_data" in button) return button;
	return undefined;
}

export type CallbackDataOfNarrowing = Assert<
	Equal<ReturnType<typeof callbackDataOf>, InlineKeyboardButton.CallbackButton | undefined>
>;

export function linkOf(button: InlineKeyboardButton) {
	if ("url" in button) return button.url;
	if ("login_url" in button) return button.login_url.url;
	if ("web_app" in button) return button.web_app.url;
	return undefined;
}

export type LinkOfResult = Assert<Equal<ReturnType<typeof linkOf>, string | undefined>>;

export type InlineButtonFields = Assert<
	Equal<
		[
			InlineKeyboardButton.PayButton["pay"],
			InlineKeyboardButton.SwitchInlineButton["switch_inline_query"],
			InlineKeyboardButton.SwitchInlineChosenChatButton["switch_inline_query_chosen_chat"],
			InlineKeyboardButton.GameButton["callback_game"],
			LoginUrl["forward_text"],
			SwitchInlineQueryChosenChat["query"],
			InlineKeyboardMarkup["inline_keyboard"],
		],
		[
			boolean,
			string,
			SwitchInlineQueryChosenChat,
			CallbackGame,
			string | undefined,
			string | undefined,
			InlineKeyboardButton[][],
		]
	>
>;

// @ts-expect-error — every inline button needs a text
export const buttonWithoutText: InlineKeyboardButton = { url: "https://example.com" };

// @ts-expect-error — a button with only a text does nothing in an inline keyboard
export const textOnlyInlineButton: InlineKeyboardButton = { text: "Nothing" };

export const loginButtonWithString: InlineKeyboardButton.LoginButton = {
	text: "Log in",
	// @ts-expect-error — the login URL is an object, not a string
	login_url: "https://example.com",
};

// Callback queries

export const dataQuery: CallbackQuery.DataQuery = {
	id: "4382bfdwdsb323b2d9",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	message: {
		message_id: 42,
		date: 1709251200,
		chat: { id: 123456789, type: "private", first_name: "Erika" },
		text: "Forecast for Berlin",
		reply_markup: { inline_keyboard: [[callbackButton]] },
	},
	chat_instance: "-4237498273498",
	data: "refresh:berlin",
};

export const inaccessibleMessageQuery: CallbackQuery.DataQuery = {
	id: "4382bfdwdsb323b2da",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	message: { message_id: 7, date: 0, chat: { id: 123456789, type: "private", first_name: "Erika" } },
	chat_instance: "-4237498273498",
	data: "refresh:berlin",
};

export const gameQuery: CallbackQuery.GameQuery = {
	id: "4382bfdwdsb323b2db",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	inline_message_id: "AgAAAPx",
	chat_instance: "-4237498273498",
	game_short_name: "snake",
};

export const callbackQueries: CallbackQuery[] = [dataQuery, inaccessibleMessageQuery, gameQuery];

export type AbstractQueryKeys = Assert<
	Equal<keyof CallbackQuery.AbstractQuery, "id" | "from" | "message" | "inline_message_id" | "chat_instance">
>;

export type CallbackQueriesAreAbstract = Assert<Extends<CallbackQuery, CallbackQuery.AbstractQuery>>;

export function dataOf(query: CallbackQuery) {
	if ("data" in query) return query.data;
	return query.game_short_name;
}

export type DataOfResult = Assert<Equal<ReturnType<typeof dataOf>, string>>;

export function gameOf(query: CallbackQuery) {
	if ("game_short_name" in query) return query;
	return undefined;
}

export type GameOfNarrowing = Assert<Equal<ReturnType<typeof gameOf>, CallbackQuery.GameQuery | undefined>>;

export function originalText(query: CallbackQuery) {
	const message = query.message;
	if (message && "text" in message) return message.text;
	return undefined;
}

export type OriginalTextResult = Assert<Equal<ReturnType<typeof originalText>, string | undefined>>;

export type CallbackQueryFields = Assert<
	Equal<[CallbackQuery["chat_instance"], CallbackQuery["inline_message_id"]], [string, string | undefined]>
>;

// @ts-expect-error — a callback query carries either data or a game short name
export const queryWithoutPayload: CallbackQuery = {
	id: "4382bfdwdsb323b2dc",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	chat_instance: "-4237498273498",
};

// Reply keyboards

export const pollType: KeyboardButtonPollType = { type: "quiz" };

export const anyPollType: KeyboardButtonPollType = {};

export const requestUsers: KeyboardButtonRequestUsers = {
	request_id: 1,
	user_is_bot: false,
	user_is_premium: true,
	max_quantity: 3,
};

export const requestChat: KeyboardButtonRequestChat = {
	request_id: 2,
	chat_is_channel: false,
	chat_is_forum: true,
	chat_has_username: true,
	chat_is_created: false,
	user_administrator_rights: {
		is_anonymous: false,
		can_manage_chat: true,
		can_delete_messages: true,
		can_manage_video_chats: false,
		can_restrict_members: true,
		can_promote_members: false,
		can_change_info: false,
		can_invite_users: true,
	},
	bot_is_member: true,
};

export const commonButton: KeyboardButton.CommonButton = { text: "Berlin" };

export const requestUsersButton: KeyboardButton.RequestUsersButton = {
	text: "Pick friends",
	request_users: requestUsers,
};

export const requestChatButton: KeyboardButton.RequestChatButton = { text: "Pick a group", request_chat: requestChat };

export const requestContactButton: KeyboardButton.RequestContactButton = { text: "Share phone", request_contact: true };

export const requestLocationButton: KeyboardButton.RequestLocationButton = {
	text: "Share location",
	request_location: true,
};

export const requestPollButton: KeyboardButton.RequestPollButton = { text: "Create quiz", request_poll: pollType };

export const keyboardWebAppButton: KeyboardButton.WebAppButton = { text: "Open app", web_app: webApp };

export const replyKeyboard: ReplyKeyboardMarkup = {
	keyboard: [
		["Hamburg", commonButton],
		[requestUsersButton, requestChatButton],
		[requestContactButton, requestLocationButton],
		[requestPollButton, keyboardWebAppButton],
	],
	is_persistent: true,
	resize_keyboard: true,
	one_time_keyboard: false,
	input_field_placeholder: "Pick a city",
	selective: true,
};

export const removeKeyboard: ReplyKeyboardRemove = { remove_keyboard: true, selective: false };

export const forceReply: ForceReply = { force_reply: true, input_field_placeholder: "Your city", selective: true };

export type KeyboardButtonsAreCommon = Assert<Extends<Exclude<KeyboardButton, string>, KeyboardButton.CommonButton>>;

export function buttonText(button: KeyboardButton) {
	if (typeof button === "string") return button;
	return button.text;
}

export type ButtonTextResult = Assert<Equal<ReturnType<typeof buttonText>, string>>;

export function requestedChat(button: KeyboardButton) {
	if (typeof button !== "string" && "request_chat" in button) return button;
	return undefined;
}

export type RequestedChatNarrowing = Assert<
	Equal<ReturnType<typeof requestedChat>, KeyboardButton.RequestChatButton | undefined>
>;

export type ReplyMarkupFields = Assert<
	Equal<
		[
			ReplyKeyboardMarkup["keyboard"],
			ReplyKeyboardMarkup["one_time_keyboard"],
			ReplyKeyboardRemove["remove_keyboard"],
			ForceReply["force_reply"],
			KeyboardButtonPollType["type"],
			KeyboardButtonRequestUsers["max_quantity"],
			KeyboardButtonRequestChat["chat_is_channel"],
			KeyboardButton.RequestContactButton["request_contact"],
			KeyboardButton.RequestLocationButton["request_location"],
			KeyboardButton.RequestPollButton["request_poll"],
		],
		[
			KeyboardButton[][],
			boolean | undefined,
			true,
			true,
			"quiz" | "regular" | undefined,
			number | undefined,
			boolean,
			boolean,
			boolean,
			KeyboardButtonPollType,
		]
	>
>;

// @ts-expect-error — removing the keyboard is requested with true, never false
export const keepKeyboard: ReplyKeyboardRemove = { remove_keyboard: false };

// @ts-expect-error — the request id is required to match the shared chat
export const requestChatWithoutId: KeyboardButtonRequestChat = { chat_is_channel: true };

// @ts-expect-error — "survey" is not a poll type
export const surveyPollType: KeyboardButtonPollType = { type: "survey" };

// Required fields

export type CallbackQueryAbstractQueryRequiredFields = Assert<
	Extends<"chat_instance" | "from" | "id", RequiredKeys<CallbackQuery.AbstractQuery>>
>;
export type CallbackQueryDataQueryRequiredFields = Assert<
	Extends<"chat_instance" | "data" | "from" | "id", RequiredKeys<CallbackQuery.DataQuery>>
>;
export type CallbackQueryGameQueryRequiredFields = Assert<
	Extends<"chat_instance" | "from" | "game_short_name" | "id", RequiredKeys<CallbackQuery.GameQuery>>
>;
export type ForceReplyRequiredFields = Assert<Extends<"force_reply", RequiredKeys<ForceReply>>>;
export type InlineKeyboardButtonAbstractInlineKeyboardButtonRequiredFields = Assert<
	Extends<"text", RequiredKeys<InlineKeyboardButton.AbstractInlineKeyboardButton>>
>;
export type InlineKeyboardButtonCallbackButtonRequiredFields = Assert<
	Extends<"callback_data" | "text", RequiredKeys<InlineKeyboardButton.CallbackButton>>
>;
export type InlineKeyboardButtonGameButtonRequiredFields = Assert<
	Extends<"callback_game" | "text", RequiredKeys<InlineKeyboardButton.GameButton>>
>;
export type InlineKeyboardButtonLoginButtonRequiredFields = Assert<
	Extends<"login_url" | "text", RequiredKeys<InlineKeyboardButton.LoginButton>>
>;
export type InlineKeyboardButtonPayButtonRequiredFields = Assert<
	Extends<"pay" | "text", RequiredKeys<InlineKeyboardButton.PayButton>>
>;
export type InlineKeyboardButtonSwitchInlineButtonRequiredFields = Assert<
	Extends<"switch_inline_query" | "text", RequiredKeys<InlineKeyboardButton.SwitchInlineButton>>
>;
export type InlineKeyboardButtonSwitchInlineChosenChatButtonRequiredFields = Assert<
	Extends<"switch_inline_query_chosen_chat" | "text", RequiredKeys<InlineKeyboardButton.SwitchInlineChosenChatButton>>
>;
export type InlineKeyboardButtonSwitchInlineCurrentChatButtonRequiredFields = Assert<
	Extends<"switch_inline_query_current_chat" | "text", RequiredKeys<InlineKeyboardButton.SwitchInlineCurrentChatButton>>
>;
export type InlineKeyboardButtonUrlButtonRequiredFields = Assert<
	Extends<"text" | "url", RequiredKeys<InlineKeyboardButton.UrlButton>>
>;
export type InlineKeyboardButtonWebAppButtonRequiredFields = Assert<
	Extends<"text" | "web_app", RequiredKeys<InlineKeyboardButton.WebAppButton>>
>;
export type InlineKeyboardMarkupRequiredFields = Assert<Extends<"inline_keyboard", RequiredKeys<InlineKeyboardMarkup>>>;
export type KeyboardButtonCommonButtonRequiredFields = Assert<
	Extends<"text", RequiredKeys<KeyboardButton.CommonButton>>
>;
export type KeyboardButtonRequestChatButtonRequiredFields = Assert<
	Extends<"request_chat" | "text", RequiredKeys<KeyboardButton.RequestChatButton>>
>;
export type KeyboardButtonRequestContactButtonRequiredFields = Assert<
	Extends<"request_contact" | "text", RequiredKeys<KeyboardButton.RequestContactButton>>
>;
export type KeyboardButtonRequestLocationButtonRequiredFields = Assert<
	Extends<"request_location" | "text", RequiredKeys<KeyboardButton.RequestLocationButton>>
>;
export type KeyboardButtonRequestPollButtonRequiredFields = Assert<
	Extends<"request_poll" | "text", RequiredKeys<KeyboardButton.RequestPollButton>>
>;
export type KeyboardButtonRequestUsersButtonRequiredFields = Assert<
	Extends<"request_users" | "text", RequiredKeys<KeyboardButton.RequestUsersButton>>
>;
export type KeyboardButtonWebAppButtonRequiredFields = Assert<
	Extends<"text" | "web_app", RequiredKeys<KeyboardButton.WebAppButton>>
>;
export type KeyboardButtonRequestChatRequiredFields = Assert<
	Extends<"chat_is_channel" | "request_id", RequiredKeys<KeyboardButtonRequestChat>>
>;
export type KeyboardButtonRequestUsersRequiredFields = Assert<
	Extends<"request_id", RequiredKeys<KeyboardButtonRequestUsers>>
>;
export type LoginUrlRequiredFields = Assert<Extends<"url", RequiredKeys<LoginUrl>>>;
export type ReplyKeyboardMarkupRequiredFields = Assert<Extends<"keyboard", RequiredKeys<ReplyKeyboardMarkup>>>;
export type ReplyKeyboardRemoveRequiredFields = Assert<Extends<"remove_keyboard", RequiredKeys<ReplyKeyboardRemove>>>;
export type WebAppInfoRequiredFields = Assert<Extends<"url", RequiredKeys<WebAppInfo>>>;
