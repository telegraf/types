import type {
	Invoice,
	LabeledPrice,
	OrderInfo,
	PreCheckoutQuery,
	ShippingAddress,
	ShippingOption,
	ShippingQuery,
	SuccessfulPayment,
} from "../payment.ts";
import type { Assert, Equal, Extends, RequiredKeys } from "./assert.ts";

// Values

export const price: LabeledPrice = { label: "Coffee beans, 1 kg", amount: 2450 };

export const invoice: Invoice = {
	title: "Coffee beans",
	description: "Single origin, medium roast",
	start_parameter: "beans",
	currency: "EUR",
	total_amount: 2450,
};

export const address: ShippingAddress = {
	country_code: "DE",
	state: "",
	city: "Berlin",
	street_line1: "Unter den Linden 1",
	street_line2: "",
	post_code: "10117",
};

export const orderInfo: OrderInfo = {
	name: "Erika Mustermann",
	phone_number: "+4930123456",
	email: "erika@example.com",
	shipping_address: address,
};

export const emptyOrderInfo: OrderInfo = {};

export const shippingOption: ShippingOption = {
	id: "dhl",
	title: "DHL",
	prices: [{ label: "Shipping", amount: 499 }],
};

export const successfulPayment: SuccessfulPayment = {
	currency: "EUR",
	total_amount: 2949,
	invoice_payload: "order-1842",
	shipping_option_id: "dhl",
	order_info: orderInfo,
	telegram_payment_charge_id: "tg_charge_1",
	provider_payment_charge_id: "provider_charge_1",
};

export const shippingQuery: ShippingQuery = {
	id: "8329742398",
	from: { id: 123456789, is_bot: false, first_name: "Erika", language_code: "de" },
	invoice_payload: "order-1842",
	shipping_address: address,
};

export const preCheckoutQuery: PreCheckoutQuery = {
	id: "8329742399",
	from: { id: 123456789, is_bot: false, first_name: "Erika" },
	currency: "EUR",
	total_amount: 2949,
	invoice_payload: "order-1842",
	shipping_option_id: "dhl",
	order_info: orderInfo,
};

// Reading

export function totalInCents(query: PreCheckoutQuery) {
	return query.total_amount;
}

export type TotalInCentsResult = Assert<Equal<ReturnType<typeof totalInCents>, number>>;

export function shippingCity(query: ShippingQuery) {
	return query.shipping_address.city;
}

export type ShippingCityResult = Assert<Equal<ReturnType<typeof shippingCity>, string>>;

export function customerEmail(payment: SuccessfulPayment) {
	return payment.order_info?.email;
}

export type CustomerEmailResult = Assert<Equal<ReturnType<typeof customerEmail>, string | undefined>>;

export type PaymentFields = Assert<
	Equal<
		[
			LabeledPrice["amount"],
			Invoice["start_parameter"],
			ShippingAddress["street_line2"],
			OrderInfo["shipping_address"],
			ShippingOption["prices"],
			SuccessfulPayment["telegram_payment_charge_id"],
			SuccessfulPayment["shipping_option_id"],
			ShippingQuery["invoice_payload"],
			PreCheckoutQuery["currency"],
			PreCheckoutQuery["from"]["id"],
		],
		[
			number,
			string,
			string,
			ShippingAddress | undefined,
			LabeledPrice[],
			string,
			string | undefined,
			string,
			string,
			number,
		]
	>
>;

// Rejections

// @ts-expect-error — a price needs a label
export const priceWithoutLabel: LabeledPrice = { amount: 100 };

// @ts-expect-error — amounts are integers in the smallest currency unit, not strings
export const priceAsString: LabeledPrice = { label: "Coffee", amount: "24.50" };

// @ts-expect-error — a shipping option needs its prices
export const optionWithoutPrices: ShippingOption = { id: "dhl", title: "DHL" };

// Required fields

export type InvoiceRequiredFields = Assert<
	Extends<"currency" | "description" | "start_parameter" | "title" | "total_amount", RequiredKeys<Invoice>>
>;
export type LabeledPriceRequiredFields = Assert<Extends<"amount" | "label", RequiredKeys<LabeledPrice>>>;
export type PreCheckoutQueryRequiredFields = Assert<
	Extends<"currency" | "from" | "id" | "invoice_payload" | "total_amount", RequiredKeys<PreCheckoutQuery>>
>;
export type ShippingAddressRequiredFields = Assert<
	Extends<
		"city" | "country_code" | "post_code" | "state" | "street_line1" | "street_line2",
		RequiredKeys<ShippingAddress>
	>
>;
export type ShippingOptionRequiredFields = Assert<Extends<"id" | "prices" | "title", RequiredKeys<ShippingOption>>>;
export type ShippingQueryRequiredFields = Assert<
	Extends<"from" | "id" | "invoice_payload" | "shipping_address", RequiredKeys<ShippingQuery>>
>;
export type SuccessfulPaymentRequiredFields = Assert<
	Extends<
		"currency" | "invoice_payload" | "provider_payment_charge_id" | "telegram_payment_charge_id" | "total_amount",
		RequiredKeys<SuccessfulPayment>
	>
>;
