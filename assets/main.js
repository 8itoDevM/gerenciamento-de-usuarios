let sheet_id = '1ZwW_YxYYhnL0nmk5vDioA6UEXOIbkq2XbEAghRY-9Zk';
let sheet_title = 'LoginDashboard';
let sheet_range = 'A1:G1000';

let full_url = 'https://docs.google.com/spreadsheets/d/' + sheet_id + '/gviz/tq?sheet=' + sheet_title + '&range=' + sheet_range;

fetch(full_url)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));

    //console.log(data.table.rows[0].c[0].v); - Pega o Nome do usuário na tabela
    // console.log(data.table.rows[0].c[1].v); - Pega a senha na tabela
    // console.log(data.table.rows[0].c[2].v); - Pega o email na tabela
    // console.log(data.table.rows[0].c[3].v); - Pega a data na tabela
    // console.log(data.table.rows[0].c[4].v); - Pega o nível de acesso na tabela
    // console.log(data.table.rows[0].c[5].v); - Pega a validação na tabela

    function getAllUsers(){
        for(let i = data.table.rows.length - 1; i >= 0; i--){
            let containerPerson = document.getElementById("container-person");

            let person = document.createElement("div");
            person.id = "person";
        
            let personName = document.createElement("h4");
            personName.id = "person-name";

            let personEmail = document.createElement("h5");
            personEmail.id = "person-email";

            let btnDeleteUser = document.createElement("button");
            btnDeleteUser.className = "btn-delete";

            btnDeleteUser.innerHTML = "Deletar";

            personName.innerHTML = data.table.rows[i].c[0].v;
            personEmail.innerHTML = data.table.rows[i].c[2].v;

            btnDeleteUser.name = data.table.rows[i].c[0].v;

            let formDeleteBtn = document.createElement("form");
            formDeleteBtn.action = "https://script.google.com/macros/s/AKfycbymWeA_BAn9L6gHbVd2-I-f3gRgURI5acpW22xO9oPrIFwLHmzUFtC4mpKpoOwc17aKhw/exec";
            formDeleteBtn.method = "post";

            btnDeleteUser.addEventListener("click", function deleteUser(){
                console.log("Clicou para deletear " + data.table.rows[i].c[0].v);
                
            });

            containerPerson.appendChild(person);

            person.appendChild(personName);
            person.appendChild(personEmail);
            //person.appendChild(btnDeleteUser);
            person.appendChild(formDeleteBtn);
            formDeleteBtn.appendChild(btnDeleteUser);
        }
    }


    getAllUsers();
})
