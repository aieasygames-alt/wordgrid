export async function shareCompleteResult(text: string, copy: boolean, api: {
  share?: (data: { text: string }) => Promise<void>;
  clipboard?: { writeText: (text: string) => Promise<void> };
}) {
  const method = !copy && typeof api.share === "function" ? "share" : "clipboard";
  try {
    if (method === "share") await api.share!({ text });
    else if (api.clipboard) await api.clipboard.writeText(text);
    else throw new Error("Clipboard unavailable");
    return { success: true, method, message: method === "share" ? "Share sheet completed." : "Result copied. No answers included." };
  } catch (reason) {
    return { success: false, method, message: reason instanceof Error && reason.name === "AbortError" ? "Sharing cancelled." : "Sharing unavailable. Select and copy the preview below." };
  }
}
