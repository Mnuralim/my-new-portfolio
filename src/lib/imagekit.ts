import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

async function getFileIdFromUrl(fileUrl: string): Promise<string | null> {
  const urlParts = fileUrl.split("/");
  const filename = urlParts[urlParts.length - 1];

  const files = await imagekit.listFiles({
    searchQuery: `name="${filename}"`,
  });

  if (files.length === 0) {
    return null;
  }

  const file = files[0];
  if ("fileId" in file) {
    return file.fileId;
  }

  return null;
}

export async function deleteImageKitByUrl(url: string): Promise<void> {
  const fileId = await getFileIdFromUrl(url);
  if (!fileId) return;
  await imagekit.deleteFile(fileId);
}
