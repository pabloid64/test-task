import { AcctPos } from "../config/acctpos.json";
import { Acct } from "../config/acct.json";
import { OpEntry } from "../config/opentry.json";
import { OpDate } from "../config/opdate.json";

const apiAcctPos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AcctPos);
    }, 500);
  });
};

const apiOpEntry = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(OpEntry);
    }, 500);
  });
};

const apiOpDate = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(OpDate);
    }, 500);
  });
};

const apiAcct = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Acct);
    }, 500);
  });
};

const api = {
  apiAcctPos,
  apiOpEntry,
  apiOpDate,
  apiAcct,
};

export default api;
