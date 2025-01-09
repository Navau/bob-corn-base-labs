export interface Item {
  id: number;
  title: string;
  description: string;
}

export interface ItemListProps {
  items: Item[];
}

export interface SuccessListProps {
  items: string[];
}

export interface SuccessCardProps {
  message: string;
}

export interface ICornEntity {
  id: number;
  clientId: string;
  timestamp: string;
}
