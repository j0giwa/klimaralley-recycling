import { AuthContext } from "./security/AuthContext.jsx";
import { useContext } from 'react'


/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `FooterComponent`-Komponente zeigt den Fußbereich der Anwendung an. Sie enthält Informationen zum Copyright, 
 * Links zu Impressum, Datenschutz und Kontakt. Der Footer verwendet Tailwind CSS für die Gestaltung.
 */

export default function FooterComponent() {
    const authContext = useContext(AuthContext)

    // console.log(`Footer component-${authContext.number}`);
    return (
        <footer className="footer">

            <div className="container">
                <footer className="bg-gray-800 text-white p-4">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center">
                            <p>&copy; 2024 Lemgo Rallye</p>
                            <ul className="flex space-x-4">
                                <li><a href="#" className="hover:text-gray-300">Impressum</a></li>
                                <li><a href="#" className="hover:text-gray-300">Datenschutz</a></li>
                                <li><a href="#" className="hover:text-gray-300">Kontakt</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>

            </div>
        </footer>
    )
}