import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: AdminSessionPayload) {
  return new SignJWT(
    payload as {
      adminId: string;
      email: string;
      expiresAt: Date;
    }
  )
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload }: { payload: AdminSessionPayload } = await jwtVerify(
      session,
      key,
      {
        algorithms: ["HS256"],
      }
    );

    return payload;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred during session decryption.");
    }
    return null;
  }
}
