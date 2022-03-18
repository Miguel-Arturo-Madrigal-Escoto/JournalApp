import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { id, title, body } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if (note.id !== activeId.current){
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset]);


    // actualizar nota activa
    useEffect(() => {

        dispatch(activeNote(id, { ...formValues, url: note.url }));

    }, [formValues, dispatch, id, note.url]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }


    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                {
                    note.url &&
                    <div className="notes__image">
                        <img 
                            name="url"
                            src={ note.url }
                            alt="imagen cargada"
                        />
                     </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
  )
}
