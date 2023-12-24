"use client";
import React, { useEffect, useState } from "react";
import RankPlayer from "../molecules/RankPlayer";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { GameUser } from "@/types/primary";

function Ranking() {
  const [users, setUsers] = useState<GameUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "users"), orderBy("highscore", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newUsers: GameUser[] = [];
      querySnapshot.forEach((doc) => {
        newUsers.push(doc.data() as GameUser);
      });
      setUsers(newUsers);
      setLoading(false);
    });

    // クリーンアップ↓
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-h-[30.1rem] min-w-full">
      <div className="bg-first text-black">ランキング</div>
      {loading && (
        <div
          className="flex justify-center h-screen pt-4"
          aria-label="読み込み中"
        >
          <div className="animate-spin h-16 w-16 border-[0.45rem] border-first rounded-full border-t-transparent"></div>
        </div>
      )}
      {users
        .filter((user) => user.highscore !== 0)
        .map((user, index) => (
          <RankPlayer user={user} index={index} key={user.uid} />
        ))}
    </div>
  );
}

export default Ranking;
