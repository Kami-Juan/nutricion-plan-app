'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { Apple } from 'lucide-react';

import { getEquivalentItems } from '@/api/equivalent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

import { EquivalentIngredients } from './EquivalentIngredients';

type EquivalentDialogProps = {
  equivalentData: {
    title: string;
    c: number;
    gs: string;
  } | null;
} & React.ComponentProps<typeof DialogPrimitive.Root>;

export const EquivalentDialog = ({
  equivalentData,
  ...props
}: EquivalentDialogProps) => {
  const { data, isLoading } = useQuery({
    enabled: !!equivalentData,
    queryKey: ['equivalentData', equivalentData?.c, equivalentData?.gs],
    queryFn: () => getEquivalentItems(equivalentData!.c, equivalentData!.gs),
  });

  const renderSkeletons = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[160px]" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );

  return (
    <Dialog {...props}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-primary" />
            Equivalentes para {equivalentData?.title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Alimentos que puedes reemplazar</DialogDescription>
        <ScrollArea className="h-[400px] [&>div]:!scrollbar-none">
          {isLoading ? (
            <div className="p-4">{renderSkeletons()}</div>
          ) : (
            <div className="grid gap-3">
              <EquivalentIngredients ingredients={data ?? []} />
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
