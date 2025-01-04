"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { Loader2 } from "lucide-react";
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
      // Create new version with AI response
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
    setInput(completion);
  }, [completion, setInput]);

  const handleRewrite = () => {
    handleSubmit();
  };

  const handleVersionSelect = (versionId: number) => {
    setCurrentVersionId(versionId);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Co-author Generator</h1>
      {isLoading && (
        <div className="flex justify-center items-center absolute top-4 left-4">
          <Loader2 className="animate-spin size-6" />
        </div>
      )}
      <form className="grid grid-cols-[1fr_300px] gap-6">
        {/* loading indicator */}
        {/* Main editing area */}
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <textarea
              className="w-full h-48 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Start writing your content here..."
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={handleRewrite} disabled={!input.trim() || isLoading}>
              {isLoading ? "Rewriting..." : "Rewrite with AI"}
            </Button>
          </div>
        </div>

        {/* Version history sidebar */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-4">Version History</h2>
          <div className="space-y-2">
            {versions.map((version) => (
              <button
                key={version.id}
                onClick={() => handleVersionSelect(version.id)}
                className={`w-full text-left p-2 rounded ${version.id === currentVersionId ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
              >
                <div className="font-medium">Version {version.id}</div>
                <div className="text-sm text-gray-500">{version.timestamp.toLocaleTimeString()}</div>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
