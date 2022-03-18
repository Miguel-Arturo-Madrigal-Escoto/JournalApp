import Swal from 'sweetalert2';
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNotes'
import { fileUpload } from '../helpers/fileUpload';

/**
 tareas asincronas: thunk
 getState = useSelector
 */

// react-journal
// https://439738576113468:mbwAbci0LiOO5RjGOv9eYlA_1S8@api.cloudinary.com/v1_1/udg/upload

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const collectionRef = collection(db, `${ uid }`, 'journal/notes');
        const insertDoc = await addDoc(collectionRef, newNote);

       // console.log(`Document written with ID: ${ JSON.stringify(insertDoc, null, 3) }`);
        dispatch(activeNote(insertDoc.id, newNote));
        dispatch(addNewNote(insertDoc.id, newNote));
        
    }
}

//accion sincrona
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        
        if (!note.url) {
            delete note.url;
        } 
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.uid;

        const docRef = doc(db, `${ uid }/journal/notes/${ note.id }`);

        try {
            await updateDoc(docRef, noteToFirestore);

            //actualizar nota en el sidebar
            dispatch(refreshNote(note));
            Swal.fire(
                'Note saved',
                note.title,
                'success'
            )  
        } catch (err) {
            Swal.fire(
                'Error',
                err,
                'error'
            )
        }
    }
}

export const refreshNote = ( note ) => ({
    type: types.notesUpdated,
    payload: note
});

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;
        
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl ;

        dispatch(startSaveNote(activeNote));
        
        Swal.close();

    }
}

export const startDeleting = ( id ) => {

    return async ( dispatch, getState ) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#77dd77',
            cancelButtonColor: '#ff6961',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { uid } = getState().auth;
                    const docRef = doc(db, `${ uid }/journal/notes/${ id }`);
                    await deleteDoc(docRef);
                    dispatch(deleteNote(id));
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted succesfully',
                        'success'
                    )
                    
                } catch (err) {
                    Swal.fire(
                        'Error',
                        err,
                        'error'
                    )
                }
            } else {
                Swal.fire(
                    'Cancelled',
                    'Your file wasn\'t deleted',
                    'error'
                )
            }
          })
           
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});