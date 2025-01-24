export type directGeoCodingType = {
    name: string;
    local_names?: { [k: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
  };