export interface ApiResponse {
    current_page: number;
    data: any;
    first_page_url: string;
    from: number;
    last_page: number,
    last_page_url: string,
    links: Links[],
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
 }

 export interface Links {
  url: string | null;
  label: string;
  active: boolean;
 }
