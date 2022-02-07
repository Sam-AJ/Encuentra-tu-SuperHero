$(() => {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    $("form").submit(function (event) {
        event.preventDefault();

        let valueInput = $("#superhero-input").val();

        $.ajax({
            url: "https://superheroapi.com/api.php/10222886118495107/" + valueInput,
            method: "get",
            success: function (response) {
                console.log(response)
                $("#div-superheroCard").html(`
                    <div id="superhero-card" class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="card-header text-center">
                                SuperHero Encontrado
                            </div>
                            <div class="col-md-4">
                                <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${response.name}</h5>
                                    <p class="card-text">Conexiones: ${response.connections["group-affiliation"]}</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Publicado por: ${response.biography.publisher}</li>
                                    <li class="list-group-item">Ocupación: ${response.work.occupation}</li>
                                    <li class="list-group-item">Primera Aparición: ${response.biography["first-appearance"]}</li>
                                    <li class="list-group-item">Altura: ${response.appearance.height}</li>
                                    <li class="list-group-item">Peso: ${response.appearance.weight}</li>
                                    <li class="list-group-item">Alias: ${response.biography.aliases}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
                $("#div-superheroChart").html(`

                `);
            }
        })
    });

});