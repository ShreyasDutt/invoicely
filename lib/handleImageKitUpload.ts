import { upload, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError } from "@imagekit/next";
import { toast } from "sonner";
import { saveImage } from "@/app/actions/Image.action";
import { RefObject } from "react";

export const handleImagekitUpload = async (
  canvasUrl: string,
  setProgress: (progress: number) => void
) => {
  if (!canvasUrl) return;

  const abortController = new AbortController();

  try {
    // authentication params
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload auth failed: ${text}`);
    }

    const { signature, expire, token, publicKey } = await response.json();

    // Upload file
    const uploadResponse = await upload({
      file: canvasUrl,
      folder: "/Invox/signatures",
      fileName: `signature-${Date.now()}.png`,
      expire,
      token,
      signature,
      publicKey,
      onProgress: (e) => setProgress((e.loaded / e.total) * 100),
      abortSignal: abortController.signal,
    });

    // Save
    const res = await saveImage(uploadResponse.url || "", uploadResponse.fileId || "", "signature");
    if (res?.success) {
      setProgress(0);
      toast.success("Upload successfully");
    } else {
      toast.error("Upload failed");
    }
  } catch (error) {
    if (error instanceof ImageKitAbortError) console.error("Upload aborted:", error.reason);
    else if (error instanceof ImageKitInvalidRequestError) console.error("Invalid request:", error.message);
    else if (error instanceof ImageKitUploadNetworkError) console.error("Network error:", error.message);
    else if (error instanceof ImageKitServerError) console.error("Server error:", error.message);
    else console.error("Upload error:", error);
  }
};


export const handleSignatureFileUpload = async (fileInputRef:RefObject<HTMLInputElement>,setSigFileProgress: (progress: number) => void) => {
    
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }
      const abortController = new AbortController();
      const file = fileInput.files[0];

    try {
          // authentication params
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
            const text = await response.text();
            throw new Error(`Upload auth failed: ${text}`);
            }

            const { signature, expire, token, publicKey } = await response.json();

            // Upload file
            const uploadResponse = await upload({
            file,
            folder: "/Invox/Logos",
            fileName: `${file.name}-${Date.now()}.png`,
            expire,
            token,
            signature,
            publicKey,
            onProgress: (e) => setSigFileProgress((e.loaded / e.total) * 100),
            abortSignal: abortController.signal,
            });

            // Save
            const res = await saveImage(uploadResponse.url || "", uploadResponse.fileId || "", "signature");
            if (res?.success) {
            setSigFileProgress(0);
            toast.success("Upload successfully");
            } else {
            toast.error("Upload failed");
            }
        } catch (error) {
            if (error instanceof ImageKitAbortError) console.error("Upload aborted:", error.reason);
            else if (error instanceof ImageKitInvalidRequestError) console.error("Invalid request:", error.message);
            else if (error instanceof ImageKitUploadNetworkError) console.error("Network error:", error.message);
            else if (error instanceof ImageKitServerError) console.error("Server error:", error.message);
            else console.error("Upload error:", error);
        }
}