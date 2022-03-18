import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) => {
    
    const collectionRef = query(collection(db, `${uid}/journal/notes`), orderBy('date', 'desc'));
    const notesSnap = await getDocs(collectionRef);
    const notes = [];

    notesSnap.forEach(snap => {
        notes.push({
            id: snap.id,
            ...snap.data(),
        });
    });
    
    return notes;
}