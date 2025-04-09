'use client';

import { Equivalents } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getEquivalentItems } from '@/api/equivalent';
import { useMutation } from '@tanstack/react-query';

type EquivalentItemsProps = {
  data: Equivalents;
};

export const EquivalentItems = ({ data }: EquivalentItemsProps) => {
  const mutation = useMutation({
    mutationFn: ({ c, gs }: { c: number; gs: string }) =>
      getEquivalentItems(c, gs),
  });

  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-4">
        {Object.entries(data).map(([key, items]) => (
          <Card key={key} className={` border-none shadow-sm`}>
            <Accordion type="single" collapsible>
              <AccordionItem value={key} className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium">{key}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="space-y-4"></CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
