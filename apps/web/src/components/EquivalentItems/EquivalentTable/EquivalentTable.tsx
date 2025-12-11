import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@k-health/ui";
import { Scale } from "lucide-react";
import type { EquivalentTableItem } from "@/types";

type EquivalentTableProps = {
  equivalentTable: Array<EquivalentTableItem>;
};

export const EquivalentTable = ({ equivalentTable }: EquivalentTableProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="equivalent-table" className="border-none">
        <AccordionTrigger className="px-8 py-6 hover:no-underline group w-full">
          <div className="flex items-center gap-4 w-full">
            <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col items-start flex-1">
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Tabla de Equivalencias
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                Consulta los valores nutricionales
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-8 pb-6">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-primary font-semibold">Tipo</TableHead>
                  <TableHead className="text-primary font-semibold">Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equivalentTable.map((item, index) => (
                  <TableRow key={index} className="hover:bg-primary/5">
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell>{item.portion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
