


export default function ListGamesComponent() {



    return (
        <div className="ListGamesComponent">
            <h1>Recycling Spiele</h1>

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Spielname</th>
                            <th>Zuende gespielt?</th>
                            <th>Spiel Starten</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                        
                            <td>backend anbindung</td>
                            <td>backend</td>
                            <td><button className='btn btn-success' >Spiel Starten</button></td>
                        </tr>
                        <tr >
                        
                            <td>backend anbindung</td>
                            <td>backend</td>
                            <td><button className='btn btn-success' >Spiel Starten</button></td>
                        </tr>
                        <tr >
                        
                            <td>backend anbindung</td>
                            <td>backend</td>
                            <td><button className='btn btn-success' >Spiel Starten</button></td>
                        </tr>



                    </tbody>
                </table>
            </div>
        </div>
    )
}