export declare namespace Update {
	/** Internal type holding properties that updates in channels share. */
	export interface Channel {
		chat: Chat.ChannelChat;
		author_signature?: string;
		from?: never;
	}
	/** Internal type holding properties that updates outside of channels share. */
	export interface NonChannel {
		chat: Exclude<Chat, Chat.ChannelChat>;
		author_signature?: never;
		from: User;
	}
	/** Internal type holding properties that updates about new messages share. */
	export interface New {
		edit_date?: never;
	}
	/** Internal type holding properties that updates about edited messages share. */
	export interface Edited {
		/** Date the message was last edited in Unix time */
		edit_date: number;
	}
	/** Internal type holding properties that updates about business messages share. */
	export interface Biz {
		/** Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier. */
		business_connection_id: string;
	}

	export interface AbstractUpdate {
		/** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This identifier becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
		update_id: number;
	}
	export interface MessageUpdate<M extends Message = Message> extends AbstractUpdate {
		/** New incoming message of any kind - text, photo, sticker, etc. */
		message: New & NonChannel & M;
	}
	export interface EditedMessageUpdate<M extends CommonMessageBundle = CommonMessageBundle> extends AbstractUpdate {
		/** New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
		edited_message: Edited & NonChannel & M;
	}
	export interface ChannelPostUpdate<M extends Message = Message> extends AbstractUpdate {
		/** New incoming channel post of any kind - text, photo, sticker, etc. */
		channel_post: New & Channel & M;
	}
	export interface EditedChannelPostUpdate<M extends CommonMessageBundle = CommonMessageBundle> extends AbstractUpdate {
		/** New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
		edited_channel_post: Edited & Channel & M;
	}
	export interface BusinessConnectionUpdate extends AbstractUpdate {
		/** The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot */
		business_connection: BusinessConnection;
	}
	export interface BusinessMessageUpdate<M extends CommonMessageBundle = CommonMessageBundle> extends AbstractUpdate {
		/** New message from a connected business account */
		business_message: New & NonChannel & Biz & M;
	}
	export interface EditedBusinessMessageUpdate<
		M extends CommonMessageBundle = CommonMessageBundle,
	> extends AbstractUpdate {
		/** New version of a message from a connected business account */
		edited_business_message: Edited & NonChannel & Biz & M;
	}
	export interface DeletedBusinessMessagesUpdate extends AbstractUpdate {
		/** Messages were deleted from a connected business account */
		deleted_business_messages: BusinessMessagesDeleted;
	}
	export interface MessageReactionUpdate extends AbstractUpdate {
		/** A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify `"message_reaction"` in the list of allowed_updates to receive these updates. The update isn't received for reactions set by bots. */
		message_reaction: MessageReactionUpdated;
	}
	export interface MessageReactionCountUpdate extends AbstractUpdate {
		/** Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify `"message_reaction_count"` in the list of allowed_updates to receive these updates. */
		message_reaction_count: MessageReactionCountUpdated;
	}
	export interface InlineQueryUpdate extends AbstractUpdate {
		/** New incoming inline query */
		inline_query: InlineQuery;
	}
	export interface ChosenInlineResultUpdate extends AbstractUpdate {
		/** The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
		chosen_inline_result: ChosenInlineResult;
	}
	export interface CallbackQueryUpdate<C extends CallbackQuery = CallbackQuery> extends AbstractUpdate {
		/** New incoming callback query */
		callback_query: C;
	}
	export interface ShippingQueryUpdate extends AbstractUpdate {
		/** New incoming shipping query. Only for invoices with flexible price */
		shipping_query: ShippingQuery;
	}
	export interface PreCheckoutQueryUpdate extends AbstractUpdate {
		/** New incoming pre-checkout query. Contains full information about checkout */
		pre_checkout_query: PreCheckoutQuery;
	}

	export interface PurchasedPaidMediaUpdate extends AbstractUpdate {
		/** A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat */
		purchased_paid_media: PaidMediaPurchased;
	}
	export interface PollUpdate extends AbstractUpdate {
		/** New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot */
		poll: Poll;
	}
	export interface PollAnswerUpdate extends AbstractUpdate {
		/** A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
		poll_answer: PollAnswer;
	}
	export interface MyChatMemberUpdate extends AbstractUpdate {
		/** The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
		my_chat_member: ChatMemberUpdated;
	}
	export interface ChatMemberUpdate extends AbstractUpdate {
		/** A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify “chat_member” in the list of allowed_updates to receive these updates. */
		chat_member: ChatMemberUpdated;
	}
	export interface ChatJoinRequestUpdate extends AbstractUpdate {
		/** A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates. */
		chat_join_request: ChatJoinRequest;
	}
	export interface ChatBoostUpdate extends AbstractUpdate {
		/** A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates. */
		chat_boost: ChatBoostUpdated;
	}
	export interface RemovedChatBoostUpdate extends AbstractUpdate {
		/** A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates. */
		removed_chat_boost: ChatBoostRemoved;
	}
}

/** This object represents an incoming update.
At most one of the optional parameters can be present in any given update. */
export type Update =
	| Update.MessageUpdate
	| Update.EditedMessageUpdate
	| Update.ChannelPostUpdate
	| Update.EditedChannelPostUpdate
	| Update.BusinessConnectionUpdate
	| Update.BusinessMessageUpdate
	| Update.EditedBusinessMessageUpdate
	| Update.DeletedBusinessMessagesUpdate
	| Update.MessageReactionUpdate
	| Update.MessageReactionCountUpdate
	| Update.InlineQueryUpdate
	| Update.ChosenInlineResultUpdate
	| Update.CallbackQueryUpdate
	| Update.ShippingQueryUpdate
	| Update.PreCheckoutQueryUpdate
	| Update.PurchasedPaidMediaUpdate
	| Update.PollUpdate
	| Update.PollAnswerUpdate
	| Update.MyChatMemberUpdate
	| Update.ChatMemberUpdate
	| Update.ChatJoinRequestUpdate
	| Update.ChatBoostUpdate
	| Update.RemovedChatBoostUpdate;

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects.

  Notes
  1. This method will not work if an outgoing webhook is set up.
  2. In order to avoid getting duplicate updates, recalculate offset after each server response. */
	getUpdates(args?: {
		/** Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will forgotten. */
		offset?: number;
		/** Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
		limit?: number;
		/** Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only. */
		timeout?: number;
		/** A list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default). If not specified, the previous setting will be used.

    Please note that this parameter doesn't affect updates created before the call to getUpdates, so unwanted updates may be received for a short period of time. */
		allowed_updates?: ReadonlyArray<Exclude<UnionKeys<Update>, "update_id">>;
	}): Update[];

	/** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing an Update. In case of an unsuccessful request (a request with response HTTP status code different from 2XY), we will repeat the request and give up after a reasonable amount of attempts. Returns True on success.

  If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.

  Notes
  1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
  2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
  3. Ports currently supported for Webhooks: 443, 80, 88, 8443.

  If you're having any trouble setting up webhooks, please check out this amazing guide to webhooks. */
	setWebhook(args: {
		/** HTTPS URL to send updates to. Use an empty string to remove webhook integration */
		url: string;
		/** Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details. */
		certificate?: F;
		/** The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS */
		ip_address?: string;
		/** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput. */
		max_connections?: number;
		/** A list of the update types you want your bot to receive. For example, specify [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default). If not specified, the previous setting will be used.

    Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time. */
		allowed_updates?: ReadonlyArray<Exclude<UnionKeys<Update>, "update_id">>;
		/** Pass True to drop all pending updates */
		drop_pending_updates?: boolean;
		/** A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you. */
		secret_token?: string;
	}): true;

	/** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
	deleteWebhook(args?: {
		/** Pass True to drop all pending updates */
		drop_pending_updates?: boolean;
	}): true;

	/** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
	getWebhookInfo(): WebhookInfo;
}

/** Describes the current status of a webhook. */
export interface WebhookInfo {
	/** Webhook URL, may be empty if webhook is not set up */
	url: string;
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
		/** True, if the chat is the direct messages chat of a channel */
		is_direct_messages?: true;
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
export type Chat = Chat.PrivateChat | Chat.GroupChat | Chat.SupergroupChat | Chat.ChannelChat;

export declare namespace ChatFullInfo {
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
		/** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
		accepted_gift_types?: AcceptedGiftTypes[];
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
		/** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
		accepted_gift_types?: AcceptedGiftTypes[];
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
		/** Information about the corresponding channel chat; for direct messages chats only */
		parent_chat?: Chat.ChannelChat;
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
		/** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
		accepted_gift_types?: AcceptedGiftTypes[];
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
		/** The most recent pinned message (by sending date) */
		pinned_message?: Message;
		/** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
		accepted_gift_types?: AcceptedGiftTypes[];
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

/** Helper type that bundles all possible `Message.ServiceMessage`s. More specifically, bundles all messages that do not have a `reply_to_message` field, i.e. are not a `Message.CommonMessage`. */
export type ServiceMessageBundle =
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
	| Message.RefundedPaymentMessage
	| Message.UsersSharedMessage
	| Message.ChatSharedMessage
	| Message.GiftMessage
	| Message.UniqueGiftMessage
	| Message.ConnectedWebsiteMessage
	| Message.WriteAccessAllowedMessage
	| Message.PassportDataMessage
	| Message.ProximityAlertTriggeredMessage
	| Message.BoostAddedMessage
	| Message.ChatBackgroundSetMessage
	| Message.ChecklistTasksDoneMessage
	| Message.ChecklistTasksAddedMessage
	| Message.DirectMessagePriceChangedMessage
	| Message.PaidMessagePriceChangedMessage
	| Message.SuggestedPostApprovedMessage
	| Message.SuggestedPostApprovalFailedMessage
	| Message.SuggestedPostDeclinedMessage
	| Message.SuggestedPostPaidMessage
	| Message.SuggestedPostRefundedMessage
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
	| Message.WebAppDataMessage;

/** Helper type that bundles all possible `Message.CommonMessage`s. More specifically, bundles all messages that do have a `reply_to_message` field, i.e. are a `Message.CommonMessage`. */
export type CommonMessageBundle =
	| Message.AnimationMessage
	| Message.AudioMessage
	| Message.ChecklistMessage
	| Message.ContactMessage
	| Message.DiceMessage
	| Message.DocumentMessage
	| Message.GameMessage
	| Message.LocationMessage
	| Message.PaidMediaMessage
	| Message.PhotoMessage
	| Message.PollMessage
	| Message.StickerMessage
	| Message.StoryMessage
	| Message.TextMessage
	| Message.VenueMessage
	| Message.VideoMessage
	| Message.VideoNoteMessage
	| Message.VoiceMessage;

/** Helper type that represents a message which occurs in a `reply_to_message` field. */
type ReplyMessage = ServiceMessageBundle | (CommonMessageBundle & { reply_to_message: undefined });

export declare namespace Message {
	export interface ServiceMessage {
		/** Unique message identifier inside this chat */
		message_id: number;
		/** Unique identifier of a message thread or a forum topic to which the message belongs; for supergroups only */
		message_thread_id?: number;
		/** Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
		/** Information about the direct messages chat topic that contains the message */
		direct_messages_topic?: DirectMessagesTopic;
		from?: User;
		/** Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group. For backward compatibility, the field from contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
		sender_chat?: Chat;
		/** Date the message was sent in Unix time. It is always a positive number, representing a valid date. */
		date: number;
		/** Chat the message belongs to */
		chat: Chat;
		/** True, if the message is sent to a forum topic */
		is_topic_message?: boolean;
	}
	export interface CommonMessage extends ServiceMessage {
		/** If the sender of the message boosted the chat, the number of boosts added by the user */
		sender_boost_count?: number;
		/** Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier. */
		business_connection_id?: string;
		/** Information about the original message for forwarded messages */
		forward_origin?: MessageOrigin;
		/** True, if the message is a channel post that was automatically forwarded to the connected discussion group */
		is_automatic_forward?: true;
		/** For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
		reply_to_message?: ReplyMessage;
		/** Information about the message that is being replied to, which may come from another chat or forum topic */
		external_reply?: ExternalReplyInfo;
		/** For replies that quote part of the original message, the quoted part of the message */
		quote?: TextQuote;
		/** For replies to a story, the original story */
		reply_to_story?: Story;
		/** Identifier of the specific checklist task that is being replied to */
		reply_to_checklist_task_id?: number;
		/** Bot through which the message was sent */
		via_bot?: User;
		/** Date the message was last edited in Unix time */
		edit_date?: number;
		/** True, if the message can't be forwarded */
		has_protected_content?: true;
		/** True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message */
		is_from_offline?: true;
		/** True, if the message is a paid post. Note that such posts must not be deleted for 24 hours to receive the payment and can't be edited. */
		is_paid_post?: true;
		/** Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
		author_signature?: string;
		/** The number of Telegram Stars that were paid by the sender of the message to send it */
		paid_star_count?: number;
		/** Options used for link preview generation for the message, if it is a text message and link preview options were changed */
		link_preview_options?: LinkPreviewOptions;
		/** Information about suggested post parameters if the message is a suggested post in a channel direct messages chat. If the message is an approved or declined suggested post, then it can't be edited. */
		suggested_post_info?: SuggestedPostInfo;
		/** Unique identifier of the message effect added to the message */
		effect_id?: string;
		/** Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
		reply_markup?: InlineKeyboardMarkup;
	}
	export interface BusinessSentMessage {
		/** The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account. */
		sender_business_bot?: User;
	}
	export interface TextMessage extends CommonMessage {
		/** For text messages, the actual UTF-8 text of the message */
		text: string;
		/** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
		entities?: MessageEntity[];
	}
	export interface CaptionableMessage extends CommonMessage {
		/** Caption for the animation, audio, document, photo, video or voice */
		caption?: string;
		/** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
		caption_entities?: MessageEntity[];
	}
	export interface MediaMessage extends CaptionableMessage {
		/** The unique identifier of a media message group this message belongs to */
		media_group_id?: string;
		/** True, if the message media is covered by a spoiler animation */
		has_media_spoiler?: true;
	}
	export interface AudioMessage extends MediaMessage {
		/** Message is an audio file, information about the file */
		audio: Audio;
	}
	export interface DocumentMessage extends MediaMessage {
		/** Message is a general file, information about the file */
		document: Document;
	}

	// UNSURE: To verify whether PaidMediaMessage inherits from MediaMessage
	export interface PaidMediaMessage extends CaptionableMessage {
		/** Message contains paid media; information about the paid media */
		paid_media: PaidMediaInfo;
	}
	export interface AnimationMessage extends DocumentMessage {
		/** Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set */
		animation: Animation;
		/** True, if the caption must be shown above the message media */
		show_caption_above_media?: true;
	}
	export interface PhotoMessage extends MediaMessage {
		/** Message is a photo, available sizes of the photo */
		photo: PhotoSize[];
		/** True, if the caption must be shown above the message media */
		show_caption_above_media?: true;
	}
	export interface StickerMessage extends CommonMessage {
		/** Message is a sticker, information about the sticker */
		sticker: Sticker;
	}
	export interface StoryMessage extends CommonMessage {
		/** Message is a forwarded story. Currently holds no information */
		story: Story;
	}
	export interface VideoMessage extends MediaMessage {
		/** Message is a video, information about the video */
		video: Video;
		/** True, if the caption must be shown above the message media */
		show_caption_above_media?: true;
	}
	export interface VideoNoteMessage extends CommonMessage {
		/** Message is a video note, information about the video message */
		video_note: VideoNote;
	}
	export interface VoiceMessage extends CaptionableMessage {
		/** Message is a voice message, information about the file */
		voice: Voice;
	}
	export interface ChecklistMessage extends CommonMessage {
		/** Message is a checklist */
		checklist: Checklist;
	}
	export interface ContactMessage extends CommonMessage {
		/** Message is a shared contact, information about the contact */
		contact: Contact;
	}
	export interface DiceMessage extends CommonMessage {
		/** Message is a dice with random value */
		dice: Dice;
	}
	export interface GameMessage extends CommonMessage {
		/** Message is a game, information about the game. More about games » */
		game: Game;
	}
	export interface PollMessage extends CommonMessage {
		/** Message is a native poll, information about the poll */
		poll: Poll;
	}
	export interface LocationMessage extends CommonMessage {
		/** Message is a shared location, information about the location */
		location: Location;
	}
	export interface VenueMessage extends LocationMessage {
		/** Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set */
		venue: Venue;
	}
	export interface NewChatMembersMessage extends ServiceMessage {
		/** New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
		new_chat_members: User[];
	}
	export interface LeftChatMemberMessage extends ServiceMessage {
		/** A member was removed from the group, information about them (this member may be the bot itself) */
		left_chat_member: User;
	}
	export interface NewChatTitleMessage extends ServiceMessage {
		/** A chat title was changed to this value */
		new_chat_title: string;
	}
	export interface NewChatPhotoMessage extends ServiceMessage {
		/** A chat photo was change to this value */
		new_chat_photo: PhotoSize[];
	}
	export interface DeleteChatPhotoMessage extends ServiceMessage {
		/** Service message: the chat photo was deleted */
		delete_chat_photo: true;
	}
	export interface GroupChatCreatedMessage extends ServiceMessage {
		/** Service message: the group has been created */
		group_chat_created: true;
	}
	export interface SupergroupChatCreated extends ServiceMessage {
		/** Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
		supergroup_chat_created: true;
	}
	export interface ChannelChatCreatedMessage extends ServiceMessage {
		/** Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
		channel_chat_created: true;
	}
	export interface MessageAutoDeleteTimerChangedMessage extends ServiceMessage {
		/** Service message: auto-delete timer settings changed in the chat */
		message_auto_delete_timer_changed: MessageAutoDeleteTimerChanged;
	}
	export interface MigrateToChatIdMessage extends ServiceMessage {
		/** The group has been migrated to a supergroup with the specified identifier. */
		migrate_to_chat_id: number;
	}
	export interface MigrateFromChatIdMessage extends ServiceMessage {
		/** The supergroup has been migrated from a group with the specified identifier. */
		migrate_from_chat_id: number;
	}
	export interface PinnedMessageMessage extends ServiceMessage {
		/** Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply. */
		pinned_message: Omit<MaybeInaccessibleMessage, "reply_to_message">;
	}
	export interface InvoiceMessage extends ServiceMessage {
		/** Message is an invoice for a payment, information about the invoice. */
		invoice: Invoice;
	}
	export interface SuccessfulPaymentMessage extends ServiceMessage {
		/** Message is a service message about a successful payment, information about the payment. */
		successful_payment: SuccessfulPayment;
	}
	export interface RefundedPaymentMessage extends ServiceMessage {
		/** Message is a service message about a refunded payment, information about the payment. */
		refunded_payment: RefundedPayment;
	}
	export interface UsersSharedMessage extends ServiceMessage {
		/** Service message: a user was shared with the bot */
		users_shared: UsersShared;
	}
	export interface ChatSharedMessage extends ServiceMessage {
		/** Service message: a chat was shared with the bot */
		chat_shared: ChatShared;
	}
	export interface GiftMessage extends ServiceMessage {
		/** Service message: a regular gift was sent or received */
		gift: GiftInfo;
	}
	export interface UniqueGiftMessage extends ServiceMessage {
		/** Service message: a unique gift was sent or received */
		unique_gift: UniqueGiftInfo;
	}
	export interface ConnectedWebsiteMessage extends ServiceMessage {
		/** The domain name of the website on which the user has logged in. More about Telegram Login » */
		connected_website: string;
	}
	export interface WriteAccessAllowedMessage extends ServiceMessage {
		/** Service message: the user allowed the bot added to the attachment menu to write messages */
		write_access_allowed: WriteAccessAllowed;
	}
	export interface PassportDataMessage extends ServiceMessage {
		/** Telegram Passport data */
		passport_data: PassportData;
	}
	export interface ProximityAlertTriggeredMessage extends ServiceMessage {
		/** Service message. A user in the chat triggered another user's proximity alert while sharing Live Location. */
		proximity_alert_triggered: ProximityAlertTriggered;
	}
	export interface BoostAddedMessage extends ServiceMessage {
		/** Service message: user boosted the chat */
		boost_added: ChatBoostAdded;
	}
	export interface ChatBackgroundSetMessage extends ServiceMessage {
		/** Service message: chat background set */
		chat_background_set: ChatBackground;
	}
	export interface ChecklistTasksDoneMessage extends ServiceMessage {
		/** Service message: some tasks in a checklist were marked as done or not done */
		checklist_tasks_done: ChecklistTasksDone;
	}
	export interface ChecklistTasksAddedMessage extends ServiceMessage {
		/** Service message: tasks were added to a checklist */
		checklist_tasks_added: ChecklistTasksAdded;
	}
	export interface DirectMessagePriceChangedMessage extends ServiceMessage {
		/** Service message: the price for paid messages in the corresponding direct messages chat of a channel has changed */
		direct_message_price_changed: DirectMessagePriceChanged;
	}
	export interface ForumTopicCreatedMessage extends ServiceMessage {
		/** Service message: forum topic created */
		forum_topic_created: ForumTopicCreated;
	}
	export interface ForumTopicEditedMessage extends ServiceMessage {
		/** Service message: forum topic edited */
		forum_topic_edited: ForumTopicEdited;
	}
	export interface ForumTopicClosedMessage extends ServiceMessage {
		/** Service message: forum topic closed */
		forum_topic_closed: ForumTopicClosed;
	}
	export interface ForumTopicReopenedMessage extends ServiceMessage {
		/** Service message: forum topic reopened */
		forum_topic_reopened: ForumTopicReopened;
	}
	export interface GeneralForumTopicHiddenMessage extends ServiceMessage {
		/** Service message: the 'General' forum topic hidden */
		general_forum_topic_hidden: GeneralForumTopicHidden;
	}
	export interface GeneralForumTopicUnhiddenMessage extends ServiceMessage {
		/** Service message: the 'General' forum topic unhidden */
		general_forum_topic_unhidden: GeneralForumTopicUnhidden;
	}
	export interface GiveawayCreatedMessage extends ServiceMessage {
		/** Service message: a scheduled giveaway was created */
		giveaway_created: GiveawayCreated;
	}
	export interface GiveawayMessage extends ServiceMessage {
		/** The message is a scheduled giveaway message */
		giveaway: Giveaway;
	}
	export interface GiveawayWinnersMessage extends ServiceMessage {
		/** A giveaway with public winners was completed */
		giveaway_winners: GiveawayWinners;
	}
	export interface GiveawayCompletedMessage extends ServiceMessage {
		/** Service message: a giveaway without public winners was completed */
		giveaway_completed: GiveawayCompleted;
	}
	export interface PaidMessagePriceChangedMessage extends ServiceMessage {
		/** Service message: the price for paid messages has changed in the chat */
		paid_message_price_changed: PaidMessagePriceChanged;
	}
	export interface SuggestedPostApprovedMessage extends ServiceMessage {
		/** Service message: a suggested post was approved */
		suggested_post_approved: SuggestedPostApproved;
	}
	export interface SuggestedPostApprovalFailedMessage extends ServiceMessage {
		/** Service message: approval of a suggested post has failed */
		suggested_post_approval_failed: SuggestedPostApprovalFailed;
	}
	export interface SuggestedPostDeclinedMessage extends ServiceMessage {
		/** Service message: a suggested post was declined */
		suggested_post_declined: SuggestedPostDeclined;
	}
	export interface SuggestedPostPaidMessage extends ServiceMessage {
		/** Service message: payment for a suggested post was received */
		suggested_post_paid: SuggestedPostPaid;
	}
	export interface SuggestedPostRefundedMessage extends ServiceMessage {
		/** Service message: payment for a suggested post was refunded */
		suggested_post_refunded: SuggestedPostRefunded;
	}
	export interface VideoChatScheduledMessage extends ServiceMessage {
		/** Service message: video chat scheduled */
		video_chat_scheduled: VideoChatScheduled;
	}
	export interface VideoChatStartedMessage extends ServiceMessage {
		/** Service message: video chat started */
		video_chat_started: VideoChatStarted;
	}
	export interface VideoChatEndedMessage extends ServiceMessage {
		/** Service message: video chat ended */
		video_chat_ended: VideoChatEnded;
	}
	export interface VideoChatParticipantsInvitedMessage extends ServiceMessage {
		/** Service message: new participants invited to a video chat */
		video_chat_participants_invited: VideoChatParticipantsInvited;
	}
	export interface WebAppDataMessage extends ServiceMessage {
		/** Service message: data sent by a Web App */
		web_app_data: WebAppData;
	}
}

/** This object represents a message. */
export type Message = ServiceMessageBundle | CommonMessageBundle;

/** This object represents a unique message identifier. */
export interface MessageId {
	/** Unique message identifier. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent */
	message_id: number;
}

/** This object describes a message that was deleted or is otherwise inaccessible to the bot. */
export interface InaccessibleMessage {
	/** Chat the message belonged to. */
	chat: Chat;
	/** Unique message identifier inside the chat. */
	message_id: number;
	/** Always 0. The field can be used to differentiate regular and inaccessible messages. */
	date: 0;
}

/** This object describes a message that can be inaccessible to the bot. It can be one of

- Message
- InaccessibleMessage */
export type MaybeInaccessibleMessage = Message | InaccessibleMessage;

export declare namespace MessageEntity {
	interface Abstract {
		/** Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag or #hashtag@chatusername), “cashtag” ($USD or $USD@chatusername), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “blockquote” (block quotation), “expandable_blockquote” (collapsed-by-default block quotation), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames), “custom_emoji” (for inline custom emoji stickers) */
		type: string;
		/** Offset in UTF-16 code units to the start of the entity */
		offset: number;
		/** Length of the entity in UTF-16 code units */
		length: number;
	}

	export interface Mention extends Abstract {
		type: "mention";
	}

	export interface Hashtag extends Abstract {
		type: "hashtag";
	}

	export interface Cashtag extends Abstract {
		type: "cashtag";
	}

	export interface BotCommand extends Abstract {
		type: "bot_command";
	}

	export interface Url extends Abstract {
		type: "url";
	}

	export interface Email extends Abstract {
		type: "email";
	}

	export interface PhoneNumber extends Abstract {
		type: "phone_number";
	}

	export interface Bold extends Abstract {
		type: "bold";
	}

	export interface Blockquote extends Abstract {
		type: "blockquote";
	}

	export interface ExpandableBlockquote extends Abstract {
		type: "expandable_blockquote";
	}

	export interface Italic extends Abstract {
		type: "italic";
	}

	export interface Underline extends Abstract {
		type: "underline";
	}

	export interface Strikethrough extends Abstract {
		type: "strikethrough";
	}

	export interface Spoiler extends Abstract {
		type: "spoiler";
	}

	export interface Code extends Abstract {
		type: "code";
	}
	export interface PreMessage extends Abstract {
		type: "pre";
		/** For “pre” only, the programming language of the entity text */
		language?: string;
	}
	export interface TextLink extends Abstract {
		type: "text_link";
		/** For “text_link” only, URL that will be opened after user taps on the text */
		url: string;
	}
	export interface TextMention extends Abstract {
		type: "text_mention";
		/** For “text_mention” only, the mentioned user */
		user: User;
	}
	export interface CustomEmoji extends Abstract {
		type: "custom_emoji";
		/** For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker */
		custom_emoji_id: string;
	}
}

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export type MessageEntity =
	| MessageEntity.Mention
	| MessageEntity.Hashtag
	| MessageEntity.Cashtag
	| MessageEntity.BotCommand
	| MessageEntity.Url
	| MessageEntity.Email
	| MessageEntity.PhoneNumber
	| MessageEntity.Bold
	| MessageEntity.Blockquote
	| MessageEntity.ExpandableBlockquote
	| MessageEntity.Italic
	| MessageEntity.Underline
	| MessageEntity.Strikethrough
	| MessageEntity.Spoiler
	| MessageEntity.Code
	| MessageEntity.PreMessage
	| MessageEntity.TextLink
	| MessageEntity.TextMention
	| MessageEntity.CustomEmoji;

/** The Bot API supports basic formatting for messages. You can use bold, italic, underlined, strikethrough, spoiler text, block quotations as well as inline links and pre-formatted code in your bots' messages. Telegram clients will render them accordingly. You can specify text entities directly, or use markdown-style or HTML-style formatting.

Note that Telegram clients will display an **alert** to the user before opening an inline link ('Open this link?' together with the full URL).

Message entities can be nested, providing following restrictions are met:
- If two entities have common characters, then one of them is fully contained inside another.
- bold, italic, underline, strikethrough, and spoiler entities can contain and can be part of any other entities, except pre and code.
- blockquote and expandable_blockquote entities can't be nested.
- All other entities can't contain each other.

Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username. Please note:

- These links will work only if they are used inside an inline link or in an inline keyboard button. For example, they will not work, when used in a message text.
- Unless the user is a member of the chat where they were mentioned, these mentions are only guaranteed to work if the user has contacted the bot in private in the past or has sent a callback query to the bot via an inline button and doesn't have Forwarded Messages privacy enabled for the bot.

You can find the list of programming and markup languages for which syntax highlighting is supported at [libprisma#supported-languages](https://github.com/TelegramMessenger/libprisma#supported-languages).

#### MarkdownV2 style
To use this mode, pass *MarkdownV2* in the *parse_mode* field. Use the following syntax in your message:

```
*bold \*text*
_italic \*text_
__underline__
~strikethrough~
||spoiler||
*bold _italic bold ~italic bold strikethrough ||italic bold strikethrough spoiler||~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
![👍](tg://emoji?id=5368324170671202286)
`inline fixed-width code`
`​`​`
pre-formatted fixed-width code block
`​`​`
`​`​`python
pre-formatted fixed-width code block written in the Python programming language
`​`​`
>Block quotation started
>Block quotation continued
>Block quotation continued
>Block quotation continued
>The last line of the block quotation
**>The expandable block quotation started right after the previous block quotation
>It is separated from the previous block quotation by an empty bold entity
>Expandable block quotation continued
>Hidden by default part of the expandable block quotation started
>Expandable block quotation continued
>The last line of the expandable block quotation with the expandability mark||
```
Please note:

- Any character with code between 1 and 126 inclusively can be escaped anywhere with a preceding '\' character, in which case it is treated as an ordinary character and not a part of the markup. This implies that '\' character usually must be escaped with a preceding '\' character.
- Inside `pre` and `code` entities, all '`' and '\' characters must be escaped with a preceding '\' character.
- Inside the `(...)` part of the inline link and custom emoji definition, all ')' and '\' must be escaped with a preceding '\' character.
- In all other places characters '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' must be escaped with the preceding character '\'.
In case of ambiguity between italic and underline entities __ is always greedily treated from left to right as beginning or end of an underline entity, so instead of ___italic underline___ use ___italic underline_**__, adding an empty bold entity as a separator.
- A valid emoji must be provided as an alternative value for the custom emoji. The emoji will be shown instead of the custom emoji in places where a custom emoji cannot be displayed (e.g., system notifications) or if the message is forwarded by a non-premium user. It is recommended to use the emoji from the emoji field of the custom emoji sticker.
- Custom emoji entities can only be used by bots that purchased additional usernames on Fragment.

#### HTML style
To use this mode, pass *HTML* in the *parse_mode* field. The following tags are currently supported:

```html
<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>
<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>
```
Please note:

- Only the tags mentioned above are currently supported.
- All `<`, `>` and `&` symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (`<` with `&lt;`, `>` with `&gt;` and `&` with `&amp;`).
- All numerical HTML entities are supported.
- The API currently supports only the following named HTML entities: `&lt;`, `&gt;`, `&amp;` and `&quot;`.
- Use nested `pre` and `code` tags, to define programming language for pre entity.
- Programming language can't be specified for standalone `code` tags.
- A valid emoji must be used as the content of the tg-emoji tag. The emoji will be shown instead of the custom emoji in places where a custom emoji cannot be displayed (e.g., system notifications) or if the message is forwarded by a non-premium user. It is recommended to use the emoji from the emoji field of the custom emoji sticker.
- Custom emoji entities can only be used by bots that purchased additional usernames on Fragment.

#### Markdown style
This is a legacy mode, retained for backward compatibility. To use this mode, pass *Markdown* in the *parse_mode* field. Use the following syntax in your message:

```
*bold text*
_italic text_
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
`​`​`
pre-formatted fixed-width code block
`​`​`
`​`​`python
pre-formatted fixed-width code block written in the Python programming language
`​`​`
```
Please note:

- Entities must not be nested, use parse mode MarkdownV2 instead.
There is no way to specify “underline”, “strikethrough”, “spoiler”, “blockquote”, “expandable_blockquote” and “custom_emoji” entities, use parse mode MarkdownV2 instead.
- To escape characters '_', '*', '`', '[' outside of an entity, prepend the characters '\' before them.
- Escaping inside entities is not allowed, so entity must be closed first and reopened again: use `_snake_\__case_` for italic `snake_case` and `*2*\**2=4*` for bold `2*2=4`. */
export type ParseMode = "Markdown" | "MarkdownV2" | "HTML";

/** This object contains information about the quoted part of a message that is replied to by the given message. */
export interface TextQuote {
	/** Text of the quoted part of a message that is replied to by the given message */
	text: string;
	/** Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are kept in quotes. */
	entities?: MessageEntity[];
	/** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
	position: number;
	/** True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server. */
	is_manual?: true;
}

/** Base properties shared by all ExternalReplyInfo variants */
export interface AbstractExternalReply {
	/** Origin of the message replied to by the given message */
	origin: MessageOrigin;
	/** Chat the original message belongs to. Available only if the chat is a supergroup or a channel. */
	chat?: Chat;
	/** Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel. */
	message_id?: number;
	/** Options used for link preview generation for the original message, if it is a text message */
	link_preview_options?: LinkPreviewOptions;
}

/** Properties shared by Animation, Photo, and Video ExternalReplyInfo */
export interface AbstractExternalReplyMedia {
	/** True, if the message media is covered by a spoiler animation */
	has_media_spoiler?: true;
}

export interface ExternalReplyAnimation extends AbstractExternalReply, AbstractExternalReplyMedia {
	/** Message is an animation, information about the animation */
	animation: Animation;
}

export interface ExternalReplyAudio extends AbstractExternalReply {
	/** Message is an audio file, information about the file */
	audio: Audio;
}

export interface ExternalReplyDocument extends AbstractExternalReply {
	/** Message is a general file, information about the file */
	document: Document;
}

export interface ExternalReplyPaidMedia extends AbstractExternalReply {
	/** Message contains paid media; information about the paid media */
	paid_media: PaidMediaInfo;
}

export interface ExternalReplyPhoto extends AbstractExternalReply, AbstractExternalReplyMedia {
	/** Message is a photo, available sizes of the photo */
	photo: PhotoSize[];
}

export interface ExternalReplySticker extends AbstractExternalReply {
	/** Message is a sticker, information about the sticker */
	sticker: Sticker;
}

export interface ExternalReplyStory extends AbstractExternalReply {
	/** Message is a forwarded story */
	story: Story;
}

export interface ExternalReplyVideo extends AbstractExternalReply, AbstractExternalReplyMedia {
	/** Message is a video, information about the video */
	video: Video;
}

export interface ExternalReplyVideoNote extends AbstractExternalReply {
	/** Message is a video note, information about the video message */
	video_note: VideoNote;
}

export interface ExternalReplyVoice extends AbstractExternalReply {
	/** Message is a voice message, information about the file */
	voice: Voice;
}

export interface ExternalReplyChecklist extends AbstractExternalReply {
	/** Message is a checklist */
	checklist: Checklist;
}

export interface ExternalReplyContact extends AbstractExternalReply {
	/** Message is a shared contact, information about the contact */
	contact: Contact;
}

export interface ExternalReplyDice extends AbstractExternalReply {
	/** Message is a dice with random value */
	dice: Dice;
}

export interface ExternalReplyGame extends AbstractExternalReply {
	/** Message is a game, information about the game. More about games » */
	game: Game;
}

export interface ExternalReplyGiveaway extends AbstractExternalReply {
	/** Message is a scheduled giveaway, information about the giveaway */
	giveaway: Giveaway;
}

export interface ExternalReplyGiveawayWinners extends AbstractExternalReply {
	/** A giveaway with public winners was completed */
	giveaway_winners: GiveawayWinners;
}

export interface ExternalReplyInvoice extends AbstractExternalReply {
	/** Message is an invoice for a payment, information about the invoice. More about payments » */
	invoice: Invoice;
}

export interface ExternalReplyLocation extends AbstractExternalReply {
	/** Message is a shared location, information about the location */
	location: Location;
}

export interface ExternalReplyPoll extends AbstractExternalReply {
	/** Message is a native poll, information about the poll */
	poll: Poll;
}

export interface ExternalReplyVenue extends AbstractExternalReply {
	/** Message is a venue, information about the venue */
	venue: Venue;
}

/** This object contains information about a message that is being replied to, which may come from another chat or forum topic. */
export type ExternalReplyInfo =
	| ExternalReplyAnimation
	| ExternalReplyAudio
	| ExternalReplyDocument
	| ExternalReplyPaidMedia
	| ExternalReplyPhoto
	| ExternalReplySticker
	| ExternalReplyStory
	| ExternalReplyVideo
	| ExternalReplyVideoNote
	| ExternalReplyVoice
	| ExternalReplyChecklist
	| ExternalReplyContact
	| ExternalReplyDice
	| ExternalReplyGame
	| ExternalReplyGiveaway
	| ExternalReplyGiveawayWinners
	| ExternalReplyInvoice
	| ExternalReplyLocation
	| ExternalReplyPoll
	| ExternalReplyVenue;

/** Describes reply parameters for the message that is being sent. */
export interface ReplyParameters {
	/** Identifier of the message that will be replied to in the current chat, or in the chat chat_id if it is specified */
	message_id: number;
	/** If the message to be replied to is from a different chat, unique identifier for the chat or username of the channel (in the format `@channelusername`). Not supported for messages sent on behalf of a business account and messages from channel direct messages chats. */
	chat_id?: number | string;
	/** Pass True if the message should be sent even if the specified message to be replied to is not found. Always False for replies in another chat or forum topic. Always True for messages sent on behalf of a business account. */
	allow_sending_without_reply?: boolean;
	/** Quoted part of the message to be replied to; 0-1024 characters after entities parsing. The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, and custom_emoji entities. The message will fail to send if the quote isn't found in the original message. */
	quote?: string;
	/** Mode for parsing entities in the quote. See formatting options for more details. */
	quote_parse_mode?: ParseMode;
	/** A list of special entities that appear in the quote. It can be specified instead of quote_parse_mode. */
	quote_entities?: MessageEntity[];
	/** Position of the quote in the original message in UTF-16 code units */
	quote_position?: number;
	/** Identifier of the specific checklist task to be replied to */
	checklist_task_id?: number;
}

export interface AbstractMessageOrigin {
	/** Type of the message origin */
	type: string;
	/** Date the message was sent originally in Unix time */
	date: number;
}

/** This object describes the origin of a message. It can be one of

- MessageOriginUser
- MessageOriginHiddenUser
- MessageOriginChat
- MessageOriginChannel
 */
export type MessageOrigin = MessageOriginUser | MessageOriginHiddenUser | MessageOriginChat | MessageOriginChannel;

/** The message was originally sent by a known user. */
export interface MessageOriginUser extends AbstractMessageOrigin {
	type: "user";
	/** User that sent the message originally */
	sender_user: User;
}

/** The message was originally sent by an unknown user. */
export interface MessageOriginHiddenUser extends AbstractMessageOrigin {
	type: "hidden_user";
	/** Name of the user that sent the message originally */
	sender_user_name: string;
}

/** The message was originally sent on behalf of a chat to a group chat. */
export interface MessageOriginChat extends AbstractMessageOrigin {
	type: "chat";
	/** Chat that sent the message originally */
	sender_chat: Chat;
	/** For messages originally sent by an anonymous chat administrator, original message author signature */
	author_signature?: string;
}

/** The message was originally sent to a channel chat. */
export interface MessageOriginChannel extends AbstractMessageOrigin {
	type: "channel";
	/** Channel chat to which the message was originally sent */
	chat: Chat;
	/** Unique message identifier inside the chat */
	message_id: number;
	/** Signature of the original post author */
	author_signature?: string;
}

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Photo width */
	width: number;
	/** Photo height */
	height: number;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface Animation {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Video width as defined by the sender */
	width: number;
	/** Video height as defined by the sender */
	height: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** Animation thumbnail as defined by the sender */
	thumbnail?: PhotoSize;
	/** Original animation filename as defined by the sender */
	file_name?: string;
	/** MIME type of the file as defined by the sender */
	mime_type?: string;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface Audio {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Duration of the audio in seconds as defined by the sender */
	duration: number;
	/** Performer of the audio as defined by the sender or by audio tags */
	performer?: string;
	/** Title of the audio as defined by the sender or by audio tags */
	title?: string;
	/** Original filename as defined by the sender */
	file_name?: string;
	/** MIME type of the file as defined by the sender */
	mime_type?: string;
	/** File size in bytes */
	file_size?: number;
	/** Thumbnail of the album cover to which the music file belongs */
	thumbnail?: PhotoSize;
}

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface Document {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Document thumbnail as defined by the sender */
	thumbnail?: PhotoSize;
	/** Original filename as defined by the sender */
	file_name?: string;
	/** MIME type of the file as defined by the sender */
	mime_type?: string;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents a story. */
export interface Story {
	/** Chat that posted the story */
	chat: Chat;
	/** Unique identifier for the story in the chat */
	id: number;
}

/** This object represents a message about a forwarded story in the chat. Currently holds no information. */
export interface Story {
	/** Chat that posted the story */
	chat: Chat;
	/** Unique identifier for the story in the chat */
	id: number;
}

/** This object represents a video file. */
export interface Video {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Video width as defined by the sender */
	width: number;
	/** Video height as defined by the sender */
	height: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** Video thumbnail */
	thumbnail?: PhotoSize;
	/** Available sizes of the cover of the video in the message */
	cover?: PhotoSize[];
	/** Timestamp in seconds from which the video will play in the message */
	start_timestamp?: number;
	/** Original filename as defined by the sender */
	file_name?: string;
	/** MIME type of the file as defined by the sender */
	mime_type?: string;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents a video message (available in Telegram apps as of v.4.0). */
export interface VideoNote {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Video width and height (diameter of the video message) as defined by the sender */
	length: number;
	/** Duration of the video in seconds as defined by the sender */
	duration: number;
	/** Video thumbnail */
	thumbnail?: PhotoSize;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents a voice note. */
export interface Voice {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Duration of the audio in seconds as defined by the sender */
	duration: number;
	/** MIME type of the file as defined by the sender */
	mime_type?: string;
	/** File size in bytes */
	file_size?: number;
}

/** Describes the paid media added to a message. */
export interface PaidMediaInfo {
	/** The number of Telegram Stars that must be paid to buy access to the media */
	star_count: number;
	/** Information about the paid media */
	paid_media: PaidMedia[];
}

/** This object describes paid media. Currently, it can be one of

- PaidMediaPreview
- PaidMediaPhoto
- PaidMediaVideo
 */
export type PaidMedia = PaidMediaPhoto | PaidMediaPreview | PaidMediaVideo;

/** The paid media is a photo. */
export interface PaidMediaPhoto {
	/** Type of the paid media, always “photo” */
	type: string;
	/** The photo */
	photo: PhotoSize[];
}

/** The paid media isn't available before the payment. */
export interface PaidMediaPreview {
	/** Type of the paid media, always “preview” */
	type: string;
	/** Media width as defined by the sender */
	width?: number;
	/** Media height as defined by the sender */
	height?: number;
	/** Duration of the media in seconds as defined by the sender */
	duration?: number;
}

/** The paid media is a video. */
export interface PaidMediaVideo {
	/** Type of the paid media, always “video” */
	type: string;
	/** The video */
	video: Video;
}

/** This object represents a phone contact. */
export interface Contact {
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Contact's last name */
	last_name?: string;
	/** Contact's user identifier in Telegram. */
	user_id?: number;
	/** Additional data about the contact in the form of a vCard */
	vcard?: string;
}

/** This object represents an animated emoji that displays a random value. */
export interface Dice {
	/** Emoji on which the dice throw animation is based */
	emoji: string;
	/** Value of the dice, 1-6 for “🎲”, “🎯” and “🎳” base emoji, 1-5 for “🏀” and “⚽” base emoji, 1-64 for “🎰” base emoji */
	value: number;
}

/** This object contains information about one answer option in a poll. */
export interface PollOption {
	/** Option text, 1-100 characters */
	text: string;
	/** Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts */
	text_entities?: MessageEntity.CustomEmoji[];
	/** Number of users that voted for this option */
	voter_count: number;
}

/** This object contains information about one answer option in a poll to be sent. */
export interface InputPollOption {
	/** Option text, 1-100 characters */
	text: string;
	/** Mode for parsing entities in the text. See formatting options for more details. Currently, only custom emoji entities are allowed */
	text_parse_mode?: ParseMode;
	/** A list of special entities that appear in the poll option text. It can be specified instead of text_parse_mode */
	text_entities?: MessageEntity.CustomEmoji[];
}

/** This object represents an answer of a user in a non-anonymous poll. */
export interface PollAnswer {
	/** Unique poll identifier */
	poll_id: string;
	/** The chat that changed the answer to the poll, if the voter is anonymous */
	voter_chat?: Chat;
	/** The user, who changed the answer to the poll, if the voter isn't anonymous
	 *
	 * For backward compatibility, the field user will contain the user 136817688 (@Channel_Bot) if the voter was a chat
	 */
	user?: User;
	/** 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote. */
	option_ids: number[];
}

/** This object contains information about a poll. */
export interface Poll {
	/** Unique poll identifier */
	id: string;
	/** Poll question, 1-300 characters */
	question: string;
	/** Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions */
	question_entities?: MessageEntity.CustomEmoji[];
	/** List of poll options */
	options: PollOption[];
	/** Total number of users that voted in the poll */
	total_voter_count: number;
	/** True, if the poll is closed */
	is_closed: boolean;
	/** True, if the poll is anonymous */
	is_anonymous: boolean;
	/** Poll type, currently can be “regular” or “quiz” */
	type: "regular" | "quiz";
	/** True, if the poll allows multiple answers */
	allows_multiple_answers: boolean;
	/** 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot. */
	correct_option_id?: number;
	/** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
	explanation?: string;
	/** Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
	explanation_entities?: MessageEntity[];
	/** Amount of time in seconds the poll will be active after creation */
	open_period?: number;
	/** Point in time (Unix timestamp) when the poll will be automatically closed */
	close_date?: number;
}

/** Describes a task in a checklist. */
export interface ChecklistTask {
	/** Unique identifier of the task */
	id: number;
	/** Text of the task */
	text: string;
	/** Special entities that appear in the task text */
	text_entities?: MessageEntity[];
	/** User that completed the task; omitted if the task wasn't completed */
	completed_by_user?: User;
	/** Point in time (Unix timestamp) when the task was completed; 0 if the task wasn't completed */
	completion_date?: number;
}

/** Describes a checklist. */
export interface Checklist {
	/** Title of the checklist */
	title: string;
	/** Special entities that appear in the checklist title */
	title_entities?: MessageEntity[];
	/** List of tasks in the checklist */
	tasks: ChecklistTask[];
	/** True, if users other than the creator of the list can add tasks to the list */
	others_can_add_tasks?: true;
	/** True, if users other than the creator of the list can mark tasks as done or not done */
	others_can_mark_tasks_as_done?: true;
}

/** Describes a task to add to a checklist. */
export interface InputChecklistTask {
	/** Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist */
	id: number;
	/** Text of the task; 1-100 characters after entities parsing */
	text: string;
	/** Mode for parsing entities in the text. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the text, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are allowed. */
	text_entities?: (
		| MessageEntity.Bold
		| MessageEntity.Italic
		| MessageEntity.Underline
		| MessageEntity.Strikethrough
		| MessageEntity.Spoiler
		| MessageEntity.CustomEmoji
	)[];
}

/** Describes a checklist to create. */
export interface InputChecklist {
	/** Title of the checklist; 1-255 characters after entities parsing */
	title: string;
	/** Mode for parsing entities in the title. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the title, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are allowed. */
	title_entities?: (
		| MessageEntity.Bold
		| MessageEntity.Italic
		| MessageEntity.Underline
		| MessageEntity.Strikethrough
		| MessageEntity.Spoiler
		| MessageEntity.CustomEmoji
	)[];
	/** List of 1-30 tasks in the checklist */
	tasks: InputChecklistTask[];
	/** Pass True if other users can add tasks to the checklist */
	others_can_add_tasks?: boolean;
	/** Pass True if other users can mark tasks as done or not done in the checklist */
	others_can_mark_tasks_as_done?: boolean;
}

export declare namespace Location {
	export interface CommonLocation {
		/** Latitude as defined by the sender */
		latitude: number;
		/** Longitude as defined by the sender */
		longitude: number;
		/** The radius of uncertainty for the location, measured in meters; 0-1500 */
		horizontal_accuracy?: number;
	}
	export interface LiveLocation extends CommonLocation {
		/** Time relative to the message sending date, during which the location can be updated, in seconds. For active live locations only. */
		live_period: number;
		/** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
		heading: number;
		/** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
		proximity_alert_radius?: number;
	}
}

/** This object represents a point on the map. */
export type Location = Location.CommonLocation | Location.LiveLocation;

/** This object represents a venue. */
export interface Venue {
	/** Venue location. Can't be a live location */
	location: Location;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue */
	foursquare_id?: string;
	/** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Google Places identifier of the venue */
	google_place_id?: string;
	/** Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
}

/** Describes data sent from a Web App to the bot. */
export interface WebAppData {
	/** The data. Be aware that a bad client can send arbitrary data in this field. */
	data: string;
	/** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
	button_text: string;
}

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export interface ProximityAlertTriggered {
	/** User that triggered the alert */
	traveler: User;
	/** User that set the alert */
	watcher: User;
	/** The distance between the users */
	distance: number;
}

/** This object represents a service message about a change in auto-delete timer settings. */
export interface MessageAutoDeleteTimerChanged {
	/** New auto-delete time for messages in the chat; in seconds */
	message_auto_delete_time: number;
}

/** This object represents a service message about a user boosting a chat. */
export interface ChatBoostAdded {
	/** Number of boosts added by the user */
	boost_count: number;
}

/** This object describes the way a background is filled based on the selected colors. Currently, it can be one of

- BackgroundFillSolid
- BackgroundFillGradient
- BackgroundFillFreeformGradient
*/
export type BackgroundFill = BackgroundFillSolid | BackgroundFillGradient | BackgroundFillFreeformGradient;

/** The background is filled using the selected color. */
export interface BackgroundFillSolid {
	/** Type of the background fill, always “solid” */
	type: "solid";
	/** The color of the background fill in the RGB24 format */
	color: number;
}

/** The background is a gradient fill. */
export interface BackgroundFillGradient {
	/** Type of the background fill, always “gradient” */
	type: "gradient";
	/** Top color of the gradient in the RGB24 format */
	top_color: number;
	/** Bottom color of the gradient in the RGB24 format */
	bottom_color: number;
	/** Clockwise rotation angle of the background fill in degrees; 0-359 */
	rotation_angle: number;
}

/** The background is a freeform gradient that rotates after every message in the chat. */
export interface BackgroundFillFreeformGradient {
	/** Type of the background fill, always “freeform_gradient” */
	type: "freeform_gradient";
	/** A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format */
	colors: number[];
}

/** This object describes the type of a background. Currently, it can be one of

- BackgroundTypeFill
- BackgroundTypeWallpaper
- BackgroundTypePattern
- BackgroundTypeChatTheme
*/
export type BackgroundType =
	| BackgroundTypeFill
	| BackgroundTypeWallpaper
	| BackgroundTypePattern
	| BackgroundTypeChatTheme;

/** The background is automatically filled based on the selected colors. */
export interface BackgroundTypeFill {
	/** Type of the background, always “fill” */
	type: "fill";
	/** The background fill */
	fill: BackgroundFill;
	/** Dimming of the background in dark themes, as a percentage; 0-100 */
	dark_theme_dimming: number;
}

/** The background is a wallpaper in the JPEG format. */
export interface BackgroundTypeWallpaper {
	/** Type of the background, always “wallpaper” */
	type: "wallpaper";
	/** Document with the wallpaper */
	document: Document;
	/** Dimming of the background in dark themes, as a percentage; 0-100 */
	dark_theme_dimming: number;
	/** True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12 */
	is_blurred?: true;
	/** True, if the background moves slightly when the device is tilted */
	is_moving?: true;
}

/** The background is a .PNG or .TGV (gzipped subset of SVG with MIME type “application/x-tgwallpattern”) pattern to be combined with the background fill chosen by the user. */
export interface BackgroundTypePattern {
	/** Type of the background, always “pattern” */
	type: "pattern";
	/** Document with the pattern */
	document: Document;
	/** The background fill that is combined with the pattern */
	fill: BackgroundFill;
	/** Intensity of the pattern when it is shown above the filled background; 0-100 */
	intensity: number;
	/** True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only */
	is_inverted?: true;
	/** True, if the background moves slightly when the device is tilted */
	is_moving?: true;
}

/** The background is taken directly from a built-in chat theme. */
export interface BackgroundTypeChatTheme {
	/** Type of the background, always “chat_theme” */
	type: "chat_theme";
	/** Name of the chat theme, which is usually an emoji */
	theme_name: string;
}

/** This object represents a chat background. */
export interface ChatBackground {
	/** Type of the background */
	type: BackgroundType;
}

/** Describes a service message about checklist tasks marked as done or not done. */
export interface ChecklistTasksDone {
	/** Message containing the checklist whose tasks were marked as done or not done. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	checklist_message?: Message;
	/** Identifiers of the tasks that were marked as done */
	marked_as_done_task_ids?: number[];
	/** Identifiers of the tasks that were marked as not done */
	marked_as_not_done_task_ids?: number[];
}

/** Describes a service message about tasks added to a checklist. */
export interface ChecklistTasksAdded {
	/** Message containing the checklist to which the tasks were added. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	checklist_message?: Message;
	/** List of tasks added to the checklist */
	tasks: ChecklistTask[];
}

/** This object represents a service message about a new forum topic created in the chat. */
export interface ForumTopicCreated {
	/** Name of the topic */
	name: string;
	/** Color of the topic icon in RGB format */
	icon_color: number;
	/** Unique identifier of the custom emoji shown as the topic icon */
	icon_custom_emoji_id?: string;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export interface ForumTopicClosed {}

/** This object represents a service message about an edited forum topic. */
export interface ForumTopicEdited {
	/** New name of the topic, if it was edited */
	name?: string;
	/** New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
	icon_custom_emoji_id?: string;
}

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
export interface ForumTopicReopened {}

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
export interface GeneralForumTopicHidden {}

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
export interface GeneralForumTopicUnhidden {}

/** This object contains information about a user that was shared with the bot using a KeyboardButtonRequestUsers button. **/
export interface SharedUser {
	/** Identifier of the shared user. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
	user_id: number;
	/** First name of the user, if the name was requested by the bot */
	first_name?: string;
	/** Last name of the user, if the name was requested by the bot */
	last_name?: string;
	/** Username of the user, if the username was requested by the bot */
	username?: string;
	/** Available sizes of the chat photo, if the photo was requested by the bot */
	photo?: PhotoSize[];
}

/** This object contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUsers button. */
export interface UsersShared {
	/** Identifier of the request */
	request_id: number;
	/** Information about users shared with the bot. */
	users: SharedUser[];
}

/** This object contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button. */
export interface ChatShared {
	/** Identifier of the request */
	request_id: number;
	/** Identifier of the shared chat. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
	chat_id: number;
	/** Title of the chat, if the title was requested by the bot. */
	title?: string;
	/** Username of the chat, if the username was requested by the bot and available. */
	username?: string;
	/** Available sizes of the chat photo, if the photo was requested by the bot */
	photo?: PhotoSize[];
}

/** This object represents a service message about a user allowing a bot to write messages after adding the bot to the attachment menu or launching a Web App from a link. */
export interface WriteAccessAllowed {
	/** True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess */
	from_request?: boolean;
	/** Name of the Web App, if the access was granted when the Web App was launched from a link */
	web_app_name?: string;
	/** True, if the access was granted when the bot was added to the attachment or side menu */
	from_attachment_menu?: boolean;
}

/** This object represents a service message about a video chat scheduled in the chat. */
export interface VideoChatScheduled {
	/** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
	start_date: number;
}

/** This object represents a service message about a video chat started in the chat. Currently holds no information. */
export interface VideoChatStarted {}

/** This object represents a service message about a video chat ended in the chat. */
export interface VideoChatEnded {
	/** Video chat duration in seconds */
	duration: number;
}

/** This object represents a service message about new members invited to a video chat. */
export interface VideoChatParticipantsInvited {
	/** New members that were invited to the video chat */
	users: User[];
}

export interface PaidMessagePriceChanged {
	/** The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message */
	paid_message_star_count: number;
}

/** Describes a service message about a change in the price of direct messages sent to a channel chat. */
export interface DirectMessagePriceChanged {
	/** True, if direct messages are enabled for the channel chat; false otherwise */
	are_direct_messages_enabled: boolean;
	/** The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Does not apply to users who have been exempted by administrators. Defaults to 0. */
	direct_message_star_count?: number;
}

/** Describes a service message about the approval of a suggested post. */
export interface SuggestedPostApproved {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	suggested_post_message?: Message;
	/** Amount paid for the post */
	price?: SuggestedPostPrice;
	/** Date when the post will be published */
	send_date: number;
}

/** Describes a service message about the failed approval of a suggested post. Currently, only caused by insufficient user funds at the time of approval. */
export interface SuggestedPostApprovalFailed {
	/** Message containing the suggested post whose approval has failed. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	suggested_post_message?: Message;
	/** Expected price of the post */
	price: SuggestedPostPrice;
}

/** Describes a service message about the rejection of a suggested post. */
export interface SuggestedPostDeclined {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	suggested_post_message?: Message;
	/** Comment with which the post was declined */
	comment?: string;
}

/** Describes a service message about a successful payment for a suggested post. */
export interface SuggestedPostPaid {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	suggested_post_message?: Message;
	/** Currency in which the payment was made. Currently, one of “XTR” for Telegram Stars or “TON” for toncoins */
	currency: string;
	/** The amount of the currency that was received by the channel in nanotoncoins; for payments in toncoins only */
	amount?: number;
	/** The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only */
	star_amount?: StarAmount;
}

/** Describes a service message about a payment refund for a suggested post. */
export interface SuggestedPostRefunded {
	/** Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
	suggested_post_message?: Message;
	/** Reason for the refund. Currently, one of “post_deleted” if the post was deleted within 24 hours of being posted or removed from scheduled messages without being posted, or “payment_refunded” if the payer refunded their payment. */
	reason: "post_deleted" | "payment_refunded";
}

/** This object represents a service message about the creation of a scheduled giveaway. */
export interface GiveawayCreated {
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prize_star_count?: number;
}

/** This object represents a message about a scheduled giveaway. */
export interface Giveaway {
	/** The list of chats which the user must join to participate in the giveaway */
	chats: Chat[];
	/** Point in time (Unix timestamp) when winners of the giveaway will be selected */
	winners_selection_date: number;
	/** The number of users which are supposed to be selected as winners of the giveaway */
	winner_count: number;
	/** True, if only users who join the chats after the giveaway started should be eligible to win */
	only_new_members?: true;
	/** True, if the list of giveaway winners will be visible to everyone */
	has_public_winners?: true;
	/** Description of additional giveaway prize */
	prize_description?: string;
	/** A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways. */
	country_codes?: string[];
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prize_star_count?: number;
	/** The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
	premium_subscription_month_count?: number;
}

/** This object represents a message about the completion of a giveaway with public winners. */
export interface GiveawayWinners {
	/** The chat that created the giveaway */
	chat: Chat;
	/** Identifier of the message with the giveaway in the chat */
	giveaway_message_id: number;
	/** Point in time (Unix timestamp) when winners of the giveaway were selected */
	winners_selection_date: number;
	/** Total number of winners in the giveaway */
	winner_count: number;
	/** List of up to 100 winners of the giveaway */
	winners: User[];
	/** The number of other chats the user had to join in order to be eligible for the giveaway */
	additional_chat_count?: number;
	/** The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only */
	prize_star_count?: number;
	/** The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
	premium_subscription_month_count?: number;
	/** Number of undistributed prizes */
	unclaimed_prize_count?: number;
	/** True, if only users who had joined the chats after the giveaway started were eligible to win */
	only_new_members?: true;
	/** True, if the giveaway was canceled because the payment for it was refunded */
	was_refunded?: true;
	/** Description of additional giveaway prize */
	prize_description?: string;
}

/** This object represents a service message about the completion of a giveaway without public winners. */
export interface GiveawayCompleted {
	/** Number of winners in the giveaway */
	winner_count: number;
	/** Number of undistributed prizes */
	unclaimed_prize_count?: number;
	/** Message with the giveaway that was completed, if it wasn't deleted */
	giveaway_message?: Message;
	/** True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway. */
	is_star_giveaway?: true;
}

/** Describes the options used for link preview generation. */
export interface LinkPreviewOptions {
	/** True, if the link preview is disabled */
	is_disabled?: boolean;
	/** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
	url?: string;
	/** True, if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
	prefer_small_media?: boolean;
	/** True, if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
	prefer_large_media?: boolean;
	/** True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
	show_above_text?: boolean;
}

/** Describes the price of a suggested post. */
export interface SuggestedPostPrice {
	/** Currency in which the post will be paid. Currently, must be one of “XTR” for Telegram Stars or “TON” for toncoins */
	currency: string;
	/** The amount of the currency that will be paid for the post in the smallest units of the currency, i.e. Telegram Stars or nanotoncoins. Currently, price in Telegram Stars must be between 5 and 100000, and price in nanotoncoins must be between 10000000 and 10000000000000. */
	amount: number;
}

/** Contains information about a suggested post. */
export interface SuggestedPostInfo {
	/** State of the suggested post. Currently, it can be one of “pending”, “approved”, “declined”. */
	state: "pending" | "approved" | "declined";
	/** Proposed price of the post. If the field is omitted, then the post is unpaid. */
	price?: SuggestedPostPrice;
	/** Proposed send date of the post. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user or administrator who approves it. */
	send_date?: number;
}

/** Contains parameters of a post that is being suggested by the bot. */
export interface SuggestedPostParameters {
	/** Proposed price for the post. If the field is omitted, then the post is unpaid. */
	price?: SuggestedPostPrice;
	/** Proposed send date of the post. If specified, then the date must be between 300 second and 2678400 seconds (30 days) in the future. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user who approves it. */
	send_date?: number;
}

/** Describes a topic of a direct messages chat. */
export interface DirectMessagesTopic {
	/** Unique identifier of the topic */
	topic_id: number;
	/** Information about the user that created the topic. Currently, it is always present */
	user: User;
}

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
	/** Total number of profile pictures the target user has */
	total_count: number;
	/** Requested profile pictures (in up to 4 sizes each) */
	photos: PhotoSize[][];
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

/** Describes a Web App. */
export interface WebAppInfo {
	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	url: string;
}

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). Not supported in channels and for messages sent on behalf of a Telegram Business account. */
export interface ReplyKeyboardMarkup {
	/** Array of button rows, each represented by an Array of KeyboardButton objects */
	keyboard: KeyboardButton[][];
	/** Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to false, in which case the custom keyboard can be hidden and opened with a keyboard icon. */
	is_persistent?: boolean;
	/** Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
	resize_keyboard?: boolean;
	/** Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to false. */
	one_time_keyboard?: boolean;
	/** The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
	input_field_placeholder?: string;
	/** Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are `@mentioned` in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.

Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
	selective?: boolean;
}

/** This object represents one button of the reply keyboard. At most one of the optional fields must be used to specify type of the button. For simple text buttons, String can be used instead of this object to specify the button text. */
export declare namespace KeyboardButton {
	interface Common {
		/** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
		text: string;
	}
	export interface RequestUsers extends Common {
		/** If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “users_shared” service message. Available in private chats only. */
		request_users: KeyboardButtonRequestUsers;
	}
	export interface RequestChat extends Common {
		/** If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat_shared” service message. Available in private chats only. */
		request_chat: KeyboardButtonRequestChat;
	}
	export interface RequestContact extends Common {
		/** If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only. */
		request_contact: boolean;
	}
	export interface RequestLocation extends Common {
		/** If True, the user's current location will be sent when the button is pressed. Available in private chats only. */
		request_location: boolean;
	}
	export interface RequestPoll extends Common {
		/** If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only. */
		request_poll: KeyboardButtonPollType;
	}
	export interface WebApp extends Common {
		/** If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a “web_app_data” service message. Available in private chats only. */
		web_app: WebAppInfo;
	}
}

/** This object represents one button of the reply keyboard. For simple text buttons, String can be used instead of this object to specify the button text. The optional fields web_app, request_user, request_chat, request_contact, request_location, and request_poll are mutually exclusive. */
export type KeyboardButton =
	| KeyboardButton.RequestUsers
	| KeyboardButton.RequestChat
	| KeyboardButton.RequestContact
	| KeyboardButton.RequestLocation
	| KeyboardButton.RequestPoll
	| KeyboardButton.WebApp
	| string;

/** This object defines the criteria used to request suitable users. The identifiers of the selected users will be shared with the bot when the corresponding button is pressed. */
export interface KeyboardButtonRequestUsers {
	/** Signed 32-bit identifier of the request that will be received back in the UsersShared object. Must be unique within the message. */
	request_id: number;
	/** Pass True to request bots, pass False to request regular users. If not specified, no additional restrictions are applied. */
	user_is_bot?: boolean;
	/** Pass True to request premium users, pass False to request non-premium users. If not specified, no additional restrictions are applied. */
	user_is_premium?: boolean;
	/** The maximum number of users to be selected; 1-10. Defaults to 1. */
	max_quantity?: number;
	/** Pass True to request the users' first and last names */
	request_name?: boolean;
	/** Pass True to request the users' usernames */
	request_username?: boolean;
	/** Pass True to request the users' photos */
	request_photo?: boolean;
}

/** This object defines the criteria used to request a suitable chat. Information about the selected chat will be shared with the bot when the corresponding button is pressed. The bot will be granted requested rights in the chat if appropriate. */
export interface KeyboardButtonRequestChat {
	/** Signed 32-bit identifier of the request, which will be received back in the ChatShared object. Must be unique within the message */
	request_id: number;
	/** Pass True to request a channel chat, pass False to request a group or a supergroup chat. */
	chat_is_channel: boolean;
	/** Pass True to request a forum supergroup, pass False to request a non-forum chat. If not specified, no additional restrictions are applied. */
	chat_is_forum?: boolean;
	/** Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username. If not specified, no additional restrictions are applied. */
	chat_has_username?: boolean;
	/** Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied. */
	chat_is_created?: boolean;
	/** An object listing the required administrator rights of the user in the chat. The rights must be a superset of bot_administrator_rights. If not specified, no additional restrictions are applied. */
	user_administrator_rights?: ChatAdministratorRights;
	/** An object listing the required administrator rights of the bot in the chat. The rights must be a subset of user_administrator_rights. If not specified, no additional restrictions are applied. */
	bot_administrator_rights?: ChatAdministratorRights;
	/** Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied. */
	bot_is_member?: boolean;
	/** Pass True to request the chat's title */
	request_title?: boolean;
	/** Pass True to request the chat's username */
	request_username?: boolean;
	/** Pass True to request the chat's photo */
	request_photo?: boolean;
}

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface KeyboardButtonPollType {
	/** If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
	type?: "quiz" | "regular";
}

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). */
export interface ReplyKeyboardRemove {
	/** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) */
	remove_keyboard: true;
	/** Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.

  Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
	selective?: boolean;
}

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface InlineKeyboardMarkup {
	/** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
	inline_keyboard: InlineKeyboardButton[][];
}

export declare namespace InlineKeyboardButton {
	interface AbstractInlineKeyboardButton {
		/** Label text on the button */
		text: string;
	}
	export interface UrlButton extends AbstractInlineKeyboardButton {
		/** HTTP or tg:// URL to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings. */
		url: string;
	}
	export interface CallbackButton extends AbstractInlineKeyboardButton {
		/** Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes */
		callback_data: string;
	}
	export interface WebAppButton extends AbstractInlineKeyboardButton {
		/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a Telegram Business account. */
		web_app: WebAppInfo;
	}
	export interface LoginButton extends AbstractInlineKeyboardButton {
		/** An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. */
		login_url: LoginUrl;
	}
	export interface SwitchInlineButton extends AbstractInlineKeyboardButton {
		/** If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a Telegram Business account. */
		switch_inline_query: string;
	}
	export interface SwitchInlineCurrentChatButton extends AbstractInlineKeyboardButton {
		/** If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.

    This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options. Not supported for messages sent in channel direct messages chats and on behalf of a Telegram Business account. */
		switch_inline_query_current_chat: string;
	}
	export interface SwitchInlineChosenChatButton extends AbstractInlineKeyboardButton {
		/** If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a Telegram Business account. */
		switch_inline_query_chosen_chat: SwitchInlineQueryChosenChat;
	}
	export interface CopyButton extends AbstractInlineKeyboardButton {
		/** Description of the button that copies the specified text to the clipboard. */
		copy_text: CopyTextButton;
	}
	export interface GameButton extends AbstractInlineKeyboardButton {
		/** Description of the game that will be launched when the user presses the button.

    NOTE: This type of button must always be the first button in the first row. */
		callback_game: CallbackGame;
	}
	export interface PayButton extends AbstractInlineKeyboardButton {
		/** Specify True, to send a Pay button.

    NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages. */
		pay: boolean;
	}
}

/** This object represents one button of an inline keyboard. Exactly one of the optional fields must be used to specify type of the button. */
export type InlineKeyboardButton =
	| InlineKeyboardButton.UrlButton
	| InlineKeyboardButton.CallbackButton
	| InlineKeyboardButton.WebAppButton
	| InlineKeyboardButton.LoginButton
	| InlineKeyboardButton.SwitchInlineButton
	| InlineKeyboardButton.SwitchInlineCurrentChatButton
	| InlineKeyboardButton.SwitchInlineChosenChatButton
	| InlineKeyboardButton.CopyButton
	| InlineKeyboardButton.GameButton
	| InlineKeyboardButton.PayButton;

/** This object represents a parameter of the inline keyboard button used to automatically authorize a user. Serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in.
Telegram apps support these buttons as of version 5.7. */
export interface LoginUrl {
	/** An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.

  NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization. */
	url: string;
	/** New text of the button in forwarded messages. */
	forward_text?: string;
	/** Username of a bot, which will be used for user authorization. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details. */
	bot_username?: string;
	/** Pass True to request the permission for your bot to send messages to the user. */
	request_write_access?: boolean;
}

/** This object represents an inline button that switches the current user to inline mode in a chosen chat, with an optional default inline query. */
export interface SwitchInlineQueryChosenChat {
	/** The default inline query to be inserted in the input field. If left empty, only the bot's username will be inserted */
	query?: string;
	/** True, if private chats with users can be chosen */
	allow_user_chats?: boolean;
	/** True, if private chats with bots can be chosen */
	allow_bot_chats?: boolean;
	/** True, if group and supergroup chats can be chosen */
	allow_group_chats?: boolean;
	/** True, if channel chats can be chosen */
	allow_channel_chats?: boolean;
}

/** This object represents an inline keyboard button that copies specified text to the clipboard. */
export interface CopyTextButton {
	/** The text to be copied to the clipboard; 1-256 characters */
	text: string;
}

export declare namespace CallbackQuery {
	interface AbstractQuery {
		/** Unique identifier for this query */
		id: string;
		/** Sender */
		from: User;
		/** Message sent by the bot with the callback button that originated the query */
		message?: MaybeInaccessibleMessage;
		/** Identifier of the message sent via the bot in inline mode, that originated the query. */
		inline_message_id?: string;
		/** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
		chat_instance: string;
	}

	export interface DataQuery extends AbstractQuery {
		/** Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data. */
		data: string;
	}

	export interface GameQuery extends AbstractQuery {
		/** Short name of a Game to be returned, serves as the unique identifier for the game */
		game_short_name: string;
	}
}

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.

 NOTE: After the user presses a callback button, Telegram clients will display a progress bar until you call answerCallbackQuery. It is, therefore, necessary to react by calling answerCallbackQuery even if no notification to the user is needed (e.g., without specifying any of the optional parameters). */
export type CallbackQuery = CallbackQuery.DataQuery | CallbackQuery.GameQuery;

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.

Example: A poll bot for groups runs in privacy mode (only receives commands, replies to its messages and mentions). There could be two ways to create a new poll:

Explain the user how to send a command with parameters (e.g. /newpoll question answer1 answer2). May be appealing for hardcore users but lacks modern day polish.

Guide the user through a step-by-step process. 'Please send me your question', 'Cool, now let's add the first answer option', 'Great. Keep adding answer options, then send /done when you're ready'.

The last option is definitely more attractive. And if you use ForceReply in your bot's questions, it will receive the user's answers even if it only receives replies, commands and mentions - without any extra work for the user. */
export interface ForceReply {
	/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. Not supported in channels and for messages sent on behalf of a Telegram Business account. */
	force_reply: true;
	/** The placeholder to be shown in the input field when the reply is active; 1-64 characters */
	input_field_placeholder?: string;
	/** Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. */
	selective?: boolean;
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
	/** The number of seconds the subscription will be active for before the next payment */
	subscription_period?: number;
	/** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link */
	subscription_price?: number;
}

/** Represents the rights of an administrator in a chat. */
export interface ChatAdministratorRights {
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
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
	/** True, if the administrator can post stories to the chat */
	can_post_stories: boolean;
	/** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	can_edit_stories: boolean;
	/** True, if the administrator can delete stories posted by other users */
	can_delete_stories: boolean;
	/** True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	can_post_messages?: boolean;
	/** True, if the administrator can edit messages of other users and can pin messages; for channels only */
	can_edit_messages?: boolean;
	/** True, if the user is allowed to pin messages; for groups and supergroups only */
	can_pin_messages?: boolean;
	/** True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	can_manage_topics?: boolean;
	/** True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
	can_manage_direct_messages?: boolean;
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
	/** True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator */
	via_join_request?: boolean;
	/** True, if the user joined the chat via a chat folder invite link */
	via_chat_folder_invite_link?: boolean;
}

export interface AbstractChatMember {
	/** The member's status in the chat */
	status: string;
	/** Information about the user */
	user: User;
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
	/** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
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
	/** True, if the administrator can post stories to the chat */
	can_post_stories: boolean;
	/** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
	can_edit_stories: boolean;
	/** True, if the administrator can delete stories posted by other users */
	can_delete_stories: boolean;
	/** True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
	can_post_messages?: boolean;
	/** True, if the administrator can edit messages of other users and can pin messages; for channels only */
	can_edit_messages?: boolean;
	/** True, if the user is allowed to pin messages; for groups and supergroups only */
	can_pin_messages?: boolean;
	/** True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
	can_manage_topics?: boolean;
	/** True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
	can_manage_direct_messages?: boolean;
	/** Custom title for this user */
	custom_title?: string;
}

/** Represents a chat member that has no additional privileges or restrictions. */
export interface ChatMemberMember extends AbstractChatMember {
	status: "member";
	/** Date when the user's subscription will expire; Unix time */
	until_date?: number;
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
	/** True, if the user is allowed to send polls and checklists */
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
	/** True, if the user is allowed to send polls and checklists */
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

/** Describes the position of a clickable area within a story. */
export interface StoryAreaPosition {
	/** The abscissa of the area's center, as a percentage of the media width */
	x_percentage: number;
	/** The ordinate of the area's center, as a percentage of the media height */
	y_percentage: number;
	/** The width of the area's rectangle, as a percentage of the media width */
	width_percentage: number;
	/** The height of the area's rectangle, as a percentage of the media height */
	height_percentage: number;
	/** The clockwise rotation angle of the rectangle, in degrees; 0-360 */
	rotation_angle: number;
	/** The radius of the rectangle corner rounding, as a percentage of the media width */
	corner_radius_percentage: number;
}

/** Describes the physical address of a location. */
export interface LocationAddress {
	/** The two-letter ISO 3166-1 alpha-2 country code of the country where the location is located */
	country_code: string;
	/** State of the location */
	state?: string;
	/** City of the location */
	city?: string;
	/** Street address of the location */
	street?: string;
}

/** Describes the type of a clickable area on a story. Currently, it can be one of */
export type StoryAreaType =
	| StoryAreaTypeLocation
	| StoryAreaTypeSuggestedReaction
	| StoryAreaTypeLink
	| StoryAreaTypeWeather
	| StoryAreaTypeUniqueGift;

/** Describes a story area pointing to a location. Currently, a story can have up to 10 location areas. */
export interface StoryAreaTypeLocation {
	/** Type of the area, always “location” */
	type: "location";
	/** Location latitude in degrees */
	latitude: number;
	/** Location longitude in degrees */
	longitude: number;
	/** Address of the location */
	address?: LocationAddress;
}

/** Describes a story area pointing to a suggested reaction. Currently, a story can have up to 5 suggested reaction areas. */
export interface StoryAreaTypeSuggestedReaction {
	/** Type of the area, always “suggested_reaction” */
	type: "suggested_reaction";
	/** Type of the reaction */
	reaction_type: ReactionType;
	/** Pass True if the reaction area has a dark background */
	is_dark?: boolean;
	/** Pass True if reaction area corner is flipped */
	is_flipped?: boolean;
}

/** Describes a story area pointing to an HTTP or tg:// link. Currently, a story can have up to 3 link areas. */
export interface StoryAreaTypeLink {
	/** Type of the area, always “link” */
	type: "link";
	/** HTTP or tg:// URL to be opened when the area is clicked */
	url: string;
}

/** Describes a story area containing weather information. Currently, a story can have up to 3 weather areas. */
export interface StoryAreaTypeWeather {
	/** Type of the area, always “weather” */
	type: "weather";
	/** Temperature, in degree Celsius */
	temperature: number;
	/** Emoji representing the weather */
	emoji: string;
	/** A color of the area background in the ARGB format */
	background_color: number;
}

/** Describes a story area pointing to a unique gift. Currently, a story can have at most 1 unique gift area. */
export interface StoryAreaTypeUniqueGift {
	/** Type of the area, always “unique_gift” */
	type: "unique_gift";
	/** Unique name of the gift */
	name: string;
}

/** Describes a clickable area on a story media. */
export interface StoryArea {
	/** Position of the area */
	position: StoryAreaPosition;
	/** Type of the area */
	type: StoryAreaType;
}

/** Represents a location to which a chat is connected. */
export interface ChatLocation {
	/** The location to which the supergroup is connected. Can't be a live location. */
	location: Location;
	/** Location address; 1-64 characters, as defined by the chat owner */
	address: string;
}

export interface AbstractReactionType {
	/** Type of the reaction */
	type: string;
}

/** This object describes the type of a reaction. Currently, it can be one of
 * - ReactionTypeEmoji
 * - ReactionTypeCustomEmoji
 */
export type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji | ReactionTypePaid;

// deno-fmt-ignore
export type TelegramEmoji =
	| "❤"
	| "👍"
	| "👎"
	| "🔥"
	| "🥰"
	| "👏"
	| "😁"
	| "🤔"
	| "🤯"
	| "😱"
	| "🤬"
	| "😢"
	| "🎉"
	| "🤩"
	| "🤮"
	| "💩"
	| "🙏"
	| "👌"
	| "🕊"
	| "🤡"
	| "🥱"
	| "🥴"
	| "😍"
	| "🐳"
	| "❤‍🔥"
	| "🌚"
	| "🌭"
	| "💯"
	| "🤣"
	| "⚡"
	| "🍌"
	| "🏆"
	| "💔"
	| "🤨"
	| "😐"
	| "🍓"
	| "🍾"
	| "💋"
	| "🖕"
	| "😈"
	| "😴"
	| "😭"
	| "🤓"
	| "👻"
	| "👨‍💻"
	| "👀"
	| "🎃"
	| "🙈"
	| "😇"
	| "😨"
	| "🤝"
	| "✍"
	| "🤗"
	| "🫡"
	| "🎅"
	| "🎄"
	| "☃"
	| "💅"
	| "🤪"
	| "🗿"
	| "🆒"
	| "💘"
	| "🙉"
	| "🦄"
	| "😘"
	| "💊"
	| "🙊"
	| "😎"
	| "👾"
	| "🤷‍♂"
	| "🤷"
	| "🤷‍♀"
	| "😡";

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

/** The reaction is paid. */
export interface ReactionTypePaid extends AbstractReactionType {
	/** Type of the reaction, always “paid” */
	type: "paid";
}

/** Represents a reaction added to a message along with the number of times it was added. */
export interface ReactionCount {
	/** Type of the reaction */
	type: ReactionType;
	/** Number of times the reaction was added */
	total_count: number;
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

/** This object represents a gift that can be sent by the bot. */
export interface Gift {
	/** Unique identifier of the gift */
	id: string;
	/** The sticker that represents the gift */
	sticker: Sticker;
	/** The number of Telegram Stars that must be paid to send the sticker */
	star_count: number;
	/** The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
	upgrade_star_count?: number;
	/** The total number of the gifts of this type that can be sent; for limited gifts only */
	total_count?: number;
	/** The number of remaining gifts of this type that can be sent; for limited gifts only */
	remaining_count?: number;
	/** Information about the chat that published the gift */
	publisher_chat?: Chat;
}

/** This object represent a list of gifts. */
export interface Gifts {
	/** The list of gifts */
	gifts: Gift[];
}

/** This object describes the model of a unique gift. */
export interface UniqueGiftModel {
	/** Name of the model */
	name: string;
	/** The sticker that represents the unique gift */
	sticker: Sticker;
	/** The number of unique gifts that receive this model for every 1000 gifts upgraded */
	rarity_per_mille: number;
}

/** This object describes the symbol shown on the pattern of a unique gift. */
export interface UniqueGiftSymbol {
	/** Name of the symbol */
	name: string;
	/** The sticker that represents the unique gift */
	sticker: Sticker;
	/** The number of unique gifts that receive this model for every 1000 gifts upgraded */
	rarity_per_mille: number;
}

/** This object describes the colors of the backdrop of a unique gift. */
export interface UniqueGiftBackdropColors {
	/** The color in the center of the backdrop in RGB format */
	center_color: number;
	/** The color on the edges of the backdrop in RGB format */
	edge_color: number;
	/** The color to be applied to the symbol in RGB format */
	symbol_color: number;
	/** The color for the text on the backdrop in RGB format */
	text_color: number;
}

/** This object describes the backdrop of a unique gift. */
export interface UniqueGiftBackdrop {
	/** Name of the backdrop */
	name: string;
	/** Colors of the backdrop */
	colors: UniqueGiftBackdropColors;
	/** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
	rarity_per_mille: number;
}

/** This object describes a unique gift that was upgraded from a regular gift. */
export interface UniqueGift {
	/** Human-readable name of the regular gift from which this unique gift was upgraded */
	base_name: string;
	/** Unique name of the gift. This name can be used in https://t.me/nft/... links and story areas */
	name: string;
	/** Unique number of the upgraded gift among gifts upgraded from the same regular gift */
	number: number;
	/** Model of the gift */
	model: UniqueGiftModel;
	/** Symbol of the gift */
	symbol: UniqueGiftSymbol;
	/** Backdrop of the gift */
	backdrop: UniqueGiftBackdrop;
	/** Information about the chat that published the gift */
	publisher_chat?: Chat;
}

/** Describes a service message about a regular gift that was sent or received. */
export interface GiftInfo {
	/** Information about the gift */
	gift: Gift;
	/** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	owned_gift_id?: string;
	/** Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
	convert_star_count?: number;
	/** Number of Telegram Stars that were prepaid by the sender for the ability to upgrade the gift */
	prepaid_upgrade_star_count?: number;
	/** True, if the gift can be upgraded to a unique gift */
	can_be_upgraded?: true;
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	is_private?: true;
}

/** Describes a service message about a unique gift that was sent or received. */
export interface UniqueGiftInfo {
	/** Information about the gift */
	gift: UniqueGift;
	/** Origin of the gift. Currently, either “upgrade” for gifts upgraded from regular gifts, “transfer” for gifts transferred from other users or channels, or “resale” for gifts bought from other users */
	origin: "upgrade" | "transfer" | "resale";
	/** For gifts bought from other users, the price paid for the gift */
	last_resale_star_count?: number;
	/** Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	owned_gift_id?: string;
	/** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
	transfer_star_count?: number;
	/** Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now */
	next_transfer_date?: number;
}

/** This object describes a gift received and owned by a user or a chat. Currently, it can be one of
 * - OwnedGiftRegular
 * - OwnedGiftUnique. */
export type OwnedGift = OwnedGiftRegular | OwnedGiftUnique;

/** Describes a regular gift owned by a user or a chat. */
export interface OwnedGiftRegular {
	/** Type of the gift, always “regular” */
	type: "regular";
	/** Information about the regular gift */
	gift: Gift;
	/** Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
	owned_gift_id?: string;
	/** Sender of the gift if it is a known user */
	sender_user?: User;
	/** Date the gift was sent in Unix time */
	send_date: number;
	/** Text of the message that was added to the gift */
	text?: string;
	/** Special entities that appear in the text */
	entities?: MessageEntity[];
	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	is_private?: true;
	/** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
	is_saved?: true;
	/** True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
	can_be_upgraded?: true;
	/** True, if the gift was refunded and isn't available anymore */
	was_refunded?: true;
	/** Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars */
	convert_star_count?: number;
	/** Number of Telegram Stars that were paid by the sender for the ability to upgrade the gift */
	prepaid_upgrade_star_count?: number;
}

/** Describes a unique gift received and owned by a user or a chat. */
export interface OwnedGiftUnique {
	/** Type of the gift, always “unique” */
	type: "unique";
	/** Information about the unique gift */
	gift: UniqueGift;
	/** Unique identifier of the received gift for the bot; for gifts received on behalf of business accounts only */
	owned_gift_id?: string;
	/** Sender of the gift if it is a known user */
	sender_user?: User;
	/** Date the gift was sent in Unix time */
	send_date: number;
	/** True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
	is_saved?: true;
	/** True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
	can_be_transferred?: true;
	/** Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
	transfer_star_count?: number;
	/** Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now */
	next_transfer_date?: number;
}

/** Contains the list of gifts received and owned by a user or a chat. */
export interface OwnedGifts {
	/** The total number of gifts owned by the user or the chat */
	total_count: number;
	/** The list of gifts */
	gifts: OwnedGift[];
	/** Offset for the next request. If empty, then there are no more results */
	next_offset?: string;
}

/** This object describes the types of gifts that can be gifted to a user or a chat. */
export interface AcceptedGiftTypes {
	/** True, if unlimited regular gifts are accepted */
	unlimited_gifts: boolean;
	/** True, if limited regular gifts are accepted */
	limited_gifts: boolean;
	/** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
	unique_gifts: boolean;
	/** True, if a Telegram Premium subscription is accepted */
	premium_subscription: boolean;
}

/** Describes an amount of Telegram Stars. */
export interface StarAmount {
	/** Integer amount of Telegram Stars, rounded to 0; can be negative */
	amount: number;
	/** Optional. The number of 1/1000000000 shares of Telegram Stars; from -999999999 to 999999999; can be negative if and only if amount is non-positive */
	nanostar_amount?: number;
}

/** This object represents a bot command. */
export interface BotCommand {
	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	command: string;
	/** Description of the command; 1-256 characters. */
	description: string;
}

/** This object represents the scope to which bot commands are applied. Currently, the following 7 scopes are supported:
- BotCommandScopeDefault
- BotCommandScopeAllPrivateChats
- BotCommandScopeAllGroupChats
- BotCommandScopeAllChatAdministrators
- BotCommandScopeChat
- BotCommandScopeChatAdministrators
- BotCommandScopeChatMember

## Determining list of commands

The following algorithm is used to determine the list of commands for a particular user viewing the bot menu. The first list of commands which is set is returned:

### Commands in the chat with the bot
- botCommandScopeChat + language_code
- botCommandScopeChat
- botCommandScopeAllPrivateChats + language_code
- botCommandScopeAllPrivateChats
- botCommandScopeDefault + language_code
- botCommandScopeDefault

### Commands in group and supergroup chats
- botCommandScopeChatMember + language_code
- botCommandScopeChatMember
- botCommandScopeChatAdministrators + language_code (administrators only)
- botCommandScopeChatAdministrators (administrators only)
- botCommandScopeChat + language_code
- botCommandScopeChat
- botCommandScopeAllChatAdministrators + language_code (administrators only)
- botCommandScopeAllChatAdministrators (administrators only)
- botCommandScopeAllGroupChats + language_code
- botCommandScopeAllGroupChats
- botCommandScopeDefault + language_code
- botCommandScopeDefault */
export type BotCommandScope =
	| BotCommandScopeDefault
	| BotCommandScopeAllPrivateChats
	| BotCommandScopeAllGroupChats
	| BotCommandScopeAllChatAdministrators
	| BotCommandScopeChat
	| BotCommandScopeChatAdministrators
	| BotCommandScopeChatMember;

/** Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user. */
export interface BotCommandScopeDefault {
	/** Scope type, must be default */
	type: "default";
}

/** Represents the scope of bot commands, covering all private chats. */
export interface BotCommandScopeAllPrivateChats {
	/** Scope type, must be all_private_chats */
	type: "all_private_chats";
}

/** Represents the scope of bot commands, covering all group and supergroup chats. */
export interface BotCommandScopeAllGroupChats {
	/** Scope type, must be all_group_chats */
	type: "all_group_chats";
}

/** Represents the scope of bot commands, covering all group and supergroup chat administrators. */
export interface BotCommandScopeAllChatAdministrators {
	/** Scope type, must be all_chat_administrators */
	type: "all_chat_administrators";
}

/** Represents the scope of bot commands, covering a specific chat. */
export interface BotCommandScopeChat {
	/** Scope type, must be chat */
	type: "chat";
	/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`). Channel direct messages chats and channel chats aren't supported. */
	chat_id: number | string;
}

/** Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat. */
export interface BotCommandScopeChatAdministrators {
	/** Scope type, must be chat_administrators */
	type: "chat_administrators";
	/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`). Channel direct messages chats and channel chats aren't supported. */
	chat_id: number | string;
}

/** Represents the scope of bot commands, covering a specific member of a group or supergroup chat. */
export interface BotCommandScopeChatMember {
	/** Scope type, must be chat_member */
	type: "chat_member";
	/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`). Channel direct messages chats and channel chats aren't supported. */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
}

/** This object represents the bot's name. */
export interface BotName {
	/** The bot's name */
	name: string;
}

/** This object represents the bot's description. */
export interface BotDescription {
	/** The bot's description */
	description: string;
}

/** This object represents the bot's short description. */
export interface BotShortDescription {
	/** The bot's short description */
	short_description: string;
}

/** This object describes the bot's menu button in a private chat. It should be one of
- MenuButtonCommands
- MenuButtonWebApp
- MenuButtonDefault

If a menu button other than MenuButtonDefault is set for a private chat, then it is applied in the chat. Otherwise the default menu button is applied. By default, the menu button opens the list of bot commands. */
export type MenuButton = MenuButtonCommands | MenuButtonWebApp | MenuButtonDefault;

/** Represents a menu button, which opens the bot's list of commands. */
export interface MenuButtonCommands {
	/** Type of the button, must be commands */
	type: "commands";
}

/** Represents a menu button, which launches a Web App. */
export interface MenuButtonWebApp {
	/** Button type, must be web_app */
	type: "web_app";
	/** Text on the button */
	text: string;
	/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App of the bot can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link. */
	web_app: WebAppInfo;
}

/** Describes that no specific value for the menu button was set. */
export interface MenuButtonDefault {
	/** Type of the button, must be default */
	type: "default";
}

export interface AbstractChatBoostSource {
	/** Source of the boost */
	source: string;
}

/** This object describes the source of a chat boost. It can be one of

- ChatBoostSourcePremium
- ChatBoostSourceGiftCode
- ChatBoostSourceGiveaway
*/
export type ChatBoostSource = ChatBoostSourcePremium | ChatBoostSourceGiftCode | ChatBoostSourceGiveaway;

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

/** The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription for Telegram Premium giveaways and prize_star_count / 500 times for one year for Telegram Star giveaways. */
export interface ChatBoostSourceGiveaway extends AbstractChatBoostSource {
	source: "giveaway";
	/** Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet. */
	giveaway_message_id: number;
	/** Optional. User that won the prize in the giveaway if any; for Telegram Premium giveaways only */
	user?: User;
	/** The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
	prize_star_count?: number;
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
	/** Information about the chat boost */
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

/** Represents the rights of a business bot. */
export interface BusinessBotRights {
	/** True, if the bot can send and edit messages in the private chats that had incoming messages in the last 24 hours */
	can_reply?: true;
	/** True, if the bot can mark incoming private messages as read */
	can_read_messages?: true;
	/** True, if the bot can delete messages sent by the bot */
	can_delete_sent_messages?: true;
	/** True, if the bot can delete all private messages in managed chats */
	can_delete_all_messages?: true;
	/** True, if the bot can edit the first and last name of the business account */
	can_edit_name?: true;
	/** True, if the bot can edit the bio of the business account */
	can_edit_bio?: true;
	/** True, if the bot can edit the profile photo of the business account */
	can_edit_profile_photo?: true;
	/** True, if the bot can edit the username of the business account */
	can_edit_username?: true;
	/** True, if the bot can change the privacy settings pertaining to gifts for the business account */
	can_change_gift_settings?: true;
	/** True, if the bot can view gifts and the amount of Telegram Stars owned by the business account */
	can_view_gifts_and_stars?: true;
	/** True, if the bot can convert regular gifts owned by the business account to Telegram Stars */
	can_convert_gifts_to_stars?: true;
	/** True, if the bot can transfer and upgrade gifts owned by the business account */
	can_transfer_and_upgrade_gifts?: true;
	/** True, if the bot can transfer Telegram Stars received by the business account to its own account, or use them to upgrade and transfer gifts */
	can_transfer_stars?: true;
	/** True, if the bot can post, edit and delete stories on behalf of the business account */
	can_manage_stories?: true;
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
	/** Rights of the business bot */
	rights?: BusinessBotRights;
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

/** This object is received when messages are deleted from a connected business account. */
export interface BusinessMessagesDeleted {
	/** Unique identifier of the business connection */
	business_connection_id: string;
	/** Information about a chat in the business account. The bot may not have access to the chat or the corresponding user. */
	chat: Chat;
	/** The list of identifiers of deleted messages in the chat of the business account */
	message_ids: number[];
}

/** Describes an inline message sent by a Web App on behalf of a user. */
export interface SentWebAppMessage {
	/** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
	inline_message_id?: string;
}

/** Describes an inline message to be sent by a user of a Mini App. */
export interface PreparedInlineMessage {
	/** Unique identifier of the prepared message */
	id: string;
	/** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used */
	expiration_date: number;
}

export interface ApiError {
	ok: false;
	error_code: number;
	description: string;
	parameters?: ResponseParameters;
}

export interface ApiSuccess<T> {
	ok: true;
	result: T;
}

/** The response contains an object, which always has a Boolean field 'ok' and may have an optional String field 'description' with a human-readable description of the result. If 'ok' equals true, the request was successful and the result of the query can be found in the 'result' field. In case of an unsuccessful request, 'ok' equals false and the error is explained in the 'description'. An Integer 'error_code' field is also returned, but its contents are subject to change in the future. Some errors may also have an optional field 'parameters' of the type ResponseParameters, which can help to automatically handle the error.

All methods in the Bot API are case-insensitive.
All queries must be made using UTF-8. */
export type ApiResponse<T> = ApiError | ApiSuccess<T>;

/** Describes why a request was unsuccessful. */
export interface ResponseParameters {
	/** The group has been migrated to a supergroup with the specified identifier. */
	migrate_to_chat_id?: number;
	/** In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
	retry_after?: number;
}

/** This object represents the content of a media message to be sent. It should be one of
  - InputMediaAnimation
  - InputMediaDocument
  - InputMediaAudio
  - InputMediaPhoto
  - InputMediaVideo */
export type InputMedia<F> =
	| InputMediaAnimation<F>
	| InputMediaAudio<F>
	| InputMediaDocument<F>
	| InputMediaPhoto<F>
	| InputMediaVideo<F>;

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface InputMediaAnimation<F> {
	/** Type of the result, must be animation */
	type: "animation";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
	thumbnail?: F;
	/** Caption of the animation to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the animation caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Animation width */
	width?: number;
	/** Animation height */
	height?: number;
	/** Animation duration in seconds */
	duration?: number;
	/** Pass True if the photo needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
}

/** Represents an audio file to be treated as music to be sent. */
export interface InputMediaAudio<F> {
	/** Type of the result, must be audio */
	type: "audio";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
	thumbnail?: F;
	/** Caption of the audio to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Duration of the audio in seconds */
	duration?: number;
	/** Performer of the audio */
	performer?: string;
	/** Title of the audio */
	title?: string;
}

/** Represents a general file to be sent. */
export interface InputMediaDocument<F> {
	/** Type of the result, must be document */
	type: "document";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
	thumbnail?: F;
	/** Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
	disable_content_type_detection?: boolean;
}

/** Represents a photo to be sent. */
export interface InputMediaPhoto<F> {
	/** Type of the result, must be photo */
	type: "photo";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
	/** Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Pass True if the photo needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
}

/** Represents a video to be sent. */
export interface InputMediaVideo<F> {
	/** Type of the result, must be video */
	type: "video";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
	thumbnail?: F;
	/** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	cover?: F | string;
	/** Start timestamp for the video in the message */
	start_timestamp?: number;
	/** Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Video width */
	width?: number;
	/** Video height */
	height?: number;
	/** Video duration in seconds */
	duration?: number;
	/** Pass True if the uploaded video is suitable for streaming */
	supports_streaming?: boolean;
	/** Pass True if the photo needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
}

/** This object describes the paid media to be sent. Currently, it can be one of
- InputPaidMediaPhoto
- InputPaidMediaVideo */
export type InputPaidMedia<F> = InputPaidMediaPhoto<F> | InputPaidMediaVideo<F>;

/** The paid media to send is a photo. */
export interface InputPaidMediaPhoto<F> {
	/** Type of the media, must be photo */
	type: "photo";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
}

/** The paid media to send is a video. */
export interface InputPaidMediaVideo<F> {
	/** Type of the media, must be video */
	type: "video";
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	media: F | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
	thumbnail?: F | string;
	/** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
	cover?: F | string;
	/** Start timestamp for the video in the message */
	start_timestamp?: number;
	/** Video width */
	width?: number;
	/** Video height */
	height?: number;
	/** Video duration in seconds */
	duration?: number;
	/** Pass True if the uploaded video is suitable for streaming */
	supports_streaming?: boolean;
}

/** This object describes a profile photo to set. Currently, it can be one of
- InputProfilePhotoStatic
- InputProfilePhotoAnimated */
export type InputProfilePhoto<F> = InputProfilePhotoStatic<F> | InputProfilePhotoAnimated<F>;

/** A static profile photo in the .JPG format. */
export interface InputProfilePhotoStatic<F> {
	/** Type of the profile photo, must be static */
	type: "static";
	/** The static profile photo. Profile photos can't be reused and can only be uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a photo. */
	photo: F | string;
}

/** An animated profile photo in the MPEG4 format. */
export interface InputProfilePhotoAnimated<F> {
	/** Type of the profile photo, must be animated */
	type: "animated";
	/** The animated profile photo. Profile photos can't be reused and can only be uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a photo. */
	animation: F | string;
	/** Timestamp in seconds of the frame that will be used as the static profile photo. Defaults to 0.0. */
	main_frame_timestamp?: number;
}

/** This object describes the content of a story to post. Currently, it can be one of
- InputStoryContentPhoto
- InputStoryContentVideo */
export type InputStoryContent<F> = InputStoryContentPhoto<F> | InputStoryContentVideo<F>;

/** Describes a photo to post as a story. */
export interface InputStoryContentPhoto<F> {
	/** Type of the content, must be photo */
	type: "photo";
	/** The photo to post as a story. The photo must be of the size 1080x1920 and must not exceed 10 MB. The photo can't be reused and can only be uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new photo. */
	photo: F | string;
}

/** Describes a video to post as a story. */
export interface InputStoryContentVideo<F> {
	/** Type of the content, must be video */
	type: "video";
	/** The video to post as a story. The video must be of the size 720x1280, streamable, encoded with H.265 codec, with key frames added each second in the MPEG4 format, and must not exceed 30 MB. The video can't be reused and can only be uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new video. */
	video: F | string;
	/** Precise duration of the video in seconds; 0-60 */
	duration?: number;
	/** Timestamp in seconds of the frame that will be used as the static cover for the story. Defaults to 0.0. */
	cover_frame_timestamp?: number;
	/** Pass True if the video has no sound */
	is_animation?: boolean;
}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
	getMe(): UserFromGetMe;

	/** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
	logOut(): true;

	/** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
	close(): true;

	/** Use this method to send text messages. On success, the sent Message is returned. */
	sendMessage(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Text of the message to be sent, 1-4096 characters after entities parsing */
		text: string;
		/** Mode for parsing entities in the message text. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in message text, which can be specified instead of parse_mode */
		entities?: MessageEntity[];
		/** Link preview generation options for the message */
		link_preview_options?: LinkPreviewOptions;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. A object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.TextMessage & Message.BusinessSentMessage;

	/** Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned. */
	forwardMessage(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`) */
		from_chat_id: number | string;
		/** New start timestamp for the forwarded video in the message */
		video_start_timestamp?: number;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the forwarded message from forwarding and saving */
		protect_content?: boolean;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Message identifier in the chat specified in from_chat_id */
		message_id: number;
	}): Message & Message.BusinessSentMessage;

	/** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of MessageId of the sent messages is returned. */
	forwardMessages(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Unique identifier for the chat where the original messages were sent (or channel username in the format `@channelusername`) */
		from_chat_id: number | string;
		/** A list of 1-100 identifiers of messages in the chat from_chat_id to forward. The identifiers must be specified in a strictly increasing order. */
		message_ids: number[];
		/** Sends the messages silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the forwarded messages from forwarding and saving */
		protect_content?: boolean;
	}): MessageId[];

	/** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
	copyMessage(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`) */
		from_chat_id: number | string;
		/** Message identifier in the chat specified in from_chat_id */
		message_id: number;
		/** New start timestamp for the copied video in the message */
		video_start_timestamp?: number;
		/** New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept */
		caption?: string;
		/** Mode for parsing entities in the new caption. See formatting options for more details. */
		parse_mode?: string;
		/** A list of special entities that appear in the new caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Pass True, if the caption must be shown above the message media. Ignored if a new caption isn't specified. */
		show_caption_above_media?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): MessageId;

	/** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_id is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of MessageId of the sent messages is returned. */
	copyMessages(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Unique identifier for the chat where the original messages were sent (or channel username in the format `@channelusername`) */
		from_chat_id: number | string;
		/** A list of 1-100 identifiers of messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order. */
		message_ids: number[];
		/** Sends the messages silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent messages from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to copy the messages without their captions */
		remove_caption?: boolean;
	}): MessageId[];

	/** Use this method to send photos. On success, the sent Message is returned. */
	sendPhoto(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. */
		photo: F | string;
		/** Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the photo caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Pass True, if the caption must be shown above the message media */
		show_caption_above_media?: boolean;
		/** Pass True if the photo needs to be covered with a spoiler animation */
		has_spoiler?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.PhotoMessage & Message.BusinessSentMessage;

	/** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

  For sending voice messages, use the sendVoice method instead. */
	sendAudio(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. */
		audio: F | string;
		/** Audio caption, 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the audio caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Duration of the audio in seconds */
		duration?: number;
		/** Performer */
		performer?: string;
		/** Track name */
		title?: string;
		/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
		thumbnail?: F;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.AudioMessage & Message.BusinessSentMessage;

	/** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
	sendDocument(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
		document: F | string;
		/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
		thumbnail?: F;
		/** Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the document caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
		disable_content_type_detection?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.DocumentMessage & Message.BusinessSentMessage;

	/** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
	sendVideo(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. */
		video: F | string;
		/** Duration of sent video in seconds */
		duration?: number;
		/** Video width */
		width?: number;
		/** Video height */
		height?: number;
		/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
		thumbnail?: F;
		/** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new one. */
		cover?: F | string;
		/** Start timestamp for the video in the message */
		start_timestamp?: number;
		/** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the video caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Pass True, if the caption must be shown above the message media */
		show_caption_above_media?: boolean;
		/** Pass True if the video needs to be covered with a spoiler animation */
		has_spoiler?: boolean;
		/** Pass True if the uploaded video is suitable for streaming */
		supports_streaming?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.VideoMessage & Message.BusinessSentMessage;

	/** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
	sendAnimation(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. */
		animation: F | string;
		/** Duration of sent animation in seconds */
		duration?: number;
		/** Animation width */
		width?: number;
		/** Animation height */
		height?: number;
		/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
		thumbnail?: F;
		/** Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the animation caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Pass True, if the caption must be shown above the message media */
		show_caption_above_media?: boolean;
		/** Pass True if the animation needs to be covered with a spoiler animation */
		has_spoiler?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.AnimationMessage & Message.BusinessSentMessage;

	/** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
	sendVoice(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
		voice: F | string;
		/** Voice message caption, 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the voice message caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Duration of the voice message in seconds */
		duration?: number;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.VoiceMessage & Message.BusinessSentMessage;

	/** Use this method to send video messages. On success, the sent Message is returned.
  As of v.4.0, Telegram clients support rounded square MPEG4 videos of up to 1 minute long. */
	sendVideoNote(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported */
		video_note: F | string;
		/** Duration of sent video in seconds */
		duration?: number;
		/** Video width and height, i.e. diameter of the video message */
		length?: number;
		/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Thumbnails can't be reused and can be only uploaded as a new file. Use Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html) to upload a new thumbnail. */
		thumbnail?: F;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.VideoNoteMessage & Message.BusinessSentMessage;

	/** Use this method to send paid media. On success, the sent Message is returned. */
	sendPaidMedia(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`). If the chat is a channel, all Telegram Star proceeds from this media will be credited to the chat's balance. Otherwise, they will be credited to the bot's balance. */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** The number of Telegram Stars that must be paid to buy access to the media; 1-10000 */
		star_count: number;
		/** An array describing the media to be sent; up to 10 items */
		media: InputPaidMedia<F>[];
		/** Bot-defined paid media payload, 0-128 bytes. This will not be displayed to the user, use it for your internal processes. */
		payload?: string;
		/** Media caption, 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the media caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Pass True, if the caption must be shown above the message media */
		show_caption_above_media?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.PaidMediaMessage & Message.BusinessSentMessage;

	/** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Message objects that were sent is returned. */
	sendMediaGroup(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** An array describing messages to be sent, must include 2-10 items */
		media: ReadonlyArray<InputMediaAudio<F> | InputMediaDocument<F> | InputMediaPhoto<F> | InputMediaVideo<F>>;
		/** Sends the messages silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent messages from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
	}): Array<
		(Message.AudioMessage | Message.DocumentMessage | Message.PhotoMessage | Message.VideoMessage) &
			Message.BusinessSentMessage
	>;

	/** Use this method to send point on the map. On success, the sent Message is returned. */
	sendLocation(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Latitude of the location */
		latitude: number;
		/** Longitude of the location */
		longitude: number;
		/** The radius of uncertainty for the location, measured in meters; 0-1500 */
		horizontal_accuracy?: number;
		/** Period in seconds during which the location will be updated (see Live Locations, should be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely. */
		live_period?: number;
		/** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
		heading?: number;
		/** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
		proximity_alert_radius?: number;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.LocationMessage & Message.BusinessSentMessage;

	/** Use this method to send information about a venue. On success, the sent Message is returned. */
	sendVenue(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Latitude of the venue */
		latitude: number;
		/** Longitude of the venue */
		longitude: number;
		/** Name of the venue */
		title: string;
		/** Address of the venue */
		address: string;
		/** Foursquare identifier of the venue */
		foursquare_id?: string;
		/** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
		foursquare_type?: string;
		/** Google Places identifier of the venue */
		google_place_id?: string;
		/** Google Places type of the venue. (See supported types.) */
		google_place_type?: string;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.VenueMessage & Message.BusinessSentMessage;

	/** Use this method to send phone contacts. On success, the sent Message is returned. */
	sendContact(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Contact's phone number */
		phone_number: string;
		/** Contact's first name */
		first_name: string;
		/** Contact's last name */
		last_name?: string;
		/** Additional data about the contact in the form of a vCard, 0-2048 bytes */
		vcard?: string;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.ContactMessage & Message.BusinessSentMessage;

	/** Use this method to send a native poll. On success, the sent Message is returned. */
	sendPoll(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`). Polls can't be sent to channel direct messages chats. */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Poll question, 1-300 characters */
		question: string;
		/** Mode for parsing entities in the question. See formatting options for more details. Currently, only custom emoji entities are allowed */
		question_parse_mode?: ParseMode;
		/** A list of special entities that appear in the poll question. It can be specified instead of question_parse_mode */
		question_entities?: MessageEntity[];
		/** A list of answer options, 2-12 answer options */
		options: readonly InputPollOption[];
		/** True, if the poll needs to be anonymous, defaults to True */
		is_anonymous?: boolean;
		/** Poll type, “quiz” or “regular”, defaults to “regular” */
		type?: "quiz" | "regular";
		/** True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False */
		allows_multiple_answers?: boolean;
		/** 0-based identifier of the correct answer option, required for polls in quiz mode */
		correct_option_id?: number;
		/** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing */
		explanation?: string;
		/** Mode for parsing entities in the explanation. See formatting options for more details. */
		explanation_parse_mode?: ParseMode;
		/** A list of special entities that appear in the poll explanation. It can be specified instead of explanation_parse_mode */
		explanation_entities?: MessageEntity[];
		/** Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date. */
		open_period?: number;
		/** Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period. */
		close_date?: number;
		/** Pass True if the poll needs to be immediately closed. This can be useful for poll preview. */
		is_closed?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.PollMessage & Message.BusinessSentMessage;

	/** Use this method to send a checklist on behalf of a connected business account. On success, the sent Message is returned. */
	sendChecklist(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id: string;
		/** Unique identifier for the target chat */
		chat_id: number | string;
		/** An object for the checklist to send */
		checklist: InputChecklist;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Unique identifier of the message effect to be added to the message */
		message_effect_id?: string;
		/** An object for description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** An object for an inline keyboard */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.ChecklistMessage & Message.BusinessSentMessage;

	/** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
	sendDice(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰". Defaults to "🎲" */
		emoji?: string;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** An object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.DiceMessage & Message.BusinessSentMessage;

	/** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

  Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.

  We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
	sendChatAction(args: {
		/** Unique identifier of the business connection on behalf of which the action will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`). Channel chats and channel direct messages chats aren't supported. */
		chat_id: number | string;
		/** Unique identifier for the target message thread; for supergroups only */
		message_thread_id?: number;
		/** Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes. */
		action:
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
			| "upload_video_note";
	}): true;

	/** Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns True on success. */
	setMessageReaction(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Identifier of the target message. If the message belongs to a media group, the reaction is set to the first non-deleted message in the group instead. */
		message_id: number;
		/** A list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots. */
		reaction?: ReactionType[];
		/** Pass True to set the reaction with a big animation */
		is_big?: boolean;
	}): true;

	/** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
	getUserProfilePhotos(args: {
		/** Unique identifier of the target user */
		user_id: number;
		/** Sequential number of the first photo to be returned. By default, all photos are returned. */
		offset?: number;
		/** Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
		limit?: number;
	}): UserProfilePhotos;

	/** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess. Returns True on success. */
	setUserEmojiStatus(args: {
		/** Unique identifier of the target user */
		user_id: number;
		/** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
		emoji_status_custom_emoji_id?: string;
		/** Expiration date of the emoji status, if any */
		emoji_status_expiration_date?: number;
	}): true;

	/** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.

  Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
	getFile(args: {
		/** File identifier to get information about */
		file_id: string;
	}): File;

	/** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
	 * @deprecated Use `banChatMember` instead. */
	kickChatMember: ApiMethods<F>["banChatMember"];

	/** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	banChatMember(args: {
		/** Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
		/** Date when the user will be unbanned; Unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only. */
		until_date?: number;
		/** Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels. */
		revoke_messages?: boolean;
	}): true;

	/** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
	unbanChatMember(args: {
		/** Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
		/** Do nothing if the user is not banned */
		only_if_banned?: boolean;
	}): true;

	/** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
	restrictChatMember(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
		/** An object for new user permissions */
		permissions: ChatPermissions;
		/** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
		use_independent_chat_permissions?: boolean;
		/** Date when restrictions will be lifted for the user; Unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever */
		until_date?: number;
	}): true;

	/** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
	promoteChatMember(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
		/** Pass True if the administrator's presence in the chat is hidden */
		is_anonymous?: boolean;
		/** Pass True if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
		can_manage_chat?: boolean;
		/** Pass True if the administrator can delete messages of other users */
		can_delete_messages?: boolean;
		/** Pass True if the administrator can manage video chats */
		can_manage_video_chats?: boolean;
		/** Pass True if the administrator can restrict, ban or unban chat members */
		can_restrict_members?: boolean;
		/** Pass True if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him) */
		can_promote_members?: boolean;
		/** Pass True if the administrator can change chat title, photo and other settings */
		can_change_info?: boolean;
		/** Pass True if the administrator can invite new users to the chat */
		can_invite_users?: boolean;
		/** Pass True if the administrator can post stories to the chat */
		can_post_stories?: boolean;
		/** Pass True if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
		can_edit_stories?: boolean;
		/** Pass True if the administrator can delete stories posted by other users */
		can_delete_stories?: boolean;
		/** Pass True if the administrator can post messages in the channel, or access channel statistics; for channels only */
		can_post_messages?: boolean;
		/** Pass True if the administrator can edit messages of other users and can pin messages, channels only */
		can_edit_messages?: boolean;
		/** Pass True if the administrator can pin messages; supergroups only */
		can_pin_messages?: boolean;
		/** Pass True if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
		can_manage_topics?: boolean;
		/** Pass True if the administrator can manage direct messages within the channel and decline suggested posts; for channels only */
		can_manage_direct_messages?: boolean;
	}): true;

	/** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
	setChatAdministratorCustomTitle(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
		/** New custom title for the administrator; 0-16 characters, emoji are not allowed */
		custom_title: string;
	}): true;

	/** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
	banChatSenderChat(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target sender chat */
		sender_chat_id: number;
	}): true;

	/** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
	unbanChatSenderChat(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target sender chat */
		sender_chat_id: number;
	}): true;

	/** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
	setChatPermissions(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** An object for new default chat permissions */
		permissions: ChatPermissions;
		/** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
		use_independent_chat_permissions?: boolean;
	}): true;

	/** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.

  Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink or by calling the getChat method. If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again. */
	exportChatInviteLink(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): string;

	/** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
	createChatInviteLink(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Invite link name; 0-32 characters */
		name?: string;
		/** Point in time (Unix timestamp) when the link will expire */
		expire_date?: number;
		/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
		member_limit?: number;
		/** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified */
		creates_join_request?: boolean;
	}): ChatInviteLink;

	/** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
	editChatInviteLink(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** The invite link to edit */
		invite_link: string;
		/** Invite link name; 0-32 characters */
		name?: string;
		/** Point in time (Unix timestamp) when the link will expire */
		expire_date?: number;
		/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
		member_limit?: number;
		/** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified */
		creates_join_request?: boolean;
	}): ChatInviteLink;

	/** Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object. */
	createChatSubscriptionInviteLink(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Invite link name; 0-32 characters */
		name?: string;
		/** The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days). */
		subscription_period: 2592000;
		/** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-10000 */
		subscription_price: number;
	}): ChatInviteLink;

	/** Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights. Returns the edited invite link as a ChatInviteLink object. */
	editChatSubscriptionInviteLink(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** The invite link to edit */
		invite_link: string;
		/** Invite link name; 0-32 characters */
		name?: string;
	}): ChatInviteLink;

	/** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
	revokeChatInviteLink(args: {
		/** Unique identifier of the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** The invite link to revoke */
		invite_link: string;
	}): ChatInviteLink;

	/** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
	approveChatJoinRequest(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
	}): true;

	/** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
	declineChatJoinRequest(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
	}): true;

	/** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	setChatPhoto(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** New chat photo, uploaded using multipart/form-data */
		photo: F;
	}): true;

	/** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	deleteChatPhoto(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	setChatTitle(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** New chat title, 1-128 characters */
		title: string;
	}): true;

	/** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
	setChatDescription(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** New chat description, 0-255 characters */
		description?: string;
	}): true;

	/** Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively. Returns True on success. */
	pinChatMessage(args: {
		/** Unique identifier of the business connection on behalf of which the message will be pinned */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Identifier of a message to pin */
		message_id: number;
		/** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats. */
		disable_notification?: boolean;
	}): true;

	/** Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively. Returns True on success. */
	unpinChatMessage(args: {
		/** Unique identifier of the business connection on behalf of which the message will be pinned */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be unpinned. */
		message_id?: number;
	}): true;

	/** Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin all pinned messages in groups and channels respectively. Returns True on success. */
	unpinAllChatMessages(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
	leaveChat(args: {
		/** Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`). Channel direct messages chats aren't supported; leave the corresponding channel instead. */
		chat_id: number | string;
	}): true;

	/** Use this method to get up-to-date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
	getChat(args: {
		/** Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): ChatFullInfo;

	/** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of ChatMember objects. */
	getChatAdministrators(args: {
		/** Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): Array<ChatMemberOwner | ChatMemberAdministrator>;

	/** Use this method to get the number of members in a chat. Returns Int on success.
	 * @deprecated Use `getChatMemberCount` instead. */
	getChatMembersCount: ApiMethods<F>["getChatMemberCount"];

	/** Use this method to get the number of members in a chat. Returns Int on success. */
	getChatMemberCount(args: {
		/** Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): number;

	/** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
	getChatMember(args: {
		/** Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
	}): ChatMember;

	/** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
	setChatStickerSet(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Name of the sticker set to be set as the group sticker set */
		sticker_set_name: string;
	}): true;

	/** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
	deleteChatStickerSet(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
	getForumTopicIconStickers(): Sticker[];

	/** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a ForumTopic object. */
	createForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Topic name, 1-128 characters */
		name: string;
		/** Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F) */
		icon_color?: 0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f;
		/** Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. */
		icon_custom_emoji_id?: string;
	}): ForumTopic;

	/** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
	editForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread of the forum topic */
		message_thread_id: number;
		/** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept */
		name?: string;
		/** New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept */
		icon_custom_emoji_id?: string;
	}): true;

	/** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
	closeForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread of the forum topic */
		message_thread_id: number;
	}): true;

	/** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
	reopenForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread of the forum topic */
		message_thread_id: number;
	}): true;

	/** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
	deleteForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread of the forum topic */
		message_thread_id: number;
	}): true;

	/** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
	unpinAllForumTopicMessages(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread of the forum topic */
		message_thread_id: number;
	}): true;

	/** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success. */
	editGeneralForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
		/** New topic name, 1-128 characters */
		name: string;
	}): true;

	/** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
	closeGeneralForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
	reopenGeneralForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
	hideGeneralForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
	unhideGeneralForumTopic(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
	unpinAllGeneralForumTopicMessages(args: {
		/** Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`) */
		chat_id: number | string;
	}): true;

	/** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

  Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @BotFather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
	answerCallbackQuery(args: {
		/** Unique identifier for the query to be answered */
		callback_query_id: string;
		/** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
		text?: string;
		/** If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false. */
		show_alert?: boolean;
		/** URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.

    Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
		url?: string;
		/** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0. */
		cache_time?: number;
	}): true;

	/** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
	getUserChatBoosts(arg: {
		/** Unique identifier for the chat or username of the channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier of the target user */
		user_id: number;
	}): UserChatBoosts;

	getBusinessConnection(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
	}): BusinessConnection;

	/** Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for more details about bot commands. Returns True on success. */
	setMyCommands(args: {
		/** A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified. */
		commands: readonly BotCommand[];
		/** An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
		scope?: BotCommandScope;
		/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
		language_code?: string;
	}): true;

	/** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
	deleteMyCommands(args: {
		/** An object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
		scope?: BotCommandScope;
		/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
		language_code?: string;
	}): true;

	/** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
	getMyCommands(args: {
		/** An object, describing scope of users. Defaults to BotCommandScopeDefault. */
		scope?: BotCommandScope;
		/** A two-letter ISO 639-1 language code or an empty string */
		language_code?: string;
	}): BotCommand[];

	/** Use this method to change the bot's name. Returns True on success. */
	setMyName(args: {
		/** New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language. */
		name?: string;
		/** A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name. */
		language_code?: string;
	}): true;

	/** Use this method to get the current bot name for the given user language. Returns BotName on success. */
	getMyName(args: {
		/** A two-letter ISO 639-1 language code or an empty string */
		language_code?: string;
	}): BotName;

	/** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
	setMyDescription(args: {
		/** New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language. */
		description?: string;
		/** A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description. */
		language_code?: string;
	}): true;

	/** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
	getMyDescription(args: {
		/** A two-letter ISO 639-1 language code or an empty string */
		language_code?: string;
	}): BotDescription;

	/** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
	setMyShortDescription(args: {
		/** New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language. */
		short_description?: string;
		/** A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description. */
		language_code?: string;
	}): true;

	/** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
	getMyShortDescription(args: {
		/** A two-letter ISO 639-1 language code or an empty string */
		language_code?: string;
	}): BotShortDescription;

	/** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
	setChatMenuButton(args: {
		/** Unique identifier for the target private chat. If not specified, default bot's menu button will be changed */
		chat_id?: number;
		/** An object for the bot's new menu button. Defaults to MenuButtonDefault */
		menu_button?: MenuButton;
	}): true;

	/** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
	getChatMenuButton(args: {
		/** Unique identifier for the target private chat. If not specified, default bot's menu button will be returned */
		chat_id?: number;
	}): MenuButton;

	/** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
	setMyDefaultAdministratorRights(args: {
		/** An object describing new default administrator rights. If not specified, the default administrator rights will be cleared. */
		rights?: ChatAdministratorRights;
		/** Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed. */
		for_channels?: boolean;
	}): true;

	/** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
	getMyDefaultAdministratorRights(args: {
		/** Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned. */
		for_channels?: boolean;
	}): ChatAdministratorRights;

	/** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
	getAvailableGifts(): Gifts;

	/** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns True on success. */
	sendGift(args: {
		/** Required if chat_id is not specified. Unique identifier of the target user who will receive the gift */
		user_id?: number;
		/** Required if user_id is not specified. Unique identifier for the chat or username of the channel (in the format `@channelusername`) that will receive the gift */
		chat_id?: number | string;
		/** Identifier of the gift */
		gift_id: string;
		/** Pass True to pay for the gift upgrade from the bot's balance, thereby making the upgrade free for the receiver */
		pay_for_upgrade?: boolean;
		/** Text that will be shown along with the gift; 0-255 characters */
		text?: string;
		/** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
		text_parse_mode?: ParseMode;
		/** A list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
		text_entities?: MessageEntity[];
	}): true;

	/** Gifts a Telegram Premium subscription to the given user. Returns True on success. */
	giftPremiumSubscription(args: {
		/** Unique identifier of the target user who will receive a Telegram Premium subscription */
		user_id: number;
		/** Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12 */
		month_count: 3 | 6 | 12;
		/** Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months */
		star_count: 1000 | 1500 | 2500;
		/** Text that will be shown along with the service message about the subscription; 0-128 characters */
		text?: string;
		/** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
		text_parse_mode?: ParseMode;
		/** A list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom_emoji” are ignored. */
		text_entities?: MessageEntity[];
	}): true;

	/** Verifies a user on behalf of the organization which is represented by the bot. Returns True on success. */
	verifyUser(args: {
		/** Unique identifier of the target user */
		user_id: number;
		/** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
		custom_description?: string;
	}): true;

	/** Verifies a chat on behalf of the organization which is represented by the bot. Returns True on success. */
	verifyChat(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`). Channel direct messages chats can't be verified. */
		chat_id: number | string;
		/** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
		custom_description?: string;
	}): true;

	/** Removes verification from a user who is currently verified on behalf of the organization represented by the bot. Returns True on success. */
	removeUserVerification(args: {
		/** Unique identifier of the target user */
		user_id: number;
	}): true;

	/** Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success. */
	removeChatVerification(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
	}): true;

	/** Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right. Returns True on success. */
	readBusinessMessage(args: {
		/** Unique identifier of the business connection on behalf of which to read the message */
		business_connection_id: string;
		/** Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours. */
		chat_id: number;
		/** Unique identifier of the message to mark as read */
		message_id: number;
	}): true;

	/** Delete messages on behalf of a business account. Requires the can_delete_sent_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message. Returns True on success. */
	deleteBusinessMessages(args: {
		/** Unique identifier of the business connection on behalf of which to delete the messages */
		business_connection_id: string;
		/** A list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted */
		message_ids: number[];
	}): true;

	/** Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success. */
	setBusinessAccountName(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** The new value of the first name for the business account; 1-64 characters */
		first_name: string;
		/** The new value of the last name for the business account; 0-64 characters */
		last_name?: string;
	}): true;

	/** Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success. */
	setBusinessAccountUsername(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** The new value of the username for the business account; 0-32 characters */
		username?: string;
	}): true;

	/** Changes the bio of a managed business account. Requires the can_change_bio business bot right. Returns True on success. */
	setBusinessAccountBio(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** The new value of the bio for the business account; 0-140 characters */
		bio?: string;
	}): true;

	/** Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
	setBusinessAccountProfilePhoto(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** The new profile photo to set */
		photo: InputProfilePhoto<F>;
		/** Pass True to set the public photo, which will be visible even if the main photo is hidden by the business account's privacy settings. An account can have only one public photo. */
		is_public?: boolean;
	}): true;

	/** Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
	removeBusinessAccountProfilePhoto(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Pass True to remove the public photo, which is visible even if the main photo is hidden by the business account's privacy settings. After the main photo is removed, the previous profile photo (if present) becomes the main photo. */
		is_public?: boolean;
	}): true;

	/** Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right. Returns True on success. */
	setBusinessAccountGiftSettings(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Pass True, if a button for sending a gift to the user or by the business account must always be shown in the input field */
		show_gift_button: boolean;
		/** Types of gifts accepted by the business account */
		accepted_gift_types: AcceptedGiftTypes;
	}): true;

	/** Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns StarAmount on success. */
	getBusinessAccountStarBalance(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
	}): StarAmount;

	/** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right. Returns True on success. */
	transferBusinessAccountStars(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Number of Telegram Stars to transfer; 1-10000 */
		star_count: number;
	}): true;

	/** Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns OwnedGifts on success. */
	getBusinessAccountGifts(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Pass True to exclude gifts that aren't saved to the account's profile page */
		exclude_unsaved?: boolean;
		/** Pass True to exclude gifts that are saved to the account's profile page */
		exclude_saved?: boolean;
		/** Pass True to exclude gifts that can be purchased an unlimited number of times */
		exclude_unlimited?: boolean;
		/** Pass True to exclude gifts that can be purchased a limited number of times */
		exclude_limited?: boolean;
		/** Pass True to exclude unique gifts */
		exclude_unique?: boolean;
		/** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
		sort_by_price?: boolean;
		/** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
		offset?: string;
		/** The maximum number of gifts to be returned; 1-100. Defaults to 100 */
		limit?: number;
	}): OwnedGifts;

	/** Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right. Returns True on success. */
	convertGiftToStars(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Unique identifier of the regular gift that should be converted to Telegram Stars */
		owned_gift_id: string;
	}): true;

	/** Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid. Returns True on success. */
	upgradeGift(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Unique identifier of the regular gift that should be upgraded to a unique one */
		owned_gift_id: string;
		/** Pass True to keep the original gift text, sender and receiver in the upgraded gift */
		keep_original_details?: boolean;
		/** The amount of Telegram Stars that will be paid for the upgrade from the business account balance. If gift.prepaid_upgrade_star_count > 0, then pass 0, otherwise, the can_transfer_stars business bot right is required and gift.upgrade_star_count must be passed. */
		star_count?: number;
	}): true;

	/** Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid. Returns True on success. */
	transferGift(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Unique identifier of the regular gift that should be transferred */
		owned_gift_id: string;
		/** Unique identifier of the chat which will own the gift. The chat must be active in the last 24 hours. */
		new_owner_chat_id: number;
		/** The amount of Telegram Stars that will be paid for the transfer from the business account balance. If positive, then the can_transfer_stars business bot right is required. */
		star_count?: number;
	}): true;

	/** Posts a story on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
	postStory(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Content of the story */
		content: InputStoryContent<F>;
		/** Period after which the story is moved to the archive, in seconds; must be one of 6 * 3600, 12 * 3600, 86400, or 2 * 86400 */
		active_period: 21600 | 43200 | 86400 | 172800;
		/** Caption of the story, 0-2048 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the story caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** A list of clickable areas to be shown on the story */
		areas?: StoryArea[];
		/** Pass True to keep the story accessible after it expires */
		post_to_chat_page?: boolean;
		/** Pass True if the content of the story must be protected from forwarding and screenshotting */
		protect_content?: boolean;
	}): Story;

	/** Edits a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
	editStory(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Unique identifier of the story to edit */
		story_id: number;
		/** Content of the story */
		content: InputStoryContent<F>;
		/** Caption of the story, 0-2048 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the story caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** A list of clickable areas to be shown on the story */
		areas?: StoryArea[];
	}): Story;

	/** Deletes a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns True on success. */
	deleteStory(args: {
		/** Unique identifier of the business connection */
		business_connection_id: string;
		/** Unique identifier of the story to delete */
		story_id: number;
	}): true;

	/** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
	answerWebAppQuery(args: {
		/** Unique identifier for the query to be answered */
		web_app_query_id: string;
		/** An object describing the message to be sent */
		result: InlineQueryResult;
	}): SentWebAppMessage;

	/** Stores a message that can be sent by a user of a Mini App. Returns a PreparedInlineMessage object. */
	savePreparedInlineMessage(args: {
		/** Unique identifier of the target user that can use the prepared message */
		user_id: number;
		/** An object describing the message to be sent */
		result: InlineQueryResult;
		/** Pass True if the message can be sent to private chats with users */
		allow_user_chats?: boolean;
		/** Pass True if the message can be sent to private chats with bots */
		allow_bot_chats?: boolean;
		/** Pass True if the message can be sent to group and supergroup chats */
		allow_group_chats?: boolean;
		/** Pass True if the message can be sent to channel chats */
		allow_channel_chats?: boolean;
	}): PreparedInlineMessage;

	/** Use this method to edit text and game messages in a chat. On success, the edited Message is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageText(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: number | string;
		/** Required if inline_message_id is not specified. Identifier of the message to edit */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: undefined;
		/** New text of the message, 1-4096 characters after entities parsing */
		text: string;
		/** Mode for parsing entities in the message text. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in message text, which can be specified instead of parse_mode */
		entities?: MessageEntity[];
		/** Link preview generation options for the message */
		link_preview_options?: LinkPreviewOptions;
		/** An object for an inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): Update.Edited & Message.TextMessage & Message.BusinessSentMessage;

	/** Use this method to edit inline text and game messages. On success, True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageText(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: undefined;
		/** Required if inline_message_id is not specified. Identifier of the message to edit */
		message_id?: undefined;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
		/** New text of the message, 1-4096 characters after entities parsing */
		text: string;
		/** Mode for parsing entities in the message text. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in message text, which can be specified instead of parse_mode */
		entities?: MessageEntity[];
		/** Link preview generation options for the message */
		link_preview_options?: LinkPreviewOptions;
		/** An object for an inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): true;

	/** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageCaption(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: number | string;
		/** Required if inline_message_id is not specified. Identifier of the message to edit */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
		/** New caption of the message, 0-1024 characters after entities parsing */
		caption?: string;
		/** Mode for parsing entities in the message caption. See formatting options for more details. */
		parse_mode?: ParseMode;
		/** A list of special entities that appear in the caption, which can be specified instead of parse_mode */
		caption_entities?: MessageEntity[];
		/** Pass True, if the caption must be shown above the message media. Supported only for animation, photo and video messages. */
		show_caption_above_media?: boolean;
		/** An object for an inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): (Update.Edited & Message.CaptionableMessage & Message.BusinessSentMessage) | true;

	/** Use this method to edit animation, audio, document, photo, or video messages, or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageMedia(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: number | string;
		/** Required if inline_message_id is not specified. Identifier of the message to edit */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
		/** An object for a new media content of the message */
		media: InputMedia<F>;
		/** An object for a new inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): (Update.Edited & Message & Message.BusinessSentMessage) | true;

	/** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
	editMessageLiveLocation(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: number | string;
		/** Required if inline_message_id is not specified. Identifier of the message to edit */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
		/** Latitude of new location */
		latitude: number;
		/** Longitude of new location */
		longitude: number;
		/** New period in seconds during which the location can be updated, starting from the message send date. If 0x7FFFFFFF is specified, then the location can be updated forever. Otherwise, the new value must not exceed the current live_period by more than a day, and the live location expiration date must remain within the next 90 days. If not specified, then live_period remains unchanged */
		live_period?: number;
		/** The radius of uncertainty for the location, measured in meters; 0-1500 */
		horizontal_accuracy?: number;
		/** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
		heading?: number;
		/** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
		proximity_alert_radius?: number;
		/** An object for a new inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): (Update.Edited & Message.LocationMessage & Message.BusinessSentMessage) | true;

	/** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
	stopMessageLiveLocation(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: number | string;
		/** Required if inline_message_id is not specified. Identifier of the message with live location to stop */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
		/** An object for a new inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): (Update.Edited & Message.LocationMessage & Message.BusinessSentMessage) | true;

	/** Use this method to edit a checklist on behalf of a connected business account. On success, the edited Message is returned. */
	editMessageChecklist(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id: string;
		/** Unique identifier for the target chat */
		chat_id: number;
		/** Unique identifier for the target message */
		message_id: number;
		/** A JSON-serialized object for the new checklist */
		checklist: InputChecklist;
		/** A JSON-serialized object for the new inline keyboard for the message */
		reply_markup?: InlineKeyboardMarkup;
	}): Update.Edited & Message.ChecklistMessage & Message.BusinessSentMessage;

	/** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
	editMessageReplyMarkup(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id?: number | string;
		/** Required if inline_message_id is not specified. Identifier of the message to edit */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
		/** An object for an inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): (Update.Edited & Message & Message.BusinessSentMessage) | true;

	/** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
	stopPoll(args: {
		/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Identifier of the original message with the poll */
		message_id: number;
		/** An object for a new message inline keyboard. */
		reply_markup?: InlineKeyboardMarkup;
	}): Poll;

	/** Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat. Returns True on success. */
	approveSuggestedPost(args: {
		/** Unique identifier for the target direct messages chat */
		chat_id: number;
		/** Identifier of a suggested post message to approve */
		message_id: number;
		/** Point in time (Unix timestamp) when the post is expected to be published; omit if the date has already been specified when the suggested post was created. If specified, then the date must be not more than 2678400 seconds (30 days) in the future */
		send_date?: number;
	}): true;

	/** Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat. Returns True on success. */
	declineSuggestedPost(args: {
		/** Unique identifier for the target direct messages chat */
		chat_id: number;
		/** Identifier of a suggested post message to decline */
		message_id: number;
		/** Comment for the creator of the suggested post; 0-128 characters */
		comment?: string;
	}): true;

	/** Use this method to delete a message, including service messages, with the following limitations:
  - A message can only be deleted if it was sent less than 48 hours ago.
  - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
  - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
  - Bots can delete outgoing messages in private chats, groups, and supergroups.
  - Bots can delete incoming messages in private chats.
  - Bots granted can_post_messages permissions can delete outgoing messages in channels.
  - If the bot is an administrator of a group, it can delete any message there.
  - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
  Returns True on success. */
	deleteMessage(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Identifier of the message to delete */
		message_id: number;
	}): true;

	/** Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns True on success. */
	deleteMessages(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** A list of 1-100 identifiers of messages to delete. See {@link ApiMethods.deleteMessage deleteMessage} for limitations on which messages can be deleted */
		message_ids: number[];
	}): true;
}

/** This object represents a sticker. */
export interface Sticker {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
	type: "regular" | "mask" | "custom_emoji";
	/** Sticker width */
	width: number;
	/** Sticker height */
	height: number;
	/** True, if the sticker is animated */
	is_animated: boolean;
	/** True, if the sticker is a video sticker */
	is_video: boolean;
	/** Sticker thumbnail in the .WEBP or .JPG format */
	thumbnail?: PhotoSize;
	/** Emoji associated with the sticker */
	emoji?: string;
	/** Name of the sticker set to which the sticker belongs */
	set_name?: string;
	/** For premium regular stickers, premium animation for the sticker */
	premium_animation?: File;
	/** For mask stickers, the position where the mask should be placed */
	mask_position?: MaskPosition;
	/** For custom emoji stickers, unique identifier of the custom emoji */
	custom_emoji_id?: string;
	/** True, if the sticker must be repainted to a text color in messages, the color of the Telegram Premium badge in emoji status, white color on chat photos, or another appropriate color in other places */
	needs_repainting?: true;
	/** File size in bytes */
	file_size?: number;
}

/** This object represents a sticker set. */
export interface StickerSet {
	/** Sticker set name */
	name: string;
	/** Sticker set title */
	title: string;
	/** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
	sticker_type: "regular" | "mask" | "custom_emoji";
	/** List of all set stickers */
	stickers: Sticker[];
	/** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
	thumbnail?: PhotoSize;
}

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
	/** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
	point: "forehead" | "eyes" | "mouth" | "chin";
	/** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
	x_shift: number;
	/** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
	y_shift: number;
	/** Mask scaling coefficient. For example, 2.0 means double size. */
	scale: number;
}

/** This object describes a sticker to be added to a sticker set. */
export interface InputSticker<F> {
	/** The added sticker. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html). Animated and video stickers can't be uploaded via HTTP URL. */
	sticker: F | string;
	/** Format of the added sticker, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, “video” for a WEBM video */
	format: "static" | "animated" | "video";
	/** List of 1-20 emoji associated with the sticker */
	emoji_list: string[];
	/** Position where the mask should be placed on faces. For “mask” stickers only. */
	mask_position?: MaskPosition;
	/** List of 0-20 search keywords for the sticker with total length of up to 64 characters. For “regular” and “custom_emoji” stickers only. */
	keywords?: string[];
}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
	sendSticker(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using Telegraf's [Input helpers](https://telegraf.js.org/modules/Input.html). Video and animated stickers can't be sent via an HTTP URL. */
		sticker: F | string;
		/** Emoji associated with the sticker; only for just uploaded stickers */
		emoji?: string;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** A object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** Additional interface options. An object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user */
		reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
	}): Message.StickerMessage & Message.BusinessSentMessage;

	/** Use this method to get a sticker set. On success, a StickerSet object is returned. */
	getStickerSet(args: {
		/** Name of the sticker set */
		name: string;
	}): StickerSet;

	/** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
	getCustomEmojiStickers(args: {
		/** A list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified. */
		custom_emoji_ids: string[];
	}): Sticker[];

	/** Use this method to upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times). Returns the uploaded File on success. */
	uploadStickerFile(args: {
		/** User identifier of sticker file owner */
		user_id: number;
		/** Format of the sticker, must be one of “static”, “animated”, “video” */
		sticker_format: "static" | "animated" | "video";
		/** A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See https://core.telegram.org/stickers for technical requirements. */
		sticker: F;
	}): File;

	/** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
	createNewStickerSet(args: {
		/** User identifier of created sticker set owner */
		user_id: number;
		/** Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in "_by_<bot_username>". <bot_username> is case insensitive. 1-64 characters. */
		name: string;
		/** Sticker set title, 1-64 characters */
		title: string;
		/** A list of 1-50 initial stickers to be added to the sticker set */
		stickers: InputSticker<F>[];
		/** Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”. By default, a regular sticker set is created. */
		sticker_type?: "regular" | "mask" | "custom_emoji";
		/** Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only */
		needs_repainting?: boolean;
	}): true;

	/** Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns True on success. */
	addStickerToSet(args: {
		/** User identifier of sticker set owner */
		user_id: number;
		/** Sticker set name */
		name: string;
		/** An object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed. */
		sticker: InputSticker<F>;
	}): true;

	/** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
	setStickerPositionInSet(args: {
		/** File identifier of the sticker */
		sticker: string;
		/** New sticker position in the set, zero-based */
		position: number;
	}): true;

	/** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
	deleteStickerFromSet(args: {
		/** File identifier of the sticker */
		sticker: string;
	}): true;

	/** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
	replaceStickerInSet(args: {
		/** User identifier of the sticker set owner */
		user_id: number;
		/** Sticker set name */
		name: string;
		/** File identifier of the replaced sticker */
		old_sticker: string;
		/** An object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set remains unchanged. */
		sticker: InputSticker<F>;
	}): true;

	/** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
	setStickerEmojiList(args: {
		/** File identifier of the sticker */
		sticker: string;
		/** A list of 1-20 emoji associated with the sticker */
		emoji_list: string[];
	}): true;

	/** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
	setStickerKeywords(args: {
		/** File identifier of the sticker */
		sticker: string;
		/** A list of 0-20 search keywords for the sticker with total length of up to 64 characters */
		keywords?: string[];
	}): true;

	/** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
	setStickerMaskPosition(args: {
		/** File identifier of the sticker */
		sticker: string;
		/** An object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position. */
		mask_position?: MaskPosition;
	}): true;

	/** Use this method to set the title of a created sticker set. Returns True on success. */
	setStickerSetTitle(args: {
		/** Sticker set name */
		name: string;
		/** Sticker set title, 1-64 characters */
		title: string;
	}): true;

	/** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
	setStickerSetThumbnail(args: {
		/** Sticker set name */
		name: string;
		/** User identifier of the sticker set owner */
		user_id: number;
		/** A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px, or a .TGS animation with a thumbnail up to 32 kilobytes in size (see https://core.telegram.org/stickers#animation-requirements for animated sticker technical requirements), or a .WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-requirements for video sticker technical requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. Animated and video sticker set thumbnails can't be uploaded via HTTP URL. If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail. */
		thumbnail?: F | string;
		/** Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, or “video” for a .WEBM video */
		format: "static" | "animated" | "video";
	}): true;

	/** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
	setCustomEmojiStickerSetThumbnail(args: {
		/** Sticker set name */
		name: string;
		/** Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail. */
		custom_emoji_id?: string;
	}): true;

	/** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
	deleteStickerSet(args: {
		/** Sticker set name */
		name: string;
	}): true;
}

/** This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results. */
export interface InlineQuery {
	/** Unique identifier for this query */
	id: string;
	/** Sender */
	from: User;
	/** Text of the query (up to 256 characters) */
	query: string;
	/** Offset of the results to be returned, can be controlled by the bot */
	offset: string;
	/** Type of the chat from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat */
	chat_type?: "sender" | Chat["type"];
	/** Sender location, only for bots that request user location */
	location?: Location;
}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Use this method to send answers to an inline query. On success, True is returned.
  No more than 50 results per query are allowed.

  Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
	answerInlineQuery(args: {
		/** Unique identifier for the answered query */
		inline_query_id: string;
		/** An array of results for the inline query */
		results: readonly InlineQueryResult[];
		/** The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. */
		cache_time?: number;
		/** Pass True if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query. */
		is_personal?: boolean;
		/** Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. */
		next_offset?: string;
		/** An object describing a button to be shown above inline query results */
		button?: InlineQueryResultsButton;
	}): true;
}

export interface AbstractInlineQueryResultsButton {
	/** Label text on the button */
	text: string;
}

export interface InlineQueryResultsWebAppButton extends AbstractInlineQueryResultsButton {
	/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to switch back to the inline mode using the method web_app_switch_inline_query inside the Web App. */
	web_app: WebAppInfo;
}

export interface InlineQueryResultsStartButton extends AbstractInlineQueryResultsButton {
	/** Deep-linking parameter for the /start message sent to the bot when a user presses the button. 1-64 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. */
	start_parameter: string;
}

/** This object represents a button to be shown above inline query results.

Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
export type InlineQueryResultsButton = InlineQueryResultsWebAppButton | InlineQueryResultsStartButton;

/** This object represents one result of an inline query. Telegram clients currently support results of the following 20 types:
- InlineQueryResultCachedAudio
- InlineQueryResultCachedDocument
- InlineQueryResultCachedGif
- InlineQueryResultCachedMpeg4Gif
- InlineQueryResultCachedPhoto
- InlineQueryResultCachedSticker
- InlineQueryResultCachedVideo
- InlineQueryResultCachedVoice
- InlineQueryResultArticle
- InlineQueryResultAudio
- InlineQueryResultContact
- InlineQueryResultGame
- InlineQueryResultDocument
- InlineQueryResultGif
- InlineQueryResultLocation
- InlineQueryResultMpeg4Gif
- InlineQueryResultPhoto
- InlineQueryResultVenue
- InlineQueryResultVideo
- InlineQueryResultVoice

Note: All URLs passed in inline query results will be available to end users and therefore must be assumed to be public. */
export type InlineQueryResult =
	| InlineQueryResultCachedAudio
	| InlineQueryResultCachedDocument
	| InlineQueryResultCachedGif
	| InlineQueryResultCachedMpeg4Gif
	| InlineQueryResultCachedPhoto
	| InlineQueryResultCachedSticker
	| InlineQueryResultCachedVideo
	| InlineQueryResultCachedVoice
	| InlineQueryResultArticle
	| InlineQueryResultAudio
	| InlineQueryResultContact
	| InlineQueryResultGame
	| InlineQueryResultDocument
	| InlineQueryResultGif
	| InlineQueryResultLocation
	| InlineQueryResultMpeg4Gif
	| InlineQueryResultPhoto
	| InlineQueryResultVenue
	| InlineQueryResultVideo
	| InlineQueryResultVoice;

/** Represents a link to an article or web page. */
export interface InlineQueryResultArticle {
	/** Type of the result, must be article */
	type: "article";
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Title of the result */
	title: string;
	/** Content of the message to be sent */
	input_message_content: InputMessageContent;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** URL of the result */
	url?: string;
	/** Short description of the result */
	description?: string;
	/** Url of the thumbnail for the result */
	thumbnail_url?: string;
	/** Thumbnail width */
	thumbnail_width?: number;
	/** Thumbnail height */
	thumbnail_height?: number;
}

/** Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultPhoto {
	/** Type of the result, must be photo */
	type: "photo";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL of the photo. Photo must be in JPEG format. Photo size must not exceed 5MB */
	photo_url: string;
	/** URL of the thumbnail for the photo */
	thumbnail_url: string;
	/** Width of the photo */
	photo_width?: number;
	/** Height of the photo */
	photo_height?: number;
	/** Title for the result */
	title?: string;
	/** Short description of the result */
	description?: string;
	/** Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the photo */
	input_message_content?: InputMessageContent;
}

/** Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultGif {
	/** Type of the result, must be gif */
	type: "gif";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the GIF file. File size must not exceed 1MB */
	gif_url: string;
	/** Width of the GIF */
	gif_width?: number;
	/** Height of the GIF */
	gif_height?: number;
	/** Duration of the GIF in seconds */
	gif_duration?: number;
	/** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
	thumbnail_url: string;
	/** MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
	thumbnail_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
	/** Title for the result */
	title?: string;
	/** Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the GIF animation */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultMpeg4Gif {
	/** Type of the result, must be mpeg4_gif */
	type: "mpeg4_gif";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the MPEG4 file. File size must not exceed 1MB */
	mpeg4_url: string;
	/** Video width */
	mpeg4_width?: number;
	/** Video height */
	mpeg4_height?: number;
	/** Video duration in seconds */
	mpeg4_duration?: number;
	/** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
	thumbnail_url: string;
	/** MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
	thumbnail_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
	/** Title for the result */
	title?: string;
	/** Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the video animation */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video.

> If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you must replace its content using input_message_content. */
export interface InlineQueryResultVideo {
	/** Type of the result, must be video */
	type: "video";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the embedded video player or video file */
	video_url: string;
	/** MIME type of the content of the video URL, “text/html” or “video/mp4” */
	mime_type: "text/html" | "video/mp4";
	/** URL of the thumbnail (JPEG only) for the video */
	thumbnail_url: string;
	/** Title for the result */
	title: string;
	/** Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Video width */
	video_width?: number;
	/** Video height */
	video_height?: number;
	/** Video duration in seconds */
	video_duration?: number;
	/** Short description of the result */
	description?: string;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video). */
	input_message_content?: InputMessageContent;
}

/** Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface InlineQueryResultAudio {
	/** Type of the result, must be audio */
	type: "audio";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the audio file */
	audio_url: string;
	/** Title */
	title: string;
	/** Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Performer */
	performer?: string;
	/** Audio duration in seconds */
	audio_duration?: number;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the audio */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message. */
export interface InlineQueryResultVoice {
	/** Type of the result, must be voice */
	type: "voice";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the voice recording */
	voice_url: string;
	/** Recording title */
	title: string;
	/** Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Recording duration in seconds */
	voice_duration?: number;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the voice recording */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method. */
export interface InlineQueryResultDocument {
	/** Type of the result, must be document */
	type: "document";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** Title for the result */
	title: string;
	/** Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** A valid URL for the file */
	document_url: string;
	/** MIME type of the content of the file, either “application/pdf” or “application/zip” */
	mime_type: "application/pdf" | "application/zip";
	/** Short description of the result */
	description?: string;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the file */
	input_message_content?: InputMessageContent;
	/** URL of the thumbnail (JPEG only) for the file */
	thumbnail_url?: string;
	/** Thumbnail width */
	thumbnail_width?: number;
	/** Thumbnail height */
	thumbnail_height?: number;
}

/** Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location. */
export interface InlineQueryResultLocation {
	/** Type of the result, must be location */
	type: "location";
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Location latitude in degrees */
	latitude: number;
	/** Location longitude in degrees */
	longitude: number;
	/** Location title */
	title: string;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Period in seconds during which the location can be updated, should be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely. */
	live_period?: number;
	/** For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the location */
	input_message_content?: InputMessageContent;
	/** Url of the thumbnail for the result */
	thumbnail_url?: string;
	/** Thumbnail width */
	thumbnail_width?: number;
	/** Thumbnail height */
	thumbnail_height?: number;
}

/** Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue. */
export interface InlineQueryResultVenue {
	/** Type of the result, must be venue */
	type: "venue";
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Latitude of the venue location in degrees */
	latitude: number;
	/** Longitude of the venue location in degrees */
	longitude: number;
	/** Title of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue if known */
	foursquare_id?: string;
	/** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Google Places identifier of the venue */
	google_place_id?: string;
	/** Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the venue */
	input_message_content?: InputMessageContent;
	/** Url of the thumbnail for the result */
	thumbnail_url?: string;
	/** Thumbnail width */
	thumbnail_width?: number;
	/** Thumbnail height */
	thumbnail_height?: number;
}

/** Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact. */
export interface InlineQueryResultContact {
	/** Type of the result, must be contact */
	type: "contact";
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Contact's last name */
	last_name?: string;
	/** Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the contact */
	input_message_content?: InputMessageContent;
	/** Url of the thumbnail for the result */
	thumbnail_url?: string;
	/** Thumbnail width */
	thumbnail_width?: number;
	/** Thumbnail height */
	thumbnail_height?: number;
}

/** Represents a Game.  */
export interface InlineQueryResultGame {
	/** Type of the result, must be game */
	type: "game";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** Short name of the game */
	game_short_name: string;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
}

/** Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultCachedPhoto {
	/** Type of the result, must be photo */
	type: "photo";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier of the photo */
	photo_file_id: string;
	/** Title for the result */
	title?: string;
	/** Short description of the result */
	description?: string;
	/** Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the photo */
	input_message_content?: InputMessageContent;
}

/** Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation. */
export interface InlineQueryResultCachedGif {
	/** Type of the result, must be gif */
	type: "gif";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the GIF file */
	gif_file_id: string;
	/** Title for the result */
	title?: string;
	/** Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the GIF animation */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultCachedMpeg4Gif {
	/** Type of the result, must be mpeg4_gif */
	type: "mpeg4_gif";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the MPEG4 file */
	mpeg4_file_id: string;
	/** Title for the result */
	title?: string;
	/** Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the video animation */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker. */
export interface InlineQueryResultCachedSticker {
	/** Type of the result, must be sticker */
	type: "sticker";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier of the sticker */
	sticker_file_id: string;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the sticker */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file.  */
export interface InlineQueryResultCachedDocument {
	/** Type of the result, must be document */
	type: "document";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** Title for the result */
	title: string;
	/** A valid file identifier for the file */
	document_file_id: string;
	/** Short description of the result */
	description?: string;
	/** Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the file */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface InlineQueryResultCachedVideo {
	/** Type of the result, must be video */
	type: "video";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the video file */
	video_file_id: string;
	/** Title for the result */
	title: string;
	/** Short description of the result */
	description?: string;
	/** Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Pass True, if the caption must be shown above the message media */
	show_caption_above_media?: boolean;
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the video */
	input_message_content?: InputMessageContent;
}

/** Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the voice message. */
export interface InlineQueryResultCachedVoice {
	/** Type of the result, must be voice */
	type: "voice";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the voice message */
	voice_file_id: string;
	/** Voice message title */
	title: string;
	/** Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the voice message */
	input_message_content?: InputMessageContent;
}

/** Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface InlineQueryResultCachedAudio {
	/** Type of the result, must be audio */
	type: "audio";
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the audio file */
	audio_file_id: string;
	/** Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: MessageEntity[];
	/** Inline keyboard attached to the message */
	reply_markup?: InlineKeyboardMarkup;
	/** Content of the message to be sent instead of the audio */
	input_message_content?: InputMessageContent;
}

/** This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following 5 types:

- InputTextMessageContent
- InputLocationMessageContent
- InputVenueMessageContent
- InputContactMessageContent
- InputInvoiceMessageContent */
export type InputMessageContent =
	| InputTextMessageContent
	| InputLocationMessageContent
	| InputVenueMessageContent
	| InputContactMessageContent
	| InputInvoiceMessageContent;

/** Represents the content of a text message to be sent as the result of an inline query. */
export interface InputTextMessageContent {
	/** Text of the message to be sent, 1-4096 characters */
	message_text: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: ParseMode;
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: MessageEntity[];
	/** Options used for link preview generation for the original message, if it is a text message */
	link_preview_options?: LinkPreviewOptions;
}

/** Represents the content of a location message to be sent as the result of an inline query. */
export interface InputLocationMessageContent {
	/** Latitude of the location in degrees */
	latitude: number;
	/** Longitude of the location in degrees */
	longitude: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Period in seconds during which the location can be updated, should be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely. */
	live_period?: number;
	/** For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
}

/** Represents the content of a venue message to be sent as the result of an inline query. */
export interface InputVenueMessageContent {
	/** Latitude of the venue in degrees */
	latitude: number;
	/** Longitude of the venue in degrees */
	longitude: number;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue, if known */
	foursquare_id?: string;
	/** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Google Places identifier of the venue */
	google_place_id?: string;
	/** Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
}

/** Represents the content of a contact message to be sent as the result of an inline query. */
export interface InputContactMessageContent {
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Contact's last name */
	last_name?: string;
	/** Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string;
}

/** Represents the content of an invoice message to be sent as the result of an inline query. */
export interface InputInvoiceMessageContent {
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
	provider_token?: string;
	/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
	currency: string;
	/** Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
	prices: LabeledPrice[];
	/** Optional. The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
	max_tip_amount?: number;
	/** An array of suggested amounts of tip in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
	suggested_tip_amounts?: number[];
	/** Data about the invoice, which will be shared with the payment provider. A detailed description of the required fields should be provided by the payment provider. */
	provider_data?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
	photo_url?: string;
	/** Photo size in bytes */
	photo_size?: number;
	/** Photo width */
	photo_width?: number;
	/** Photo height */
	photo_height?: number;
	/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
	need_name?: boolean;
	/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
	need_phone_number?: boolean;
	/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
	need_email?: boolean;
	/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
	need_shipping_address?: boolean;
	/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
	send_phone_number_to_provider?: boolean;
	/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
	send_email_to_provider?: boolean;
	/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
	is_flexible?: boolean;
}

/** Represents a result of an inline query that was chosen by the user and sent to their chat partner.

Note: It is necessary to enable inline feedback via @BotFather in order to receive these objects in updates. */
export interface ChosenInlineResult {
	/** The unique identifier for the result that was chosen */
	result_id: string;
	/** The user that chose the result */
	from: User;
	/** Sender location, only for bots that require user location */
	location?: Location;
	/** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message. */
	inline_message_id?: string;
	/** The query that was used to obtain the result */
	query: string;
}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Use this method to send invoices. On success, the sent Message is returned. */
	sendInvoice(args: {
		/** Unique identifier for the target chat or username of the target channel (in the format `@channelusername`) */
		chat_id: number | string;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
		direct_messages_topic_id?: number;
		/** Product name, 1-32 characters */
		title: string;
		/** Product description, 1-255 characters */
		description: string;
		/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
		payload: string;
		/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
		provider_token?: string;
		/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
		currency: string;
		/** Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
		prices: readonly LabeledPrice[];
		/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
		max_tip_amount?: number;
		/** An array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
		suggested_tip_amounts?: number[];
		/** Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter */
		start_parameter?: string;
		/** Data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
		provider_data?: string;
		/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
		photo_url?: string;
		/** Photo size in bytes */
		photo_size?: number;
		/** Photo width */
		photo_width?: number;
		/** Photo height */
		photo_height?: number;
		/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
		need_name?: boolean;
		/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
		need_phone_number?: boolean;
		/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
		need_email?: boolean;
		/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
		need_shipping_address?: boolean;
		/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
		send_phone_number_to_provider?: boolean;
		/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
		send_email_to_provider?: boolean;
		/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
		is_flexible?: boolean;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. Ignored for payments in Telegram Stars. */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** A object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
		suggested_post_parameters?: SuggestedPostParameters;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** An object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button. */
		reply_markup?: InlineKeyboardMarkup;
	}): Message.InvoiceMessage & Message.BusinessSentMessage;

	/** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
	createInvoiceLink(args: {
		/** Unique identifier of the business connection on behalf of which the link will be created. For payments in Telegram Stars only. */
		business_connection_id?: string;
		/** Product name, 1-32 characters */
		title: string;
		/** Product description, 1-255 characters */
		description: string;
		/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
		payload: string;
		/** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
		provider_token?: string;
		/** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
		currency: string;
		/** Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
		prices: LabeledPrice[];
		/** The number of seconds the subscription will be active for before the next payment. The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified. Any number of subscriptions can be active for a given bot at the same time, including multiple concurrent subscriptions from the same user. Subscription price must not exceed 2500 Telegram Stars. */
		subscription_period?: 2592000;
		/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
		max_tip_amount?: number;
		/** An array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
		suggested_tip_amounts?: number[];
		/** Data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
		provider_data?: string;
		/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
		photo_url?: string;
		/** Photo size in bytes */
		photo_size?: number;
		/** Photo width */
		photo_width?: number;
		/** Photo height */
		photo_height?: number;
		/** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
		need_name?: boolean;
		/** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
		need_phone_number?: boolean;
		/** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
		need_email?: boolean;
		/** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
		need_shipping_address?: boolean;
		/** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
		send_phone_number_to_provider?: boolean;
		/** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
		send_email_to_provider?: boolean;
		/** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
		is_flexible?: boolean;
	}): string;

	/** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
	answerShippingQuery(args: {
		/** Unique identifier for the query to be answered */
		shipping_query_id: string;
		/** Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
		ok: boolean;
		/** Required if ok is True. An array of available shipping options. */
		shipping_options?: readonly ShippingOption[];
		/** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable"). Telegram will display this message to the user. */
		error_message?: string;
	}): true;

	/** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
	answerPreCheckoutQuery(args: {
		/** Unique identifier for the query to be answered */
		pre_checkout_query_id: string;
		/** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
		ok: boolean;
		/** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
		error_message?: string;
	}): true;

	/** A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a StarAmount object. */
	getMyStarBalance(): StarAmount;

	/** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
	getStarTransactions(args: {
		/** Number of transactions to skip in the response */
		offset?: number;
		/** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
		limit?: number;
	}): StarTransactions;

	/** Refunds a successful payment in Telegram Stars. Returns True on success. */
	refundStarPayment(args: {
		/** Identifier of the user whose payment will be refunded */
		user_id: number;
		/** Telegram payment identifier */
		telegram_payment_charge_id: string;
	}): true;

	/** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns True on success. */
	editUserStarSubscription(args: {
		/** Identifier of the user whose subscription will be edited */
		user_id: number;
		/** Telegram payment identifier for the subscription */
		telegram_payment_charge_id: string;
		/** Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot. */
		is_canceled: boolean;
	}): true;
}

/** This object represents a portion of the price for goods or services. */
export interface LabeledPrice {
	/** Portion label */
	label: string;
	/** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	amount: number;
}

/** This object contains basic information about an invoice. */
export interface Invoice {
	/** Product name */
	title: string;
	/** Product description */
	description: string;
	/** Unique bot deep-linking parameter that can be used to generate this invoice */
	start_parameter: string;
	/** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
	currency: string;
	/** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
}

/** This object represents a shipping address. */
export interface ShippingAddress {
	/** Two-letter ISO 3166-1 alpha-2 country code */
	country_code: string;
	/** State, if applicable */
	state: string;
	/** City */
	city: string;
	/** First line for the address */
	street_line1: string;
	/** Second line for the address */
	street_line2: string;
	/** Address post code */
	post_code: string;
}

/** This object represents information about an order. */
export interface OrderInfo {
	/** User name */
	name?: string;
	/** User's phone number */
	phone_number?: string;
	/** User email */
	email?: string;
	/** User shipping address */
	shipping_address?: ShippingAddress;
}

/** This object represents one shipping option. */
export interface ShippingOption {
	/** Shipping option identifier */
	id: string;
	/** Option title */
	title: string;
	/** List of price portions */
	prices: LabeledPrice[];
}

/** This object contains basic information about a successful payment. Note that if the buyer initiates a chargeback with the relevant payment provider following this transaction, the funds may be debited from your balance. This is outside of Telegram's control. */
export interface SuccessfulPayment {
	/** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
	currency: string;
	/** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
	/** Bot specified invoice payload */
	invoice_payload: string;
	/** Expiration date of the subscription, in Unix time; for recurring payments only */
	subscription_expiration_date?: number;
	/** True, if the payment is a recurring payment for a subscription */
	is_recurring?: true;
	/** True, if the payment is the first payment for a subscription */
	is_first_recurring?: true;
	/** Identifier of the shipping option chosen by the user */
	shipping_option_id?: string;
	/** Order information provided by the user */
	order_info?: OrderInfo;
	/** Telegram payment identifier */
	telegram_payment_charge_id: string;
	/** Provider payment identifier */
	provider_payment_charge_id: string;
}

/** This object contains basic information about a refunded payment. */
export interface RefundedPayment {
	/** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars. Currently, always “XTR” */
	currency: "XTR";
	/** Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
	/** Bot-specified invoice payload */
	invoice_payload: string;
	/** Telegram payment identifier */
	telegram_payment_charge_id: string;
	/** Provider payment identifier */
	provider_payment_charge_id?: string;
}

/** This object contains information about an incoming shipping query. */
export interface ShippingQuery {
	/** Unique query identifier */
	id: string;
	/** User who sent the query */
	from: User;
	/** Bot-specified invoice payload */
	invoice_payload: string;
	/** User specified shipping address */
	shipping_address: ShippingAddress;
}

/** This object contains information about an incoming pre-checkout query. */
export interface PreCheckoutQuery {
	/** Unique query identifier */
	id: string;
	/** User who sent the query */
	from: User;
	/** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
	currency: string;
	/** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
	/** Bot-specified invoice payload */
	invoice_payload: string;
	/** Identifier of the shipping option chosen by the user */
	shipping_option_id?: string;
	/** Order information provided by the user */
	order_info?: OrderInfo;
}

/** This object contains information about a paid media purchase. */
export interface PaidMediaPurchased {
	/** User who purchased the media */
	from: User;
	/** Bot-specified paid media payload */
	paid_media_payload: string;
}

/** This object describes the state of a revenue withdrawal operation. Currently, it can be one of

- RevenueWithdrawalStatePending
- RevenueWithdrawalStateSucceeded
- RevenueWithdrawalStateFailed */
export type RevenueWithdrawalState =
	| RevenueWithdrawalStatePending
	| RevenueWithdrawalStateSucceeded
	| RevenueWithdrawalStateFailed;

/** The withdrawal is in progress. */
export interface RevenueWithdrawalStatePending {
	/** Type of the state, always “pending” */
	type: "pending";
}

/** The withdrawal succeeded. */
export interface RevenueWithdrawalStateSucceeded {
	/** Type of the state, always “succeeded” */
	type: "succeeded";
	/** Date the withdrawal was completed in Unix time */
	date: number;
	/** An HTTPS URL that can be used to see transaction details */
	url: string;
}

/** The withdrawal failed and the transaction was refunded. */
export interface RevenueWithdrawalStateFailed {
	/** Type of the state, always “failed” */
	type: "failed";
}

/** Contains information about the affiliate that received a commission via this transaction. */
export interface AffiliateInfo {
	/** The bot or the user that received an affiliate commission if it was received by a bot or a user */
	affiliate_user?: User;
	/** The chat that received an affiliate commission if it was received by a chat */
	affiliate_chat?: Chat;
	/** The number of Telegram Stars received by the affiliate for each 1000 Telegram Stars received by the bot from referred users */
	commission_per_mille: number;
	/** Integer amount of Telegram Stars received by the affiliate from the transaction, rounded to 0; can be negative for refunds */
	amount: number;
	/** The number of 1/1000000000 shares of Telegram Stars received by the affiliate; from -999999999 to 999999999; can be negative for refunds */
	nanostar_amount?: number;
}

/** This object describes the source of a transaction, or its recipient for outgoing transactions. Currently, it can be one of

- TransactionPartnerUser
- TransactionPartnerChat
- TransactionPartnerAffiliateProgram
- TransactionPartnerFragment
- TransactionPartnerTelegramAds
- TransactionPartnerTelegramApi
- TransactionPartnerOther */
export type TransactionPartner =
	| TransactionPartnerUser
	| TransactionPartnerChat
	| TransactionPartnerAffiliateProgram
	| TransactionPartnerFragment
	| TransactionPartnerTelegramAds
	| TransactionPartnerTelegramApi
	| TransactionPartnerOther;

export declare namespace TransactionPartnerUser {
	export interface Abstract {
		/** Type of the transaction partner, always “user” */
		type: "user";
		/** Type of the transaction, currently one of “invoice_payment” for payments via invoices, “paid_media_payment” for payments for paid media, “gift_purchase” for gifts sent by the bot, “premium_purchase” for Telegram Premium subscriptions gifted by the bot, “business_account_transfer” for direct transfers from managed business accounts */
		transaction_type:
			| "invoice_payment"
			| "paid_media_payment"
			| "gift_purchase"
			| "premium_purchase"
			| "business_account_transfer";
		/** Information about the user */
		user: User;
	}

	export interface InvoicePayment extends Abstract {
		transaction_type: "invoice_payment";
		/** Information about the affiliate that received a commission via this transaction. Can be available only for “invoice_payment” and “paid_media_payment” transactions. */
		affiliate?: AffiliateInfo;
		/** Bot-specified invoice payload. Can be available only for “invoice_payment” transactions. */
		invoice_payload?: string;
		/** The duration of the paid subscription. Can be available only for “invoice_payment” transactions. */
		subscription_period?: number;
	}

	export interface PaidMediaPayment extends Abstract {
		transaction_type: "paid_media_payment";
		/** Information about the affiliate that received a commission via this transaction. Can be available only for “invoice_payment” and “paid_media_payment” transactions. */
		affiliate?: AffiliateInfo;
		/** Information about the paid media bought by the user; for “paid_media_payment” transactions only */
		paid_media?: PaidMedia[];
		/** Bot-specified paid media payload. Can be available only for “paid_media_payment” transactions. */
		paid_media_payload?: string;
	}

	export interface GiftPurchase extends Abstract {
		transaction_type: "gift_purchase";
		/** The gift sent to the user by the bot; for “gift_purchase” transactions only */
		gift?: Gift;
	}

	export interface PremiumPurchase extends Abstract {
		transaction_type: "premium_purchase";
		/** Number of months the gifted Telegram Premium subscription will be active for; for “premium_purchase” transactions only */
		premium_subscription_duration?: number;
	}

	export interface BusinessAccountTransfer extends Abstract {
		transaction_type: "business_account_transfer";
	}
}

/** Describes a transaction with a user. */
export type TransactionPartnerUser =
	| TransactionPartnerUser.InvoicePayment
	| TransactionPartnerUser.PaidMediaPayment
	| TransactionPartnerUser.GiftPurchase
	| TransactionPartnerUser.PremiumPurchase
	| TransactionPartnerUser.BusinessAccountTransfer;

/** Describes a transaction with a chat. */
export interface TransactionPartnerChat {
	/** Type of the transaction partner, always “chat” */
	type: "chat";
	/** Information about the chat */
	chat: Chat;
	/** The gift sent to the chat by the bot */
	gift?: Gift;
}

/** Describes the affiliate program that issued the affiliate commission received via this transaction. */
export interface TransactionPartnerAffiliateProgram {
	/** Type of the transaction partner, always “affiliate_program” */
	type: "affiliate_program";
	/** Information about the bot that sponsored the affiliate program */
	sponsor_user?: User;
	/** The number of Telegram Stars received by the bot for each 1000 Telegram Stars received by the affiliate program sponsor from referred users */
	commission_per_mille: number;
}

/** Describes a withdrawal transaction with Fragment. */
export interface TransactionPartnerFragment {
	/** Type of the transaction partner, always “fragment” */
	type: "fragment";
	/** State of the transaction if the transaction is outgoing */
	withdrawal_state?: RevenueWithdrawalState;
}

/** Describes a withdrawal transaction to the Telegram Ads platform. */
export interface TransactionPartnerTelegramAds {
	/** Type of the transaction partner, always “telegram_ads” */
	type: "telegram_ads";
}

/** Describes a transaction with payment for paid broadcasting. */
export interface TransactionPartnerTelegramApi {
	/** Type of the transaction partner, always “telegram_api” */
	type: "telegram_api";
	/** The number of successful requests that exceeded regular limits and were therefore billed */
	request_count: number;
}

/** Describes a transaction with an unknown source or recipient. */
export interface TransactionPartnerOther {
	/** Type of the transaction partner, always “other” */
	type: "other";
}

/** Describes a Telegram Star transaction. Note that if the buyer initiates a chargeback with the payment provider from whom they acquired Stars (e.g., Apple, Google) following this transaction, the refunded Stars will be deducted from the bot's balance. This is outside of Telegram's control. */
export interface StarTransaction {
	/** Unique identifier of the transaction. Coincides with the identifier of the original transaction for refund transactions. Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users. */
	id: string;
	/** Integer amount of Telegram Stars transferred by the transaction */
	amount: number;
	/** The number of 1/1000000000 shares of Telegram Stars transferred by the transaction; from 0 to 999999999 */
	nanostar_amount?: number;
	/** Date the transaction was created in Unix time */
	date: number;
	/** Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal). Only for incoming transactions */
	source?: TransactionPartner;
	/** Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal). Only for outgoing transactions */
	receiver?: TransactionPartner;
}

/** Contains a list of Telegram Star transactions. */
export interface StarTransactions {
	/** The list of transactions */
	transactions: StarTransaction[];
}

/** Describes Telegram Passport data shared with the bot by the user. */
export interface PassportData {
	/** Array with information about documents and other Telegram Passport elements that was shared with the bot */
	data: EncryptedPassportElement[];
	/** Encrypted credentials required to decrypt the data */
	credentials: EncryptedCredentials;
}

/** This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB. */
export interface PassportFile {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** File size in bytes */
	file_size: number;
	/** Unix time when the file was uploaded */
	file_date: number;
}

/** Describes documents or other Telegram Passport elements shared with the bot by the user. */
export interface EncryptedPassportElement {
	/** Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”. */
	type:
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
		| "email";
	/** Base64-encoded encrypted Telegram Passport element data provided by the user; available only for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials. */
	data?: string;
	/** User's verified phone number; available only for “phone_number” type */
	phone_number?: string;
	/** User's verified email address; available only for “email” type */
	email?: string;
	/** Array of encrypted files with documents provided by the user; available only for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
	files?: PassportFile[];
	/** Encrypted file with the front side of the document, provided by the user; available only for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
	front_side?: PassportFile;
	/** Encrypted file with the reverse side of the document, provided by the user; available only for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
	reverse_side?: PassportFile;
	/** Encrypted file with the selfie of the user holding a document, provided by the user; available if requested for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
	selfie?: PassportFile;
	/** Array of encrypted files with translated versions of documents provided by the user; available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
	translation?: PassportFile[];
	/** Base64-encoded element hash for using in PassportElementErrorUnspecified */
	hash: string;
}

/** Describes data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes. */
export interface EncryptedCredentials {
	/** Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication */
	data: string;
	/** Base64-encoded data hash for data authentication */
	hash: string;
	/** Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption */
	secret: string;
}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.

  Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
	setPassportDataErrors(args: {
		/** User identifier */
		user_id: number;
		/** An array describing the errors */
		errors: readonly PassportElementError[];
	}): true;
}

/** This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of:
- PassportElementErrorDataField
- PassportElementErrorFrontSide
- PassportElementErrorReverseSide
- PassportElementErrorSelfie
- PassportElementErrorFile
- PassportElementErrorFiles
- PassportElementErrorTranslationFile
- PassportElementErrorTranslationFiles
- PassportElementErrorUnspecified
*/
export type PassportElementError =
	| PassportElementErrorDataField
	| PassportElementErrorFrontSide
	| PassportElementErrorReverseSide
	| PassportElementErrorSelfie
	| PassportElementErrorFile
	| PassportElementErrorFiles
	| PassportElementErrorTranslationFile
	| PassportElementErrorTranslationFiles
	| PassportElementErrorUnspecified;

/** Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. */
export interface PassportElementErrorDataField {
	/** Error source, must be data */
	source: "data";
	/** The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address” */
	type: "personal_details" | "passport" | "driver_license" | "identity_card" | "internal_passport" | "address";
	/** Name of the data field which has the error */
	field_name: string;
	/** Base64-encoded data hash */
	data_hash: string;
	/** Error message */
	message: string;
}

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export interface PassportElementErrorFrontSide {
	/** Error source, must be front_side */
	source: "front_side";
	/** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
	type: "passport" | "driver_license" | "identity_card" | "internal_passport";
	/** Base64-encoded hash of the file with the front side of the document */
	file_hash: string;
	/** Error message */
	message: string;
}

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. */
export interface PassportElementErrorReverseSide {
	/** Error source, must be reverse_side */
	source: "reverse_side";
	/** The section of the user's Telegram Passport which has the issue, one of “driver_license”, “identity_card” */
	type: "driver_license" | "identity_card";
	/** Base64-encoded hash of the file with the reverse side of the document */
	file_hash: string;
	/** Error message */
	message: string;
}

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export interface PassportElementErrorSelfie {
	/** Error source, must be selfie */
	source: "selfie";
	/** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
	type: "passport" | "driver_license" | "identity_card" | "internal_passport";
	/** Base64-encoded hash of the file with the selfie */
	file_hash: string;
	/** Error message */
	message: string;
}

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export interface PassportElementErrorFile {
	/** Error source, must be file */
	source: "file";
	/** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type: "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
	/** Base64-encoded file hash */
	file_hash: string;
	/** Error message */
	message: string;
}

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export interface PassportElementErrorFiles {
	/** Error source, must be files */
	source: "files";
	/** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type: "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
	/** List of base64-encoded file hashes */
	file_hashes: string[];
	/** Error message */
	message: string;
}

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export interface PassportElementErrorTranslationFile {
	/** Error source, must be translation_file */
	source: "translation_file";
	/** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type:
		| "passport"
		| "driver_license"
		| "identity_card"
		| "internal_passport"
		| "utility_bill"
		| "bank_statement"
		| "rental_agreement"
		| "passport_registration"
		| "temporary_registration";
	/** Base64-encoded file hash */
	file_hash: string;
	/** Error message */
	message: string;
}

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change. */
export interface PassportElementErrorTranslationFiles {
	/** Error source, must be translation_files */
	source: "translation_files";
	/** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type:
		| "passport"
		| "driver_license"
		| "identity_card"
		| "internal_passport"
		| "utility_bill"
		| "bank_statement"
		| "rental_agreement"
		| "passport_registration"
		| "temporary_registration";
	/** List of base64-encoded file hashes */
	file_hashes: string[];
	/** Error message */
	message: string;
}

/** Represents an issue in an unspecified place. The error is considered resolved when new data is added. */
export interface PassportElementErrorUnspecified {
	/** Error source, must be unspecified */
	source: "unspecified";
	/** Type of element of the user's Telegram Passport which has the issue */
	type: string;
	/** Base64-encoded element hash */
	element_hash: string;
	/** Error message */
	message: string;
}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Use this method to send a game. On success, the sent Message is returned. */
	sendGame(args: {
		/** Unique identifier of the business connection on behalf of which the message will be sent */
		business_connection_id?: string;
		/** Unique identifier for the target chat */
		chat_id: number;
		/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
		message_thread_id?: number;
		/** Short name of the game, serves as the unique identifier for the game. Set up your games via BotFather. */
		game_short_name: string;
		/** Sends the message silently. Users will receive a notification with no sound. */
		disable_notification?: boolean;
		/** Protects the contents of the sent message from forwarding and saving */
		protect_content?: boolean;
		/** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance */
		allow_paid_broadcast?: boolean;
		/** Unique identifier of the message effect to be added to the message; for private chats only */
		message_effect_id?: string;
		/** Description of the message to reply to */
		reply_parameters?: ReplyParameters;
		/** An object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. */
		reply_markup?: InlineKeyboardMarkup;
	}): Message.GameMessage & Message.BusinessSentMessage;
}

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export interface Game {
	/** Title of the game */
	title: string;
	/** Description of the game */
	description: string;
	/** Photo that will be displayed in the game message in chats. */
	photo: PhotoSize[];
	/** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters. */
	text?: string;
	/** Special entities that appear in text, such as usernames, URLs, bot commands, etc. */
	text_entities?: MessageEntity[];
	/** Animation that will be displayed in the game message in chats. Upload via BotFather */
	animation?: Animation;
}

/** A placeholder, currently holds no information. Use BotFather to set up your game. */
export interface CallbackGame {}

// Methods in documentation order; merged and published as `ApiMethods`.
interface MethodDeclarations<F> {
	/** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
	setGameScore(args: {
		/** User identifier */
		user_id: number;
		/** New score, must be non-negative */
		score: number;
		/** Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters */
		force?: boolean;
		/** Pass True if the game message should not be automatically edited to include the current scoreboard */
		disable_edit_message?: boolean;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat */
		chat_id?: number;
		/** Required if inline_message_id is not specified. Identifier of the sent message */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
	}): (Update.Edited & Message.GameMessage & Message.BusinessSentMessage) | true;

	/** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects.

  This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change. */
	getGameHighScores(args: {
		/** Target user id */
		user_id: number;
		/** Required if inline_message_id is not specified. Unique identifier for the target chat */
		chat_id?: number;
		/** Required if inline_message_id is not specified. Identifier of the sent message */
		message_id?: number;
		/** Required if chat_id and message_id are not specified. Identifier of the inline message */
		inline_message_id?: string;
	}): GameHighScore[];
}

/** This object represents one row of the high scores table for a game. */
export interface GameHighScore {
	/** Position in high score table for the game */
	position: number;
	/** User */
	user: User;
	/** Score */
	score: number;
}

type UnionKeys<T> = T extends T ? keyof T : never;

/** Wrapper type to bundle all methods of the Telegram Bot API */
export type ApiMethods<F> = {
	[K in keyof MethodDeclarations<F>]: MethodDeclarations<F>[K];
};

/** Extracts the parameters of a given method name */
type Params<F, M extends keyof ApiMethods<F>> = Parameters<ApiMethods<F>[M]>;

/** Utility type providing the argument type for the given method name or `{}` if the method does not take any parameters */
export type Opts<F> = {
	[M in keyof ApiMethods<F>]: Params<F, M>[0] extends undefined ? {} : NonNullable<Params<F, M>[0]>;
};

export type Ret<F> = {
	[M in keyof ApiMethods<F>]: ReturnType<ApiMethods<F>[M]>;
};
