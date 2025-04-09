'use client';

import { Equivalents, EquivalentType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, ChevronDown, Apple, Coffee, Moon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type EquivalentItemsProps = {
  data: Equivalents;
};

export const EquivalentItems = ({ data }: EquivalentItemsProps) => {
  const renderEquivalentItem = (item: EquivalentType) => (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/5 transition-colors">
      <div className="flex flex-col">
        <span className="font-medium">{item.title}</span>
        <span className="text-sm text-muted-foreground">
          {item.typeDescription}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-primary/5">
          {item.amount}
        </Badge>
        <Badge variant="secondary">
          {item.portion} porción{item.portion !== 1 ? 'es' : ''}
        </Badge>
      </div>
    </div>
  );

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
                  <CardContent className="space-y-4">Hello world</CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
