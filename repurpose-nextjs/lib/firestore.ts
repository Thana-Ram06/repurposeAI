import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface GenerationRecord {
  id: string;
  userId: string;
  input: string;
  tone: string;
  output: {
    tweets: string[];
    linkedin: string;
    blog: string;
    hooks: string[];
    captions: string[];
  };
  createdAt: Date;
}

export async function saveGeneration(
  userId: string,
  input: string,
  tone: string,
  output: GenerationRecord["output"]
): Promise<string> {
  const docRef = await addDoc(collection(db, "generations"), {
    userId,
    input,
    tone,
    output,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserGenerations(userId: string): Promise<GenerationRecord[]> {
  const q = query(
    collection(db, "generations"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      input: data.input,
      tone: data.tone,
      output: data.output,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
    };
  });
}
