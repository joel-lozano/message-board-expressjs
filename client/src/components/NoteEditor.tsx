import React, { useEffect, useState } from 'react';
import { Note } from '../Types';
import './NoteEditor.css';

export default function NoteEditor(props: any) {
    const focusedNote: Note = props.note;
    const [state, setState] = useState<Note>(focusedNote);

    useEffect(() => {
        setState(focusedNote);
    }, [focusedNote]);

    const handleSaveClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        let url = '/notes';
        let httpMethod = 'POST';

        if (!focusedNote._id) {
            return;
        }

        url += `/${focusedNote._id}`;
        httpMethod = 'PUT';

        try {
            const data: Note = await (await fetch(url, {
                    method: httpMethod,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(state)
                })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above
        } catch (error) {
            console.error(error);
        }
    
        props.updateNotes();
    }

    const handleDeleteClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        if (!focusedNote._id) {
            return;
        };

        try {
            const data: Note = await (await fetch(`/notes/${focusedNote._id}`, {
                    method: 'DELETE',
                })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above
        } catch (error) {
            console.error(error);
        }
    
        props.updateNotes(true);
    }

    return (
        <section className="note-editor">
            <textarea className="focused-note-title"
                onChange={(event) => setState({ ...state, title: event.target.value })}
                value={state.title}
            />
            <textarea className="focused-note-content"
                onChange={(event) => setState({ ...state, content: event.target.value })}
                value={state.content}
            />
            <div className="icons">
                <span className="material-symbols-outlined"
                    onClick={handleSaveClick}
                    title="Save"
                >
                    save
                </span>
                <span className="material-symbols-outlined"
                    onClick={handleDeleteClick}
                    title="Delete"
                >
                    delete
                </span>
            </div>
        </section>
    );
}