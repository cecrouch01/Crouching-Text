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
  //This opens the database
  const crouchingTextDb = await openDB('crouching-text', 1);
  //Because transaction is set to readwrite, it all for reading/modifying/deleting data from the object stores.
  const txt = crouchingTextDb.transaction('crouching-text', 'readwrite');
  const store = txt.objectStore('crouching-text');
  //Stores information into the database
  const request = store.put({ id: 1, value: content });
  await request;
};

export const getDb = async () => {
  console.log('GET from the database');
   //This opens the database
  const crouchingTextDb = await openDB('crouching-text', 1);
  //This transaction is only allowed to read datat because of "readonly"
  const txt = crouchingTextDb.transaction('crouching-text', 'readonly');
  const store = txt.objectStore('crouching-text');
  //This views information in the database
  const request = store.get(1);
  const result = await request;
   return result?.value;
};

initdb();
