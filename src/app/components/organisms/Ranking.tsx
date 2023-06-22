"use client";
import React, { useEffect, useState } from "react";
import RankPlayer from "../molecules/RankPlayer";
import {
  DocumentData,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { GameUser } from "@/app/types/primary";

function Ranking() {
  const [users, setUsers] = useState<GameUser[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const q = query(
      collection(db, "users"),
      orderBy("highscore", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newUsers: GameUser[] = [];
      querySnapshot.forEach((doc) => {
        newUsers.push(doc.data() as GameUser);
      });
      setUsers(newUsers);
    });

    // クリーンアップ↓
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-h-[30.1rem] min-w-full">
      <div className="bg-first text-black">ランキング</div>
      {users.map((user, index) => (
        <RankPlayer user={user} index={index} key={user.uid} />
      ))}
    </div>
  );
}

export default Ranking;
