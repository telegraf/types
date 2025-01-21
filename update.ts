import type { ChosenInlineResult, InlineQuery } from "./inline.ts";
import type {
  BusinessConnection,
  BusinessMessagesDeleted,
  Chat,
  ChatBoostRemoved,
  ChatBoostUpdated,
  ChatJoinRequest,
  ChatMemberUpdated,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  User,
} from "./manage.ts";
import type { CallbackQuery } from "./markup.ts";
import type {
  CommonMessageBundle,
  Message,
  Poll,
  PollAnswer,
} from "./message.ts";
import type {
  PaidMediaPurchased,
  PreCheckoutQuery,
  ShippingQuery,
} from "./payment.ts";

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
  export interface MessageUpdate<M extends Message = Message>
    extends AbstractUpdate {
    /** New incoming message of any kind - text, photo, sticker, etc. */
    message: New & NonChannel & M;
  }
  export interface EditedMessageUpdate<
    M extends CommonMessageBundle = CommonMessageBundle,
  > extends AbstractUpdate {
    /** New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
    edited_message: Edited & NonChannel & M;
  }
  export interface ChannelPostUpdate<M extends Message = Message>
    extends AbstractUpdate {
    /** New incoming channel post of any kind - text, photo, sticker, etc. */
    channel_post: New & Channel & M;
  }
  export interface EditedChannelPostUpdate<
    M extends CommonMessageBundle = CommonMessageBundle,
  > extends AbstractUpdate {
    /** New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
    edited_channel_post: Edited & Channel & M;
  }
  export interface BusinessConnectionUpdate extends AbstractUpdate {
    /** The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot */
    business_connection: BusinessConnection;
  }
  export interface BusinessMessageUpdate<
    M extends CommonMessageBundle = CommonMessageBundle,
  > extends AbstractUpdate {
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
  export interface CallbackQueryUpdate<C extends CallbackQuery = CallbackQuery>
    extends AbstractUpdate {
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
  | Update.CallbackQueryUpdate
  | Update.ChannelPostUpdate
  | Update.ChatMemberUpdate
  | Update.ChosenInlineResultUpdate
  | Update.EditedChannelPostUpdate
  | Update.BusinessConnectionUpdate
  | Update.BusinessMessageUpdate
  | Update.EditedBusinessMessageUpdate
  | Update.DeletedBusinessMessagesUpdate
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
  | Update.RemovedChatBoostUpdate;
