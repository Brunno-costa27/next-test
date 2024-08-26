export interface ListDataItem {
    type: 'success' | 'warning' | 'error' | 'info'; // ou qualquer outro status que você precise
    content: string;
  }