/*
    remove stop button, add onclick events such that when you close the modal it automaticall resets everything.

    This approach is wrong since closing the modal and the search for a word ending are two seperate events. So these need to be 2 different functions.
*/


lettersOnly = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var interval;
var offset;
var generatedWord;
var text;
var wordLength;
var numTries;

var hours;
var minutes;
var seconds;
var ms;

var gif = document.createElement("iframe")
gif.setAttribute("src","https://giphy.com/embed/T8Dhl1KPyzRqU")
gif.setAttribute("width","480")
gif.setAttribute("height","330")
gif.setAttribute("frameBorder","0")
gif.setAttribute("class","giphy-embed")
gif.setAttribute("style","display: block;width: 75%;margin: auto;margin-top: 5%")

var successGif = document.createElement("img")
successGif.setAttribute("src","https://jucuthin.files.wordpress.com/2017/07/apes-together-strong.gif?w=352")
successGif.setAttribute("style","margin-top: 2%")
function reset(){
    // will run when modal is closed. resets page.
    
    //document.getElementById("modBod").removeChild(document.getElementById("msg"))
    console.log(document.getElementById("msg"))
    document.getElementById("modBod").innerHTML = "";
    //document.body.removeChild(successGif)
    document.getElementById("lower2").removeChild(gif)
    $('#myModal').modal('hide')
    document.getElementById("hour").innerHTML = "00"
    document.getElementById("min").innerHTML = "00"
    document.getElementById("sec").innerHTML = "00"
    if(interval){
        clearInterval(interval)
        interval = null;
    }
    
}
function success(){
    //run when generated word = input text
    
    console.log(hours)
    var newhours = document.getElementById("hour").innerHTML
    var newmins = document.getElementById("min").innerHTML
    var newsecs = document.getElementById("sec").innerHTML

    console.log(minutes)
    console.log(seconds)
    var msg = "Congrats! The monkey typed '" + text + "' in " + newhours + " hours, " + newmins + " minutes, and " + newsecs + " seconds after " + numTries + " words typed."
    var msgElm = document.createElement("span")
    msgElm.innerHTML = msg
    //msgElm.setAttribute("id","msg")
    var modBody = document.getElementById("modBod")
    modBody.appendChild(msgElm)
    modBody.appendChild(successGif)
    
    $('#myModal').modal('show')
    clearInterval(interval)
    interval = null;
}

function updateTimer(){
    
    var date = Date.now();
    var delta = date - offset
    seconds = delta/1000

    var secCopy = seconds % 60
    // if(seconds > 60){
    //     seconds = seconds - 60
    //     // same as above with seccopy
    // }
    secCopy = secCopy.toString().slice(0,5)
    //seconds = seconds.toString().slice(0,5)

    
    if(Math.floor(seconds/3600) < 10){
        document.getElementById("hour").innerHTML = "0" + Math.floor(seconds/3600)
    }
    else{
        document.getElementById("hour").innerHTML = Math.floor(seconds/3600)
    }

    if(Math.floor(seconds/60) < 10){
        document.getElementById("min").innerHTML = "0" + Math.floor(seconds/60) % 60
    }
    else{
        document.getElementById("min").innerHTML = Math.floor(seconds/60) % 60
    }
    document.getElementById("sec").innerHTML = secCopy
    
    hours =  Math.floor(seconds/3600)
    minutes = Math.floor(seconds/60) % 60
    seconds = Math.floor(seconds/60) % 60

    var randNum = Math.floor(Math.random() * 25)
    var character = lettersOnly[randNum]
    generatedWord = generatedWord.slice(1,wordLength) + character
    //console.log(generatedWord)
    numTries++;
    if(generatedWord == text){
        success()
        //document.body.appendChild(successGif)
        //$('#myModal').modal(options)
        
        // reset()
        // $('#myModal').on('shown.bs.modal', function () {
        //     $('#myInput').trigger('focus')
        //   })
        
        //alert("Success after " + numTries + " words typed.")
        
    }
    
    //document.getElementById("ms").innerHTML = delta/1000

    
    //console.log(delta/1000)
    
    // console.log(text)
    // if(text != ""){

    //     var wordLength = text.length;
    //     console.log(wordLength)
        
    //     var generatedWord = ""
    //     for(var i = 0;i < wordLength;i++){
    //         var randNum = Math.floor(Math.random() * 25)
    //         generatedWord = generatedWord + lettersOnly[randNum]
    //     }
    //     console.log(generatedWord)
    //     var numTries = 1
    //     while(generatedWord != text){
    //         var randNum = Math.floor(Math.random() * 25)
    //         var character = lettersOnly[randNum]
    //         generatedWord = generatedWord.slice(1,wordLength) + character
    //         //console.log(generatedWord)
    //         numTries++;
            
    //     }
    //     console.log(generatedWord)
    //     alert("success after " + numTries + "tries!")
    // }
}


function start(){
    hours = 0;
    minutes = 0;
    seconds = 0;
    ms = 0;
    numTries = 0;
    console.log(interval)
    if(!interval){
        offset = Date.now()
        
        text = document.getElementById("userInput").value;

        var str = text;
        var patt1 = /[a-zA-Z]/g; 
        var result = str.match(patt1);
        if(result != null){
            result = result.toString().replace(/[,]/g, '');
            console.log("result = " + result)
            console.log("original string = " + str)
       
            if(str == result){
                console.log("yup")
                console.log("No special characters found")
                document.getElementById("lower2").appendChild(gif)
                wordLength = text.length;
                //console.log(wordLength)
                
                generatedWord = ""
                for(var i = 0;i < wordLength;i++){
                    var randNum = Math.floor(Math.random() * 25)
                    generatedWord = generatedWord + lettersOnly[randNum]
                }
                interval = setInterval(updateTimer,10)
                
            }
            else{
                alert("Invalid word. Only enter characters A-Z")
            
            }
        }
        else{
            alert("Invalid word. Only enter characters A-Z")
        }

    }
   
}


document.getElementById("submitBtn").addEventListener("click", start)
document.getElementById("stopBtn").addEventListener("click", reset)



    
    
function monkey(){
    var text = document.getElementById("userInput").value.toLowerCase();
    console.log(text)
    if(text != ""){

        var wordLength = text.length;
        console.log(wordLength)
        
        var generatedWord = ""
        for(var i = 0;i < wordLength;i++){
            var randNum = Math.floor(Math.random() * 25)
            generatedWord = generatedWord + lettersOnly[randNum]
        }
        console.log(generatedWord)
        var numTries = 1
        while(generatedWord != text){
            var randNum = Math.floor(Math.random() * 25)
            var character = lettersOnly[randNum]
            generatedWord = generatedWord.slice(1,wordLength) + character
            //console.log(generatedWord)
            numTries++;
            
        }
        console.log(generatedWord)
        alert("success after " + numTries + "tries!")
    }
}    
    

