import type { Location, Message, PhotoSize, Sticker } from "./message.ts";

/** Describes the current status of a webhook. */
export interface WebhookInfo {
  /** Webhook URL, may be empty if webhook is not set up */
  url?: string;
  /** True, if a custom certificate was provided for webhook certificate checks */
  has_custom_certificate: boolean;
  /** Number of updates awaiting delivery */
  pending_update_count: number;
  /** Currently used webhook IP address */
  ip_address?: string;
  /** Unix time for the most recent error that happened when trying to deliver an update via webhook */
  last_error_date?: number;
  /** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
  last_error_message?: string;
  /** Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
  last_synchronization_error_date?: number;
  /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
  max_connections?: number;
  /** A list of update types the bot is subscribed to. Defaults to all update types except chat_member */
  allowed_updates?: string[];
}

/** This object represents a Telegram user or bot. */
export interface User {
  /** Unique identifier for this user or bot. */
  id: number;
  /** True, if this user is a bot */
  is_bot: boolean;
  /** User's or bot's first name */
  first_name: string;
  /** User's or bot's last name */
  last_name?: string;
  /** User's or bot's username */
  username?: string;
  /** IETF language tag of the user's language */
  language_code?: string;
  /** True, if this user is a Telegram Premium user */
  is_premium?: true;
  /** True, if this user added the bot to the attachment menu */
  added_to_attachment_menu?: true;
}

/** This object represents a Telegram user or bot that was returned by `getMe`. */
export interface UserFromGetMe extends User {
  is_bot: true;
  username: string;
  /** True, if the bot can be invited to groups. Returned only in getMe. */
  can_join_groups: boolean;
  /** True, if privacy mode is disabled for the bot. Returned only in getMe. */
  can_read_all_group_messages: boolean;
  /** True, if the bot supports inline queries. Returned only in getMe. */
  supports_inline_queries: boolean;
  /** True, if the bot can be connected to a Telegram Business account to receive its messages. Returned only in getMe. */
  can_connect_to_business?: boolean;
  /** True, if the bot has a main Web App. Returned only in getMe. */
  has_main_web_app?: boolean;
}

export declare namespace Chat {
  /** Internal type representing private chats. */
  export interface PrivateChat {
    /** Unique identifier for this chat. */
    id: number;
    /** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
    type: "private";
    /** Username, for private chats, supergroups and channels if available */
    username?: string;
    /** First name of the other party in a private chat */
    first_name: string;
    /** Last name of the other party in a private chat */
    last_name?: string;
  }

  /** Internal type representing group chats. */
  export interface GroupChat {
    /** Unique identifier for this chat. */
    id: number;
    /** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
    type: "group";
    /** Title, for supergroups, channels and group chats */
    title: string;
    /** Username, for private chats, supergroups and channels if available */
    username?: string;
  }

  /** Internal type representing super group chats. */
  export interface SupergroupChat {
    /** Unique identifier for this chat. */
    id: number;
    /** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
    type: "supergroup";
    /** Username, for private chats, supergroups and channels if available */
    username?: string;
    /** Title, for supergroups, channels and group chats */
    title: string;
    /** True, if the supergroup chat is a forum (has topics enabled) */
    is_forum?: true;
  }

  /** Internal type representing channel chats. */
  export interface ChannelChat {
    /** Unique identifier for this chat. */
    id: number;
    /** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
    type: "channel";
    /** Title, for supergroups, channels and group chats */
    title: string;
    /** Username, for private chats, supergroups and channels if available */
    username?: string;
  }
}

/** This object represents a chat. */
export type Chat =
  | Chat.PrivateChat
  | Chat.GroupChat
  | Chat.SupergroupChat
  | Chat.ChannelChat;

declare namespace ChatFullInfo {
  /** Internal type representing private chats returned from `getChat`. */
  export interface PrivateChat extends Chat.PrivateChat {
    /** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details */
    accent_color_id: number;
    /** The maximum number of reactions that can be set on a message in the chat */
    max_reaction_count: number;
    /** Chat photo */
    photo?: ChatPhoto;
    /** If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
    active_usernames?: string[];
    /** For private chats, the date of birth of the user */
    birthdate?: Birthdate;
    /** For private chats with business accounts, the intro of the business */
    business_intro?: BusinessIntro;
    /** For private chats with business accounts, the location of the business */
    business_location?: BusinessLocation;
    /** For private chats with business accounts, the opening hours of the business */
    business_opening_hours?: BusinessOpeningHours;
    /** For private chats, the personal channel of the user */
    personal_chat?: ChatFullInfo.ChannelChat;
    /** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
    available_reactions?: ReactionType[];
    /** Custom emoji identifier of emoji chosen by the chat for the reply header and link preview background */
    background_custom_emoji_id?: string;
    /** Identifier of the accent color for the chat's profile background. See profile accent colors for more details. */
    profile_accent_color_id?: number;
    /** Custom emoji identifier of the emoji chosen by the chat for its profile background */
    profile_background_custom_emoji_id?: string;
    /** Custom emoji identifier of emoji status of the other party in a private chat */
    emoji_status_custom_emoji_id?: string;
    /** Expiration date of the emoji status of the other party in a private chat in Unix time, if any */
    emoji_status_expiration_date?: number;
    /** Bio of the other party in a private chat */
    bio?: string;
    /** True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user */
    has_private_forwards?: true;
    /** True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat */
    has_restricted_voice_and_video_messages?: true;
    /** The most recent pinned message (by sending date) */
    pinned_message?: Message;
    /** The time after which all messages sent to the chat will be automatically deleted; in seconds */
    message_auto_delete_time?: number;
    /** True, if messages from the chat can't be forwarded to other chats */
    has_protected_content?: true;
  }
  /** Internal type representing group chats returned from `getChat`. */
  export interface GroupChat extends Chat.GroupChat {
    /** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details */
    accent_color_id: number;
    /** The maximum number of reactions that can be set on a message in the chat */
    max_reaction_count: number;
    /** Chat photo */
    photo?: ChatPhoto;
    /** If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
    active_usernames?: string[];
    /** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed */
    available_reactions?: ReactionType[];
    /** Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
    background_custom_emoji_id?: string;
    /** Identifier of the accent color for the chat's profile background. See profile accent colors for more details */
    profile_accent_color_id?: number;
    /** Custom emoji identifier of the emoji chosen by the chat for its profile background */
    profile_background_custom_emoji_id?: string;
    /** Custom emoji identifier of the emoji status of the chat or the other party in a private chat */
    emoji_status_custom_emoji_id?: string;
    /** Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any */
    emoji_status_expiration_date?: number;
    /** Description, for groups, supergroups and channel chats */
    description?: string;
    /** Primary invite link, for groups, supergroups and channel chats */
    invite_link?: string;
    /** The most recent pinned message (by sending date) */
    pinned_message?: Message;
    /** Default chat member permissions, for groups and supergroups */
    permissions?: ChatPermissions;
    /** The time after which all messages sent to the chat will be automatically deleted; in seconds */
    message_auto_delete_time?: number;
    /** True, if non-administrators can only get the list of bots and administrators in the chat */
    has_hidden_members?: true;
    /** True, if messages from the chat can't be forwarded to other chats */
    has_protected_content?: true;
    /** True, if new chat members will have access to old messages; available only to chat administrators */
    has_visible_history?: true;
    /** True, if the bot can change the group sticker set */
    can_set_sticker_set?: true;
  }
  /** Internal type representing supergroup chats returned from `getChat`. */
  export interface SupergroupChat extends Chat.SupergroupChat {
    /** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details */
    accent_color_id: number;
    /** The maximum number of reactions that can be set on a message in the chat */
    max_reaction_count: number;
    /** Chat photo */
    photo?: ChatPhoto;
    /** If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
    active_usernames?: string[];
    /** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed */
    available_reactions?: ReactionType[];
    /** Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
    background_custom_emoji_id?: string;
    /** Identifier of the accent color for the chat's profile background. See profile accent colors for more details */
    profile_accent_color_id?: number;
    /** Custom emoji identifier of the emoji chosen by the chat for its profile background */
    profile_background_custom_emoji_id?: string;
    /** True, if users need to join the supergroup before they can send messages */
    join_to_send_messages?: true;
    /** True, if all users directly joining the supergroup need to be approved by supergroup administrators */
    join_by_request?: true;
    /** Description, for groups, supergroups and channel chats */
    description?: string;
    /** Primary invite link, for groups, supergroups and channel chats */
    invite_link?: string;
    /** The most recent pinned message (by sending date) */
    pinned_message?: Message;
    /** Default chat member permissions, for groups and supergroups */
    permissions?: ChatPermissions;
    /** True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats. */
    can_send_paid_media?: true;
    /** For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user; in seconds */
    slow_mode_delay?: number;
    /** For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions */
    unrestrict_boost_count?: number;
    /** The time after which all messages sent to the chat will be automatically deleted; in seconds */
    message_auto_delete_time?: number;
    /** True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators */
    has_aggressive_anti_spam_enabled?: true;
    /** True, if non-administrators can only get the list of bots and administrators in the chat */
    has_hidden_members?: true;
    /** True, if messages from the chat can't be forwarded to other chats */
    has_protected_content?: true;
    /** True, if new chat members will have access to old messages; available only to chat administrators */
    has_visible_history?: true;
    /** For supergroups, name of group sticker set */
    sticker_set_name?: string;
    /** True, if the bot can change the group sticker set */
    can_set_sticker_set?: true;
    /** For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group */
    custom_emoji_sticker_set_name?: string;
    /** Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats */
    linked_chat_id?: number;
    /** For supergroups, the location to which the supergroup is connected */
    location?: ChatLocation;
  }
  /** Internal type representing channel chats returned from `getChat`. */
  export interface ChannelChat extends Chat.ChannelChat {
    /** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details */
    accent_color_id: number;
    /** The maximum number of reactions that can be set on a message in the chat */
    max_reaction_count: number;
    /** Chat photo */
    photo?: ChatPhoto;
    /** If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
    active_usernames?: string[];
    /** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
    available_reactions?: ReactionType[];
    /** Custom emoji identifier of emoji chosen by the chat for the reply header and link preview background */
    background_custom_emoji_id?: string;
    /** Identifier of the accent color for the chat's profile background. See profile accent colors for more details */
    profile_accent_color_id?: number;
    /** Custom emoji identifier of the emoji chosen by the chat for its profile background */
    profile_background_custom_emoji_id?: string;
    /** Description, for groups, supergroups and channel chats */
    description?: string;
    /** Primary invite link, for groups, supergroups and channel chats */
    invite_link?: string;
    /** True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats. */
    can_send_paid_media?: true;
    /** The time after which all messages sent to the chat will be automatically deleted; in seconds */
    message_auto_delete_time?: number;
    /** True, if messages from the chat can't be forwarded to other chats */
    has_protected_content?: true;
    /** Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
    linked_chat_id?: number;
  }
}

/** This object contains full information about a chat. */
export type ChatFullInfo =
  | ChatFullInfo.PrivateChat
  | ChatFullInfo.GroupChat
  | ChatFullInfo.SupergroupChat
  | ChatFullInfo.ChannelChat;

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
  /** Total number of profile pictures the target user has */
  total_count: number;
  /** Requested profile pictures (in up to 4 sizes each) */
  photos: PhotoSize[][];
}

/** This object represents a chat photo. */
export interface ChatPhoto {
  /** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  small_file_id: string;
  /** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  small_file_unique_id: string;
  /** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  big_file_id: string;
  /** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  big_file_unique_id: string;
}

/** Represents an invite link for a chat. */
export interface ChatInviteLink {
  /** The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”. */
  invite_link: string;
  /** Creator of the link */
  creator: User;
  /** True, if users joining the chat via the link need to be approved by chat administrators */
  creates_join_request: boolean;
  /** True, if the link is primary */
  is_primary: boolean;
  /** True, if the link is revoked */
  is_revoked: boolean;
  /** Invite link name */
  name?: string;
  /** Point in time (Unix timestamp) when the link will expire or has been expired */
  expire_date?: number;
  /** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
  member_limit?: number;
  /** Number of pending join requests created using this link */
  pending_join_request_count?: number;
}

/** Represents the rights of an administrator in a chat. */
export interface ChatAdministratorRights {
  /** True, if the user's presence in the chat is hidden */
  is_anonymous: boolean;
  /** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages and ignore slow mode. Implied by any other administrator privilege */
  can_manage_chat: boolean;
  /** True, if the administrator can delete messages of other users */
  can_delete_messages: boolean;
  /** True, if the administrator can manage video chats */
  can_manage_video_chats: boolean;
  /** True, if the administrator can restrict, ban or unban chat members */
  can_restrict_members: boolean;
  /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  can_promote_members: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  can_change_info: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  can_invite_users: boolean;
  /** True, if the administrator can post in the channel; channels only */
  can_post_messages?: boolean;
  /** True, if the administrator can edit messages of other users and can pin messages; channels only */
  can_edit_messages?: boolean;
  /** True, if the user is allowed to pin messages; groups and supergroups only */
  can_pin_messages?: boolean;
  /** True, if the administrator can post stories to the chat */
  can_post_stories?: boolean;
  /** True, if the administrator can edit stories posted by other users */
  can_edit_stories?: boolean;
  /** True, if the administrator can delete stories posted by other users */
  can_delete_stories?: boolean;
  /** True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
  can_manage_topics?: boolean;
}

/** This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported:
- ChatMemberOwner
- ChatMemberAdministrator
- ChatMemberMember
- ChatMemberRestricted
- ChatMemberLeft
- ChatMemberBanned */
export type ChatMember =
  | ChatMemberOwner
  | ChatMemberAdministrator
  | ChatMemberMember
  | ChatMemberRestricted
  | ChatMemberLeft
  | ChatMemberBanned;

export interface AbstractChatMember {
  /** The member's status in the chat */
  status: string;
  /** Information about the user */
  user: User;
}

/** Represents a chat member that owns the chat and has all administrator privileges. */
export interface ChatMemberOwner extends AbstractChatMember {
  status: "creator";
  /** True, if the user's presence in the chat is hidden */
  is_anonymous: boolean;
  /** Custom title for this user */
  custom_title?: string;
}

/** Represents a chat member that has some additional privileges. */
export interface ChatMemberAdministrator extends AbstractChatMember {
  status: "administrator";
  /** True, if the bot is allowed to edit administrator privileges of that user */
  can_be_edited: boolean;
  /** True, if the user's presence in the chat is hidden */
  is_anonymous: boolean;
  /** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages and ignore slow mode. Implied by any other administrator privilege */
  can_manage_chat: boolean;
  /** True, if the administrator can delete messages of other users */
  can_delete_messages: boolean;
  /** True, if the administrator can manage video chats */
  can_manage_video_chats: boolean;
  /** True, if the administrator can restrict, ban or unban chat members */
  can_restrict_members: boolean;
  /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  can_promote_members: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  can_change_info: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  can_invite_users: boolean;
  /** True, if the administrator can post in the channel; channels only */
  can_post_messages?: boolean;
  /** True, if the administrator can edit messages of other users and can pin messages; channels only */
  can_edit_messages?: boolean;
  /** True, if the user is allowed to pin messages; groups and supergroups only */
  can_pin_messages?: boolean;
  /** True, if the administrator can post stories to the chat */
  can_post_stories?: boolean;
  /** True, if the administrator can edit stories posted by other users */
  can_edit_stories?: boolean;
  /** True, if the administrator can delete stories posted by other users */
  can_delete_stories?: boolean;
  /** True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
  can_manage_topics?: boolean;
  /** Custom title for this user */
  custom_title?: string;
}

/** Represents a chat member that has no additional privileges or restrictions. */
export interface ChatMemberMember extends AbstractChatMember {
  status: "member";
}

/** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
export interface ChatMemberRestricted extends AbstractChatMember {
  status: "restricted";
  /** True, if the user is a member of the chat at the moment of the request */
  is_member: boolean;
  /** True, if the user is allowed to send text messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
  can_send_messages: boolean;
  /** True, if the user is allowed to send audios */
  can_send_audios: boolean;
  /** True, if the user is allowed to send documents */
  can_send_documents: boolean;
  /** True, if the user is allowed to send photos */
  can_send_photos: boolean;
  /** True, if the user is allowed to send videos */
  can_send_videos: boolean;
  /** True, if the user is allowed to send video notes */
  can_send_video_notes: boolean;
  /** True, if the user is allowed to send voice notes */
  can_send_voice_notes: boolean;
  /** True, if the user is allowed to send polls */
  can_send_polls: boolean;
  /** True, if the user is allowed to send animations, games, stickers and use inline bots */
  can_send_other_messages: boolean;
  /** True, if the user is allowed to add web page previews to their messages */
  can_add_web_page_previews: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  can_change_info: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  can_invite_users: boolean;
  /** True, if the user is allowed to pin messages */
  can_pin_messages: boolean;
  /** True, if the user is allowed to create forum topics */
  can_manage_topics: boolean;
  /** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever */
  until_date: number;
}

/** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
export interface ChatMemberLeft extends AbstractChatMember {
  status: "left";
}

/** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
export interface ChatMemberBanned extends AbstractChatMember {
  status: "kicked";
  /** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is banned forever */
  until_date: number;
}

/** This object represents changes in the status of a chat member. */
export interface ChatMemberUpdated {
  /** Chat the user belongs to */
  chat: Chat;
  /** Performer of the action, which resulted in the change */
  from: User;
  /** Date the change was done in Unix time */
  date: number;
  /** Previous information about the chat member */
  old_chat_member: ChatMember;
  /** New information about the chat member */
  new_chat_member: ChatMember;
  /** Chat invite link, which was used by the user to join the chat; for joining by invite link events only. */
  invite_link?: ChatInviteLink;
  /** True, if the user joined the chat via a chat folder invite link */
  via_chat_folder_invite_link?: boolean;
}

/** Represents a join request sent to a chat. */
export interface ChatJoinRequest {
  /** Chat to which the request was sent */
  chat: Chat.SupergroupChat | Chat.ChannelChat;
  /** User that sent the join request */
  from: User;
  /** Identifier of a private chat with the user who sent the join request. The bot can use this identifier for 24 hours to send messages until the join request is processed, assuming no other administrator contacted the user. */
  user_chat_id: number;
  /** Date the request was sent in Unix time */
  date: number;
  /** Bio of the user. */
  bio?: string;
  /** Chat invite link that was used by the user to send the join request */
  invite_link?: ChatInviteLink;
}

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface ChatPermissions {
  /** True, if the user is allowed to send text messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
  can_send_messages?: boolean;
  /** True, if the user is allowed to send audios */
  can_send_audios?: boolean;
  /** True, if the user is allowed to send documents */
  can_send_documents?: boolean;
  /** True, if the user is allowed to send photos */
  can_send_photos?: boolean;
  /** True, if the user is allowed to send videos */
  can_send_videos?: boolean;
  /** True, if the user is allowed to send video notes */
  can_send_video_notes?: boolean;
  /** True, if the user is allowed to send voice notes */
  can_send_voice_notes?: boolean;
  /** True, if the user is allowed to send polls */
  can_send_polls?: boolean;
  /** True, if the user is allowed to send animations, games, stickers and use inline bots */
  can_send_other_messages?: boolean;
  /** True, if the user is allowed to add web page previews to their messages */
  can_add_web_page_previews?: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups */
  can_change_info?: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  can_invite_users?: boolean;
  /** True, if the user is allowed to pin messages. Ignored in public supergroups */
  can_pin_messages?: boolean;
  /** True, if the user is allowed to create forum topics. If omitted defaults to the value of can_pin_messages */
  can_manage_topics?: boolean;
}

/** Describes the birthdate of a user. */
export interface Birthdate {
  /** Day of the user's birth; 1-31 */
  day: number;
  /** Month of the user's birth; 1-12 */
  month: number;
  /** Optional. Year of the user's birth */
  year?: number;
}

/** Contains information about the start page settings of a Telegram Business account. */
export interface BusinessIntro {
  /** Title text of the business intro */
  title?: string;
  /** Message text of the business intro */
  message?: string;
  /** Sticker of the business intro */
  sticker?: Sticker;
}

/** Contains information about the location of a Telegram Business account. */
export interface BusinessLocation {
  /** Address of the business */
  address: string;
  /** Optional. Location of the business */
  location?: Location;
}

/** Describes an interval of time during which a business is open. */
export interface BusinessOpeningHoursInterval {
  /** The minute's sequence number in a week, starting on Monday, marking the start of the time interval during which the business is open; 0 - 7 * 24 * 60 */
  opening_minute: number;
  /** The minute's sequence number in a week, starting on Monday, marking the end of the time interval during which the business is open; 0 - 8 * 24 * 60 */
  closing_minute: number;
}

/** Describes the opening hours of a business. */
export interface BusinessOpeningHours {
  /** Unique name of the time zone for which the opening hours are defined */
  time_zone_name: string;
  /** List of time intervals describing business opening hours */
  opening_hours: BusinessOpeningHoursInterval[];
}

/** Represents a location to which a chat is connected. */
export interface ChatLocation {
  /** The location to which the supergroup is connected. Can't be a live location. */
  location: Location;
  /** Location address; 1-64 characters, as defined by the chat owner */
  address: string;
}

/** This object describes the type of a reaction. Currently, it can be one of
 * - ReactionTypeEmoji
 * - ReactionTypeCustomEmoji
 */
export type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji;

export interface AbstractReactionType {
  /** Type of the reaction */
  type: string;
}

// deno-fmt-ignore
export type TelegramEmoji = "👍" | "👎" | "❤" | "🔥" | "🥰" | "👏" | "😁" | "🤔" | "🤯" | "😱" | "🤬" | "😢" | "🎉" | "🤩" | "🤮" | "💩" | "🙏" | "👌" | "🕊" | "🤡" | "🥱" | "🥴" | "😍" | "🐳" | "❤‍🔥" | "🌚" | "🌭" | "💯" | "🤣" | "⚡" | "🍌" | "🏆" | "💔" | "🤨" | "😐" | "🍓" | "🍾" | "💋" | "🖕" | "😈" | "😴" | "😭" | "🤓" | "👻" | "👨‍💻" | "👀" | "🎃" | "🙈" | "😇" | "😨" | "🤝" | "✍" | "🤗" | "🫡" | "🎅" | "🎄" | "☃" | "💅" | "🤪" | "🗿" | "🆒" | "💘" | "🙉" | "🦄" | "😘" | "💊" | "🙊" | "😎" | "👾" | "🤷‍♂" | "🤷" | "🤷‍♀" | "😡";

/** The reaction is based on an emoji. */
export interface ReactionTypeEmoji extends AbstractReactionType {
  type: "emoji";
  /** Reaction emoji. */
  emoji: TelegramEmoji;
}

/** The reaction is based on a custom emoji. */
export interface ReactionTypeCustomEmoji extends AbstractReactionType {
  type: "custom_emoji";
  /** Custom emoji identifier */
  custom_emoji_id: string;
}

/** Represents a reaction added to a message along with the number of times it was added. */
export interface ReactionCount {
  /** Type of the reaction */
  type: ReactionType;
  /** Number of times the reaction was added */
  total_count: number;
}

/** Describes the connection of the bot with a business account. */
export interface BusinessConnection {
  /** Unique identifier of the business connection */
  id: string;
  /** Business account user that created the business connection */
  user: User;
  /** Identifier of a private chat with the user who created the business connection. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  user_chat_id: number;
  /** Date the connection was established in Unix time */
  date: number;
  /** True, if the bot can act on behalf of the business account in chats that were active in the last 24 hours */
  can_reply: boolean;
  /** True, if the connection is active */
  is_enabled: boolean;
}

export interface BusinessMessagesDeleted {
  /** Unique identifier of the business connection */
  business_connection_id: string;
  /** Information about a chat in the business account. The bot may not have access to the chat or the corresponding user. */
  chat: Chat;
  /** The list of identifiers of deleted messages in the chat of the business account */
  message_ids: number[];
}

/** This object represents a change of a reaction on a message performed by a user. */
export interface MessageReactionUpdated {
  /** The chat containing the message the user reacted to */
  chat: Chat;
  /** Unique identifier of the message inside the chat */
  message_id: number;
  /** The user that changed the reaction, if the user isn't anonymous */
  user?: User;
  /** The chat on behalf of which the reaction was changed, if the user is anonymous */
  actor_chat?: Chat;
  /** Date of the change in Unix time */
  date: number;
  /** Previous list of reaction types that were set by the user */
  old_reaction: ReactionType[];
  /** New list of reaction types that have been set by the user */
  new_reaction: ReactionType[];
}

/** This object represents reaction changes on a message with anonymous reactions. */
export interface MessageReactionCountUpdated {
  /** The chat containing the message */
  chat: Chat;
  /** Unique message identifier inside the chat */
  message_id: number;
  /** Date of the change in Unix time */
  date: number;
  /**	List of reactions that are present on the message */
  reactions: ReactionCount[];
}

/** This object represents a forum topic. */
export interface ForumTopic {
  /** Unique identifier of the forum topic */
  message_thread_id: number;
  /** Name of the topic */
  name: string;
  /** Color of the topic icon in RGB format */
  icon_color: number;
  /** Unique identifier of the custom emoji shown as the topic icon */
  icon_custom_emoji_id?: string;
}

/** This object represents a bot command. */
export interface BotCommand {
  /** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
  command: string;
  /** Description of the command; 1-256 characters. */
  description: string;
}

/** This object describes the source of a chat boost. It can be one of

- ChatBoostSourcePremium
- ChatBoostSourceGiftCode
- ChatBoostSourceGiveaway
*/
type ChatBoostSource =
  | ChatBoostSourcePremium
  | ChatBoostSourceGiftCode
  | ChatBoostSourceGiveaway;

export interface AbstractChatBoostSource {
  /** Source of the boost */
  source: string;
}

/** The boost was obtained by subscribing to Telegram Premium or by gifting a Telegram Premium subscription to another user. */
export interface ChatBoostSourcePremium extends AbstractChatBoostSource {
  source: "premium";
  /** User that boosted the chat. */
  user: User;
}

/** The boost was obtained by the creation of Telegram Premium gift codes to boost a chat. Each such code boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription. */
export interface ChatBoostSourceGiftCode extends AbstractChatBoostSource {
  source: "gift_code";
  /** User for which the gift code was created. */
  user: User;
}

/** The boost was obtained by the creation of a Telegram Premium giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription. */
export interface ChatBoostSourceGiveaway extends AbstractChatBoostSource {
  source: "giveaway";
  /** Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet. */
  giveaway_message_id: number;
  /** User that won the prize in the giveaway if any. */
  user?: User;
  /** True, if the giveaway was completed, but there was no user to win the prize */
  is_unclaimed?: true;
}

/** This object contains information about a chat boost. */
export interface ChatBoost {
  /** Unique identifier of the boost */
  boost_id: string;
  /** Point in time (Unix timestamp) when the chat was boosted */
  add_date: number;
  /** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
  expiration_date: number;
  /** Source of the added boost */
  source: ChatBoostSource;
}

/** This object represents a boost added to a chat or changed. */
export interface ChatBoostUpdated {
  /** Chat which was boosted */
  chat: Chat;
  /** Infomation about the chat boost */
  boost: ChatBoost;
}

/** This object represents a boost removed from a chat. */
export interface ChatBoostRemoved {
  /** Chat which was boosted */
  chat: Chat;
  /** Unique identifier of the boost */
  boost_id: string;
  /** Point in time (Unix timestamp) when the boost was removed */
  remove_date: number;
  /** Source of the removed boost */
  source: ChatBoostSource;
}

/** This object represents a list of boosts added to a chat by a user. */
export interface UserChatBoosts {
  /** The list of boosts added to the chat by the user */
  boosts: ChatBoost[];
}

/** This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile.

> The maximum file size to download is 20 MB
*/
export interface File {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  file_size?: number;
  /** File path. Use `https://api.telegram.org/file/bot<token>/<file_path>` to get the file. */
  file_path?: string;
}
