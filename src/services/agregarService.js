const urlApiObligatorio = "https://movetrack.develotion.com/";

export const agregarApiObligatorio = async (idActividad, idUsuario, tiempo, fecha) => {
    try {
        const response = await fetch(`${urlApiObligatorio}registros.php`, {
            method: 'POST',
            body: JSON.stringify({
                "idActividad": idActividad,
                "idUsuario": idUsuario,
                "tiempo": tiempo,
                "fecha": fecha
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "apikey": localStorage.getItem("apiKey"),
                "iduser": localStorage.getItem("idUser")
            },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;  

    } catch (error) {
        return { error: error.message }; 
    }
};












