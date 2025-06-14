export interface PlanTypes {
  _id: string;
  buyer: string[];
  title: string;
  price: number;
  access: "Book-Access" | "Generate-Access";
  hakAccess: string;
  isAccess: boolean;
  isActive?: boolean;
  durationDays: number;
  start?: Date;
  expired?: Date;
}

export const getPlans = async (): Promise<PlanTypes[]> => {
  return [
    {
      _id: "1",
      buyer: [],
      title: "Explorer",
      price: 0,
      access: "Book-Access",
      hakAccess: "Trial 1 Days",
      isAccess: true,
      isActive: true,
      durationDays: 1,
      start: new Date(),
      expired: new Date(),
    },
    {
      _id: "2",
      buyer: [],
      title: "Immersed",
      price: 0.99,
      access: "Book-Access",
      hakAccess: "Trial 7 Days",
      isAccess: true,
      isActive: true,
      durationDays: 7,
      start: new Date(),
      expired: new Date(),
    },
    {
      _id: "3",
      buyer: [],
      title: "Loyal",
      price: 2.99,
      access: "Book-Access",
      hakAccess: "Trial 1 Month",
      isAccess: true,
      isActive: true,
      durationDays: 30,
      start: new Date(),
      expired: new Date(),
    },
    {
      _id: "4",
      buyer: [],
      title: "Writer",
      price: 9.99,
      access: "Generate-Access",
      hakAccess: "Copyright Protection",
      isAccess: true,
      isActive: true,
      durationDays: 0,
      start: new Date(),
      expired: new Date(),
    },
  ];
};
