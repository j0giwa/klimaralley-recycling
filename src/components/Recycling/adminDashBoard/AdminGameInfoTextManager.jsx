import React, { useState, useEffect } from 'react';
import { createGameInfoText, getAllInfoText , deleteGameInfoText} from '../api/InfoTextApi.js';


const AdminGameInfoTextManager = () => {
    const [texts, setTexts] = useState([]);
    const [newText, setNewText] = useState({ gameId: '', textKey: '', text: '', language: '' });

    useEffect(() => {
        const fetchTexts = async () => {
            const response = await getAllInfoText();
            setTexts(response.data);
        };
        fetchTexts();
    }, []);

    const handleSave = async () => {
        try {
            await createGameInfoText(newText);
            const response = await getAllInfoText();
            setTexts(response.data);
            setNewText({ gameId: '', textKey: '', text: '', language: '' });
        } catch (error) {
            console.error('Error saving game info text:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteGameInfoText(id);
            const response = await getAllInfoText(); // Aktualisiere die Liste nach dem Löschen
            setTexts(response.data);
        } catch (error) {
            console.error('Error deleting game info text:', error);
        }
    };

    return (
        <div>
            <h1>Gib die Info Texte der Spieler ein</h1>
            {/* Form to add new texts */}
            <input type="text" placeholder="Game ID" value={newText.gameId} onChange={(e) => setNewText({ ...newText, gameId: e.target.value })} />
            <input type="text" placeholder="Text Key" value={newText.textKey} onChange={(e) => setNewText({ ...newText, textKey: e.target.value })} />
            <textarea placeholder="Text" value={newText.text} onChange={(e) => setNewText({ ...newText, text: e.target.value })}></textarea>
            <input type="text" placeholder="Language" value={newText.language} onChange={(e) => setNewText({ ...newText, language: e.target.value })} />
            <button onClick={handleSave}>Speichern</button>

            {/* List of texts */}
            <ul>
                {texts.map(text => (
                    <li key={text.id}>
                        {text.textKey}: {text.text}
                        <button onClick={() => handleDelete(text.id)}>Löschen</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminGameInfoTextManager;