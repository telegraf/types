import type {
	Animation,
	ApiMethods,
	Audio,
	Chat,
	ChatFullInfo,
	Document,
	InputRichBlock,
	InputRichBlockDraft,
	InputRichMessage,
	InputRichMessageContent,
	KeyboardButton,
	Link,
	LivePhoto,
	Location,
	PhotoSize,
	Opts,
	PollMedia,
	RichMessageButton,
	RichMessageButtonText,
	RichText,
	Sticker,
	Venue,
	Video,
} from "../index";

declare const chat: Chat;
const personalChat: Extract<ChatFullInfo, { type: "private" }>["personal_chat"] = chat;
void personalChat;

// Plain reply buttons may be styled without opting into an action.
const styledButton: KeyboardButton = {
	text: "Continue",
	style: "success",
	icon_custom_emoji_id: "123",
};
void styledButton;

const emoji: RichText.CustomEmoji = {
	type: "custom_emoji",
	custom_emoji_id: "123",
	alternative_text: ":)",
};
const dateTime: RichMessageButtonText = {
	type: "date_time",
	text: [
		"Starts ",
		emoji,
		{
			type: "date_time",
			text: "tomorrow",
			unix_time: 1,
			date_time_format: "d",
		},
	],
	unix_time: 1,
	date_time_format: "d",
};
const button: RichMessageButton = {
	text: ["Event ", dateTime],
	callback_data: "event",
};
void button;

const bold: RichText.Bold = { type: "bold", text: "Not button text" };
// @ts-expect-error Only plain text, custom emoji and date-time are allowed.
const invalidText: RichMessageButtonText = bold;
// @ts-expect-error Arrays must preserve the same restrictions.
const invalidArray: RichMessageButtonText = ["prefix", bold];
// @ts-expect-error Nesting must not bypass the button text restrictions.
const invalidDateTime: RichMessageButtonText = {
	type: "date_time",
	text: [
		"prefix",
		{
			type: "date_time",
			text: bold,
			unix_time: 1,
			date_time_format: "d",
		},
	],
	unix_time: 1,
	date_time_format: "d",
};
void invalidText;
void invalidArray;
void invalidDateTime;

declare const animation: Animation;
declare const audio: Audio;
declare const document: Document;
declare const link: Link;
declare const live_photo: LivePhoto;
declare const location: Location;
declare const photo: PhotoSize[];
declare const sticker: Sticker;
declare const venue: Venue;
declare const video: Video;
const pollMedia: PollMedia[] = [
	{},
	{ animation },
	{ audio },
	{ document },
	{ link },
	{ live_photo },
	{ location },
	{ photo },
	{ sticker },
	{ venue },
	{ video },
];
// @ts-expect-error At most one field may be present, including in object literals.
const multipleMedia: PollMedia = { photo, video };
const mixed = { photo, video };
// @ts-expect-error Structural assignment must not bypass mutual exclusion.
const multipleMediaVariable: PollMedia = mixed;
void pollMedia;
void multipleMedia;
void multipleMediaVariable;

declare const api: ApiMethods<never>;
declare const completed: InputRichMessage<never>;
declare const completedBlock: InputRichBlock<never>;
const reusableBlock: InputRichBlockDraft<never> = completedBlock;
api.sendRichMessageDraft({ chat_id: 1, draft_id: 1, rich_message: completed });
api.sendRichMessageDraft({
	chat_id: 1,
	draft_id: 1,
	rich_message: {
		blocks: [reusableBlock, { type: "thinking", text: "Working" }],
	},
});
const thinking = { type: "thinking", text: "Working" } as const;
const draft = { blocks: [thinking] } as const;
const nestedDraft = {
	blocks: [
		{
			type: "details",
			summary: "Details",
			blocks: [
				{
					type: "list",
					items: [{ blocks: [thinking] }],
				},
			],
		},
	],
} as const;
api.sendRichMessageDraft({ chat_id: 1, draft_id: 1, rich_message: draft });
api.sendRichMessageDraft({
	chat_id: 1,
	draft_id: 1,
	rich_message: nestedDraft,
});
// @ts-expect-error Thinking is only allowed in drafts.
const normal: InputRichMessage<never> = draft;
// @ts-expect-error Nesting must preserve the draft-only restriction.
const nestedNormal: InputRichMessage<never> = nestedDraft;
// @ts-expect-error Ordinary sends cannot contain a thinking placeholder.
api.sendRichMessage({ chat_id: 1, rich_message: draft });
// @ts-expect-error Inline and guest rich content cannot contain draft blocks.
const inline: InputRichMessageContent = { rich_message: nestedDraft };
// @ts-expect-error Edits cannot introduce a draft-only block.
api.editMessageText({ chat_id: 1, message_id: 1, rich_message: draft });
api.editEphemeralMessageText({
	chat_id: 1,
	receiver_user_id: 2,
	ephemeral_message_id: 1,
	// @ts-expect-error Ephemeral edits cannot introduce a draft-only block.
	rich_message: nestedDraft,
});
void normal;
void nestedNormal;
void inline;

interface Upload {
	bytes: Uint8Array;
}
declare const files: ApiMethods<Upload>;
const upload: Upload = { bytes: new Uint8Array([1, 2, 3]) };
files.sendLivePhoto({ chat_id: 1, photo: upload, live_photo: "existing-file-id" });
files.sendMediaGroup({
	chat_id: 1,
	media: [{ type: "live_photo", media: upload, photo: "attach://preview" }],
});
files.setWebhook({ url: "https://example.com/webhook", certificate: upload });
// @ts-expect-error Certificates require an upload, not a file ID or URL.
files.setWebhook({ url: "https://example.com/webhook", certificate: "file-id" });
// @ts-expect-error Upload shape must not be erased to any.
files.sendPhoto({ chat_id: 1, photo: { wrong: true } });
files.answerGuestQuery({
	guest_query_id: "guest",
	result: { type: "article", id: "1", title: "Reply", input_message_content: { message_text: "Hello" } },
});
// @ts-expect-error Guest replies require an InlineQueryResult.
files.answerGuestQuery({ guest_query_id: "guest", text: "Hello" });
files.answerChatJoinRequestQuery({ chat_join_request_query_id: "join", result: "queue" });
// @ts-expect-error The old boolean decision contract is invalid.
files.answerChatJoinRequestQuery({ query_id: "join", accept: true });
files.deleteEphemeralMessage({ chat_id: 1, receiver_user_id: 2, ephemeral_message_id: 3 });
// @ts-expect-error Ephemeral IDs are numeric and require a receiver.
files.deleteEphemeralMessage({ chat_id: 1, ephemeral_message_id: "3" });
const inlineEdited: true = files.editMessageText({ inline_message_id: "inline", text: "Updated" });
files.editMessageText({
	chat_id: 1,
	message_id: 2,
	rich_message: { blocks: [{ type: "paragraph", text: "Updated" }] },
});
void inlineEdited;

const uploadedBlock = {
	blocks: [{ type: "photo", photo: { type: "photo", media: upload } }],
} as const;
const uploadedMedia = {
	markdown: "![chart](tg://photo?id=chart)",
	media: [{ id: "chart", media: { type: "photo", media: upload } }],
} as const;
const existingBlock = {
	blocks: [{ type: "photo", photo: { type: "photo", media: "file-id" } }],
} as const;
const existingMedia = {
	markdown: "![chart](tg://photo?id=chart)",
	media: [{ id: "chart", media: { type: "photo", media: "file-id" } }],
} as const;
for (const rich_message of [uploadedBlock, uploadedMedia]) {
	files.sendRichMessage({ chat_id: 1, rich_message });
	files.editMessageText({ chat_id: 1, message_id: 2, rich_message });
	const ephemeral: Opts<Upload>["editEphemeralMessageText"] = {
		chat_id: 1,
		receiver_user_id: 2,
		ephemeral_message_id: 3,
		rich_message,
	};
	files.editEphemeralMessageText(ephemeral);
	// @ts-expect-error Inline edits cannot upload new files in blocks or media.
	files.editMessageText({ inline_message_id: "inline", rich_message });
	// @ts-expect-error Drafts cannot upload new files in blocks or media.
	files.sendRichMessageDraft({ chat_id: 1, draft_id: 2, rich_message });
	// @ts-expect-error Opts must preserve the inline upload restriction.
	const inlineArgs: Opts<Upload>["editMessageText"] = { inline_message_id: "inline", rich_message };
	// @ts-expect-error Opts must preserve the draft upload restriction.
	const draftArgs: Opts<Upload>["sendRichMessageDraft"] = { chat_id: 1, draft_id: 2, rich_message };
	void inlineArgs;
	void draftArgs;
}
for (const rich_message of [existingBlock, existingMedia]) {
	files.editMessageText({ inline_message_id: "inline", rich_message });
	files.sendRichMessageDraft({ chat_id: 1, draft_id: 2, rich_message });
}
// @ts-expect-error Inline edits reject a block upload independently of media.
files.editMessageText({ inline_message_id: "inline", rich_message: uploadedBlock });
// @ts-expect-error Inline edits reject an explicit media upload independently of blocks.
files.editMessageText({ inline_message_id: "inline", rich_message: uploadedMedia });
// @ts-expect-error Drafts reject a block upload independently of media.
files.sendRichMessageDraft({ chat_id: 1, draft_id: 2, rich_message: uploadedBlock });
// @ts-expect-error Drafts reject an explicit media upload independently of blocks.
files.sendRichMessageDraft({ chat_id: 1, draft_id: 2, rich_message: uploadedMedia });
const nestedUpload = {
	blocks: [{ type: "details", summary: "Details", blocks: uploadedBlock.blocks }],
} as const;
// @ts-expect-error Nesting must not bypass the inline upload restriction.
files.editMessageText({ inline_message_id: "inline", rich_message: nestedUpload });
// @ts-expect-error Nesting must not bypass the draft upload restriction.
files.sendRichMessageDraft({ chat_id: 1, draft_id: 2, rich_message: nestedUpload });
