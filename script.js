window.onload = function(){
    var errorM   = document.querySelector('.error');  
    var myImage  = document.querySelector('#image');
    var dataName = document.querySelector('#name');
    var dataType = document.querySelector('#type');

    function getPokemonJson() {
        var request = new XMLHttpRequest();
        request.open('GET', 'pokemons.json')
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                ourData = JSON.parse(request.responseText);
            } else {
                console.log("We connected to the server, but it returned an error.");
            }
        }
        request.send();
    }
    getPokemonJson();

    document.getElementById("submit").onclick = function(event){ 
        var input = $('#userInput').val().substr(1);
        var capL = $('#userInput').val().charAt(0).toUpperCase();
        var searchTerm = capL + input;

        event.preventDefault()

        function insertImage() {
            var inputOne = $('#userInput').val().substr(1);
            var minL = $('#userInput').val().charAt(0).toLowerCase();
            var fullInput = minL + inputOne;
            myImage.setAttribute('src',"https://img.pokemondb.net/artwork/" +fullInput + '.jpg');
        }  
          //  findPokemon(searchTerm)  + Show the error Message
        for (var i in ourData) {
             if(searchTerm ===""){
            errorM.innerHTML= 'you must enter a pokemon name or number';
            myImage.style.display='none';
            dataName.style.display='none';
            dataType.style.display='none';
            errorM.style.display='block';  
        }
        
        if (searchTerm > 151){
            errorM.innerHTML = "Pokemon number " +searchTerm + " " +'not found';
            myImage.style.display='none';
            dataName.style.display='none';
            dataType.style.display='none';
            errorM.style.display='block';
        } 
            if (isNaN(searchTerm) == true) {
                if(  searchTerm !== ourData[i].name ) {
                    errorM.innerHTML = searchTerm +" " + 'is not a valid pokemon name';
                    myImage.style.display='none';
                    dataName.style.display='none';
                    dataType.style.display='none';
                    errorM.style.display='block';
                   
                }
               
                if (ourData[i].name === searchTerm) {
                    dataName.innerHTML = 'Name : ' + ourData[i].name;
                    dataType.innerHTML = 'Type : ' + ourData[i].type;
                    myImage.style.display='block';
                    dataName.style.display='block';
                    dataType.style.display='block';
                    errorM.style.display='none';
      
                    insertImage();  
                    return false;          
                } 
                
              
            } else {
                dataName.innerHTML = 'Name : ' + ourData[searchTerm].name;
                dataType.innerHTML = 'Type : ' + ourData[searchTerm].type;
                myImage.style.display='block';
                dataName.style.display='block';
                dataType.style.display='block';
                errorM.style.display='none';

                function getImageByNumber(){
                  var minL = ourData[searchTerm].name .toLowerCase();
                   myImage.setAttribute('src',"https://img.pokemondb.net/artwork/" +minL + '.jpg');
                }
              return getImageByNumber();
            
            
            
            }               
        }    
    };
}
