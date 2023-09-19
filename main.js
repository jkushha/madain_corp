function bringFillTextData(firstName, lastName, category=[1]) {

    $.ajax({
         url:
            `http://filltext.com/?rows=10&fname={${firstName}}&lname={${lastName}}&category=${[category]}&pretty=true`,

        type: "GET",

        success: function (data) {
            let x = JSON.stringify(data);
            console.log(data)
            createCard(data);

        },

        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}


$( "#searchForm" ).on( "submit", function( event ) {
    event.preventDefault();
    var fname = $("#firstName").val() || "firstName";
    var lname = $("#lastName").val() || "lastName";
    const formUser = event.target;
  
    const checkedInput = [...formUser.elements]
      .filter((input) => input.checked)
      .map((input) => input.value);

    console.log(checkedInput)
    args=[]
    if (checkedInput.length){
        args.push(category=checkedInput)
    }

    bringFillTextData(fname, lname, ...args)
});

function createCard(array){
    if (array.length == 0){
        return
    }
    $('#cards-wrapper').html(` `);
    $.each( array, function( key, value ) {
        var initials = (value.fname[0]) + (value.lname[0]); 
        $('#cards-wrapper').append(`            
        <li class="cards__item">
            <div class="card">
            <div class="card__image">${initials.toUpperCase()}</div>
            <div class="card__content">
                <div class="card__title"><div>${value.fname=='{}'?'': value.fname}</div><div>${value.lname=='{}'?'': value.lname}</div></div>
                <button class="btn btn--block card__btn">Category ${value.category}</button>
            </div>
            </div>
        </li>
    `);
    });
}
bringFillTextData(firstName="firstName", lastName="lastName"); // on load