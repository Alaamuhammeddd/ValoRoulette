export interface Agent {
  name: string;
  image: string;
}

export interface Slice {
  color: string;
  text: string;
  role: string;
  agents?: Agent[];
}
