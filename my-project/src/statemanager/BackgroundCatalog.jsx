import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { useDispatch } from "react-redux";
import { setAllUsers } from "./slices/DatabaseSlice";

const BackgroundCatalog = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const AllUsersCollectionRef = collection(db, `users_db`);

    const q = query(AllUsersCollectionRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      dispatch(setAllUsers(items));
    });
    return () => {
      alldata();
    };
  }, []);

  return <div> {children}</div>;
};

export default BackgroundCatalog;
