interface RDPConnection {
  id: string;
  host: string;
  username: string;
  password: string;
  port: string;
  isFavorite: boolean;
  lastUsed?: Date;
}

const isBrowser = typeof window !== 'undefined';

export const storageKeys = {
  rdpHistory: 'rdp-connection-history',
};

export const saveRDPConnection = (connection: RDPConnection) => {
  if (!isBrowser) return;
  
  const history = getRDPConnections();
  const existingIndex = history.findIndex(c => c.host === connection.host && c.username === connection.username);
  
  if (existingIndex >= 0) {
    history[existingIndex] = { ...connection, lastUsed: new Date() };
  } else {
    history.push({ ...connection, id: crypto.randomUUID(), lastUsed: new Date() });
  }
  
  localStorage.setItem(storageKeys.rdpHistory, JSON.stringify(history));
};

export const getRDPConnections = (): RDPConnection[] => {
  if (!isBrowser) return [];
  
  const history = localStorage.getItem(storageKeys.rdpHistory);
  return history ? JSON.parse(history) : [];
};

export const toggleRDPFavorite = (connectionId: string) => {
  if (!isBrowser) return;
  
  const history = getRDPConnections();
  const connection = history.find(c => c.id === connectionId);
  if (connection) {
    connection.isFavorite = !connection.isFavorite;
    localStorage.setItem(storageKeys.rdpHistory, JSON.stringify(history));
  }
};
