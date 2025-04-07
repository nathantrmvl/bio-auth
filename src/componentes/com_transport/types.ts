export type Coordinates = {
    latitude: number;
    longitude: number;
  };
  
  export type Route = {
    id: string;
    name: string;
    points: Coordinates[];
    isActive: boolean;
    distance?: number;
    timeEstimate?: number;
  };
  
  export type TrafficLevel = 'low' | 'medium' | 'high';
  export type TransportUserType = 'empleado' | 'autobus' | 'admin';