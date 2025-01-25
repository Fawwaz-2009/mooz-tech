'use client';

import {
  SandboxCodeEditor,
  SandboxConsole,
  SandboxLayout,
  SandboxFileExplorer,
  SandboxPreview,
  SandboxProvider,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '@/components/ui/kibo-ui/sandbox';
import { CodeIcon, AppWindowIcon, TerminalIcon } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const LiveCode = ({ code, tabs }: { code: string; tabs: ('code' | 'preview' | 'console')[] }) => (
  <div className="h-full w-full">
    <SandboxProvider
      template="react"
      files={{
        '/App.js': `${code}`,
      }}
    >
      <SandboxLayout>
        <SandboxTabs defaultValue="preview">
          <SandboxTabsList>
            {tabs.includes('code') && (
              <SandboxTabsTrigger value="code">
                <CodeIcon size={14} />
                Code
              </SandboxTabsTrigger>
            )}
            {tabs.includes('preview') && (
              <SandboxTabsTrigger value="preview">
                <AppWindowIcon size={14} />
                Preview
              </SandboxTabsTrigger>
            )}
            {tabs.includes('console') && (
              <SandboxTabsTrigger value="console">
                <TerminalIcon size={14} />
                Console
              </SandboxTabsTrigger>
            )}
          </SandboxTabsList>
          {tabs.includes('code') && (
            <SandboxTabsContent value="code" className="overflow-hidden">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="overflow-y-auto">
                  <SandboxFileExplorer />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="overflow-y-auto">
                  <SandboxCodeEditor />
                </ResizablePanel>
              </ResizablePanelGroup>
            </SandboxTabsContent>
          )}
          {tabs.includes('preview') && (
            <SandboxTabsContent value="preview">
              <SandboxPreview showOpenInCodeSandbox={false} showRefreshButton={false} />
            </SandboxTabsContent>
          )}
          {tabs.includes('console') && (
            <SandboxTabsContent value="console">
              <SandboxConsole />
            </SandboxTabsContent>
          )}
        </SandboxTabs>
      </SandboxLayout>
    </SandboxProvider>
  </div>
);

export default LiveCode;
