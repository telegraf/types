/**
 * The type-level constructs telegraf 4.16.3 builds on `@telegraf/types` ^7.1.0, reproduced from its sources
 * (`src/core/types/typegram.ts`, `src/telegram-types.ts`, `src/core/helpers/*.ts`, `src/filters.ts`,
 * `src/context.ts`, `src/button.ts`, `src/markup.ts`, `src/telegram.ts`, `src/core/network/client.ts`,
 * `src/core/helpers/formatting.ts`, `src/format.ts`, `src/future.ts`, `src/reactions.ts`).
 * Runtime casts in telegraf are expressed with `declare` here, since the suite allows no `as` casts.
 */
import type * as tg from "../index.ts";
import { type Assert, type Equal, type Extends, expectType } from "./assert.ts";

// core/types/typegram.ts

// The suite compiles with `types: []`, so Node's stream and Buffer types are stood in for.
interface NodeReadableStream {
	readable: boolean;
	read(size?: number): string | Uint8Array | null;
}

interface InputFileByPath {
	source: string;
	filename?: string;
}
interface InputFileByReadableStream {
	source: NodeReadableStream;
	filename?: string;
}
interface InputFileByBuffer {
	source: Uint8Array;
	filename?: string;
}
interface InputFileByURL {
	url: string;
	filename?: string;
}
export type InputFile = InputFileByPath | InputFileByReadableStream | InputFileByBuffer | InputFileByURL;

export type Telegram = tg.ApiMethods<InputFile>;

export type Opts<M extends keyof Telegram> = tg.Opts<InputFile>[M];
export type InputMedia = tg.InputMedia<InputFile>;
export type InputMediaPhoto = tg.InputMediaPhoto<InputFile>;
export type InputMediaVideo = tg.InputMediaVideo<InputFile>;
export type InputMediaAnimation = tg.InputMediaAnimation<InputFile>;
export type InputMediaAudio = tg.InputMediaAudio<InputFile>;
export type InputMediaDocument = tg.InputMediaDocument<InputFile>;

export type ChatAction = Opts<"sendChatAction">["action"];

export type InputFileVideoNote = Exclude<InputFile, InputFileByURL>;

export const inputFiles: InputFile[] = [
	{ source: "/tmp/skyline.jpg" },
	{ source: new Uint8Array([0xff, 0xd8]), filename: "skyline.jpg" },
	{ url: "https://example.com/skyline.jpg", filename: "skyline.jpg" },
];

export const inputMediaPhoto: InputMediaPhoto = {
	type: "photo",
	media: { source: "/tmp/skyline.jpg" },
	caption: "Skyline",
};
export const inputMediaVideo: InputMediaVideo = { type: "video", media: { url: "https://example.com/v.mp4" } };
export const inputMediaAnimation: InputMediaAnimation = { type: "animation", media: "CgACAgIAAxkBAAI" };
export const inputMediaAudio: InputMediaAudio = { type: "audio", media: { source: "/tmp/rain.mp3" } };
export const inputMediaDocument: InputMediaDocument = { type: "document", media: { source: "/tmp/report.pdf" } };
export const inputMedia: InputMedia[] = [
	inputMediaPhoto,
	inputMediaVideo,
	inputMediaAnimation,
	inputMediaAudio,
	inputMediaDocument,
];

export const chatAction: ChatAction = "typing";

export const videoNoteFile: InputFileVideoNote = { source: "/tmp/note.mp4" };

// @ts-expect-error — telegraf excludes URLs for video notes, which can't be sent by URL
export const videoNoteByUrl: InputFileVideoNote = { url: "https://example.com/note.mp4" };

export type TypegramOpts = Assert<
	Equal<
		[Opts<"sendPhoto">["photo"], Opts<"sendVideoNote">["video_note"], Opts<"setChatPhoto">["photo"]],
		[InputFile | string, InputFile | string, InputFile]
	>
>;

// core/helpers/util.ts and core/helpers/deunionize.ts

export type PropOr<T extends object | undefined, P extends string | symbol | number, D = undefined> =
	T extends Partial<Record<P, unknown>> ? T[P] : D;

export type UnionKeys<T> = T extends unknown ? keyof T : never;

type AddOptionalKeys<K extends PropertyKey> = { readonly [P in K]?: never };

export type Deunionize<B extends object | undefined, T = B> = T extends object
	? T & AddOptionalKeys<Exclude<UnionKeys<B>, keyof T>>
	: T;

export type Expand<T> = T extends object ? (T extends infer O ? { [K in keyof O]: O[K] } : never) : T;

export type MaybeArray<T> = T | T[];

export type DistinctKeys<T extends object> = Exclude<UnionKeys<T>, keyof T>;

export type KeyedDistinct<T extends object, K extends DistinctKeys<T>> = Record<K, {}> & Deunionize<Record<K, {}>, T>;

export type Keyed<T extends object, K extends UnionKeys<T>> = Record<K, {}> & Deunionize<Record<K, {}>, T>;

export type Guard<X = unknown, Y extends X = X> = (x: X) => x is Y;

// telegraf infers from `(x: any) => x is infer T`; a method signature compares its parameter bivariantly, which
// matches any guard without `any`.
export type Guarded<F> = F extends { guard(x: unknown): x is infer T }["guard"] ? T : never;

export type DeunionizedUpdateConstraint = Assert<
	Equal<
		[
			Extends<tg.Update, Deunionize<tg.Update>>,
			Extends<tg.Update.MessageUpdate, Deunionize<tg.Update>>,
			Extends<tg.Update.CallbackQueryUpdate, Deunionize<tg.Update>>,
		],
		[true, true, true]
	>
>;

export type MessageDistinctKeys = Assert<
	Equal<
		[
			Extends<"text" | "photo" | "caption" | "new_chat_members" | "reply_to_message", DistinctKeys<tg.Message>>,
			Extends<"message_id" | "chat" | "date", DistinctKeys<tg.Message>>,
		],
		[true, false]
	>
>;

export function deunionizedText(message: Deunionize<tg.Message>) {
	return message.text;
}

export type DeunionizedTextResult = Assert<Equal<ReturnType<typeof deunionizedText>, string | undefined>>;

export function deunionizedPhoto(message: Deunionize<tg.Message>) {
	return message.photo;
}

export type DeunionizedPhotoResult = Assert<Equal<ReturnType<typeof deunionizedPhoto>, tg.PhotoSize[] | undefined>>;

// telegram-types.ts

/** Stands in for telegraf's FmtString class from `core/helpers/formatting.ts`. */
export interface FmtString<Brand extends string = string> {
	text: string;
	entities?: tg.MessageEntity[];
	parse_mode?: undefined;
	__to_nest: Brand;
}

export type WrapCaption<T> = T extends { caption?: string }
	? Expand<Omit<T, "caption"> & { caption?: string | FmtString }>
	: T;

type MakeExtra<M extends keyof Telegram, K extends keyof Omit<Opts<M>, "chat_id"> = never> = WrapCaption<
	Omit<Opts<M>, "chat_id" | K>
>;

export type ExtraAddStickerToSet = MakeExtra<"addStickerToSet", "name" | "user_id">;
export type ExtraAnimation = MakeExtra<"sendAnimation", "animation">;
export type ExtraAnswerCbQuery = MakeExtra<"answerCallbackQuery", "text" | "callback_query_id">;
export type ExtraAnswerInlineQuery = MakeExtra<"answerInlineQuery", "inline_query_id" | "results">;
export type ExtraSetChatPermissions = MakeExtra<"setChatPermissions", "permissions">;
export type ExtraAudio = MakeExtra<"sendAudio", "audio">;
export type ExtraContact = MakeExtra<"sendContact", "phone_number" | "first_name">;
export type ExtraCopyMessage = MakeExtra<"copyMessage", "from_chat_id" | "message_id">;
export type ExtraCopyMessages = MakeExtra<"copyMessages", "from_chat_id" | "message_ids">;
export type ExtraCreateChatInviteLink = MakeExtra<"createChatInviteLink">;
export type NewInvoiceLinkParameters = MakeExtra<"createInvoiceLink">;
export type ExtraCreateNewStickerSet = MakeExtra<"createNewStickerSet", "name" | "title" | "user_id">;
export type ExtraDice = MakeExtra<"sendDice">;
export type ExtraDocument = MakeExtra<"sendDocument", "document">;
export type ExtraEditChatInviteLink = MakeExtra<"editChatInviteLink", "invite_link">;
export type ExtraEditMessageCaption = MakeExtra<"editMessageCaption", "message_id" | "inline_message_id" | "caption">;
export type ExtraEditMessageLiveLocation = MakeExtra<
	"editMessageLiveLocation",
	"message_id" | "inline_message_id" | "latitude" | "longitude"
>;
export type ExtraEditMessageMedia = MakeExtra<"editMessageMedia", "message_id" | "inline_message_id" | "media">;
export type ExtraEditMessageText = MakeExtra<"editMessageText", "message_id" | "inline_message_id" | "text">;
export type ExtraGame = MakeExtra<"sendGame", "game_short_name">;
export type NewInvoiceParameters = MakeExtra<
	"sendInvoice",
	"disable_notification" | "reply_parameters" | "reply_markup" | "message_thread_id"
>;
export type ExtraInvoice = MakeExtra<"sendInvoice", keyof NewInvoiceParameters>;
export type ExtraBanChatMember = MakeExtra<"banChatMember", "user_id" | "until_date">;
export type ExtraKickChatMember = ExtraBanChatMember;
export type ExtraLocation = MakeExtra<"sendLocation", "latitude" | "longitude">;
export type ExtraMediaGroup = MakeExtra<"sendMediaGroup", "media">;
export type ExtraPhoto = MakeExtra<"sendPhoto", "photo">;
export type ExtraPoll = MakeExtra<"sendPoll", "question" | "options" | "type">;
export type ExtraPromoteChatMember = MakeExtra<"promoteChatMember", "user_id">;
export type ExtraReplyMessage = MakeExtra<"sendMessage", "text">;
export type ExtraForwardMessage = MakeExtra<"forwardMessage", "from_chat_id" | "message_id">;
export type ExtraForwardMessages = MakeExtra<"forwardMessages", "from_chat_id" | "message_ids">;
export type ExtraSendChatAction = MakeExtra<"sendChatAction", "action">;
export type ExtraRestrictChatMember = MakeExtra<"restrictChatMember", "user_id">;
export type ExtraSetMyCommands = MakeExtra<"setMyCommands", "commands">;
export type ExtraSetWebhook = MakeExtra<"setWebhook", "url">;
export type ExtraSticker = MakeExtra<"sendSticker", "sticker">;
export type ExtraStopPoll = MakeExtra<"stopPoll", "message_id">;
export type ExtraVenue = MakeExtra<"sendVenue", "latitude" | "longitude" | "title" | "address">;
export type ExtraVideo = MakeExtra<"sendVideo", "video">;
export type ExtraVideoNote = MakeExtra<"sendVideoNote", "video_note">;
export type ExtraVoice = MakeExtra<"sendVoice", "voice">;
export type ExtraBanChatSenderChat = MakeExtra<"banChatSenderChat", "sender_chat_id">;
export type ExtraCreateForumTopic = MakeExtra<"createForumTopic", "name">;
export type ExtraEditForumTopic = MakeExtra<"editForumTopic", "message_thread_id">;

export type MediaGroup =
	| readonly (InputMediaPhoto | InputMediaVideo)[]
	| readonly InputMediaAudio[]
	| readonly InputMediaDocument[];

declare const caption: FmtString;
const replyParameters = { message_id: 42 };
const callbackKeyboard = { inline_keyboard: [[{ text: "Refresh", callback_data: "refresh" }]] };

export const extraAddStickerToSet: ExtraAddStickerToSet = {
	sticker: { sticker: "CAACAgIAAxkBAAI", format: "static", emoji_list: ["🌧"] },
};
export const extraAnimation: ExtraAnimation = { caption, has_spoiler: true, thumbnail: { source: "/tmp/t.jpg" } };
export const extraAnswerCbQuery: ExtraAnswerCbQuery = { show_alert: true, url: "https://t.me/weather_bot?game=snake" };
export const extraAnswerInlineQuery: ExtraAnswerInlineQuery = { cache_time: 60, is_personal: true, next_offset: "20" };
export const extraSetChatPermissions: ExtraSetChatPermissions = { use_independent_chat_permissions: true };
export const extraAudio: ExtraAudio = { caption: "Rain", performer: "Nature", title: "Rain", duration: 184 };
export const extraContact: ExtraContact = { last_name: "Mustermann", reply_parameters: replyParameters };
export const extraCopyMessage: ExtraCopyMessage = { caption, reply_markup: callbackKeyboard };
export const extraCopyMessages: ExtraCopyMessages = { remove_caption: true, protect_content: true };
export const extraCreateChatInviteLink: ExtraCreateChatInviteLink = { name: "Newsletter", member_limit: 100 };
export const newInvoiceLinkParameters: NewInvoiceLinkParameters = {
	title: "Umbrella",
	description: "Stays dry",
	payload: "umbrella-1",
	provider_token: "284685063:TEST:abc",
	currency: "EUR",
	prices: [{ label: "Umbrella", amount: 1999 }],
};
export const extraCreateNewStickerSet: ExtraCreateNewStickerSet = {
	stickers: [{ sticker: { source: "/tmp/s.webp" }, format: "static", emoji_list: ["🌧"] }],
};
export const extraDice: ExtraDice = { emoji: "🎰", disable_notification: true };
export const extraDocument: ExtraDocument = { caption, disable_content_type_detection: true };
export const extraEditChatInviteLink: ExtraEditChatInviteLink = { name: "Newsletter", creates_join_request: true };
export const extraEditMessageCaption: ExtraEditMessageCaption = { parse_mode: "HTML", reply_markup: callbackKeyboard };
export const extraEditMessageLiveLocation: ExtraEditMessageLiveLocation = { heading: 90, horizontal_accuracy: 20 };
export const extraEditMessageMedia: ExtraEditMessageMedia = { reply_markup: callbackKeyboard };
export const extraEditMessageText: ExtraEditMessageText = {
	parse_mode: "MarkdownV2",
	link_preview_options: { is_disabled: true },
};
export const extraGame: ExtraGame = { reply_markup: callbackKeyboard, protect_content: true };
export const newInvoiceParameters: NewInvoiceParameters = {
	title: "Umbrella",
	description: "Stays dry",
	payload: "umbrella-1",
	provider_token: "284685063:TEST:abc",
	currency: "EUR",
	prices: [{ label: "Umbrella", amount: 1999 }],
	need_shipping_address: true,
};
export const extraInvoice: ExtraInvoice = { disable_notification: true, reply_markup: callbackKeyboard };
export const extraBanChatMember: ExtraBanChatMember = { revoke_messages: true };
export const extraKickChatMember: ExtraKickChatMember = { revoke_messages: false };
export const extraLocation: ExtraLocation = { live_period: 900, proximity_alert_radius: 100 };
export const extraMediaGroup: ExtraMediaGroup = { disable_notification: true, reply_parameters: replyParameters };
export const extraPhoto: ExtraPhoto = { caption, has_spoiler: true };
export const extraPoll: ExtraPoll = { is_anonymous: false, allows_multiple_answers: true };
export const extraPromoteChatMember: ExtraPromoteChatMember = { can_manage_chat: true, can_post_stories: true };
export const extraReplyMessage: ExtraReplyMessage = { parse_mode: "HTML", reply_parameters: replyParameters };
export const extraForwardMessage: ExtraForwardMessage = { disable_notification: true, message_thread_id: 7 };
export const extraForwardMessages: ExtraForwardMessages = { protect_content: true };
export const extraSendChatAction: ExtraSendChatAction = { message_thread_id: 7 };
export const extraRestrictChatMember: ExtraRestrictChatMember = {
	permissions: { can_send_messages: false },
	until_date: 0,
};
export const extraSetMyCommands: ExtraSetMyCommands = { scope: { type: "all_group_chats" }, language_code: "de" };
export const extraSetWebhook: ExtraSetWebhook = { secret_token: "s3cr3t", drop_pending_updates: true };
export const extraSticker: ExtraSticker = { emoji: "🌧" };
export const extraStopPoll: ExtraStopPoll = { reply_markup: callbackKeyboard };
export const extraVenue: ExtraVenue = { foursquare_id: "4adcda09f964a520e83321e3" };
export const extraVideo: ExtraVideo = { caption, supports_streaming: true, width: 1280, height: 720 };
export const extraVideoNote: ExtraVideoNote = { length: 240, thumbnail: { source: "/tmp/t.jpg" } };
export const extraVoice: ExtraVoice = { caption: "Forecast", duration: 5 };
export const extraBanChatSenderChat: ExtraBanChatSenderChat = {};
export const extraCreateForumTopic: ExtraCreateForumTopic = { icon_color: 0xffd67e };
export const extraEditForumTopic: ExtraEditForumTopic = { name: "Forecasts", icon_custom_emoji_id: "" };

export const albums: MediaGroup[] = [[inputMediaPhoto, inputMediaVideo], [inputMediaAudio], [inputMediaDocument]];

// @ts-expect-error — documents can't be mixed with photos in an album
export const mixedAlbum: MediaGroup = [inputMediaPhoto, inputMediaDocument];

export type ExtraCaptions = Assert<
	Equal<
		[ExtraPhoto["caption"], ExtraAudio["caption"], ExtraCopyMessage["caption"], ExtraReplyMessage, ExtraSendChatAction],
		[
			string | FmtString | undefined,
			string | FmtString | undefined,
			string | FmtString | undefined,
			Omit<Opts<"sendMessage">, "chat_id" | "text">,
			Omit<Opts<"sendChatAction">, "chat_id" | "action">,
		]
	>
>;

// `restrictChatMember` keeps `permissions` required after `user_id` is omitted.
// @ts-expect-error — permissions is still required
export const extraRestrictWithoutPermissions: ExtraRestrictChatMember = { until_date: 0 };

// Update and message subtypes

export type UpdateType = Exclude<UnionKeys<tg.Update>, keyof tg.Update>;

export type MessageSubType =
	| "forward_date"
	| Exclude<UnionKeys<tg.Message>, keyof tg.Message.CaptionableMessage | "entities" | "media_group_id">;

type ExtractPartial<T extends object, U extends object> = T extends unknown
	? Required<T> extends U
		? T
		: never
	: never;

export type MountMap = {
	[T in UpdateType]: Extract<tg.Update, Record<T, object>>;
} & {
	[T in MessageSubType]: {
		message: ExtractPartial<tg.Update.MessageUpdate["message"], Record<T, unknown>>;
		update_id: number;
	};
};

export type UpdateTypeMembers = Assert<
	Equal<
		UpdateType,
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
		| "business_connection"
		| "business_message"
		| "edited_business_message"
		| "deleted_business_messages"
		| "guest_message"
		| "purchased_paid_media"
		| "managed_bot"
		| "subscription"
		| "stopped_message_generation"
	>
>;

export type MessageSubTypeMembers = Assert<
	Equal<
		MessageSubType,
		| "forward_date"
		| "text"
		| "animation"
		| "audio"
		| "document"
		| "photo"
		| "sticker"
		| "story"
		| "video"
		| "video_note"
		| "voice"
		| "contact"
		| "dice"
		| "game"
		| "poll"
		| "location"
		| "venue"
		| "has_media_spoiler"
		| "new_chat_members"
		| "left_chat_member"
		| "new_chat_title"
		| "new_chat_photo"
		| "delete_chat_photo"
		| "group_chat_created"
		| "supergroup_chat_created"
		| "channel_chat_created"
		| "message_auto_delete_timer_changed"
		| "migrate_to_chat_id"
		| "migrate_from_chat_id"
		| "pinned_message"
		| "invoice"
		| "successful_payment"
		| "users_shared"
		| "chat_shared"
		| "connected_website"
		| "write_access_allowed"
		| "passport_data"
		| "proximity_alert_triggered"
		| "boost_added"
		| "forum_topic_created"
		| "forum_topic_edited"
		| "forum_topic_closed"
		| "forum_topic_reopened"
		| "general_forum_topic_hidden"
		| "general_forum_topic_unhidden"
		| "giveaway_created"
		| "giveaway"
		| "giveaway_winners"
		| "giveaway_completed"
		| "video_chat_scheduled"
		| "video_chat_started"
		| "video_chat_ended"
		| "video_chat_participants_invited"
		| "web_app_data"
		| "show_caption_above_media"
		| "checklist"
		| "live_photo"
		| "paid_media"
		| "rich_message"
		| "chat_owner_left"
		| "chat_owner_changed"
		| "refunded_payment"
		| "gift"
		| "unique_gift"
		| "gift_upgrade_sent"
		| "chat_background_set"
		| "checklist_tasks_done"
		| "checklist_tasks_added"
		| "community_chat_added"
		| "community_chat_joined"
		| "community_chat_removed"
		| "direct_message_price_changed"
		| "paid_message_price_changed"
		| "poll_option_added"
		| "poll_option_deleted"
		| "suggested_post_approved"
		| "suggested_post_approval_failed"
		| "suggested_post_declined"
		| "suggested_post_paid"
		| "suggested_post_refunded"
		| "managed_bot_created"
	>
>;

export type MountMapEntries = Assert<
	Equal<
		[MountMap["callback_query"], MountMap["chat_boost"], MountMap["text"]["message"]],
		[
			tg.Update.CallbackQueryUpdate,
			tg.Update.ChatBoostUpdate,
			tg.Update.New & tg.Update.NonChannel & tg.Message.TextMessage,
		]
	>
>;

// filters.ts

export type Filter<U extends tg.Update> = (update: tg.Update) => update is U;

export type AllGuarded<Fs extends Filter<tg.Update>[]> = Fs extends [infer A, ...infer B]
	? B extends []
		? Guarded<A>
		: B extends Filter<tg.Update>[]
			? Guarded<A> & AllGuarded<B>
			: never
	: never;

export const message =
	<Ks extends DistinctKeys<tg.Message>[]>(...keys: Ks) =>
	(update: tg.Update): update is tg.Update.MessageUpdate<KeyedDistinct<tg.Message, Ks[number]>> => {
		if (!("message" in update)) return false;
		for (const key of keys) {
			if (!(key in update.message)) return false;
		}
		return true;
	};

export const editedMessage =
	<Ks extends DistinctKeys<tg.CommonMessageBundle>[]>(...keys: Ks) =>
	(update: tg.Update): update is tg.Update.EditedMessageUpdate<KeyedDistinct<tg.CommonMessageBundle, Ks[number]>> => {
		if (!("edited_message" in update)) return false;
		for (const key of keys) {
			if (!(key in update.edited_message)) return false;
		}
		return true;
	};

export const channelPost =
	<Ks extends DistinctKeys<tg.Message>[]>(...keys: Ks) =>
	(update: tg.Update): update is tg.Update.ChannelPostUpdate<KeyedDistinct<tg.Message, Ks[number]>> => {
		if (!("channel_post" in update)) return false;
		for (const key of keys) {
			if (!(key in update.channel_post)) return false;
		}
		return true;
	};

export const editedChannelPost =
	<Ks extends DistinctKeys<tg.CommonMessageBundle>[]>(...keys: Ks) =>
	(
		update: tg.Update,
	): update is tg.Update.EditedChannelPostUpdate<KeyedDistinct<tg.CommonMessageBundle, Ks[number]>> => {
		if (!("edited_channel_post" in update)) return false;
		for (const key of keys) {
			if (!(key in update.edited_channel_post)) return false;
		}
		return true;
	};

export const callbackQuery =
	<Ks extends DistinctKeys<tg.CallbackQuery>[]>(...keys: Ks) =>
	(update: tg.Update): update is tg.Update.CallbackQueryUpdate<KeyedDistinct<tg.CallbackQuery, Ks[number]>> => {
		if (!("callback_query" in update)) return false;
		for (const key of keys) {
			if (!(key in update.callback_query)) return false;
		}
		return true;
	};

export const anyOf =
	<Us extends tg.Update[]>(...filters: { [UIdx in keyof Us]: Filter<Us[UIdx]> }) =>
	(update: tg.Update): update is Us[number] => {
		for (const filter of filters) if (filter(update)) return true;
		return false;
	};

export const allOf =
	<U extends tg.Update, Fs extends Filter<U>[]>(...filters: Fs) =>
	(update: tg.Update): update is AllGuarded<Fs> => {
		for (const filter of filters) if (!filter(update)) return false;
		return true;
	};

export const textFilter = message("text");
export const photoFilter = message("photo");
export const editedTextFilter = editedMessage("text");
export const channelPhotoFilter = channelPost("photo");
export const editedChannelTextFilter = editedChannelPost("text");
export const dataFilter = callbackQuery("data");
export const gameFilter = callbackQuery("game_short_name");
export const mediaFilter = anyOf(message("photo"), message("video"));
export const captionedPhotoFilter = allOf(message("photo"), message("caption"));

export function readFilteredText(update: tg.Update) {
	if (textFilter(update)) return update.message.text;
	return undefined;
}

export type ReadFilteredTextResult = Assert<Equal<ReturnType<typeof readFilteredText>, string | undefined>>;

export function readFilteredPhoto(update: tg.Update) {
	if (photoFilter(update)) return update.message.photo;
	if (channelPhotoFilter(update)) return update.channel_post.photo;
	return undefined;
}

export type ReadFilteredPhotoResult = Assert<Equal<ReturnType<typeof readFilteredPhoto>, tg.PhotoSize[] | undefined>>;

export function readFilteredEdit(update: tg.Update) {
	if (editedTextFilter(update)) return update.edited_message.edit_date;
	if (editedChannelTextFilter(update)) return update.edited_channel_post.text;
	return undefined;
}

export type ReadFilteredEditResult = Assert<Equal<ReturnType<typeof readFilteredEdit>, number | string | undefined>>;

export function readFilteredData(update: tg.Update) {
	if (dataFilter(update)) return update.callback_query.data;
	if (gameFilter(update)) return update.callback_query.game_short_name;
	return undefined;
}

export type ReadFilteredDataResult = Assert<Equal<ReturnType<typeof readFilteredData>, string | undefined>>;

export function readMedia(update: tg.Update) {
	if (mediaFilter(update)) return update.message.message_id;
	if (captionedPhotoFilter(update)) return update.message.caption;
	return undefined;
}

export type ReadMediaResult = Assert<Equal<ReturnType<typeof readMedia>, number | string | undefined>>;

export type GuardedFilters = Assert<
	Equal<
		[Guarded<typeof dataFilter>, Guarded<Filter<tg.Update.PollUpdate>>],
		[tg.Update.CallbackQueryUpdate<KeyedDistinct<tg.CallbackQuery, "data">>, tg.Update.PollUpdate]
	>
>;

// @ts-expect-error — chat is on every message, so it can't select a message type
export const chatFilter = message("chat");

// @ts-expect-error — service messages can't be edited, so editedMessage doesn't offer their keys
export const editedTitleFilter = editedMessage("new_chat_title");

// context.ts

type UpdateTypes<U extends Deunionize<tg.Update>> = Extract<UnionKeys<U>, UpdateType>;

export type GetUpdateContent<U extends tg.Update> = U extends tg.Update.CallbackQueryUpdate
	? U["callback_query"]["message"]
	: U[UpdateTypes<U>];

type Getter<U extends Deunionize<tg.Update>, P extends string> = PropOr<GetUpdateContent<U>, P>;

interface Msg {
	isAccessible(): this is MaybeMessage<tg.Message>;
	has<Ks extends UnionKeys<tg.Message>[]>(...keys: Ks): this is MaybeMessage<Keyed<tg.Message, Ks[number]>>;
}

export type MaybeMessage<M extends tg.MaybeInaccessibleMessage = tg.MaybeInaccessibleMessage> = M & Msg;

type GetMsg<U extends tg.Update> = U extends tg.Update.MessageUpdate
	? U["message"]
	: U extends tg.Update.ChannelPostUpdate
		? U["channel_post"]
		: U extends tg.Update.EditedChannelPostUpdate
			? U["edited_channel_post"]
			: U extends tg.Update.EditedMessageUpdate
				? U["edited_message"]
				: U extends tg.Update.CallbackQueryUpdate
					? U["callback_query"]["message"]
					: undefined;

type GetUserFromAnySource<U extends tg.Update> =
	GetMsg<U> extends { from: tg.User }
		? tg.User
		: U extends
					| tg.Update.CallbackQueryUpdate
					| tg.Update.InlineQueryUpdate
					| tg.Update.ShippingQueryUpdate
					| tg.Update.PreCheckoutQueryUpdate
					| tg.Update.ChosenInlineResultUpdate
					| tg.Update.ChatMemberUpdate
					| tg.Update.MyChatMemberUpdate
					| tg.Update.ChatJoinRequestUpdate
					| tg.Update.MessageReactionUpdate
					| tg.Update.PollAnswerUpdate
					| tg.Update.ChatBoostUpdate
			? tg.User
			: undefined;

type GetMsgId<U extends tg.Update> =
	GetMsg<U> extends { message_id: number }
		? number
		: U extends tg.Update.MessageReactionUpdate
			? number
			: U extends tg.Update.MessageReactionCountUpdate
				? number
				: undefined;

type GetText<U extends tg.Update> =
	GetMsg<U> extends tg.Message.TextMessage
		? string
		: GetMsg<U> extends tg.Message
			? string | undefined
			: U extends tg.Update.PollUpdate
				? string | undefined
				: undefined;

/** The getters of telegraf's Context, with the types its casts give them. */
export declare class Context<U extends Deunionize<tg.Update> = tg.Update> {
	readonly update: U;
	readonly botInfo: tg.UserFromGetMe;
	readonly message: PropOr<U, "message">;
	readonly editedMessage: PropOr<U, "edited_message">;
	readonly inlineQuery: PropOr<U, "inline_query">;
	readonly shippingQuery: PropOr<U, "shipping_query">;
	readonly preCheckoutQuery: PropOr<U, "pre_checkout_query">;
	readonly chosenInlineResult: PropOr<U, "chosen_inline_result">;
	readonly channelPost: PropOr<U, "channel_post">;
	readonly editedChannelPost: PropOr<U, "edited_channel_post">;
	readonly messageReaction: PropOr<U, "message_reaction">;
	readonly messageReactionCount: PropOr<U, "message_reaction_count">;
	readonly callbackQuery: PropOr<U, "callback_query">;
	readonly poll: PropOr<U, "poll">;
	readonly pollAnswer: PropOr<U, "poll_answer">;
	readonly myChatMember: PropOr<U, "my_chat_member">;
	readonly chatMember: PropOr<U, "chat_member">;
	readonly chatJoinRequest: PropOr<U, "chat_join_request">;
	readonly chatBoost: PropOr<U, "chat_boost">;
	readonly removedChatBoost: PropOr<U, "removed_chat_boost">;
	readonly msg: GetMsg<U> & Msg;
	readonly msgId: GetMsgId<U>;
	readonly chat: Getter<U, "chat">;
	readonly senderChat: Getter<U, "sender_chat">;
	readonly from: GetUserFromAnySource<U>;
	readonly text: GetText<U>;
	has<F extends UpdateType | Guard<Context["update"]>>(filters: MaybeArray<F>): this is FilteredContext<Context, F>;
}

export type NarrowedContext<C extends Context, U extends tg.Update> = Context<U> & Omit<C, keyof Context>;

export type FilteredContext<Ctx extends Context, F extends UpdateType | Guard<Ctx["update"]>> = F extends UpdateType
	? NarrowedContext<Ctx, Extract<tg.Update, Record<F, object>>>
	: NarrowedContext<Ctx, Guarded<F>>;

export declare const textContext: FilteredContext<Context, typeof textFilter>;
export declare const callbackContext: FilteredContext<Context, "callback_query">;
export declare const channelContext: FilteredContext<Context, "channel_post">;
export declare const reactionContext: FilteredContext<Context, "message_reaction">;
export declare const pollContext: FilteredContext<Context, "poll">;
export declare const anyContext: Context;

export type ContextGetters = Assert<
	Equal<
		[
			typeof textContext.message.text,
			typeof textContext.text,
			typeof textContext.from,
			typeof textContext.msgId,
			typeof callbackContext.callbackQuery,
			typeof callbackContext.message,
			typeof callbackContext.from,
			typeof channelContext.from,
			typeof channelContext.chat,
			typeof reactionContext.msgId,
			typeof reactionContext.from,
			typeof pollContext.text,
			typeof anyContext.botInfo,
		],
		[
			string,
			string,
			tg.User,
			number,
			tg.CallbackQuery,
			undefined,
			tg.User,
			undefined,
			tg.Chat.ChannelChat,
			number,
			tg.User,
			string | undefined,
			tg.UserFromGetMe,
		]
	>
>;

export function readContextChat(ctx: Context) {
	if (ctx.has("message")) {
		expectType<tg.Update.MessageUpdate>()(ctx.update);
		return ctx.message.chat.id;
	}
	if (ctx.has(textFilter)) return ctx.message.text;
	return undefined;
}

export type ReadContextChatResult = Assert<Equal<ReturnType<typeof readContextChat>, number | string | undefined>>;

export function readMsg(ctx: Context) {
	const msg = ctx.msg;
	if (msg?.isAccessible()) return msg.date;
	if (msg?.has("text")) return msg.text;
	return undefined;
}

export type ReadMsgResult = Assert<Equal<ReturnType<typeof readMsg>, number | string | undefined>>;

// reactions.ts and Context.react

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Reaction = tg.TelegramEmoji | `${Digit}${string}` | Deunionize<tg.ReactionType>;

function isCustomEmojiId(reaction: string): reaction is `${Digit}${string}` {
	return reaction[0] !== undefined && "0123456789".includes(reaction[0]);
}

export function toReactionTypes(reaction: MaybeArray<tg.TelegramEmoji | `${Digit}${string}` | tg.ReactionType>) {
	const reactions = Array.isArray(reaction) ? reaction : [reaction];
	return reactions.map((emoji): tg.ReactionType => {
		if (typeof emoji !== "string") return emoji;
		if (isCustomEmojiId(emoji)) return { type: "custom_emoji", custom_emoji_id: emoji };
		return { type: "emoji", emoji };
	});
}

export const reactions: Reaction[] = ["👍", "5368324170671202286", { type: "emoji", emoji: "🔥" }];

export type ToReactionTypesResult = Assert<Equal<ReturnType<typeof toReactionTypes>, tg.ReactionType[]>>;

export function inspectReaction(reaction: Deunionize<tg.ReactionType>) {
	if (reaction.type === "custom_emoji") return `Custom(${reaction.custom_emoji_id})`;
	if (reaction.type === "paid") return "Paid";
	return reaction.emoji;
}

export type InspectReactionResult = Assert<Equal<ReturnType<typeof inspectReaction>, string>>;

// button.ts

type Hideable<B> = B & { hide: boolean };

type KeyboardButtonRequestGroup = Omit<tg.KeyboardButtonRequestChat, "request_id" | "chat_is_channel">;
type KeyboardButtonRequestChannel = Omit<
	tg.KeyboardButtonRequestChat,
	"request_id" | "chat_is_channel" | "chat_is_forum"
>;

export const button = {
	text(text: string, hide = false): Hideable<tg.KeyboardButton.CommonButton> {
		return { text, hide };
	},
	contactRequest(text: string, hide = false): Hideable<tg.KeyboardButton.RequestContactButton> {
		return { text, request_contact: true, hide };
	},
	locationRequest(text: string, hide = false): Hideable<tg.KeyboardButton.RequestLocationButton> {
		return { text, request_location: true, hide };
	},
	pollRequest(text: string, type?: "quiz" | "regular", hide = false): Hideable<tg.KeyboardButton.RequestPollButton> {
		return { text, request_poll: { type }, hide };
	},
	userRequest(
		text: string,
		request_id: number,
		extra?: Omit<tg.KeyboardButtonRequestUsers, "request_id" | "text">,
		hide = false,
	): Hideable<tg.KeyboardButton.RequestUsersButton> {
		return { text, request_users: { request_id, ...extra }, hide };
	},
	botRequest(
		text: string,
		request_id: number,
		extra?: Omit<tg.KeyboardButtonRequestUsers, "request_id" | "user_is_bot" | "text">,
		hide = false,
	): Hideable<tg.KeyboardButton.RequestUsersButton> {
		return { text, request_users: { request_id, user_is_bot: true, ...extra }, hide };
	},
	groupRequest(
		text: string,
		request_id: number,
		extra?: KeyboardButtonRequestGroup,
		hide = false,
	): Hideable<tg.KeyboardButton.RequestChatButton> {
		return { text, request_chat: { request_id, chat_is_channel: false, ...extra }, hide };
	},
	channelRequest(
		text: string,
		request_id: number,
		extra?: KeyboardButtonRequestChannel,
		hide = false,
	): Hideable<tg.KeyboardButton.RequestChatButton> {
		return { text, request_chat: { request_id, chat_is_channel: true, ...extra }, hide };
	},
	url(text: string, url: string, hide = false): Hideable<tg.InlineKeyboardButton.UrlButton> {
		return { text, url, hide };
	},
	callback(text: string, data: string, hide = false): Hideable<tg.InlineKeyboardButton.CallbackButton> {
		return { text, callback_data: data, hide };
	},
	switchToChat(text: string, value: string, hide = false): Hideable<tg.InlineKeyboardButton.SwitchInlineButton> {
		return { text, switch_inline_query: value, hide };
	},
	switchToCurrentChat(
		text: string,
		value: string,
		hide = false,
	): Hideable<tg.InlineKeyboardButton.SwitchInlineCurrentChatButton> {
		return { text, switch_inline_query_current_chat: value, hide };
	},
	game(text: string, hide = false): Hideable<tg.InlineKeyboardButton.GameButton> {
		return { text, callback_game: {}, hide };
	},
	pay(text: string, hide = false): Hideable<tg.InlineKeyboardButton.PayButton> {
		return { text, pay: true, hide };
	},
	login(
		text: string,
		url: string,
		opts: { forward_text?: string; bot_username?: string; request_write_access?: boolean } = {},
		hide = false,
	): Hideable<tg.InlineKeyboardButton.LoginButton> {
		return { text, login_url: { ...opts, url }, hide };
	},
	webApp(text: string, url: string, hide = false): Hideable<tg.InlineKeyboardButton.WebAppButton> {
		return { text, web_app: { url }, hide };
	},
};

// telegraf's webApp button serves both keyboards.
export type WebAppButtonServesBothKeyboards = Assert<
	Equal<
		[
			Extends<ReturnType<typeof button.webApp>, tg.InlineKeyboardButton>,
			Extends<ReturnType<typeof button.webApp>, tg.KeyboardButton>,
		],
		[true, true]
	>
>;

// markup.ts

type HideableKBtn = tg.KeyboardButton & { hide?: boolean };
type HideableIKBtn = tg.InlineKeyboardButton & { hide?: boolean };

export class Markup<
	T extends tg.InlineKeyboardMarkup | tg.ReplyKeyboardMarkup | tg.ReplyKeyboardRemove | tg.ForceReply,
> {
	constructor(readonly reply_markup: T) {}

	selective<T extends tg.ForceReply | tg.ReplyKeyboardMarkup>(this: Markup<T>, value = true) {
		return new Markup<T>({ ...this.reply_markup, selective: value });
	}

	placeholder<T extends tg.ForceReply | tg.ReplyKeyboardMarkup>(this: Markup<T>, placeholder: string) {
		return new Markup<T>({ ...this.reply_markup, input_field_placeholder: placeholder });
	}

	resize(this: Markup<tg.ReplyKeyboardMarkup>, value = true) {
		return new Markup<tg.ReplyKeyboardMarkup>({ ...this.reply_markup, resize_keyboard: value });
	}

	oneTime(this: Markup<tg.ReplyKeyboardMarkup>, value = true) {
		return new Markup<tg.ReplyKeyboardMarkup>({ ...this.reply_markup, one_time_keyboard: value });
	}

	persistent(this: Markup<tg.ReplyKeyboardMarkup>, value = true) {
		return new Markup<tg.ReplyKeyboardMarkup>({ ...this.reply_markup, is_persistent: value });
	}
}

export function removeKeyboard(): Markup<tg.ReplyKeyboardRemove> {
	return new Markup<tg.ReplyKeyboardRemove>({ remove_keyboard: true });
}

export function forceReply(): Markup<tg.ForceReply> {
	return new Markup<tg.ForceReply>({ force_reply: true });
}

export function keyboard(buttons: HideableKBtn[][]): Markup<tg.ReplyKeyboardMarkup> {
	return new Markup<tg.ReplyKeyboardMarkup>({ keyboard: buttons.map(row => row.filter(b => !b.hide)) });
}

export function inlineKeyboard(buttons: HideableIKBtn[][]): Markup<tg.InlineKeyboardMarkup> {
	return new Markup<tg.InlineKeyboardMarkup>({ inline_keyboard: buttons.map(row => row.filter(b => !b.hide)) });
}

export const replyKeyboard = keyboard([
	[button.text("Berlin"), button.contactRequest("Share phone"), button.locationRequest("Share location")],
	[
		button.pollRequest("Quiz", "quiz"),
		button.userRequest("Friends", 1, { max_quantity: 3 }),
		button.botRequest("Bots", 2),
	],
	[
		button.groupRequest("Group", 3, { chat_is_forum: true }),
		button.channelRequest("Channel", 4),
		button.webApp("App", "https://example.com"),
	],
])
	.resize()
	.oneTime()
	.persistent()
	.placeholder("Pick a city")
	.selective();

export const inlineMarkup = inlineKeyboard([
	[button.url("Website", "https://example.com"), button.callback("Refresh", "refresh")],
	[button.switchToChat("Share", "berlin"), button.switchToCurrentChat("Search", "")],
	[
		button.game("Play"),
		button.pay("Pay"),
		button.login("Log in", "https://example.com/login", { request_write_access: true }),
	],
	[button.webApp("App", "https://example.com/app", true)],
]);

export const forcedReply = forceReply().placeholder("Your city").selective(false);

export const keyboardRemoved = removeKeyboard();

export type MarkupResults = Assert<
	Equal<
		[
			typeof replyKeyboard.reply_markup,
			typeof inlineMarkup.reply_markup,
			typeof forcedReply.reply_markup,
			typeof keyboardRemoved.reply_markup,
		],
		[tg.ReplyKeyboardMarkup, tg.InlineKeyboardMarkup, tg.ForceReply, tg.ReplyKeyboardRemove]
	>
>;

// core/network/client.ts and core/network/error.ts

export const WEBHOOK_REPLY_METHOD_ALLOWLIST = new Set<keyof Telegram>([
	"answerCallbackQuery",
	"answerInlineQuery",
	"deleteMessage",
	"leaveChat",
	"sendChatAction",
]);

export declare function callApi<M extends keyof Telegram>(
	method: M,
	payload: Opts<M>,
): Promise<ReturnType<Telegram[M]>>;

interface ErrorPayload {
	error_code: number;
	description: string;
	parameters?: tg.ResponseParameters;
}

export class TelegramError extends Error {
	constructor(readonly response: ErrorPayload) {
		super(`${response.error_code}: ${response.description}`);
	}

	get parameters() {
		return this.response.parameters;
	}
}

export function retryAfter(error: TelegramError) {
	return error.parameters?.retry_after;
}

export type RetryAfterResult = Assert<Equal<ReturnType<typeof retryAfter>, number | undefined>>;

const tooManyRequests: tg.ApiError = { ok: false, error_code: 429, description: "Too Many Requests" };

// A failed API response is what TelegramError wraps.
export const errorFromResponse = new TelegramError(tooManyRequests);

// core/helpers/util.ts fmtCaption

export function fmtCaption<E extends { caption?: string | FmtString }>(extra: E) {
	const { caption, ...rest } = extra;
	if (caption === undefined || typeof caption === "string") return { ...rest, caption };
	return { ...rest, caption: caption.text, caption_entities: caption.entities, parse_mode: undefined };
}

// telegram.ts

export function getUpdates(
	timeout: number,
	limit: number,
	offset: number,
	allowedUpdates: readonly UpdateType[] | undefined,
) {
	return callApi("getUpdates", { allowed_updates: allowedUpdates, limit, offset, timeout });
}

export function setWebhook(url: string, extra?: ExtraSetWebhook) {
	return callApi("setWebhook", { url, ...extra });
}

export function sendMessage(chatId: number | string, text: string, extra?: ExtraReplyMessage) {
	return callApi("sendMessage", { chat_id: chatId, text, ...extra });
}

export function sendPhoto(
	chatId: number | string,
	photo: tg.Opts<InputFile>["sendPhoto"]["photo"],
	extra: ExtraPhoto = {},
) {
	return callApi("sendPhoto", { chat_id: chatId, photo, ...fmtCaption(extra) });
}

export function sendVideoNote(chatId: number | string, videoNote: string | InputFileVideoNote, extra?: ExtraVideoNote) {
	return callApi("sendVideoNote", { chat_id: chatId, video_note: videoNote, ...extra });
}

export function sendMediaGroup(chatId: number | string, media: MediaGroup, extra?: ExtraMediaGroup) {
	return callApi("sendMediaGroup", { chat_id: chatId, media, ...extra });
}

export function sendInvoice(chatId: number | string, invoice: NewInvoiceParameters, extra?: ExtraInvoice) {
	return callApi("sendInvoice", { chat_id: chatId, ...invoice, ...extra });
}

export function setMessageReaction(
	chatId: number | string,
	messageId: number,
	reaction?: tg.ReactionType[],
	is_big?: boolean,
) {
	return callApi("setMessageReaction", { chat_id: chatId, message_id: messageId, reaction, is_big });
}

export function editMessageText(
	chatId: number | string,
	messageId: number,
	text: string,
	extra?: ExtraEditMessageText,
) {
	return callApi("editMessageText", { chat_id: chatId, message_id: messageId, text, ...extra });
}

export function answerCbQuery(callbackQueryId: string, text?: string, extra?: ExtraAnswerCbQuery) {
	return callApi("answerCallbackQuery", { text, ...extra, callback_query_id: callbackQueryId });
}

export function getChatMember(chatId: number | string, userId: number) {
	return callApi("getChatMember", { chat_id: chatId, user_id: userId });
}

export async function getFileLink(fileId: string | tg.File) {
	const file = typeof fileId === "string" ? await callApi("getFile", { file_id: fileId }) : fileId;
	return `https://api.telegram.org/file/bot<token>/${file.file_path ?? ""}`;
}

export type TelegramResults = Assert<
	Equal<
		[
			Awaited<ReturnType<typeof getUpdates>>,
			Awaited<ReturnType<typeof setWebhook>>,
			Awaited<ReturnType<typeof sendMessage>>,
			Awaited<ReturnType<typeof sendPhoto>>,
			Awaited<ReturnType<typeof sendVideoNote>>,
			Awaited<ReturnType<typeof sendInvoice>>,
			Awaited<ReturnType<typeof setMessageReaction>>,
			Awaited<ReturnType<typeof editMessageText>>,
			Awaited<ReturnType<typeof answerCbQuery>>,
			Awaited<ReturnType<typeof getChatMember>>,
			Awaited<ReturnType<typeof getFileLink>>,
		],
		[
			tg.Update[],
			true,
			tg.Message.TextMessage & tg.Message.BusinessSentMessage,
			tg.Message.PhotoMessage & tg.Message.BusinessSentMessage,
			tg.Message.VideoNoteMessage & tg.Message.BusinessSentMessage,
			tg.Message.InvoiceMessage & tg.Message.BusinessSentMessage,
			true,
			(
				| (tg.Update.Edited & tg.Message.TextMessage & tg.Message.BusinessSentMessage)
				| (tg.Update.Edited & tg.Message.RichMessageMessage & tg.Message.BusinessSentMessage)
				| true
			),
			true,
			tg.ChatMember,
			string,
		]
	>
>;

// core/helpers/formatting.ts and format.ts

export function linkOrMention(
	text: string,
	data: { type: "text_link"; url: string } | { type: "text_mention"; user: tg.User },
): tg.MessageEntity[] {
	return [Object.assign(data, { offset: 0, length: text.length })];
}

// The kinds format.ts passes to createFmt, whose parameter is `MessageEntity["type"]`.
export const formatKinds: tg.MessageEntity["type"][] = [
	"bold",
	"italic",
	"spoiler",
	"strikethrough",
	"underline",
	"blockquote",
	"code",
	"pre",
];

export const formatted: FmtString<"bold"> = {
	text: "Berlin",
	entities: [{ type: "bold", offset: 0, length: 6 }],
	parse_mode: undefined,
	__to_nest: "bold",
};

export const mention = linkOrMention("Erika", {
	type: "text_mention",
	user: { id: 1, is_bot: false, first_name: "Erika" },
});

// future.ts

export function makeReply<E extends { reply_parameters?: tg.ReplyParameters }>(msgId: number | undefined, extra?: E) {
	if (msgId)
		return {
			reply_parameters: { message_id: msgId, ...extra?.reply_parameters },
			...extra,
		};
	return extra;
}

export function reply(chatId: number, msgId: number | undefined, text: string, extra?: ExtraReplyMessage) {
	return sendMessage(chatId, text, makeReply(msgId, extra));
}

export const quoteReply = makeReply(42, {
	reply_parameters: { message_id: 42, quote: "light rain" },
	parse_mode: "HTML" as const,
});
