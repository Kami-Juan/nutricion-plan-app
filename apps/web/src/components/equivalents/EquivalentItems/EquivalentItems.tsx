"use client";

import { Card } from "@k-health/ui";
import { useMutation } from "@tanstack/react-query";
import { Scale } from "lucide-react";
import { useState } from "react";
import { getEquivalentItems } from "@/api/equivalent";
import type { Equivalents, EquivalentTableItem } from "@/types";

import { EquivalentDialog } from "../EquivalentDialog";
import { EquivalentPeriodInfo } from "../EquivalentPeriodInfo";

import { EquivalentTable } from "./EquivalentTable/EquivalentTable";

type EquivalentItemsProps = {
  data: Equivalents;
  equivalentTable: Array<EquivalentTableItem>;
};

export const EquivalentItems = ({ data, equivalentTable }: EquivalentItemsProps) => {
  const [selectedEquivalent, setSelectedEquivalent] = useState<{
    title: string;
    c: number;
    gs: string;
  } | null>(null);

  const mutation = useMutation({
    mutationFn: ({ c, gs }: { c: number; gs: string }) => getEquivalentItems(c, gs)
  });

  const handleEquivalentClick = async (c: number, gs: string, title: string) => {
    setSelectedEquivalent({ title, c, gs });
    await mutation.mutateAsync({ c, gs });
  };

  return (
    <>
      <div className="space-y-4 mt-2">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg mb-4">
          <EquivalentTable equivalentTable={equivalentTable} />
        </div>
        {Object.entries(data).map(([period, items]) => (
          <Card
            key={period}
            className="border shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="px-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Scale className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">{period}</span>
                  <span className="text-sm text-muted-foreground">
                    {items.length} equivalentes disponibles
                  </span>
                </div>
              </div>
              <EquivalentPeriodInfo
                items={items}
                onOpen={(item) => handleEquivalentClick(item.request.c, item.request.gs, period)}
              />
            </div>
          </Card>
        ))}
      </div>
      <EquivalentDialog
        open={!!selectedEquivalent}
        onOpenChange={() => setSelectedEquivalent(null)}
        equivalentData={selectedEquivalent}
      />
    </>
  );
};
