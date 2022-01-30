import Database from "firebase/database";

export const getDatabase = () => {
  try {
    const db = Database.getDatabase();
    return db;
  } catch {
    return new Promise((res) => {
      res({});
    });
  }
};
export const ref = (...props) => {
  try {
    const result = Database.ref.apply(null, props);
    return result;
  } catch {
    return new Promise((res) => {
      res({});
    });
  }
};
export const set = (...props) => {
  try {
    const result = Database.set.apply(null, props);
    return result;
  } catch {
    return new Promise((res) => {
      res({});
    });
  }
};
export const get = (...props) => {
  try {
    const result = Database.get.apply(null, props);
    return result;
  } catch {
    return new Promise((res) => {
      res({});
    });
  }
};
export const update = (...props) => {
  try {
    const result = Database.update.apply(null, props);
    return result;
  } catch {
    return new Promise((res) => {
      res({});
    });
  }
};
export const remove = (...props) => {
  try {
    const result = Database.remove.apply(null, props);
    return result;
  } catch {
    return new Promise((res) => {
      res({});
    });
  }
};
