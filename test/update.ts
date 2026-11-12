import type { Update } from "../update.ts";
import { type Assert, type Equal, expectType, type Extends, type RequiredKeys } from "./assert.ts";

// The payload types live in other subpaths; `update` reaches them through its own fields.
type Message = Update.MessageUpdate["message"];
type User = Update.NonChannel["from"];
type CallbackQuery = Update.CallbackQueryUpdate["callback_query"];
type DataQuery = Extract<CallbackQuery, { data: string }>;
type TextMessage = Extract<Message, { text: string }>;

const user: User = { id: 123456789, is_bot: false, first_name: "Erika", language_code: "de" };

// Values

export const messageUpdate: Update.MessageUpdate = {
	update_id: 10000,
	message: {
		message_id: 101,
		date: 1709251200,
		chat: { id: 123456789, type: "private", first_name: "Erika" },
		from: user,
		text: "/start",
		entities: [{ type: "bot_command", offset: 0, length: 6 }],
	},
};

export const editedMessageUpdate: Update.EditedMessageUpdate = {
	update_id: 10001,
	edited_message: {
		message_id: 101,
		date: 1709251200,
		edit_date: 1709251260,
		chat: { id: -1001234567890, type: "supergroup", title: "Weather fans" },
		from: user,
		text: "/start@weather_bot",
	},
};

export const channelPostUpdate: Update.ChannelPostUpdate = {
	update_id: 10002,
	channel_post: {
		message_id: 303,
		date: 1709251200,
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		sender_chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		author_signature: "Weather desk",
		text: "Sunny tomorrow",
	},
};

export const editedChannelPostUpdate: Update.EditedChannelPostUpdate = {
	update_id: 10003,
	edited_channel_post: {
		message_id: 303,
		date: 1709251200,
		edit_date: 1709251300,
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		photo: [{ file_id: "AgACAgIAAxkBAAI", file_unique_id: "AQADx", width: 1280, height: 720 }],
		caption: "Sunny tomorrow",
	},
};

export const messageReactionUpdate: Update.MessageReactionUpdate = {
	update_id: 10004,
	message_reaction: {
		chat: { id: -1001234567890, type: "supergroup", title: "Weather fans" },
		message_id: 101,
		user,
		date: 1709251300,
		old_reaction: [],
		new_reaction: [{ type: "emoji", emoji: "👍" }],
	},
};

export const messageReactionCountUpdate: Update.MessageReactionCountUpdate = {
	update_id: 10005,
	message_reaction_count: {
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		message_id: 303,
		date: 1709251300,
		reactions: [{ type: { type: "emoji", emoji: "🔥" }, total_count: 12 }],
	},
};

export const inlineQueryUpdate: Update.InlineQueryUpdate = {
	update_id: 10006,
	inline_query: { id: "1234567890123456789", from: user, query: "berlin", offset: "", chat_type: "sender" },
};

export const chosenInlineResultUpdate: Update.ChosenInlineResultUpdate = {
	update_id: 10007,
	chosen_inline_result: { result_id: "berlin-today", from: user, query: "berlin" },
};

export const callbackQueryUpdate: Update.CallbackQueryUpdate = {
	update_id: 10008,
	callback_query: {
		id: "4382bfdwdsb323b2d9",
		from: user,
		chat_instance: "-4237498273498",
		message: { message_id: 7, date: 0, chat: { id: 123456789, type: "private", first_name: "Erika" } },
		data: "refresh:berlin",
	},
};

export const shippingQueryUpdate: Update.ShippingQueryUpdate = {
	update_id: 10009,
	shipping_query: {
		id: "8329742398",
		from: user,
		invoice_payload: "order-1842",
		shipping_address: {
			country_code: "DE",
			state: "",
			city: "Berlin",
			street_line1: "Unter den Linden 1",
			street_line2: "",
			post_code: "10117",
		},
	},
};

export const preCheckoutQueryUpdate: Update.PreCheckoutQueryUpdate = {
	update_id: 10010,
	pre_checkout_query: {
		id: "8329742399",
		from: user,
		currency: "EUR",
		total_amount: 2949,
		invoice_payload: "order-1842",
	},
};

export const pollUpdate: Update.PollUpdate = {
	update_id: 10011,
	poll: {
		id: "5432109876543210",
		question: "Weather tomorrow?",
		options: [
			{ text: "Rain", voter_count: 3 },
			{ text: "Sun", voter_count: 5 },
		],
		total_voter_count: 8,
		is_closed: true,
		is_anonymous: true,
		type: "regular",
		allows_multiple_answers: false,
	},
};

export const pollAnswerUpdate: Update.PollAnswerUpdate = {
	update_id: 10012,
	poll_answer: { poll_id: "5432109876543210", user, option_ids: [1] },
};

const memberUpdate = {
	chat: { id: -1001234567890, type: "supergroup", title: "Weather fans" },
	from: user,
	date: 1709251200,
	old_chat_member: { status: "left", user },
	new_chat_member: { status: "member", user },
} as const;

export const myChatMemberUpdate: Update.MyChatMemberUpdate = { update_id: 10013, my_chat_member: memberUpdate };

export const chatMemberUpdate: Update.ChatMemberUpdate = { update_id: 10014, chat_member: memberUpdate };

export const chatJoinRequestUpdate: Update.ChatJoinRequestUpdate = {
	update_id: 10015,
	chat_join_request: {
		chat: { id: -1001234567890, type: "supergroup", title: "Weather fans" },
		from: user,
		user_chat_id: 123456789,
		date: 1709251200,
	},
};

export const chatBoostUpdate: Update.ChatBoostUpdate = {
	update_id: 10016,
	chat_boost: {
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		boost: {
			boost_id: "boost-1",
			add_date: 1709251200,
			expiration_date: 1711929600,
			source: { source: "premium", user },
		},
	},
};

export const removedChatBoostUpdate: Update.RemovedChatBoostUpdate = {
	update_id: 10017,
	removed_chat_boost: {
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		boost_id: "boost-1",
		remove_date: 1710000000,
		source: { source: "giveaway", giveaway_message_id: 15, user },
	},
};

export const updates: Update[] = [
	messageUpdate,
	editedMessageUpdate,
	channelPostUpdate,
	editedChannelPostUpdate,
	messageReactionUpdate,
	messageReactionCountUpdate,
	inlineQueryUpdate,
	chosenInlineResultUpdate,
	callbackQueryUpdate,
	shippingQueryUpdate,
	preCheckoutQueryUpdate,
	pollUpdate,
	pollAnswerUpdate,
	myChatMemberUpdate,
	chatMemberUpdate,
	chatJoinRequestUpdate,
	chatBoostUpdate,
	removedChatBoostUpdate,
];

// Shape

// MyChatMemberUpdate and ChatMemberUpdate have the same payload type under different keys, so membership is checked exactly.
export type UpdateMembers = Assert<
	Equal<
		Update,
		| Update.CallbackQueryUpdate
		| Update.ChannelPostUpdate
		| Update.ChatMemberUpdate
		| Update.ChosenInlineResultUpdate
		| Update.EditedChannelPostUpdate
		| Update.MessageReactionUpdate
		| Update.MessageReactionCountUpdate
		| Update.EditedMessageUpdate
		| Update.InlineQueryUpdate
		| Update.MessageUpdate
		| Update.MyChatMemberUpdate
		| Update.PreCheckoutQueryUpdate
		| Update.PollAnswerUpdate
		| Update.PollUpdate
		| Update.ShippingQueryUpdate
		| Update.ChatJoinRequestUpdate
		| Update.ChatBoostUpdate
		| Update.RemovedChatBoostUpdate
	>
>;

type UpdateKeys<U> = U extends unknown ? Exclude<keyof U, "update_id"> : never;

export type UpdateType = Assert<
	Equal<
		UpdateKeys<Update>,
		| "message"
		| "edited_message"
		| "channel_post"
		| "edited_channel_post"
		| "message_reaction"
		| "message_reaction_count"
		| "inline_query"
		| "chosen_inline_result"
		| "callback_query"
		| "shipping_query"
		| "pre_checkout_query"
		| "poll"
		| "poll_answer"
		| "my_chat_member"
		| "chat_member"
		| "chat_join_request"
		| "chat_boost"
		| "removed_chat_boost"
	>
>;

export type AbstractUpdateFields = Assert<
	Equal<[keyof Update.AbstractUpdate, Update.AbstractUpdate["update_id"]], ["update_id", number]>
>;

export type UpdatesAreAbstract = Assert<Extends<Update, Update.AbstractUpdate>>;

export type MessageEnvelopes = Assert<
	Equal<
		[
			Update.MessageUpdate<TextMessage>["message"],
			Update.EditedMessageUpdate<TextMessage>["edited_message"],
			Update.ChannelPostUpdate<TextMessage>["channel_post"],
			Update.EditedChannelPostUpdate<TextMessage>["edited_channel_post"],
		],
		[
			Update.New & Update.NonChannel & TextMessage,
			Update.Edited & Update.NonChannel & TextMessage,
			Update.New & Update.Channel & TextMessage,
			Update.Edited & Update.Channel & TextMessage,
		]
	>
>;

export type EnvelopeFields = Assert<
	Equal<
		[
			Update.Channel["from"],
			Update.Channel["author_signature"],
			Update.NonChannel["author_signature"],
			Update.New["edit_date"],
			Update.Edited["edit_date"],
			Update.Edited["forward_date"],
		],
		[undefined, string | undefined, undefined, undefined, number, undefined]
	>
>;

export type ChannelChat = Assert<Equal<Update.Channel["chat"]["type"], "channel">>;

export type NonChannelChat = Assert<Equal<Update.NonChannel["chat"]["type"], "private" | "group" | "supergroup">>;

export type DataQueryUpdate = Assert<Equal<Update.CallbackQueryUpdate<DataQuery>["callback_query"]["data"], string>>;

export type PayloadTypes = Assert<
	Equal<
		[
			Update.MessageReactionUpdate["message_reaction"]["new_reaction"][number]["type"],
			Update.InlineQueryUpdate["inline_query"]["query"],
			Update.ChosenInlineResultUpdate["chosen_inline_result"]["result_id"],
			Update.ShippingQueryUpdate["shipping_query"]["shipping_address"]["city"],
			Update.PreCheckoutQueryUpdate["pre_checkout_query"]["total_amount"],
			Update.PollUpdate["poll"]["is_closed"],
			Update.PollAnswerUpdate["poll_answer"]["option_ids"],
			Update.ChatMemberUpdate["chat_member"],
			Update.ChatJoinRequestUpdate["chat_join_request"]["user_chat_id"],
			Update.ChatBoostUpdate["chat_boost"]["boost"]["boost_id"],
			Update.RemovedChatBoostUpdate["removed_chat_boost"]["remove_date"],
			Update.MessageReactionCountUpdate["message_reaction_count"]["reactions"][number]["total_count"],
		],
		[
			"emoji" | "custom_emoji",
			string,
			string,
			string,
			number,
			boolean,
			number[],
			Update.MyChatMemberUpdate["my_chat_member"],
			number,
			string,
			number,
			number,
		]
	>
>;

// Reading

export function messageOf(update: Update) {
	if ("message" in update) return update;
	return undefined;
}

export type MessageOfNarrowing = Assert<Equal<ReturnType<typeof messageOf>, Update.MessageUpdate | undefined>>;

export function editedOf(update: Update) {
	if ("edited_message" in update) return update.edited_message.edit_date;
	return undefined;
}

export type EditedOfResult = Assert<Equal<ReturnType<typeof editedOf>, number | undefined>>;

export function callbackDataOf(update: Update) {
	if ("callback_query" in update && "data" in update.callback_query) return update.callback_query.data;
	return undefined;
}

export type CallbackDataOfResult = Assert<Equal<ReturnType<typeof callbackDataOf>, string | undefined>>;

export function readText(update: Update) {
	if ("message" in update && "text" in update.message) {
		expectType<Update.New & Update.NonChannel & TextMessage>()(update.message);
		return update.message.text;
	}
	return undefined;
}

export type ReadTextResult = Assert<Equal<ReturnType<typeof readText>, string | undefined>>;

export function senderOf(update: Update) {
	if ("message" in update) return update.message.from;
	if ("callback_query" in update) return update.callback_query.from;
	if ("inline_query" in update) return update.inline_query.from;
	return undefined;
}

export type SenderOfResult = Assert<Equal<ReturnType<typeof senderOf>, User | undefined>>;

export function channelSender(update: Update) {
	if ("channel_post" in update) return update.channel_post.from;
	return null;
}

export type ChannelSenderResult = Assert<Equal<ReturnType<typeof channelSender>, null | undefined>>;

export function chatIdOf(update: Update) {
	if ("message" in update) return update.message.chat.id;
	if ("channel_post" in update) return update.channel_post.chat.id;
	if ("my_chat_member" in update) return update.my_chat_member.chat.id;
	if ("chat_boost" in update) return update.chat_boost.chat.id;
	return undefined;
}

export type ChatIdOfResult = Assert<Equal<ReturnType<typeof chatIdOf>, number | undefined>>;

export function boosterOf(update: Update) {
	if ("chat_boost" in update) {
		const source = update.chat_boost.boost.source;
		return source.source === "giveaway" ? source.user : source.user;
	}
	return undefined;
}

export type BoosterOfResult = Assert<Equal<ReturnType<typeof boosterOf>, User | undefined>>;

// Rejections

export const channelPostWithSender: Update.ChannelPostUpdate = {
	update_id: 10002,
	channel_post: {
		message_id: 303,
		date: 1709251200,
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		// @ts-expect-error — channel posts have no sender user
		from: user,
		text: "Sunny tomorrow",
	},
};

export const messageInChannel: Update.MessageUpdate = {
	update_id: 10000,
	message: {
		message_id: 101,
		date: 1709251200,
		// @ts-expect-error — channel messages arrive as channel_post
		chat: { id: -1009876543210, type: "channel", title: "Weather news" },
		from: user,
		text: "Hi",
	},
};

export const newMessageWithEditDate: Update.MessageUpdate = {
	update_id: 10000,
	message: {
		message_id: 101,
		date: 1709251200,
		chat: { id: 123456789, type: "private", first_name: "Erika" },
		from: user,
		text: "Hi",
		// @ts-expect-error — a new message hasn't been edited yet
		edit_date: 1709251260,
	},
};

export const editedWithoutEditDate: Update.EditedMessageUpdate = {
	update_id: 10001,
	// @ts-expect-error — an edited message always has its edit date
	edited_message: {
		message_id: 101,
		date: 1709251200,
		chat: { id: 123456789, type: "private", first_name: "Erika" },
		from: user,
		text: "Hi",
	},
};

export const editedServiceMessage: Update.EditedMessageUpdate = {
	update_id: 10001,
	edited_message: {
		message_id: 101,
		date: 1709251200,
		edit_date: 1709251260,
		chat: { id: -1001234567890, type: "supergroup", title: "Weather fans" },
		from: user,
		// @ts-expect-error — service messages can't be edited
		new_chat_title: "Rain fans",
	},
};

// @ts-expect-error — every update has an id
export const updateWithoutId: Update = { poll_answer: { poll_id: "1", user, option_ids: [] } };

// Required fields

export type UpdateAbstractUpdateRequiredFields = Assert<Extends<"update_id", RequiredKeys<Update.AbstractUpdate>>>;
export type UpdateCallbackQueryUpdateRequiredFields = Assert<
	Extends<"callback_query" | "update_id", RequiredKeys<Update.CallbackQueryUpdate>>
>;
export type UpdateChannelRequiredFields = Assert<Extends<"chat", RequiredKeys<Update.Channel>>>;
export type UpdateChannelPostUpdateRequiredFields = Assert<
	Extends<"channel_post" | "update_id", RequiredKeys<Update.ChannelPostUpdate>>
>;
export type UpdateChatBoostUpdateRequiredFields = Assert<
	Extends<"chat_boost" | "update_id", RequiredKeys<Update.ChatBoostUpdate>>
>;
export type UpdateChatJoinRequestUpdateRequiredFields = Assert<
	Extends<"chat_join_request" | "update_id", RequiredKeys<Update.ChatJoinRequestUpdate>>
>;
export type UpdateChatMemberUpdateRequiredFields = Assert<
	Extends<"chat_member" | "update_id", RequiredKeys<Update.ChatMemberUpdate>>
>;
export type UpdateChosenInlineResultUpdateRequiredFields = Assert<
	Extends<"chosen_inline_result" | "update_id", RequiredKeys<Update.ChosenInlineResultUpdate>>
>;
export type UpdateEditedRequiredFields = Assert<Extends<"edit_date", RequiredKeys<Update.Edited>>>;
export type UpdateEditedChannelPostUpdateRequiredFields = Assert<
	Extends<"edited_channel_post" | "update_id", RequiredKeys<Update.EditedChannelPostUpdate>>
>;
export type UpdateEditedMessageUpdateRequiredFields = Assert<
	Extends<"edited_message" | "update_id", RequiredKeys<Update.EditedMessageUpdate>>
>;
export type UpdateInlineQueryUpdateRequiredFields = Assert<
	Extends<"inline_query" | "update_id", RequiredKeys<Update.InlineQueryUpdate>>
>;
export type UpdateMessageReactionCountUpdateRequiredFields = Assert<
	Extends<"message_reaction_count" | "update_id", RequiredKeys<Update.MessageReactionCountUpdate>>
>;
export type UpdateMessageReactionUpdateRequiredFields = Assert<
	Extends<"message_reaction" | "update_id", RequiredKeys<Update.MessageReactionUpdate>>
>;
export type UpdateMessageUpdateRequiredFields = Assert<
	Extends<"message" | "update_id", RequiredKeys<Update.MessageUpdate>>
>;
export type UpdateMyChatMemberUpdateRequiredFields = Assert<
	Extends<"my_chat_member" | "update_id", RequiredKeys<Update.MyChatMemberUpdate>>
>;
export type UpdateNonChannelRequiredFields = Assert<Extends<"chat" | "from", RequiredKeys<Update.NonChannel>>>;
export type UpdatePollAnswerUpdateRequiredFields = Assert<
	Extends<"poll_answer" | "update_id", RequiredKeys<Update.PollAnswerUpdate>>
>;
export type UpdatePollUpdateRequiredFields = Assert<Extends<"poll" | "update_id", RequiredKeys<Update.PollUpdate>>>;
export type UpdatePreCheckoutQueryUpdateRequiredFields = Assert<
	Extends<"pre_checkout_query" | "update_id", RequiredKeys<Update.PreCheckoutQueryUpdate>>
>;
export type UpdateRemovedChatBoostUpdateRequiredFields = Assert<
	Extends<"removed_chat_boost" | "update_id", RequiredKeys<Update.RemovedChatBoostUpdate>>
>;
export type UpdateShippingQueryUpdateRequiredFields = Assert<
	Extends<"shipping_query" | "update_id", RequiredKeys<Update.ShippingQueryUpdate>>
>;
