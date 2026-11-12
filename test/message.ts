import type {
	AbstractExternalReply,
	AbstractExternalReplyMedia,
	AbstractMessageOrigin,
	Animation,
	Audio,
	ChatBoostAdded,
	ChatShared,
	CommonMessageBundle,
	Contact,
	Dice,
	Document,
	ExternalReplyAnimation,
	ExternalReplyAudio,
	ExternalReplyContact,
	ExternalReplyDice,
	ExternalReplyDocument,
	ExternalReplyGame,
	ExternalReplyGiveaway,
	ExternalReplyGiveawayWinners,
	ExternalReplyInfo,
	ExternalReplyInvoice,
	ExternalReplyLocation,
	ExternalReplyPhoto,
	ExternalReplyPoll,
	ExternalReplySticker,
	ExternalReplyStory,
	ExternalReplyVenue,
	ExternalReplyVideo,
	ExternalReplyVideoNote,
	ExternalReplyVoice,
	ForumTopicClosed,
	ForumTopicCreated,
	ForumTopicEdited,
	ForumTopicReopened,
	Game,
	GameHighScore,
	GeneralForumTopicHidden,
	GeneralForumTopicUnhidden,
	Giveaway,
	GiveawayCompleted,
	GiveawayCreated,
	GiveawayWinners,
	InaccessibleMessage,
	LinkPreviewOptions,
	Location,
	MaskPosition,
	MaybeInaccessibleMessage,
	Message,
	MessageAutoDeleteTimerChanged,
	MessageEntity,
	MessageId,
	MessageOriginChannel,
	MessageOriginChat,
	MessageOriginHiddenUser,
	MessageOriginUser,
	ParseMode,
	PhotoSize,
	Poll,
	PollAnswer,
	PollOption,
	ProximityAlertTriggered,
	ReplyParameters,
	SentWebAppMessage,
	ServiceMessageBundle,
	SharedUser,
	Sticker,
	StickerSet,
	Story,
	TextQuote,
	UsersShared,
	Venue,
	Video,
	VideoChatEnded,
	VideoChatParticipantsInvited,
	VideoChatScheduled,
	VideoChatStarted,
	VideoNote,
	Voice,
	WebAppData,
	WriteAccessAllowed,
} from "../message.ts";
import { type Assert, type Equal, expectType, type Extends, type RequiredKeys } from "./assert.ts";

// The chat and user types live in `manage`; `message` reaches them through its own fields.
type Chat = Message["chat"];
type User = NonNullable<Message["from"]>;

const user: User = { id: 123456789, is_bot: false, first_name: "Erika", username: "erika" };
const otherUser: User = { id: 234567890, is_bot: false, first_name: "Max" };
const privateChat: Chat = { id: 123456789, type: "private", first_name: "Erika", username: "erika" };
const supergroup: Chat = { id: -1001234567890, type: "supergroup", title: "Weather fans", is_forum: true };
const channel: Chat = { id: -1009876543210, type: "channel", title: "Weather news", username: "weather_news" };
const inPrivate = { message_id: 101, date: 1709251200, chat: privateChat, from: user };
const inGroup = { message_id: 202, date: 1709251200, chat: supergroup, from: user, message_thread_id: 7 };

// Files

export const photoSizes: PhotoSize[] = [
	{ file_id: "AgACAgIAAxkBAAIs", file_unique_id: "AQADs", width: 90, height: 51, file_size: 1301 },
	{ file_id: "AgACAgIAAxkBAAIm", file_unique_id: "AQADm", width: 320, height: 180, file_size: 15674 },
	{ file_id: "AgACAgIAAxkBAAIx", file_unique_id: "AQADx", width: 1280, height: 720 },
];

const thumbnail = photoSizes[0];

export const animation: Animation = {
	file_id: "CgACAgIAAxkBAAI",
	file_unique_id: "AgADCg",
	width: 320,
	height: 240,
	duration: 3,
	thumbnail,
	file_name: "rain.mp4",
	mime_type: "video/mp4",
	file_size: 52411,
};

export const audio: Audio = {
	file_id: "CQACAgIAAxkBAAI",
	file_unique_id: "AgADCQ",
	duration: 184,
	performer: "Nature",
	title: "Rain",
	file_name: "rain.mp3",
	mime_type: "audio/mpeg",
	file_size: 2949120,
	thumbnail,
};

export const document: Document = {
	file_id: "BQACAgIAAxkBAAI",
	file_unique_id: "AgADBQ",
	thumbnail,
	file_name: "report.pdf",
	mime_type: "application/pdf",
	file_size: 102400,
};

export const video: Video = {
	file_id: "BAACAgIAAxkBAAI",
	file_unique_id: "AgADBA",
	width: 1280,
	height: 720,
	duration: 42,
	thumbnail,
	file_name: "forecast.mp4",
	mime_type: "video/mp4",
	file_size: 4194304,
};

export const videoNote: VideoNote = {
	file_id: "DQACAgIAAxkBAAI",
	file_unique_id: "AgADDQ",
	length: 240,
	duration: 12,
	thumbnail,
	file_size: 307200,
};

export const voice: Voice = {
	file_id: "AwACAgIAAxkBAAI",
	file_unique_id: "AgADAw",
	duration: 5,
	mime_type: "audio/ogg",
	file_size: 18432,
};

export const maskPosition: MaskPosition = { point: "eyes", x_shift: 0, y_shift: -0.5, scale: 1.2 };

export const sticker: Sticker = {
	file_id: "CAACAgIAAxkBAAI",
	file_unique_id: "AgADCA",
	type: "regular",
	width: 512,
	height: 512,
	is_animated: false,
	is_video: false,
	thumbnail,
	emoji: "🌧",
	set_name: "weather_stickers",
	premium_animation: { file_id: "CAACAgIAAxkBAAJ", file_unique_id: "AgADCB", file_size: 4096 },
	file_size: 23040,
};

export const maskSticker: Sticker = {
	file_id: "CAACAgIAAxkBAAK",
	file_unique_id: "AgADCC",
	type: "mask",
	width: 512,
	height: 512,
	is_animated: false,
	is_video: false,
	mask_position: maskPosition,
};

export const customEmojiSticker: Sticker = {
	file_id: "CAACAgIAAxkBAAL",
	file_unique_id: "AgADCD",
	type: "custom_emoji",
	width: 100,
	height: 100,
	is_animated: true,
	is_video: false,
	custom_emoji_id: "5368324170671202286",
};

export const stickerSet: StickerSet = {
	name: "weather_stickers_by_weather_bot",
	title: "Weather",
	sticker_type: "regular",
	stickers: [sticker],
	thumbnail,
};

export type FileFields = Assert<
	Equal<
		[
			PhotoSize["width"],
			PhotoSize["file_size"],
			Animation["duration"],
			Audio["performer"],
			Document["file_name"],
			Video["thumbnail"],
			VideoNote["length"],
			Voice["duration"],
			Sticker["type"],
			Sticker["premium_animation"],
			StickerSet["sticker_type"],
			StickerSet["stickers"],
			MaskPosition["point"],
		],
		[
			number,
			number | undefined,
			number,
			string | undefined,
			string | undefined,
			PhotoSize | undefined,
			number,
			number,
			"regular" | "mask" | "custom_emoji",
			NonNullable<Sticker["premium_animation"]> | undefined,
			"regular" | "mask" | "custom_emoji",
			Sticker[],
			"forehead" | "eyes" | "mouth" | "chin",
		]
	>
>;

export function largestPhoto(sizes: PhotoSize[]) {
	return sizes.reduce((largest, size) => (size.width * size.height > largest.width * largest.height ? size : largest));
}

export type LargestPhotoResult = Assert<Equal<ReturnType<typeof largestPhoto>, PhotoSize>>;

export const stickerAsGif: Sticker = {
	file_id: "CAACAgIAAxkBAAM",
	file_unique_id: "AgADCE",
	// @ts-expect-error — "gif" is not a sticker type
	type: "gif",
	width: 512,
	height: 512,
	is_animated: true,
	is_video: false,
};

// @ts-expect-error — a photo size needs its dimensions
export const photoSizeWithoutHeight: PhotoSize = { file_id: "AgAC", file_unique_id: "AQAD", width: 90 };

// Entities and formatting

export const parseModes: ParseMode[] = ["Markdown", "MarkdownV2", "HTML"];

// @ts-expect-error — parse modes are case-sensitive
export const lowercaseParseMode: ParseMode = "html";

export const commonEntities: MessageEntity.CommonMessageEntity[] = [
	{ type: "mention", offset: 0, length: 6 },
	{ type: "hashtag", offset: 7, length: 5 },
	{ type: "cashtag", offset: 13, length: 4 },
	{ type: "bot_command", offset: 18, length: 9 },
	{ type: "url", offset: 28, length: 19 },
	{ type: "email", offset: 48, length: 17 },
	{ type: "phone_number", offset: 66, length: 15 },
	{ type: "bold", offset: 82, length: 4 },
	{ type: "blockquote", offset: 87, length: 10 },
	{ type: "italic", offset: 98, length: 6 },
	{ type: "underline", offset: 105, length: 9 },
	{ type: "strikethrough", offset: 115, length: 13 },
	{ type: "spoiler", offset: 129, length: 7 },
	{ type: "code", offset: 137, length: 4 },
];

export const preEntity: MessageEntity.PreMessageEntity = { type: "pre", offset: 0, length: 20, language: "python" };

export const textLinkEntity: MessageEntity.TextLinkMessageEntity = {
	type: "text_link",
	offset: 0,
	length: 7,
	url: "https://example.com",
};

export const textMentionEntity: MessageEntity.TextMentionMessageEntity = {
	type: "text_mention",
	offset: 0,
	length: 5,
	user: otherUser,
};

export const customEmojiEntity: MessageEntity.CustomEmojiMessageEntity = {
	type: "custom_emoji",
	offset: 0,
	length: 2,
	custom_emoji_id: "5368324170671202286",
};

export const entities: MessageEntity[] = [
	...commonEntities,
	preEntity,
	textLinkEntity,
	textMentionEntity,
	customEmojiEntity,
];

export type MessageEntityType = Assert<
	Equal<
		MessageEntity["type"],
		| "mention"
		| "hashtag"
		| "cashtag"
		| "bot_command"
		| "url"
		| "email"
		| "phone_number"
		| "bold"
		| "blockquote"
		| "expandable_blockquote"
		| "italic"
		| "underline"
		| "strikethrough"
		| "spoiler"
		| "code"
		| "pre"
		| "text_link"
		| "text_mention"
		| "custom_emoji"
		| "date_time"
	>
>;

export type AbstractMessageEntityKeys = Assert<
	Equal<
		[keyof MessageEntity.AbstractMessageEntity, MessageEntity.AbstractMessageEntity["type"]],
		["type" | "offset" | "length", string]
	>
>;

export type EntitiesAreAbstract = Assert<Extends<MessageEntity, MessageEntity.AbstractMessageEntity>>;

export function entityUrl(entity: MessageEntity) {
	switch (entity.type) {
		case "text_link":
			return entity.url;
		case "text_mention":
			return `tg://user?id=${entity.user.id}`;
		default:
			return undefined;
	}
}

export type EntityUrlResult = Assert<Equal<ReturnType<typeof entityUrl>, string | undefined>>;

export function codeLanguage(entity: MessageEntity) {
	if (entity.type === "pre") return entity;
	return undefined;
}

export type CodeLanguageNarrowing = Assert<
	Equal<ReturnType<typeof codeLanguage>, MessageEntity.PreMessageEntity | undefined>
>;

export function customEmojiOf(entity: MessageEntity) {
	if (entity.type === "custom_emoji") return entity.custom_emoji_id;
	return undefined;
}

export type CustomEmojiOfResult = Assert<Equal<ReturnType<typeof customEmojiOf>, string | undefined>>;

export function commonOf(entity: MessageEntity) {
	switch (entity.type) {
		case "pre":
		case "text_link":
		case "text_mention":
		case "custom_emoji":
		case "date_time":
			return undefined;
		default:
			return entity;
	}
}

export type CommonOfNarrowing = Assert<
	Equal<ReturnType<typeof commonOf>, MessageEntity.CommonMessageEntity | undefined>
>;

// @ts-expect-error — a text link needs its url
export const textLinkWithoutUrl: MessageEntity = { type: "text_link", offset: 0, length: 4 };

export const boldWithUrl: MessageEntity = {
	type: "bold",
	offset: 0,
	length: 4,
	// @ts-expect-error — url belongs to text links, and `type` discriminates the union
	url: "https://example.com",
};

export const unknownEntity: MessageEntity = {
	// @ts-expect-error — "link" is not an entity type
	type: "link",
	offset: 0,
	length: 4,
};

export const linkPreviewOptions: LinkPreviewOptions = {
	is_disabled: false,
	url: "https://example.com/berlin",
	prefer_small_media: false,
	prefer_large_media: true,
	show_above_text: true,
};

export const quote: TextQuote = {
	text: "light rain",
	entities: [{ type: "italic", offset: 0, length: 5 }],
	position: 14,
	is_manual: true,
};

export const replyParameters: ReplyParameters = {
	message_id: 42,
	chat_id: "@weather_news",
	allow_sending_without_reply: true,
	quote: "light rain",
	quote_parse_mode: "HTML",
	quote_position: 14,
};

export const replyWithQuoteEntities: ReplyParameters = {
	message_id: 42,
	quote: "light rain",
	quote_entities: [{ type: "bold", offset: 0, length: 5 }],
};

export type ReplyParametersFields = Assert<
	Equal<
		[ReplyParameters["message_id"], ReplyParameters["chat_id"], ReplyParameters["quote_entities"]],
		[number, number | string | undefined, MessageEntity[] | undefined]
	>
>;

export type TextQuoteFields = Assert<
	Equal<[TextQuote["text"], TextQuote["position"], TextQuote["is_manual"]], [string, number, true | undefined]>
>;

export type LinkPreviewOptionsFields = Assert<
	Equal<[LinkPreviewOptions["is_disabled"], LinkPreviewOptions["url"]], [boolean | undefined, string | undefined]>
>;

// @ts-expect-error — a reply names the message it replies to
export const replyWithoutMessage: ReplyParameters = { chat_id: 1, quote: "rain" };

// Contents

export const contact: Contact = {
	phone_number: "+4930123456",
	first_name: "Erika",
	last_name: "Mustermann",
	user_id: 123456789,
	vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:Erika Mustermann\nEND:VCARD",
};

export const dice: Dice = { emoji: "🎲", value: 6 };

export const pollOptions: PollOption[] = [
	{ persistent_id: "0", text: "Rain", voter_count: 3 },
	{ persistent_id: "1", text: "Sun", voter_count: 5 },
];

export const poll: Poll = {
	id: "5432109876543210",
	question: "Weather tomorrow?",
	options: pollOptions,
	total_voter_count: 8,
	is_closed: false,
	is_anonymous: true,
	type: "regular",
	allows_multiple_answers: false,
	allows_revoting: true,
	members_only: false,
};

export const quiz: Poll = {
	id: "5432109876543211",
	question: "Wettest month in Berlin?",
	options: [
		{ persistent_id: "0", text: "June", voter_count: 4 },
		{ persistent_id: "1", text: "July", voter_count: 1 },
	],
	total_voter_count: 5,
	is_closed: true,
	is_anonymous: false,
	type: "quiz",
	allows_multiple_answers: false,
	allows_revoting: false,
	members_only: false,
	correct_option_id: 0,
	explanation: "June has the most rain",
	explanation_entities: [{ type: "bold", offset: 0, length: 4 }],
	open_period: 60,
	close_date: 1709251260,
};

export const pollAnswer: PollAnswer = {
	poll_id: "5432109876543210",
	user,
	option_ids: [1],
	option_persistent_ids: ["1"],
};

export const anonymousPollAnswer: PollAnswer = {
	poll_id: "5432109876543210",
	voter_chat: channel,
	option_ids: [],
	option_persistent_ids: [],
};

export const commonLocation: Location.CommonLocation = { latitude: 52.52, longitude: 13.405, horizontal_accuracy: 25 };

export const liveLocation: Location.LiveLocation = {
	latitude: 52.52,
	longitude: 13.405,
	live_period: 900,
	heading: 90,
	proximity_alert_radius: 100,
};

export const locations: Location[] = [commonLocation, liveLocation];

export const venue: Venue = {
	location: commonLocation,
	title: "Brandenburger Tor",
	address: "Pariser Platz, 10117 Berlin",
	foursquare_id: "4adcda09f964a520e83321e3",
	foursquare_type: "arts_entertainment/default",
	google_place_id: "ChIJiQnyVcZRqEcRY0xnhE77uyY",
	google_place_type: "tourist_attraction",
};

export const story: Story = { chat: channel, id: 12 };

export const game: Game = {
	title: "Snake",
	description: "Eat the apples",
	photo: photoSizes,
	text: "High scores: Erika 120",
	text_entities: [],
	animation,
};

export const highScore: GameHighScore = { position: 1, user, score: 120 };

export const webAppData: WebAppData = { data: '{"city":"Berlin"}', button_text: "Pick a city" };

export type ContentFields = Assert<
	Equal<
		[
			Contact["user_id"],
			Dice["value"],
			Poll["type"],
			Poll["correct_option_id"],
			PollOption["voter_count"],
			PollAnswer["option_ids"],
			PollAnswer["user"],
			Venue["location"],
			Story["id"],
			Game["photo"],
			GameHighScore["score"],
			WebAppData["data"],
		],
		[
			number | undefined,
			number,
			"regular" | "quiz",
			number | undefined,
			number,
			number[],
			User | undefined,
			Location,
			number,
			PhotoSize[],
			number,
			string,
		]
	>
>;

export function livePeriod(location: Location) {
	if ("live_period" in location) return location;
	return undefined;
}

export type LivePeriodNarrowing = Assert<Equal<ReturnType<typeof livePeriod>, Location.LiveLocation | undefined>>;

export type LocationFields = Assert<
	Equal<
		[
			Location.CommonLocation["latitude"],
			Location.CommonLocation["horizontal_accuracy"],
			Location.LiveLocation["live_period"],
		],
		[number, number | undefined, number]
	>
>;

export function voter(answer: PollAnswer) {
	return answer.user ?? answer.voter_chat;
}

export type VoterResult = Assert<Equal<ReturnType<typeof voter>, User | Chat | undefined>>;

// @ts-expect-error — "survey" is not a poll type
export const surveyPoll: Poll["type"] = "survey";

// @ts-expect-error — a venue needs its address
export const venueWithoutAddress: Venue = { location: commonLocation, title: "Brandenburger Tor" };

// Service message contents

export const proximityAlert: ProximityAlertTriggered = { traveler: user, watcher: otherUser, distance: 42 };

export const autoDeleteTimerChanged: MessageAutoDeleteTimerChanged = { message_auto_delete_time: 86400 };

export const boostAdded: ChatBoostAdded = { boost_count: 4 };

export const forumTopicCreated: ForumTopicCreated = {
	name: "Forecasts",
	icon_color: 0x6fb9f0,
	icon_custom_emoji_id: "5368324170671202286",
};

export const forumTopicEdited: ForumTopicEdited = { name: "Daily forecasts", icon_custom_emoji_id: "" };

export const forumTopicClosed: ForumTopicClosed = {};

export const forumTopicReopened: ForumTopicReopened = {};

export const generalForumTopicHidden: GeneralForumTopicHidden = {};

export const generalForumTopicUnhidden: GeneralForumTopicUnhidden = {};

export const usersShared: UsersShared = { request_id: 1, users: [{ user_id: 234567890 }, { user_id: 345678901 }] };

export const chatShared: ChatShared = { request_id: 2, chat_id: -1001234567890 };

export const writeAccessAllowed: WriteAccessAllowed = { from_request: true, web_app_name: "forecast" };

export const writeAccessFromMenu: WriteAccessAllowed = { from_attachment_menu: true };

export const videoChatScheduled: VideoChatScheduled = { start_date: 1709337600 };

export const videoChatStarted: VideoChatStarted = {};

export const videoChatEnded: VideoChatEnded = { duration: 3600 };

export const videoChatParticipantsInvited: VideoChatParticipantsInvited = { users: [otherUser] };

export const giveawayCreated: GiveawayCreated = {};

export const giveaway: Giveaway = {
	chats: [channel],
	winners_selection_date: 1711929600,
	winner_count: 3,
	only_new_members: true,
	has_public_winners: true,
	prize_description: "Umbrellas",
	country_codes: ["DE", "AT"],
	premium_subscription_month_count: 3,
};

export const giveawayWinners: GiveawayWinners = {
	chat: channel,
	giveaway_message_id: 15,
	winners_selection_date: 1711929600,
	winner_count: 3,
	winners: [user, otherUser],
	additional_chat_count: 1,
	premium_subscription_month_count: 3,
	unclaimed_prize_count: 1,
	only_new_members: true,
	prize_description: "Umbrellas",
};

export const giveawayCompleted: GiveawayCompleted = { winner_count: 3, unclaimed_prize_count: 0 };

export type ServiceContentFields = Assert<
	Equal<
		[
			ProximityAlertTriggered["distance"],
			MessageAutoDeleteTimerChanged["message_auto_delete_time"],
			ChatBoostAdded["boost_count"],
			ForumTopicCreated["icon_color"],
			ForumTopicEdited["name"],
			UsersShared["users"],
			ChatShared["chat_id"],
			WriteAccessAllowed["web_app_name"],
			VideoChatScheduled["start_date"],
			VideoChatEnded["duration"],
			VideoChatParticipantsInvited["users"],
			Giveaway["winner_count"],
			Giveaway["chats"],
			GiveawayWinners["winners"],
			GiveawayCompleted["giveaway_message"],
		],
		[
			number,
			number,
			number,
			number,
			string | undefined,
			SharedUser[],
			number,
			string | undefined,
			number,
			number,
			User[],
			number,
			Chat[],
			User[],
			Message | undefined,
		]
	>
>;

export type EmptyServiceContents = Assert<
	Equal<
		[
			keyof ForumTopicClosed,
			keyof ForumTopicReopened,
			keyof GeneralForumTopicHidden,
			keyof GeneralForumTopicUnhidden,
			keyof VideoChatStarted,
			keyof GiveawayCreated,
		],
		[never, never, never, never, never, "prize_star_count"]
	>
>;

// @ts-expect-error — a giveaway lists the chats to join
export const giveawayWithoutChats: Giveaway = { winners_selection_date: 1711929600, winner_count: 3 };

// Origins

export const originUser: MessageOriginUser = { type: "user", date: 1709164800, sender_user: otherUser };

export const originHiddenUser: MessageOriginHiddenUser = {
	type: "hidden_user",
	date: 1709164800,
	sender_user_name: "Anonymous",
};

export const originChat: MessageOriginChat = {
	type: "chat",
	date: 1709164800,
	sender_chat: supergroup,
	author_signature: "Admin",
};

export const originChannel: MessageOriginChannel = {
	type: "channel",
	date: 1709164800,
	chat: channel,
	message_id: 99,
	author_signature: "Weather desk",
};

export type AbstractMessageOriginFields = Assert<
	Equal<
		[keyof AbstractMessageOrigin, AbstractMessageOrigin["type"], AbstractMessageOrigin["date"]],
		["type" | "date", string, number]
	>
>;

export type MessageOriginType = Assert<
	Equal<NonNullable<Message.CommonMessage["forward_origin"]>["type"], "user" | "hidden_user" | "chat" | "channel">
>;

export function originalSender(message: Message.CommonMessage) {
	const origin = message.forward_origin;
	if (origin === undefined) return undefined;
	switch (origin.type) {
		case "user":
			return origin.sender_user.first_name;
		case "hidden_user":
			return origin.sender_user_name;
		case "chat":
			return origin.sender_chat.id;
		case "channel":
			return origin.message_id;
	}
}

export type OriginalSenderResult = Assert<Equal<ReturnType<typeof originalSender>, string | number | undefined>>;

export function channelOrigin(message: Message.CommonMessage) {
	if (message.forward_origin?.type === "channel") return message.forward_origin;
	return undefined;
}

export type ChannelOriginNarrowing = Assert<Equal<ReturnType<typeof channelOrigin>, MessageOriginChannel | undefined>>;

export const originUserWithName: MessageOriginUser = {
	type: "user",
	sender_user: otherUser,
	// @ts-expect-error — the hidden user's name belongs to MessageOriginHiddenUser
	sender_user_name: "Max",
};

// External replies

const external = { origin: originChannel, chat: channel, message_id: 99 };

export const externalAnimation: ExternalReplyAnimation = { ...external, animation, has_media_spoiler: true };

export const externalAudio: ExternalReplyAudio = { ...external, audio };

export const externalDocument: ExternalReplyDocument = { ...external, document };

export const externalPhoto: ExternalReplyPhoto = { ...external, photo: photoSizes, has_media_spoiler: true };

export const externalSticker: ExternalReplySticker = { ...external, sticker };

export const externalStory: ExternalReplyStory = { ...external, story };

export const externalVideo: ExternalReplyVideo = { ...external, video };

export const externalVideoNote: ExternalReplyVideoNote = { origin: originUser, video_note: videoNote };

export const externalVoice: ExternalReplyVoice = { origin: originHiddenUser, voice };

export const externalContact: ExternalReplyContact = { origin: originUser, contact };

export const externalDice: ExternalReplyDice = { origin: originUser, dice };

export const externalGame: ExternalReplyGame = { origin: originUser, game };

export const externalGiveaway: ExternalReplyGiveaway = { ...external, giveaway };

export const externalGiveawayWinners: ExternalReplyGiveawayWinners = { ...external, giveaway_winners: giveawayWinners };

export const externalInvoice: ExternalReplyInvoice = {
	origin: originUser,
	invoice: {
		title: "Umbrella",
		description: "Stays dry",
		start_parameter: "umbrella",
		currency: "EUR",
		total_amount: 1999,
	},
};

export const externalLocation: ExternalReplyLocation = { origin: originChat, location: liveLocation };

export const externalPoll: ExternalReplyPoll = { ...external, poll };

export const externalVenue: ExternalReplyVenue = { ...external, venue, link_preview_options: { is_disabled: true } };

export const externalReplies: ExternalReplyInfo[] = [
	externalAnimation,
	externalAudio,
	externalDocument,
	externalPhoto,
	externalSticker,
	externalStory,
	externalVideo,
	externalVideoNote,
	externalVoice,
	externalContact,
	externalDice,
	externalGame,
	externalGiveaway,
	externalGiveawayWinners,
	externalInvoice,
	externalLocation,
	externalPoll,
	externalVenue,
];

export type AbstractExternalReplyKeys = Assert<
	Equal<keyof AbstractExternalReply, "origin" | "chat" | "message_id" | "link_preview_options">
>;

export type AbstractExternalReplyMediaKeys = Assert<Equal<keyof AbstractExternalReplyMedia, "has_media_spoiler">>;

export type ExternalRepliesAreAbstract = Assert<Extends<ExternalReplyInfo, AbstractExternalReply>>;

export type ExternalMediaReplies = Assert<
	Extends<ExternalReplyAnimation | ExternalReplyPhoto | ExternalReplyVideo, AbstractExternalReplyMedia>
>;

export function externalPhotoOf(reply: ExternalReplyInfo) {
	if ("photo" in reply) return reply;
	return undefined;
}

export type ExternalPhotoOfNarrowing = Assert<
	Equal<ReturnType<typeof externalPhotoOf>, ExternalReplyPhoto | undefined>
>;

export function externalOrigin(message: Message.CommonMessage) {
	return message.external_reply?.origin.type;
}

export type ExternalOriginResult = Assert<
	Equal<ReturnType<typeof externalOrigin>, "user" | "hidden_user" | "chat" | "channel" | undefined>
>;

// @ts-expect-error — an external reply always states its origin
export const externalWithoutOrigin: ExternalReplyAudio = { audio };

// Messages

export const textMessage: Message.TextMessage = {
	...inPrivate,
	text: "/forecast Berlin",
	entities: [{ type: "bot_command", offset: 0, length: 9 }],
	link_preview_options: { is_disabled: true },
};

// A message in `reply_to_message` declares that it isn't itself a reply.
export const replyTarget = { ...inGroup, message_id: 199, text: "What's the weather?", reply_to_message: undefined };

export const replyMessage: Message.TextMessage = {
	...inGroup,
	text: "Light rain",
	sender_boost_count: 2,
	reply_to_message: replyTarget,
	quote,
	is_topic_message: true,
	via_bot: { id: 987654321, is_bot: true, first_name: "Weather Bot", username: "weather_bot" },
	reply_markup: { inline_keyboard: [[{ text: "Refresh", callback_data: "refresh" }]] },
};

export const forwardedMessage: Message.TextMessage = {
	...inGroup,
	text: "Storm warning",
	forward_origin: originChannel,
	is_automatic_forward: true,
	has_protected_content: true,
};

export const externalReplyMessage: Message.TextMessage = {
	...inPrivate,
	text: "Nice photo",
	external_reply: externalPhoto,
	quote,
};

export const storyReplyMessage: Message.TextMessage = { ...inPrivate, text: "Nice story", reply_to_story: story };

export const channelPostMessage: Message.TextMessage = {
	message_id: 303,
	date: 1709251200,
	chat: channel,
	sender_chat: channel,
	author_signature: "Weather desk",
	text: "Sunny tomorrow",
	edit_date: 1709251300,
};

export const animationMessage: Message.AnimationMessage = {
	...inPrivate,
	animation,
	document,
	caption: "Rain",
	has_media_spoiler: true,
};

export const audioMessage: Message.AudioMessage = { ...inPrivate, audio, caption: "Rain sounds" };

export const documentMessage: Message.DocumentMessage = {
	...inGroup,
	document,
	caption: "Report",
	caption_entities: [{ type: "bold", offset: 0, length: 6 }],
};

export const photoMessage: Message.PhotoMessage = {
	...inGroup,
	photo: photoSizes,
	caption: "Skyline",
	media_group_id: "13575876843254",
};

export const stickerMessage: Message.StickerMessage = { ...inPrivate, sticker };

export const storyMessage: Message.StoryMessage = { ...inPrivate, story, forward_origin: originChannel };

export const videoMessage: Message.VideoMessage = { ...inGroup, video, media_group_id: "13575876843254" };

export const videoNoteMessage: Message.VideoNoteMessage = { ...inPrivate, video_note: videoNote };

export const voiceMessage: Message.VoiceMessage = { ...inPrivate, voice, caption: "Forecast" };

export const contactMessage: Message.ContactMessage = { ...inPrivate, contact };

export const diceMessage: Message.DiceMessage = { ...inPrivate, dice };

export const gameMessage: Message.GameMessage = { ...inPrivate, game };

export const pollMessage: Message.PollMessage = { ...inGroup, poll };

export const locationMessage: Message.LocationMessage = { ...inPrivate, location: liveLocation };

export const venueMessage: Message.VenueMessage = { ...inPrivate, location: commonLocation, venue };

export const newChatMembersMessage: Message.NewChatMembersMessage = { ...inGroup, new_chat_members: [otherUser] };

export const leftChatMemberMessage: Message.LeftChatMemberMessage = { ...inGroup, left_chat_member: otherUser };

export const newChatTitleMessage: Message.NewChatTitleMessage = { ...inGroup, new_chat_title: "Rain fans" };

export const newChatPhotoMessage: Message.NewChatPhotoMessage = { ...inGroup, new_chat_photo: photoSizes };

export const deleteChatPhotoMessage: Message.DeleteChatPhotoMessage = { ...inGroup, delete_chat_photo: true };

export const groupChatCreatedMessage: Message.GroupChatCreatedMessage = {
	message_id: 1,
	date: 1709251200,
	chat: { id: -4012345678, type: "group", title: "Family" },
	from: user,
	group_chat_created: true,
};

export const supergroupChatCreated: Message.SupergroupChatCreated = { ...inGroup, supergroup_chat_created: true };

export const channelChatCreatedMessage: Message.ChannelChatCreatedMessage = {
	message_id: 1,
	date: 1709251200,
	chat: channel,
	sender_chat: channel,
	channel_chat_created: true,
};

export const autoDeleteTimerChangedMessage: Message.MessageAutoDeleteTimerChangedMessage = {
	...inGroup,
	message_auto_delete_timer_changed: autoDeleteTimerChanged,
};

export const migrateToChatIdMessage: Message.MigrateToChatIdMessage = {
	message_id: 50,
	date: 1709251200,
	chat: { id: -4012345678, type: "group", title: "Family" },
	from: user,
	migrate_to_chat_id: -1001234567890,
};

export const migrateFromChatIdMessage: Message.MigrateFromChatIdMessage = {
	...inGroup,
	migrate_from_chat_id: -4012345678,
};

// `pinned_message` is an `Omit` over a union, which keeps only the keys every message shares.
export const pinnedMessageMessage: Message.PinnedMessageMessage = {
	...inGroup,
	pinned_message: { message_id: 199, date: 1709251100, chat: supergroup },
};

export const pinnedInaccessibleMessage: Message.PinnedMessageMessage = {
	...inGroup,
	pinned_message: { message_id: 5, date: 0, chat: supergroup },
};

export const invoiceMessage: Message.InvoiceMessage = {
	...inPrivate,
	invoice: {
		title: "Umbrella",
		description: "Stays dry",
		start_parameter: "umbrella",
		currency: "EUR",
		total_amount: 1999,
	},
};

export const successfulPaymentMessage: Message.SuccessfulPaymentMessage = {
	...inPrivate,
	successful_payment: {
		currency: "EUR",
		total_amount: 1999,
		invoice_payload: "umbrella-1",
		telegram_payment_charge_id: "tg_charge_1",
		provider_payment_charge_id: "provider_charge_1",
	},
};

export const usersSharedMessage: Message.UsersSharedMessage = { ...inPrivate, users_shared: usersShared };

export const chatSharedMessage: Message.ChatSharedMessage = { ...inPrivate, chat_shared: chatShared };

export const connectedWebsiteMessage: Message.ConnectedWebsiteMessage = {
	...inPrivate,
	connected_website: "example.com",
};

export const writeAccessAllowedMessage: Message.WriteAccessAllowedMessage = {
	...inPrivate,
	write_access_allowed: writeAccessAllowed,
};

export const passportDataMessage: Message.PassportDataMessage = {
	...inPrivate,
	passport_data: {
		data: [{ type: "email", email: "erika@example.com", hash: "ZW1haWwtaGFzaA==" }],
		credentials: { data: "ZGF0YQ==", hash: "aGFzaA==", secret: "c2VjcmV0" },
	},
};

export const proximityAlertTriggeredMessage: Message.ProximityAlertTriggeredMessage = {
	...inGroup,
	proximity_alert_triggered: proximityAlert,
};

export const boostAddedMessage: Message.BoostAddedMessage = { ...inGroup, boost_added: boostAdded };

export const forumTopicCreatedMessage: Message.ForumTopicCreatedMessage = {
	...inGroup,
	is_topic_message: true,
	forum_topic_created: forumTopicCreated,
};

export const forumTopicEditedMessage: Message.ForumTopicEditedMessage = {
	...inGroup,
	forum_topic_edited: forumTopicEdited,
};

export const forumTopicClosedMessage: Message.ForumTopicClosedMessage = {
	...inGroup,
	forum_topic_closed: forumTopicClosed,
};

export const forumTopicReopenedMessage: Message.ForumTopicReopenedMessage = {
	...inGroup,
	forum_topic_reopened: forumTopicReopened,
};

export const generalForumTopicHiddenMessage: Message.GeneralForumTopicHiddenMessage = {
	...inGroup,
	general_forum_topic_hidden: generalForumTopicHidden,
};

export const generalForumTopicUnhiddenMessage: Message.GeneralForumTopicUnhiddenMessage = {
	...inGroup,
	general_forum_topic_unhidden: generalForumTopicUnhidden,
};

export const giveawayCreatedMessage: Message.GiveawayCreatedMessage = {
	message_id: 15,
	date: 1709251200,
	chat: channel,
	sender_chat: channel,
	giveaway_created: giveawayCreated,
};

export const giveawayMessage: Message.GiveawayMessage = {
	message_id: 16,
	date: 1709251200,
	chat: channel,
	sender_chat: channel,
	giveaway,
};

export const giveawayWinnersMessage: Message.GiveawayWinnersMessage = {
	message_id: 17,
	date: 1711929600,
	chat: channel,
	sender_chat: channel,
	giveaway_winners: giveawayWinners,
};

export const giveawayCompletedMessage: Message.GiveawayCompletedMessage = {
	message_id: 18,
	date: 1711929600,
	chat: channel,
	sender_chat: channel,
	giveaway_completed: { ...giveawayCompleted, giveaway_message: giveawayMessage },
};

export const videoChatScheduledMessage: Message.VideoChatScheduledMessage = {
	...inGroup,
	video_chat_scheduled: videoChatScheduled,
};

export const videoChatStartedMessage: Message.VideoChatStartedMessage = {
	...inGroup,
	video_chat_started: videoChatStarted,
};

export const videoChatEndedMessage: Message.VideoChatEndedMessage = { ...inGroup, video_chat_ended: videoChatEnded };

export const videoChatParticipantsInvitedMessage: Message.VideoChatParticipantsInvitedMessage = {
	...inGroup,
	video_chat_participants_invited: videoChatParticipantsInvited,
};

export const webAppDataMessage: Message.WebAppDataMessage = { ...inPrivate, web_app_data: webAppData };

export const commonMessages: CommonMessageBundle[] = [
	animationMessage,
	audioMessage,
	contactMessage,
	diceMessage,
	documentMessage,
	gameMessage,
	locationMessage,
	photoMessage,
	pollMessage,
	stickerMessage,
	storyMessage,
	textMessage,
	venueMessage,
	videoMessage,
	videoNoteMessage,
	voiceMessage,
];

export const serviceMessages: ServiceMessageBundle[] = [
	newChatMembersMessage,
	leftChatMemberMessage,
	newChatTitleMessage,
	newChatPhotoMessage,
	deleteChatPhotoMessage,
	groupChatCreatedMessage,
	supergroupChatCreated,
	channelChatCreatedMessage,
	autoDeleteTimerChangedMessage,
	migrateToChatIdMessage,
	migrateFromChatIdMessage,
	pinnedMessageMessage,
	invoiceMessage,
	successfulPaymentMessage,
	usersSharedMessage,
	chatSharedMessage,
	connectedWebsiteMessage,
	writeAccessAllowedMessage,
	passportDataMessage,
	proximityAlertTriggeredMessage,
	boostAddedMessage,
	forumTopicCreatedMessage,
	forumTopicEditedMessage,
	forumTopicClosedMessage,
	forumTopicReopenedMessage,
	generalForumTopicHiddenMessage,
	generalForumTopicUnhiddenMessage,
	giveawayCreatedMessage,
	giveawayMessage,
	giveawayWinnersMessage,
	giveawayCompletedMessage,
	videoChatScheduledMessage,
	videoChatStartedMessage,
	videoChatEndedMessage,
	videoChatParticipantsInvitedMessage,
	webAppDataMessage,
];

export const messages: Message[] = [...commonMessages, ...serviceMessages];

// A subtype such as VenueMessage stays assignable to the union through its base, so membership is checked exactly.
export type CommonMessageBundleMembers = Assert<
	Equal<
		CommonMessageBundle,
		| Message.AnimationMessage
		| Message.AudioMessage
		| Message.ChecklistMessage
		| Message.ContactMessage
		| Message.DiceMessage
		| Message.DocumentMessage
		| Message.GameMessage
		| Message.LivePhotoMessage
		| Message.LocationMessage
		| Message.PaidMediaMessage
		| Message.PhotoMessage
		| Message.PollMessage
		| Message.RichMessageMessage
		| Message.StickerMessage
		| Message.StoryMessage
		| Message.TextMessage
		| Message.VenueMessage
		| Message.VideoMessage
		| Message.VideoNoteMessage
		| Message.VoiceMessage
	>
>;

export type ServiceMessageBundleMembers = Assert<
	Equal<
		ServiceMessageBundle,
		| Message.NewChatMembersMessage
		| Message.LeftChatMemberMessage
		| Message.NewChatTitleMessage
		| Message.NewChatPhotoMessage
		| Message.DeleteChatPhotoMessage
		| Message.GroupChatCreatedMessage
		| Message.SupergroupChatCreated
		| Message.ChannelChatCreatedMessage
		| Message.MessageAutoDeleteTimerChangedMessage
		| Message.MigrateToChatIdMessage
		| Message.MigrateFromChatIdMessage
		| Message.PinnedMessageMessage
		| Message.InvoiceMessage
		| Message.SuccessfulPaymentMessage
		| Message.UsersSharedMessage
		| Message.ChatSharedMessage
		| Message.ConnectedWebsiteMessage
		| Message.WriteAccessAllowedMessage
		| Message.PassportDataMessage
		| Message.ProximityAlertTriggeredMessage
		| Message.BoostAddedMessage
		| Message.ForumTopicCreatedMessage
		| Message.ForumTopicEditedMessage
		| Message.ForumTopicClosedMessage
		| Message.ForumTopicReopenedMessage
		| Message.GeneralForumTopicHiddenMessage
		| Message.GeneralForumTopicUnhiddenMessage
		| Message.GiveawayCreatedMessage
		| Message.GiveawayMessage
		| Message.GiveawayWinnersMessage
		| Message.GiveawayCompletedMessage
		| Message.VideoChatScheduledMessage
		| Message.VideoChatStartedMessage
		| Message.VideoChatEndedMessage
		| Message.VideoChatParticipantsInvitedMessage
		| Message.WebAppDataMessage
		| Message.ChatOwnerLeftMessage
		| Message.ChatOwnerChangedMessage
		| Message.RefundedPaymentMessage
		| Message.GiftMessage
		| Message.UniqueGiftMessage
		| Message.GiftUpgradeSentMessage
		| Message.ChatBackgroundSetMessage
		| Message.ChecklistTasksDoneMessage
		| Message.ChecklistTasksAddedMessage
		| Message.CommunityChatAddedMessage
		| Message.CommunityChatJoinedMessage
		| Message.CommunityChatRemovedMessage
		| Message.DirectMessagePriceChangedMessage
		| Message.PaidMessagePriceChangedMessage
		| Message.PollOptionAddedMessage
		| Message.PollOptionDeletedMessage
		| Message.SuggestedPostApprovedMessage
		| Message.SuggestedPostApprovalFailedMessage
		| Message.SuggestedPostDeclinedMessage
		| Message.SuggestedPostPaidMessage
		| Message.SuggestedPostRefundedMessage
		| Message.ManagedBotCreatedMessage
	>
>;

export type MessageMembers = Assert<Equal<Message, ServiceMessageBundle | CommonMessageBundle>>;

export type MessageHierarchy = Assert<
	Equal<
		[
			Extends<CommonMessageBundle, Message.CommonMessage>,
			Extends<Message.CommonMessage, Message.ServiceMessage>,
			Extends<Message.TextMessage | Message.CaptionableMessage, Message.CommonMessage>,
			Extends<Message.MediaMessage, Message.CaptionableMessage>,
			Extends<
				Message.AudioMessage | Message.DocumentMessage | Message.PhotoMessage | Message.VideoMessage,
				Message.MediaMessage
			>,
			Extends<Message.VoiceMessage, Message.CaptionableMessage>,
			Extends<Message.AnimationMessage, Message.DocumentMessage>,
			Extends<Message.VenueMessage, Message.LocationMessage>,
			Extends<ServiceMessageBundle, Message.ServiceMessage>,
		],
		[true, true, true, true, true, true, true, true, true]
	>
>;

export type ServiceMessageFields = Assert<
	Equal<
		[
			Message.ServiceMessage["message_id"],
			Message.ServiceMessage["date"],
			Message.ServiceMessage["chat"],
			Message.ServiceMessage["from"],
			Message.ServiceMessage["sender_chat"],
			Message.ServiceMessage["message_thread_id"],
			Message.CommonMessage["edit_date"],
			Message.CommonMessage["reply_markup"],
			Message.CommonMessage["quote"],
			Message.CaptionableMessage["caption_entities"],
			Message.MediaMessage["media_group_id"],
		],
		[
			number,
			number,
			Chat,
			User | undefined,
			Chat | undefined,
			number | undefined,
			number | undefined,
			Message.TextMessage["reply_markup"],
			TextQuote | undefined,
			MessageEntity[] | undefined,
			string | undefined,
		]
	>
>;

export type PinnedMessageKeys = Assert<
	Equal<keyof Message.PinnedMessageMessage["pinned_message"], "chat" | "message_id" | "date">
>;

export type MessageContentTypes = Assert<
	Equal<
		[
			Message.TextMessage["text"],
			Message.PhotoMessage["photo"],
			Message.AnimationMessage["animation"],
			Message.LocationMessage["location"],
			Message.VenueMessage["venue"],
			Message.NewChatMembersMessage["new_chat_members"],
			Message.DeleteChatPhotoMessage["delete_chat_photo"],
			Message.MigrateToChatIdMessage["migrate_to_chat_id"],
			Message.GiveawayCompletedMessage["giveaway_completed"],
			Message.WebAppDataMessage["web_app_data"],
			Message.StoryMessage["story"],
		],
		[string, PhotoSize[], Animation, Location, Venue, User[], true, number, GiveawayCompleted, WebAppData, Story]
	>
>;

// @ts-expect-error — a text message needs its text
export const textMessageWithoutText: Message.TextMessage = { ...inPrivate };

// @ts-expect-error — every message has a date
export const messageWithoutDate: Message.TextMessage = { message_id: 1, chat: privateChat, text: "Hi" };

export const serviceMessageWithCaption: Message.NewChatTitleMessage = {
	...inGroup,
	new_chat_title: "Rain fans",
	// @ts-expect-error — service messages carry no caption
	caption: "Renamed",
};

export const deleteChatPhotoFalse: Message.DeleteChatPhotoMessage = {
	...inGroup,
	// @ts-expect-error — the service flag is always true
	delete_chat_photo: false,
};

// Reading messages

export function textOf(message: Message) {
	if ("text" in message) return message;
	return undefined;
}

export type TextOfNarrowing = Assert<Equal<ReturnType<typeof textOf>, Message.TextMessage | undefined>>;

export function photoOf(message: Message) {
	if ("photo" in message) return message;
	return undefined;
}

export type PhotoOfNarrowing = Assert<Equal<ReturnType<typeof photoOf>, Message.PhotoMessage | undefined>>;

export function readDocument(message: Message) {
	if ("document" in message) {
		expectType<Message.AnimationMessage | Message.DocumentMessage>()(message);
		return message.document.file_id;
	}
	return undefined;
}

export function readLocation(message: Message) {
	if ("location" in message) {
		expectType<Message.LocationMessage | Message.VenueMessage>()(message);
		expectType<Location>()(message.location);
		return message.location.latitude;
	}
	return undefined;
}

export function readCaption(message: Message) {
	if ("caption" in message) {
		expectType<
			| Message.AnimationMessage
			| Message.AudioMessage
			| Message.DocumentMessage
			| Message.LivePhotoMessage
			| Message.PaidMediaMessage
			| Message.PhotoMessage
			| Message.VideoMessage
			| Message.VoiceMessage
		>()(message);
		return message.caption;
	}
	return undefined;
}

export type ReadCaptionResult = Assert<Equal<ReturnType<typeof readCaption>, string | undefined>>;

export function readReply(message: Message) {
	if ("reply_to_message" in message) {
		expectType<CommonMessageBundle>()(message);
		return message.reply_to_message;
	}
	return undefined;
}

export function newMembers(message: Message) {
	if ("new_chat_members" in message) return message.new_chat_members;
	return [];
}

export type NewMembersResult = Assert<Equal<ReturnType<typeof newMembers>, User[]>>;

export function repliedText(message: Message.TextMessage) {
	const reply = message.reply_to_message;
	if (reply && "text" in reply) return reply;
	return undefined;
}

export type RepliedTextNarrowing = Assert<
	Equal<ReturnType<typeof repliedText>, (Message.TextMessage & { reply_to_message: undefined }) | undefined>
>;

export function senderChatId(message: Message) {
	return message.sender_chat?.id ?? message.from?.id;
}

export type SenderChatIdResult = Assert<Equal<ReturnType<typeof senderChatId>, number | undefined>>;

export function isForumMessage(message: Message) {
	return (
		message.chat.type === "supergroup" && message.chat.is_forum === true && message.message_thread_id !== undefined
	);
}

export type IsForumMessageResult = Assert<Equal<ReturnType<typeof isForumMessage>, boolean>>;

// Message identifiers and inaccessible messages

export const messageId: MessageId = { message_id: 42 };

export const sentWebAppMessage: SentWebAppMessage = { inline_message_id: "AgAAAPx" };

export const inaccessible: InaccessibleMessage = { chat: supergroup, message_id: 5, date: 0 };

export const maybeInaccessible: MaybeInaccessibleMessage[] = [inaccessible, textMessage, photoMessage];

export type MaybeInaccessibleMembers = Assert<Equal<MaybeInaccessibleMessage, Message | InaccessibleMessage>>;

export type InaccessibleMessageFields = Assert<
	Equal<
		[
			InaccessibleMessage["date"],
			InaccessibleMessage["message_id"],
			MessageId["message_id"],
			SentWebAppMessage["inline_message_id"],
		],
		[0, number, number, string | undefined]
	>
>;

// `date` is a plain number on Message, so `date !== 0` narrows only through a type guard.
export function isAccessible(message: MaybeInaccessibleMessage): message is Message {
	return message.date !== 0;
}

export function readAccessible(message: MaybeInaccessibleMessage) {
	if (isAccessible(message)) {
		expectType<Message>()(message);
		return message.chat.id;
	}
	expectType<InaccessibleMessage>()(message);
	return undefined;
}

export function accessibleText(message: MaybeInaccessibleMessage) {
	if ("text" in message) return message.text;
	return undefined;
}

export type AccessibleTextResult = Assert<Equal<ReturnType<typeof accessibleText>, string | undefined>>;

// @ts-expect-error — an inaccessible message always has date 0
export const inaccessibleWithDate: InaccessibleMessage = { chat: supergroup, message_id: 5, date: 1709251200 };

// Required fields

export type AbstractExternalReplyRequiredFields = Assert<Extends<"origin", RequiredKeys<AbstractExternalReply>>>;
export type AbstractMessageOriginRequiredFields = Assert<Extends<"date" | "type", RequiredKeys<AbstractMessageOrigin>>>;
export type AnimationRequiredFields = Assert<
	Extends<"duration" | "file_id" | "file_unique_id" | "height" | "width", RequiredKeys<Animation>>
>;
export type AudioRequiredFields = Assert<Extends<"duration" | "file_id" | "file_unique_id", RequiredKeys<Audio>>>;
export type ChatBoostAddedRequiredFields = Assert<Extends<"boost_count", RequiredKeys<ChatBoostAdded>>>;
export type ChatSharedRequiredFields = Assert<Extends<"chat_id" | "request_id", RequiredKeys<ChatShared>>>;
export type ContactRequiredFields = Assert<Extends<"first_name" | "phone_number", RequiredKeys<Contact>>>;
export type DiceRequiredFields = Assert<Extends<"emoji" | "value", RequiredKeys<Dice>>>;
export type DocumentRequiredFields = Assert<Extends<"file_id" | "file_unique_id", RequiredKeys<Document>>>;
export type ExternalReplyAnimationRequiredFields = Assert<
	Extends<"animation" | "origin", RequiredKeys<ExternalReplyAnimation>>
>;
export type ExternalReplyAudioRequiredFields = Assert<Extends<"audio" | "origin", RequiredKeys<ExternalReplyAudio>>>;
export type ExternalReplyContactRequiredFields = Assert<
	Extends<"contact" | "origin", RequiredKeys<ExternalReplyContact>>
>;
export type ExternalReplyDiceRequiredFields = Assert<Extends<"dice" | "origin", RequiredKeys<ExternalReplyDice>>>;
export type ExternalReplyDocumentRequiredFields = Assert<
	Extends<"document" | "origin", RequiredKeys<ExternalReplyDocument>>
>;
export type ExternalReplyGameRequiredFields = Assert<Extends<"game" | "origin", RequiredKeys<ExternalReplyGame>>>;
export type ExternalReplyGiveawayRequiredFields = Assert<
	Extends<"giveaway" | "origin", RequiredKeys<ExternalReplyGiveaway>>
>;
export type ExternalReplyGiveawayWinnersRequiredFields = Assert<
	Extends<"giveaway_winners" | "origin", RequiredKeys<ExternalReplyGiveawayWinners>>
>;
export type ExternalReplyInvoiceRequiredFields = Assert<
	Extends<"invoice" | "origin", RequiredKeys<ExternalReplyInvoice>>
>;
export type ExternalReplyLocationRequiredFields = Assert<
	Extends<"location" | "origin", RequiredKeys<ExternalReplyLocation>>
>;
export type ExternalReplyPhotoRequiredFields = Assert<Extends<"origin" | "photo", RequiredKeys<ExternalReplyPhoto>>>;
export type ExternalReplyPollRequiredFields = Assert<Extends<"origin" | "poll", RequiredKeys<ExternalReplyPoll>>>;
export type ExternalReplyStickerRequiredFields = Assert<
	Extends<"origin" | "sticker", RequiredKeys<ExternalReplySticker>>
>;
export type ExternalReplyStoryRequiredFields = Assert<Extends<"origin" | "story", RequiredKeys<ExternalReplyStory>>>;
export type ExternalReplyVenueRequiredFields = Assert<Extends<"origin" | "venue", RequiredKeys<ExternalReplyVenue>>>;
export type ExternalReplyVideoRequiredFields = Assert<Extends<"origin" | "video", RequiredKeys<ExternalReplyVideo>>>;
export type ExternalReplyVideoNoteRequiredFields = Assert<
	Extends<"origin" | "video_note", RequiredKeys<ExternalReplyVideoNote>>
>;
export type ExternalReplyVoiceRequiredFields = Assert<Extends<"origin" | "voice", RequiredKeys<ExternalReplyVoice>>>;
export type ForumTopicCreatedRequiredFields = Assert<Extends<"icon_color" | "name", RequiredKeys<ForumTopicCreated>>>;
export type GameRequiredFields = Assert<Extends<"description" | "photo" | "title", RequiredKeys<Game>>>;
export type GameHighScoreRequiredFields = Assert<Extends<"position" | "score" | "user", RequiredKeys<GameHighScore>>>;
export type GiveawayRequiredFields = Assert<
	Extends<"chats" | "winner_count" | "winners_selection_date", RequiredKeys<Giveaway>>
>;
export type GiveawayCompletedRequiredFields = Assert<Extends<"winner_count", RequiredKeys<GiveawayCompleted>>>;
export type GiveawayWinnersRequiredFields = Assert<
	Extends<
		"chat" | "giveaway_message_id" | "winner_count" | "winners" | "winners_selection_date",
		RequiredKeys<GiveawayWinners>
	>
>;
export type InaccessibleMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id", RequiredKeys<InaccessibleMessage>>
>;
export type LocationCommonLocationRequiredFields = Assert<
	Extends<"latitude" | "longitude", RequiredKeys<Location.CommonLocation>>
>;
export type LocationLiveLocationRequiredFields = Assert<
	Extends<"heading" | "latitude" | "live_period" | "longitude", RequiredKeys<Location.LiveLocation>>
>;
export type MaskPositionRequiredFields = Assert<
	Extends<"point" | "scale" | "x_shift" | "y_shift", RequiredKeys<MaskPosition>>
>;
export type MessageAnimationMessageRequiredFields = Assert<
	Extends<"animation" | "chat" | "date" | "document" | "message_id", RequiredKeys<Message.AnimationMessage>>
>;
export type MessageAudioMessageRequiredFields = Assert<
	Extends<"audio" | "chat" | "date" | "message_id", RequiredKeys<Message.AudioMessage>>
>;
export type MessageBoostAddedMessageRequiredFields = Assert<
	Extends<"boost_added" | "chat" | "date" | "message_id", RequiredKeys<Message.BoostAddedMessage>>
>;
export type MessageCaptionableMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id", RequiredKeys<Message.CaptionableMessage>>
>;
export type MessageChannelChatCreatedMessageRequiredFields = Assert<
	Extends<"channel_chat_created" | "chat" | "date" | "message_id", RequiredKeys<Message.ChannelChatCreatedMessage>>
>;
export type MessageChatSharedMessageRequiredFields = Assert<
	Extends<"chat" | "chat_shared" | "date" | "message_id", RequiredKeys<Message.ChatSharedMessage>>
>;
export type MessageCommonMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id", RequiredKeys<Message.CommonMessage>>
>;
export type MessageConnectedWebsiteMessageRequiredFields = Assert<
	Extends<"chat" | "connected_website" | "date" | "message_id", RequiredKeys<Message.ConnectedWebsiteMessage>>
>;
export type MessageContactMessageRequiredFields = Assert<
	Extends<"chat" | "contact" | "date" | "message_id", RequiredKeys<Message.ContactMessage>>
>;
export type MessageDeleteChatPhotoMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "delete_chat_photo" | "message_id", RequiredKeys<Message.DeleteChatPhotoMessage>>
>;
export type MessageDiceMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "dice" | "message_id", RequiredKeys<Message.DiceMessage>>
>;
export type MessageDocumentMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "document" | "message_id", RequiredKeys<Message.DocumentMessage>>
>;
export type MessageForumTopicClosedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "forum_topic_closed" | "message_id", RequiredKeys<Message.ForumTopicClosedMessage>>
>;
export type MessageForumTopicCreatedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "forum_topic_created" | "message_id", RequiredKeys<Message.ForumTopicCreatedMessage>>
>;
export type MessageForumTopicEditedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "forum_topic_edited" | "message_id", RequiredKeys<Message.ForumTopicEditedMessage>>
>;
export type MessageForumTopicReopenedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "forum_topic_reopened" | "message_id", RequiredKeys<Message.ForumTopicReopenedMessage>>
>;
export type MessageGameMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "game" | "message_id", RequiredKeys<Message.GameMessage>>
>;
export type MessageGeneralForumTopicHiddenMessageRequiredFields = Assert<
	Extends<
		"chat" | "date" | "general_forum_topic_hidden" | "message_id",
		RequiredKeys<Message.GeneralForumTopicHiddenMessage>
	>
>;
export type MessageGeneralForumTopicUnhiddenMessageRequiredFields = Assert<
	Extends<
		"chat" | "date" | "general_forum_topic_unhidden" | "message_id",
		RequiredKeys<Message.GeneralForumTopicUnhiddenMessage>
	>
>;
export type MessageGiveawayCompletedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "giveaway_completed" | "message_id", RequiredKeys<Message.GiveawayCompletedMessage>>
>;
export type MessageGiveawayCreatedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "giveaway_created" | "message_id", RequiredKeys<Message.GiveawayCreatedMessage>>
>;
export type MessageGiveawayMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "giveaway" | "message_id", RequiredKeys<Message.GiveawayMessage>>
>;
export type MessageGiveawayWinnersMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "giveaway_winners" | "message_id", RequiredKeys<Message.GiveawayWinnersMessage>>
>;
export type MessageGroupChatCreatedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "group_chat_created" | "message_id", RequiredKeys<Message.GroupChatCreatedMessage>>
>;
export type MessageInvoiceMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "invoice" | "message_id", RequiredKeys<Message.InvoiceMessage>>
>;
export type MessageLeftChatMemberMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "left_chat_member" | "message_id", RequiredKeys<Message.LeftChatMemberMessage>>
>;
export type MessageLocationMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "location" | "message_id", RequiredKeys<Message.LocationMessage>>
>;
export type MessageMediaMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id", RequiredKeys<Message.MediaMessage>>
>;
export type MessageMessageAutoDeleteTimerChangedMessageRequiredFields = Assert<
	Extends<
		"chat" | "date" | "message_auto_delete_timer_changed" | "message_id",
		RequiredKeys<Message.MessageAutoDeleteTimerChangedMessage>
	>
>;
export type MessageMigrateFromChatIdMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "migrate_from_chat_id", RequiredKeys<Message.MigrateFromChatIdMessage>>
>;
export type MessageMigrateToChatIdMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "migrate_to_chat_id", RequiredKeys<Message.MigrateToChatIdMessage>>
>;
export type MessageNewChatMembersMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "new_chat_members", RequiredKeys<Message.NewChatMembersMessage>>
>;
export type MessageNewChatPhotoMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "new_chat_photo", RequiredKeys<Message.NewChatPhotoMessage>>
>;
export type MessageNewChatTitleMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "new_chat_title", RequiredKeys<Message.NewChatTitleMessage>>
>;
export type MessagePassportDataMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "passport_data", RequiredKeys<Message.PassportDataMessage>>
>;
export type MessagePhotoMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "photo", RequiredKeys<Message.PhotoMessage>>
>;
export type MessagePinnedMessageMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "pinned_message", RequiredKeys<Message.PinnedMessageMessage>>
>;
export type MessagePollMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "poll", RequiredKeys<Message.PollMessage>>
>;
export type MessageProximityAlertTriggeredMessageRequiredFields = Assert<
	Extends<
		"chat" | "date" | "message_id" | "proximity_alert_triggered",
		RequiredKeys<Message.ProximityAlertTriggeredMessage>
	>
>;
export type MessageServiceMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id", RequiredKeys<Message.ServiceMessage>>
>;
export type MessageStickerMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "sticker", RequiredKeys<Message.StickerMessage>>
>;
export type MessageStoryMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "story", RequiredKeys<Message.StoryMessage>>
>;
export type MessageSuccessfulPaymentMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "successful_payment", RequiredKeys<Message.SuccessfulPaymentMessage>>
>;
export type MessageSupergroupChatCreatedRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "supergroup_chat_created", RequiredKeys<Message.SupergroupChatCreated>>
>;
export type MessageTextMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "text", RequiredKeys<Message.TextMessage>>
>;
export type MessageUsersSharedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "users_shared", RequiredKeys<Message.UsersSharedMessage>>
>;
export type MessageVenueMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "location" | "message_id" | "venue", RequiredKeys<Message.VenueMessage>>
>;
export type MessageVideoChatEndedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "video_chat_ended", RequiredKeys<Message.VideoChatEndedMessage>>
>;
export type MessageVideoChatParticipantsInvitedMessageRequiredFields = Assert<
	Extends<
		"chat" | "date" | "message_id" | "video_chat_participants_invited",
		RequiredKeys<Message.VideoChatParticipantsInvitedMessage>
	>
>;
export type MessageVideoChatScheduledMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "video_chat_scheduled", RequiredKeys<Message.VideoChatScheduledMessage>>
>;
export type MessageVideoChatStartedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "video_chat_started", RequiredKeys<Message.VideoChatStartedMessage>>
>;
export type MessageVideoMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "video", RequiredKeys<Message.VideoMessage>>
>;
export type MessageVideoNoteMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "video_note", RequiredKeys<Message.VideoNoteMessage>>
>;
export type MessageVoiceMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "voice", RequiredKeys<Message.VoiceMessage>>
>;
export type MessageWebAppDataMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "web_app_data", RequiredKeys<Message.WebAppDataMessage>>
>;
export type MessageWriteAccessAllowedMessageRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "write_access_allowed", RequiredKeys<Message.WriteAccessAllowedMessage>>
>;
export type MessageAutoDeleteTimerChangedRequiredFields = Assert<
	Extends<"message_auto_delete_time", RequiredKeys<MessageAutoDeleteTimerChanged>>
>;
export type MessageEntityAbstractMessageEntityRequiredFields = Assert<
	Extends<"length" | "offset" | "type", RequiredKeys<MessageEntity.AbstractMessageEntity>>
>;
export type MessageEntityCommonMessageEntityRequiredFields = Assert<
	Extends<"length" | "offset" | "type", RequiredKeys<MessageEntity.CommonMessageEntity>>
>;
export type MessageEntityCustomEmojiMessageEntityRequiredFields = Assert<
	Extends<"custom_emoji_id" | "length" | "offset" | "type", RequiredKeys<MessageEntity.CustomEmojiMessageEntity>>
>;
export type MessageEntityPreMessageEntityRequiredFields = Assert<
	Extends<"length" | "offset" | "type", RequiredKeys<MessageEntity.PreMessageEntity>>
>;
export type MessageEntityTextLinkMessageEntityRequiredFields = Assert<
	Extends<"length" | "offset" | "type" | "url", RequiredKeys<MessageEntity.TextLinkMessageEntity>>
>;
export type MessageEntityTextMentionMessageEntityRequiredFields = Assert<
	Extends<"length" | "offset" | "type" | "user", RequiredKeys<MessageEntity.TextMentionMessageEntity>>
>;
export type MessageIdRequiredFields = Assert<Extends<"message_id", RequiredKeys<MessageId>>>;
export type MessageOriginChannelRequiredFields = Assert<
	Extends<"chat" | "message_id" | "type", RequiredKeys<MessageOriginChannel>>
>;
export type MessageOriginChatRequiredFields = Assert<Extends<"sender_chat" | "type", RequiredKeys<MessageOriginChat>>>;
export type MessageOriginHiddenUserRequiredFields = Assert<
	Extends<"sender_user_name" | "type", RequiredKeys<MessageOriginHiddenUser>>
>;
export type MessageOriginUserRequiredFields = Assert<Extends<"sender_user" | "type", RequiredKeys<MessageOriginUser>>>;
export type PhotoSizeRequiredFields = Assert<
	Extends<"file_id" | "file_unique_id" | "height" | "width", RequiredKeys<PhotoSize>>
>;
export type PollRequiredFields = Assert<
	Extends<
		| "allows_multiple_answers"
		| "id"
		| "is_anonymous"
		| "is_closed"
		| "options"
		| "question"
		| "total_voter_count"
		| "type",
		RequiredKeys<Poll>
	>
>;
export type PollAnswerRequiredFields = Assert<Extends<"option_ids" | "poll_id", RequiredKeys<PollAnswer>>>;
export type PollOptionRequiredFields = Assert<Extends<"text" | "voter_count", RequiredKeys<PollOption>>>;
export type ProximityAlertTriggeredRequiredFields = Assert<
	Extends<"distance" | "traveler" | "watcher", RequiredKeys<ProximityAlertTriggered>>
>;
export type ReplyParametersRequiredFields = Assert<Extends<"message_id", RequiredKeys<ReplyParameters>>>;
export type StickerRequiredFields = Assert<
	Extends<
		"file_id" | "file_unique_id" | "height" | "is_animated" | "is_video" | "type" | "width",
		RequiredKeys<Sticker>
	>
>;
export type StickerSetRequiredFields = Assert<
	Extends<"name" | "sticker_type" | "stickers" | "title", RequiredKeys<StickerSet>>
>;
export type StoryRequiredFields = Assert<Extends<"chat" | "id", RequiredKeys<Story>>>;
export type TextQuoteRequiredFields = Assert<Extends<"position" | "text", RequiredKeys<TextQuote>>>;
export type UsersSharedRequiredFields = Assert<Extends<"request_id" | "users", RequiredKeys<UsersShared>>>;
export type VenueRequiredFields = Assert<Extends<"address" | "location" | "title", RequiredKeys<Venue>>>;
export type VideoRequiredFields = Assert<
	Extends<"duration" | "file_id" | "file_unique_id" | "height" | "width", RequiredKeys<Video>>
>;
export type VideoChatEndedRequiredFields = Assert<Extends<"duration", RequiredKeys<VideoChatEnded>>>;
export type VideoChatParticipantsInvitedRequiredFields = Assert<
	Extends<"users", RequiredKeys<VideoChatParticipantsInvited>>
>;
export type VideoChatScheduledRequiredFields = Assert<Extends<"start_date", RequiredKeys<VideoChatScheduled>>>;
export type VideoNoteRequiredFields = Assert<
	Extends<"duration" | "file_id" | "file_unique_id" | "length", RequiredKeys<VideoNote>>
>;
export type VoiceRequiredFields = Assert<Extends<"duration" | "file_id" | "file_unique_id", RequiredKeys<Voice>>>;
export type WebAppDataRequiredFields = Assert<Extends<"button_text" | "data", RequiredKeys<WebAppData>>>;
