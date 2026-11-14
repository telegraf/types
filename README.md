# Types for the Telegram Bot API

[![Bot API Version](https://img.shields.io/badge/Bot%20API-v10.3-f36caf.svg?style=flat-square&logo=Telegram&labelColor=white&color=blue)](https://core.telegram.org/bots/api) [![NPM version](https://img.shields.io/npm/v/@telegraf/types?style=flat-square&logo=npm&labelColor=fff&color=c53635)](https://npmjs.com/package/@telegraf/types)

This package provides TypeScript types for the whole [Telegram Bot API](https://core.telegram.org/bots/api), maintained for Telegraf.

The package ships type declarations only.

## Installation

```bash
npm install --save-dev @telegraf/types
```

## Types

Types from the Bot API documentation are declared under the same name, like `Message`, `User` and `InlineKeyboardMarkup`.

The documentation sometimes has one name for several shapes: there are many kinds of `Update`, and all of them are called `Update`.
Such a type becomes a union of its variants here, so that it narrows as you check it.
Variants of a type are written in a namespace named after the type, such as `Update.MessageUpdate` and `Message.TextMessage`.

```ts
import type { Update } from "@telegraf/types";

function textOf(update: Update) {
	if ("message" in update) {
		// update is Update.MessageUpdate
		if ("text" in update.message) {
			// update.message is Message.TextMessage
			return update.message.text;
		}
	}
}
```

The types declared this way are `Update`, `Message`, `Chat`, `ChatFullInfo`, `CallbackQuery`, `MessageEntity`, `InlineKeyboardButton`, `KeyboardButton`, `Location`, `ReplyParameters`, `PollMedia`, `InputRichMessage`, `RichMessageButton` and `TransactionPartnerUser`.

If the documentation describes a union, like `InlineQueryResult`, the type is a union of the documented types.

## Methods

`BotApi` declares all the methods of the Bot API.
A method takes one object of arguments and returns a `Promise` of its result.

```ts
import type { Args, BotApi } from "@telegraf/types";

declare const api: BotApi<never>;

const args: Args.SendMessage = { chat_id: 1, text: "Hello" };
const message = await api.sendMessage({ chat_id: 1, text: "Hello" });
```

- `Args` holds the arguments of each method as an interface: `Args.SendMessage`, `Args.GetChat`.
- Arguments that depend on each other are checked.
  An edit names a message in a chat or an inline message, not both and not neither.
- When the result depends on the arguments, so does its type.
  Example: `editMessageText` returns the edited message for a message in a chat, and `true` for an inline message.
- A second, optional argument takes `CallOptions`, which holds an abort signal.
- `BotApi` is an interface and `Args` a namespace of interfaces. You are able to use [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) to add new methods or arguments if we're falling behind.

### Files

The Bot API takes a file in [three ways](https://core.telegram.org/bots/api#sending-files): `file_id` for files already on Telegram's servers, a URL for Telegram to download it, or a file upload.
What an upload looks like depends on the code that sends it.

`BotApi` therefore takes the type of an upload as its parameter, and passes it to fields that can carry a file upload.

```ts
import type { BotApi, InputMediaPhoto } from "@telegraf/types";

interface LocalFile {
	path: string;
}

declare const api: BotApi<LocalFile>;

await api.sendDocument({ chat_id: 1, document: { path: "/tmp/file.txt" } });
const photo: InputMediaPhoto<LocalFile> = { type: "photo", media: { path: "/tmp/photo.png" } };
```

If you pass `never` as the parameter, uploads are not accepted; only strings.
The types that can carry a file take the same parameter, such as `InputMedia`, `InputSticker` and `InputRichMessage`.
All other types are not generic.

### Responses

The Bot API wraps every result in an object with an `ok` flag.
`ApiResponse` is that object: `ApiSuccess` with the result, or `ApiError` with a description.

### Deprecated

`ApiMethods`, `Opts` and `Ret` are the older way to reach the methods. They keep working until Telegraf's next major version.
They are less strict, and do not check arguments that depend on each other: each method takes one object, and every argument that's conditionally accepted is optional.

Use `BotApi`, `Args.<Method>` and `Awaited<ReturnType<BotApi<F>[M]>>` instead. They model the API's behaviour more accurately, restricting types based on the documentation. For instance, `editMessageText` can send text or rich text at a time, but not both (the deprecated types allow sending both at once).

## Compatibility

This package is versioned after the Bot API: 10.3.x of `@telegraf/types` types Bot API 10.3.

### Correctness

The Bot API documentation decides what a type is.
Whenever it states a rule in the text, such as "required if `inline_message_id` is not specified", our types enforce the rule if TypeScript can express it.
A rule that can only be enforced by breaking correct code usually waits for a breaking release.

A type that disagrees with the documentation is a bug.
It can be corrected in any release, patch, minor, or major.
Code that relied on the mistake will stop compiling, so the bug can be fixed in user code.

### Deprecations

- A renamed type keeps its old name as a deprecated alias.
  Example: `type PrivateGetChat = ChatFullInfo.PrivateChat`.
- A field the Bot API renames or removes is renamed or removed.
  The old field is not necessarily kept. This may cause new compile errors so users can fix their code, but runtime is unaffected.
- A deprecated name stays until the next breaking release (see below).

### Breaking changes

Breaking changes beyond the above correctness criteria are made only when Telegraf needs it in a new major version (example: v4 to v6).
It also waits for a new major version of the Bot API.
Removing a deprecated type or method is one such change.

Every other release adds to the types, follows a change in the Bot API, or corrects a type.

## Development

The sources are TypeScript, built with `tsc`.
[Bun](https://bun.sh) installs the dependencies and runs the scripts.

```bash
bun install
bun run dev     # format, lint and type-check
bun run test    # the type tests in test/
bun run build   # emit the declaration files
```

`types.ts` holds all the type declarations in the same order as the Bot API documentation.
The other files re-export from it, one per subpath, such as `@telegraf/types/message`.
This is for backwards compatibility, and will be broken when Telegraf and types release a new major version.
If you depend on this package directly, start using `@telegraf/types` directly now.

## Origin

The types are written by hand and checked against the Bot API documentation.

[Typegram](https://github.com/KnorpelSenf/typegram) was originally created by [@KnorpelSenf](https://github.com/KnorpelSenf), a former Telegraf contributor, and Telegraf depended on it.
Typegram was used as the starting point of grammY's [types](https://github.com/grammyjs/types) package.
`@telegraf/types` was forked from Typegram for Telegraf to maintain its own types independently.
It is now updated from the Bot API directly.
