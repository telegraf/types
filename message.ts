// deno-lint-ignore-file no-irregular-whitespace
import type {
  Chat,
  DirectMessagesTopic,
  File,
  Gift,
  StarAmount,
  SuggestedPostInfo,
  SuggestedPostPrice,
  UniqueGift,
  User,
} from "./manage.ts";
import type { InlineKeyboardMarkup } from "./markup.ts";
import type { PassportData } from "./passport.ts";
import type { Invoice, RefundedPayment, SuccessfulPayment } from "./payment.ts";

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
  | Message.UsersSharedMessage
  | Message.ChatSharedMessage
  | Message.GiftMessage
  | Message.UniqueGiftMessage
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
  | Message.WebAppDataMessage;

/** Helper type that bundles all possible `Message.CommonMessage`s. More specifically, bundles all messages that do have a `reply_to_message` field, i.e. are a `Message.CommonMessage`. */
export type CommonMessageBundle =
  | Message.AnimationMessage
  | Message.AudioMessage
  | Message.ContactMessage
  | Message.DiceMessage
  | Message.DocumentMessage
  | Message.GameMessage
  | Message.LocationMessage
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
type ReplyMessage =
  | ServiceMessageBundle
  | (CommonMessageBundle & { reply_to_message: undefined });

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
export type MaybeInaccessibleMessage =
  | Message
  | InaccessibleMessage;

/** Describes an inline message sent by a Web App on behalf of a user. */
export interface SentWebAppMessage {
  /** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
  inline_message_id: string;
}

/** Describes an inline message to be sent by a user of a Mini App. */
export interface PreparedInlineMessage {
  /** Unique identifier of the prepared message */
  id: string;
  /** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used */
  expiration_date: number;
}

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

export interface ExternalReplyAnimation
  extends AbstractExternalReply, AbstractExternalReplyMedia {
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

export interface ExternalReplyPhoto
  extends AbstractExternalReply, AbstractExternalReplyMedia {
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

export interface ExternalReplyVideo
  extends AbstractExternalReply, AbstractExternalReplyMedia {
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
  | ExternalReplyPhoto
  | ExternalReplySticker
  | ExternalReplyStory
  | ExternalReplyVideo
  | ExternalReplyVideoNote
  | ExternalReplyVoice
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

/** This object describes the origin of a message. It can be one of

- MessageOriginUser
- MessageOriginHiddenUser
- MessageOriginChat
- MessageOriginChannel
 */
type MessageOrigin =
  | MessageOriginUser
  | MessageOriginHiddenUser
  | MessageOriginChat
  | MessageOriginChannel;

export interface AbstractMessageOrigin {
  /** Type of the message origin */
  type: string;
  /** Date the message was sent originally in Unix time */
  date: number;
}

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

declare namespace PaidMedia {
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

  /** The paid media is a photo. */
  export interface PaidMediaPhoto {
    /** Type of the paid media, always “photo” */
    type: string;
    /** The photo */
    photo: PhotoSize[];
  }

  /** The paid media is a video. */
  export interface PaidMediaVideo {
    /** Type of the paid media, always “video” */
    type: string;
    /** The video */
    video: Video;
  }
}

/** This object describes paid media. Currently, it can be one of

- PaidMediaPreview
- PaidMediaPhoto
- PaidMediaVideo
 */
export type PaidMedia =
  | PaidMedia.PaidMediaPreview
  | PaidMedia.PaidMediaPhoto
  | PaidMedia.PaidMediaVideo;

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

/** This object represents a message about a forwarded story in the chat. Currently holds no information. */
export interface Story {
  /** Chat that posted the story */
  chat: Chat;
  /** Unique identifier for the story in the chat */
  id: number;
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

/** This object describes the way a background is filled based on the selected colors. Currently, it can be one of

- BackgroundFillSolid
- BackgroundFillGradient
- BackgroundFillFreeformGradient
*/
export type BackgroundFill =
  | BackgroundFillSolid
  | BackgroundFillGradient
  | BackgroundFillFreeformGradient;

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
  is_blurred: boolean;
  /** True, if the background moves slightly when the device is tilted */
  is_moving: boolean;
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
  is_inverted: boolean;
  /** True, if the background moves slightly when the device is tilted */
  is_moving: boolean;
}

/** The background is taken directly from a built-in chat theme. */
export interface BackgroundTypeChatTheme {
  /** Type of the background, always “chat_theme” */
  type: "chat_theme";
  /** Name of the chat theme, which is usually an emoji */
  theme_name: string;
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

/** This object represents a chat background. */
export interface ChatBackground {
  /** Type of the background */
  type: BackgroundType;
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

/** This object represents a service message about an edited forum topic. */
export interface ForumTopicEdited {
  /** New name of the topic, if it was edited */
  name?: string;
  /** New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
  icon_custom_emoji_id?: string;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export interface ForumTopicClosed {}

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
  can_be_upgraded?: boolean;
  /** Text of the message that was added to the gift */
  text?: string;
  /** Special entities that appear in the text */
  entities?: MessageEntity[];
  /** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  is_private?: boolean;
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
  /** True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway. */
  is_star_giveaway?: true;
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
  direct_message_star_count: number;
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
  price?: SuggestedPostPrice;
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

/** This object represents a service message about the completion of a giveaway without public winners. */
export interface GiveawayCompleted {
  /** Number of winners in the giveaway */
  winner_count: number;
  /** Number of undistributed prizes */
  unclaimed_prize_count?: number;
  /** Message with the giveaway that was completed, if it wasn't deleted */
  giveaway_message?: Message;
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

/** Describes data sent from a Web App to the bot. */
export interface WebAppData {
  /** The data. Be aware that a bad client can send arbitrary data in this field. */
  data: string;
  /** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
  button_text: string;
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

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export interface Game {
  /** Title of the game */
  title: string;
  /** Description of the game */
  description: string;
  /** Photo that will be displayed in the game message in chats. */
  photo: PhotoSize[];
  /** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters. */
  text: string;
  /** Special entities that appear in text, such as usernames, URLs, bot commands, etc. */
  text_entities: MessageEntity[];
  /** Animation that will be displayed in the game message in chats. Upload via BotFather */
  animation: Animation;
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
