import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function WritingsHeader() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
      <p className="text-lg text-muted-foreground">I write about web development, design, and building products.</p>
    </div>
  );
}
