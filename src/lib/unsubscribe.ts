import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_SEPARATOR = ".";
const ALGORITHM = "sha256";

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

export function createUnsubscribeToken(email: string, secret: string): string {
	const payload = base64UrlEncode(email);
	const signature = createHmac(ALGORITHM, secret)
		.update(payload)
		.digest("base64url");
	return `${payload}${TOKEN_SEPARATOR}${signature}`;
}

export function verifyUnsubscribeToken(
	token: string,
	secret: string,
): string | null {
	const parts = token.split(TOKEN_SEPARATOR);
	if (parts.length !== 2) return null;

	const [payload, signature] = parts;
	if (!payload || !signature) return null;

	const email = base64UrlDecode(payload);
	if (!email) return null;

	const expectedSignature = createHmac(ALGORITHM, secret)
		.update(payload)
		.digest("base64url");

	if (
		signature.length !== expectedSignature.length ||
		!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
	) {
		return null;
	}

	return email;
}

export function getUnsubscribeUrl(
	email: string,
	secret: string,
	baseUrl: string,
): string {
	const token = createUnsubscribeToken(email, secret);
	return `${baseUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
}
