"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { coAuthorSchema, type CoAuthorResponse } from "@/app/api/co-authors/schema";

interface Version {
  id: number;
  content: string;
  style?: string;
  changes?: string;
  timestamp: Date;
}

export default function CoAuthorsPage() {
  const [versions, setVersions] = useState<Version[]>([{ id: 1, content: "", timestamp: new Date() }]);
  const [input, setInput] = useState("");
  const [currentVersionId, setCurrentVersionId] = useState(1);
  const generatingVersionId = useRef<number | null>(null);

  const { object, isLoading, submit, error } = useObject<CoAuthorResponse>({
    api: "/api/co-authors/completion",
    schema: coAuthorSchema,
  });

  // Update current version's content as the stream comes in
  useEffect(() => {
    const content = object?.content;
    if (content && typeof content === "string" && generatingVersionId.current) {
      setVersions((prev) => prev.map((v) => (v.id === generatingVersionId.current ? { ...v, content } : v)));
      if (currentVersionId === generatingVersionId.current) {
        setInput(content);
      }
    }
  }, [object?.content, currentVersionId]);

  // Update input when switching versions
  useEffect(() => {
    const currentVersion = versions.find((v) => v.id === currentVersionId);
    if (currentVersion) {
      setInput(currentVersion.content);
    }
  }, [currentVersionId, versions]);

  const handleInputUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setInput(newContent);
    setVersions((prev) => prev.map((v) => (v.id === currentVersionId ? { ...v, content: newContent } : v)));
  };

  const handleRewrite = () => {
    // Create new version before submitting
    const newVersionId = versions.length + 1;
    const newVersion: Version = {
      id: newVersionId,
      content: input, // Start with current content
      timestamp: new Date(),
    };
    setVersions((prev) => [...prev, newVersion]);
    setCurrentVersionId(newVersionId);
    generatingVersionId.current = newVersionId;

    // Submit for AI processing
    submit({
      prompt: `
          ${input}
        `,
    });
  };

  const handleVersionSelect = (value: string) => {
    setCurrentVersionId(Number(value));
  };

  const currentVersion = versions.find((v) => v.id === currentVersionId);

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Co-author Generator</h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin size-4" />
            <span className="text-sm">Generating...</span>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Select value={currentVersionId.toString()} onValueChange={handleVersionSelect}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {versions.map((version) => (
                  <SelectItem key={version.id} value={version.id.toString()} className="flex flex-col items-start py-2">
                    <div className="font-medium">
                      Version {version.id} - {version.timestamp.toLocaleTimeString()}
                    </div>
                    {version.style && <div className="text-sm text-muted-foreground">{version.style}</div>}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleRewrite} disabled={!input.trim() || isLoading} className="min-w-32">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rewriting...
                </>
              ) : (
                "Generate Variations"
              )}
            </Button>
          </div>

          {currentVersion?.changes && (
            <div className="text-sm text-muted-foreground">
              <strong>Changes made:</strong> {currentVersion.changes}
            </div>
          )}

          {error && <div className="text-red-500">{error.message}</div>}

          <Textarea
            className="w-full min-h-[800px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Start writing your content here..."
            value={input}
            onChange={handleInputUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
