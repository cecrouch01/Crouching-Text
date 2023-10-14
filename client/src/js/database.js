import { openDB } from 'idb';

const initdb = async () =>
  openDB('crouching-text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('crouching-text')) {
        console.log('crouching-text database already exists');
        return;
      }
      db.createObjectStore('crouching-text', { keyPath: 'id', autoIncrement: true });
      console.log('crouching-text database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');
  const crouchingTextDb = await openDB('crouching-text', 1);
  const txt = crouchingTextDb.transaction('crouching-text', 'readwrite');
  const store = txt.objectStore('crouching-text');
  const request = store.put({ id: 1, value: content });
  const result = await request;
};

export const getDb = async () => {
  console.log('GET from the database');
  const crouchingTextDb = await openDB('crouching-text', 1);
  const txt = crouchingTextDb.transaction('crouching-text', 'readonly');
  const store = txt.objectStore('crouching-text');
  const request = store.get(1);
  const result = await request;
   return result?.value;
};

initdb();
