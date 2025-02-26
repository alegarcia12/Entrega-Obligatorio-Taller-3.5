const urlApiObligatorio = "https://movetrack.develotion.com/";

export const registroApiObligatorio = async (usuario, password, pais) => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "usuario": usuario, "password": password, "idPais": pais });

    const requestOptions = { method: 'POST', headers: myHeaders, body: raw };

    return fetch(`${urlApiObligatorio}usuarios.php`, requestOptions)
        .then(response => {
            return response.text();
        })
        .then(result => {
            const parseo = JSON.parse(result);
            if (parseo.codigo != 200) {
                return Promise.reject(parseo);
            } else {
                return result;
            }
        })
        .catch(
            (error) => {
                throw new Error(error.mensaje ? error.mensaje : "Hubo un error");
            }
        );
}