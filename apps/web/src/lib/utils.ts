export const getSpainDate = (date: string) => {
  return new Date(date.replace(/-/g, "/")).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};
