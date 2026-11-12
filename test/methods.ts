import type {
	ApiMethods,
	InputMedia,
	InputMediaAnimation,
	InputMediaAudio,
	InputMediaDocument,
	InputMediaPhoto,
	InputMediaVideo,
	InputSticker,
	Opts,
	Ret,
} from "../methods.ts";
// The result types of the methods are declared in the other subpaths.
import type {
	BotCommand,
	ChatAdministratorRights,
	ChatFromGetChat,
	ChatInviteLink,
	ChatMember,
	ChatMemberAdministrator,
	ChatMemberOwner,
	File,
	ForumTopic,
	UserChatBoosts,
	UserFromGetMe,
	UserProfilePhotos,
	WebhookInfo,
} from "../manage.ts";
import type {
	GameHighScore,
	InputPollOption,
	Message,
	MessageId,
	Poll,
	SentWebAppMessage,
	Sticker,
	StickerSet,
} from "../message.ts";
import type { BotDescription, BotName, BotShortDescription, MenuButton } from "../settings.ts";
import type { Update } from "../update.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

/** An upload as a client library might model it, passed as `F`. */
interface Upload {
	source: Uint8Array;
	filename?: string;
}

/** A client that uploads files. */
export declare const api: ApiMethods<Upload>;

/** A client that only refers to files by file_id or URL. */
export declare const fileIdApi: ApiMethods<never>;

const upload: Upload = { source: new Uint8Array([0xff, 0xd8, 0xff]), filename: "skyline.jpg" };
const chat_id = -1001234567890;
const keyboard = { inline_keyboard: [[{ text: "Refresh", callback_data: "refresh" }]] };

// Opts and Ret

// A method without parameters takes an empty object.
export type OptsWithoutParameters = Assert<Equal<[Opts<Upload>["getMe"], Opts<Upload>["logOut"]], [{}, {}]>>;

export type OptsOptionalParameters = Assert<
	Equal<
		[Opts<Upload>["getUpdates"]["timeout"], Opts<Upload>["deleteWebhook"]["drop_pending_updates"]],
		[number | undefined, boolean | undefined]
	>
>;

export type OptsFileFields = Assert<
	Equal<
		[
			Opts<Upload>["sendPhoto"]["photo"],
			Opts<never>["sendPhoto"]["photo"],
			Opts<Upload>["sendDocument"]["thumbnail"],
			Opts<Upload>["setChatPhoto"]["photo"],
			Opts<never>["setChatPhoto"]["photo"],
			Opts<Upload>["setWebhook"]["certificate"],
			Opts<Upload>["setStickerSetThumbnail"]["thumbnail"],
			Opts<Upload>["sendMediaGroup"]["media"],
			Opts<Upload>["editMessageMedia"]["media"],
		],
		[
			Upload | string,
			string,
			Upload | undefined,
			Upload,
			never,
			Upload | undefined,
			Upload | string | undefined,
			ReadonlyArray<
				InputMediaAudio<Upload> | InputMediaDocument<Upload> | InputMediaPhoto<Upload> | InputMediaVideo<Upload>
			>,
			InputMedia<Upload>,
		]
	>
>;

export type OptsFields = Assert<
	Equal<
		[
			Opts<Upload>["sendMessage"]["chat_id"],
			Opts<Upload>["sendMessage"]["text"],
			Opts<Upload>["sendGame"]["chat_id"],
			Opts<Upload>["setChatMenuButton"]["chat_id"],
			Opts<Upload>["sendChatAction"]["action"],
			Opts<Upload>["createForumTopic"]["icon_color"],
			Opts<Upload>["uploadStickerFile"]["sticker_format"],
			Opts<Upload>["sendPoll"]["options"],
		],
		[
			number | string,
			string,
			number | string,
			number | undefined,
			(
				| "typing"
				| "upload_photo"
				| "record_video"
				| "upload_video"
				| "record_voice"
				| "upload_voice"
				| "upload_document"
				| "choose_sticker"
				| "find_location"
				| "record_video_note"
				| "upload_video_note"
			),
			0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f | undefined,
			"static" | "animated" | "video",
			readonly InputPollOption<Upload>[],
		]
	>
>;

export type AllowedUpdates = Assert<
	Equal<
		NonNullable<Opts<Upload>["getUpdates"]["allowed_updates"]>,
		ReadonlyArray<
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
	>
>;

export type RetByKey = Assert<
	Equal<
		[
			Ret<Upload>["getMe"],
			Ret<Upload>["sendMessage"],
			Ret<never>["sendPhoto"],
			Ret<Upload>["getChat"],
			Ret<Upload>["editMessageText"],
			Ret<Upload>["sendMediaGroup"],
			Ret<Upload>["exportChatInviteLink"],
			Ret<Upload>["getChatMemberCount"],
		],
		[
			UserFromGetMe,
			Message.TextMessage,
			Message.PhotoMessage,
			ChatFromGetChat,
			(Update.Edited & Message.TextMessage) | true,
			(Message.AudioMessage | Message.DocumentMessage | Message.PhotoMessage | Message.VideoMessage)[],
			string,
			number,
		]
	>
>;

// The deprecated aliases are the same methods under their old names.
export type DeprecatedAliases = Assert<
	Equal<
		[ApiMethods<Upload>["kickChatMember"], ApiMethods<Upload>["getChatMembersCount"]],
		[ApiMethods<Upload>["banChatMember"], ApiMethods<Upload>["getChatMemberCount"]]
	>
>;

// Input media and stickers

export const inputPhoto: InputMediaPhoto<Upload> = {
	type: "photo",
	media: upload,
	caption: "<b>Skyline</b>",
	parse_mode: "HTML",
	has_spoiler: true,
};

export const inputPhotoById: InputMediaPhoto<never> = { type: "photo", media: "AgACAgIAAxkBAAI" };

export const inputVideo: InputMediaVideo<Upload> = {
	type: "video",
	media: "https://example.com/forecast.mp4",
	thumbnail: upload,
	caption: "Forecast",
	width: 1280,
	height: 720,
	duration: 42,
	supports_streaming: true,
};

export const inputAnimation: InputMediaAnimation<Upload> = {
	type: "animation",
	media: upload,
	width: 320,
	height: 240,
	duration: 3,
	has_spoiler: false,
};

export const inputAudio: InputMediaAudio<Upload> = {
	type: "audio",
	media: "CQACAgIAAxkBAAI",
	caption: "Rain sounds",
	duration: 184,
	performer: "Nature",
	title: "Rain",
};

export const inputDocument: InputMediaDocument<Upload> = {
	type: "document",
	media: upload,
	caption_entities: [{ type: "bold", offset: 0, length: 6 }],
	disable_content_type_detection: true,
};

export const inputMedia: InputMedia<Upload>[] = [inputPhoto, inputVideo, inputAnimation, inputAudio, inputDocument];

export const inputSticker: InputSticker<Upload> = {
	sticker: upload,
	format: "static",
	emoji_list: ["🌧", "☔"],
	keywords: ["rain", "umbrella"],
};

export const inputMaskSticker: InputSticker<never> = {
	sticker: "CAACAgIAAxkBAAI",
	format: "static",
	emoji_list: ["😎"],
	mask_position: { point: "eyes", x_shift: 0, y_shift: 0, scale: 1 },
};

export type InputMediaType = Assert<
	Equal<InputMedia<Upload>["type"], "photo" | "video" | "animation" | "audio" | "document">
>;

export function mediaFile<F>(media: InputMedia<F>) {
	return media.media;
}

export type MediaFileResult = Assert<Equal<ReturnType<typeof mediaFile<Upload>>, Upload | string>>;

export function videoThumbnail<F>(media: InputMedia<F>) {
	if (media.type === "video") return media.thumbnail;
	return undefined;
}

export type VideoThumbnailResult = Assert<Equal<ReturnType<typeof videoThumbnail<Upload>>, Upload | undefined>>;

// @ts-expect-error — with F = never there is no upload type, only file_id and URL strings
export const inputPhotoUploadWithoutF: InputMediaPhoto<never> = { type: "photo", media: upload };

export const photoWithThumbnail: InputMediaPhoto<Upload> = {
	type: "photo",
	media: upload,
	// @ts-expect-error — photos have no thumbnail, and `type` discriminates the union
	thumbnail: upload,
};

// @ts-expect-error — a sticker needs its emoji
export const stickerWithoutEmoji: InputSticker<Upload> = { sticker: upload };

// Updates and webhooks

export const updates = api.getUpdates({
	offset: 10001,
	limit: 100,
	timeout: 30,
	allowed_updates: ["message", "callback_query", "message_reaction"],
});
export const updatesWithoutOptions = api.getUpdates();
export const webhookSet = api.setWebhook({
	url: "https://example.com/telegram",
	certificate: upload,
	ip_address: "203.0.113.10",
	max_connections: 40,
	allowed_updates: [],
	drop_pending_updates: true,
	secret_token: "s3cr3t-token",
});
export const webhookDeleted = api.deleteWebhook({ drop_pending_updates: true });
export const webhookInfo = api.getWebhookInfo();
export const me = api.getMe();
export const loggedOut = api.logOut();
export const closed = api.close();

export type UpdateResults = Assert<
	Equal<
		[
			typeof updates,
			typeof updatesWithoutOptions,
			typeof webhookSet,
			typeof webhookDeleted,
			typeof webhookInfo,
			typeof me,
			typeof loggedOut,
			typeof closed,
		],
		[Update[], Update[], true, true, WebhookInfo, UserFromGetMe, true, true]
	>
>;

// @ts-expect-error — "messages" is not an update type
export const misspelledUpdate = api.getUpdates({ allowed_updates: ["messages"] });

// @ts-expect-error — the webhook needs a URL; an empty string removes it
export const webhookWithoutUrl = api.setWebhook({ drop_pending_updates: true });

// Sending messages

export const sentText = api.sendMessage({
	chat_id,
	message_thread_id: 7,
	text: "<b>Berlin</b>: light rain",
	parse_mode: "HTML",
	link_preview_options: { is_disabled: true },
	disable_notification: true,
	protect_content: false,
	reply_parameters: { message_id: 42, allow_sending_without_reply: true },
	reply_markup: keyboard,
});
export const forwarded = api.forwardMessage({ chat_id, from_chat_id: "@weather_news", message_id: 303 });
export const forwardedMany = api.forwardMessages({
	chat_id,
	from_chat_id: "@weather_news",
	message_ids: [303, 304],
	protect_content: true,
});
export const copied = api.copyMessage({
	chat_id,
	from_chat_id: -1009876543210,
	message_id: 303,
	caption: "Copied",
	reply_markup: { remove_keyboard: true },
});
export const copiedMany = api.copyMessages({
	chat_id,
	from_chat_id: -1009876543210,
	message_ids: [303, 304],
	remove_caption: true,
});
export const sentPhoto = api.sendPhoto({ chat_id, photo: upload, caption: "Skyline", has_spoiler: true });
export const sentPhotoById = fileIdApi.sendPhoto({ chat_id, photo: "AgACAgIAAxkBAAI" });
export const sentAudio = api.sendAudio({
	chat_id,
	audio: upload,
	duration: 184,
	performer: "Nature",
	title: "Rain",
	thumbnail: upload,
});
export const sentDocument = api.sendDocument({
	chat_id,
	document: "https://example.com/report.pdf",
	thumbnail: upload,
	disable_content_type_detection: true,
});
export const sentVideo = api.sendVideo({
	chat_id,
	video: upload,
	duration: 42,
	width: 1280,
	height: 720,
	supports_streaming: true,
});
export const sentAnimation = api.sendAnimation({ chat_id, animation: "CgACAgIAAxkBAAI", has_spoiler: true });
export const sentVoice = api.sendVoice({ chat_id, voice: upload, duration: 5, caption: "Forecast" });
export const sentVideoNote = api.sendVideoNote({ chat_id, video_note: upload, length: 240, duration: 12 });
export const sentMediaGroup = api.sendMediaGroup({
	chat_id,
	media: [inputPhoto, inputVideo, { type: "photo", media: "attach://skyline" }],
	disable_notification: true,
});
export const sentLocation = api.sendLocation({
	chat_id,
	latitude: 52.52,
	longitude: 13.405,
	horizontal_accuracy: 25,
	live_period: 900,
	heading: 90,
	proximity_alert_radius: 100,
});
export const sentVenue = api.sendVenue({
	chat_id,
	latitude: 52.5163,
	longitude: 13.3777,
	title: "Brandenburger Tor",
	address: "Pariser Platz, 10117 Berlin",
	google_place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY",
});
export const sentContact = api.sendContact({
	chat_id,
	phone_number: "+4930123456",
	first_name: "Erika",
	last_name: "Mustermann",
});
export const sentPoll = api.sendPoll({
	chat_id,
	question: "Wettest month in Berlin?",
	options: [{ text: "June" }, { text: "July" }],
	type: "quiz",
	correct_option_ids: [0],
	explanation: "June has the most rain",
	explanation_parse_mode: "MarkdownV2",
	open_period: 60,
});
export const sentDice = api.sendDice({ chat_id, emoji: "🎯" });
export const sentChatAction = api.sendChatAction({ chat_id, action: "upload_photo", message_thread_id: 7 });
export const reactionSet = api.setMessageReaction({
	chat_id,
	message_id: 42,
	reaction: [{ type: "emoji", emoji: "👍" }],
	is_big: true,
});
export const sentSticker = api.sendSticker({ chat_id, sticker: "CAACAgIAAxkBAAI", emoji: "🌧" });
export const sentInvoice = api.sendInvoice({
	chat_id,
	title: "Umbrella",
	description: "Stays dry in Berlin",
	payload: "umbrella-1",
	provider_token: "284685063:TEST:abc",
	currency: "EUR",
	prices: [{ label: "Umbrella", amount: 1999 }],
	max_tip_amount: 500,
	suggested_tip_amounts: [100, 200],
	need_shipping_address: true,
	is_flexible: true,
});
export const sentGame = api.sendGame({ chat_id: 123456789, game_short_name: "snake", reply_markup: keyboard });

export type SendResults = Assert<
	Equal<
		[
			typeof sentText,
			typeof forwarded,
			typeof forwardedMany,
			typeof copied,
			typeof copiedMany,
			typeof sentPhoto,
			typeof sentPhotoById,
			typeof sentAudio,
			typeof sentDocument,
			typeof sentVideo,
			typeof sentAnimation,
			typeof sentVoice,
			typeof sentVideoNote,
			typeof sentMediaGroup,
			typeof sentLocation,
			typeof sentVenue,
			typeof sentContact,
			typeof sentPoll,
			typeof sentDice,
			typeof sentChatAction,
			typeof reactionSet,
			typeof sentSticker,
			typeof sentInvoice,
			typeof sentGame,
		],
		[
			Message.TextMessage,
			Message,
			MessageId[],
			MessageId,
			MessageId[],
			Message.PhotoMessage,
			Message.PhotoMessage,
			Message.AudioMessage,
			Message.DocumentMessage,
			Message.VideoMessage,
			Message.AnimationMessage,
			Message.VoiceMessage,
			Message.VideoNoteMessage,
			(Message.AudioMessage | Message.DocumentMessage | Message.PhotoMessage | Message.VideoMessage)[],
			Message.LocationMessage,
			Message.VenueMessage,
			Message.ContactMessage,
			Message.PollMessage,
			Message.DiceMessage,
			true,
			true,
			Message.StickerMessage,
			Message.InvoiceMessage,
			Message.GameMessage,
		]
	>
>;

// @ts-expect-error — every send names its chat
export const sentWithoutChat = api.sendMessage({ text: "Hi" });

// @ts-expect-error — with F = never there is no upload type, only file_id and URL strings
export const uploadWithoutF = fileIdApi.sendPhoto({ chat_id, photo: upload });

// @ts-expect-error — "sleeping" is not a chat action
export const unknownChatAction = api.sendChatAction({ chat_id, action: "sleeping" });

export const surveyPoll = api.sendPoll({
	chat_id,
	question: "?",
	options: [{ text: "a" }, { text: "b" }],
	// @ts-expect-error — "survey" is not a poll type
	type: "survey",
});

// A game can be sent to a chat named by its username
export const gameToUsername = api.sendGame({ chat_id: "@erika", game_short_name: "snake" });

export const mediaGroupWithAnimation = api.sendMediaGroup({
	chat_id,
	// @ts-expect-error — animations can't be part of an album
	media: [inputPhoto, inputAnimation],
});

export const reactionWithUnknownEmoji = api.setMessageReaction({
	chat_id,
	message_id: 42,
	// @ts-expect-error — only the emoji Telegram lists can be reactions
	reaction: [{ type: "emoji", emoji: "like" }],
});

// Editing messages

export const editedText = api.editMessageText({ chat_id, message_id: 42, text: "Heavy rain", parse_mode: "HTML" });
export const editedInlineText = api.editMessageText({ inline_message_id: "AgAAAPx", text: "Heavy rain" });
export const editedCaption = api.editMessageCaption({ chat_id, message_id: 43, caption: "New caption" });
export const editedMedia = api.editMessageMedia({ chat_id, message_id: 43, media: inputPhoto, reply_markup: keyboard });
export const editedMarkup = api.editMessageReplyMarkup({ inline_message_id: "AgAAAPx", reply_markup: keyboard });
export const editedLiveLocation = api.editMessageLiveLocation({
	chat_id,
	message_id: 44,
	latitude: 52.53,
	longitude: 13.41,
	heading: 180,
});
export const stoppedLiveLocation = api.stopMessageLiveLocation({ chat_id, message_id: 44 });
export const stoppedPoll = api.stopPoll({ chat_id, message_id: 45, reply_markup: keyboard });
export const deletedMessage = api.deleteMessage({ chat_id, message_id: 46 });
export const deletedMessages = api.deleteMessages({ chat_id, message_ids: [46, 47, 48] });

export type EditResults = Assert<
	Equal<
		[
			typeof editedText,
			typeof editedInlineText,
			typeof editedCaption,
			typeof editedMedia,
			typeof editedMarkup,
			typeof editedLiveLocation,
			typeof stoppedLiveLocation,
			typeof stoppedPoll,
			typeof deletedMessage,
			typeof deletedMessages,
		],
		[
			(Update.Edited & Message.TextMessage) | true,
			(Update.Edited & Message.TextMessage) | true,
			(Update.Edited & Message.CaptionableMessage) | true,
			(Update.Edited & Message) | true,
			(Update.Edited & Message) | true,
			(Update.Edited & Message.LocationMessage) | true,
			(Update.Edited & Message.LocationMessage) | true,
			Poll,
			true,
			true,
		]
	>
>;

export function editedTextOf(result: typeof editedText) {
	if (result === true) return undefined;
	return result.edit_date;
}

export type EditedTextOfResult = Assert<Equal<ReturnType<typeof editedTextOf>, number | undefined>>;

// @ts-expect-error — the new text is required
export const editWithoutText = api.editMessageText({ chat_id, message_id: 42 });

// Files and profile photos

export const profilePhotos = api.getUserProfilePhotos({ user_id: 123456789, offset: 0, limit: 10 });
export const file = api.getFile({ file_id: "BQACAgIAAxkBAAI" });

export type FileResults = Assert<Equal<[typeof profilePhotos, typeof file], [UserProfilePhotos, File]>>;

// Chat administration

export const kicked = api.kickChatMember({ chat_id, user_id: 234567890 });
export const banned = api.banChatMember({ chat_id, user_id: 234567890, until_date: 0, revoke_messages: true });
export const unbanned = api.unbanChatMember({ chat_id, user_id: 234567890, only_if_banned: true });
export const restricted = api.restrictChatMember({
	chat_id,
	user_id: 234567890,
	permissions: { can_send_messages: true, can_send_photos: false },
	use_independent_chat_permissions: true,
	until_date: 1735689600,
});
export const promoted = api.promoteChatMember({
	chat_id,
	user_id: 234567890,
	can_manage_chat: true,
	can_delete_messages: true,
	can_post_stories: true,
	can_manage_topics: true,
});
export const titleSet = api.setChatAdministratorCustomTitle({ chat_id, user_id: 234567890, custom_title: "Moderator" });
export const senderChatBanned = api.banChatSenderChat({ chat_id, sender_chat_id: -1005555555555 });
export const senderChatUnbanned = api.unbanChatSenderChat({ chat_id, sender_chat_id: -1005555555555 });
export const permissionsSet = api.setChatPermissions({ chat_id, permissions: { can_send_polls: false } });
export const exportedLink = api.exportChatInviteLink({ chat_id });
export const createdLink = api.createChatInviteLink({ chat_id, name: "Newsletter", creates_join_request: true });
export const editedLink = api.editChatInviteLink({
	chat_id,
	invite_link: "https://t.me/+AbCdEfGhIjK",
	member_limit: 100,
});
export const revokedLink = api.revokeChatInviteLink({ chat_id, invite_link: "https://t.me/+AbCdEfGhIjK" });
export const joinApproved = api.approveChatJoinRequest({ chat_id, user_id: 234567890 });
export const joinDeclined = api.declineChatJoinRequest({ chat_id, user_id: 234567890 });
export const photoSet = api.setChatPhoto({ chat_id, photo: upload });
export const photoDeleted = api.deleteChatPhoto({ chat_id });
export const chatTitleSet = api.setChatTitle({ chat_id, title: "Rain fans" });
export const descriptionSet = api.setChatDescription({ chat_id, description: "Talk about the weather" });
export const pinned = api.pinChatMessage({ chat_id, message_id: 42, disable_notification: true });
export const unpinned = api.unpinChatMessage({ chat_id, message_id: 42 });
export const allUnpinned = api.unpinAllChatMessages({ chat_id });
export const left = api.leaveChat({ chat_id });
export const fetchedChat = api.getChat({ chat_id: "@weather_fans" });
export const administrators = api.getChatAdministrators({ chat_id });
export const memberCountDeprecated = api.getChatMembersCount({ chat_id });
export const memberCount = api.getChatMemberCount({ chat_id });
export const member = api.getChatMember({ chat_id, user_id: 234567890 });
export const stickerSetSet = api.setChatStickerSet({ chat_id, sticker_set_name: "weather_stickers" });
export const stickerSetDeleted = api.deleteChatStickerSet({ chat_id });
export const boosts = api.getUserChatBoosts({ chat_id, user_id: 234567890 });

export type AdministrationResults = Assert<
	Equal<
		[
			typeof kicked,
			typeof banned,
			typeof unbanned,
			typeof restricted,
			typeof promoted,
			typeof titleSet,
			typeof senderChatBanned,
			typeof senderChatUnbanned,
			typeof permissionsSet,
			typeof exportedLink,
			typeof createdLink,
			typeof editedLink,
			typeof revokedLink,
			typeof joinApproved,
			typeof joinDeclined,
			typeof photoSet,
			typeof photoDeleted,
			typeof chatTitleSet,
			typeof descriptionSet,
			typeof pinned,
			typeof unpinned,
			typeof allUnpinned,
			typeof left,
			typeof fetchedChat,
			typeof administrators,
			typeof memberCountDeprecated,
			typeof memberCount,
			typeof member,
			typeof stickerSetSet,
			typeof stickerSetDeleted,
			typeof boosts,
		],
		[
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			string,
			ChatInviteLink,
			ChatInviteLink,
			ChatInviteLink,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			ChatFromGetChat,
			(ChatMemberOwner | ChatMemberAdministrator)[],
			number,
			number,
			ChatMember,
			true,
			true,
			UserChatBoosts[],
		]
	>
>;

// @ts-expect-error — restricting a member needs the new permissions
export const restrictWithoutPermissions = api.restrictChatMember({ chat_id, user_id: 234567890 });

// @ts-expect-error — with F = never there is no upload type, and a chat photo can't be a file_id
export const chatPhotoById = fileIdApi.setChatPhoto({ chat_id, photo: "AgACAgIAAxkBAAI" });

// Forum topics

export const topicIcons = api.getForumTopicIconStickers();
export const topic = api.createForumTopic({ chat_id, name: "Forecasts", icon_color: 0x6fb9f0 });
export const topicEdited = api.editForumTopic({ chat_id, message_thread_id: 7, name: "Daily forecasts" });
export const topicClosed = api.closeForumTopic({ chat_id, message_thread_id: 7 });
export const topicReopened = api.reopenForumTopic({ chat_id, message_thread_id: 7 });
export const topicDeleted = api.deleteForumTopic({ chat_id, message_thread_id: 7 });
export const topicUnpinned = api.unpinAllForumTopicMessages({ chat_id, message_thread_id: 7 });
export const generalEdited = api.editGeneralForumTopic({ chat_id, name: "Lobby" });
export const generalClosed = api.closeGeneralForumTopic({ chat_id });
export const generalReopened = api.reopenGeneralForumTopic({ chat_id });
export const generalHidden = api.hideGeneralForumTopic({ chat_id });
export const generalUnhidden = api.unhideGeneralForumTopic({ chat_id });
export const generalUnpinned = api.unpinAllGeneralForumTopicMessages({ chat_id });

export type ForumResults = Assert<
	Equal<
		[
			typeof topicIcons,
			typeof topic,
			typeof topicEdited,
			typeof topicClosed,
			typeof topicReopened,
			typeof topicDeleted,
			typeof topicUnpinned,
			typeof generalEdited,
			typeof generalClosed,
			typeof generalReopened,
			typeof generalHidden,
			typeof generalUnhidden,
			typeof generalUnpinned,
		],
		[Sticker[], ForumTopic, true, true, true, true, true, true, true, true, true, true, true]
	>
>;

// @ts-expect-error — topic icons come in six colors only
export const topicInRed = api.createForumTopic({ chat_id, name: "Alerts", icon_color: 0xff0000 });

// Bot settings

export const callbackAnswered = api.answerCallbackQuery({
	callback_query_id: "4382bfdwdsb323b2d9",
	text: "Refreshed",
	show_alert: false,
	cache_time: 5,
});
export const nameSet = api.setMyName({ name: "Wetter Bot", language_code: "de" });
export const name = api.getMyName({ language_code: "de" });
export const commandsSet = api.setMyCommands({
	commands: [{ command: "forecast", description: "Forecast for a city" }],
	scope: { type: "all_private_chats" },
	language_code: "en",
});
export const commandsDeleted = api.deleteMyCommands({ scope: { type: "chat", chat_id } });
export const commands = api.getMyCommands({ scope: { type: "default" } });
export const descriptionOfBotSet = api.setMyDescription({ description: "Sends the forecast for any city." });
export const description = api.getMyDescription({});
export const shortDescriptionSet = api.setMyShortDescription({ short_description: "Forecasts" });
export const shortDescription = api.getMyShortDescription({ language_code: "" });
export const menuButtonSet = api.setChatMenuButton({
	chat_id: 123456789,
	menu_button: { type: "web_app", text: "Map", web_app: { url: "https://example.com/map" } },
});
export const menuButton = api.getChatMenuButton({ chat_id: 123456789 });
export const rightsSet = api.setMyDefaultAdministratorRights({
	rights: {
		is_anonymous: false,
		can_manage_chat: true,
		can_delete_messages: true,
		can_manage_video_chats: false,
		can_restrict_members: false,
		can_promote_members: false,
		can_change_info: false,
		can_invite_users: true,
		can_post_stories: false,
		can_edit_stories: false,
		can_delete_stories: false,
	},
	for_channels: false,
});
export const rights = api.getMyDefaultAdministratorRights({ for_channels: true });

export type SettingsResults = Assert<
	Equal<
		[
			typeof callbackAnswered,
			typeof nameSet,
			typeof name,
			typeof commandsSet,
			typeof commandsDeleted,
			typeof commands,
			typeof descriptionOfBotSet,
			typeof description,
			typeof shortDescriptionSet,
			typeof shortDescription,
			typeof menuButtonSet,
			typeof menuButton,
			typeof rightsSet,
			typeof rights,
		],
		[
			true,
			true,
			BotName,
			true,
			true,
			BotCommand[],
			true,
			BotDescription,
			true,
			BotShortDescription,
			true,
			MenuButton,
			true,
			ChatAdministratorRights,
		]
	>
>;

// @ts-expect-error — the callback query to answer is required
export const answerWithoutQuery = api.answerCallbackQuery({ text: "Done" });

// @ts-expect-error — "everyone" is not a command scope
export const commandsForEveryone = api.setMyCommands({ commands: [], scope: { type: "everyone" } });

// Stickers

export const stickerSet = api.getStickerSet({ name: "weather_stickers" });
export const customEmoji = api.getCustomEmojiStickers({ custom_emoji_ids: ["5368324170671202286"] });
export const uploadedSticker = api.uploadStickerFile({ user_id: 123456789, sticker_format: "static", sticker: upload });
export const createdStickerSet = api.createNewStickerSet({
	user_id: 123456789,
	name: "weather_by_weather_bot",
	title: "Weather",
	stickers: [inputSticker],
	sticker_type: "regular",
});
export const stickerAdded = api.addStickerToSet({
	user_id: 123456789,
	name: "weather_by_weather_bot",
	sticker: inputSticker,
});
export const stickerMoved = api.setStickerPositionInSet({ sticker: "CAACAgIAAxkBAAI", position: 0 });
export const stickerDeleted = api.deleteStickerFromSet({ sticker: "CAACAgIAAxkBAAI" });
export const emojiListSet = api.setStickerEmojiList({ sticker: "CAACAgIAAxkBAAI", emoji_list: ["☔"] });
export const keywordsSet = api.setStickerKeywords({ sticker: "CAACAgIAAxkBAAI", keywords: ["umbrella"] });
export const maskPositionSet = api.setStickerMaskPosition({
	sticker: "CAACAgIAAxkBAAI",
	mask_position: { point: "forehead", x_shift: 0, y_shift: 0.2, scale: 1 },
});
export const stickerSetTitleSet = api.setStickerSetTitle({ name: "weather_by_weather_bot", title: "Rain" });
export const stickerSetDeletedByBot = api.deleteStickerSet({ name: "weather_by_weather_bot" });
export const stickerSetThumbnailSet = api.setStickerSetThumbnail({
	name: "weather_by_weather_bot",
	user_id: 123456789,
	thumbnail: upload,
});
export const customEmojiThumbnailSet = api.setCustomEmojiStickerSetThumbnail({
	name: "weather_emoji_by_weather_bot",
	custom_emoji_id: "",
});

export type StickerResults = Assert<
	Equal<
		[
			typeof stickerSet,
			typeof customEmoji,
			typeof uploadedSticker,
			typeof createdStickerSet,
			typeof stickerAdded,
			typeof stickerMoved,
			typeof stickerDeleted,
			typeof emojiListSet,
			typeof keywordsSet,
			typeof maskPositionSet,
			typeof stickerSetTitleSet,
			typeof stickerSetDeletedByBot,
			typeof stickerSetThumbnailSet,
			typeof customEmojiThumbnailSet,
		],
		[StickerSet, Sticker[], File, true, true, true, true, true, true, true, true, true, true, true]
	>
>;

// @ts-expect-error — "gif" is not a sticker format
export const gifSticker = api.uploadStickerFile({ user_id: 123456789, sticker_format: "gif", sticker: upload });

// Inline mode and Web Apps

export const inlineAnswered = api.answerInlineQuery({
	inline_query_id: "1234567890123456789",
	results: [
		{
			type: "article",
			id: "berlin-today",
			title: "Berlin today",
			input_message_content: { message_text: "Berlin: 12°C, light rain" },
		},
	],
	cache_time: 60,
	is_personal: true,
	next_offset: "20",
	button: { text: "Connect your account", start_parameter: "connect" },
});
export const webAppAnswered = api.answerWebAppQuery({
	web_app_query_id: "AAHdF6IQAAAAAN0XohDhrOrc",
	result: { type: "article", id: "pick", title: "Berlin", input_message_content: { message_text: "Berlin" } },
});

export type InlineResults = Assert<Equal<[typeof inlineAnswered, typeof webAppAnswered], [true, SentWebAppMessage]>>;

// Payments

export const invoiceLink = api.createInvoiceLink({
	title: "Umbrella",
	description: "Stays dry in Berlin",
	payload: "umbrella-1",
	provider_token: "284685063:TEST:abc",
	currency: "EUR",
	prices: [{ label: "Umbrella", amount: 1999 }],
});
export const shippingAnswered = api.answerShippingQuery({
	shipping_query_id: "8329742398",
	ok: true,
	shipping_options: [{ id: "dhl", title: "DHL", prices: [{ label: "Shipping", amount: 499 }] }],
});
export const shippingRefused = api.answerShippingQuery({
	shipping_query_id: "8329742398",
	ok: false,
	error_message: "We don't ship to your country",
});
export const preCheckoutAnswered = api.answerPreCheckoutQuery({ pre_checkout_query_id: "8329742399", ok: true });

export type PaymentResults = Assert<
	Equal<
		[typeof invoiceLink, typeof shippingAnswered, typeof shippingRefused, typeof preCheckoutAnswered],
		[string, true, true, true]
	>
>;

// @ts-expect-error — an invoice needs its prices
export const invoiceWithoutPrices = api.createInvoiceLink({
	title: "U",
	description: "D",
	payload: "p",
	provider_token: "t",
	currency: "EUR",
});

// Passport

export const passportErrorsSet = api.setPassportDataErrors({
	user_id: 123456789,
	errors: [
		{
			source: "front_side",
			type: "passport",
			file_hash: "ZnJvbnQ=",
			message: "The scan is blurry",
		},
	],
});

export type PassportResults = Assert<Equal<typeof passportErrorsSet, true>>;

// Games

export const scoreSet = api.setGameScore({ user_id: 123456789, score: 120, chat_id: 123456789, message_id: 50 });
export const inlineScoreSet = api.setGameScore({
	user_id: 123456789,
	score: 130,
	force: true,
	inline_message_id: "AgAAAPx",
});
export const highScores = api.getGameHighScores({ user_id: 123456789, chat_id: 123456789, message_id: 50 });

export type GameResults = Assert<
	Equal<
		[typeof scoreSet, typeof inlineScoreSet, typeof highScores],
		[(Update.Edited & Message.GameMessage) | true, (Update.Edited & Message.GameMessage) | true, GameHighScore[]]
	>
>;

// Required arguments only

// The calls above pass optional arguments, which hides an optional parameter becoming required.
export function callWithRequiredArguments() {
	api.setWebhook({ url: "https://example.com/telegram" });
	api.deleteWebhook({});
	api.sendMessage({ chat_id, text: "Hi" });
	api.forwardMessage({ chat_id, from_chat_id: chat_id, message_id: 1 });
	api.forwardMessages({ chat_id, from_chat_id: chat_id, message_ids: [1] });
	api.copyMessage({ chat_id, from_chat_id: chat_id, message_id: 1 });
	api.copyMessages({ chat_id, from_chat_id: chat_id, message_ids: [1] });
	api.sendPhoto({ chat_id, photo: "AgACAgIAAxkBAAI" });
	api.sendAudio({ chat_id, audio: "CQACAgIAAxkBAAI" });
	api.sendDocument({ chat_id, document: "BQACAgIAAxkBAAI" });
	api.sendVideo({ chat_id, video: "BAACAgIAAxkBAAI" });
	api.sendAnimation({ chat_id, animation: "CgACAgIAAxkBAAI" });
	api.sendVoice({ chat_id, voice: "AwACAgIAAxkBAAI" });
	api.sendVideoNote({ chat_id, video_note: "DQACAgIAAxkBAAI" });
	api.sendMediaGroup({ chat_id, media: [inputPhotoById, inputPhotoById] });
	api.sendLocation({ chat_id, latitude: 52.52, longitude: 13.405 });
	api.editMessageLiveLocation({ inline_message_id: "AgAAAPx", latitude: 52.52, longitude: 13.405 });
	api.stopMessageLiveLocation({ inline_message_id: "AgAAAPx" });
	api.sendVenue({ chat_id, latitude: 52.52, longitude: 13.405, title: "Berlin", address: "Berlin" });
	api.sendContact({ chat_id, phone_number: "+4930123456", first_name: "Erika" });
	api.sendPoll({ chat_id, question: "Rain?", options: [{ text: "Yes" }, { text: "No" }] });
	api.sendDice({ chat_id });
	api.sendChatAction({ chat_id, action: "typing" });
	api.setMessageReaction({ chat_id, message_id: 1 });
	api.getUserProfilePhotos({ user_id: 123456789 });
	api.banChatMember({ chat_id, user_id: 234567890 });
	api.unbanChatMember({ chat_id, user_id: 234567890 });
	api.restrictChatMember({ chat_id, user_id: 234567890, permissions: {} });
	api.promoteChatMember({ chat_id, user_id: 234567890 });
	api.setChatPermissions({ chat_id, permissions: {} });
	api.createChatInviteLink({ chat_id });
	api.editChatInviteLink({ chat_id, invite_link: "https://t.me/+AbCdEfGhIjK" });
	api.setChatDescription({ chat_id });
	api.pinChatMessage({ chat_id, message_id: 1 });
	api.unpinChatMessage({ chat_id });
	api.createForumTopic({ chat_id, name: "Forecasts" });
	api.editForumTopic({ chat_id, message_thread_id: 7 });
	api.answerCallbackQuery({ callback_query_id: "4382bfdwdsb323b2d9" });
	api.setMyName({});
	api.getMyName({});
	api.setMyCommands({ commands: [] });
	api.deleteMyCommands({});
	api.getMyCommands({});
	api.setMyDescription({});
	api.setMyShortDescription({});
	api.getMyShortDescription({});
	api.setChatMenuButton({});
	api.getChatMenuButton({});
	api.setMyDefaultAdministratorRights({});
	api.getMyDefaultAdministratorRights({});
	api.editMessageText({ inline_message_id: "AgAAAPx", text: "Hi" });
	api.editMessageCaption({ inline_message_id: "AgAAAPx" });
	api.editMessageMedia({ inline_message_id: "AgAAAPx", media: inputPhotoById });
	api.editMessageReplyMarkup({ inline_message_id: "AgAAAPx" });
	api.stopPoll({ chat_id, message_id: 45 });
	api.sendSticker({ chat_id, sticker: "CAACAgIAAxkBAAI" });
	api.createNewStickerSet({
		user_id: 123456789,
		name: "weather_by_weather_bot",
		title: "Weather",
		stickers: [inputMaskSticker],
	});
	api.setStickerKeywords({ sticker: "CAACAgIAAxkBAAI" });
	api.setStickerMaskPosition({ sticker: "CAACAgIAAxkBAAI" });
	api.setStickerSetThumbnail({ name: "weather_by_weather_bot", user_id: 123456789 });
	api.setCustomEmojiStickerSetThumbnail({ name: "weather_emoji_by_weather_bot" });
	api.answerInlineQuery({ inline_query_id: "1234567890123456789", results: [] });
	api.sendInvoice({
		chat_id,
		title: "Umbrella",
		description: "Stays dry",
		payload: "umbrella-1",
		provider_token: "284685063:TEST:abc",
		currency: "EUR",
		prices: [{ label: "Umbrella", amount: 1999 }],
	});
	api.createInvoiceLink({
		title: "Umbrella",
		description: "Stays dry",
		payload: "umbrella-1",
		provider_token: "284685063:TEST:abc",
		currency: "EUR",
		prices: [{ label: "Umbrella", amount: 1999 }],
	});
	api.answerShippingQuery({ shipping_query_id: "8329742398", ok: true });
	api.answerPreCheckoutQuery({ pre_checkout_query_id: "8329742399", ok: false });
	api.sendGame({ chat_id: 123456789, game_short_name: "snake" });
	api.setGameScore({ user_id: 123456789, score: 120, inline_message_id: "AgAAAPx" });
	api.getGameHighScores({ user_id: 123456789, inline_message_id: "AgAAAPx" });
}

// Required fields

export type InputMediaAnimationRequiredFields = Assert<
	Extends<"media" | "type", RequiredKeys<InputMediaAnimation<Upload>>>
>;
export type InputMediaAudioRequiredFields = Assert<Extends<"media" | "type", RequiredKeys<InputMediaAudio<Upload>>>>;
export type InputMediaDocumentRequiredFields = Assert<
	Extends<"media" | "type", RequiredKeys<InputMediaDocument<Upload>>>
>;
export type InputMediaPhotoRequiredFields = Assert<Extends<"media" | "type", RequiredKeys<InputMediaPhoto<Upload>>>>;
export type InputMediaVideoRequiredFields = Assert<Extends<"media" | "type", RequiredKeys<InputMediaVideo<Upload>>>>;
export type InputStickerRequiredFields = Assert<Extends<"emoji_list" | "sticker", RequiredKeys<InputSticker<Upload>>>>;
