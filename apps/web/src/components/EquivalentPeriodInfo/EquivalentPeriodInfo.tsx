import { Avatar, AvatarFallback, CardContent } from "@k-health/ui";
import { ChevronRight } from "lucide-react";
import { NUTRITIONAL_ABBREVIATIONS } from "@/lib/constants";
import type { EquivalentType } from "@/types";

type EquivalentPeriodInfoProps = {
  onOpen: (item: EquivalentType) => void;
  items: Array<EquivalentType>;
};

export const EquivalentPeriodInfo = ({ onOpen, items }: EquivalentPeriodInfoProps) => {
  return (
    <CardContent className="space-y-4">
      <div className="grid gap-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onOpen(item)}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/10 transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{item.request.c}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{`${NUTRITIONAL_ABBREVIATIONS[item.request.gs]}`}</p>
                <p className="text-sm text-muted-foreground">Click para ver equivalentes</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </CardContent>
  );
};
