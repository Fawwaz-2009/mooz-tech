"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Version {
  id: number;
  content: string;
  timestamp: Date;
}

export default function CoAuthorsPage() {
  const [versions, setVersions] = useState<Version[]>([{ id: 1, content: "", timestamp: new Date() }]);
  const [currentVersionId, setCurrentVersionId] = useState(1);

  const { completion, isLoading, input, handleInputChange, handleSubmit, setInput } = useCompletion({
    api: "/api/co-authors/completion",
    onFinish: (prompt, completion) => {
      const newVersion: Version = {
        id: versions.length + 1,
        content: completion,
        timestamp: new Date(),
      };

      setVersions((prev) => [...prev, newVersion]);
      setCurrentVersionId(newVersion.id);
    },
  });

  useEffect(() => {
    const currentVersion = versions.find((v) => v.id === currentVersionId);
    if (currentVersion) {
      setInput(currentVersion.content);
    }
  }, [currentVersionId, versions, setInput]);

  const handleInputUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setVersions((prev) => prev.map((v) => (v.id === currentVersionId ? { ...v, content: e.target.value } : v)));
  };

  useEffect(() => {
    setInput(completion);
  }, [completion, setInput]);

  const handleRewrite = () => {
    handleSubmit();
  };

  const handleVersionSelect = (value: string) => {
    setCurrentVersionId(Number(value));
  };

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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {versions.map((version) => (
                  <SelectItem key={version.id} value={version.id.toString()}>
                    Version {version.id} - {version.timestamp.toLocaleTimeString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleRewrite} 
              disabled={!input.trim() || isLoading}
              className="min-w-32"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rewriting...
                </>
              ) : (
                "Rewrite with AI"
              )}
            </Button>
          </div>

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
