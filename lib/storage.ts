interface SSHConnection {
  id: string;
  host: string;
  username: string;
  password: string;
  isFavorite: boolean;
  lastUsed?: Date;
}

export const storageKeys = {
  sshHistory: 'ssh-connection-history',
  sshFavorites: 'ssh-connection-favorites'
};

const isBrowser = typeof window !== 'undefined';

export const saveConnection = (connection: SSHConnection) => {
  if (!isBrowser) return;
  
  const history = getConnections();
  const existingIndex = history.findIndex(c => c.host === connection.host && c.username === connection.username);
  
  if (existingIndex >= 0) {
    history[existingIndex] = { ...connection, lastUsed: new Date() };
  } else {
    history.push({ ...connection, id: crypto.randomUUID(), lastUsed: new Date() });
  }
  
  localStorage.setItem(storageKeys.sshHistory, JSON.stringify(history));
};

export const getConnections = (): SSHConnection[] => {
  if (!isBrowser) return [];
  
  const history = localStorage.getItem(storageKeys.sshHistory);
  return history ? JSON.parse(history) : [];
};

export const toggleFavorite = (connectionId: string) => {
  if (!isBrowser) return;
  
  const history = getConnections();
  const connection = history.find(c => c.id === connectionId);
  if (connection) {
    connection.isFavorite = !connection.isFavorite;
    localStorage.setItem(storageKeys.sshHistory, JSON.stringify(history));
  }
};
