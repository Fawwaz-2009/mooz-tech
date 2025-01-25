import { Card } from '../ui/card';

export const MicroWrappersWrappers = ({ children, slug }: { children: React.ReactNode; slug: string }) => {
  return (
    <div className="pt-20">
      <Card className="mx-auto h-96 max-w-4xl">{children}</Card>
    </div>
  );
};
