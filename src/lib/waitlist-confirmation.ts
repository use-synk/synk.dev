import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_SEPARATOR = ".";
const ALGORITHM = "sha256";
const EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

type TokenPayload = {
	email: string;
	exp: number;
};

function base64UrlEncode(value: string): string {
	return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string): string | null {
	try {
		return Buffer.from(value, "base64url").toString("utf8");
	} catch {
		return null;
	}
}

export function createWaitlistConfirmationToken(
	email: string,
	secret: string,
): string {
	const payload: TokenPayload = {
		email,
		exp: Math.floor(Date.now() / 1000) + EXPIRATION_SECONDS,
	};
	const encodedPayload = base64UrlEncode(JSON.stringify(payload));
	const signature = createHmac(ALGORITHM, secret)
		.update(encodedPayload)
		.digest("base64url");

	return `${encodedPayload}${TOKEN_SEPARATOR}${signature}`;
}

export function verifyWaitlistConfirmationToken(
	token: string,
	secret: string,
): string | null {
	const parts = token.split(TOKEN_SEPARATOR);
	if (parts.length !== 2) return null;

	const [encodedPayload, signature] = parts;
	if (!encodedPayload || !signature) return null;

	const expectedSignature = createHmac(ALGORITHM, secret)
		.update(encodedPayload)
		.digest("base64url");

	if (
		signature.length !== expectedSignature.length ||
		!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
	) {
		return null;
	}

	const decodedPayload = base64UrlDecode(encodedPayload);
	if (!decodedPayload) return null;

	let payload: TokenPayload;
	try {
		payload = JSON.parse(decodedPayload) as TokenPayload;
	} catch {
		return null;
	}

	if (!payload?.email || typeof payload.email !== "string") return null;
	if (!payload?.exp || typeof payload.exp !== "number") return null;
	if (payload.exp < Math.floor(Date.now() / 1000)) return null;

	return payload.email;
}

export function getWaitlistConfirmationUrl(
	email: string,
	secret: string,
	baseUrl: string,
): string {
	const token = createWaitlistConfirmationToken(email, secret);
	return `${baseUrl}/waitlist/confirm?token=${encodeURIComponent(token)}`;
}
