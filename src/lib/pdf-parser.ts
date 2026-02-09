import { extractText } from "unpdf";

export async function extractTextFromPdf(fileUrl: string): Promise<string> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch PDF: ${response.status} ${response.statusText}`
        );
    }
    const arrayBuffer = await response.arrayBuffer();

    const { text } = await extractText(arrayBuffer);
    return Array.isArray(text) ? text.join("\n\n") : text;
}
