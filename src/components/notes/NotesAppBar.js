import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const { active: note } = useSelector(state => state.notes);

  const now = dayjs();

  const handleSave = () => {
    dispatch(startSaveNote(note));
  }

  const handlePicUpload = () => {
    inputFile.current.click()
  }

  const handleFileChange = (e) => {
     const file = e.target.files[0];

     if (file){
       dispatch(startUploading(file));
     }
  }

  return (
    <div className="notes__appbar">
        <span>{ now.format('MMMM D, YYYY')}</span>

        <input
            id="fileSelector" 
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={ handleFileChange }
            ref={ inputFile }
        />

        <div>
            <button className="btn" onClick={ handlePicUpload }>
                Picture
            </button>

            <button className="btn" onClick={ handleSave }>
                Save
            </button>
        </div>
    </div>
  )
}
