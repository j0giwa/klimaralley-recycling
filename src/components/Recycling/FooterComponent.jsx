import { useContext } from 'react'


export default function FooterComponent() {

    return (
        <footer className="footer">

            <div className="container">
                <footer class="bg-gray-800 text-white p-4">
                    <div class="container mx-auto">
                        <div class="flex justify-between items-center">
                            <p>&copy; 2024 Lemgo Rallye</p>
                            <ul class="flex space-x-4">
                                <li><a href="#" class="hover:text-gray-300">Impressum</a></li>
                                <li><a href="#" class="hover:text-gray-300">Datenschutz</a></li>
                                <li><a href="#" class="hover:text-gray-300">Kontakt</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>

            </div>
        </footer>
    )
}