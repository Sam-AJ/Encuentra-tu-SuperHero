$(() => { //Función Ready

    //Tooltips de Bootstrap JS
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    $("form").submit(function (event) {
        event.preventDefault();

        let valueInput = $("#superhero-input").val();
        let regExNumbers = /^[0-9]*$/
        
        if (valueInput == ""){
            alert("Debe ingresar un número")
        }else if (valueInput < 1 || valueInput > 732){
            alert("Debe ingresar un número entre 1 y 732")
        }

        if (regExNumbers.test(valueInput) == false){
            alert("Debe ingresar solo números")
        }
        
        $.ajax({
            url: "https://superheroapi.com/api.php/10222886118495107/" + valueInput,
            method: "get",
            success: function (response) {
                console.log(response)
                $("#div-superheroCard").html(`
                    <div id="superhero-card" class="card border-dark mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="card-header text-center text-white">
                                SuperHero Encontrado
                            </div>
                            <div class="col-md-4">
                                <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body bg-light">
                                    <h5 class="card-title">Nombre: ${response.name}</h5>
                                    <p class="card-text">Conexiones: ${response.connections["group-affiliation"]}</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Publicado por: ${response.biography.publisher}</li>
                                    <li class="list-group-item bg-light">Ocupación: ${response.work.occupation}</li>
                                    <li class="list-group-item">Primera Aparición: ${response.biography["first-appearance"]}</li>
                                    <li class="list-group-item bg-light">Altura: ${response.appearance.height}</li>
                                    <li class="list-group-item">Peso: ${response.appearance.weight}</li>
                                    <li class="list-group-item bg-light">Alias: ${response.biography.aliases}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

                var chart = new CanvasJS.Chart("div-superheroChart", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder de ${response.name}`,
                        backgroundColor: "#f60000",
                        fontColor: "white",
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: [
                            { y: response.powerstats.intelligence, label: "Inteligencia" },
                            { y: response.powerstats.strength, label: "Fuerza" },
                            { y: response.powerstats.speed, label: "Velocidad" },
                            { y: response.powerstats.durability, label: "Durabilidad" },
                            { y: response.powerstats.power, label: "Poder" },
                            { y: response.powerstats.combat, label: "Combate" }
                        ]
                    }]
                });
                chart.render();
            },
        })
    });
});


