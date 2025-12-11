"use client";

import { Badge, Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@k-health/ui";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import type { MenuPlanDayItem } from "@/types";

import { EquivalentItems } from "../EquivalentItems/EquivalentItems";
import { MenuPlanDay } from "../MenuPlanDay";

type MenuPlanProps = {
  menus: Record<string, Array<MenuPlanDayItem>>;
};

export const MenuPlan = ({ menus }: MenuPlanProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuPlanDayItem | null>(null);

  const formatMonthName = (monthKey: string) => {
    const months = {
      "01": "Enero",
      "02": "Febrero",
      "03": "Marzo",
      "04": "Abril",
      "05": "Mayo",
      "06": "Junio",
      "07": "Julio",
      "08": "Agosto",
      "09": "Septiembre",
      "10": "Octubre",
      "11": "Noviembre",
      "12": "Diciembre"
    };
    return months[monthKey as keyof typeof months] || monthKey;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setSelectedMenu(null); // Reset menu selection
  };

  const handleMenuSelect = (menu: MenuPlanDayItem) => {
    setSelectedMenu(menu);
  };

  const handleBackToMonths = () => {
    setSelectedMonth(null);
    setSelectedMenu(null);
  };

  const renderMonthSelector = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Selecciona un mes</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(menus)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([month, menuItems]) => (
            <Card
              key={month}
              className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => handleMonthSelect(month)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{formatMonthName(month)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {menuItems.length} menús disponibles
                  </p>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary">{menuItems.length}</Badge>
                  <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );

  const renderMenuSelector = () => (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-base sm:text-lg text-muted-foreground mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToMonths}
          className="p-0 h-auto hover:text-primary text-base sm:text-lg"
        >
          Meses
        </Button>
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-medium text-foreground text-base sm:text-lg">
          {formatMonthName(selectedMonth!)}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Menús de {formatMonthName(selectedMonth!)}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus[selectedMonth!].map((menu) => (
          <Card
            key={menu.date}
            className={`p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
              selectedMenu?.date === menu.date
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleMenuSelect(menu)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{formatDate(menu.date)}</h3>
                <p className="text-sm text-muted-foreground">
                  {menu.periods.length} períodos de comida
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMenuContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-base sm:text-lg text-muted-foreground mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToMonths}
          className="p-0 h-auto hover:text-primary text-base sm:text-lg"
        >
          Meses
        </Button>
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedMenu(null)}
          className="p-0 h-auto hover:text-primary text-base sm:text-lg"
        >
          {formatMonthName(selectedMonth!)}
        </Button>
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-medium text-foreground text-base sm:text-lg">
          {formatDate(selectedMenu!.date)}
        </span>
      </div>

      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="menu">Menú</TabsTrigger>
          <TabsTrigger value="equivalent">Equivalentes</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <MenuPlanDay data={selectedMenu!} />
        </TabsContent>
        <TabsContent value="equivalent">
          <EquivalentItems
            data={selectedMenu!.equivalents}
            equivalentTable={selectedMenu!.equivalentTable}
          />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <section className="w-full">
      {!selectedMonth && renderMonthSelector()}
      {selectedMonth && !selectedMenu && renderMenuSelector()}
      {selectedMonth && selectedMenu && renderMenuContent()}
    </section>
  );
};
