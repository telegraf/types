import type {
	AbstractChatBoostSource,
	AbstractChatMember,
	AbstractReactionType,
	BotCommand,
	Chat,
	ChatAdministratorRights,
	ChatBoost,
	ChatBoostRemoved,
	ChatBoostSourceGiftCode,
	ChatBoostSourceGiveaway,
	ChatBoostSourcePremium,
	ChatBoostUpdated,
	ChatFromGetChat,
	ChatInviteLink,
	ChatJoinRequest,
	ChatLocation,
	ChatMember,
	ChatMemberAdministrator,
	ChatMemberBanned,
	ChatMemberLeft,
	ChatMemberMember,
	ChatMemberOwner,
	ChatMemberRestricted,
	ChatMemberUpdated,
	ChatPermissions,
	ChatPhoto,
	File,
	ForumTopic,
	MessageReactionCountUpdated,
	MessageReactionUpdated,
	ReactionCount,
	ReactionType,
	ReactionTypeCustomEmoji,
	ReactionTypeEmoji,
	TelegramEmoji,
	User,
	UserChatBoosts,
	UserFromGetMe,
	UserProfilePhotos,
	WebhookInfo,
} from "../manage.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Users

export const user: User = {
	id: 123456789,
	is_bot: false,
	first_name: "Erika",
	last_name: "Mustermann",
	username: "erika",
	language_code: "de",
	is_premium: true,
	added_to_attachment_menu: true,
};

export const bot: UserFromGetMe = {
	id: 987654321,
	is_bot: true,
	first_name: "Weather Bot",
	username: "weather_bot",
	can_join_groups: true,
	can_read_all_group_messages: false,
	supports_inline_queries: true,
};

export type UserFields = Assert<
	Equal<
		[User["id"], User["is_bot"], User["first_name"], User["last_name"], User["username"], User["is_premium"]],
		[number, boolean, string, string | undefined, string | undefined, true | undefined]
	>
>;

export type UserFromGetMeFields = Assert<
	Equal<
		[
			UserFromGetMe["is_bot"],
			UserFromGetMe["username"],
			UserFromGetMe["can_join_groups"],
			UserFromGetMe["can_read_all_group_messages"],
			UserFromGetMe["supports_inline_queries"],
		],
		[true, string, boolean, boolean, boolean]
	>
>;

export type UserFromGetMeIsUser = Assert<Extends<UserFromGetMe, User>>;

// @ts-expect-error — getMe always returns the bot's username
export const botWithoutUsername: UserFromGetMe = {
	id: 987654321,
	is_bot: true,
	first_name: "Weather Bot",
	can_join_groups: true,
	can_read_all_group_messages: false,
	supports_inline_queries: true,
};

// @ts-expect-error — a user needs first_name
export const userWithoutName: User = { id: 1, is_bot: false };

// Chats

export const privateChat: Chat.PrivateChat = {
	id: 123456789,
	type: "private",
	first_name: "Erika",
	last_name: "Mustermann",
	username: "erika",
};

export const groupChat: Chat.GroupChat = { id: -4012345678, type: "group", title: "Family" };

export const supergroupChat: Chat.SupergroupChat = {
	id: -1001234567890,
	type: "supergroup",
	title: "Weather fans",
	username: "weather_fans",
	is_forum: true,
};

export const channelChat: Chat.ChannelChat = {
	id: -1009876543210,
	type: "channel",
	title: "Weather news",
	username: "weather_news",
};

export const chats: Chat[] = [privateChat, groupChat, supergroupChat, channelChat];

export type ChatType = Assert<Equal<Chat["type"], "private" | "group" | "supergroup" | "channel">>;

export type AbstractChatKeys = Assert<Equal<keyof Chat.AbstractChat, "id" | "type">>;

export type ChatsAreAbstractChats = Assert<Extends<Chat, Chat.AbstractChat>>;

export type UserNameChatKeys = Assert<Equal<keyof Chat.UserNameChat, "username">>;

export type TitleChatKeys = Assert<Equal<keyof Chat.TitleChat, "title">>;

export type UserNameChats = Assert<
	Extends<Chat.PrivateChat | Chat.SupergroupChat | Chat.ChannelChat, Chat.UserNameChat>
>;

export type TitleChats = Assert<Extends<Chat.GroupChat | Chat.SupergroupChat | Chat.ChannelChat, Chat.TitleChat>>;

export function chatTitle(chat: Chat) {
	if (chat.type === "private") return chat.first_name;
	return chat.title;
}

export type ChatTitleResult = Assert<Equal<ReturnType<typeof chatTitle>, string>>;

export function forumOf(chat: Chat) {
	if (chat.type === "supergroup") return chat;
	return undefined;
}

export type ForumOfNarrowing = Assert<Equal<ReturnType<typeof forumOf>, Chat.SupergroupChat | undefined>>;

export function titledChat(chat: Chat) {
	if ("title" in chat) return chat;
	return undefined;
}

export type TitledChatNarrowing = Assert<
	Equal<ReturnType<typeof titledChat>, Chat.GroupChat | Chat.SupergroupChat | Chat.ChannelChat | undefined>
>;

export const privateChatWithTitle: Chat = {
	id: 1,
	type: "private",
	first_name: "Erika",
	// @ts-expect-error — private chats have no title, and `type` discriminates the union
	title: "Erika",
};

export const secretChat: Chat = {
	id: 1,
	// @ts-expect-error — "secret" is not a chat type
	type: "secret",
	first_name: "Erika",
};

// @ts-expect-error — a group needs its title
export const groupWithoutTitle: Chat.GroupChat = { id: -4012345678, type: "group" };

// Chats from getChat

export const chatPhoto: ChatPhoto = {
	small_file_id: "AQADAgATsmall",
	small_file_unique_id: "AQADsmall",
	big_file_id: "AQADAgATbig",
	big_file_unique_id: "AQADbig",
};

export const permissions: ChatPermissions = {
	can_send_messages: true,
	can_send_audios: true,
	can_send_documents: true,
	can_send_photos: true,
	can_send_videos: true,
	can_send_video_notes: true,
	can_send_voice_notes: true,
	can_send_polls: true,
	can_send_other_messages: true,
	can_add_web_page_previews: true,
	can_change_info: false,
	can_invite_users: true,
	can_pin_messages: false,
	can_manage_topics: false,
};

export const chatLocation: ChatLocation = {
	location: { latitude: 52.52, longitude: 13.405 },
	address: "Berlin, Germany",
};

export const privateGetChat: Chat.PrivateGetChat = {
	...privateChat,
	photo: chatPhoto,
	active_usernames: ["erika"],
	accent_color_id: 3,
	background_custom_emoji_id: "5368324170671202286",
	emoji_status_custom_emoji_id: "5368324170671202286",
	emoji_status_expiration_date: 1735689600,
	bio: "Likes rain",
	has_private_forwards: true,
	has_restricted_voice_and_video_messages: true,
	message_auto_delete_time: 86400,
};

export const groupGetChat: Chat.GroupGetChat = {
	...groupChat,
	photo: chatPhoto,
	description: "Family chat",
	invite_link: "https://t.me/+AbCdEfGhIjK",
	permissions,
	available_reactions: [{ type: "emoji", emoji: "👍" }],
	has_protected_content: true,
};

export const supergroupGetChat: Chat.SupergroupGetChat = {
	...supergroupChat,
	active_usernames: ["weather_fans"],
	description: "Talk about the weather",
	permissions,
	can_set_sticker_set: true,
	linked_chat_id: -1009876543210,
	join_to_send_messages: true,
	join_by_request: true,
	slow_mode_delay: 30,
	unrestrict_boost_count: 2,
	has_aggressive_anti_spam_enabled: true,
	has_visible_history: true,
	sticker_set_name: "weather_stickers",
	custom_emoji_sticker_set_name: "weather_emoji",
	location: chatLocation,
};

export const channelGetChat: Chat.ChannelGetChat = {
	...channelChat,
	active_usernames: ["weather_news"],
	accent_color_id: 5,
	profile_accent_color_id: 2,
	profile_background_custom_emoji_id: "5368324170671202286",
	description: "Daily forecasts",
	linked_chat_id: -1001234567890,
};

export const chatsFromGetChat: ChatFromGetChat[] = [privateGetChat, groupGetChat, supergroupGetChat, channelGetChat];

export type GetChatKeys = Assert<
	Equal<keyof Chat.GetChat, "photo" | "pinned_message" | "message_auto_delete_time" | "has_protected_content">
>;

export type NonGroupGetChatKeys = Assert<
	Equal<Exclude<keyof Chat.NonGroupGetChat, keyof Chat.GetChat>, "active_usernames">
>;

export type NonPrivateGetChatKeys = Assert<
	Equal<
		Exclude<keyof Chat.NonPrivateGetChat, keyof Chat.GetChat>,
		"available_reactions" | "description" | "invite_link"
	>
>;

export type AnyGroupGetChatKeys = Assert<
	Equal<Exclude<keyof Chat.AnyGroupGetChat, keyof Chat.NonPrivateGetChat>, "permissions" | "can_set_sticker_set">
>;

export type PrivateAndChannelGetChatKeys = Assert<
	Equal<
		keyof Chat.PrivateAndChannelGetChat,
		"accent_color_id" | "background_custom_emoji_id" | "emoji_status_custom_emoji_id" | "emoji_status_expiration_date"
	>
>;

export type LargeGetChatKeys = Assert<
	Equal<Exclude<keyof Chat.LargeGetChat, keyof Chat.NonPrivateGetChat>, "linked_chat_id">
>;

export type GetChatsExtendChats = Assert<
	Equal<
		[
			Extends<Chat.PrivateGetChat, Chat.PrivateChat & Chat.NonGroupGetChat & Chat.PrivateAndChannelGetChat>,
			Extends<Chat.GroupGetChat, Chat.GroupChat & Chat.AnyGroupGetChat>,
			Extends<Chat.SupergroupGetChat, Chat.SupergroupChat & Chat.AnyGroupGetChat & Chat.LargeGetChat>,
			Extends<Chat.ChannelGetChat, Chat.ChannelChat & Chat.LargeGetChat & Chat.PrivateAndChannelGetChat>,
		],
		[true, true, true, true]
	>
>;

export type GetChatFields = Assert<
	Equal<
		[
			Chat.PrivateGetChat["accent_color_id"],
			Chat.PrivateGetChat["bio"],
			Chat.SupergroupGetChat["slow_mode_delay"],
			Chat.SupergroupGetChat["location"],
			Chat.ChannelGetChat["linked_chat_id"],
			Chat.GroupGetChat["permissions"],
		],
		[
			number,
			string | undefined,
			number | undefined,
			ChatLocation | undefined,
			number | undefined,
			ChatPermissions | undefined,
		]
	>
>;

export function chatDescription(chat: ChatFromGetChat) {
	if (chat.type === "private") return chat.bio;
	return chat.description;
}

export type ChatDescriptionResult = Assert<Equal<ReturnType<typeof chatDescription>, string | undefined>>;

export function slowMode(chat: ChatFromGetChat) {
	if (chat.type === "supergroup") return chat;
	return undefined;
}

export type SlowModeNarrowing = Assert<Equal<ReturnType<typeof slowMode>, Chat.SupergroupGetChat | undefined>>;

// @ts-expect-error — getChat always returns accent_color_id for private chats
export const privateGetChatWithoutAccent: Chat.PrivateGetChat = { id: 1, type: "private", first_name: "Erika" };

export const groupGetChatWithBio: Chat.GroupGetChat = {
	...groupChat,
	// @ts-expect-error — only private chats have a bio
	bio: "Family",
};

// Profile photos and files

export const profilePhotos: UserProfilePhotos = {
	total_count: 1,
	photos: [
		[
			{ file_id: "AgACAgsmall", file_unique_id: "AQADsmall", width: 160, height: 160, file_size: 8192 },
			{ file_id: "AgACAgbig", file_unique_id: "AQADbig", width: 640, height: 640, file_size: 65536 },
		],
	],
};

export const file: File = {
	file_id: "BQACAgIAAxkBAAI",
	file_unique_id: "AgADBAAD",
	file_size: 102400,
	file_path: "documents/file_1.pdf",
};

export function downloadPath(f: File) {
	return f.file_path;
}

export type DownloadPathResult = Assert<Equal<ReturnType<typeof downloadPath>, string | undefined>>;

export type FileFields = Assert<
	Equal<[File["file_id"], File["file_unique_id"], File["file_size"]], [string, string, number | undefined]>
>;

export type ChatPhotoFields = Assert<Equal<ChatPhoto["big_file_unique_id"], string>>;

export type UserProfilePhotosFields = Assert<Equal<UserProfilePhotos["total_count"], number>>;

// Webhook

export const webhookInfo: WebhookInfo = {
	url: "https://example.com/telegram",
	has_custom_certificate: false,
	pending_update_count: 3,
	ip_address: "203.0.113.10",
	last_error_date: 1709251200,
	last_error_message: "Connection timed out",
	last_synchronization_error_date: 1709251100,
	max_connections: 40,
	allowed_updates: ["message", "callback_query"],
};

export const pollingWebhookInfo: WebhookInfo = { url: "", has_custom_certificate: false, pending_update_count: 0 };

export type WebhookInfoFields = Assert<
	Equal<
		[WebhookInfo["url"], WebhookInfo["pending_update_count"], WebhookInfo["allowed_updates"]],
		[string | undefined, number, string[] | undefined]
	>
>;

// Invite links and join requests

export const inviteLink: ChatInviteLink = {
	invite_link: "https://t.me/+AbCdEfGhIjK",
	creator: user,
	creates_join_request: true,
	is_primary: false,
	is_revoked: false,
	name: "Newsletter",
	expire_date: 1735689600,
	pending_join_request_count: 4,
};

export const joinRequest: ChatJoinRequest = {
	chat: supergroupChat,
	from: user,
	user_chat_id: 123456789,
	date: 1709251200,
	bio: "Likes rain",
	invite_link: inviteLink,
};

export type InviteLinkFields = Assert<
	Equal<
		[ChatInviteLink["creator"], ChatInviteLink["is_primary"], ChatInviteLink["member_limit"]],
		[User, boolean, number | undefined]
	>
>;

export type JoinRequestChat = Assert<Equal<ChatJoinRequest["chat"], Chat.SupergroupChat | Chat.ChannelChat>>;

export const joinRequestToGroup: ChatJoinRequest = {
	// @ts-expect-error — basic groups don't receive join requests
	chat: groupChat,
	from: user,
	user_chat_id: 123456789,
	date: 1709251200,
};

// Members

export const adminRights: ChatAdministratorRights = {
	is_anonymous: false,
	can_manage_chat: true,
	can_delete_messages: true,
	can_manage_video_chats: true,
	can_restrict_members: true,
	can_promote_members: false,
	can_change_info: true,
	can_invite_users: true,
	can_pin_messages: true,
	can_post_stories: true,
	can_edit_stories: true,
	can_delete_stories: true,
	can_manage_topics: true,
};

export const owner: ChatMemberOwner = { status: "creator", user, is_anonymous: false, custom_title: "Founder" };

export const administrator: ChatMemberAdministrator = {
	status: "administrator",
	user,
	can_be_edited: true,
	...adminRights,
	custom_title: "Moderator",
};

export const member: ChatMemberMember = { status: "member", user };

export const restricted: ChatMemberRestricted = {
	status: "restricted",
	user,
	is_member: true,
	can_send_messages: true,
	can_send_audios: false,
	can_send_documents: false,
	can_send_photos: true,
	can_send_videos: false,
	can_send_video_notes: false,
	can_send_voice_notes: false,
	can_send_polls: false,
	can_send_other_messages: false,
	can_add_web_page_previews: false,
	can_change_info: false,
	can_invite_users: false,
	can_pin_messages: false,
	can_manage_topics: false,
	until_date: 0,
};

export const left: ChatMemberLeft = { status: "left", user };

export const banned: ChatMemberBanned = { status: "kicked", user, until_date: 1735689600 };

export const members: ChatMember[] = [owner, administrator, member, restricted, left, banned];

export type ChatMemberStatus = Assert<
	Equal<ChatMember["status"], "creator" | "administrator" | "member" | "restricted" | "left" | "kicked">
>;

export type AbstractChatMemberFields = Assert<
	Equal<[keyof AbstractChatMember, AbstractChatMember["status"]], ["status" | "user", string]>
>;

export type ChatMembersAreAbstract = Assert<Extends<ChatMember, AbstractChatMember>>;

export function isAdmin(m: ChatMember) {
	if (m.status === "creator" || m.status === "administrator") return m;
	return undefined;
}

export type IsAdminNarrowing = Assert<
	Equal<ReturnType<typeof isAdmin>, ChatMemberOwner | ChatMemberAdministrator | undefined>
>;

export function restrictedUntil(m: ChatMember) {
	switch (m.status) {
		case "restricted":
		case "kicked":
			return m.until_date;
		default:
			return undefined;
	}
}

export type RestrictedUntilNarrowing = Assert<Equal<ReturnType<typeof restrictedUntil>, number | undefined>>;

export function customTitle(m: ChatMember) {
	if ("custom_title" in m) return m;
	return undefined;
}

export type CustomTitleNarrowing = Assert<
	Equal<ReturnType<typeof customTitle>, ChatMemberOwner | ChatMemberAdministrator | undefined>
>;

export type ChatMemberFields = Assert<
	Equal<
		[
			ChatMemberAdministrator["can_be_edited"],
			ChatMemberAdministrator["can_post_messages"],
			ChatMemberRestricted["is_member"],
			ChatMemberRestricted["can_send_photos"],
			ChatMemberBanned["until_date"],
			ChatMemberOwner["is_anonymous"],
			ChatAdministratorRights["can_manage_chat"],
			ChatAdministratorRights["can_manage_topics"],
		],
		[boolean, boolean | undefined, boolean, boolean, number, boolean, boolean, boolean | undefined]
	>
>;

export const memberWithUntilDate: ChatMember = {
	status: "member",
	user,
	// @ts-expect-error — until_date belongs to restricted and banned members, and `status` discriminates the union
	until_date: 0,
};

export const bannedMember: ChatMember = {
	// @ts-expect-error — the API reports banned members as "kicked"
	status: "banned",
	user,
	until_date: 0,
};

// @ts-expect-error — a restricted member lists every permission
export const restrictedWithoutPermissions: ChatMemberRestricted = {
	status: "restricted",
	user,
	is_member: true,
	until_date: 0,
};

export const memberUpdated: ChatMemberUpdated = {
	chat: supergroupChat,
	from: user,
	date: 1709251200,
	old_chat_member: left,
	new_chat_member: member,
	invite_link: inviteLink,
	via_chat_folder_invite_link: false,
};

export function joined(update: ChatMemberUpdated) {
	return update.old_chat_member.status === "left" && update.new_chat_member.status === "member";
}

export type JoinedResult = Assert<Equal<ReturnType<typeof joined>, boolean>>;

// Reactions

export const thumbsUp: TelegramEmoji = "👍";

export const reactionEmojis: TelegramEmoji[] = ["❤", "🔥", "🎉", "🤡", "👨‍💻", "🤷‍♀", "😡"];

// @ts-expect-error — only the emoji Telegram lists can be reactions
export const plainTextReaction: TelegramEmoji = "like";

export const emojiReaction: ReactionTypeEmoji = { type: "emoji", emoji: "👍" };

export const customEmojiReaction: ReactionTypeCustomEmoji = {
	type: "custom_emoji",
	custom_emoji_id: "5368324170671202286",
};

export const reactions: ReactionType[] = [emojiReaction, customEmojiReaction];

export type ReactionTypeType = Assert<Equal<ReactionType["type"], "emoji" | "custom_emoji">>;

export type AbstractReactionTypeFields = Assert<
	Equal<[keyof AbstractReactionType, AbstractReactionType["type"]], ["type", string]>
>;

export type ReactionsAreAbstract = Assert<Extends<ReactionType, AbstractReactionType>>;

export function reactionKey(reaction: ReactionType) {
	if (reaction.type === "emoji") return reaction.emoji;
	return reaction.custom_emoji_id;
}

export type ReactionKeyResult = Assert<Equal<ReturnType<typeof reactionKey>, TelegramEmoji | string>>;

export function emojiOf(reaction: ReactionType) {
	if (reaction.type === "emoji") return reaction;
	return undefined;
}

export type EmojiOfNarrowing = Assert<Equal<ReturnType<typeof emojiOf>, ReactionTypeEmoji | undefined>>;

export const emojiReactionWithId: ReactionType = {
	type: "emoji",
	emoji: "👍",
	// @ts-expect-error — custom_emoji_id belongs to custom emoji reactions
	custom_emoji_id: "5368324170671202286",
};

export const reactionCount: ReactionCount = { type: emojiReaction, total_count: 12 };

export const reactionUpdated: MessageReactionUpdated = {
	chat: supergroupChat,
	message_id: 42,
	user,
	date: 1709251200,
	old_reaction: [],
	new_reaction: [emojiReaction],
};

export const anonymousReactionUpdated: MessageReactionUpdated = {
	chat: channelChat,
	message_id: 42,
	actor_chat: channelChat,
	date: 1709251200,
	old_reaction: [customEmojiReaction],
	new_reaction: [],
};

export const reactionCountUpdated: MessageReactionCountUpdated = {
	chat: channelChat,
	message_id: 42,
	date: 1709251200,
	reactions: [reactionCount],
};

export type ReactionUpdateFields = Assert<
	Equal<
		[
			MessageReactionUpdated["user"],
			MessageReactionUpdated["new_reaction"],
			MessageReactionCountUpdated["reactions"],
			ReactionCount["total_count"],
		],
		[User | undefined, ReactionType[], ReactionCount[], number]
	>
>;

// Topics and commands

export const forumTopic: ForumTopic = {
	message_thread_id: 7,
	name: "Forecasts",
	icon_color: 0x6fb9f0,
	icon_custom_emoji_id: "5368324170671202286",
};

export const command: BotCommand = { command: "forecast", description: "Forecast for a city" };

export type ForumTopicFields = Assert<
	Equal<[ForumTopic["message_thread_id"], ForumTopic["icon_color"]], [number, number]>
>;

// @ts-expect-error — a command needs a description
export const commandWithoutDescription: BotCommand = { command: "forecast" };

// Boosts

export const premiumSource: ChatBoostSourcePremium = { source: "premium", user };

export const giftCodeSource: ChatBoostSourceGiftCode = { source: "gift_code", user };

export const giveawaySource: ChatBoostSourceGiveaway = {
	source: "giveaway",
	giveaway_message_id: 0,
	is_unclaimed: true,
};

export const boost: ChatBoost = {
	boost_id: "boost-1",
	add_date: 1709251200,
	expiration_date: 1711929600,
	source: premiumSource,
};

export const giveawayBoost: ChatBoost = {
	boost_id: "boost-2",
	add_date: 1709251200,
	expiration_date: 1711929600,
	source: { source: "giveaway", giveaway_message_id: 15, user },
};

export const boostUpdated: ChatBoostUpdated = { chat: channelChat, boost };

export const boostRemoved: ChatBoostRemoved = {
	chat: channelChat,
	boost_id: "boost-1",
	remove_date: 1710000000,
	source: giftCodeSource,
};

export const userBoosts: UserChatBoosts = { boosts: [boost, giveawayBoost] };

export type ChatBoostSourceSource = Assert<Equal<ChatBoost["source"]["source"], "premium" | "gift_code" | "giveaway">>;

export type AbstractChatBoostSourceFields = Assert<
	Equal<[keyof AbstractChatBoostSource, AbstractChatBoostSource["source"]], ["source", string]>
>;

export type BoostSourcesAreAbstract = Assert<
	Extends<ChatBoostSourcePremium | ChatBoostSourceGiftCode | ChatBoostSourceGiveaway, AbstractChatBoostSource>
>;

export function booster(b: ChatBoost) {
	if (b.source.source === "giveaway") return b.source.user;
	return b.source.user;
}

export type BoosterResult = Assert<Equal<ReturnType<typeof booster>, User | undefined>>;

export function giveawayOf(b: ChatBoostRemoved) {
	if (b.source.source === "giveaway") return b.source;
	return undefined;
}

export type GiveawayOfNarrowing = Assert<Equal<ReturnType<typeof giveawayOf>, ChatBoostSourceGiveaway | undefined>>;

export type BoostFields = Assert<
	Equal<
		[ChatBoost["boost_id"], ChatBoostRemoved["remove_date"], ChatBoostUpdated["boost"], UserChatBoosts["boosts"]],
		[string, number, ChatBoost, ChatBoost[]]
	>
>;

// @ts-expect-error — a premium boost names its user
export const premiumWithoutUser: ChatBoostSourcePremium = { source: "premium" };

// Required fields

export type AbstractChatBoostSourceRequiredFields = Assert<Extends<"source", RequiredKeys<AbstractChatBoostSource>>>;
export type AbstractChatMemberRequiredFields = Assert<Extends<"status" | "user", RequiredKeys<AbstractChatMember>>>;
export type AbstractReactionTypeRequiredFields = Assert<Extends<"type", RequiredKeys<AbstractReactionType>>>;
export type BotCommandRequiredFields = Assert<Extends<"command" | "description", RequiredKeys<BotCommand>>>;
export type ChatAbstractChatRequiredFields = Assert<Extends<"id" | "type", RequiredKeys<Chat.AbstractChat>>>;
export type ChatChannelChatRequiredFields = Assert<Extends<"id" | "title" | "type", RequiredKeys<Chat.ChannelChat>>>;
export type ChatChannelGetChatRequiredFields = Assert<
	Extends<"accent_color_id" | "id" | "title" | "type", RequiredKeys<Chat.ChannelGetChat>>
>;
export type ChatGroupChatRequiredFields = Assert<Extends<"id" | "title" | "type", RequiredKeys<Chat.GroupChat>>>;
export type ChatGroupGetChatRequiredFields = Assert<Extends<"id" | "title" | "type", RequiredKeys<Chat.GroupGetChat>>>;
export type ChatPrivateAndChannelGetChatRequiredFields = Assert<
	Extends<"accent_color_id", RequiredKeys<Chat.PrivateAndChannelGetChat>>
>;
export type ChatPrivateChatRequiredFields = Assert<
	Extends<"first_name" | "id" | "type", RequiredKeys<Chat.PrivateChat>>
>;
export type ChatPrivateGetChatRequiredFields = Assert<
	Extends<"accent_color_id" | "first_name" | "id" | "type", RequiredKeys<Chat.PrivateGetChat>>
>;
export type ChatSupergroupChatRequiredFields = Assert<
	Extends<"id" | "title" | "type", RequiredKeys<Chat.SupergroupChat>>
>;
export type ChatSupergroupGetChatRequiredFields = Assert<
	Extends<"id" | "title" | "type", RequiredKeys<Chat.SupergroupGetChat>>
>;
export type ChatTitleChatRequiredFields = Assert<Extends<"title", RequiredKeys<Chat.TitleChat>>>;
export type ChatAdministratorRightsRequiredFields = Assert<
	Extends<
		| "can_change_info"
		| "can_delete_messages"
		| "can_invite_users"
		| "can_manage_chat"
		| "can_manage_video_chats"
		| "can_promote_members"
		| "can_restrict_members"
		| "is_anonymous",
		RequiredKeys<ChatAdministratorRights>
	>
>;
export type ChatBoostRequiredFields = Assert<
	Extends<"add_date" | "boost_id" | "expiration_date" | "source", RequiredKeys<ChatBoost>>
>;
export type ChatBoostRemovedRequiredFields = Assert<
	Extends<"boost_id" | "chat" | "remove_date" | "source", RequiredKeys<ChatBoostRemoved>>
>;
export type ChatBoostSourceGiftCodeRequiredFields = Assert<
	Extends<"source" | "user", RequiredKeys<ChatBoostSourceGiftCode>>
>;
export type ChatBoostSourceGiveawayRequiredFields = Assert<
	Extends<"giveaway_message_id" | "source", RequiredKeys<ChatBoostSourceGiveaway>>
>;
export type ChatBoostSourcePremiumRequiredFields = Assert<
	Extends<"source" | "user", RequiredKeys<ChatBoostSourcePremium>>
>;
export type ChatBoostUpdatedRequiredFields = Assert<Extends<"boost" | "chat", RequiredKeys<ChatBoostUpdated>>>;
export type ChatInviteLinkRequiredFields = Assert<
	Extends<
		"creates_join_request" | "creator" | "invite_link" | "is_primary" | "is_revoked",
		RequiredKeys<ChatInviteLink>
	>
>;
export type ChatJoinRequestRequiredFields = Assert<
	Extends<"chat" | "date" | "from" | "user_chat_id", RequiredKeys<ChatJoinRequest>>
>;
export type ChatLocationRequiredFields = Assert<Extends<"address" | "location", RequiredKeys<ChatLocation>>>;
export type ChatMemberAdministratorRequiredFields = Assert<
	Extends<
		| "can_be_edited"
		| "can_change_info"
		| "can_delete_messages"
		| "can_invite_users"
		| "can_manage_chat"
		| "can_manage_video_chats"
		| "can_promote_members"
		| "can_restrict_members"
		| "is_anonymous"
		| "status"
		| "user",
		RequiredKeys<ChatMemberAdministrator>
	>
>;
export type ChatMemberBannedRequiredFields = Assert<
	Extends<"status" | "until_date" | "user", RequiredKeys<ChatMemberBanned>>
>;
export type ChatMemberLeftRequiredFields = Assert<Extends<"status" | "user", RequiredKeys<ChatMemberLeft>>>;
export type ChatMemberMemberRequiredFields = Assert<Extends<"status" | "user", RequiredKeys<ChatMemberMember>>>;
export type ChatMemberOwnerRequiredFields = Assert<
	Extends<"is_anonymous" | "status" | "user", RequiredKeys<ChatMemberOwner>>
>;
export type ChatMemberRestrictedRequiredFields = Assert<
	Extends<
		| "can_add_web_page_previews"
		| "can_change_info"
		| "can_invite_users"
		| "can_manage_topics"
		| "can_pin_messages"
		| "can_send_audios"
		| "can_send_documents"
		| "can_send_messages"
		| "can_send_other_messages"
		| "can_send_photos"
		| "can_send_polls"
		| "can_send_video_notes"
		| "can_send_videos"
		| "can_send_voice_notes"
		| "is_member"
		| "status"
		| "until_date"
		| "user",
		RequiredKeys<ChatMemberRestricted>
	>
>;
export type ChatMemberUpdatedRequiredFields = Assert<
	Extends<"chat" | "date" | "from" | "new_chat_member" | "old_chat_member", RequiredKeys<ChatMemberUpdated>>
>;
export type ChatPhotoRequiredFields = Assert<
	Extends<"big_file_id" | "big_file_unique_id" | "small_file_id" | "small_file_unique_id", RequiredKeys<ChatPhoto>>
>;
export type FileRequiredFields = Assert<Extends<"file_id" | "file_unique_id", RequiredKeys<File>>>;
export type ForumTopicRequiredFields = Assert<
	Extends<"icon_color" | "message_thread_id" | "name", RequiredKeys<ForumTopic>>
>;
export type MessageReactionCountUpdatedRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "reactions", RequiredKeys<MessageReactionCountUpdated>>
>;
export type MessageReactionUpdatedRequiredFields = Assert<
	Extends<"chat" | "date" | "message_id" | "new_reaction" | "old_reaction", RequiredKeys<MessageReactionUpdated>>
>;
export type ReactionCountRequiredFields = Assert<Extends<"total_count" | "type", RequiredKeys<ReactionCount>>>;
export type ReactionTypeCustomEmojiRequiredFields = Assert<
	Extends<"custom_emoji_id" | "type", RequiredKeys<ReactionTypeCustomEmoji>>
>;
export type ReactionTypeEmojiRequiredFields = Assert<Extends<"emoji" | "type", RequiredKeys<ReactionTypeEmoji>>>;
export type UserRequiredFields = Assert<Extends<"first_name" | "id" | "is_bot", RequiredKeys<User>>>;
export type UserChatBoostsRequiredFields = Assert<Extends<"boosts", RequiredKeys<UserChatBoosts>>>;
export type UserFromGetMeRequiredFields = Assert<
	Extends<
		| "can_join_groups"
		| "can_read_all_group_messages"
		| "first_name"
		| "id"
		| "is_bot"
		| "supports_inline_queries"
		| "username",
		RequiredKeys<UserFromGetMe>
	>
>;
export type UserProfilePhotosRequiredFields = Assert<
	Extends<"photos" | "total_count", RequiredKeys<UserProfilePhotos>>
>;
export type WebhookInfoRequiredFields = Assert<
	Extends<"has_custom_certificate" | "pending_update_count", RequiredKeys<WebhookInfo>>
>;
