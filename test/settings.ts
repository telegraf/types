import type {
	BotCommandScope,
	BotCommandScopeAllChatAdministrators,
	BotCommandScopeAllGroupChats,
	BotCommandScopeAllPrivateChats,
	BotCommandScopeChat,
	BotCommandScopeChatAdministrators,
	BotCommandScopeChatMember,
	BotCommandScopeDefault,
	BotDescription,
	BotName,
	BotShortDescription,
	MenuButton,
	MenuButtonCommands,
	MenuButtonDefault,
	MenuButtonWebApp,
} from "../settings.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Values

export const botName: BotName = { name: "Weather Bot" };

export const botDescription: BotDescription = { description: "Sends the forecast for any city." };

export const botShortDescription: BotShortDescription = { short_description: "Forecasts" };

export const menuCommands: MenuButtonCommands = { type: "commands" };

export const menuWebApp: MenuButtonWebApp = {
	type: "web_app",
	text: "Open map",
	web_app: { url: "https://example.com/map" },
};

export const menuDefault: MenuButtonDefault = { type: "default" };

export const menuButtons: MenuButton[] = [menuCommands, menuWebApp, menuDefault];

export const scopeDefault: BotCommandScopeDefault = { type: "default" };

export const scopeAllPrivateChats: BotCommandScopeAllPrivateChats = { type: "all_private_chats" };

export const scopeAllGroupChats: BotCommandScopeAllGroupChats = { type: "all_group_chats" };

export const scopeAllChatAdministrators: BotCommandScopeAllChatAdministrators = { type: "all_chat_administrators" };

export const scopeChat: BotCommandScopeChat = { type: "chat", chat_id: "@weather_group" };

export const scopeChatAdministrators: BotCommandScopeChatAdministrators = {
	type: "chat_administrators",
	chat_id: -1001234567890,
};

export const scopeChatMember: BotCommandScopeChatMember = {
	type: "chat_member",
	chat_id: -1001234567890,
	user_id: 777000,
};

export const scopes: BotCommandScope[] = [
	scopeDefault,
	scopeAllPrivateChats,
	scopeAllGroupChats,
	scopeAllChatAdministrators,
	scopeChat,
	scopeChatAdministrators,
	scopeChatMember,
];

// Reading

export type MenuButtonType = Assert<Equal<MenuButton["type"], "commands" | "web_app" | "default">>;

export type BotCommandScopeType = Assert<
	Equal<
		BotCommandScope["type"],
		| "default"
		| "all_private_chats"
		| "all_group_chats"
		| "all_chat_administrators"
		| "chat"
		| "chat_administrators"
		| "chat_member"
	>
>;

export function webAppUrl(button: MenuButton) {
	if (button.type === "web_app") return button;
	return undefined;
}

export type WebAppUrlNarrowing = Assert<Equal<ReturnType<typeof webAppUrl>, MenuButtonWebApp | undefined>>;

export function scopeChatId(scope: BotCommandScope) {
	switch (scope.type) {
		case "chat":
		case "chat_administrators":
		case "chat_member":
			return scope.chat_id;
		default:
			return undefined;
	}
}

export type ScopeChatIdNarrowing = Assert<Equal<ReturnType<typeof scopeChatId>, number | string | undefined>>;

export function scopeUserId(scope: BotCommandScope) {
	if (scope.type === "chat_member") return scope;
	return undefined;
}

export type ScopeUserIdNarrowing = Assert<Equal<ReturnType<typeof scopeUserId>, BotCommandScopeChatMember | undefined>>;

export type SettingsFields = Assert<
	Equal<
		[
			BotName["name"],
			BotDescription["description"],
			BotShortDescription["short_description"],
			MenuButtonWebApp["text"],
			MenuButtonWebApp["web_app"]["url"],
			BotCommandScopeChatMember["user_id"],
		],
		[string, string, string, string, string, number]
	>
>;

// Rejections

// @ts-expect-error — "private_chats" is not a scope type
export const unknownScope: BotCommandScope = { type: "private_chats" };

// @ts-expect-error — a chat_member scope needs user_id
export const scopeChatMemberWithoutUser: BotCommandScopeChatMember = { type: "chat_member", chat_id: 1 };

export const commandsWithText: MenuButton = {
	type: "commands",
	// @ts-expect-error — only the web_app menu button has text
	text: "Commands",
};

// @ts-expect-error — a web_app menu button needs web_app
export const webAppWithoutApp: MenuButtonWebApp = { type: "web_app", text: "Open" };

// Required fields

export type BotCommandScopeAllChatAdministratorsRequiredFields = Assert<
	Extends<"type", RequiredKeys<BotCommandScopeAllChatAdministrators>>
>;
export type BotCommandScopeAllGroupChatsRequiredFields = Assert<
	Extends<"type", RequiredKeys<BotCommandScopeAllGroupChats>>
>;
export type BotCommandScopeAllPrivateChatsRequiredFields = Assert<
	Extends<"type", RequiredKeys<BotCommandScopeAllPrivateChats>>
>;
export type BotCommandScopeChatRequiredFields = Assert<Extends<"chat_id" | "type", RequiredKeys<BotCommandScopeChat>>>;
export type BotCommandScopeChatAdministratorsRequiredFields = Assert<
	Extends<"chat_id" | "type", RequiredKeys<BotCommandScopeChatAdministrators>>
>;
export type BotCommandScopeChatMemberRequiredFields = Assert<
	Extends<"chat_id" | "type" | "user_id", RequiredKeys<BotCommandScopeChatMember>>
>;
export type BotCommandScopeDefaultRequiredFields = Assert<Extends<"type", RequiredKeys<BotCommandScopeDefault>>>;
export type BotDescriptionRequiredFields = Assert<Extends<"description", RequiredKeys<BotDescription>>>;
export type BotNameRequiredFields = Assert<Extends<"name", RequiredKeys<BotName>>>;
export type BotShortDescriptionRequiredFields = Assert<Extends<"short_description", RequiredKeys<BotShortDescription>>>;
export type MenuButtonCommandsRequiredFields = Assert<Extends<"type", RequiredKeys<MenuButtonCommands>>>;
export type MenuButtonDefaultRequiredFields = Assert<Extends<"type", RequiredKeys<MenuButtonDefault>>>;
export type MenuButtonWebAppRequiredFields = Assert<
	Extends<"text" | "type" | "web_app", RequiredKeys<MenuButtonWebApp>>
>;
