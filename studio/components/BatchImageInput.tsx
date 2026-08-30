import { useCallback, useRef, useState } from "react";
import { Button, Stack, Text } from "@sanity/ui";
import { insert, setIfMissing, useClient, type ArrayOfObjectsInputProps } from "sanity";

const BATCH_SIZE = 5;

function uniqueKey() {
  return Math.random().toString(36).slice(2, 12);
}

export default function BatchImageInput(props: ArrayOfObjectsInputProps) {
  const { onChange, renderDefault } = props;
  const client = useClient({ apiVersion: "2024-10-01" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      event.target.value = "";
      if (!files.length) return;

      setError(null);
      setProgress({ done: 0, total: files.length });
      onChange(setIfMissing([]));

      try {
        for (let start = 0; start < files.length; start += BATCH_SIZE) {
          const batch = files.slice(start, start + BATCH_SIZE);

          const assets = await Promise.all(
            batch.map((file) =>
              client.assets.upload("image", file, { filename: file.name })
            )
          );

          onChange(
            insert(
              assets.map((asset) => ({
                _type: "image",
                _key: uniqueKey(),
                asset: { _type: "reference", _ref: asset._id },
              })),
              "after",
              [-1]
            )
          );

          setProgress({ done: Math.min(start + BATCH_SIZE, files.length), total: files.length });
        }
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
      } finally {
        setProgress(null);
      }
    },
    [client, onChange]
  );

  return (
    <Stack gap={3}>
      {renderDefault(props)}

      <Stack gap={2}>
        <Button
          mode="ghost"
          tone="primary"
          text={progress ? `Uploading ${progress.done} / ${progress.total}…` : "Upload multiple images"}
          disabled={Boolean(progress)}
          onClick={() => fileInputRef.current?.click()}
        />

        {error && (
          <Text size={1} muted>
            {error}
          </Text>
        )}
      </Stack>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFiles}
      />
    </Stack>
  );
}
