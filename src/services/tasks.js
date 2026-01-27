import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion,
  serverTimestamp
} from "firebase/firestore";

export const createTask = async (task) => {
  await addDoc(collection(db, "tasks"), task);
};

export const assignTask = async (taskId, userId) => {
  const ref = doc(db, "tasks", taskId);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (snap.data().assignedTo === null) {
      tx.update(ref, {
        assignedTo: userId,
        status: "in_progress"
      });
    } else {
      throw new Error("Already assigned");
    }
  });
};

export async function requestTask(taskId, user) {
  const ref = doc(db, "tasks", taskId);

  await updateDoc(ref, {
    requests: arrayUnion({
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email
    })
  });
}

export async function approveRequest(taskId, user) {
  const ref = doc(db, "tasks", taskId);

  await updateDoc(ref, {
    assignedTo: user.uid,
    assignedName: user.displayName || user.email,
    assignedPhoto: user.photoURL || null,
    status: "in_progress",
    requests: []
  });
}

export async function submitTask(taskId, taskTitle, url, comment, timeSpent, user) {
  await addDoc(collection(db, "submissions"), {
    taskId,
    taskTitle,
    userId: user.uid,
    userName: user.displayName,
    url,
    comment,
    timeSpent,
    status: "under_review",
    submittedAt: serverTimestamp(),
  });
}

export async function submitTaskUpdateStatus(taskId) {
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, {
    status: "in_review",
    submittedAt: serverTimestamp()
  });
}

export const approveTask = async (taskId, userId, points) => {
  await updateDoc(doc(db, "tasks", taskId), {
    status: "done"
  });

  await updateDoc(doc(db, "contributors", userId), {
    points: increment(points),
    completedTasks: arrayUnion(taskId)
  });
};

export async function resignTask(taskId, userId) {
  await updateDoc(doc(db, "tasks", taskId), {
    assignedTo: null,
    status: "open",
    lastResignedBy: userId,
    lastResignedAt: serverTimestamp(),
  });
}


export async function getTaskById(taskId) {
  const ref = doc(db, "tasks", taskId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};

